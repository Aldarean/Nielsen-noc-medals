import React from "react";
import PropTypes from "prop-types";
import { getFlag } from "../helpers/helperFunctions";
import CountrySportDetails from "./CountrySportDetails";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCaretDown,
	faCaretUp,
	faMedal
} from "@fortawesome/free-solid-svg-icons";

class CountryListComponent extends React.Component {
	state = {
		detailsOpenStatus: false
	};

	toggleDetailsOpenStatus = () => {
		this.setState({ detailsOpenStatus: !this.state.detailsOpenStatus });
	};

	render() {
		const { countryDetails, sportslist } = this.props;
		const flag = getFlag(countryDetails.c_Name);

		let goldMedalCount = 0;
		let silverMedalCount = 0;
		let bronzeMedalCount = 0;

		sportslist.map(sport => {
			goldMedalCount += sport.GoldMedalList.length;
			silverMedalCount += sport.SilverMedalList.length;
			bronzeMedalCount += sport.BronzeMedalList.length;
		});

		const medals = (
			<div className="country-listitem__medal-container">
				<div>
					<FontAwesomeIcon icon={faMedal} className="gold" /> {goldMedalCount}
				</div>
				<div>
					<FontAwesomeIcon icon={faMedal} className="silver" />{" "}
					{silverMedalCount}
				</div>
				<div>
					<FontAwesomeIcon icon={faMedal} className="bronze" />{" "}
					{bronzeMedalCount}
				</div>
			</div>
		);

		console.log("medals", goldMedalCount, silverMedalCount, bronzeMedalCount);

		const caret =
			this.state.detailsOpenStatus === false ? (
				<FontAwesomeIcon icon={faCaretDown} />
			) : (
				<FontAwesomeIcon icon={faCaretUp} />
			);

		return (
			<div
				className="country-listitem__countainer"
				onClick={this.toggleDetailsOpenStatus}
			>
				<div className="country-listitem__flag-container">{flag}</div>

				<div className="country-listitem__country-name">
					{countryDetails.c_Name}
					{medals}
				</div>

				<div className="country-listitem__caret">{caret}</div>

				<CountrySportDetails
					sportslist={sportslist}
					openDetailsStatus={this.state.detailsOpenStatus}
				/>
			</div>
		);
	}
}

CountryListComponent.propTypes = {
	countryDetails: PropTypes.object.isRequired,
	sportslist: PropTypes.array.isRequired
};

export default CountryListComponent;
