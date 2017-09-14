import { Dispatch, Action } from 'redux';

import { ActionTypes } from '../action-types';
import { AppState } from '../app-state';
import { ColorItem } from '../models/color-item';

export interface ColorAction extends Action {
  colors?: ColorItem[];
  color?: ColorItem;
}

export const refreshRequest: () => ColorAction = () => ({
  type: ActionTypes.REFRESH_REQUEST,
  colors: [] as ColorItem[],
});

export const refreshDone: (colors: ColorItem[]) =>
  ColorAction = (colors: ColorItem[]) => ({
    type: ActionTypes.REFRESH_DONE,
    colors,
  });

export const addRequest = (color: ColorItem) => ({
  type: ActionTypes.ADD_REQUEST,
  color,
});

export const refresh = () => {

  return (dispatch: Dispatch<AppState>) => {

    dispatch(refreshRequest());

    return fetch('http://localhost:3010/colors')
      .then((res) => res.json())
      .then((colors: ColorItem[]) => dispatch(refreshDone(colors)));

  };

};

export const add = (color: ColorItem) => {

  return (dispatch: Dispatch<AppState>) => {

    dispatch(addRequest(color));

    delete color.id;

    return fetch('http://localhost:3010/colors', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(color),
    }).then(() => fetch('http://localhost:3010/colors'))
      .then((res) => res.json())
      .then((colors: ColorItem[]) => dispatch(refreshDone(colors)));
  };

};


