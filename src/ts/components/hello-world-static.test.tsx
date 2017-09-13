import * as React from 'react';
import { create as createRenderer } from 'react-test-renderer';
import { render } from 'enzyme';

import { HelloWorld } from './hello-world';

describe('<HelloWorld /> React Test Renderer Static HTML', () => {

  it('<HelloWorld /> renders', () => {

    const tree = createRenderer(<HelloWorld />).toJSON();
    expect(tree).toMatchSnapshot();

  });

});

describe('<HelloWorld /> Enzyme Static HTML', () => {

  it('<HelloWorld /> renders', () => {
    const component = JSON.stringify(render(<HelloWorld />).html());
    expect(component).toMatchSnapshot();
  });

});
