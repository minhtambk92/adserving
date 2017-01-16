import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Link from '../../../components/Link';
import { DataTables, ICheck } from '../../../components/UI/';

class BannerList extends Component {

  static propTypes = {
    list: PropTypes.array,
    setPageBannerActiveTab: PropTypes.func,
    createBanner: PropTypes.func,
    getPlacementsByBannerId: PropTypes.func,
    banners: PropTypes.object,
    placementBanners: PropTypes.object,
    createPlacementBanner: PropTypes.func,
    tracks: PropTypes.object,
    getTrackByBannerId: PropTypes.func,
    createTrack: PropTypes.func,
  };

  onTabClickBanner(event) {
    event.persist();
    this.props.setPageBannerActiveTab('editBanner');
  }

  onTabClickNewPlacement(event) {
    event.persist();
    this.props.setPageBannerActiveTab('addPlacement');
  }

  onTabClickOptionBanner(event) {
    event.persist();
    this.props.setPageBannerActiveTab('optionBanner');
  }

  duplicateBanner(data) {
    const name = `Copy of ${data.name}`;
    const width = data.width;
    const height = data.height;
    const weight = data.weight;
    const description = data.description;
    const channelId = data.channelId;
    const bannerTypeId = data.bannerType.id;
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
    const isImpressionsBooked = data.isImpressionsBooked;
    const isClicksBooked = data.isClicksBooked;
    const isActivationDate = data.isActivationDate;
    const isExpirationDate = data.isExpirationDate;
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
        isImpressionsBooked,
        isClicksBooked,
        isActivationDate,
        isExpirationDate,
        adStore,
        impressionsBooked,
        clicksBooked,
        activationDate,
        expirationDate,
        channelId,
      }).then(() => {
        this.props.getTrackByBannerId(data.id).then(() => {
          const bannerId = this.props.banners.list[0].id;
          if (this.props.tracks) {
            const arrTracks = this.props.tracks.list;
            for (let j = 0; j < arrTracks.length; j += 1) {
              const clickUrl = arrTracks[j].clickUrl;
              const impressionUrl = arrTracks[j].impressionUrl;
              this.props.createTrack({ clickUrl, impressionUrl, bannerId });
            }
          }
        });
      });
    }
  }

  dataTableOptions() { // eslint-disable-line no-unused-vars, class-methods-use-this
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
        ReactDOM.render(<Link
          to={`/resource/banner/${rowData.id}`}
          onClick={(event) => this.onTabClickBanner(event)}
        >{cellData}</Link>, cell);
      },
    }, {
      data: null,
      render: (data, type, row) => `${row.width} x ${row.height}`,
    }, {
      data: null,
      orderable: false,
      createdCell: (cell, cellData, rowData) => {
        ReactDOM.render(<Link
          to={`/resource/banner/${rowData.id}`}
          onClick={(event) => this.onTabClickOptionBanner(event)}
        >Option Banner</Link>, cell);
      },
    }, {
      data: null,
      orderable: false,
      createdCell: (cell, cellData, rowData) => {
        ReactDOM.render(<Link
          to={`/resource/banner/${rowData.id}`}
          onClick={(event) => this.onTabClickNewPlacement(event)}
        >New Placement</Link>, cell);
      },
    }, {
      data: null,
      orderable: false,
      createdCell: (cell, cellData, rowData) => {
        ReactDOM.render(<Link
          to="#"
          onClick={() => this.duplicateBanner(rowData)}
        >Duplicate</Link>, cell);
      },
    }];
  }

  render() {
    // Open the portal
    return (
      <DataTables
        className="table table-bordered table-striped"
        data={this.props.list}
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
            <th>&nbsp;</th>
            <th>&nbsp;</th>
          </tr>
        )}
        tfoot={(
          <tr>
            <th><ICheck type="checkbox" className="inputChooseAllBanners" /></th>
            <th>Name</th>
            <th>Size</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
          </tr>
        )}
      />
    );
  }
}

export default BannerList;
