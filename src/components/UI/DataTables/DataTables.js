/**
 * Created by Manhhailua on 11/2/16.
 */

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

class DataTables extends Component {

  static propTypes = {
    thead: PropTypes.element,
    tfoot: PropTypes.element,
    data: PropTypes.array.isRequired,
    options: PropTypes.object,
  };

  componentDidMount() {
    // Wrapping DOM Libs
    ReactDOM.render(this.renderDOMLibs(), this.portal);
  }

  componentWillReceiveProps(nextProps) {
    /* eslint-disable no-undef */
    $(this.dataTable).dataTable({
      data: nextProps.data,
      ...nextProps.options,
    });
    /* eslint-enable no-undef */
  }

  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(this.portal);
  }

  renderDOMLibs() {
    const {
      thead,
      tfoot,
      data, // eslint-disable-line no-unused-vars
      options, // eslint-disable-line no-unused-vars
      ...rest
    } = this.props;

    return (
      <table
        ref={c => {
          this.dataTable = c;
        }}
        {...rest}
      >
        <thead>{thead}</thead>
        <tfoot>{tfoot}</tfoot>
      </table>
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

export default DataTables;
