
/* global jQuery */

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { DataTables, ICheck } from '../../../components/UI/';
import Link from '../../../components/Link';

class ListBannerNotBelongPlacement extends Component {

  static propTypes = {
    placementId: PropTypes.string.isRequired,
    list: PropTypes.array,
    getPlacement: PropTypes.func,
    updatePlacement: PropTypes.func,
    getBanners: PropTypes.func,
    placement: PropTypes.object,
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
        ReactDOM.render(<Link to={`/resource/banner/${rowData.id}`}>{cellData}</Link>, cell);
      },
    }, {
      data: null,
      render: (data, type, row) => `${row.width} x ${row.height}`,
    }, {
      data: null,
      orderable: false,
      createdCell: (cell, cellData, rowData) => {
        /* eslint-disable jsx-a11y/no-static-element-interactions */
        ReactDOM.render(<Link
          to="#"
          onClick={() => this.pushBannerToPlacement(rowData)}
        >
          Add To Placement
        </Link>, cell);
        /* eslint-enable jsx-a11y/no-static-element-interactions */
      },
    }];
  }

  /* eslint-disable max-len */
  pushBannerToPlacement(rowData) { // eslint-disable-line no-unused-vars, class-methods-use-this
    if (this.props.placement) {
      const banner = jQuery.extend({}, this.props.placement.banners);
      banner.push(rowData);
      const placement = jQuery.extend({}, this.props.placement);
      const banners = JSON.stringify(banner.map(b => ({
        id: b.id,
        name: b.name,
        with: b.width,
        height: b.height,
        weight: b.weight,
        isDeleted: false,
      })));
      placement.banners = banners;
      this.props.updatePlacement(placement);
    }
  }

  /* eslint-enable max-len */
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

export default ListBannerNotBelongPlacement;
