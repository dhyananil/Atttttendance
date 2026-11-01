const navLinks = document.querySelector("#mainNavigation ul");
const themeButton = document.getElementById("themeButton");
const menuButton = document.getElementById("menuButton");

const logoImage = document.getElementById("logoImage");
const themeImage = document.getElementById("themeImage");
const menuImage = document.getElementById("menuImage");

const totalClassesInput = document.getElementById("totalClasses");
const classesAttendedInput = document.getElementById("classesAttended");
const percentageRequiredInput = document.getElementById("percentageRequired");

const calculateButton = document.getElementById("mainCalculate");
const resetButton = document.getElementById("resetButton");
const mainResult = document.getElementById("mainResult");

const colorScheme = window.matchMedia("(prefers-color-scheme: dark)");

function applyTheme(isDark) {
	document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");

	logoImage.src = isDark ? "images/png/darkTheme/logoMain.png" : "images/png/lightTheme/logoMain.png";
	themeImage.src = isDark ? "images/png/darkTheme/themeButton.png" : "images/png/lightTheme/themeButton.png";
	menuImage.src = isDark ? "images/png/darkTheme/menuOpen.png" : "images/png/lightTheme/menuOpen.png";

	mainResult.style.color = getComputedStyle(document.documentElement).getPropertyValue("--mainResultStyle");
}

applyTheme(colorScheme.matches);

function validateInput(input) {
	let value = parseFloat(input.value);
	let isValid = true;

	input.classList.remove("input-error");

	if (input.id === "totalClasses") {
		if (!value || value < 1 || value > 5000) {
			isValid = false;
		}
	}

	if (input.id === "classesAttended") {
		let totalClasses = parseFloat(totalClassesInput.value);

		if (isNaN(totalClasses) || isNaN(value) || value < 0 || value > totalClasses) {
			isValid = false;
		}
	}

	if (input.id === "percentageRequired") {
		if (!value || value < 60 || value > 90) {
			isValid = false;
		}
	}

	if (!isValid) {
		input.classList.add("input-error");
	}

	return isValid;
}

function resultMessage(days, percentageRequired, action = "miss") {
	if (days === 0) {
		return `You <strong style="font-size: 1.25rem"> can't miss any </strong> classes, or your attendance will <strong style="font-size: 1.25rem"> drop </strong> below <strong style="font-size: 1.25rem"> ${percentageRequired}% </strong>`;
	} else if (days === 1) {
		return action === "miss" ? `You <strong style="font-size: 1.25rem"> can miss 1 </strong> class and still <strong style="font-size: 1.25rem"> maintain ${percentageRequired}% </strong> attendance` : `You <strong style="font-size: 1.25rem"> need to attend 1 </strong> class to <strong style="font-size: 1.25rem"> maintain ${percentageRequired}% </strong> attendance`;
	} else {
		return action === "miss" ? `You <strong style="font-size: 1.25rem"> can miss ${days} </strong> classes and still <strong style="font-size: 1.25rem"> maintain ${percentageRequired}% </strong> attendance` : `You <strong style="font-size: 1.25rem"> need to attend ${days} </strong> classes to <strong style="font-size: 1.25rem"> maintain ${percentageRequired}% </strong> attendance`;
	}
}

calculateButton.addEventListener("click", () => {
	mainResult.style.color = getComputedStyle(document.documentElement).getPropertyValue("--mainResultColor");

	let totalClasses = parseInt(totalClassesInput.value);
	let classesAttended = parseInt(classesAttendedInput.value);
	let percentageRequired = parseFloat(percentageRequiredInput.value);

	let isValid = true;

	if (!validateInput(totalClassesInput)) isValid = false;
	if (!validateInput(classesAttendedInput)) isValid = false;
	if (!validateInput(percentageRequiredInput)) isValid = false;

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

resetButton.addEventListener("click", () => {
	mainResult.style.color = getComputedStyle(document.documentElement).getPropertyValue("--mainResultStyle");

	totalClassesInput.value = "";
	classesAttendedInput.value = "";
	percentageRequiredInput.value = "";

	document.querySelectorAll("input").forEach((input) => {
		input.classList.remove("input-error");
	});

	window.scrollTo({ top: 0, behavior: "smooth" });
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

themeButton.addEventListener("click", () => {
	const isDark = document.documentElement.dataset.theme === "dark";

	applyTheme(!isDark);
});

totalClassesInput.addEventListener("blur", () => {
	validateInput(totalClassesInput);
});

classesAttendedInput.addEventListener("blur", () => {
	validateInput(classesAttendedInput);
});

percentageRequiredInput.addEventListener("blur", () => {
	validateInput(percentageRequiredInput);
});

totalClassesInput.addEventListener("keydown", (event) => {
	if (event.key === "Enter") {
		validateInput(totalClassesInput);
		classesAttendedInput.focus();
	}
});

classesAttendedInput.addEventListener("keydown", (event) => {
	if (event.key === "Enter") {
		validateInput(classesAttendedInput);
		percentageRequiredInput.focus();
	}
});

percentageRequiredInput.addEventListener("keydown", (event) => {
	if (event.key === "Enter") {
		validateInput(percentageRequiredInput);
		calculateButton.click();
	}
});

colorScheme.addEventListener("change", (event) => {
	applyTheme(event.matches);
});
