const calculateButton = document.getElementById("calculate");
const mainResult = document.getElementById("mainResult");

calculateButton.addEventListener("click", () => {
	let classesAttended = parseInt(document.getElementById("classesAttended").value);
	let totalClasses = parseInt(document.getElementById("totalClasses").value);
	let percentageRequired = parseFloat(document.getElementById("percentageRequired").value);

	let currentPercentage = (classesAttended / totalClasses) * 100;

	if (classesAttended >= 0 && totalClasses > 0 && classesAttended <= totalClasses && percentageRequired >= 60 && percentageRequired <= 90) {
		if (currentPercentage >= percentageRequired) {
			let daysToMiss = -1;
			while (currentPercentage >= percentageRequired) {
				totalClasses += 1;
				currentPercentage = (classesAttended / totalClasses) * 100;
				daysToMiss += 1;
			}
			mainResult.innerHTML = `<p>You can miss <span>${daysToMiss}</span> classes and still maintain <span>${percentageRequired}% attendance</span>.</p>`;
		} else {
			let daysToAttend = 0;
			while (currentPercentage < percentageRequired) {
				classesAttended += 1;
				totalClasses += 1;
				currentPercentage = (classesAttended / totalClasses) * 100;
				daysToAttend += 1;
			}
			mainResult.innerHTML = `<p>Need to Attend <span>${daysToAttend}</span> classes to maintain <span>${percentageRequired}% attendance</span>.</p>`;
		}
	} else {
		mainResult.innerHTML = `<p>Please Enter <span>Proper</span> Values.</p>`;
	}
});

//TODO:
// correct grammar in the inner.html and switch from classes to class when its 1 or vise versa.
