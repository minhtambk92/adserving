import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import Link from '../../../components/Link';

class UpdateZoneForm extends Component {

  static propTypes = {
    zoneId: PropTypes.string.isRequired,
    updateZone: PropTypes.func,
    zone: PropTypes.object,
    deleteZone: PropTypes.func,
    sites: PropTypes.array,
    getZone: PropTypes.func,
    removeZone: PropTypes.func,
    removeShareByZoneId: PropTypes.func,
    setPageZoneActiveTab: PropTypes.func,
    zoneTypeList: PropTypes.array,
    zoneSizeTypeList: PropTypes.array,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      checkTypeZone: true,
    };
  }

  componentWillReceiveProps(nextProps) {
    const {
      siteId,
      name,
      description,
      zoneType,
      zoneSizeType,
      html,
      css,
      slot,
      width,
      height,
      isCustomSize,
      status,
    } = nextProps.zone && (nextProps.zone || {});

    this.inputZoneSite.value = siteId;
    this.inputZoneName.value = name;
    if (zoneType) {
      this.inputZoneType.value = zoneType.id;
    }
    this.inputZoneHtml.value = html;
    this.inputZoneCss.value = css;
    this.inputZoneSlot.value = slot;
    this.inputZoneStatus.value = status;
    this.inputZoneDescription.value = description;
    if (zoneType) {
      if (zoneType.isSize === true) {
        this.setState({ checkTypeZone: true });
        if (width) {
          this.inputZoneWidth.value = width;
        }
        if (height) {
          this.inputZoneHeight.value = height;
        }

        if (isCustomSize === true) {
          this.inputZoneSize.value = 'custom';
        } else if (isCustomSize === false) {
          if (zoneSizeType) {
            this.inputZoneSize.value = zoneSizeType.id;
          }
        }
      } else if (zoneType.isSize === false) {
        this.setState({ checkTypeZone: false });
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
      this.setState((previousState) => ({
        ...previousState,
        checkTypeZone: true,
      }));
    } else if (isSize === false) {
      event.persist();
      this.setState((previousState) => ({
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

  updateZone() {
    const siteId = this.inputZoneSite.value;
    const name = this.inputZoneName.value;
    const zoneTypeId = this.inputZoneType.value;
    const html = this.inputZoneHtml.value;
    const css = this.inputZoneCss.value;
    const slot = this.inputZoneSlot.value;
    const status = this.inputZoneStatus.value;
    const description = this.inputZoneDescription.value;
    let height = 0;
    let width = 0;
    let isCustomSize = false;
    let zoneSizeTypeId = null;

    const zone = { id: this.props.zoneId };

    if (siteId && siteId !== this.props.zone.siteId) {
      zone.siteId = siteId;
    }

    if (name && name !== this.props.zone.name) {
      zone.name = name;
    }

    if (zoneTypeId && zoneTypeId !== this.props.zone.zoneType.id) {
      zone.zoneTypeId = zoneTypeId;
    }

    if (html && html !== this.props.zone.html) {
      zone.html = html;
    }

    if (css && css !== this.props.zone.css) {
      zone.css = css;
    }

    if (slot && slot !== this.props.zone.slot) {
      zone.slot = slot;
    }

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
    if (width && width !== this.props.zone.width) {
      zone.width = width;
    }
    if (height && height !== this.props.zone.height) {
      zone.height = height;
    }

    if (status && status !== this.props.zone.status) {
      zone.status = status;
    }

    if (description && description !== this.props.zone.description) {
      zone.description = description;
    }
    zone.isCustomSize = isCustomSize;
    zone.zoneSizeTypeId = zoneSizeTypeId;

    this.props.updateZone(zone).then(() => {
      this.props.getZone(this.props.zoneId);
      this.props.setPageZoneActiveTab('editZone');
    });
  }

  deleteZone() {
    this.props.deleteZone(this.props.zoneId);
  }

  render() {
    return (
      <form className="form-horizontal">
        <div className="form-group">
          <label
            htmlFor="inputZoneName"
            className="col-sm-2 control-label"
          >Name</label>
          <div className="col-sm-10">
            <input
              type="text" className="form-control" id="inputZoneName"
              placeholder="Dan Tri"
              ref={c => {
                this.inputZoneName = c;
              }}
            />
          </div>
        </div>
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
              ref={c => {
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
              ref={c => {
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
                  ref={c => {
                    this.inputZoneSize = c;
                  }}
                >
                  {this.props.zoneSizeTypeList && this.props.zoneSizeTypeList.map(zoneSizeType => (
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
                        ref={c => {
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
                        ref={c => {
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
            htmlFor="inputZoneHtml"
            className="col-sm-2 control-label"
          >HTML</label>
          <div className="col-sm-10">
            <textarea
              className="form-control" id="inputZoneHtml"
              rows="5" placeholder="More info..."
              ref={c => {
                this.inputZoneHtml = c;
              }}
            />
          </div>
        </div>
        <div className="form-group">
          <label
            htmlFor="inputZoneCss"
            className="col-sm-2 control-label"
          >CSS</label>
          <div className="col-sm-10">
            <textarea
              className="form-control" id="inputZoneCss"
              rows="5" placeholder="More info..."
              ref={c => {
                this.inputZoneCss = c;
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
              ref={c => {
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
              ref={c => {
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
              ref={c => {
                this.inputZoneDescription = c;
              }}
            />

          </div>
        </div>

        <hr />

        <div className="clearfix">
          <Link
            to="/resource/zone"
            className="btn btn-app pull-right"
          >
            <i className="fa fa-undo" />
            Cancel
          </Link>
          <Link
            to="/resource/zone"
            className="btn btn-app pull-right"
            onClick={event => this.deleteZone(event)}
          >
            <i className="fa fa-trash-o" />
            Delete
          </Link>
          <Link
            to="#"
            className="btn btn-app pull-right"
            onClick={event => this.updateZone(event)}
          ><i className="fa fa-floppy-o" /> Save</Link>
        </div>
      </form>
    );
  }
}

export default UpdateZoneForm;
