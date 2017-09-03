import 'bootstrap/dist/css/bootstrap.css';
import '../scss/styles.scss';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { HelloWorld } from './components/hello-world';

ReactDOM.render(<HelloWorld />, document.querySelector('main'));
