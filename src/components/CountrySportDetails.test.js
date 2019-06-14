import React from "react";
import ReactDOM from "react-dom";
import CountrySportDetails from "./CountrySportDetails";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

test("renders without crashing", () => {
	shallow(<CountrySportDetails openDetailsStatus={true} sportslist={[]} />);
});
