const calculateButton = document.getElementById("calculate");
const mainResult = document.getElementById("mainResult");

calculateButton.addEventListener("click", () => {
	let classesAttended = parseInt(document.getElementById("classesAttended").value);
	let totalClasses = parseInt(document.getElementById("totalClasses").value);
	let percentageRequired = parseFloat(document.getElementById("percentageRequired").value);

	let currentPercentage = (classesAttended / totalClasses) * 100;

	if (classesAttended >= 0 && classesAttended <= totalClasses && percentageRequired >= 60 && percentageRequired <= 90) {
		if (currentPercentage >= percentageRequired) {
			let daysToBunk = -1;
			while (currentPercentage >= percentageRequired) {
				totalClasses += 1;
				currentPercentage = (classesAttended / totalClasses) * 100;
				daysToBunk += 1;
			}
			mainResult.textContent = `You can bunk ${daysToBunk} classes.`;
		} else {
			let daysToAttend = 0;
			while (currentPercentage < percentageRequired) {
				classesAttended += 1;
				totalClasses += 1;
				currentPercentage = (classesAttended / totalClasses) * 100;
				daysToAttend += 1;
			}
			// window.alert(`Need to Attend ${daysToAttend} classes.`);
			mainResult.textContent = `Need to Attend ${daysToAttend} classes.`;
		}
	} else {
		// window.alert("Proper Values Please");
		mainResult.textContent = `Please Enter Proper Values.`;
	}
});

//TODO: switch to inner.HTML and change lines 19, 29 and 33.
