import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Link from '../../../components/Link';
import { DataTables, ICheck } from '../../../components/UI/';

class ListPlacementNotBelongToBanner extends Component {
  static propTypes = {
    bannerId: PropTypes.string.isRequired,
    list: PropTypes.array,
    updateBanner: PropTypes.func,
    getBanner: PropTypes.func,
    banner: PropTypes.object,
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
        ReactDOM.render(
          <Link
            to="#"
            onClick={() => this.pushBannerToPlacement(rowData)}
          >Add To Banner</Link>, cell);
        /* eslint-enable jsx-a11y/no-static-element-interactions */
      },
    }];
  }

  pushBannerToPlacement(rowData) {
    if (this.props.banner) {
      const placement = this.props.banner.placements;
      placement.push(rowData);
      const banner = this.props.banner;
      banner.placements = JSON.stringify(placement.map(p => ({
        id: p.id,
        name: p.name,
        width: p.width,
        height: p.height,
        startTime: p.startTime,
        endTime: p.endTime,
        weight: p.weight,
        description: p.description,
        campaignId: p.campaignId,
        status: p.status,
        isDeleted: false,
      })));
      let bannerTypeId = null;
      if (this.props.banner.bannerType) {
        bannerTypeId = this.props.banner.bannerType.id;
      } else if (this.props.banner.bannerTypeId) {
        bannerTypeId = this.props.banner.bannerTypeId;
      }
      banner.bannerTypeId = bannerTypeId;
      this.props.updateBanner(banner);
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

export default ListPlacementNotBelongToBanner;
