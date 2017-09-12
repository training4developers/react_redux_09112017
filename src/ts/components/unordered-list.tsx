import * as React from 'react';

import { ColorItem } from '../models/color-item';

import { ListItem } from './list-item';

interface UnorderedListProps {
  colors: ColorItem[];
  onDelete: (listItemId: number) => void;
}

export class UnorderedList extends React.PureComponent<UnorderedListProps, undefined> {

  public render() {
    console.log('unordered list rendered');
    return <ul>
      {this.props.colors.map((color, index) => <ListItem key={index}
        color={color} onDeleteListItem={this.props.onDelete} />)}
    </ul>;
  }
}
