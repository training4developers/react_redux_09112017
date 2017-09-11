import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { ColorTool } from './components/color-tool';
import { ColorItem } from './models/color-item';

const myColors: ColorItem[] = [
  { id: 1, name: 'red' },
  { id: 2, name: 'white' },
  { id: 3, name: 'blue' },
  { id: 4, name: 'orange' },
];

ReactDOM.render(<ColorTool colors={myColors} />,
  document.querySelector('main'));
