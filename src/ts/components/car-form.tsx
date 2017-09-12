import * as React from 'react';

interface CarFormProps {
  setFormFocusFn: (fn: () => void) => void;
}

interface CarFormState {
  make: string;
}

export class CarForm extends React.Component<CarFormProps, CarFormState> {

  public makeInput: HTMLInputElement;

  constructor(props: CarFormProps) {
    super(props);

    this.state= {
      make: '',
    };

  }

  public componentDidMount() {
    this.props.setFormFocusFn(() => {
      if (this.makeInput) {
        this.makeInput.focus();
      }
    });
  }

  public onChange = () => { return; };

  public render() {

    return <form>
      <div>
        Make:
        <input type="text" name="make"
          value={this.state.make} onChange={this.onChange}
          ref={ (input) => this.makeInput = input } />
      </div>
    </form>;

  }

}