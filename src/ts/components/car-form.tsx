import * as React from 'react';

import { Car } from '../models/car';

interface CarFormProps {
  onSubmitCar: (newCar: Car) => void;
  setFormFocusFn?: (fn: () => void) => void;
}

interface CarFormState {
  make: string;
  model: string;
  year: number;
  color: string;
  price: number;
  [ x: string ]: any;
}

export class CarForm extends React.Component<CarFormProps, CarFormState> {

  public makeInput: HTMLInputElement;

  constructor(props: CarFormProps) {
    super(props);

    this.state= {
      make: '',
      model: '',
      year: 1900,
      color: '',
      price: 0,
    };

  }

  public componentDidMount() {
    if (this.props.setFormFocusFn) {
      this.props.setFormFocusFn(() => {
        if (this.makeInput) {
          this.makeInput.focus();
        }
      });
    }
  }

  public onChange = (e: { currentTarget: HTMLInputElement }) => {
    this.setState({
      [ e.currentTarget.name ]: e.currentTarget.type === 'number'
        ? Number(e.currentTarget.value)
        : e.currentTarget.value,
    });
  }

  public submitCar = () => {
    this.props.onSubmitCar({
      id: -1,
      make: this.state.make,
      model: this.state.model,
      year: this.state.year,
      color: this.state.color,
      price: this.state.price,
    });

    this.setState({
      make: '',
      model: '',
      year: 1900,
      color: '',
      price: 0,
    });
  }

  public render() {

    return <form>
      <div>
        <label htmlFor="new-make-input">Make:</label>
        <input type="text" name="make" id="new-make-input"
          value={this.state.make} onChange={this.onChange}
          ref={ (input) => this.makeInput = input } />
      </div>
      <div>
        <label htmlFor="new-model-input">Model:</label>
        <input type="text" name="model" id="new-model-input"
          value={this.state.model} onChange={this.onChange} />
      </div>
      <div>
        <label htmlFor="new-year-input">Year:</label>
        <input type="number" name="year" id="new-year-input"
          value={this.state.year} onChange={this.onChange} />
      </div>
      <div>
        <label htmlFor="new-color-input">Color:</label>
        <input type="text" name="color" id="new-color-input"
          value={this.state.color} onChange={this.onChange} />
      </div>
      <div>
        <label htmlFor="new-price-input">Price:</label>
        <input type="number" name="price" id="new-price-input"
          value={this.state.price} onChange={this.onChange} />
      </div>
      <button type="button" onClick={this.submitCar}>Save Car</button>
    </form>;

  }

}
