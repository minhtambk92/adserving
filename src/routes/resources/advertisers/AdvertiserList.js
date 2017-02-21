import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { DataTables, ICheck } from '../../../components/UI/';
import Link from '../../../components/Link';
// import withStyles from 'isomorphic-style-loader/lib/withStyles';

class AdvertiserList extends Component {

  static propTypes = {
    list: PropTypes.array,
    setPageAdvertiserActiveTab: PropTypes.func,
    createAdvertiser: PropTypes.func,
    createActivity: PropTypes.func,
    user: PropTypes.object,
  };
  onTabClickCampaign(event) {
    event.persist();
    this.props.setPageAdvertiserActiveTab('addCampaign');
  }
  onTabClickAdvertiser(event) {
    event.persist();
    this.props.setPageAdvertiserActiveTab('editAdvertiser');
  }

  duplicateAdvertiser(data) {
    const name = `Copy of ${data.name}`;
    const contact = data.contact;
    const email = data.email;
    const isEmailStatus = data.isEmailStatus;
    const isEmailReport = data.isEmailReport;
    const reportInterval = data.reportInterval;
    const description = data.description;
    const status = data.status;

    if (contact && name && email && description) {
      this.props.createAdvertiser({
        email,
        name,
        contact,
        isEmailStatus,
        isEmailReport,
        reportInterval,
        description,
        status,
      }).then(() => {
        if (this.props.list && this.props.list.length > 0) {
          const userId = this.props.user.id;
          const subject = `Advertiser ${data.name}`;
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
            className="inputChooseAdvertiser"
            name="inputChooseAdvertiser[]"
            value={cellData}
          />,
          cell,
        );
      },
    }, {
      data: 'name',
      createdCell: (cell, cellData, rowData) => {
        ReactDOM.render(<Link
          to={`/resource/advertiser/${rowData.id}`}
          onClick={event => this.onTabClickAdvertiser(event)}
        >{cellData}</Link>, cell);
      },
    }, {
      data: 'email',
    }, {
      data: 'contact',
    }, {
      data: null,
      orderable: false,
      createdCell: (cell, cellData, rowData) => {
        ReactDOM.render(<Link
          to={`/resource/advertiser/${rowData.id}`}
          onClick={event => this.onTabClickCampaign(event)}
        >New Campaign</Link>, cell);
      },
    }, {
      data: null,
      orderable: false,
      createdCell: (cell, cellData, rowData) => {
        ReactDOM.render(<Link
          to="#"
          onClick={() => this.duplicateAdvertiser(rowData)}
        >Dupicate</Link>, cell);
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
            <th><ICheck type="checkbox" className="inputChooseAllAdvertisers" /></th>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
          </tr>
        )}
        tfoot={(
          <tr>
            <th><ICheck type="checkbox" className="inputChooseAllAdvertisers" /></th>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
          </tr>
        )}
      />
    );
  }
}

export default AdvertiserList;
