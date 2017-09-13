import * as React from 'react';
import * as ReactDOM from 'react-dom';

// import { ColorTool } from './components/color-tool';
// import { ColorItem } from './models/color-item';

// const myColors: ColorItem[] = [
//   { id: 1, name: 'red', hexCode: '#ff0000' },
//   { id: 2, name: 'white', hexCode: '#ffffff' },
//   { id: 3, name: 'blue', hexCode: '#0000ff' },
//   { id: 4, name: 'orange', hexCode: '#ffa500' },
// ];

// ReactDOM.render(<ColorTool colors={myColors} />,
//   document.querySelector('main'));

import { CarTool } from './components/car-tool';

ReactDOM.render(<CarTool />,
  document.querySelector('main'));
