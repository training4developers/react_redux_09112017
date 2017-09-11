import * as React from 'react';

import { ColorItem } from '../models/color-item';

interface ColorFormProps {
  onSubmitColor: (colorItem: ColorItem) => void;
}

interface ColorFormState {
  name: string;
  hexCode: string;
  [ x: string ]: any;
}

export class ColorForm extends React.Component<ColorFormProps, ColorFormState> {

  public constructor(props: ColorFormProps) {
    super(props);

    this.state = {
      name: '',
      hexCode: '',
    };
  }

  public onChange = (e: { currentTarget: HTMLInputElement }) => {
    this.setState({
      [ e.currentTarget.name ]: e.currentTarget.value,
    });
  }

  public onClick = () => {

    this.props.onSubmitColor({
      id: -1,
      name: this.state.name,
      hexCode: this.state.hexCode,
    });

    this.setState({
      name: '',
      hexCode: '',
    });
  }

  public render() {

    return <form>
      <div>
        <label htmlFor="new-color-name-input">New Color Name:</label>
        <input type="text" id="new-color-name-input" name="name"
          value={this.state.name} onChange={this.onChange} />
      </div>
      <div>
        <label htmlFor="new-color-hex-code-input">New Color HexCode:</label>
        <input type="color" id="new-color-hex-code-input" name="hexCode"
          value={this.state.hexCode} onChange={this.onChange} />
      </div>
      <button type="button" onClick={this.onClick}>Add Color</button>
    </form>;
  }
}
