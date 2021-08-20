
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

		// ========== ************** === Oceania Continent ========== ************** ===

		// - Left side -
		const continentNameOceania = document.querySelector('.continent-title-oceania');
		continentNameOceania.innerText = continentDatas[0]['continent'];

		const continentNewCasesOceania = document.querySelector('.continent-new-cases-result-oceania');
		continentNewCasesOceania.innerText = continentDatas[0]['todayCases'];


		const continentAllCasesOceania = document.querySelector('.continent-all-cases-oceania');
		continentAllCasesOceania.innerText = `All cases: ${continentDatas[0]['cases']}`;

		// -- -- --

		// - Right side -

		const continentNewDeathsOceania = document.querySelector('.continent-new-deaths-result-right-oceania');
		continentNewDeathsOceania.innerText = continentDatas[0]['todayDeaths'];

		const continentTotalDeathsOceania = document.querySelector('.continent-total-deaths-result-right-oceania');
		continentTotalDeathsOceania.innerText = `Total deaths: ${continentDatas[0]['deaths']}`;

		// -- -- --

		const continentNewlyRecoveredOceania = document.querySelector('.continent-new-recovered-result-right-oceania');
		continentNewlyRecoveredOceania.innerText = continentDatas[0]['recovered'];

		// -- -- --

		const continentTotalRecoveredOceania = document.querySelector('.continent-total-recovered-oceania');
		continentTotalRecoveredOceania.innerText = `Total recovered: N/A`;

		// -- -- --

		const continentNewVaccinatedOceania = document.querySelector('.continent-new-vaccinated-result-right-oceania');
		continentNewVaccinatedOceania.innerText = "N/A";

		// -- -- --

		const continentTotalVaccinatedOceania = document.querySelector('.continent-total-vaccinated-right-oceania');
		continentTotalVaccinatedOceania.innerText = "Total vaccinated: N/A";


		// ========== ************** === Asia Continent ========== ************** ===

		// - Left side -
		const continentNameAsia = document.querySelector('.continent-title-asia');
		continentNameAsia.innerText = continentDatas[1]['continent'];

		const continentNewCasesAsia = document.querySelector('.continent-new-cases-result-asia');
		continentNewCasesAsia.innerText = continentDatas[1]['todayCases'];


		const continentAllCasesAsia = document.querySelector('.continent-all-cases-asia');
		continentAllCasesAsia.innerText = `All cases: ${continentDatas[1]['cases']}`;

		// -- -- --

		// - Right side -

		const continentNewDeathsAsia = document.querySelector('.continent-new-deaths-result-right-asia');
		continentNewDeathsAsia.innerText = continentDatas[1]['todayDeaths'];

		const continentTotalDeathsAsia = document.querySelector('.continent-total-deaths-result-right-asia');
		continentTotalDeathsAsia.innerText = `Total deaths: ${continentDatas[1]['deaths']}`;

		// -- -- --

		const continentNewlyRecoveredAsia = document.querySelector('.continent-new-recovered-result-right-asia');
		continentNewlyRecoveredAsia.innerText = continentDatas[1]['recovered'];

		// -- -- --

		const continentTotalRecoveredAsia = document.querySelector('.continent-total-recovered-asia');
		continentTotalRecoveredAsia.innerText = `Total recovered: N/A`;

		// -- -- --

		const continentNewVaccinatedAsia = document.querySelector('.continent-new-vaccinated-result-right-asia');
		continentNewVaccinatedAsia.innerText = "N/A";

		// -- -- --

		const continentTotalVaccinatedAsia = document.querySelector('.continent-total-vaccinated-right-asia');
		continentTotalVaccinatedAsia.innerText = "Total vaccinated: N/A";

		// ========== ************** === North America Continent ========== ************** ===

		// - Left side -
		const continentNameNorth_america = document.querySelector('.continent-title-north_america');
		continentNameNorth_america.innerText = continentDatas[2]['continent'];

		const continentNewCasesNorth_america = document.querySelector('.continent-new-cases-result-north_america');
		continentNewCasesNorth_america.innerText = continentDatas[2]['todayCases'];


		const continentAllCasesNorth_america = document.querySelector('.continent-all-cases-north_america');
		continentAllCasesNorth_america.innerText = `All cases: ${continentDatas[2]['cases']}`;

		// -- -- --

		// - Right side -

		const continentNewDeathsNorth_america = document.querySelector('.continent-new-deaths-result-right-north_america');
		continentNewDeathsNorth_america.innerText = continentDatas[2]['todayDeaths'];

		const continentTotalDeathsNorth_america = document.querySelector('.continent-total-deaths-result-right-north_america');
		continentTotalDeathsNorth_america.innerText = `Total deaths: ${continentDatas[2]['deaths']}`;

		// -- -- --

		const continentNewlyRecoveredNorth_america = document.querySelector('.continent-new-recovered-result-right-north_america');
		continentNewlyRecoveredNorth_america.innerText = continentDatas[2]['recovered'];

		// -- -- --

		const continentTotalRecoveredNorth_america = document.querySelector('.continent-total-recovered-north_america');
		continentTotalRecoveredNorth_america.innerText = `Total recovered: N/A`;

		// -- -- --

		const continentNewVaccinatedNorth_america = document.querySelector('.continent-new-vaccinated-result-right-north_america');
		continentNewVaccinatedNorth_america.innerText = "N/A";

		// -- -- --

		const continentTotalVaccinatedNorth_america = document.querySelector('.continent-total-vaccinated-right-north_america');
		continentTotalVaccinatedNorth_america.innerText = "Total vaccinated: N/A";


		// ========== ************** === Europe Continent ========== ************** ===

		// - Left side -
		const continentNameEurope = document.querySelector('.continent-title-europe');
		continentNameEurope.innerText = continentDatas[3]['continent'];

		const continentNewCasesEurope = document.querySelector('.continent-new-cases-result-europe');
		continentNewCasesEurope.innerText = continentDatas[3]['todayCases'];


		const continentAllCasesEurope = document.querySelector('.continent-all-cases-europe');
		continentAllCasesEurope.innerText = `All cases: ${continentDatas[3]['cases']}`;

		// -- -- --

		// - Right side -

		const continentNewDeathsEurope = document.querySelector('.continent-new-deaths-result-right-europe');
		continentNewDeathsEurope.innerText = continentDatas[3]['todayDeaths'];

		const continentTotalDeathsEurope = document.querySelector('.continent-total-deaths-result-right-europe');
		continentTotalDeathsEurope.innerText = `Total deaths: ${continentDatas[3]['deaths']}`;

		// -- -- --

		const continentNewlyRecoveredEurope = document.querySelector('.continent-new-recovered-result-right-europe');
		continentNewlyRecoveredEurope.innerText = continentDatas[3]['recovered'];

		// -- -- --

		const continentTotalRecoveredEurope = document.querySelector('.continent-total-recovered-europe');
		continentTotalRecoveredEurope.innerText = `Total recovered: N/A`;

		// -- -- --

		const continentNewVaccinatedEurope = document.querySelector('.continent-new-vaccinated-result-right-europe');
		continentNewVaccinatedEurope.innerText = "N/A";

		// -- -- --

		const continentTotalVaccinatedEurope = document.querySelector('.continent-total-vaccinated-right-europe');
		continentTotalVaccinatedEurope.innerText = "Total vaccinated: N/A";



		// ========== ************** === Africa Continent === *************** ==========

		// - Left side -
		const continentNameAfrica = document.querySelector('.continent-title-africa');
		continentNameAfrica.innerText = continentDatas[4]['continent'];

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

		const continentTotalVaccinatedAfrica = document.querySelector('.continent-total-vaccinated-right-africa');
		continentTotalVaccinatedAfrica.innerText = "Total vaccinated: N/A";




		// ========== ************** === South America Continent ========== ************** ===

		// - Left side -
		const continentNameSouth_america = document.querySelector('.continent-title-south_america');
		continentNameSouth_america.innerText = continentDatas[5]['continent'];

		const continentNewCasesSouth_america = document.querySelector('.continent-new-cases-result-south_america');
		continentNewCasesSouth_america.innerText = continentDatas[5]['todayCases'];


		const continentAllCasesSouth_america = document.querySelector('.continent-all-cases-south_america');
		continentAllCasesSouth_america.innerText = `All cases: ${continentDatas[5]['cases']}`;

		// -- -- --

		// - Right side -

		const continentNewDeathsSouth_america = document.querySelector('.continent-new-deaths-result-right-south_america');
		continentNewDeathsSouth_america.innerText = continentDatas[5]['todayDeaths'];

		const continentTotalDeathsSouth_america = document.querySelector('.continent-total-deaths-result-right-south_america');
		continentTotalDeathsSouth_america.innerText = `Total deaths: ${continentDatas[5]['deaths']}`;

		// -- -- --

		const continentNewlyRecoveredSouth_america = document.querySelector('.continent-new-recovered-result-right-south_america');
		continentNewlyRecoveredSouth_america.innerText = continentDatas[5]['recovered'];

		// -- -- --

		const continentTotalRecoveredSouth_america = document.querySelector('.continent-total-recovered-south_america');
		continentTotalRecoveredSouth_america.innerText = `Total recovered: N/A`;

		// -- -- --

		const continentNewVaccinatedSouth_america = document.querySelector('.continent-new-vaccinated-result-right-south_america');
		continentNewVaccinatedSouth_america.innerText = "N/A";

		// -- -- --

		const continentTotalVaccinatedSouth_america = document.querySelector('.continent-total-vaccinated-right-south_america');
		continentTotalVaccinatedSouth_america.innerText = "Total vaccinated: N/A";
	})
}

getContinentCovidData();


$(document).ready(function(){
	$(".owl-carousel").owlCarousel({
		// margin:10,
		center: true,
		loop:true,
		responsiveClass:true,
		responsive:{
			0:{
				items:1,
				nav:true
			},
			768:{
				items:1,
				nav:true,
			},
			1000:{
				items:2,
				nav:true,
			},
			2000:{
				items:3,
				nav:true,
			}
		}
	});
});







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













