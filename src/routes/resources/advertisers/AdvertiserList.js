import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { DataTables, ICheck } from '../../../components/UI/';
import Link from '../../../components/Link';
// import withStyles from 'isomorphic-style-loader/lib/withStyles';

class AdvertiserList extends Component {

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
  }

  render() {
    // Open the portal
    return (
      <DataTables
        className="table table-bordered table-striped"
        data={this.props.list}
        options={{
          columns: this.dataTableOptions(),
          destroy: true,
          order: [[1, 'DESC']],
        }}
        thead={(
          <tr>
            <th><ICheck className="inputChooseAllAdvertisers" /></th>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>&nbsp;</th>
          </tr>
        )}
        tfoot={(
          <tr>
            <th><ICheck className="inputChooseAllAdvertisers" /></th>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>&nbsp;</th>
          </tr>
        )}
      />
    );
  }
}

export default AdvertiserList;
