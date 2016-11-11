import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { DataTables, ICheck } from '../../../components/UI/';
import Link from '../../../components/Link';

class ListPlacementNotBelongToZone extends Component {
  static propTypes = {
    zoneId: PropTypes.string.isRequired,
    containerWidth: PropTypes.number,
    list: PropTypes.array,
    pushZoneToPlacement: PropTypes.func,
    getZone: PropTypes.func,
    createPlacementBannerZone: PropTypes.func,
    getPlacements: PropTypes.func,
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
          cell
        );
      },
    }, {
      data: 'name',
      createdCell: (cell, cellData, rowData) => {
        ReactDOM.render(<Link to={`/resource/zone/${rowData.id}`}>{cellData}</Link>, cell);
      },
    }, {
      data: null,
      render: (data, type, row) => `${row.sizeWidth}px x ${row.sizeHeight}px`,
    }, {
      data: null,
      createdCell: (cell, cellData, rowData) => {
        /* eslint-disable jsx-a11y/no-static-element-interactions */
        ReactDOM.render(<Link
          onClick={() => this.pushZoneToPlacement(rowData.id)}
        >
          Add To Zone
        </Link>, cell);
        /* eslint-enable jsx-a11y/no-static-element-interactions */
      },
    }];
  }
  /* eslint-disable max-len */
  pushZoneToPlacement(id) { // eslint-disable-line no-unused-vars, class-methods-use-this
    const zoneId = this.props.zoneId;
    const bannerId = null;
    const placementId = id;
    if (placementId && zoneId) {
      this.props.createPlacementBannerZone({ placementId, bannerId, zoneId }).then(() => {
        this.props.getZone(this.props.zoneId).then(() => {
          this.props.getPlacements();
        });
      });
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
