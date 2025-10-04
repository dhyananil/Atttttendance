const calculateButton = document.getElementById("calculate");

calculateButton.addEventListener("click", () => {
	let classesAttended = parseInt(document.getElementById("classesAttended").value);
	let totalClasses = parseInt(document.getElementById("totalClasses").value);
	let percentageRequired = parseFloat(document.getElementById("percentageRequired").value);

	let currentPercentage = (classesAttended / totalClasses) * 100;

	if (classesAttended >= 1 && totalClasses > 0 && percentageRequired >= 60 && percentageRequired <= 90) {
		if (currentPercentage >= percentageRequired) {
			let daysToBunk = -1;
			while (currentPercentage >= percentageRequired) {
				totalClasses += 1;
				currentPercentage = (classesAttended / totalClasses) * 100;
				daysToBunk += 1;
			}
			//print the days
			window.alert(`Can bunk ${daysToBunk} classes.`);
		} else {
			let daysToAttend = 0;
			while (currentPercentage < percentageRequired) {
				classesAttended += 1;
				totalClasses += 1;
				currentPercentage = (classesAttended / totalClasses) * 100;
				daysToAttend += 1;
			}
			//print the days
			window.alert(`Need to Attend ${daysToAttend} classes.`);
		}
	} else {
		//print error
		window.alert("Proper Values Please");
	}
});
