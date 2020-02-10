import * as React from 'react';

export interface Props {
  onClick?: Function;
  tabIndex?: Number;
  isActive?: Boolean;
  tabTitle: String;
}
export class Tab extends React.PureComponent<Props, any> {
  handleClick = (event) => {
    event.preventDefault();
    this.props.onClick(this.props.tabIndex);
  };

  render() {
    return (
      <li className="tab">
        <span
          className={`Tab__Link ${this.props.isActive ? 'active' : ''}`}
          onClick={this.handleClick}
          id={`tab-link-${this.props.tabTitle}`}
        >
          {this.props.tabTitle}
        </span>
      </li>
    );
  }
}
