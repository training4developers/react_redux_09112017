import * as React from 'react';
import { shallow } from 'enzyme';

import { ColorForm } from './color-form';

jest.unmock('./color-form');

describe('<ColorForm /> Shallow with Enzyme', () => {

  const newColorNameValue = 'purple';
  const newColorHexCodeValue = '#aabbcc';
  const eventHandlers = { saveColor: () => undefined };

  let component;
  let saveColorSpy;
  let renderSpy;
  let onClickSpy;

  beforeEach(() => {
    saveColorSpy = jest.spyOn(eventHandlers, 'saveColor');
    // use this approach for true class functions
    renderSpy = jest.spyOn(ColorForm.prototype, 'render');
    component = shallow(<ColorForm onSubmitColor={eventHandlers.saveColor} />);
    // use this approach for class arrow functions
    onClickSpy = jest.spyOn(component.instance(), 'onClick');
  });

  test('<ColorForm /> renders', () => {

    // instance is needed here because onSubmitColor is not passed to the form node
    expect(component.instance().props.onSubmitColor).toBe(saveColorSpy);
    expect(component.state().name).toBe('');
    expect(component.state().hexCode).toBe('');

    const newColorNameInput = component.find('#new-color-name-input');
    expect(newColorNameInput.prop('value')).toBe('');

    newColorNameInput.simulate('change', {
      target: { value: newColorNameValue, name: 'name' },
      currentTarget: { value: newColorNameValue, name: 'name' },
    });

    const newColorHexCodeInput = component.find('#new-color-hex-code-input');
    expect(newColorHexCodeInput.prop('value')).toBe('');

    newColorHexCodeInput.simulate('change', {
      target: { value: newColorHexCodeValue, name: 'hexCode' },
      currentTarget: { value: newColorHexCodeValue, name: 'hexCode' },
    });

    expect(component.state().name).toBe(newColorNameValue);
    expect(component.state().hexCode).toBe(newColorHexCodeValue);

    component.find('button').simulate('click');

    expect(renderSpy).toHaveBeenCalled();
    expect(onClickSpy).toHaveBeenCalled();
    expect(saveColorSpy).toHaveBeenCalledWith({
      id: -1,
      name: newColorNameValue,
      hexCode: newColorHexCodeValue,
    });
  });

});
