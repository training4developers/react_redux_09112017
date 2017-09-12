import * as React from 'react';
import * as PropTypes from 'prop-types';

import { ColorItem } from '../models/color-item';

interface ListItemProps {
  color: ColorItem;
  onDeleteListItem: (listItemId: number) => void;
}

interface ListItemState {
  colorName: string;
  colorHexCode: string;
}

export class ListItem extends React.Component<ListItemProps, ListItemState> {

  constructor(props: ListItemProps) {
    super(props);

    // console.log('li constructor');

    this.state = {
      colorName: props.color.name,
      colorHexCode: props.color.hexCode,
    };
  }

  public deleteListItem = () => {
    this.props.onDeleteListItem(this.props.color.id);
  }

  public render() {
    // console.log('li render');
    return <li>
      State: {this.state.colorName} - {this.state.colorHexCode}
      Props: {this.props.color.name} - {this.props.color.hexCode}
      <button type="button" onClick={this.deleteListItem}>Delete</button>
    </li>;
  }
}

// ListItem.propTypes = {
//   color: PropTypes.shape({
//     id: PropTypes.number,
//     name: PropTypes.string,
//     hexCode: PropTypes.string,
//   }).isRequired,
//   onDeleteListItem: PropTypes.func,
// };
