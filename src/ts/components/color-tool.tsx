import * as React from 'react';

import { ColorItem } from '../models/color-item';

import { ToolHeader } from './tool-header';
import { UnorderedList } from './unordered-list';
import { ColorForm } from './color-form';

interface ColorToolProps {
  colors: ColorItem[];
  refresh: () => any;
  add: (color: ColorItem) => any;
}

export class ColorTool extends React.Component<ColorToolProps, undefined> {

  public onClick = (colorItem: ColorItem) => {
    this.props.add(colorItem);
  }

  public deleteColor = (colorId: number) => {
    console.log('no op');
  }

  public componentDidMount() {
    this.props.refresh();
  }

  public render() {

    return <div>
      <ToolHeader headerText="Color Tool" />
      <UnorderedList colors={this.props.colors} onDelete={this.deleteColor} />
      <ColorForm onSubmitColor={this.onClick} />
    </div>;
  }
}
