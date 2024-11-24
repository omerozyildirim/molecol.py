from ase import units
from ase.io import read
from ase.io import write
import numpy as np

version = "2.0"

class Collision:
	def __init__(self, input1, input2, calculator, integrator, filename):
		self.input1 = input1
		self.input2 = input2
		self.mol1 = read(input1["filename"])
		self.mol2 = read(input2["filename"])
		self.filename = filename
		self.log_filename = filename + '_intg.log'
		self.trajectory_filename = filename + '.traj'
		self.output = None
		self.calculator = calculator
		self.integrator = integrator
		self.a1 = None # Spatial coordinates of points previously defined in molecular coordinates
		self.a2 = None
		self.b1 = None
		self.b2 = None
		self.resume = None
		self.realtime = 0
		self.message = ""

	def locate(self, distance): # a1: 1st point in input1, b1: 1st point in input2
		self.a1 = self.mol1.get_positions()[self.input1["points"][0][0]] * (1.0 - self.input1["points"][0][1]) + self.mol1.get_positions()[self.input1["points"][0][2]] * self.input1["points"][0][1] # 1st point on molecule 1 is calculated
		self.b1 = self.mol2.get_positions()[self.input2["points"][0][0]] * (1.0 - self.input2["points"][0][1]) + self.mol2.get_positions()[self.input2["points"][0][2]] * self.input2["points"][0][1] # 1st point on molecule 2 is calculated
		self.mol1.translate(self.input1["position"] - self.a1) # Translate the first point on input1 to the origin
		self.mol2.translate(self.input2["position"] - self.b1) # Translate the first point on input2 to the distance on x axis
		# These have to be re-calculated because of the translation
		self.a1 = self.mol1.get_positions()[self.input1["points"][0][0]] * (1.0 - self.input1["points"][0][1]) + self.mol1.get_positions()[self.input1["points"][0][2]] * self.input1["points"][0][1] # 1st point on molecule 1 is calculated
		self.b1 = self.mol2.get_positions()[self.input2["points"][0][0]] * (1.0 - self.input2["points"][0][1]) + self.mol2.get_positions()[self.input2["points"][0][2]] * self.input2["points"][0][1] # 1st point on molecule 2 is calculated

	def set_orientation(self): # a2: 2nd point in input1, b2: 2nd point in input2, v: orientation vector (1 -> 2), a: rotation angle
		self.a2 = self.mol1.get_positions()[self.input1["points"][1][0]] * (1.0 - self.input1["points"][1][1]) + self.mol1.get_positions()[self.input1["points"][1][2]] * self.input1["points"][1][1] # 2nd point on molecule 1 is calculated
		self.b2 = self.mol2.get_positions()[self.input2["points"][1][0]] * (1.0 - self.input2["points"][1][1]) + self.mol2.get_positions()[self.input2["points"][1][2]] * self.input2["points"][1][1] # 2nd point on molecule 2 is calculated
		self.mol1.rotate((self.a2 - self.a1), self.input1["vector"], center = self.a1)
		self.mol2.rotate((self.b2 - self.b1), self.input2["vector"], center = self.b1)
		self.mol1.rotate(self.input1["angle"], self.input1["vector"])
		self.mol2.rotate(self.input2["angle"], self.input2["vector"])

	def apply_matrices(self):
		matrix = np.array(self.input1["matrix"])
		for i in self.mol1:
			i.position = np.matmul(matrix, np.append(np.copy(i.position), [1]))[:3]
		matrix = np.array(self.input2["matrix"])
		for i in self.mol2:
			i.position = np.matmul(matrix, np.append(np.copy(i.position), [1]))[:3]

	def shoot(self, velocity, timestep, steps, blocks):
		start_block = 0
		self.realtime = 0.0
		self.mol2.set_velocities([-velocity, 0, 0])
		self.output = self.mol1 + self.mol2 # Inputs should be reduced to a single entity to perform an ab initio calculation
		self.output.set_calculator(self.calculator)
		self.output.set_pbc([False, False, False])
		# Initial electron density output
		b = len(str(blocks))
		d = len(str(blocks * steps))
		suffix = (d - 1) * "0"
		write("initial.xyz", self.output)
		i, c, e = 0, 1, 1
		self.center(vacuum=10)  # Set the box to be saved as a cubefile
		self.output.get_potential_energy()  # Get initial potential energy to calculate the initial electron distribution
		rho = self.calculator.get_all_electron_density()
		cubefile = self.filename + "_" + suffix[:b - c] + str(i) + "_" + suffix[:d - e] + str(i * steps) + "_" + str(self.realtime) + ".cube"
		print(cubefile)
		write(cubefile, self.output, data = rho * units.Ang**3)
		# Integration begins
		integrator = self.integrator(
			atoms = self.output,
			timestep = timestep,
			trajectory = self.trajectory_filename,
			#append_trajectory = True, # This will be implemented in the future
			logfile = self.log_filename
		)
		try:
			for i in range(start_block, blocks):
				self.__add_cell(10)  # Set the box to be saved as a cubefile
				integrator.run(steps)
				self.realtime += timestep
				c = len(str(i + 1))
				e = len(str((i + 1) * steps))
				rho = self.calculator.get_all_electron_density()
				cubefile = self.filename + "_" + suffix[:b - c] + str(i + 1) + "_" + suffix[:d - e] + str((i + 1) * steps) + "_" + str(self.realtime) + ".cube"
				print(cubefile)
				write(cubefile, self.output, data = rho * units.Ang**3)
		except Exception as err:
			self.message = "Collision failed - " + str(err)
			result = False
		else:
			self.message = "Successfully collided!"
			result = True
		write("final.xyz", self.output)
		return result

	def collide(self, distance, velocity, steps, blocks):
		if self.input1["matrix"] is not None and self.input2["matrix"] is not None:
			self.apply_matrices()
		else:
			self.locate(distance)
			self.set_orientation()
		return self.shoot(velocity, steps, blocks)
