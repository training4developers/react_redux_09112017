import * as React from 'react';

import { ColorItem } from '../models/color-item';

interface ColorFormProps {
  onSubmitColor: (colorItem: ColorItem) => void;
}

export class ColorForm extends React.Component<ColorFormProps, undefined> {

  public newColorNameInput: HTMLInputElement;
  public newColorHexCodeInput: HTMLInputElement;

  public constructor(props: ColorFormProps) {
    super(props);

  }

  // public componentWillMount() {

  // }

  public componentDidMount() {
    if (this.newColorNameInput) {
      this.newColorNameInput.focus();
    }
  }

  // public componentWillUnmount() {
    
  // }

  public onClick = () => {

    this.props.onSubmitColor({
      id: -1,
      name: this.newColorNameInput.value,
      hexCode: this.newColorHexCodeInput.value,
    });
  }

  public render() {

    return <form>
      <div>
        <label htmlFor="new-color-name-input">New Color Name:</label>
        <input type="text" id="new-color-name-input" name="name"
          defaultValue=""
          ref={ (input) => this.newColorNameInput = input } />
      </div>
      <div>
        <label htmlFor="new-color-hex-code-input">New Color HexCode:</label>
        <input type="color" id="new-color-hex-code-input" name="hexCode"
          defaultValue=""
          ref={ (input) => this.newColorHexCodeInput = input }/>
      </div>
      <button type="button" onClick={this.onClick}>Add Color</button>
    </form>;
  }
}
