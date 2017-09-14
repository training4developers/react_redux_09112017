import * as React from 'react';
import * as TestUtils from 'react-dom/test-utils';
import { mount } from 'enzyme';

import { ColorForm } from './color-form';

jest.unmock('./color-form');

describe('<ColorForm /> Test Utils Mock DOM', () => {

  const newColorNameValue = 'purple';
  const newColorHexCodeValue = '#aabbcc';
  const eventHandlers = { saveColor: () => undefined };

  let component;
  let componentDOMNode;
  let saveColorSpy;

  beforeEach(() => {
    saveColorSpy = jest.spyOn(eventHandlers, 'saveColor');
    component = TestUtils.renderIntoDocument(<ColorForm onSubmitColor={eventHandlers.saveColor} />);
    componentDOMNode = TestUtils.findRenderedDOMComponentWithTag(component, 'form');
  });

  test('<ColorForm /> renders', () => {

    expect(component.props.onSubmitColor).toBe(saveColorSpy);
    expect(component.state.name).toBe('');
    expect(component.state.hexCode).toBe('');

    const inputColorNameDOMNode = componentDOMNode.querySelector('#new-color-name-input');
    expect(inputColorNameDOMNode.value).toBe('');

    const inputColorHexCodeDOMNode = componentDOMNode.querySelector('#new-color-hex-code-input');
    expect(inputColorHexCodeDOMNode.value).toBe('');

    inputColorNameDOMNode.value = newColorNameValue;
    TestUtils.Simulate.change(inputColorNameDOMNode);

    inputColorHexCodeDOMNode.value = newColorHexCodeValue;
    TestUtils.Simulate.change(inputColorHexCodeDOMNode);

    expect(component.state.name).toBe(newColorNameValue);
    expect(component.state.hexCode).toBe(newColorHexCodeValue);

    TestUtils.Simulate.click(componentDOMNode.querySelector('button'));

    expect(saveColorSpy).toHaveBeenCalledWith({
      id: -1,
      name: newColorNameValue,
      hexCode: newColorHexCodeValue,
    });
  });

});

xdescribe('<ColorForm /> Enzyme Mock DOM', () => {

  const newColorNameValue = 'purple';
  const newColorHexCodeValue = '#aabbcc';
  const eventHandlers = { saveColor: () => undefined };

  let component;
  let saveColorSpy;

  beforeEach(() => {
    saveColorSpy = jest.spyOn(eventHandlers, 'saveColor');
    component = mount(<ColorForm onSubmitColor={eventHandlers.saveColor} />);
  });

  test('<ColorForm /> renders', () => {

    expect(component.props().onSubmitColor).toBe(saveColorSpy);
    expect(component.state().name).toBe('');
    expect(component.state().hexCode).toBe('');

    const newColorNameInput = component.find('input');
    expect(newColorNameInput.prop('value')).toBe('');

    newColorNameInput.simulate('change', {
      target: { value: newColorNameValue, name: '#new-color-name-input' },
      currentTarget: { value: newColorNameValue }, name: '#new-color-name-input',
    });

    const newColorHexCodeInput = component.find('input');
    expect(newColorHexCodeInput.prop('value')).toBe('');

    newColorHexCodeInput.simulate('change', {
      target: { value: newColorHexCodeValue, name: '#new-color-hex-code-input' },
      currentTarget: { value: newColorHexCodeValue }, name: '#new-color-hex-code-input',
    });


    expect(component.state().name).toBe(newColorNameValue);
    expect(component.state().hexCode).toBe(newColorHexCodeValue);

    component.find('button').simulate('click');

    expect(saveColorSpy).toHaveBeenCalledWith({
      id: -1,
      name: newColorNameValue,
      hexCode: newColorHexCodeValue,
    });
  });

});
