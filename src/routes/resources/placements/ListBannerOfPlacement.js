import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Link from '../../../components/Link';
import { DataTables, ICheck } from '../../../components/UI/';

class ListBannerOfPlacement extends Component {

  static propTypes = {
    placementId: PropTypes.string.isRequired,
    containerWidth: PropTypes.number,
    list: PropTypes.array,
    removeBannerToPlacement: PropTypes.func,
    getPlacement: PropTypes.func,
    removeBannerInPlacementBanner: PropTypes.func,
    getBanners: PropTypes.func,
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
        ReactDOM.render(<Link to={`/resource/banner/${rowData.id}`}>{rowData.name}</Link>, cell);
      },
    }, {
      data: null,
      render: (data, type, rowData) => `${rowData.width}px x ${rowData.height}px`,
    }, {
      data: null,
      createdCell: (cell, cellData, rowData) => {
        /* eslint-disable jsx-a11y/no-static-element-interactions */
        ReactDOM.render(<Link
          to="#"
          onClick={() => this.removeBannerToPlacement(rowData.id)}
        >
          Remove
        </Link>, cell);
        /* eslint-enable jsx-a11y/no-static-element-interactions */
      },
    }];
  }

  removeBannerToPlacement(bannerId) { // eslint-disable-line no-unused-vars, class-methods-use-this
    const placementId = this.props.placementId;
    const bId = bannerId;
    if (placementId && bId) {
      this.props.removeBannerInPlacementBanner({ placementId, bId }).then(() => {
        this.props.getBanners();
        this.props.getPlacement(placementId).then(() => {
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
            <th><ICheck type="checkbox" className="inputChooseAllBanners" /></th>
            <th>Name</th>
            <th>Size(px)</th>
            <th>&nbsp;</th>
          </tr>
        )}
        tfoot={(
          <tr>
            <th><ICheck type="checkbox" className="inputChooseAllBanners" /></th>
            <th>Name</th>
            <th>Size(px)</th>
            <th>&nbsp;</th>
          </tr>
        )}
      />
    );
  }
}

export default ListBannerOfPlacement;
