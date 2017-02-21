/**
 * Created by manhhailua on 1/9/17.
 */

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Link from '../../../components/Link';
import { DataTables, ICheck } from '../../../components/UI/';

class ZoneList extends Component {

  static propTypes = {
    list: PropTypes.array,
    setPageZoneActiveTab: PropTypes.func,
    createZone: PropTypes.func,
    createShare: PropTypes.func,
    zones: PropTypes.object,
    shares: PropTypes.object,
    user: PropTypes.object,
    createActivity: PropTypes.func,
  };

  onTabClickZone(event) {
    event.persist();
    this.props.setPageZoneActiveTab('editZone');
  }

  onTabClickSettingZone(event) {
    event.persist();
    this.props.setPageZoneActiveTab('settingZone');
  }

  onTabClickShareZone(event) {
    event.persist();
    this.props.setPageZoneActiveTab('shareZone');
  }

  duplicateZoneAndShare(data) {
    const name = `Copy Of ${data.name}`;
    const siteId = data.siteId;
    let zoneTypeId = null;
    if (data.zoneType) {
      zoneTypeId = data.zoneType.id;
    } else {
      zoneTypeId = null;
    }

    let zoneSizeTypeId = null;
    if (data.zoneSizeType) {
      zoneSizeTypeId = data.zoneSizeType.id;
    } else {
      zoneSizeTypeId = null;
    }
    const html = data.html;
    const css = data.css;
    const slot = data.slot;
    const width = data.width;
    const height = data.height;
    const targetIFrame = data.targetIFrame;
    const isShowBannerAgain = data.isShowBannerAgain;
    const source = data.source;
    const isShowCampaignAgain = data.isShowCampaignAgain;
    const isShowTextBanner = data.isShowTextBanner;
    const characterSetId = data.characterSetId;
    const supportThirdParty = data.supportThirdParty;
    const isIncludeDescription = data.isIncludeDescription;
    const isCustomSize = data.isCustomSize;
    const status = data.status;
    const description = data.description;

    if (name && siteId && zoneTypeId && description && slot) {
      this.props.createZone({
        name,
        siteId,
        zoneTypeId,
        zoneSizeTypeId,
        html,
        css,
        slot,
        width,
        height,
        targetIFrame,
        isShowBannerAgain,
        source,
        isShowCampaignAgain,
        isShowTextBanner,
        characterSetId,
        supportThirdParty,
        isIncludeDescription,
        isCustomSize,
        status,
        description,
      }).then(() => {
        if (this.props.list && this.props.list.length > 0) {
          const userId = this.props.user.id;
          const subject = `Zone ${data.name}`;
          const subjectId = this.props.list[0].id;
          const action = 'duplicated';
          const other = JSON.stringify(data);
          this.props.createActivity({ action,
            subject,
            subjectId,
            other,
            userId });
        }
        const zoneId = this.props.zones.list[0].id;
        const arrShares = data.shares;
        for (let i = 0; i < arrShares.length; i += 1) {
          /* eslint-disable no-shadow */
          const name = arrShares[i].name;
          const css = arrShares[i].css;
          const outputCss = '';
          const html = arrShares[i].html;
          const width = arrShares[i].width;
          const height = arrShares[i].height;
          const weight = arrShares[i].weight;
          const classes = arrShares[i].classes;
          const type = arrShares[i].type;
          const description = arrShares[i].description;
          /* eslint-enable no-shadow */
          if (name) {
            this.props.createShare({
              name,
              html,
              css,
              outputCss,
              width,
              height,
              weight,
              classes,
              type,
              description,
              zoneId,
            }).then(() => {
              if (this.props.shares && this.props.shares.list.length > 0) {
                const userId = this.props.user.id;
                const subject = `Share ${name}`;
                const subjectId = this.props.shares.list[0].id;
                const action = 'created';
                const other = JSON.stringify(this.props.shares.list[0]);
                this.props.createActivity({ action,
                  subject,
                  subjectId,
                  other,
                  userId });
              }
            });
          }
        }
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
            className="inputChooseZone"
            name="inputChooseZone[]"
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
          onClick={(event) => this.onTabClickZone(event)}
        >{cellData}</Link>, cell);
      },
    }, {
      data: null,
      render: (data, type, row) => {
        let t = '';
        if (row.zoneType) {
          if (row.zoneType.isSize === true) {
            if (row.isCustomSize === true) {
              t = `Custom (${row.width} x ${row.height})`;
            } else if (row.isCustomSize === false) {
              t = row.zoneSizeType.name;
            }
          } else if (row.zoneType.isSize === false) {
            t = `Custom (${row.zoneType.name})`;
          }
        }
        return t;
      },
    }, {
      data: null,
      orderable: false,
      createdCell: (cell, cellData, rowData) => {
        ReactDOM.render(<Link
          to={`/resource/zone/${rowData.id}`}
          onClick={(event) => this.onTabClickShareZone(event)}
        >Shares</Link>, cell);
      },
    }, {
      data: null,
      orderable: false,
      createdCell: (cell, cellData, rowData) => {
        ReactDOM.render(<Link
          to={`/resource/zone/${rowData.id}`}
          onClick={(event) => this.onTabClickSettingZone(event)}
        >Settings</Link>, cell);
      },
    }, {
      data: null,
      orderable: false,
      createdCell: (cell, cellData, rowData) => {
        ReactDOM.render(<Link
          to="#"
          onClick={() => this.duplicateZoneAndShare(rowData)}
        >Duplicate</Link>, cell);
      },
    }];
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
            <th><ICheck type="checkbox" className="inputChooseAllZones" /></th>
            <th>Name</th>
            <th>Type</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
          </tr>
        )}
        tfoot={(
          <tr>
            <th><ICheck type="checkbox" className="inputChooseAllZones" /></th>
            <th>Name</th>
            <th>Type</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
          </tr>
        )}
      />
    );
  }
}

export default ZoneList;
