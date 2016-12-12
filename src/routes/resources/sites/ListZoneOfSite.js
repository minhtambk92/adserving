import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Link from '../../../components/Link';
import { DataTables, ICheck } from '../../../components/UI/';

class ListZoneOfSite extends Component {

  static propTypes = {
    list: PropTypes.array,
    setPageZoneActiveTab: PropTypes.func,
    createZone: PropTypes.func,
    createShare: PropTypes.func,
    zones: PropTypes.object,
    getSite: PropTypes.func,
    siteId: PropTypes.string,
  };

  onTabClickEditZone(event) {
    event.persist();
    this.props.setPageZoneActiveTab('editZone');
  }

  onTabClickAddPlacement(event) {
    event.persist();
    this.props.setPageZoneActiveTab('addPlacement');
  }

  duplicateZoneInSite(data) {
    const name = `Copy Of ${data.name}`;
    const siteId = data.siteId;
    const type = data.type;
    const html = data.html;
    const css = data.css;
    const slot = data.slot;
    const width = data.width;
    const height = data.height;
    const sizeText = data.sizeText;
    const sizeValue = data.sizeValue;
    const delivery = data.delivery;
    const targetIFrame = data.targetIFrame;
    const isShowBannerAgain = data.isShowBannerAgain;
    const source = data.source;
    const isShowCampaignAgain = data.isShowCampaignAgain;
    const isShowTextBanner = data.isShowTextBanner;
    const characterSet = data.characterSet;
    const supportThirdParty = data.supportThirdParty;
    const isIncludeDescription = data.isIncludeDescription;
    const status = data.status;
    const description = data.description;
    if (name && siteId && type && description && slot) {
      this.props.createZone({
        name,
        siteId,
        type,
        html,
        css,
        slot,
        width,
        height,
        sizeText,
        sizeValue,
        delivery,
        targetIFrame,
        isShowBannerAgain,
        source,
        isShowCampaignAgain,
        isShowTextBanner,
        characterSet,
        supportThirdParty,
        isIncludeDescription,
        status,
        description,
      }).then(() => {
        const zoneId = this.props.zones.list[0].id;
        if (data.shares.length > 0) {
          const arrShares = data.shares;
          for (let i = 0; i < arrShares.length; i += 1) {
            /* eslint-disable no-shadow */
            const name = arrShares[i].name;
            const css = arrShares[i].css;
            const html = arrShares[i].html;
            const description = arrShares[i].description;
            /* eslint-enable no-shadow */
            if (name && css && html) {
              this.props.createShare({ name, html, css, description, zoneId });
            }
          }
        }
        this.props.getSite(this.props.siteId);
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
            className="inputChooseSite"
            name="inputChooseSite[]"
            value={cellData}
          />,
          cell,
        );
      },
    }, {
      data: 'name',
      createdCell: (cell, cellData, rowData) => {
        ReactDOM.render(<Link
          to={`/resource/zone/${rowData.id}`}
          onClick={(event) => this.onTabClickEditZone(event)}
        >{rowData.name}</Link>, cell);
      },
    }, {
      data: 'sizeText',
    }, {
      data: null,
      orderable: false,
      createdCell: (cell, cellData, rowData) => {
        /* eslint-disable jsx-a11y/no-static-element-interactions */
        ReactDOM.render(<Link
          to={`/resource/zone/${rowData.id}`}
          onClick={(event) => this.onTabClickAddPlacement(event)}
        >Add Placement</Link>, cell);
        /* eslint-enable jsx-a11y/no-static-element-interactions */
      },
    }, {
      data: null,
      orderable: false,
      createdCell: (cell, cellData, rowData) => {
        /* eslint-disable jsx-a11y/no-static-element-interactions */
        ReactDOM.render(<Link
          to="#"
          onClick={() => this.duplicateZoneInSite(rowData)}
        >Duplicate</Link>, cell);
        /* eslint-enable jsx-a11y/no-static-element-interactions */
      },
    }];
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
            <th><ICheck type="checkbox" className="inputChooseAllSites" /></th>
            <th>Name</th>
            <th>Size(px)</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
          </tr>
        )}
        tfoot={(
          <tr>
            <th><ICheck type="checkbox" className="inputChooseAllSites" /></th>
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

export default ListZoneOfSite;
