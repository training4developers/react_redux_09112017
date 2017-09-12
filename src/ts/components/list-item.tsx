import * as React from 'react';
import * as PropTypes from 'prop-types';

import { ColorItem } from '../models/color-item';

interface ListItemProps {
  color: ColorItem;
  onDeleteListItem: (listItemId: number) => void;
}

export const ListItem: React.StatelessComponent<ListItemProps> =
  (props: ListItemProps) => {

  const deleteListItem = () => {
    props.onDeleteListItem(props.color.id);
  };

  return <li>
    {props.color.name} - {props.color.hexCode}
    <button type="button" onClick={deleteListItem}>Delete</button>
  </li>;
};

ListItem.propTypes = {
  color: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    hexCode: PropTypes.string,
  }).isRequired,
  onDeleteListItem: PropTypes.func,
};
