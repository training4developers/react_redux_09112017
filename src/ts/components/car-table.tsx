import * as React from 'react';

import { Car } from '../models/car';

import { ViewCarRow } from './view-car-row';
import { EditCarRow } from './edit-car-row';

interface CarTableProps {
  cars: Car[];
  onDelete: (carId: number) => void;
  onEdit: (carId: number) => void;
  onSave: (car: Car) => void;
  onCancel: () => void;
  editRowId: number;
}

export class CarTable extends React.Component<CarTableProps, undefined> {

  public render() {
    return <table>
      <thead>
        <tr>
          <th>Make</th>
          <th>Model</th>
          <th>Year</th>
          <th>Color</th>
          <th>Price</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {this.props.cars.map((car) => (car.id === this.props.editRowId)
          ? <EditCarRow key={car.id} car={car}
              onSave={this.props.onSave} onCancel={this.props.onCancel} />
          : <ViewCarRow key={car.id} car={car}
              onEdit={this.props.onEdit} onDelete={this.props.onDelete} />)}
      </tbody>
    </table>;
  }

}