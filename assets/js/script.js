
'use strict'


const countryInput = document.querySelector('.country-input');
const submitCountryButton = document.querySelector('.submit-country-btn');
const result = document.querySelector('.result');
const tests = document.querySelector('.tests');
const positiveCases = document.querySelector('.positive-cases');
const hospitalized = document.querySelector('.hospitalized');
const recovered = document.querySelector('.recovered');
const deaths = document.querySelector('.deaths');
const vaccinated = document.querySelector('.vaccinated');

// country image in form
const countryImg = document.querySelector('.country-img');

// Autofocus and Auto select country input on form hover
countryInput.addEventListener('mouseover', () => {
	countryInput.focus();
	countryInput.select();
})

// Display current date in country input form
const todaysDate = document.querySelector('.date');

var currentDate = new Date();
var day = currentDate.getDate();
var month = currentDate.getMonth();
var year = currentDate.getFullYear();

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"
];

todaysDate.innerText = `${day} ${monthNames[month]} ${year}`;

// ---------- --- -------- -- --------- --- -------- ---

// Auto completion on search

/* An array containing all the country names in the world */
var countries = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua & Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia & Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central Arfrican Republic","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cuba","Curacao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauro","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","North Korea","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre & Miquelon","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","St Kitts & Nevis","St Lucia","St Vincent","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad & Tobago","Tunisia","Turkey","Turkmenistan","Turks & Caicos","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];

$("#country-input" ).autocomplete({
	source: countries
});


// Function to Get country covid data from api

const getCountryCovidData = (countryName, countryInputForm) => {
	const myRequest = `https://corona.lmao.ninja/v2/countries/${countryName}?yesterday&strict&query%20`
	fetch(myRequest)
	.then(response => response.json())
	.then(data => {
		if (data.country === undefined){
			countryInputForm.value = "";
			result.innerText = 0;
			tests.innerText = 0;
			positiveCases.innerText = 0;
			hospitalized.innerText = 0;
			recovered.innerText = 0;
			deaths.innerText = 0;
			vaccinated.innerText = 0;
			countryImg.src = "./assets/images/x.png";
		}else {
			countryInputForm.value = data.country;
			result.innerText = data.cases.toLocaleString();
			tests.innerText = data.tests.toLocaleString();
			positiveCases.innerText = data.casesPerOneMillion.toLocaleString();
			hospitalized.innerText = "N/A";
			recovered.innerText = data.recovered.toLocaleString();
			deaths.innerText = data.deaths.toLocaleString();
			vaccinated.innerText = "N/A";
			countryImg.src = data['countryInfo']['flag'];
		}
	}).catch(console.error);
};

// Get the rescent searched country in the local storage where it have been stored when submited the form
const recentSearchedCountry = localStorage.getItem('recentSearchedCountry');

// Show the covid 19 data stored in local storage for the recent searched country on load of the window
window.onload = (event) => {
	if(recentSearchedCountry === undefined){
		console.log("No recent searched country in local storage")
	}else {
		getCountryCovidData(recentSearchedCountry, countryInput);
	}
}


// Submit country by clicking submit button to see their covid 19 data
submitCountryButton.addEventListener('click', (e) => {
	// Prevent default behavior: like refresh the window on form submit
	e.preventDefault();

	// Check if the form is not empty then get the covid 19 data
	if(countryInput.value !== "") {
		// Capitalize the first letter of the input to avoid mismatching
		const fullCountryName = countryInput.value.charAt(0).toUpperCase() + countryInput.value.slice(1);

		// Call the function to get Country covid data
		getCountryCovidData(fullCountryName, countryInput);

		// Store the searched country localy
		localStorage.setItem('recentSearchedCountry', fullCountryName);
	}
});


