import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { DataTables, ICheck } from '../../../components/UI/';
import Link from '../../../components/Link';

class ListPlacementOfShare extends Component {

  static propTypes = {
    zoneId: PropTypes.string.isRequired,
    list: PropTypes.array,
    getPlacements: PropTypes.func,
    updateShare: PropTypes.func,
    share: PropTypes.object,
    getZone: PropTypes.func,
    shareId: PropTypes.string,
    setCurrentShare: PropTypes.func,
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
        ReactDOM.render(<Link to={`/resource/placement/${rowData.id}`}>{rowData.name}</Link>, cell);
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
          onClick={() => this.removePlacementToShare(rowData)}
        >
          Remove
        </Link>, cell);
        /* eslint-enable jsx-a11y/no-static-element-interactions */
      },
    }];
  }

  removePlacementToShare(rowData) { // eslint-disable-line no-unused-vars, class-methods-use-this
    const shareId = this.props.shareId;
    this.props.setCurrentShare(shareId);
    if (this.props.share) {
      const placements = this.props.share.placements;
      placements.push(rowData);
      const share = this.props.share;
      share.placements = JSON.stringify(placements.map(data => ({
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
        isDeleted: [rowData.id].indexOf(data.id) !== -1,
      })));

      this.props.updateShare(share).then(() => {
        this.props.getZone(this.props.zoneId).then(() => {
          this.props.getPlacements();
        });
      });
    }
  }

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

export default ListPlacementOfShare;
