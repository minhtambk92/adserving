import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { DataTables, ICheck } from '../../../components/UI/';
import Link from '../../../components/Link';
// import withStyles from 'isomorphic-style-loader/lib/withStyles';

class ChannelList extends Component {

  static propTypes = {
    list: PropTypes.array,
    setPageChannelActiveTab: PropTypes.func,
  };
  onTabClickEditChannel(event) {
    event.persist();
    this.props.setPageChannelActiveTab('editChannel');
  }
  onTabClickOptionChannel(event) {
    event.persist();
    this.props.setPageChannelActiveTab('optionChannel');
  }
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
        ReactDOM.render(<Link
          to={`/resource/channel/${rowData.id}`}
          onClick={(event) => this.onTabClickEditChannel(event)}
        >{cellData}</Link>, cell);
      },
    }, {
      data: 'description',
    }, {
      data: null,
      createdCell: (cell, cellData, rowData) => {
        ReactDOM.render(<Link
          to={`/resource/channel/${rowData.id}`}
          onClick={(event) => this.onTabClickOptionChannel(event)}
        >Option</Link>, cell);
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
            <th><ICheck type="checkbox" className="inputChooseAllChannels" /></th>
            <th>Name</th>
            <th>Description</th>
            <th>&nbsp;</th>
          </tr>
        )}
        tfoot={(
          <tr>
            <th><ICheck type="checkbox" className="inputChooseAllChannels" /></th>
            <th>Name</th>
            <th>Description</th>
            <th>&nbsp;</th>
          </tr>
        )}
      />
    );
  }
}

export default ChannelList;
