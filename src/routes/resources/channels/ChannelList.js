import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { DataTables, ICheck } from '../../../components/UI/';
import Link from '../../../components/Link';
// import withStyles from 'isomorphic-style-loader/lib/withStyles';

class ChannelList extends Component {

  static propTypes = {
    list: PropTypes.array,
    setPageChannelActiveTab: PropTypes.func,
    createChannel: PropTypes.func,
    getOptionChannelByChannelId: PropTypes.func,
    optionChannels: PropTypes.object,
    createOptionChannel: PropTypes.func,
    channels: PropTypes.object,
    user: PropTypes.object,
    createActivity: PropTypes.func,
  };

  onTabClickEditChannel(event) {
    event.persist();
    this.props.setPageChannelActiveTab('editChannel');
  }

  onTabClickOptionChannel(event) {
    event.persist();
    this.props.setPageChannelActiveTab('optionChannel');
  }

  duplicateChannelAndChannelOption(data) {
    /* CREATE CHANNEL */
    const name = `Copy Of ${data.name}`;
    const description = data.description;
    const status = data.status;
    const siteId = data.siteId;
    if (name && description && siteId) {
      this.props.createChannel({ name, description, status, siteId }).then(() => {
        if (this.props.list && this.props.list.length > 0) {
          const userId = this.props.user.id;
          const subject = `Channel ${data.name}`;
          const subjectId = this.props.list[0].id;
          const action = 'duplicated';
          const other = JSON.stringify(data);
          this.props.createActivity({ action,
            subject,
            subjectId,
            other,
            userId });
        }
        if (this.props.channels && this.props.channels.list) {
          const cId = this.props.channels.list[0].id;
          /* CREATE OPTION CHANNEL */
          for (let i = 0; i < data.options.length; i += 1) {
            const comparison = data.options[i].comparison;
            const optionChannelTypeId = data.options[i].optionChannelType.id;
            /* eslint-disable no-shadow */
            const name = data.options[i].name;
            /* eslint-enable no-shadow */
            const value = data.options[i].value;
            const logical = data.options[i].logical;
            const channelId = cId;
            if (comparison && value) {
              this.props.createOptionChannel({
                name,
                logical,
                optionChannelTypeId,
                comparison,
                value,
                channelId,
              });
            }
          }
        }
      });
    }
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
      orderable: false,
      createdCell: (cell, cellData, rowData) => {
        ReactDOM.render(<Link
          to={`/resource/channel/${rowData.id}`}
          onClick={(event) => this.onTabClickOptionChannel(event)}
        >Option</Link>, cell);
      },
    }, {
      data: null,
      orderable: false,
      createdCell: (cell, cellData, rowData) => {
        ReactDOM.render(<Link
          to="#"
          onClick={() => this.duplicateChannelAndChannelOption(rowData)}
        >Duplicate</Link>, cell);
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
            <th>&nbsp;</th>
          </tr>
        )}
        tfoot={(
          <tr>
            <th><ICheck type="checkbox" className="inputChooseAllChannels" /></th>
            <th>Name</th>
            <th>Description</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
          </tr>
        )}
      />
    );
  }
}

export default ChannelList;
