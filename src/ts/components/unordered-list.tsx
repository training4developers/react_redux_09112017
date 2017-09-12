import * as React from 'react';

import { ColorItem } from '../models/color-item';

import { ListItem } from './list-item';

export class UnorderedList extends React.Component<{ colors: ColorItem[] }, undefined> {

  public render() {
    return <ul>
      {this.props.colors.map((color) => <ListItem key={color.id} color={color} />)}
    </ul>;
  }
}
