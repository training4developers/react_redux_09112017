import * as React from 'react';

import { ColorItem } from '../models/color-item';

interface ColorToolProps {
  colors: ColorItem[];
}

export class ColorTool extends React.Component<ColorToolProps, undefined> {

  public render() {

    return <div>
      <header>
        <h1>Color Tool</h1>
      </header>
      <ul>
        {this.props.colors.map((color) => <li key={color.id}>{color.name}</li>)}
      </ul>
    </div>;
  }
}
