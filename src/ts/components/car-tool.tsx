import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Car } from '../models/car';

import { ToolHeader } from './tool-header';
import { CarTable } from './car-table';
import { CarForm } from './car-form';

interface CarToolState {
  cars: Car[];
  editRowId: number;
}

export class CarTool extends React.Component<undefined, CarToolState> {

  public carFormFocus: () => void;

  constructor(props: undefined) {
    super(props);

    this.state = {
      editRowId: -1,
      cars: [ { id: 1, make: 'A', model: 'B', year: 2000, color: 'red', price: 12000 } ]
    };
  }

  public edit = (carId: number) => {
    this.setState({
      editRowId: carId,
    });
  }

  public delete = (carId: number) => {

    this.setState({
      cars: this.state.cars.filter((car) => car.id !== carId),
    });
  }

  public save = (carToSave: Car) => {

    if (carToSave.id < 1) {

      carToSave.id = Math.max(...this.state.cars.map((c) => c.id)) + 1;

      this.setState({
        cars: this.state.cars.concat(carToSave),
      });

    } else {

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
  }

  public cancel = () => {
    this.setState({
      editRowId: -1,
    });
  }

  public componentDidMount() {
    this.carFormFocus();
  }

  public editRowUnmount = () => {
    console.log('edit row unmount from car tool');
    this.carFormFocus();
  }

  public setCarFormFocusFn = (fn: () => void) => {
    this.carFormFocus = fn;
  }

  public render() {

    return <div>
      <ToolHeader headerText="Car Tool" />
      <CarTable cars={this.state.cars} editRowId={this.state.editRowId}
        onEdit={this.edit} onDelete={this.delete}
        onSave={this.save} onCancel={this.cancel}
        notifyParentWillUnmount={this.editRowUnmount} />
      <CarForm onSubmitCar={this.save} setFormFocusFn={this.setCarFormFocusFn} />
    </div>;
  }

}
