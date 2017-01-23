import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import ReactDOM from 'react-dom';
import Link from '../../../components/Link';
import { DataTables, ICheck } from '../../../components/UI/';
// import withStyles from 'isomorphic-style-loader/lib/withStyles';

class CampaignList extends Component {

  static propTypes = {
    list: PropTypes.array,
    setPageCampaignActiveTab: PropTypes.func,
    createCampaign: PropTypes.func,
    advertiserId: PropTypes.string,
    getAdvertiser: PropTypes.func,
  };

  onTabClickCampaign(event) {
    event.persist();
    this.props.setPageCampaignActiveTab('editCampaign');
  }

  onTabClickPlacement(event) {
    event.persist();
    this.props.setPageCampaignActiveTab('addPlacement');
  }

  duplicateCampaign(data) {
    const name = `Copy of ${data.name}`;
    const advertiserId = data.advertiserId;
    const startTime = data.startTime;
    const endTime = data.endTime;
    const views = data.views;
    const viewPerSession = data.viewPerSession;
    const timeResetViewCount = data.timeResetViewCount;
    const weight = data.weight;
    const description = data.description;
    const status = data.status;
    const revenueType = data.revenueType;
    const expireValueCPM = data.expireValueCPM;
    const maxCPMPerDay = data.maxCPMPerDay;

    this.props.createCampaign({
      advertiserId,
      name,
      startTime,
      endTime,
      views,
      viewPerSession,
      timeResetViewCount,
      weight,
      revenueType,
      expireValueCPM,
      maxCPMPerDay,
      description,
      status,
    }).then(() => {
      if (this.props.advertiserId) {
        this.props.getAdvertiser(this.props.advertiserId);
      }
    });
  }

  dataTableOptions() { // eslint-disable-line no-unused-vars, class-methods-use-this
    return [{
      data: 'id',
      orderable: false,
      createdCell: (cell, cellData) => {
        ReactDOM.render(
          <ICheck
            type="checkbox"
            className="inputChooseCampaign"
            name="inputChooseCampaign[]"
            value={cellData}
          />,
          cell,
        );
      },
    }, {
      data: 'name',
      createdCell: (cell, cellData, rowData) => {
        ReactDOM.render(<Link
          to={`/resource/campaign/${rowData.id}`}
          onClick={(event) => this.onTabClickCampaign(event)}
        >{cellData}</Link>, cell);
      },
    }, {
      data: 'startTime',
      render: data => (data ? moment(new Date(data)).format('L') : ''),
    }, {
      data: 'endTime',
      render: data => (data ? moment(new Date(data)).format('L') : 'Dont expire'),
    }, {
      data: null,
      orderable: false,
      createdCell: (cell, cellData, rowData) => {
        ReactDOM.render(<Link
          to={`/resource/campaign/${rowData.id}`}
          onClick={(event) => this.onTabClickPlacement(event)}
        >New Placement</Link>, cell);
      },
    }, {
      data: null,
      orderable: false,
      createdCell: (cell, cellData, rowData) => {
        ReactDOM.render(<Link
          to="#"
          onClick={() => this.duplicateCampaign(rowData)}
        >Duplicate</Link>, cell);
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
            <th><ICheck type="checkbox" className="inputChooseAllCampaigns" /></th>
            <th>Name</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
          </tr>
        )}
        tfoot={(
          <tr>
            <th><ICheck type="checkbox" className="inputChooseAllCampaigns" /></th>
            <th>Name</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
          </tr>
        )}
      />
    );
  }
}

export default CampaignList;
