import * as React from 'react';

interface ColorItem {
  id: number;
  name: string;
}

export class ColorTool extends React.Component<undefined, undefined> {

  public render() {

    const colors: ColorItem[] = [
      { id: 1, name: 'red' },
      { id: 2, name: 'white' },
      { id: 3, name: 'blue' },
      { id: 4, name: 'orange' },
    ];

    return <div>
      <header>
        <h1>Color Tool</h1>
      </header>
      <ul>
        {colors.map((color) => <li key={color.id}>{color.name}</li>)}
      </ul>
    </div>;
  }
}
