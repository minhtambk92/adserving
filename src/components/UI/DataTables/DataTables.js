/**
 * Created by Manhhailua on 11/2/16.
 */

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

class DataTables extends Component {

  static propTypes = {
    thead: PropTypes.element,
    tfoot: PropTypes.element,
    options: PropTypes.object,
    data: PropTypes.array.isRequired,
  };

  async componentDidMount() {
    // Wrapping DOM Libs
    await ReactDOM.render(this.renderDOMLibs(), this.portal);
  }

  componentWillReceiveProps(nextProps) {
    /* eslint-disable no-undef */
    $(this.dataTable).dataTable({
      data: nextProps.data,
      ...this.props.options,
    });
    /* eslint-enable no-undef */
  }

  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(this.portal);
  }

  renderDOMLibs() {
    return (
      <table
        ref={c => {
          this.dataTable = c;
        }}
        {...this.props}
      >
        <thead>{this.props.thead}</thead>
        <tfoot>{this.props.tfoot}</tfoot>
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
