import { ActionTypes } from '../action-types';
import { AppState } from '../app-state';
import { ColorAction } from '../actions/colors';

export const colorReducer = (state: AppState = { colors: [] }, action: ColorAction) => {

  switch (action.type) {
    case ActionTypes.REFRESH_REQUEST:
      return {
        ...state,
        colors: action.colors,
      };
    case ActionTypes.REFRESH_DONE:
      return {
        ...state,
        colors: action.colors,
      };
    default:
      return state;
  }

};
