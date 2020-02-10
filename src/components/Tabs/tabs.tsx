import * as React from 'react';
import './tabs.scss';

export default class Tabs extends React.Component<any, any> {

  state = {
    activeTabIndex: this.props.defaultActiveTabIndex,
  };

  handleTabClick = (tabIndex: number) => {
    this.setState({
      activeTabIndex: tabIndex === this.state.activeTabIndex ?
        this.props.defaultTabIndex : tabIndex,
    });
  }

  renderChildrenWithTabsApiAsProps() {
    return React.Children.map(this.props.children, (child: JSX.Element, index:number) => {
      return React.cloneElement(child, {
        onClick: this.handleTabClick,
        tabIndex: index,
        isActive: index === this.state.activeTabIndex,
      });
    });
  }

  renderActiveTabContent() {
    const children: React.ReactNode = this.props.children;

    if (!children) {
      return null;
    }

    const { activeTabIndex } = this.state;

    if (children[activeTabIndex]) {
      return children[activeTabIndex].props.children;
    }
  }

  render() {
    return (
      <div className="Tabs">
        <ul className="Tabs__Nav">
          {this.renderChildrenWithTabsApiAsProps()}
        </ul>

        <div className="Tabs__Content" >
          {this.renderActiveTabContent()}
        </div>
      </div>
    );
  }
}
