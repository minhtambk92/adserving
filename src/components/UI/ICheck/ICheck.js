/**
 * Created by Manhhailua on 11/2/16.
 */

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

class ICheck extends Component {

  static propTypes = {
    className: PropTypes.string.isRequired,
  };

  async componentDidMount() {
    await ReactDOM.render(this.renderDOMLibs(), this.portal);

    /* eslint-disable no-undef */
    // iCheck for checkbox and radio inputs
    $(this.input).iCheck({
      checkboxClass: 'icheckbox_minimal-blue',
      radioClass: 'iradio_minimal-blue',
    });
    /* eslint-enable no-undef */
  }

  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(this.portal);
  }

  renderDOMLibs() {
    return (
      <input
        type="checkbox"
        className={this.props.className}
        ref={c => {
          this.input = c;
        }}
        {...this.props}
      />
    );
  }

  render() {
    // Open the portal
    return (
      <div
        ref={c => {
          this.portal = c;
        }}
      />
    );
  }
}

export default ICheck;