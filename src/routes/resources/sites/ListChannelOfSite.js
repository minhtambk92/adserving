import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Link from '../../../components/Link';
import { DataTables, ICheck } from '../../../components/UI/';

class ListChannelOfSite extends Component {

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
            className="inputChooseChannel"
            name="inputChooseChannel[]"
            value={cellData}
          />,
          cell,
        );
      },
    }, {
      data: 'name',
      createdCell: (cell, cellData, rowData) => {
        ReactDOM.render(<Link to={`/resource/channel/${rowData.id}`}>{rowData.name}</Link>, cell);
      },
    }, {
      data: null,
      createdCell: (cell, cellData, rowData) => {
        /* eslint-disable jsx-a11y/no-static-element-interactions */
        ReactDOM.render(<Link to={`/resource/channel/${rowData.id}`}>Option</Link>, cell);
        /* eslint-enable jsx-a11y/no-static-element-interactions */
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
            <th><ICheck type="checkbox" className="inputChooseAllChannels" /></th>
            <th>Name</th>
            <th>&nbsp;</th>
          </tr>
        )}
        tfoot={(
          <tr>
            <th><ICheck type="checkbox" className="inputChooseAllChannels" /></th>
            <th>Name</th>
            <th>&nbsp;</th>
          </tr>
        )}
      />
    );
  }
}

export default ListChannelOfSite;
