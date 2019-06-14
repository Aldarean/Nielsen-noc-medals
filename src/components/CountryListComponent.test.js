import React from "react";
import ReactDOM from "react-dom";
import CountryListComponent from "./CountryListComponent";

import { configure, shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { isExpressionWrapper } from "@babel/types";

configure({ adapter: new Adapter() });

test("renders without crashing", () => {
	shallow(<CountryListComponent countryDetails={{}} sportslist={[]} />);
});

test("test the click handler", () => {
	const container = mount(
		<CountryListComponent countryDetails={{}} sportslist={[]} />
	);

	// the state is initially false, so we call it twice to see how it will
	// affect the state.

	container.find(".country-listitem__countainer").simulate("click");
	container.update();
	expect(container.state("detailsOpenStatus")).toEqual(true);

	container.find(".country-listitem__countainer").simulate("click");
	container.update();
	expect(container.state("detailsOpenStatus")).toEqual(false);
});
