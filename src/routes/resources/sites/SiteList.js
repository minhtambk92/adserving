import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Link from '../../../components/Link';
import { DataTables, ICheck } from '../../../components/UI/';

class SiteList extends Component {

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
            className="inputChooseSite"
            name="inputChooseSite[]"
            value={cellData}
          />,
          cell
        );
      },
    }, {
      data: 'name',
      createdCell: (cell, cellData, rowData) => {
        ReactDOM.render(<Link to={`/resource/site/${rowData.id}`}>{cellData}</Link>, cell);
      },
    }, {
      data: 'domain',
    }, {
      data: 'email',
    }, {
      data: 'description',
    }, {
      data: null,
      createdCell: (cell, cellData, rowData) => {
        ReactDOM.render(<Link to={`/resource/site/${rowData.id}`}>New Zone</Link>, cell);
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
            <th><ICheck className="inputChooseAllSites" /></th>
            <th>Name</th>
            <th>Domain</th>
            <th>Email</th>
            <th>Description</th>
            <th>&nbsp;</th>
          </tr>
        )}
        tfoot={(
          <tr>
            <th><ICheck className="inputChooseAllSites" /></th>
            <th>Name</th>
            <th>Domain</th>
            <th>Email</th>
            <th>Description</th>
            <th>&nbsp;</th>
          </tr>
        )}
      />
    );
  }
}

export default SiteList;
