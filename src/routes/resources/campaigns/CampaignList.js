import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import ReactDOM from 'react-dom';
import Link from '../../../components/Link';
import { DataTables, ICheck } from '../../../components/UI/';
// import withStyles from 'isomorphic-style-loader/lib/withStyles';

class CampaignList extends Component {

  static propTypes = {
    list: PropTypes.array,
  };

  dataTableOptions() { // eslint-disable-line no-unused-vars, class-methods-use-this
    return [{
      data: 'id',
      orderable: false,
      createdCell: (cell, cellData) => {
        ReactDOM.render(
          <ICheck
            type="checkbox"
            className="inputChooseCampaign"
            name="inputChooseCampaign[]"
            value={cellData}
          />,
          cell
        );
      },
    }, {
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
      data: null,
      createdCell: (cell, cellData, rowData) => {
        ReactDOM.render(<Link to={`/resource/campaign/${rowData.id}`}>New Placement</Link>, cell);
      },
    }];
  }
  render() {
    let data = [];
    if (this.props.list) {
      if (this.props.list.length === 0) {
        data = [];
      } else {
        data = this.props.list;
      }
    }
    // Open the portal
    return (
      <DataTables
        className="table table-bordered table-striped"
        data={data}
        options={{
          columns: this.dataTableOptions(),
          destroy: true,
          order: [[1, 'DESC']],
        }}
        thead={(
          <tr>
            <th><ICheck type="checkbox" className="inputChooseAllCampaigns" /></th>
            <th>Name</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>&nbsp;</th>
          </tr>
        )}
        tfoot={(
          <tr>
            <th><ICheck type="checkbox" className="inputChooseAllCampaigns" /></th>
            <th>Name</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>&nbsp;</th>
          </tr>
        )}
      />
    );
  }
}

export default CampaignList;
