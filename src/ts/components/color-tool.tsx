import * as React from 'react';

import { ColorItem } from '../models/color-item';

import { ToolHeader } from './tool-header';
import { ColorForm } from './color-form';

interface ColorToolProps {
  colors: ColorItem[];
}

interface ColorToolState {
  colors: ColorItem[];
}

export class ColorTool extends React.Component<ColorToolProps, ColorToolState> {

  public constructor(props: ColorToolProps) {
    super(props);
    this.state = {
      colors: this.props.colors.concat(),
    };
  }

  public onClick = (colorItem: ColorItem) => {
    colorItem.id = Math.max(...this.state.colors.map((color) => color.id)) + 1;
    this.setState({
      colors: this.state.colors.concat(colorItem),
    });
  }

  public render() {

    return <div>
      <ToolHeader headerText="Color Tool"></ToolHeader>
      <ul>
        {this.state.colors.map((color) => <li key={color.id}>{color.name} - {color.hexCode}</li>)}
      </ul>
      <ColorForm onSubmitColor={this.onClick} />
    </div>;
  }
}
