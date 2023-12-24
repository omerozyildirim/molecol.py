// JSON management
function get_index(arg1, arg2, arg3){// Find the item in arg1 whose arg2 is arg3 and return its index
	for (var i in arg1)
		if (arg1[i][arg2] == arg3)
			return i;
}
function get_value(arg1, arg2, arg3, arg4){// Find the item in arg1 whose arg2 is arg3 and return its arg4
	for (var i of arg1)
		if (i[arg2] == arg3)
			return i[arg4];
}
function set_value(arg1, arg2, arg3, arg4, arg5){// Find the item in arg1 whose arg2 is arg3 and set its arg4 to arg5
	for (var i in arg1)
		if (arg1[i][arg2] == arg3)
			arg1[i][arg4] = arg5;
}
function does_exist(arg1, arg2, arg3){// Return true if arg2 of arg1 is arg3
	for (var i in arg1)
		if (arg1[i][arg2] == arg3)
			return true;
	return false;
}
