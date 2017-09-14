import * as React from 'react';
import renderer from 'react-test-renderer';
import { render } from 'enzyme';

import { ColorForm } from './color-form';

describe('<ColorForm /> React Test Renderer Static HTML', () => {

  it('<ColorForm /> renders', () => {
    const tree = renderer.create(<ColorForm onSubmitColor={() => undefined} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

});

describe('<ColorForm /> Enzyme Static HTML', () => {

  it('<ColorForm /> renders', () => {
    const component = JSON.stringify(render(<ColorForm onSubmitColor={() => undefined} />).html());
    expect(component).toMatchSnapshot();
  });

});
