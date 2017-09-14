import * as React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import { shallow } from 'enzyme';

import { HelloWorld } from './hello-world';

jest.unmock('./hello-world');

describe('<HelloWorld /> Shallow with React Test Renderer', () => {

  let component;

  beforeEach(() => {
    const renderer = createRenderer();
    renderer.render(<HelloWorld />);
    component = renderer.getRenderOutput();
  });

  test('<HelloWorld /> renders', () => {
    expect(component.props.children.props.children[0].props.children).toBe('Hello World!!');
  });

});

describe('<HelloWorld /> Shallow with Enzyme', () => {

  let component;

  beforeEach(() => {
    component = shallow(<HelloWorld />);
  });

  test('<HelloWorld /> renders', () => {
    expect(component.props().children.props.children[0].props.children).toBe('Hello World!!');
  });

});
