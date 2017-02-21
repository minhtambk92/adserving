import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import Link from '../../../components/Link';

class CreateZoneForm extends Component {

  static propTypes = {
    filters: PropTypes.object,
    createZone: PropTypes.func,
    sites: PropTypes.array,
    getSite: PropTypes.func,
    siteId: PropTypes.string,
    placementId: PropTypes.string,
    getPlacement: PropTypes.func,
    zones: PropTypes.array,
    getZones: PropTypes.func,
    createShare: PropTypes.func,
    zoneTypeList: PropTypes.array,
    zoneSizeTypeList: PropTypes.array,
    user: PropTypes.object,
    site: PropTypes.object,
    createActivity: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      checkTypeZone: true,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.zoneTypeList) {
      if (nextProps.zoneTypeList.length > 0) {
        this.inputZoneType.value = nextProps.zoneTypeList[0].id;
        if (nextProps.zoneTypeList[0].isSize === true) {
          this.setState({ checkTypeZone: true });
          if (nextProps.zoneSizeTypeList[0]) {
            if (this.inputZoneSize !== null && this.inputZoneHeight !== null
              && this.inputZoneWidth !== null) {
              this.inputZoneSize.value = nextProps.zoneSizeTypeList[0].id;
              this.inputZoneHeight.value = nextProps.zoneSizeTypeList[0].height;
              this.inputZoneWidth.value = nextProps.zoneSizeTypeList[0].width;
            }
          }
        } else {
          this.setState({ checkTypeZone: false });
        }
      }
    }
  }

  onKeyDown(event) { // eslint-disable-line no-unused-vars, class-methods-use-this
    this.inputZoneSize.value = 'custom';
  }

  onBlur(event) { // eslint-disable-line no-unused-vars, class-methods-use-this
    const w = this.inputZoneWidth.value.trim();
    const h = this.inputZoneHeight.value.trim();
    if (w === '') {
      this.inputZoneWidth.value = 0;
    } else if (h === '') {
      this.inputZoneHeight.value = 0;
    }
  }

  onSelectZoneType(event) { // eslint-disable-line no-unused-vars, class-methods-use-this
    const zoneTypeId = this.inputZoneType.value;
    const arrZone = _.filter(this.props.zoneTypeList, { id: zoneTypeId });
    const isSize = arrZone[0].isSize;
    if (isSize === true) {
      event.persist();
      this.setState(previousState => ({
        ...previousState,
        checkTypeZone: true,
      }));
    } else if (isSize === false) {
      event.persist();
      this.setState(previousState => ({
        ...previousState,
        checkTypeZone: false,
      }));
    }
  }

  onSelectSize(event) { // eslint-disable-line no-unused-vars, class-methods-use-this
    const sizeType = this.inputZoneSize.value;
    if (sizeType !== 'custom') {
      const arrSize = _.filter(this.props.zoneSizeTypeList, { id: sizeType });
      if (arrSize.length > 0) {
        this.inputZoneHeight.value = arrSize[0].height;
        this.inputZoneWidth.value = arrSize[0].width;
      }
    } else if (sizeType === 'custom') {
      this.inputZoneHeight.value = 0;
      this.inputZoneWidth.value = 0;
    }
  }

  clearInput() {
    this.inputZoneName.value = null;
    this.inputZoneHTML.value = null;
    this.inputZoneCSS.value = null;
    this.inputZoneSlot.value = null;
    this.inputZoneDescription.value = null;
  }

  createZone() {
    const name = this.inputZoneName.value;
    let siteId = '';
    if (this.props.siteId) {
      siteId = this.props.siteId;
    } else {
      siteId = this.inputZoneSite.value;
    }
    const zoneTypeId = this.inputZoneType.value;
    const html = this.inputZoneHTML.value;
    const css = this.inputZoneCSS.value;
    const slot = this.inputZoneSlot.value;
    let width = 0;
    let height = 0;
    let isCustomSize = false;
    let zoneSizeTypeId = null;
    const arrZone = _.filter(this.props.zoneTypeList, { id: zoneTypeId });
    const isSize = arrZone[0].isSize;

    if (this.state.checkTypeZone === true && isSize === true) {
      if (this.inputZoneSize.value === 'custom') {
        if (this.inputZoneWidth.value.trim() !== '' && this.inputZoneHeight.value.trim() !== '') {
          width = this.inputZoneWidth.value;
          height = this.inputZoneHeight.value;
        } else {
          width = 0;
          height = 0;
        }
        isCustomSize = true;
        zoneSizeTypeId = null;
      } else if (this.inputZoneSize.value !== 'custom') {
        width = this.inputZoneWidth.value;
        height = this.inputZoneHeight.value;
        isCustomSize = false;
        zoneSizeTypeId = this.inputZoneSize.value;
      }
    } else if (this.state.checkTypeZone === false && isSize === false) {
      width = 0;
      height = 0;
      isCustomSize = false;
      zoneSizeTypeId = null;
    }
    const targetIFrame = '0';
    const isShowBannerAgain = true;
    const source = '';
    const isShowCampaignAgain = true;
    const isShowTextBanner = false;
    const characterSetId = null;
    const supportThirdParty = '0';
    const isIncludeDescription = true;
    const status = this.inputZoneStatus.value;
    const description = this.inputZoneDescription.value;
    if (name && siteId) {
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
        if (this.props.zones && this.props.zones.length > 0) {
          const userId = this.props.user.id;
          const subject = `Zone ${name}`;
          const subjectId = this.props.zones[0].id;
          const action = 'created';
          const other = '';
          this.props.createActivity({ action,
            subject,
            subjectId,
            other,
            userId });
        }
        // this.clearInput();
        const zoneId = this.props.site.zones[0].id;
        const outputCss = '';
        const weight = 100;
        const classes = '';
        const type = 'single';
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
        });
        if (this.props.siteId) {
          this.props.getSite(this.props.siteId).then(() => {
            const userId = this.props.user.id;
            const subject = `Zone ${name}`;
            const subjectId = this.props.site.zones[0].id;
            const action = 'created';
            const other = '';
            this.props.createActivity({ action,
              subject,
              subjectId,
              other,
              userId });
          });
        }
      });
    }
  }

  render() {
    return (
      <form className="form-horizontal">
        <div className="box-body">
          <div className="form-group">
            <label
              htmlFor="inputZoneName"
              className="col-sm-2 control-label"
            >Name</label>
            <div className="col-sm-10">
              <input
                type="text" className="form-control" id="inputZoneName"
                placeholder="Dan Tri"
                ref={(c) => {
                  this.inputZoneName = c;
                }}
              />
            </div>
          </div>
          { this.props.siteId ? ('') : (
            <div className="form-group">
              <label
                htmlFor="inputZoneSite"
                className="col-sm-2 control-label"
              >Website</label>
              <div className="col-sm-10">
                <select
                  id="inputZoneSite"
                  className="form-control select2"
                  style={{ width: '100%' }}
                  ref={(c) => {
                    this.inputZoneSite = c;
                  }}
                >
                  {this.props.sites && this.props.sites.map(site => (
                    <option
                      key={site.id} value={site.id}
                    >{site.name} | {site.domain}</option>
                  ))}
                </select>
              </div>
            </div>
          ) }
          <div className="form-group">
            <label
              htmlFor="inputZoneType"
              className="col-sm-2 control-label"
            >Type</label>
            <div className="col-sm-10">
              <select
                id="inputZoneType"
                className="form-control"
                onChange={event => this.onSelectZoneType(event)}
                ref={(c) => {
                  this.inputZoneType = c;
                }}
              >
                {this.props.zoneTypeList && this.props.zoneTypeList.map(zoneType => (
                  <option
                    key={zoneType.id} value={zoneType.id}
                  >{zoneType.name}</option>
                ))}
              </select>
            </div>
          </div>
          { this.state.checkTypeZone === true ? (
            <div className="size">
              <div className="form-group">
                <label
                  htmlFor="inputZoneSize"
                  className="col-sm-2 control-label"
                >Size</label>
                <div className="col-sm-10">
                  <select
                    id="inputZoneSize"
                    className="form-control"
                    onChange={event => this.onSelectSize(event)}
                    ref={(c) => {
                      this.inputZoneSize = c;
                    }}
                  >
                    {this.props.zoneSizeTypeList &&
                    this.props.zoneSizeTypeList.map(zoneSizeType => (
                      <option
                        key={zoneSizeType.id} value={zoneSizeType.id}
                      >{zoneSizeType.name} ({zoneSizeType.width}x{zoneSizeType.height}) </option>
                    ))}
                    <option value="custom">Custom</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label
                  htmlFor="inputZoneSize"
                  className="col-sm-2 control-label"
                >&nbsp;</label>
                <div className="col-sm-10">
                  <div className="row">
                    <div className="col-sm-6">
                      <label
                        htmlFor="inputZoneWidth"
                        className="col-sm-4 control-label"
                      >Width</label>
                      <div className="col-sm-8">
                        <input
                          type="number" className="form-control" id="inputZoneWidth"
                          defaultValue="468"
                          onKeyDown={event => this.onKeyDown(event)}
                          onBlur={event => this.onBlur(event)}
                          placeholder="300"
                          ref={(c) => {
                            this.inputZoneWidth = c;
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <label
                        htmlFor="inputZoneHeight"
                        className="col-sm-4 control-label"
                      >Height</label>
                      <div className="col-sm-8">
                        <input
                          type="number" className="form-control" id="inputZoneHeight"
                          defaultValue="60"
                          onKeyDown={event => this.onKeyDown(event)}
                          onBlur={event => this.onBlur(event)}
                          placeholder="300"
                          ref={(c) => {
                            this.inputZoneHeight = c;
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : ('') }
          <div className="form-group">
            <label
              htmlFor="inputZoneHTML"
              className="col-sm-2 control-label"
            >HTML</label>
            <div className="col-sm-10">
              <textarea
                className="form-control" id="inputZoneHTML"
                rows="5" placeholder="More info..."
                ref={(c) => {
                  this.inputZoneHTML = c;
                }}
              />
            </div>
          </div>
          <div className="form-group">
            <label
              htmlFor="inputZoneCSS"
              className="col-sm-2 control-label"
            >CSS</label>
            <div className="col-sm-10">
              <textarea
                className="form-control" id="inputZoneCSS"
                rows="5" placeholder="More info..."
                ref={(c) => {
                  this.inputZoneCSS = c;
                }}
              />
            </div>
          </div>
          <div className="form-group">
            <label
              htmlFor="inputZoneSlot"
              className="col-sm-2 control-label"
            >Slot</label>
            <div className="col-sm-10">
              <select
                id="inputZoneSlot"
                className="form-control"
                ref={(c) => {
                  this.inputZoneSlot = c;
                }}
              >
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
                <option value="16">16</option>
                <option value="17">17</option>
                <option value="18">18</option>
                <option value="19">19</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label
              htmlFor="inputZoneStatus"
              className="col-sm-2 control-label"
            >Status</label>
            <div className="col-sm-10">
              <select
                id="inputZoneStatus" className="form-control"
                ref={(c) => {
                  this.inputZoneStatus = c;
                }}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label
              htmlFor="inputZoneDescription"
              className="col-sm-2 control-label"
            >Description</label>
            <div className="col-sm-10">
              <textarea
                className="form-control" id="inputZoneDescription"
                rows="5" placeholder="More info..."
                ref={(c) => {
                  this.inputZoneDescription = c;
                }}
              />
            </div>
          </div>
        </div>
        {/* /.box-body */}
        <div className="box-footer">
          <Link
            to="#"
            className="btn btn-app pull-right"
            onClick={event => this.clearInput(event)}
          ><i className="fa fa-eraser" /> Clear</Link>
          <Link
            to="#"
            className="btn btn-app pull-right"
            onClick={event => this.createZone(event)}
          ><i className="fa fa-check" /> Confirm</Link>
        </div>
        {/* /.box-footer */}
      </form>
    );
  }
}

export default CreateZoneForm;
