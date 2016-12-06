import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Link from '../../../components/Link';
import { DataTables, ICheck } from '../../../components/UI/';

class ListPlacementOfBanner extends Component {

  static propTypes = {
    bannerId: PropTypes.string.isRequired,
    containerWidth: PropTypes.number,
    list: PropTypes.array,
    getPlacements: PropTypes.func,
    removeBannerInPlacementBanner: PropTypes.func,
    getBanner: PropTypes.func,
  };

  dataTableOptions() {
    return [{
      data: 'id',
      orderable: false,
      createdCell: (cell, cellData) => {
        ReactDOM.render(
          <ICheck
            type="checkbox"
            className="inputChooseBanner"
            name="inputChooseBanner[]"
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
        ReactDOM.render(
          <Link
            to="#"
            onClick={() => this.removePlacement(rowData.id)}
          >Remove</Link>, cell);
      },
    }];
  }

  removePlacement(id) {
    const bId = this.props.bannerId;
    const placementId = id;
    if (placementId && bId) {
      this.props.removeBannerInPlacementBanner({ placementId, bId }).then(() => {
        this.props.getBanner(this.props.bannerId).then(() => {
          this.props.getPlacements();
        });
      });
    }
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
            <th><ICheck type="checkbox" className="inputChooseAllBanners" /></th>
            <th>Name</th>
            <th>Size</th>
            <th>&nbsp;</th>
          </tr>
        )}
        tfoot={(
          <tr>
            <th><ICheck type="checkbox" className="inputChooseAllBanners" /></th>
            <th>Name</th>
            <th>Size</th>
            <th>&nbsp;</th>
          </tr>
        )}
      />
    );
  }
}

export default ListPlacementOfBanner;
