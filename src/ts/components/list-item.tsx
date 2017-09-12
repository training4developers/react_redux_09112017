import * as React from 'react';
import * as PropTypes from 'prop-types';

import { ColorItem } from '../models/color-item';

interface ListItemProps {
  color: ColorItem;
}

export const ListItem: React.StatelessComponent<ListItemProps> =
  (props: ListItemProps) => {
  return <li>{props.color.name} - {props.color.hexCode}</li>;
};

ListItem.propTypes = {
  color: PropTypes.shape({
    name: PropTypes.string,
    hexCode: PropTypes.string,
  }).isRequired,
};
