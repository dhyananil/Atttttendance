const menuButton = document.getElementById("navbarMenuButton");
const navLinks = document.querySelector("#mainNavigation ul");
const calculateButton = document.getElementById("mainCalculate");
const mainResult = document.getElementById("mainResult");
const resetButton = document.getElementById("resetButton");
const totalClassesInput = document.getElementById("totalClasses");
const classesAttendedInput = document.getElementById("classesAttended");
const percentageRequiredInput = document.getElementById("percentageRequired");

const colorScheme = window.matchMedia("(prefers-color-scheme: dark)");

function applyTheme(isDark) {
	document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");

	logoImage.src = isDark ? "images/png/darkTheme/logoMain.png" : "images/png/lightTheme/logoMain.png";
	menuImage.src = isDark ? "images/png/darkTheme/menuOpen.png" : "images/png/lightTheme/menuOpen.png";
}

applyTheme(colorScheme.matches);

function resultMessage(days, percentageRequired, action = "miss") {
	if (days === 0) {
		return `You <strong style="font-size: 1.25rem"> can't miss any </strong> classes, or your attendance will <strong style="font-size: 1.25rem"> drop </strong> below <strong style="font-size: 1.25rem"> ${percentageRequired}% </strong>`;
	} else if (days === 1) {
		return action === "miss" ? `You <strong style="font-size: 1.25rem"> can miss 1 </strong> class and still <strong style="font-size: 1.25rem"> maintain ${percentageRequired}% </strong> attendance` : `You <strong style="font-size: 1.25rem"> need to attend 1 </strong> class to <strong style="font-size: 1.25rem"> maintain ${percentageRequired}% </strong> attendance`;
	} else {
		return action === "miss" ? `You <strong style="font-size: 1.25rem"> can miss ${days} </strong> classes and still <strong style="font-size: 1.25rem"> maintain ${percentageRequired}% </strong> attendance` : `You <strong style="font-size: 1.25rem"> need to attend ${days} </strong> classes to <strong style="font-size: 1.25rem"> maintain ${percentageRequired}% </strong> attendance`;
	}
}

resetButton.addEventListener("click", () => {
	mainResult.style.color = getComputedStyle(document.documentElement).getPropertyValue("--mainResultStyle");

	document.getElementById("totalClasses").value = "";
	document.getElementById("classesAttended").value = "";
	document.getElementById("percentageRequired").value = "";

	document.querySelectorAll("input").forEach((input) => {
		input.classList.remove("input-error");
	});

	window.scrollTo({ top: 0, behavior: "smooth" });
});

calculateButton.addEventListener("click", () => {
	mainResult.style.color = getComputedStyle(document.documentElement).getPropertyValue("--mainResultColor");

	const totalInput = document.getElementById("totalClasses");
	const attendedInput = document.getElementById("classesAttended");
	const percentInput = document.getElementById("percentageRequired");

	let totalClasses = parseInt(totalInput.value);
	let classesAttended = parseInt(attendedInput.value);
	let percentageRequired = parseFloat(percentInput.value);

	document.querySelectorAll("input").forEach((input) => {
		input.classList.remove("input-error");
	});

	let isValid = true;

	if (!totalClasses || totalClasses <= 0 || totalClasses > 5000) {
		totalInput.classList.add("input-error");
		isValid = false;
	}
	if (classesAttended < 0 || classesAttended > totalClasses || isNaN(classesAttended)) {
		attendedInput.classList.add("input-error");
		isValid = false;
	}
	if (!percentageRequired || percentageRequired < 60 || percentageRequired > 90) {
		percentInput.classList.add("input-error");
		isValid = false;
	}
	if (!isValid) {
		mainResult.innerHTML = `Please enter <strong style="font-size: 1.25rem"> proper </strong> values`;
		mainResult.scrollIntoView({ behavior: "smooth", block: "start" });
		return;
	}

	let currentPercentage = (classesAttended / totalClasses) * 100;

	if (currentPercentage >= percentageRequired) {
		let daysToMiss = -1;
		while (currentPercentage >= percentageRequired) {
			totalClasses += 1;
			currentPercentage = (classesAttended / totalClasses) * 100;
			daysToMiss += 1;
		}
		mainResult.innerHTML = resultMessage(daysToMiss, percentageRequired, "miss");
	} else {
		let daysToAttend = 0;
		while (currentPercentage < percentageRequired) {
			classesAttended += 1;
			totalClasses += 1;
			currentPercentage = (classesAttended / totalClasses) * 100;
			daysToAttend += 1;
		}
		mainResult.innerHTML = resultMessage(daysToAttend, percentageRequired, "attend");
	}

	mainResult.scrollIntoView({ behavior: "smooth", block: "start" });
});

menuButton.addEventListener("click", () => {
	const isDark = document.documentElement.dataset.theme === "dark";

	navLinks.classList.toggle("open");

	if (navLinks.classList.contains("open")) {
		menuImage.src = isDark ? "images/png/darkTheme/menuClose.png" : "images/png/lightTheme/menuClose.png";
		document.documentElement.style.overflowY = "hidden";
	} else {
		menuImage.src = isDark ? "images/png/darkTheme/menuOpen.png" : "images/png/lightTheme/menuOpen.png";
		document.documentElement.style.overflowY = "";
	}
});

totalClassesInput.addEventListener("keydown", (event) => {
	if (event.key === "Enter") {
		classesAttendedInput.focus();
	}
});
classesAttendedInput.addEventListener("keydown", (event) => {
	if (event.key === "Enter") {
		percentageRequiredInput.focus();
	}
});
percentageRequiredInput.addEventListener("keydown", (event) => {
	if (event.key === "Enter") {
		calculateButton.click();
	}
});

colorScheme.addEventListener("change", (event) => {
	applyTheme(event.matches);
});
