import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import ReactDOM from 'react-dom';
import { DataTables, ICheck } from '../../../components/UI/';
import Link from '../../../components/Link';

class ListPlacementNotBelongToZone extends Component {
  static propTypes = {
    zoneId: PropTypes.string.isRequired,
    list: PropTypes.array,
    updateShare: PropTypes.func,
    shareId: PropTypes.string,
    share: PropTypes.object,
    zone: PropTypes.object,
    shares: PropTypes.object,
    setCurrentShare: PropTypes.func,
    listPlacementNotBelongShare: PropTypes.array,
  };

  dataTableOptions() {
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
        ReactDOM.render(<Link to={`/resource/placement/${rowData.id}`}>{cellData}</Link>, cell);
      },
    }, {
      data: null,
      render: (data, type, row) => `${row.width} x ${row.height}`,
    }, {
      data: 'weight',
    }, {
      data: null,
      orderable: false,
      createdCell: (cell, cellData, rowData) => {
        /* eslint-disable jsx-a11y/no-static-element-interactions */
        ReactDOM.render(<Link
          to="#"
          onClick={() => this.pushPlacementToShare(rowData)}
        >
          Add To Share
        </Link>, cell);
        /* eslint-enable jsx-a11y/no-static-element-interactions */
      },
    }];
  }

  /* eslint-disable max-len */
  pushPlacementToShare(rowData) {
 // eslint-disable-line no-unused-vars, class-methods-use-this

    const arr = this.props.listPlacementNotBelongShare;
    _.sumBy(arr, o => o.weight); // ➜ 20
    const sumWeight = _.sumBy(arr, 'weight');// ➜ 20
    const shareId = this.props.shareId;
    this.props.setCurrentShare(shareId);
    /* eslint-disable radix */
    const newWeight = sumWeight + parseInt(rowData.weight);
    if (newWeight <= 100) {
      if (this.props.share) {
        const share = this.props.share;
        const placement = this.props.share.placements;
        placement.push(rowData);
        share.placements = JSON.stringify(placement.map(data => ({
          id: data.id,
          name: data.name,
          startTime: data.startTime,
          endTime: data.endTime,
          width: data.width,
          height: data.height,
          weight: data.weight,
          description: data.description,
          campaignId: data.campaignId,
          status: data.status,
          isDeleted: false,
        })));

        this.props.updateShare(share);
      }
    }
  }

  /* eslint-enable max-len */

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
            <th><ICheck type="checkbox" className="inputPlacementsOfZone" /></th>
            <th>Name</th>
            <th>Size(px)</th>
            <th>Weight(%)</th>
            <th>&nbsp;</th>
          </tr>
        )}
        tfoot={(
          <tr>
            <th><ICheck type="checkbox" className="inputPlacementsOfZone" /></th>
            <th>Name</th>
            <th>Size(px)</th>
            <th>Weight(%)</th>
            <th>&nbsp;</th>
          </tr>
        )}
      />
    );
  }
}

export default ListPlacementNotBelongToZone;
