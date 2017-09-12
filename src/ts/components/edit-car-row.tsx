import * as React from 'react';

import { Car } from '../models/car';

interface EditCarRowProps {
  car: Car;
  onSave: (car: Car) => void;
  onCancel: () => void;
  notifyParentWillUnmount?: () => void;
}

interface EditCarRowState {
  make: string;
  model: string;
  year: number;
  color: string;
  price: number;
  [ x: string ]: any;
}

export class EditCarRow extends React.Component<EditCarRowProps, EditCarRowState> {

  public makeInput: HTMLInputElement;

  constructor(props: EditCarRowProps) {
    super(props);

    this.state = {
      make: props.car.make,
      model: props.car.model,
      year: props.car.year,
      color: props.car.color,
      price: props.car.price,
    };
  }

  public componentDidMount() {
    if (this.makeInput) {
      this.makeInput.focus();
    }
  }

  public componentWillUnmount() {
    if (this.props.notifyParentWillUnmount) {
      this.props.notifyParentWillUnmount();
    }
  }

  public onChange = (e: { currentTarget: HTMLInputElement }) => {
    this.setState({
      [ e.currentTarget.name ]: e.currentTarget.type === 'number'
        ? Number(e.currentTarget.value)
        : e.currentTarget.value,
    });
  }

  public saveCar = () => {

    this.props.onSave({
      id: this.props.car.id,
      make: this.state.make,
      model: this.state.model,
      year: this.state.year,
      color: this.state.color,
      price: this.state.price,
    });

  }

  public render() {

    return <tr>
      <td><input type="text" name="make"
        value={this.state.make} onChange={this.onChange}
        ref={ (input) => this.makeInput = input }
        /></td>
      <td><input type="text" name="model" value={this.state.model} onChange={this.onChange} /></td>
      <td><input type="number" name="year" value={this.state.year} onChange={this.onChange} /></td>
      <td><input type="text" name="color" value={this.state.color} onChange={this.onChange} /></td>
      <td><input type="number" name="price" value={this.state.price} onChange={this.onChange} /></td>
      <td>
        <button type="button" onClick={this.saveCar}>Save</button>
        <button type="button" onClick={this.props.onCancel}>Cancel</button>
      </td>
    </tr>;

  }

}