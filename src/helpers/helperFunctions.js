import React from "react";
import dutchFlag from "../assets/images/flags/flag-netherlands.png";

export const getFlag = country => {
	switch (country) {
		case "Netherlands":
			return <img src={dutchFlag} alt={country} />;
		default:
			return null;
	}
};
