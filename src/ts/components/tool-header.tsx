import * as React from 'react';

export const ToolHeader = (props: { headerText: string }) => {

  return <header>
    <h1>{props.headerText}</h1>
  </header>;

};

// export class ToolHeader extends
// React.Component<{ headerText: string }> {

//   public render() {

//     return <header>
//       <h1>{this.props.headerText}</h1>
//     </header>;

//   }

// }
