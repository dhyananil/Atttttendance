const button = document.getElementById("button");

button.addEventListener("click", () => {
	const classesAttended = parseInt(document.getElementById("classesAttended").value);
	const totalClasses = parseInt(document.getElementById("totalClasses").value);
	const percentageRequired = parseInt(document.getElementById("percentageRequired").value);

	let currentPercentage = (classesAttended / totalClasses) * 100;
});

// let a = document.getElementById("classesAttended").value;
// let b = document.getElementById("totalClasses").value;
// let c = document.getElementById("percentageRequired").value;
//---------------------------------------------------------------
// let d = (a / b) * 100;

// if (a >= 10 && b > 0 && 50 <= c <= 90) {
// 	let d = (a / b) * 100;

// 	if (d >= c) {
// 		counter = -1;
// 		while (d >= c) {
// 			b += 1;
// 			d = (a / b) * 100;
// 			counter += 1;
// 		}
// 		//console.log or print => counter
// 	} else {
// 		counter = 0;
// 		while (d < c) {
// 			a += 1;
// 			b += 1;
// 			d = (a / b) * 100;
// 			counter += 1;
// 		}
// 		//console.log or print => counter
// 	}
// } else {
// 	//console.log or print => please enter proper values
// }
