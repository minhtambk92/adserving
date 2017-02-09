import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import moment from 'moment';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from 'react-dropzone-component/styles/filepicker.css';
import dropZoneStyle from 'dropzone/dist/min/dropzone.min.css';
import DropzoneComponent from 'react-dropzone-component/lib/react-dropzone';
import { InputTags, ICheck } from '../../../components/UI';
import Link from '../../../components/Link';

class CreateBannerForm extends Component {

  static propTypes = {
    filters: PropTypes.object,
    createBanner: PropTypes.func,
    channels: PropTypes.array,
    placementId: PropTypes.string,
    updatePlacement: PropTypes.func,
    placement: PropTypes.object,
    bannerHtmlTypeList: PropTypes.array,
    getPlacement: PropTypes.func,
    banners: PropTypes.array,
    bannerTypeList: PropTypes.array,
    getBannerTypes: PropTypes.func,
    getBanners: PropTypes.func,
    adsServerList: PropTypes.array,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      checkIsUpload: false,
      imageUrl: '',
      tags: '',
    };

    this.djsConfig = {
      acceptedFiles: 'image/jpeg,image/png,image/gif',
      addRemoveLinks: true,
      maxFiles: 1,
    };

    this.componentConfig = {
      iconFiletypes: ['.jpg', '.png', '.gif'],
      showFiletypeIcon: true,
      postUrl: '/upload-banner',
    };

    this.callbackFail = 'fail';

    // Simple callbacks work too, of course
    this.callback = (e) => {
      if (e.xhr.response) {
        this.state.imageUrl = e.xhr.response;
      }
    };

