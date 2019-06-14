import React from "react";
import "./App.css";

import MedalData from "./data/medal-data.json";
import CountryListComponent from "./components/CountryListComponent";

function App() {
	// sets the data for the medailes of a country.
	// TODO: if multiple country data sets are present, use a Map function around this.
	const noc = MedalData.NOCMedals.NOC;
	const sportslist = MedalData.SportList;

	return (
		<section className="medal-container">
			<p>Click on one of the countries to see the details.</p>

			<div className="country-container">
				<CountryListComponent countryDetails={noc} sportslist={sportslist} />
			</div>
		</section>
	);
}

export default App;