// Submit country by clicking enter key to see their covid data
countryInput.addEventListener('keyup', (e) => {
	if(e.key === "Enter" || e.keycode === 13){
		// Prevent default behavior: like refresh the window on form submit
		e.preventDefault();

		// Check if the form is not empty then give their data
		if(countryInput.value !== "") {
			// Capitalize the first letter of the input to avoid mismatching
			const fullCountryName = countryInput.value.charAt(0).toUpperCase() + countryInput.value.slice(1);

			// Call the function to get Country covid data
			getCountryCovidData(fullCountryName, countryInput);
	
			// Store the searched country localy
			localStorage.setItem('recentSearchedCountry', fullCountryName);
		}
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
		continentNewCasesOceania.innerText = continentDatas[0]['todayCases'].toLocaleString();


		const continentAllCasesOceania = document.querySelector('.continent-all-cases-oceania');
		continentAllCasesOceania.innerText = `All cases: ${continentDatas[0]['cases'].toLocaleString()}`;

		// -- -- --

		// - Right side -

		const continentNewDeathsOceania = document.querySelector('.continent-new-deaths-result-right-oceania');
		continentNewDeathsOceania.innerText = continentDatas[0]['todayDeaths'].toLocaleString();

		const continentTotalDeathsOceania = document.querySelector('.continent-total-deaths-result-right-oceania');
		continentTotalDeathsOceania.innerText = `Total deaths: ${continentDatas[0]['deaths'].toLocaleString()}`;

		// -- -- --

		const continentNewlyRecoveredOceania = document.querySelector('.continent-new-recovered-result-right-oceania');
		continentNewlyRecoveredOceania.innerText = continentDatas[0]['recovered'].toLocaleString();

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
		continentNewCasesAsia.innerText = continentDatas[1]['todayCases'].toLocaleString();


		const continentAllCasesAsia = document.querySelector('.continent-all-cases-asia');
		continentAllCasesAsia.innerText = `All cases: ${continentDatas[1]['cases'].toLocaleString()}`;

		// -- -- --

		// - Right side -

		const continentNewDeathsAsia = document.querySelector('.continent-new-deaths-result-right-asia');
		continentNewDeathsAsia.innerText = continentDatas[1]['todayDeaths'].toLocaleString();

		const continentTotalDeathsAsia = document.querySelector('.continent-total-deaths-result-right-asia');
		continentTotalDeathsAsia.innerText = `Total deaths: ${continentDatas[1]['deaths'].toLocaleString()}`;

		// -- -- --

		const continentNewlyRecoveredAsia = document.querySelector('.continent-new-recovered-result-right-asia');
		continentNewlyRecoveredAsia.innerText = continentDatas[1]['recovered'].toLocaleString();

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
		continentNameNorth_america.innerText = continentDatas[2]['continent'].toLocaleString();

		const continentNewCasesNorth_america = document.querySelector('.continent-new-cases-result-north_america');
		continentNewCasesNorth_america.innerText = continentDatas[2]['todayCases'].toLocaleString();


		const continentAllCasesNorth_america = document.querySelector('.continent-all-cases-north_america');
		continentAllCasesNorth_america.innerText = `All cases: ${continentDatas[2]['cases'].toLocaleString()}`;

		// -- -- --

		// - Right side -

		const continentNewDeathsNorth_america = document.querySelector('.continent-new-deaths-result-right-north_america');
		continentNewDeathsNorth_america.innerText = continentDatas[2]['todayDeaths'].toLocaleString();

		const continentTotalDeathsNorth_america = document.querySelector('.continent-total-deaths-result-right-north_america');
		continentTotalDeathsNorth_america.innerText = `Total deaths: ${continentDatas[2]['deaths'].toLocaleString()}`;

		// -- -- --

		const continentNewlyRecoveredNorth_america = document.querySelector('.continent-new-recovered-result-right-north_america');
		continentNewlyRecoveredNorth_america.innerText = continentDatas[2]['recovered'].toLocaleString();

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
		continentNewCasesEurope.innerText = continentDatas[3]['todayCases'].toLocaleString();


		const continentAllCasesEurope = document.querySelector('.continent-all-cases-europe');
		continentAllCasesEurope.innerText = `All cases: ${continentDatas[3]['cases'].toLocaleString()}`;

		// -- -- --

		// - Right side -

		const continentNewDeathsEurope = document.querySelector('.continent-new-deaths-result-right-europe');
		continentNewDeathsEurope.innerText = continentDatas[3]['todayDeaths'].toLocaleString();

		const continentTotalDeathsEurope = document.querySelector('.continent-total-deaths-result-right-europe');
		continentTotalDeathsEurope.innerText = `Total deaths: ${continentDatas[3]['deaths'].toLocaleString()}`;

		// -- -- --

		const continentNewlyRecoveredEurope = document.querySelector('.continent-new-recovered-result-right-europe');
		continentNewlyRecoveredEurope.innerText = continentDatas[3]['recovered'].toLocaleString();

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
		continentNewCasesAfrica.innerText = continentDatas[4]['todayCases'].toLocaleString();


		const continentAllCasesAfrica = document.querySelector('.continent-all-cases-africa');
		continentAllCasesAfrica.innerText = `All cases: ${continentDatas[4]['cases'].toLocaleString()}`;

		// -- -- --

		// - Right side -

		const continentNewDeathsAfrica = document.querySelector('.continent-new-deaths-result-right-africa');
		continentNewDeathsAfrica.innerText = continentDatas[4]['todayDeaths'].toLocaleString();

		const continentTotalDeathsAfrica = document.querySelector('.continent-total-deaths-result-right-africa');
		continentTotalDeathsAfrica.innerText = `Total deaths: ${continentDatas[4]['deaths'].toLocaleString()}`;

		// -- -- --

		const continentNewlyRecoveredAfrica = document.querySelector('.continent-new-recovered-result-right-africa');
		continentNewlyRecoveredAfrica.innerText = continentDatas[4]['recovered'].toLocaleString();

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
		continentNewCasesSouth_america.innerText = continentDatas[5]['todayCases'].toLocaleString();


		const continentAllCasesSouth_america = document.querySelector('.continent-all-cases-south_america');
		continentAllCasesSouth_america.innerText = `All cases: ${continentDatas[5]['cases'].toLocaleString()}`;

		// -- -- --

		// - Right side -

		const continentNewDeathsSouth_america = document.querySelector('.continent-new-deaths-result-right-south_america');
		continentNewDeathsSouth_america.innerText = continentDatas[5]['todayDeaths'].toLocaleString();

		const continentTotalDeathsSouth_america = document.querySelector('.continent-total-deaths-result-right-south_america');
		continentTotalDeathsSouth_america.innerText = `Total deaths: ${continentDatas[5]['deaths'].toLocaleString()}`;

		// -- -- --

		const continentNewlyRecoveredSouth_america = document.querySelector('.continent-new-recovered-result-right-south_america');
		continentNewlyRecoveredSouth_america.innerText = continentDatas[5]['recovered'].toLocaleString();

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


// call the function to show covid 19 data for all the continents.
getContinentCovidData();





