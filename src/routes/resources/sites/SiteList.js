import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Link from '../../../components/Link';
import { DataTables, ICheck } from '../../../components/UI/';

class SiteList extends Component {

  static propTypes = {
    list: PropTypes.array,
    setPageSiteActiveTab: PropTypes.func,
    createSite: PropTypes.func,
    users: PropTypes.object,
    createActivity: PropTypes.func,
  };

  onTabClickEditSite(event) {
    event.persist();
    this.props.setPageSiteActiveTab('editSite');
  }

  onTabClickAddChannel(event) {
    event.persist();
    this.props.setPageSiteActiveTab('addChannel');
  }

  onTabClickAddZone(event) {
    event.persist();
    this.props.setPageSiteActiveTab('addZone');
  }

  duplicateSite(data) {
    const random = Math.floor((Math.random() * 1000000) + 1);
    const domain = `http://demo${random}.com.vn`;
    const name = `Copy of ${data.name}`;
    const email = data.email;
    const description = data.description;
    const status = data.status;

    if (domain && name && email && description && status) {
      this.props.createSite({ domain, name, email, description, status }).then(() => {
        if (this.props.list && this.props.list.length > 0) {
          const userId = this.props.users.id;
          const subject = `Site ${data.name}`;
          const subjectId = this.props.list[0].id;
          const action = 'duplicated';
          const other = JSON.stringify(data);
          this.props.createActivity({ action,
            subject,
            subjectId,
            other,
            userId });
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
            className="inputChooseSite"
            name="inputChooseSite[]"
            value={cellData}
          />,
          cell,
        );
      },
    }, {
      data: 'name',
      createdCell: (cell, cellData, rowData) => {
        ReactDOM.render(<Link
          to={`/resource/site/${rowData.id}`}
          onClick={(event) => this.onTabClickEditSite(event)}
        >{cellData}</Link>, cell);
      },
    }, {
      data: 'domain',
    }, {
      data: 'email',
    }, {
      data: null,
      orderable: false,
      createdCell: (cell, cellData, rowData) => {
        ReactDOM.render(<Link
          to={`/resource/site/${rowData.id}`}
          onClick={(event) => this.onTabClickAddChannel(event)}
        >Target Channel</Link>, cell);
      },
    }, {
      data: null,
      orderable: false,
      createdCell: (cell, cellData, rowData) => {
        ReactDOM.render(<Link
          to={`/resource/site/${rowData.id}`}
          onClick={(event) => this.onTabClickAddZone(event)}
        >New Zone</Link>, cell);
      },
    }, {
      data: null,
      orderable: false,
      createdCell: (cell, cellData, rowData) => {
        ReactDOM.render(<Link
          to="#"
          onClick={() => this.duplicateSite(rowData)}
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
            <th><ICheck type="checkbox" className="inputChooseAllSites" /></th>
            <th>Name</th>
            <th>Domain</th>
            <th>Email</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
          </tr>
        )}
        tfoot={(
          <tr>
            <th><ICheck type="checkbox" className="inputChooseAllSites" /></th>
            <th>Name</th>
            <th>Domain</th>
            <th>Email</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
          </tr>
        )}
      />
    );
  }
}

export default SiteList;
