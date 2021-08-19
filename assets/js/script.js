
'use strict'

// if (window.navigator.geolocation) {
//  // Geolocation available
// } 

const countryInput = document.querySelector('.country-input');
const submitCountryButton = document.querySelector('.submit-country-btn');
const result = document.querySelector('.result');
const tests = document.querySelector('.tests');
const positiveCases = document.querySelector('.positive-cases');
const hospitalized = document.querySelector('.hospitalized');
const recovered = document.querySelector('.recovered');
const deaths = document.querySelector('.deaths');
const vaccinated = document.querySelector('.vaccinated');


// Function to Get country covid data

const getCountryCovidData = (countryName, countryInputForm) => {
	const myRequest = `https://corona.lmao.ninja/v2/countries/${countryName}?yesterday&strict&query%20`
	fetch(myRequest)
	.then(response => response.json())
	.then(data => {
		countryInputForm.value = data.country;
		result.innerText = data.cases;
		tests.innerText = data.tests;
		positiveCases.innerText = data.casesPerOneMillion;
		hospitalized.innerText = "N/A";
		recovered.innerText = data.recovered;
		deaths.innerText = data.deaths;
		vaccinated.innerText = "N/A"
	}).catch(console.error);
};

// Submit country to see their covid data
submitCountryButton.addEventListener('click', (e) => {
	// Prevent default behavior like refresh the window on form submit
	e.preventDefault();

	// Check if the form is not empty then give their data
	if(countryInput.value !== "") {
		// Capital the first letter of the input
		const fullCountryName = countryInput.value.charAt(0).toUpperCase() + countryInput.value.slice(1);
		// Call the function to get Country covid data
		getCountryCovidData(fullCountryName, countryInput);
	}
});

// Show covid data per continent

const getContinentCovidData = () => {
	const myRequestContinent = 'https://corona.lmao.ninja/v2/continents?yesterday&sort'
	fetch(myRequestContinent)
	.then(response => response.json())
	.then(continentDatas => {
		// ============= Africa Continent ==========

		// - Left side -
		const continentName = document.querySelector('.continent-title');
		continentName.innerText = continentDatas[4]['continent'];

		const continentNewCasesAfrica = document.querySelector('.continent-new-cases-result-africa');
		continentNewCasesAfrica.innerText = continentDatas[4]['todayCases'];

		const continentAllCasesAfrica = document.querySelector('.continent-all-cases-africa');
		continentAllCasesAfrica.innerText = `All cases: ${continentDatas[4]['cases']}`;

		// -- -- --

		// - Right side -

		const continentNewDeathsAfrica = document.querySelector('.continent-new-deaths-result-right-africa');
		continentNewDeathsAfrica.innerText = continentDatas[4]['todayDeaths'];

		const continentTotalDeathsAfrica = document.querySelector('.continent-total-deaths-result-right-africa');
		continentTotalDeathsAfrica.innerText = `Total deaths: ${continentDatas[4]['deaths']}`;

		// -- -- --

		const continentNewlyRecoveredAfrica = document.querySelector('.continent-new-recovered-result-right-africa');
		continentNewlyRecoveredAfrica.innerText = continentDatas[4]['recovered'];

		// -- -- --

		const continentTotalRecoveredAfrica = document.querySelector('.continent-total-recovered-africa');
		continentTotalRecoveredAfrica.innerText = `Total recovered: N/A`;

		// -- -- --

		const continentNewVaccinated = document.querySelector('.continent-new-vaccinated-result-right-africa');
		continentNewVaccinated.innerText = "N/A";

		// -- -- --

		const continentTotalVaccinated = document.querySelector('.continent-total-vaccinated-right-africa');
		continentTotalVaccinated.innerText = "Total vaccinated: N/A";

		// ============= Europe Continent ==========
	})
}

getContinentCovidData();










// // Auto completion

// var availableTags = [
// "ActionScript",
// "AppleScript",
// "Asp",
// "BASIC",
// "C",
// "C++",
// "Clojure",
// "COBOL",
// "ColdFusion",
// "Erlang",
// "Fortran",
// "Groovy",
// "Haskell",
// "Java",
// "JavaScript",
// "Lisp",
// "Perl",
// "PHP",
// "Python",
// "Ruby",
// "Scala",
// "Scheme"
// ];

// $("#country-input" ).autocomplete({
// 	source: availableTags
// });













