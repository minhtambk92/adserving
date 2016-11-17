import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { DataTables, ICheck } from '../../../components/UI/';
import Link from '../../../components/Link';

class ListPlacementOfZone extends Component {

  static propTypes = {
    zoneId: PropTypes.string.isRequired,
    list: PropTypes.array,
    getPlacements: PropTypes.func,
    removeZoneInPlacementBannerZone: PropTypes.func,
    getZone: PropTypes.func,
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
      render: (data, type, row) => `${row.sizeWidth}px x ${row.sizeHeight}px`,
    }, {
      data: null,
      createdCell: (cell, cellData, rowData) => {
        /* eslint-disable jsx-a11y/no-static-element-interactions */
        ReactDOM.render(<Link
          to="#"
          onClick={() => this.removePlacement(rowData.id)}
        >
          Remove
        </Link>, cell);
        /* eslint-enable jsx-a11y/no-static-element-interactions */
      },
    }];
  }

  removePlacement(id) { // eslint-disable-line no-unused-vars, class-methods-use-this
    const zId = this.props.zoneId;
    const placementId = id;
    if (placementId && zId) {
      this.props.removeZoneInPlacementBannerZone({ placementId, zId }).then(() => {
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

export default ListPlacementOfZone;
