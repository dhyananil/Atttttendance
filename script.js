const menuButton = document.getElementById("navbarMenuButton");
const navLinks = document.querySelector("#mainNavigation ul");
const calculateButton = document.getElementById("mainCalculate");
const mainResult = document.getElementById("mainResult");
const resetButton = document.getElementById("resetButton");

function resultMessage(days, percentageRequired, action = "miss") {
	if (days === 0) {
		return `✱ You <strong style="font-size: 1.25rem"> can’t miss any </strong> classes, or your attendance will <strong style="font-size: 1.25rem"> drop </strong> below <strong style="font-size: 1.25rem"> ${percentageRequired}% </strong> ✱`;
	} else if (days === 1) {
		return action === "miss" ? `✱ You <strong style="font-size: 1.25rem"> can miss 1 </strong> class and still <strong style="font-size: 1.25rem"> maintain ${percentageRequired}% </strong> attendance ✱` : `✱ You <strong style="font-size: 1.25rem"> need to attend 1 </strong> class to <strong style="font-size: 1.25rem"> maintain ${percentageRequired}% </strong> attendance ✱`;
	} else {
		return action === "miss" ? `✱ You <strong style="font-size: 1.25rem"> can miss ${days} </strong> classes and still <strong style="font-size: 1.25rem"> maintain ${percentageRequired}% </strong> attendance ✱` : `✱ You <strong style="font-size: 1.25rem"> need to attend ${days} </strong> classes to <strong style="font-size: 1.25rem"> maintain ${percentageRequired}% </strong> attendance ✱`;
	}
}

resetButton.addEventListener("click", () => {
	window.scrollTo({ top: 0, behavior: "smooth" });

	document.getElementById("totalClasses").value = "";
	document.getElementById("classesAttended").value = "";
	document.getElementById("percentageRequired").value = "";

	mainResult.style.color = "#606060";
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
		mainResult.innerHTML = `✱ Please enter <strong style="font-size: 1.25rem"> proper </strong> values ✱`;
	}

	const section = document.getElementById("mainResult");
	if (section) {
		section.scrollIntoView({ behavior: "smooth", block: "start" });
	}
});

menuButton.addEventListener("click", () => {
	navLinks.classList.toggle("open");
	if (navLinks.classList.contains("open")) {
		menuImage.src = "images/png/menuClose.png";
	} else {
		menuImage.src = "images/png/menuOpen.png";
	}
});
