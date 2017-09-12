import * as React from 'react';

import { ColorItem } from '../models/color-item';

import { ListItem } from './list-item';

interface UnorderedListProps {
  colors: ColorItem[];
  onDelete: (listItemId: number) => void;
}

export class UnorderedList extends React.Component<UnorderedListProps, undefined> {

  public render() {
    return <ul>
      {this.props.colors.map((color) => <ListItem key={color.id}
        color={color} onDeleteListItem={this.props.onDelete} />)}
    </ul>;
  }
}
