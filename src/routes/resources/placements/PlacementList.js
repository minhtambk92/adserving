import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import ReactDOM from 'react-dom';
import Link from '../../../components/Link';
import { DataTables, ICheck } from '../../../components/UI/';
// import withStyles from 'isomorphic-style-loader/lib/withStyles';

class PlacementList extends Component {

  static propTypes = {
    containerWidth: PropTypes.number,
    list: PropTypes.array,
    setPagePlacementActiveTab: PropTypes.func,
    createPlacement: PropTypes.func,
    getCampaign: PropTypes.func,
    campaignId: PropTypes.string,
  };

  onTabClickEditPlacement(event) {
    event.persist();
    this.props.setPagePlacementActiveTab('editPlacement');
  }

  onTabClickAddBanner(event) {
    event.persist();
    this.props.setPagePlacementActiveTab('addBanner');
  }

  duplicatePlacement(data) {
    const name = `Copy of ${data.name}`;
    const startTime = data.startTime;
    const endTime = data.endTime;
    const width = data.width;
    const height = data.height;
    const weight = data.weight;
    const description = data.description;
    const campaignId = data.campaignId;
    const status = data.status;
    if (name) {
      this.props.createPlacement({
        name,
        width,
        height,
        startTime,
        endTime,
        weight,
        description,
        campaignId,
        status,
      }).then(() => {
        if (this.props.campaignId) {
          this.props.getCampaign(this.props.campaignId);
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
            className="inputChoosePlacement"
            name="inputChoosePlacement[]"
            value={cellData}
          />,
          cell,
        );
      },
    }, {
      data: 'name',
      createdCell: (cell, cellData, rowData) => {
        ReactDOM.render(<Link
          to={`/resource/placement/${rowData.id}`}
          onClick={(event) => this.onTabClickEditPlacement(event)}
        >{cellData}</Link>, cell);
      },
    }, {
      data: null,
      render: (data, type, row) => `${row.width} x ${row.height}`,
    }, {
      data: 'startTime',
      render: data => (data ? moment(new Date(data)).format('L') : ''),
    }, {
      data: 'endTime',
      render: data => (data ? moment(new Date(data)).format('L') : ''),
    }, {
      data: null,
      orderable: false,
      createdCell: (cell, cellData, rowData) => {
        ReactDOM.render(<Link
          to={`/resource/placement/${rowData.id}`}
          onClick={(event) => this.onTabClickAddBanner(event)}
        >New Banner</Link>, cell);
      },
    }, {
      data: null,
      orderable: false,
      createdCell: (cell, cellData, rowData) => {
        ReactDOM.render(<Link
          to="#"
          onClick={() => this.duplicatePlacement(rowData)}
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
            <th><ICheck type="checkbox" className="inputChooseAllPlacements" /></th>
            <th>Name</th>
            <th>Size(px)</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
          </tr>
        )}
        tfoot={(
          <tr>
            <th><ICheck type="checkbox" className="inputChooseAllPlacements" /></th>
            <th>Name</th>
            <th>Size(px)</th>
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

export default PlacementList;
