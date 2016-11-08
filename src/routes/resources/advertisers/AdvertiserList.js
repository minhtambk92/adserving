import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { iCheck } from '../../../components/UI/';
import Link from '../../../components/Link';
// import withStyles from 'isomorphic-style-loader/lib/withStyles';

class AdvertiserList extends Component {

  static propTypes = {
    containerWidth: PropTypes.number,
    list: PropTypes.array,
  };

  componentDidMount() {
    /* eslint-disable no-undef */
    $(this.dataTable).dataTable({
      data: this.props.list,
      columns: this.dataTableOptions(),
      destroy: true,
      order: [[1, 'DESC']],
    });
    /* eslint-enable no-undef */

    // Wrapping DOM Libs
    ReactDOM.render(this.renderDOMLibs(), this.portal);
  }

  componentWillReceiveProps(nextProps) {
    /* eslint-disable no-undef */
    $(this.dataTable).dataTable({
      data: nextProps.list,
      columns: this.dataTableOptions(),
      destroy: true,
      order: [[1, 'DESC']],
    });
    /* eslint-enable no-undef */
  }
  dataTableOptions() { // eslint-disable-line no-unused-vars, class-methods-use-this
    const columns = [{
      data: 'id',
      orderable: false,
      createdCell: (cell, cellData) => {
        ReactDOM.render(
          <iCheck
            className="inputChooseAdvertiser"
            name="inputChooseAdvertiser[]"
            value={cellData}
          />,
          cell
        );
      },
    }, {
      data: 'name',
      createdCell: (cell, cellData, rowData) => {
        ReactDOM.render(<Link to={`/resource/advertiser/${rowData.id}`}>{cellData}</Link>, cell);
      },
    }, {
      data: 'email',
    }, {
      data: 'contact',
    }, {
      data: null,
      createdCell: (cell, cellData, rowData) => {
        ReactDOM.render(<Link to={`/resource/advertiser/${rowData.id}`}>New Campaign</Link>, cell);
      },
    }];
    return columns;
  }
  renderDOMLibs() {
    return (
      <table
        className="table table-bordered table-striped"
        ref={c => {
          this.dataTable = c;
        }}
      >
        <thead>
          <tr>
            <th><iCheck className="inputChooseAllAdvertisers" /></th>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tfoot>
          <tr>
            <th><iCheck className="inputChooseAllAdvertisers" /></th>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>&nbsp;</th>
          </tr>
        </tfoot>
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

export default AdvertiserList;
