#! /usr/bin/python3

# Check command line arguments
import sys
if len(sys.argv) != 4:
	print("Wrong number of arguments!")
	print("Usage: " + sys.argv[0][sys.argv[0].rfind("/") + 1:], end="")
	print(" input_json_file steps blocks\n")
	sys.exit()

# Read the input file
from ase import units
import json
with open(sys.argv[1]) as json_file:
	input_data = json.load(json_file)

input1 = input_data["inputs"][0]
input2 = input_data["inputs"][1]
distance = input_data["distance"] # It's already in Angstroms
velocity = input_data["velocity"] * units.Ang / units.fs
steps = int(sys.argv[2])
blocks = int(sys.argv[3])
filename = sys.argv[1].replace(".json", "")

# Set the calculator
from gpaw import GPAW, FermiDirac
bands_count = -5
calculator = GPAW( # This should be an ab initio calculator for the reaction to happen
	mode = "fd",
	basis = "dzp",
	xc = 'PBE',
	spinpol = True,
	nbands = bands_count,
	occupations = FermiDirac(0.5, fixmagmom = True),
	convergence = {
		'energy': 0.0005, # eV / electron
		'density': 1.0e-4,
		'eigenstates': 4.0e-8, # eV^2 / electron
		'bands': bands_count, # bands_count
		'forces': float('inf') # eV / Ang Max
	},
	txt = filename + '_calc.log'
)

# Set the integrator
from ase.md.verlet import VelocityVerlet
integrator = VelocityVerlet
timestep = 0.1 / velocity

# Declare the reaction object
from lib_collider import Collision, version
print("\ncollider.py", "v" + version, "\n")

coll1 = Collision(input1, input2, calculator, integrator, filename)

# Collide the molecules
result = coll1.collide(distance, velocity, timestep, steps, blocks)
print("\n", coll1.message)
