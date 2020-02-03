import * as React from 'react';

export default class Tabs extends React.Component<any, any> {

  constructor(props: any, context: any) {
    super(props, context);

    this.state = {
      activeTabIndex: 0
    }

    this.handleTabClick = this.handTabClick.bind(this);
  }

  handleTabClick(tabIndex: number) {
    this.setState({
      activeTabIndex: tabIndex === this.state.activeTabIndex ? this.state.activeTabIndex : tabIndex
    });
  }

  renderChildrenWithTabsApiAsProps() {
    return React.Children.map( this.props.children, (child: any, index) => {
      return React.cloneElement( child, {
        onClick: this.handleTabClick,
        tabIndex: index,
        isActive: index === this.state.activeTabIndex
      });
    });
  }


  renderActiveTabContent() {
    if( this.state.activeTabIndex !== undefined) {
      const {children} = this.props;
      const {activeTabIndex} = this.state;

      if(children != null) {
        if (children[activeTabIndex]) {
          return children[activeTabIndex].props.children;
        }
      } else {
          console.error('Error! No Children for this tab');
      }
    }
  }


  render() {
    return (
      <div className="tabs">
        <ul className="tabs-nav">
          {this.renderChildrenWithTabsApiAsProps()}
        </ul>

        <div className="tabs-active-content">
          {this.renderActiveTabContent()}
        </div>
      </div>
    )
  }

}
