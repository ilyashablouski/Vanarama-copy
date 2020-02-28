import { Component } from 'react';
import AboutForm from '../../components/Olaf/AboutForm';
import { allDropdownData } from '../../apollo/olaf/api';

export class AboutYou extends Component<{ allDropDowns: any }> {
  // >>> console logs still to be removed <<<
  static async getInitialProps(ctx): Promise<Object> {
    try {
      const { data } = await allDropdownData();
      const { allDropDowns } = data;
      return { allDropDowns };
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <>
        <h1>About You</h1>
        <h3 className="Heading__Caption">
          We just need some initial details for your credit check.
        </h3>
        <AboutForm allDropDowns={this.props.allDropDowns} />
      </>
    );
  }
}

export default AboutYou;