    this.eventHandlers = {
      drop: this.callbackFail,
      success: this.callback,
    };
  }


  componentDidMount() {
    /* eslint-disable no-undef */
    $('#inputBannerIsIFrame').iCheck('check');
    /* eslint-enable no-undef */
  }

  onInputChange(event) {
    const typeId = event.target.value.trim();
    const type = _.filter(this.props.bannerTypeList, { id: typeId });
    const isUpload = type[0].isUpload;
    this.setState((previousState) => ({
      ...previousState,
      checkIsUpload: isUpload,
    }));
  }

  clearInput() {
    this.inputBannerName.value = null;
    if (this.state.checkIsUpload === false) {
      this.inputBannerHTML.value = null;
    } else if (this.state.checkIsUpload === true) {
      this.inputBannerUrl.value = null;
    }
    this.inputBannerWidth.value = null;
    this.inputBannerHeight.value = null;
    document.getElementById('inputBannerKeyWord').value = null;
    this.inputBannerWeight.value = null;
    this.inputBannerDescription.value = null;
  }

  createBanner() {
    const name = this.inputBannerName.value;
    const width = this.inputBannerWidth.value;
    const height = this.inputBannerHeight.value;
    const weight = this.inputBannerWeight.value;
    const description = this.inputBannerDescription.value;
    const channelId = this.inputChannelId.value;
    const isIFrame = document.getElementById('inputBannerIsIFrame').checked;
    let target = '';
    let url = '';
    let imageUrl = '';
    let html = '';
    let bannerHtmlTypeId = null;
    let adsServerId = null;
    const bannerTypeId = this.inputBannerType.value;
    const type = _.filter(this.props.bannerTypeList, { id: bannerTypeId });
    const isUpload = type[0].isUpload;
    if (isUpload === false) {
      html = this.inputBannerHTML.value;
      target = '';
      url = '';
      imageUrl = '';
      bannerHtmlTypeId = this.inputBannerHtmlType.value;
      adsServerId = this.inputBannerAdsServer.value;
    } else if (isUpload === true) {
      target = this.inputBannerTarget.value;
      html = '';
      url = this.inputBannerUrl.value;
      imageUrl = this.state.imageUrl;
      bannerHtmlTypeId = null;
      adsServerId = null;
    }
    const status = this.inputBannerStatus.value;
    const keyword = document.getElementById('inputBannerKeyWord').value;
    const isCountView = true;
    const isFixIE = false;
    const isDefault = false;
    const isRelative = false;
    const adStore = '';
    const impressionsBooked = -1;
    const clicksBooked = -1;
    const activationDate = new Date(moment().format('YYYY-MM-DD 00:00:00'));
    const expirationDate = null;
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
        this.clearInput();
        if (this.props.placementId && this.props.placement) {
          if (this.props.banners) {
            const banner = this.props.placement.banners;
            banner.push(this.props.banners[0]);
            const placement = this.props.placement;
            placement.banners = JSON.stringify(banner.map(b => ({
              id: b.id,
              name: b.name,
              with: b.width,
              height: b.height,
              weight: b.weight,
              isDeleted: false,
            })));
            this.props.updatePlacement(placement).then(() => {
              this.props.getPlacement(this.props.placementId);
            });
          }
        }
      });
    }
  }

  render() {
    return (
      <form className="form-horizontal">
        <div className="box-body">
          {/* type */}
          <div className="form-group">
            <label
              htmlFor="inputBannerType"
              className="col-sm-2 control-label"
            >Type</label>
            <div className="col-sm-10">
              <select
                id="inputBannerType" className="form-control"
                ref={c => {
                  this.inputBannerType = c;
                }}
                onChange={event => this.onInputChange(event)}
              >
                {this.props.bannerTypeList
                && this.props.bannerTypeList.map(bannerType => (
                  <option
                    key={bannerType.id} value={bannerType.id}
                  >
                    Banner {bannerType.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* name */}
          <div className="form-group">
            <label
              htmlFor="inputBannerName"
              className="col-sm-2 control-label"
            >Name</label>
            <div className="col-sm-10">
              <input
                type="text" className="form-control" id="inputBannerName"
                placeholder="Dan Tri"
                ref={c => {
                  this.inputBannerName = c;
                }}
              />
            </div>
          </div>
          {
            this.state.checkIsUpload === false ?
              (
                <div className="banneHtml">
                  <div className="form-group">
                    <label
                      htmlFor="inputBannerHTML"
                      className="col-sm-2 control-label"
                    >HTML</label>
                    <div className="col-sm-10">
                      <textarea
                        className="form-control" id="inputBannerHTML"
                        rows="5" placeholder="More info..."
                        ref={c => {
                          this.inputBannerHTML = c;
                        }}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="inputBannerAdsServer"
                      className="col-sm-2 control-label"
                    >Alter HTML to enable click tracking for</label>
                    <div className="col-sm-10">
                      <select
                        id="inputBannerAdsServer" className="form-control"
                        ref={c => {
                          this.inputBannerAdsServer = c;
                        }}
                      >
                        {this.props.adsServerList
                        && this.props.adsServerList.map(adsServer => (
                          <option
                            key={adsServer.id} value={adsServer.id}
                          >
                            Rich Media - {adsServer.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="inputBannerHtmlType"
                      className="col-sm-2 control-label"
                    >Type Banner HTML</label>
                    <div className="col-sm-10">
                      <select
                        id="inputBannerHtmlType" className="form-control"
                        ref={c => {
                          this.inputBannerHtmlType = c;
                        }}
                      >
                        {this.props.bannerHtmlTypeList
                        && this.props.bannerHtmlTypeList.map(bannerHtmlType => (
                          <option
                            key={bannerHtmlType.id} value={bannerHtmlType.id}
                          >
                            {bannerHtmlType.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bannerImage">
                  <div className="form-group">
                    <label htmlFor="inputBannerImage" className="col-sm-2 control-label">
                    Banner
                  </label>
                    <div className="col-sm-10">
                      <DropzoneComponent
                        config={this.componentConfig}
                        eventHandlers={this.eventHandlers}
                        djsConfig={this.djsConfig}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="inputBannerUrl"
                      className="col-sm-2 control-label"
                    >Url</label>
                    <div className="col-sm-10">
                      <input
                        type="text" className="form-control" id="inputBannerUrl"
                        placeholder="http://kenh14.vn"
                        ref={c => {
                          this.inputBannerUrl = c;
                        }}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="inputBannerTarget"
                      className="col-sm-2 control-label"
                    >Target</label>
                    <div className="col-sm-10">
                      <select
                        id="inputBannerTarget" className="form-control"
                        ref={c => {
                          this.inputBannerTarget = c;
                        }}
                      >
                        <option value="_blank">_BLANK</option>
                        <option value="_self">_SELF</option>
                        <option value="_parent">_PARENT</option>
                        <option value="_top">_TOP</option>
                      </select>
                    </div>
                  </div>
                </div>
            )
          }
          <div className="form-group">
            <label
              htmlFor="inputBannerSlot"
              className="col-sm-2 control-label"
            >Width(px)</label>
            <div className="col-sm-10">
              <input
                type="number" className="form-control" id="inputBannerWidth"
                placeholder="300"
                ref={c => {
                  this.inputBannerWidth = c;
                }}
              />
            </div>
          </div>
          <div className="form-group">
            <label
              htmlFor="inputBannerSlot"
              className="col-sm-2 control-label"
            >Height(px)</label>
            <div className="col-sm-10">
              <input
                type="number" className="form-control" id="inputBannerHeight"
                placeholder="300"
                ref={c => {
                  this.inputBannerHeight = c;
                }}
              />
            </div>
          </div>
          <div className="form-group">
            <label
              htmlFor="inputBannerKeyWord"
              className="col-sm-2 control-label"
            >KeyWord</label>
            <div className="col-sm-10">
              {/* /.InputTas */}
              <InputTags
                type="text"
                id="inputBannerKeyWord"
                className="form-control"
                placeholder="dantri"
                data={this.state.tags}
              />
            </div>
          </div>
          <div className="form-group">
            <label
              htmlFor="inputBannerWeight"
              className="col-sm-2 control-label"
            >Weight</label>
            <div className="col-sm-10">
              <input
                type="number" className="form-control"
                id="inputBannerWeight" placeholder="1"
                ref={c => {
                  this.inputBannerWeight = c;
                }}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="inputChannelId" className="col-sm-2 control-label">Channel</label>
            <div className="col-sm-10">
              <select
                id="inputChannelId" className="form-control"
                ref={c => {
                  this.inputChannelId = c;
                }}
              >
                {this.props.channels
                && this.props.channels.map(channel => (
                  <option
                    key={channel.id} value={channel.id}
                  >
                    {channel.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label
              htmlFor="inputBannerIsIFrame"
              className="col-sm-2 control-label"
            >User IFrame</label>
            <div className="col-sm-10 checkbox">
              <ICheck
                type="checkbox" id="inputBannerIsIFrame" className="form-control"
                ref={c => {
                  this.inputBannerIsIFrame = c;
                }}
              />
            </div>
          </div>
          <div className="form-group">
            <label
              htmlFor="inputBannerStatus"
              className="col-sm-2 control-label"
            >Status</label>
            <div className="col-sm-10">
              <select
                id="inputBannerStatus" className="form-control"
                ref={c => {
                  this.inputBannerStatus = c;
                }}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label
              htmlFor="inputBannerDescription"
              className="col-sm-2 control-label"
            >Description</label>
            <div className="col-sm-10">
              <textarea
                className="form-control" id="inputBannerDescription"
                rows="5" placeholder="More info..."
                ref={c => {
                  this.inputBannerDescription = c;
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
            onClick={event => this.createBanner(event)}
          ><i className="fa fa-check" /> Confirm</Link>
        </div>
        {/* /.box-footer */}
      </form>
    );
  }
}

export default withStyles(style, dropZoneStyle)(CreateBannerForm);
