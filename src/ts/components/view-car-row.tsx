import * as React from 'react';

import { Car } from '../models/car';

interface ViewCarRowProps {
  car: Car;
  onDelete: (carId: number) => void;
  onEdit: (carId: number) => void;
}

export const ViewCarRow: React.StatelessComponent<ViewCarRowProps>
  = (props: ViewCarRowProps) => <tr>
    <td>{props.car.make}</td>
    <td>{props.car.model}</td>
    <td>{props.car.year}</td>
    <td>{props.car.color}</td>
    <td>{props.car.price}</td>
    <td>
      <button type="button" onClick={() => props.onEdit(props.car.id)}>Edit</button>
      <button type="button" onClick={() => props.onDelete(props.car.id)}>Delete</button>
    </td>
  </tr>;
