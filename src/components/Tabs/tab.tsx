import * as React from 'react';

export interface Props {
  onClick ?: Function;
  tabIndex ?:Number;
  isActive ?: Boolean;
  tabTitle: String;
}
export class Tab extends React.PureComponent<Props, any> {

  constructor(props: any, context: any) {
    super(props, context);

  }

  handleClick = (event) => {
    event.preventDefault();
    this.props.onClick(this.props.tabIndex);
  }

  render() {
    return(
      <li className="tab">
        <a
          className={`Tab__Link ${this.props.isActive ? 'active' : ''}`}
          onClick={this.handleClick}
        >
          {this.props.tabTitle}
        </a>
      </li>
    );
  }
}
