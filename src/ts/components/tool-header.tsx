import * as React from 'react';
import * as PropTypes from 'prop-types';

interface ToolHeaderProps {
  headerText?: any;
}

export const ToolHeader: React.StatelessComponent<ToolHeaderProps> =
  (props: ToolHeaderProps) => {
    return <header>
      <h1>{props.headerText}</h1>
    </header>;
};

ToolHeader.propTypes = {
  headerText: PropTypes.string.isRequired,
};

// export class ToolHeader extends
// React.Component<{ headerText: string }> {

//   public render() {

//     return <header>
//       <h1>{this.props.headerText}</h1>
//     </header>;

//   }

// }
