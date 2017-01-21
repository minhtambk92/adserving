import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Link from '../../../components/Link';
import { DataTables, ICheck } from '../../../components/UI/';

class ListChannelOfSite extends Component {

  static propTypes = {
    list: PropTypes.array,
    setPageChannelActiveTab: PropTypes.func,
    createChannel: PropTypes.func,
    getSite: PropTypes.func,
    channels: PropTypes.object,
    createOptionChannel: PropTypes.func,
    siteId: PropTypes.string,
  };

  onTabClickEditChannel(event) {
    event.persist();
    this.props.setPageChannelActiveTab('editChannel');
  }

  onTabClickOptionChannel(event) {
    event.persist();
    this.props.setPageChannelActiveTab('optionChannel');
  }

  duplicateChannelAndOptionChannel(data) {
    /* CREATE CHANNEL */
    const name = `Copy Of ${data.name}`;
    const description = data.description;
    const status = data.status;
    const siteId = this.props.siteId;
    if (name && description && siteId) {
      this.props.createChannel({ name, description, status, siteId }).then(() => {
        if (this.props.channels && this.props.channels.list) {
          const cId = this.props.channels.list[0].id;
          /* CREATE OPTION CHANNEL */
          if (data.options.length > 0) {
            const arrOption = data.options;
            for (let i = 0; i < arrOption.length; i += 1) {
              const comparison = arrOption[i].comparison;
              const optionChannelTypeId = arrOption[i].optionChannelTypeId;
              /* eslint-disable no-shadow */
              const name = arrOption[i].name;
              /* eslint-enable no-shadow */
              const value = arrOption[i].value;
              const logical = arrOption[i].logical;
              const channelId = cId;
              if (comparison && value) {
                this.props.createOptionChannel({
                  name,
                  logical,
                  optionChannelTypeId,
                  comparison,
                  value,
                  channelId,
                }).then(() => {
                  this.props.getSite(this.props.siteId);
                });
              }
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
        >{rowData.name}</Link>, cell);
      },
    }, {
      data: null,
      orderable: false,
      createdCell: (cell, cellData, rowData) => {
        /* eslint-disable jsx-a11y/no-static-element-interactions */
        ReactDOM.render(<Link
          to={`/resource/channel/${rowData.id}`}
          onClick={(event) => this.onTabClickOptionChannel(event)}
        >Option</Link>, cell);
        /* eslint-enable jsx-a11y/no-static-element-interactions */
      },
    }, {
      data: null,
      orderable: false,
      createdCell: (cell, cellData, rowData) => {
        /* eslint-disable jsx-a11y/no-static-element-interactions */
        ReactDOM.render(<Link
          to="#"
          onClick={() => this.duplicateChannelAndOptionChannel(rowData)}
        >Duplicate</Link>, cell);
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
            <th>&nbsp;</th>
          </tr>
        )}
        tfoot={(
          <tr>
            <th><ICheck type="checkbox" className="inputChooseAllChannels" /></th>
            <th>Name</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
          </tr>
        )}
      />
    );
  }
}

export default ListChannelOfSite;
