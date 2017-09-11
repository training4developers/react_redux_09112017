import * as React from 'react';

import { ColorItem } from '../models/color-item';

interface ColorToolProps {
  colors: ColorItem[];
}

interface ColorToolState {
  colors: ColorItem[];
  newColorName: string;
  newColorHexCode: string;
  [ x: string ]: any;
}

export class ColorTool extends React.Component<ColorToolProps, ColorToolState> {

  public constructor(props: ColorToolProps) {
    super(props);

    this.state = {
      colors: this.props.colors.concat(),
      newColorName: '',
      newColorHexCode: '',
    };

    // this.onChange = this.onChange.bind(this);
  }

  public onChange = (e: { currentTarget: HTMLInputElement }) => {
    this.setState({
      [ e.currentTarget.name ]: e.currentTarget.value,
    });
  }

  public onClick = () => {
    this.setState({
      colors: this.state.colors.concat({
        id: Math.max(...this.state.colors.map((color) => color.id)) + 1,
        name: this.state.newColorName,
        hexCode: this.state.newColorHexCode,
      }),
      newColorName: '',
      newColorHexCode: '',
    });
  }

  public render() {

    return <div>
      <header>
        <h1>Color Tool</h1>
      </header>
      <ul>
        {this.state.colors.map((color) => <li key={color.id}>{color.name} - {color.hexCode}</li>)}
      </ul>
      <form>
        <div>
          <label htmlFor="new-color-name-input">New Color Name:</label>
          <input type="text" id="new-color-name-input" name="newColorName"
            value={this.state.newColorName} onChange={this.onChange} />
        </div>
        <div>
          <label htmlFor="new-color-hex-code-input">New Color HexCode:</label>
          <input type="color" id="new-color-hex-code-input" name="newColorHexCode"
            value={this.state.newColorHexCode} onChange={this.onChange} />
        </div>
        <button type="button" onClick={this.onClick}>Add Color</button>
      </form>
    </div>;
  }
}
