import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Dispatch, bindActionCreators } from 'redux';
import { connect, Provider } from 'react-redux';

import { AppState } from './app-state';
import { refresh, add } from './actions/colors';
import { appStore } from './app-store';

import { ColorTool } from './components/color-tool';

const mapStateToProps = ({ colors }: AppState) => ({ colors });
const mapDispatchToProps = (dispatch: Dispatch<AppState>) =>
  bindActionCreators({ refresh, add }, dispatch);

const ColorToolContainer = connect(mapStateToProps, mapDispatchToProps)(ColorTool);

ReactDOM.render(<Provider store={appStore}>
  <ColorToolContainer />
</Provider>,
  document.querySelector('main'));
