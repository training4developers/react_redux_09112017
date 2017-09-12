import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Car } from '../models/car';

import { ToolHeader } from './tool-header';
import { CarTable } from './car-table';

interface CarToolState {
  cars: Car[];
  editRowId: number;
}

export class CarTool extends React.Component<undefined, CarToolState> {

  constructor(props: undefined) {
    super(props);

    this.state = {
      editRowId: -1,
      cars: [ { id: 1, make: 'A', model: 'B', year: 2000, color: 'red', price: 12000 } ]
    };
  }

  public onEdit = (carId: number) => {
    this.setState({
      editRowId: carId,
    });
  }

  public onDelete = (carId: number) => {

    this.setState({
      cars: this.state.cars.filter((car) => car.id !== carId),
    });
  }

  public onSave = (carToSave: Car) => {

    const carToSaveIndex = this.state.cars.findIndex((car) => car.id === carToSave.id);

    this.setState({
      cars: [
        ...this.state.cars.slice(0, carToSaveIndex),
        carToSave,
        ...this.state.cars.slice(carToSaveIndex + 1),
      ],
      editRowId: -1,
    });

  }

  public onCancel = () => {
    this.setState({
      editRowId: -1,
    });
  }

  render() {

    return <div>
      <ToolHeader headerText="Car Tool" />
      <CarTable cars={this.state.cars} editRowId={this.state.editRowId}
        onEdit={this.onEdit} onDelete={this.onDelete}
        onSave={this.onSave} onCancel={this.onCancel} />
    </div>;
  }

}
