import * as React from 'react';

import { ColorItem } from '../models/color-item';

import { ToolHeader } from './tool-header';
import { UnorderedList } from './unordered-list';
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

  public deleteColor = (colorId: number) => {

    this.setState({
      colors: this.state.colors.filter((color) => color.id !== colorId),
    });

    // const deleteColorIndex = this.state.colors.findIndex((color) => color.id === colorId);
    // const newColor = this.state.colors.slice(0, deleteColorIndex)
    //  .concat(this.state.colors.slice(deleteColorIndex+1));
    // const newColor2 = [
    //   ...this.state.colors.slice(0, deleteColorIndex),
    //   ...this.state.colors.slice(deleteColorIndex + 1),
    // ];
  }

  public render() {

    return <div>
      <ToolHeader headerText="Color Tool" />
      <UnorderedList colors={this.state.colors} onDelete={this.deleteColor} />
      <ColorForm onSubmitColor={this.onClick} />
    </div>;
  }
}
