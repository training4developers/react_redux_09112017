import * as React from 'react';
import * as TestUtils from 'react-dom/test-utils';
import { mount } from 'enzyme';

import { HelloWorld } from './hello-world';

jest.unmock('./hello-world');

describe('<HelloWorld /> Test Utils Mock DOM', () => {

  let component;
  let componentDOMNode;

  beforeEach(() => {
    component = TestUtils.renderIntoDocument(<HelloWorld />);
    componentDOMNode = TestUtils.findRenderedDOMComponentWithTag(component, 'h1');
  });

  test('<HelloWorld /> renders', () => {
    expect(componentDOMNode.textContent).toBe('Hello World!!');
  });

});

describe('<HelloWorld /> Enzyme Mock DOM', () => {

  let component;
  let componentDOMNode;

  beforeEach(() => {
    component = mount(<HelloWorld />);
    componentDOMNode = component.find('h1');
  });

  test('<HelloWorld /> renders', () => {
    expect(componentDOMNode.text()).toBe('Hello World!!');
  });

});
