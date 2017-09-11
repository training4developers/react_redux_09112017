import * as React from 'react';

import { ColorItem } from '../models/color-item';

interface ColorToolProps {
  colors: ColorItem[];
}

interface ColorToolState {
  newColorName: string;
  newColorHexCode: string;
}

export class ColorTool extends React.Component<ColorToolProps, ColorToolState> {

  public constructor(props: ColorToolProps) {
    super(props);

    this.state = {
      newColorName: '',
      newColorHexCode: '',
    };

    this.onChange = this.onChange.bind(this);
  }

  public onChange(e: any) {
    this.setState({
      [ e.currentTarget.name ]: e.currentTarget.value,
    });
  }

  public render() {

    return <div>
      <header>
        <h1>Color Tool</h1>
      </header>
      <ul>
        {this.props.colors.map((color) => <li key={color.id}>{color.name}</li>)}
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
      </form>
    </div>;
  }
}
