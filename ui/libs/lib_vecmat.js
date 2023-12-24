// The following work in 3D space
function reverse_vector_3(arg){// Returns -arg
	return [-arg[0], -arg[1], -arg[2]];
}
function vector_over_scalar_3(arg1, arg2){// Returns a vector
	return [arg1[0] / arg2, arg1[1] / arg2, arg1[2] / arg2];
}
function vector_times_scalar_3(arg1, arg2){// Returns a vector
	return [arg1[0] * arg2, arg1[1] * arg2, arg1[2] * arg2];
}
function vector_plus_vector_3(arg1, arg2){
	return [arg1[0] + arg2[0], arg1[1] + arg2[1], arg1[2] + arg2[2]];
}
function vector_minus_vector_3(arg1, arg2){// Subtract arg2 from arg1
	return [arg1[0] - arg2[0], arg1[1] - arg2[1], arg1[2] - arg2[2]];
}
function average_vectors_3(arg1, arg2){// Calculate the mid-point
	return [(arg1[0] + arg2[0]) / 2, (arg1[1] + arg2[1]) / 2, (arg1[2] + arg2[2]) / 2];
}
function vector_dot_vector_3(arg1, arg2){// Returns a scalar
	return arg1[0]*arg2[0] + arg1[1]*arg2[1] + arg1[2]*arg2[2];
}
function vector_cross_vector_3(arg1, arg2){// Returns a vector perpendicular to both vectors
	return [
		arg1[1]*arg2[2] - arg1[2]*arg2[1],
		arg1[2]*arg2[0] - arg1[0]*arg2[2],
		arg1[0]*arg2[1] - arg1[1]*arg2[0]
	];
}
function vector_outer_vector_3(arg1, arg2){// Returns a matrix
	return [
		[arg1[0]*arg2[0], arg1[0]*arg2[1], arg1[0]*arg2[2]],
		[arg1[1]*arg2[0], arg1[1]*arg2[1], arg1[1]*arg2[2]],
		[arg1[2]*arg2[0], arg1[2]*arg2[1], arg1[2]*arg2[2]]
	];
}
function matrix_times_vector_3(arg1, arg2){// Returns a vector
	return [
		arg1[0][0]*arg2[0] + arg1[0][1]*arg2[1] + arg1[0][2]*arg2[2],
		arg1[1][0]*arg2[0] + arg1[1][1]*arg2[1] + arg1[1][2]*arg2[2],
		arg1[2][0]*arg2[0] + arg1[2][1]*arg2[1] + arg1[2][2]*arg2[2]
	];
}
function vector_times_matrix_3(arg1, arg2){// Returns a vector
	return [
		arg1[0]*arg2[0][0] + arg1[1]*arg2[1][0] + arg1[2]*arg2[2][0],
		arg1[0]*arg2[0][1] + arg1[1]*arg2[1][1] + arg1[2]*arg2[2][1],
		arg1[0]*arg2[0][2] + arg1[1]*arg2[1][2] + arg1[2]*arg2[2][2]
	];
}
function length_of_vector_3(arg){// Returns a scalar
	return Math.sqrt(arg[0]**2 + arg[1]**2 + arg[2]**2);
}
function angle_between_vectors_3(arg1, arg2){// Returns the angle in radians
	return Math.acos((arg1[0]*arg2[0] + arg1[1]*arg2[1] + arg1[2]*arg2[2]) / (length_of_vector_3(arg1)*length_of_vector_3(arg2)));
}
function cos_between_vectors_3(arg1, arg2){// Returns the cos of angle in radians
	return (arg1[0]*arg2[0] + arg1[1]*arg2[1] + arg1[2]*arg2[2]) / (length_of_vector_3(arg1)*length_of_vector_3(arg2));
}
function vector_rotate_around_unit_vector_3(arg1, arg2, arg3){// Rotates arg1 around arg2 arg3 radians, returns the resulting vector
	// console.log("begin lib_vecmat:");
	return vector_plus_vector_3(vector_plus_vector_3(vector_times_scalar_3(arg1, Math.cos(arg3)), vector_times_scalar_3(vector_cross_vector_3(arg2, arg1), Math.sin(arg3))), vector_times_scalar_3(arg2, vector_dot_vector_3(arg2, arg1) * (1.0 - Math.cos(arg3))));
	// console.log("end lib_vecmat:");
	/*return
		vector_plus_vector_3(
			vector_plus_vector_3(
				vector_times_scalar_3(arg1, Math.cos(arg3)),
				vector_times_scalar_3(vector_cross_vector_3(arg2, arg1), Math.sin(arg3))
			),
			vector_times_scalar_3(arg2, vector_dot_vector_3(arg2, arg1) * (1.0 - Math.cos(arg3)))
		)
	;*/
}
function unify_vector_3(arg){// Returns the unit vector
	var l = length_of_vector_3(arg);
	if (l > 0) return [arg[0] / l, arg[1] / l, arg[2] / l];
	else return [0, 0, 0];
}
function matrix_of_rotation_3(arg1, arg2){// Returns the matrix of rotation: arg2 radians around vector arg1
	var c = Math.cos(arg2), s = Math.sin(arg2), c1 = 1 - Math.cos(arg2);
	return [
		[arg1[0]*arg1[0]*c1+c        , arg1[1]*arg1[0]*c1-s*arg1[2], arg1[2]*arg1[0]*c1+s*arg1[1]],
		[arg1[0]*arg1[1]*c1+s*arg1[2], arg1[1]*arg1[1]*c1+c        , arg1[2]*arg1[1]*c1-s*arg1[0]],
		[arg1[0]*arg1[2]*c1-s*arg1[1], arg1[1]*arg1[2]*c1+s*arg1[0], arg1[2]*arg1[2]*c1+c        ]
	];
}
// The following work in 4D space (i.e. rgba color manipulation)
function vector_plus_vector_4(arg1, arg2){
	return [arg1[0] + arg2[0], arg1[1] + arg2[1], arg1[2] + arg2[2], arg1[3] + arg2[3]];
}
function vector_times_scalar_4(arg1, arg2){// Returns a vector
	return [arg1[0] * arg2, arg1[1] * arg2, arg1[2] * arg2, arg1[3] * arg2];
}
function matrix_times_vector_4(arg1, arg2){// Returns a vector
	return [
		arg1[0][0]*arg2[0] + arg1[0][1]*arg2[1] + arg1[0][2]*arg2[2] + arg1[0][3]*arg2[3],
		arg1[1][0]*arg2[0] + arg1[1][1]*arg2[1] + arg1[1][2]*arg2[2] + arg1[1][3]*arg2[3],
		arg1[2][0]*arg2[0] + arg1[2][1]*arg2[1] + arg1[2][2]*arg2[2] + arg1[2][3]*arg2[3],
		arg1[3][0]*arg2[0] + arg1[3][1]*arg2[1] + arg1[3][2]*arg2[2] + arg1[3][3]*arg2[3]
	];
}
function vector_times_matrix_4(arg1, arg2){// Returns a vector
	return [
		arg1[0]*arg2[0][0] + arg1[1]*arg2[1][0] + arg1[2]*arg2[2][0] + arg1[3]*arg2[3][0],
		arg1[0]*arg2[0][1] + arg1[1]*arg2[1][1] + arg1[2]*arg2[2][1] + arg1[3]*arg2[3][1],
		arg1[0]*arg2[0][2] + arg1[1]*arg2[1][2] + arg1[2]*arg2[2][2] + arg1[3]*arg2[3][2],
		arg1[0]*arg2[0][3] + arg1[1]*arg2[1][3] + arg1[2]*arg2[2][3] + arg1[3]*arg2[3][3]
	];
}
// The following work in spaces with arbitrary number of dimensions
function vector_times_matrix(arg1, arg2){// Returns a vector
	var i, j, m = arg2[0].length, n = arg1.length, result = [], sum;
	for (i = 0; i < m; i++){
		sum = 0;
		for (j = 0; j < n; j++)
			sum += arg1[j] * arg2[j][i];
		result.push(sum);
	}
	return result;
}
function matrix_times_vector(arg1, arg2){// Returns a vector
	var i, j, m = arg1.length, n = arg2.length, result = [], sum;
	for (i = 0; i < m; i++){
		sum = 0;
		for (j = 0; j < n; j++)
			sum += arg1[i][j] * arg2[j];
		result.push(sum);
	}
	return result;
}
function matrix_times_matrix(arg1, arg2){// Returns a matrix
	var i, j, k, m = arg1.length, n = arg2.length, p = arg2[0].length, row, result = [], sum;
	for (i = 0; i < m; i++){
		row = [];
		for (j = 0; j < p; j++){
			sum = 0;
			for (k = 0; k < n; k++)
				sum += (arg1[i][k] * arg2[k][j]);
			row.push(sum);
		}
		result.push(row);
	}
	return result;
}
function sum_of_vectors(arg){
	var i, j, result = arg[0];
	for (i = 1; i < arg.length; i++)
		for (j = 0; j < arg[i].length; j++)
			result[j] += arg[i][j];
	return result;
}
