import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import ReactDOM from 'react-dom';
import Link from '../../../components/Link';
// import withStyles from 'isomorphic-style-loader/lib/withStyles';
// import InputICheck from './InputICheck';

const dataTableOptions = {
  columns: [{
    data: 'name',
    createdCell: (cell, cellData, rowData) => {
      ReactDOM.render(<Link to={`/resource/campaign/${rowData.id}`}>{cellData}</Link>, cell);
    },
  }, {
    data: 'startTime',
    render: data => (data ? moment(new Date(data)).format('L') : ''),
  }, {
    data: 'endTime',
    render: data => (data ? moment(new Date(data)).format('L') : ''),
  }, {
    data: 'description',
  }, {
    data: null,
    createdCell: (cell, cellData, rowData) => {
      ReactDOM.render(<Link to={`/resource/campaign/${rowData.id}`}>New Placement</Link>, cell);
    },
  }],
  destroy: true,
  order: [[1, 'DESC']],
};

class CampaignList extends Component {

  static propTypes = {
    containerWidth: PropTypes.number,
    list: PropTypes.array,
  };

  componentDidMount() {
    /* eslint-disable no-undef */
    $(this.dataTable).dataTable({
      data: this.props.list,
      ...dataTableOptions,
    });
    /* eslint-enable no-undef */

    // Wrapping DOM Libs
    ReactDOM.render(this.renderDOMLibs(), this.portal);
  }

  componentWillReceiveProps(nextProps) {
    /* eslint-disable no-undef */
    $(this.dataTable).dataTable({
      data: nextProps.list,
      ...dataTableOptions,
    });
    /* eslint-enable no-undef */
  }

  componentDidUpdate() {
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
            <th>Name</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Description</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tfoot>
          <tr>
            <th>Name</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Description</th>
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

export default CampaignList;