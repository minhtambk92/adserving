import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Link from '../../../components/Link';
import { DataTables, ICheck } from '../../../components/UI/';
// import withStyles from 'isomorphic-style-loader/lib/withStyles';

class ZoneList extends Component {

  static propTypes = {
    list: PropTypes.array,
    setPageZoneActiveTab: PropTypes.func,
  };
  onTabClickZone(event) {
    event.persist();
    this.props.setPageZoneActiveTab('editZone');
  }

  onTabClickSettingZone(event) {
    event.persist();
    this.props.setPageZoneActiveTab('settingZone');
  }
  onTabClickShareZone(event) {
    event.persist();
    this.props.setPageZoneActiveTab('shareZone');
  }
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
          cell,
        );
      },
    }, {
      data: 'name',
      createdCell: (cell, cellData, rowData) => {
        ReactDOM.render(<Link
          to={`/resource/zone/${rowData.id}`}
          onClick={(event) => this.onTabClickZone(event)}
        >{cellData}</Link>, cell);
      },
    }, {
      data: 'sizeText',
    }, {
      data: null,
      createdCell: (cell, cellData, rowData) => {
        ReactDOM.render(<Link
          to={`/resource/zone/${rowData.id}`}
          onClick={(event) => this.onTabClickShareZone(event)}
        >Share Zone</Link>, cell);
      },
    }, {
      data: null,
      createdCell: (cell, cellData, rowData) => {
        ReactDOM.render(<Link
          to={`/resource/zone/${rowData.id}`}
          onClick={(event) => this.onTabClickSettingZone(event)}
        >Setting</Link>, cell);
      },
    }];
  }
  render() {
    // Open the portal
    let data = [];
    if (this.props.list) {
      if (this.props.list.length === 0) {
        data = [];
      } else {
        data = this.props.list;
      }
    }
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
            <th><ICheck type="checkbox" className="inputChooseAllZones" /></th>
            <th>Name</th>
            <th>Type</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
          </tr>
        )}
        tfoot={(
          <tr>
            <th><ICheck type="checkbox" className="inputChooseAllZones" /></th>
            <th>Name</th>
            <th>Type</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
          </tr>
        )}
      />
    );
  }
}

export default ZoneList;
