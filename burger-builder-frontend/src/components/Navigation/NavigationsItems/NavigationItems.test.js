// This file having extension *.test.js is automatically picked by react
// this file should be kept along with component file in the same folder.
// The tests are run through npm and nodejs

import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

// configuring enzyme for react
configure({
    adapter: new Adapter()
});

// Which kind of tests to run
describe("<NavigationItems />", () => {
    // To prevent the multiple rendering using wrapper in each test, we can use beforeEach() which is executed before every test and setProps() to set attributes for each test.

    let wrapper = null;
    beforeEach(() => {
        wrapper = shallow(<NavigationItems />);
        // other than shallow, mount() and render() is exist for full tree rendering
    })

    // actual tests
    it("should render two <NavigationItem /> elements if not authenticated", () => {
        // Have the instance of the component
        // enzyme allows to render component standalone for isolated testing
        // const wrapper = shallow(<NavigationItems />);

        // These are provided by jest
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it("should render three <NavigationItem /> elements if authenticated", () => {
        // Have the instance of the component
        // enzyme allows to render component standalone for isolated testing

        // Passing props is done in wrapper call
        // const wrapper = shallow(<NavigationItems isAuthenticated/>);

        // wrapper also has setState()
        wrapper.setProps({
            isAuthenticated: true 
        });

        // These are provided by jest
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    it("should render Logout NavigationItem if authenticated", () => {
        wrapper.setProps({
            isAuthenticated: true
        });

        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);   // writing test for specific using contains()
    })

}); 