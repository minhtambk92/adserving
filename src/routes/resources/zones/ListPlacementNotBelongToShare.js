import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import ReactDOM from 'react-dom';
import { DataTables, ICheck } from '../../../components/UI/';
import Link from '../../../components/Link';

class ListPlacementNotBelongToZone extends Component {
  static propTypes = {
    zoneId: PropTypes.string.isRequired,
    containerWidth: PropTypes.number,
    list: PropTypes.array,
    getZone: PropTypes.func,
    createSharePlacement: PropTypes.func,
    getPlacements: PropTypes.func,
    shareId: PropTypes.string,
    getPlacement: PropTypes.func,
    placements: PropTypes.object,
    zone: PropTypes.object,
    setCurrentShare: PropTypes.func,
    setPageZoneActiveTab: PropTypes.func,
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
        ReactDOM.render(<Link to={`/resource/zone/${rowData.id}`}>{cellData}</Link>, cell);
      },
    }, {
      data: null,
      render: (data, type, row) => `${row.sizeWidth} x ${row.sizeHeight}`,
    }, {
      data: null,
      orderable: false,
      createdCell: (cell, cellData, rowData) => {
        /* eslint-disable jsx-a11y/no-static-element-interactions */
        ReactDOM.render(<Link
          to="#"
          onClick={() => this.pushPlacementToShare(rowData.id)}
        >
          Add To Share
        </Link>, cell);
        /* eslint-enable jsx-a11y/no-static-element-interactions */
      },
    }];
  }

  /* eslint-disable max-len */
  pushPlacementToShare(id) { // eslint-disable-line no-unused-vars, class-methods-use-this
    const shareId = this.props.shareId;
    const placementId = id;
    if (placementId && shareId) {
      this.props.setCurrentShare(shareId);
      this.props.setPageZoneActiveTab('addPlacement');
      const newP = _.filter(this.props.list, { id: placementId });
      if (newP[0].sizeWidth <= this.props.zone.width && newP[0].sizeHeight <= this.props.zone.height) {
        this.props.createSharePlacement({ placementId, shareId }).then(() => {
          this.props.getZone(this.props.zoneId).then(() => {
            this.props.getPlacements();
          });
        });
      } else {
        console.log('khong them dc');
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
            <th>&nbsp;</th>
          </tr>
        )}
        tfoot={(
          <tr>
            <th><ICheck type="checkbox" className="inputPlacementsOfZone" /></th>
            <th>Name</th>
            <th>Size(px)</th>
            <th>&nbsp;</th>
          </tr>
        )}
      />
    );
  }
}

export default ListPlacementNotBelongToZone;
