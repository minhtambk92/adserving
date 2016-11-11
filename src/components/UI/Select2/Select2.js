/**
 * Created by Manhhailua on 11/2/16.
 */

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

class Select2 extends Component {

  static propTypes = {
    children: PropTypes.element.isRequired,
    options: PropTypes.object,
  };

  async componentWillReceiveProps(nextProps) {
    // Wrapping DOM Libs
    await ReactDOM.render(this.renderDOMLibs(nextProps), this.portal);

    /* eslint-disable no-undef */
    $(this.select).select2(nextProps.options);
    /* eslint-enable no-undef */
  }

  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(this.portal);
  }

  renderDOMLibs(props) {
    const { children, ...rest } = props || this.props;

    return (
      <select
        ref={c => {
          this.select = c;
        }}
        {...rest}
      >{children}</select>
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

export default Select2;
