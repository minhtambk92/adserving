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
    createBanner: PropTypes.func,
    banners: PropTypes.object,
    createPlacementBanner: PropTypes.func,
    clickImpressions: PropTypes.object,
    createClickImpression: PropTypes.func,
  };

  duplicateBannerOfPlacement(data) {
    const name = `Copy of ${data.name}`;
    const width = data.width;
    const height = data.height;
    const weight = data.weight;
    const description = data.description;
    const channelId = data.channelId;
    const type = data.type;
    const isIFrame = data.isIFrame;
    const target = data.target;
    const url = data.url;
    const imageUrl = data.imageUrl;
    const html = data.html;
    const bannerHTMLType = data.bannerHTMLType;
    const adServer = data.adServer;
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
    if (name && keyword && width && description && type && channelId) {
      this.props.createBanner({
        name,
        html,
        width,
        height,
        keyword,
        weight,
        description,
        type,
        url,
        target,
        imageUrl,
        isIFrame,
        status,
        adServer,
        bannerHTMLType,
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
        const bannerId = this.props.banners.list[0].id;
        if (data.placements.length > 0) {
          const arrPlacement = data.placements;
          for (let i = 0; i < arrPlacement.length; i += 1) {
            const placementId = arrPlacement[i].id;
            this.props.createPlacementBanner({ placementId, bannerId }).then(() => {
              this.props.getPlacement(this.props.placementId);
            });
          }
        }
        if (data.clickImpression.length > 0) {
          const arrClickImpressions = data.clickImpression;
          for (let j = 0; j < arrClickImpressions.length; j += 1) {
            const clickUrl = arrClickImpressions[j].clickUrl;
            const impressionUrl = arrClickImpressions[j].impressionUrl;
            this.props.createClickImpression({ clickUrl, impressionUrl, bannerId }).then(() => {
              this.props.getPlacement(this.props.placementId);
            });
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
          onClick={() => this.removeBannerToPlacement(rowData.id)}
        >
          Remove
        </Link>, cell);
        /* eslint-enable jsx-a11y/no-static-element-interactions */
      },
    }, {
      data: null,
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
