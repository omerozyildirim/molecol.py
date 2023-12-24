// TODO:
// Implement untriggered object clicks as well

{// Global variables
	var
		gui_multiplication_sign = "&#10761;",
		clicked_objects = [],
		object_flag = false,
		return_attribute = null,
		allowed_attribute = null,
		allowed_values = [],
		limit = 0,
		gfn = null
	;
}
function object_clicked(arg){// This should include untriggered clicks as well!!
	if (allowed_values.includes(arg.getAttribute(allowed_attribute))){
		if (object_flag && clicked_objects.length < limit){
			clicked_objects.push(arg.getAttribute(return_attribute));
			if (clicked_objects.length == limit){
				gfn(clicked_objects);
				cancel();
			}
		}
	}
	return [clicked_objects.length, limit];
}
function click_handler(cancel_element, attribute, value_array, count, to_return, fn, message){
	gfn = fn;
	object_flag = true;
	return_attribute = to_return;
	allowed_attribute = attribute;
	allowed_values = value_array;
	limit = count;
	disable_forms(to_be_disabled);
	document.getElementById(cancel_element).disabled = false;
	document.title = message;
}
function cancel(arg){
	gfn = null;
	object_flag = false;
	return_attribute = null;
	allowed_attribute = null;
	allowed_values = [];
	limit = 0;
	clicked_objects = [];
	enable_forms(to_be_disabled);
	arg.disabled = true;
}
function enable_elements(arg){// arg is an HTMLCollection or an array of their ids
	if (typeof arg[0] === 'string' || arg[0] instanceof String)
		for (var i of arg) document.getElementById(i).disabled = false;
	else
		for (var i of arg) i.disabled = false;
}
function disable_elements(arg){// arg is an HTMLCollection or an array of their ids
	if (typeof arg[0] === 'string' || arg[0] instanceof String)
		for (var i of arg) document.getElementById(i).disabled = true;
	else
		for (var i of arg) i.disabled = true;
}
function enable_form(arg){// arg is a form element or its id
	var i, elements = (typeof arg === 'string' || arg instanceof String) ? document.getElementById(arg).elements : arg.elements;
	for (i of elements) i.disabled = false;
}
function enable_forms(arg){// arg is an HTMLCollection of forms or an array of their ids
	var i, j, elements, flag = typeof arg[0] === 'string' || arg[0] instanceof String;
	for (j of arg){
		elements = flag ? document.getElementById(j).elements : j.elements;
		for (i of elements) i.disabled = false;
	}
}
function disable_form(arg){// arg is a form element or its id
	var i, elements = (typeof arg === 'string' || arg instanceof String) ? document.getElementById(arg).elements : arg.elements;
	for (i of elements) i.disabled = true;
}
function disable_forms(arg){// arg is an HTMLCollection of forms or an array of their ids
	var i, j, elements, flag = typeof arg[0] === 'string' || arg[0] instanceof String;
	for (j of arg){
		elements = flag ? document.getElementById(j).elements : j.elements;
		for (i of elements) i.disabled = true;
	}
}
function clear_node(arg){// arg is a node or its id
	var node = (typeof arg === 'string' || arg instanceof String) ? document.getElementById(arg) : arg;
	while (node.firstChild) node.firstChild.remove();
}
function clear_nodes(arg){// arg is an HTMLCollection of nodes or an array of their ids
	var node, i, flag = typeof arg[0] === 'string' || arg[0] instanceof String;
	for (i of arg){
		node = flag ? document.getElementById(i) : i;
		while (node.firstChild) node.firstChild.remove();
	}
}
function set_global(tag, attribute, value){
	for (var i of document.querySelectorAll(tag))
		i.setAttribute(attribute, value);
}
function copy(arg1, arg2){// args are elements or their ids
	var
		element1 = (typeof arg1 === 'string' || arg1 instanceof String) ? document.getElementById(arg1) : arg1,
		element2 = (typeof arg2 === 'string' || arg2 instanceof String) ? document.getElementById(arg2) : arg2,
		value = parseFloat(element1.value),
		max = parseFloat(element1.max),
		min = parseFloat(element1.min)
	;
	if (value > max) value = max;
	else if (value < min) value = min;
	element1.value = value;
	element2.value = value;
}
function log_copy(arg1, arg2){// args are elements or their ids
	var
		element1 = (typeof arg1 === 'string' || arg1 instanceof String) ? document.getElementById(arg1) : arg1,
		element2 = (typeof arg2 === 'string' || arg2 instanceof String) ? document.getElementById(arg2) : arg2,
		value = parseFloat(element1.value),
		max = parseFloat(element1.max),
		min = parseFloat(element1.min)
	;
	if (value > max) value = max;
	else if (value < min) value = min;
	element1.value = value;
	element2.value = Math.log10(value);
}
function set_values(arg1, arg2){// arg1 is an HTMLCollection of nodes or an array of their ids, arg2 is the value
	if (typeof arg1[0] === 'string' || arg1[0] instanceof String)
		for (var i of arg) document.getElementById(i).value = arg2;
	else
		for (var i of arg) i.value = arg2;
}
function get_radio_value(arg){// arg is the collective name of the radio elements
	for (var i of document.getElementsByName(arg))
		if (i.checked)
			return i.value;
}
function toggle_visibility(arg){// arg is the element to be toggled or its id
	var tag = (typeof arg === 'string' || arg instanceof String) ? document.getElementById(arg) : arg;
	if (tag.style["visibility"] == "hidden") tag.style["visibility"] = "visible";
	else tag.style["visibility"] = "hidden";
}
function gather_form_data(arg){// arg is a form or its id
	var
		i, result = {},
		elements = (typeof arg === 'string' || arg instanceof String) ? document.forms[arg].elements : arg.elements
	;
	for (i of elements){
		/*if (i.type == "fieldset") result[i.id] = gather_form_data(i.id);// Recursive step
		else */
		if (i.type == "checkbox")
			if (i.checked) result[i.id] = true;
			else result[i.id] = false;
		else if (i.type == "radio" && i.checked) result[i.name] = i.value;
		else if (i.type == "number") result[i.id] = parseFloat(i.value);
		else if (i.type == "text" || i.type == "color") result[i.id] = i.value;
		else if (i.type == "select") result[i.id] = i.selectedIndex;
		else if (i.type == "output") result[i.id] = convert_from_scientific(i.value, gui_multiplication_sign);
	}
	return result;
}
function disperse_form_data(arg1, arg2){// arg1 is a form or its id, arg2 is the object holding the data
	var
		i, id,
		elements = (typeof arg1 === 'string' || arg1 instanceof String) ? document.forms[arg1].elements : arg1.elements
	;
	for (i of elements){
		id = i.id;
		if (i.type == "number" || i.type == "text" || i.type == "color" || i.type == "output") i.value = arg2[i.id] ? arg2[i.id] : "";
		else if (i.type == "checkbox") i.checked = arg2[i.id];
		else if (i.type == "radio" && i.checked) result[i.name] = i.value;
		else if (i.type == "select") i.selectedIndex = arg2[i.id] ? parseInt(arg2[i.id]) : 0;
	}
}
function populate_select(arg1, arg2, arg3, arg4){// arg1 is a select or its id, arg2 is an array containing the values of options at index arg3 and the innerHTMLs of options at index arg4. If arg3 is null, automatic values are assigned
	var
		opt, i,
		select = (typeof arg1 === 'string' || arg1 instanceof String) ? document.getElementById(arg1) : arg1
	;
	while (select.firstChild) select.firstChild.remove();
	for (i in arg2){
		opt = document.createElement("OPTION");
		opt.value = arg2[i][arg3] ? arg[i][arg3] : i;
		opt.innerHTML = arg2[i][arg4];
		select.appendChild(opt);
	}
}
function convert_to_scientific(arg1, arg2){// arg1 is a float, arg2 is a string containing multiplication sign character, returns a string
	return arg1.toString().replace("e", arg2 + "10<sup>") + "/<sup>";
}
function convert_from_scientific(arg1, arg2){// arg1 is a string, arg2 is a string containing multiplication sign character, returns a float
	return parseFloat(arg1.replace(arg2 + "10<sup>", "e"));
}
