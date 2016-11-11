import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Link from '../../../components/Link';
import { DataTables, ICheck } from '../../../components/UI/';
// import withStyles from 'isomorphic-style-loader/lib/withStyles';

class ZoneList extends Component {

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
            className="inputChooseZone"
            name="inputChooseZone[]"
            value={cellData}
          />,
          cell
        );
      },
    }, {
      data: 'name',
      createdCell: (cell, cellData, rowData) => {
        ReactDOM.render(<Link to={`/resource/zone/${rowData.id}`}>{cellData}</Link>, cell);
      },
    }, {
      data: 'sizeText',
    }, {
      data: 'description',
    }, {
      data: null,
      createdCell: (cell, cellData, rowData) => {
        ReactDOM.render(<Link to={`/resource/zone/${rowData.id}`}>New Placement</Link>, cell);
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
            <th><ICheck type="checkbox" className="inputChooseAllZones" /></th>
            <th>Name</th>
            <th>Type</th>
            <th>Description</th>
            <th>&nbsp;</th>
          </tr>
        )}
        tfoot={(
          <tr>
            <th><ICheck type="checkbox" className="inputChooseAllZones" /></th>
            <th>Name</th>
            <th>Type</th>
            <th>Description</th>
            <th>&nbsp;</th>
          </tr>
        )}
      />
    );
  }
}

export default ZoneList;
