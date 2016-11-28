import React, { Component, PropTypes } from 'react';
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
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      checkTypeBanner: 'html',
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
    event.persist();
    this.setState((previousState) => ({
      ...previousState,
      checkTypeBanner: event.target.value.trim(),
    }));
  }

  clearInput() {
    this.inputBannerName.value = null;
    if (this.state.checkTypeBanner === 'html') {
      this.inputBannerHTML.value = null;
    } else if (this.state.checkTypeBanner === 'img') {
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
    const type = this.inputBannerType.value;
    const isIFrame = document.getElementById('inputBannerIsIFrame').checked;
    let target = '';
    let url = '';
    let imageUrl = '';
    let html = '';
    let bannerHTMLType = '';
    let adServer = '';
    if (type === 'html') {
      html = this.inputBannerHTML.value;
      target = '';
      url = '';
      imageUrl = '';
      bannerHTMLType = this.inputBannerHTMLType.value;
      adServer = this.inputBannerAdServer.value;
    } else if (type === 'img') {
      target = this.inputBannerTarget.value;
      html = '';
      url = this.inputBannerUrl.value;
      imageUrl = this.state.imageUrl;
      bannerHTMLType = '';
      adServer = '';
    }
    const status = this.inputBannerStatus.value;
    const keyword = document.getElementById('inputBannerKeyWord').value;
    const isCountView = true;
    const isFixIE = false;
    const isDefault = false;
    const isRelative = false;
    const isImpressionsBooked = true;
    const isClicksBooked = true;
    const activationDate = true;
    const expirationDate = true;
    const adStore = '';
    const impressionsBooked = 'unlimited';
    const clicksBooked = 'unlimited';
    const activationDateValue = new Date(moment().format('YYYY-MM-DD 00:00:00'));
    const expirationDateValue = new Date(moment(new Date('12-12-2117')).format('YYYY-MM-DD 00:00:00'));
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
        activationDate,
        expirationDate,
        adStore,
        impressionsBooked,
        clicksBooked,
        activationDateValue,
        expirationDateValue,
        channelId,
      }).then(() => {
        this.clearInput();
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
                <option value="html">Banner HTML</option>
                <option value="img">Banner Upload</option>
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
            this.state.checkTypeBanner === 'html' ?
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
                      htmlFor="inputBannerAdServer"
                      className="col-sm-2 control-label"
                    >Alter HTML to enable click tracking for</label>
                    <div className="col-sm-10">
                      <select
                        id="inputBannerAdServer" className="form-control"
                        ref={c => {
                          this.inputBannerAdServer = c;
                        }}
                      >
                        <option value="">Generic HTML Banner</option>
                        <option value="adtech">Rich Media - adtech</option>
                        <option value="atlas">Rich Media - Atlas</option>
                        <option value="bluestreak">Rich Media - Bluestreak</option>
                        <option value="cpx">Rich Media - CPX</option>
                        <option value="doubleclick">Rich Media - Doubleclick</option>
                        <option value="eyeblaster">Rich Media - Eyeblaster</option>
                        <option value="falk">Rich Media - Falk</option>
                        <option value="google">Rich Media - Google AdSense</option>
                        <option value="kontera">Rich Media - Kontera</option>
                        <option value="max">Rich Media - OpenX</option>
                        <option value="mediaplex">Rich Media - Mediaplex</option>
                        <option value="tangozebra">Rich Media - Tango Zebra</option>
                        <option value="tradedoubler">Rich Media - Trade Doubler</option>
                        <option value="ypn">Rich Media - Yahoo! Publisher Network</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="inputBannerHTMLType"
                      className="col-sm-2 control-label"
                    >Type Banner HTML</label>
                    <div className="col-sm-10">
                      <select
                        id="inputBannerHTMLType" className="form-control"
                        ref={c => {
                          this.inputBannerHTMLType = c;
                        }}
                      >
                        <option value="0">Generic HTML</option>
                        <option value="18">ADN Code</option>
                        <option value="13">Balloon Classic Code</option>
                        <option value="9">Balloon Plus Code</option>
                        <option value="7">Box-App CPD Code</option>
                        <option value="4">Box-App CPM Booking 300x600</option>
                        <option value="12">Box-App CPM 300x250 Code</option>
                        <option value="6">Box-App CPM 300x385 Code</option>
                        <option value="5">CPC Admarket Code</option>
                        <option value="10">CPC PLUS Code</option>
                        <option value="11">CPM Admarket Code</option>
                        <option value="8">CPM 7K Code hoặc Banner CPM Bám biên phải</option>
                        <option value="14">Google Adsense Code</option>
                        <option value="15">Sponsor Code</option>
                        <option value="16">Retargeting Banner</option>
                        <option value="17">Banner TVC Sticky</option>
                        <option value="30">Banner CPM Kingsize</option>
                        <option value="33">Banner popup CPC</option>
                        <option value="35">Banner King size chạy merge</option>
                        <option value="36">Banner chạy kèm kingsize 300x600 vị trí dưới</option>
                        <option value="99">PR Tracking</option>
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
            <div className="col-sm-10">
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
