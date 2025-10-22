const calculateButton = document.getElementById("mainCalculate");
const mainResult = document.getElementById("mainResult");
const resetButton = document.getElementById("resetButton");

function resultMessage(days, percentageRequired, action = "miss") {
	if (days === 0) {
		return `You can’t miss any classes, or your attendance will drop below ${percentageRequired}%.`;
	} else if (days === 1) {
		return action === "miss" ? `You can miss 1 class and still maintain ${percentageRequired}% attendance.` : `You need to attend 1 class to maintain ${percentageRequired}% attendance.`;
	} else {
		return action === "miss" ? `You can miss ${days} classes and still maintain ${percentageRequired}% attendance.` : `You need to attend ${days} classes to maintain ${percentageRequired}% attendance.`;
	}
}

resetButton.addEventListener("click", () => {
	document.getElementById("totalClasses").value = "";
	document.getElementById("classesAttended").value = "";
	document.getElementById("percentageRequired").value = "";
});

calculateButton.addEventListener("click", () => {
	let totalClasses = parseInt(document.getElementById("totalClasses").value);
	let classesAttended = parseInt(document.getElementById("classesAttended").value);
	let percentageRequired = parseFloat(document.getElementById("percentageRequired").value);

	let currentPercentage = (classesAttended / totalClasses) * 100;

	if (classesAttended >= 0 && classesAttended <= totalClasses && totalClasses <= 100 && percentageRequired >= 60 && percentageRequired <= 90) {
		if (currentPercentage >= percentageRequired) {
			let daysToMiss = -1;
			while (currentPercentage >= percentageRequired) {
				totalClasses += 1;
				currentPercentage = (classesAttended / totalClasses) * 100;
				daysToMiss += 1;
			}
			mainResult.innerHTML = `${resultMessage(daysToMiss, percentageRequired, "miss")}`;
		} else {
			let daysToAttend = 0;
			while (currentPercentage < percentageRequired) {
				classesAttended += 1;
				totalClasses += 1;
				currentPercentage = (classesAttended / totalClasses) * 100;
				daysToAttend += 1;
			}
			mainResult.innerHTML = `${resultMessage(daysToAttend, percentageRequired, "attend")}`;
		}
	} else {
		mainResult.innerHTML = `Please enter proper values.`;
	}
});
