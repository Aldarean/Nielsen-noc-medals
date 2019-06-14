import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMedal } from "@fortawesome/free-solid-svg-icons";
import { pathToFileURL } from "url";

class CountrySportDetails extends React.Component {
	/**
	 * get the medals for a type of medal and append it to the object passed.
	 * @param {string} medalType - The type of medal
	 * @param {object} sport - Contains the original sprot object passed fromt he api.
	 * @param {string} gender - The short name of the gender capitalized. either "M" or "W"
	 * @param {object} sportObjToSend - The object we append to to create our structure. it contaisn an object with the sport
	 *									e.g. { sport: {"name": "short track"}
	 */
	appendMedals(medalType, sport, gender, sportObjToSend) {
		sportObjToSend.sport["gender"] = gender;
		if (sport[medalType].length > 0) {
			// We get the medalwinner with the specified gender only
			sportObjToSend.sport[medalType] = sport[medalType].filter(sportman => {
				if (sportman.Gender.c_Short === gender) {
					return sportman;
				}
			});
		} else {
			sportObjToSend.sport[medalType] = [];
		}
	}

	getSportsAndMedals = (sportslist, gender) => {
		const sportList = sportslist.map(sport => {
			const sportObjToSend = { sport: { name: sport.Sport.c_Name } };

			// Get the medal types per gender.
			this.appendMedals("BronzeMedalList", sport, gender, sportObjToSend);
			this.appendMedals("SilverMedalList", sport, gender, sportObjToSend);
			this.appendMedals("GoldMedalList", sport, gender, sportObjToSend);

			return sportObjToSend;
		});

		return sportList;
	};

	renderSportmanEvent = (medalList, medal) => {
		console.log("medalList", medal, medalList);

		const sportmanEventUi = medalList.map(sportmanDetails => {
			console.log(medal);

			// TODO Need to render the team here. however the data from the api is empty. better luck next time...
			const sportmanName =
				sportmanDetails.Participant.c_Participant === "Netherlands"
					? "Team"
					: sportmanDetails.Participant.c_Participant;
			const event = sportmanDetails.Event.c_Name;
			let medalColor = "";

			switch (medal) {
				case "bronze":
					medalColor = <FontAwesomeIcon icon={faMedal} className="bronze" />;
					break;
				case "silver":
					medalColor = <FontAwesomeIcon icon={faMedal} className="silver" />;
					break;
				case "gold":
					medalColor = <FontAwesomeIcon icon={faMedal} className="gold" />;
					break;
			}

			return (
				<tr>
					<td>{sportmanName}</td>
					<td>{event}</td>
					<td>{medalColor}</td>
				</tr>
			);
		});
		return sportmanEventUi;
	};

	renderSports = sportList => {
		const sportListUi = sportList.map(sport => {
			const sportGender = sport.sport.gender === "M" ? "Male" : "Female";

			const eventsGold = this.renderSportmanEvent(
				sport.sport.GoldMedalList,
				"gold"
			);

			const eventsSilver = this.renderSportmanEvent(
				sport.sport.SilverMedalList,
				"silver"
			);

			const eventsBronze = this.renderSportmanEvent(
				sport.sport.BronzeMedalList,
				"bronze"
			);

			let events = null;
			if (
				sport.sport.BronzeMedalList.length === 0 &&
				sport.sport.SilverMedalList.length === 0 &&
				sport.sport.GoldMedalList.length === 0
			) {
				events = "N/A";
			} else {
				events = (
					<table>
						<tr>
							<th>Name</th>
							<th>Event</th>
							<th>Medal</th>
						</tr>
						{eventsGold}
						{eventsSilver}
						{eventsBronze}
					</table>
				);
			}

			return (
				<React.Fragment>
					<div key={sport.sport.name} className="sport-listitem__header">
						{sport.sport.name} - {sportGender}
					</div>

					<div className="sport-listitem__body">{events}</div>
				</React.Fragment>
			);
		});

		return sportListUi;
	};

	render() {
		const { openDetailsStatus, sportslist } = this.props;

		let sportsMen = {};
		let sportsWomen = {};

		const showDetails =
			openDetailsStatus === false
				? "sport-details__countainer hide"
				: "sport-details__countainer";

		sportsMen = this.getSportsAndMedals(sportslist, "M");
		sportsWomen = this.getSportsAndMedals(sportslist, "W");

		const sportListMaleUi = this.renderSports(sportsMen);
		const sportListWomenUi = this.renderSports(sportsWomen);

		return (
			<div className={showDetails}>
				<div className="sport-listitem__container">{sportListMaleUi}</div>

				<div className="sport-listitem__container width-override">
					{sportListWomenUi}
				</div>
			</div>
		);
	}
}

CountrySportDetails.propTypes = {
	openDetailsStatus: PropTypes.bool.isRequired,
	sportslist: PropTypes.array.isRequired
};

export default CountrySportDetails;
