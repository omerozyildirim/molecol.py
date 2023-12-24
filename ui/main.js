{// Global variable(s)
	var molecules;
}
function init(){
	molecules = {
		0: null,
		1: {
			"atoms"   : null,
			"position": [0, 0, 0],
			"point1"  : [0, 0.5, 1],
			"point2"  : null,
			"vector"  : null,
			"angle"   : null,
			"target"  : null,
			"filename": null,
			"matrix"  : null
		},
		2: {
			"atoms"   : null,
			"position": [parseFloat(document.getElementById("distance").value), 0, 0],
			"point1"  : [0, 0.5, 1],
			"point2"  : null,
			"vector"  : null,
			"angle"   : null,
			"target"  : 1,
			"filename": null,
			"matrix"  : null
		},
		"distance": null,
		"velocity": null
	};
	resize();
}
// IO functions
async function save_json(){
	var arg1 = {
		"inputs":[
			{
				"filename": molecules[1]["filename"],
				"points"  : [molecules[1]["point1"], molecules[1]["point2"]], // These are in molecular coordinates
				"vector"  : molecules[1]["vector"],// This is from collision point
				"angle"   : molecules[1]["angle"],// This is around the 'vector' above
				"matrix"  : molecules[1]["matrix"]
			},
			{
				"filename": molecules[2]["filename"],
				"points"  : [molecules[2]["point1"], molecules[2]["point2"]], // These are in molecular coordinates
				"vector"  : molecules[2]["vector"],// This is from collision point
				"angle"   : molecules[2]["angle"],// This is around the 'vector' above
				"matrix"  : molecules[2]["matrix"]
			}
		],
		"distance": molecules["distance"],
		"velocity": molecules["velocity"]
	};
	var handle = await getNewFileHandle();
	writeFile(handle, JSON.stringify(arg1));
}
async function writeFile(fileHandle, contents){
	const writable = await fileHandle.createWritable(); // Create a FileSystemWritableFileStream to write to.
	await writable.write(contents);// Write the contents of the file to the stream.
	await writable.close();// Close the file and write the contents to disk.
}
async function getNewFileHandle(){
	const options = {types: [{description: 'JSON Files', accept: {'text/plain': ['.json']}}]};
	const handle = await window.showSaveFilePicker(options);
	return handle;
}
function load(arg1, arg2){// arg2 is the filename
	var reader = new FileReader(), molecule;
	reader.onload = function(){// A lot to be done when a molecule is loaded
		post_load(arg1, reader.result);// Perhaps it's better be in a dedicated function
		molecules[arg1]["filename"] = arg2["name"];
	}
	reader.readAsText(arg2);
}
function xyz_to_object(arg1){// Lots of string manipulations
	var result = [], lines, line, i, j, k, count = 1;
	lines = arg1.split("\n");
	for (i of lines.slice(2)){
		line = i.split(" ");
		line = line.filter((k) => {if (k != "") return k;});// We should deal with spare spaces
		if (line.length >= 4)// This will filter-out empty line at the end of the file
			result.push({
				"id": line[0] + "." + (count++).toString(),
				"symbol": line[0],
				"position": [parseFloat(line[1]), parseFloat(line[2]), parseFloat(line[3])]
			});
	}
	return result;
}
// UI functions
function post_load(arg1, arg2){
	if (arg2){
	molecules[arg1]["atoms"] = xyz_to_object(arg2);
	var maxr = 2 * calculate_max_distance(arg1);
	populate_select("atoma" + arg1.toString(), molecules[arg1]["atoms"], null, "id");
	populate_select("atomb" + arg1.toString(), molecules[arg1]["atoms"], null, "id");
	document.getElementById("atoma" + arg1.toString()).selectedIndex = 0;
	document.getElementById("ratioab" + arg1.toString()).value = 0.5;
	document.getElementById("atomb" + arg1.toString()).selectedIndex = 1;
	document.getElementById("axisx_" + arg1.toString()).setAttribute("height", maxr);
	document.getElementById("axisy_" + arg1.toString()).setAttribute("height", maxr);
	document.getElementById("axisz_" + arg1.toString()).setAttribute("height", maxr);
	render_molecule(arg1);
	refresh(arg1);
	set_common();
	}
}
function set_common(){
	molecules["distance"] = parseFloat(document.getElementById("distance").value);
	molecules["velocity"] = parseFloat(document.getElementById("velocity").value);
}
function refresh(arg1){
	if (molecules[arg1]["atoms"]){
		molecules[arg1]["point1"] = [
			parseInt(document.getElementById("atoma" + arg1.toString()).selectedIndex),
			parseFloat(document.getElementById("ratioab" + arg1.toString()).value),
			parseInt(document.getElementById("atomb" + arg1.toString()).selectedIndex)
		];
		document.getElementById("tran_" + arg1.toString()).setAttribute("translation", reverse_vector_3(calculate_point_coordinate(arg1, 1)));
		molecules[arg1]["matrix"] = get_x3dom_matrix("container" + arg1.toString());
	}
}
// X3DOM functions
function resize(){
	document.getElementById("x3dmain").setAttribute("width", window.innerWidth * 0.8);
	document.getElementById("x3dmain").setAttribute("height", window.innerHeight * 0.93);
}
function set_view(arg1){
	document.getElementById("vp").setAttribute(
		'centerOfRotation',
		(arg1 == 0) ?
			[parseFloat(document.getElementById("distance").value) / 2, 0, 0] :
			document.getElementById("base_" + arg1.toString()).getAttribute("translation")
	);
	document.getElementById("x3dmain").runtime.showObject(document.getElementById("container" + arg1.toString()), 'posZ');
}
function get_x3dom_matrix(arg1){
	var tr = document.getElementById(arg1)._x3domNode.getCurrentTransform();
	return [
		[tr._00, tr._01, tr._02, tr._03],
		[tr._10, tr._11, tr._12, tr._13],
		[tr._20, tr._21, tr._22, tr._23],
		[tr._30, tr._31, tr._32, tr._33]
	];
}
function rotemp(arg1, arg2, arg3){
	document.getElementById("temp_" + arg1.toString()).setFieldValue("matrix", arg2(arg3));
}
function roperm(arg1){
	document.getElementById("perm_" + arg1.toString()).setFieldValue("matrix", document.getElementById("perm_" + arg1.toString()).getFieldValue("matrix").mult(document.getElementById("temp_" + arg1.toString()).getFieldValue("matrix")));
	document.getElementById("temp_" + arg1.toString()).setFieldValue("matrix", new x3dom.fields.SFMatrix4f());// Identity matrix

}
function render_molecule(arg1){
	var
		tag0, tag1, tag2, tag3, tag4, tag5, tag6, opt1, opt2, opt3, i,
		scene = document.getElementById("container" + arg1.toString())
	;
	// First clear the scene
	clear_node(scene);
	// Add atoms
	for (i of molecules[arg1]["atoms"]){
		// Defining spheres on the scene per atom
		tag0 = document.createElement("TRANSFORM");
		tag1 = document.createElement("SHAPE");
		tag2 = document.createElement("APPEARANCE");
		tag3 = document.createElement("MATERIAL");
		tag4 = document.createElement("SPHERE");
		// Setting up the attributes of the sphere
		tag0.setAttribute("id", "atransformer." + arg1.toString() + "." + i["id"]);
		tag0.setAttribute("translation", i["position"]);
		tag3.setAttribute("diffuseColor", atom_data[get_index(atom_data, "symbol", i["symbol"])]["color3d"]);
		tag3.setAttribute("transparency", "0.3");
		tag4.setAttribute("radius", 0.2);
		tag4.setAttribute("name", i.toString());
		tag4.setAttribute("id", "atom." + arg1.toString() + "." + i["id"]);
		tag4.setAttribute("class", "atom." + arg1.toString());
		// Adding sphere to the scene
		tag2.appendChild(tag3);
		tag1.appendChild(tag2);
		tag1.appendChild(tag4);
		tag0.appendChild(tag1);
		scene.appendChild(tag0);
		// Defining the labels
		tag0 = document.createElement("TRANSFORM");
		tag6 = document.createElement("BILLBOARD");
		tag1 = document.createElement("SHAPE");
		tag2 = document.createElement("APPEARANCE");
		tag3 = document.createElement("MATERIAL");
		tag4 = document.createElement("TEXT");
		tag5 = document.createElement("FONTSTYLE");
		// Setting up the attributes of the label
		tag0.setAttribute("id", "ltransformer." + arg1.toString() + "." + i["id"]);
		tag0.setAttribute("translation", i["position"]);
		tag4.setAttribute("string", i["id"]);
		tag3.setAttribute("diffuseColor", "0, 0, 0");
		tag5.setAttribute("size", 0.2);
		tag5.setAttribute("quality", 10);
		tag5.setAttribute("justify", '"MIDDLE" "MIDDLE"');// FINALLY!
		tag5.setAttribute("name", i["symbol"]);
		tag5.setAttribute("class", "label." + arg1.toString());
		tag6.setAttribute("axisOfRotation", "0, 0, 0");
		// Adding sphere to the label
		tag4.appendChild(tag5);
		tag2.appendChild(tag3);
		tag1.appendChild(tag2);
		tag1.appendChild(tag4);
		tag6.appendChild(tag1);
		tag0.appendChild(tag6);
		scene.appendChild(tag0);
	}
}
// 3D functions
function calculate_max_distance(arg1){
	var result = 0, temp;
	for (var i of molecules[arg1]["atoms"]){
		for (var j of molecules[arg1]["atoms"]){
			temp = length_of_vector_3(vector_minus_vector_3(i["position"], j["position"]));
			if (temp > result) result = temp;
		}
	}
	return result;
}
function calculate_point_coordinate(arg1, arg2){
	var
		vector1 = molecules[arg1]["atoms"][molecules[arg1]["point" + arg2.toString()][0]]["position"],
		vector2 = molecules[arg1]["atoms"][molecules[arg1]["point" + arg2.toString()][2]]["position"],
		ratio = molecules[arg1]["point" + arg2.toString()][1]
	;
	return vector_plus_vector_3(vector1, vector_times_scalar_3(vector_minus_vector_3(vector2, vector1), ratio));
}

function dump_molecule(arg1){
	var matrix = molecules[arg1]["matrix"];
	for (var i of molecules[arg1]["atoms"]){
		console.log(
			i["id"],
			matrix_times_vector_4(
				matrix,
				i["position"].concat(1)
			).slice(0, 3)
		);
	}
}
