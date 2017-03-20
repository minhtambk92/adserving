
/* global jQuery */

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Link from '../../../components/Link';
import { DataTables, ICheck } from '../../../components/UI/';

class ListBannerOfPlacement extends Component {

  static propTypes = {
    placementId: PropTypes.string.isRequired,
    list: PropTypes.array,
    getPlacement: PropTypes.func,
    getBanners: PropTypes.func,
    createBanner: PropTypes.func,
    banners: PropTypes.object,
    tracks: PropTypes.object,
    createTrack: PropTypes.func,
    placement: PropTypes.object,
    updatePlacement: PropTypes.func,
    updateBanner: PropTypes.func,
  };

  duplicateBannerOfPlacement(data) {
    const name = `Copy of ${data.name}`;
    const width = data.width;
    const height = data.height;
    const weight = data.weight;
    const description = data.description;
    const channelId = data.channelId;
    const bannerTypeId = data.bannerTypeId;
    const isIFrame = data.isIFrame;
    const target = data.target;
    const url = data.url;
    const imageUrl = data.imageUrl;
    const html = data.html;
    const bannerHtmlTypeId = data.bannerHtmlTypeId;
    const adsServerId = data.adsServerId;
    const status = data.status;
    const keyword = data.keyword;
    const isCountView = data.isCountView;
    const isFixIE = data.isFixIE;
    const isDefault = data.isDefault;
    const isRelative = data.isRelative;
    const adStore = data.adStore;
    const impressionsBooked = data.impressionsBooked;
    const clicksBooked = data.clicksBooked;
    const activationDate = data.activationDate;
    const expirationDate = data.expirationDate;

    if (name && keyword && width && description && bannerTypeId && channelId) {
      this.props.createBanner({
        name,
        html,
        width,
        height,
        keyword,
        weight,
        description,
        bannerTypeId,
        url,
        target,
        imageUrl,
        isIFrame,
        status,
        adsServerId,
        bannerHtmlTypeId,
        isCountView,
        isFixIE,
        isDefault,
        isRelative,
        adStore,
        impressionsBooked,
        clicksBooked,
        activationDate,
        expirationDate,
        channelId,
      }).then(() => {
        if (this.props.banners.list[0]) {
          const bannerId = this.props.banners.list[0].id;
          const banner = this.props.banners.list[0];

          if (data.placements.length > 0) {
            const placements = data.placements;
            banner.placements = JSON.stringify(placements.map(b => ({
              id: b.id,
              isDeleted: false,
            })));
            this.props.updateBanner(banner).then(() => {
              this.props.getPlacement(this.props.placementId);
            });
          }

          if (data.tracks.length > 0) {
            const arrTracks = data.tracks;
            for (let j = 0; j < arrTracks.length; j += 1) {
              const clickUrl = arrTracks[j].clickUrl;
              const impressionUrl = arrTracks[j].impressionUrl;
              this.props.createTrack({ clickUrl, impressionUrl, bannerId }).then(() => {
                this.props.getPlacement(this.props.placementId);
              });
            }
          }
        }
      });
    }
  }

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
      render: (data, type, rowData) => `${rowData.width} x ${rowData.height}`,
    }, {
      data: null,
      orderable: false,
      createdCell: (cell, cellData, rowData) => {
        /* eslint-disable jsx-a11y/no-static-element-interactions */
        ReactDOM.render(<Link
          to="#"
          onClick={() => this.removeBannerToPlacement(rowData)}
        >
          Remove
        </Link>, cell);
        /* eslint-enable jsx-a11y/no-static-element-interactions */
      },
    }, {
      data: null,
      orderable: false,
      createdCell: (cell, cellData, rowData) => {
        /* eslint-disable jsx-a11y/no-static-element-interactions */
        ReactDOM.render(<Link
          to="#"
          onClick={() => this.duplicateBannerOfPlacement(rowData)}
        >
          Duplicate
        </Link>, cell);
        /* eslint-enable jsx-a11y/no-static-element-interactions */
      },
    }];
  }

  removeBannerToPlacement(rowData) { // eslint-disable-line no-unused-vars, class-methods-use-this
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
        isDeleted: [rowData.id].indexOf(b.id) !== -1,
      })));
      placement.banners = banners;
      this.props.updatePlacement(placement).then(() => {
        this.props.getPlacement(this.props.placementId).then(() => {
          this.props.getBanners();
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
            <th>&nbsp;</th>
          </tr>
        )}
        tfoot={(
          <tr>
            <th><ICheck type="checkbox" className="inputChooseAllBanners" /></th>
            <th>Name</th>
            <th>Size(px)</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
          </tr>
        )}
      />
    );
  }
}

export default ListBannerOfPlacement;
