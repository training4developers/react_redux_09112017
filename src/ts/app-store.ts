import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { AppState } from './app-state';
import { colorReducer } from './reducers/color-reducer';

export const appStore = createStore<AppState>(colorReducer, applyMiddleware(thunk));
