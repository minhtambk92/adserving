import React, { Component, PropTypes } from 'react';
import DropzoneComponent from 'react-dropzone-component/lib/react-dropzone';
import { InputTags, ICheck } from '../../../components/UI';
import Link from '../../../components/Link';

class UpdateBannerForm extends Component {

  static propTypes = {
    bannerId: PropTypes.string.isRequired,
    updateBanner: PropTypes.func,
    banner: PropTypes.object,
    deleteBanner: PropTypes.func,
    getBanner: PropTypes.func,
    removeBanner: PropTypes.func,
    bannerHtmlTypeList: PropTypes.array,
    channels: PropTypes.array,
    bannerTypeList: PropTypes.array,
    bannerTypes: PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      checkTypeBanner: 'img',
      imageUrl: '',
      keyWord: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    const {
      name,
      html,
      width,
      height,
      keyword,
      weight,
      description,
      url,
      target,
      bannerType,
      imageUrl,
      isIFrame,
      status,
      adServer,
      bannerHtmlTypeId,
      channelId,
    } = nextProps.banner && (nextProps.banner || {});
    this.state.keyWord = keyword;
    this.inputBannerName.value = name;
    if (width) {
      this.inputBannerWidth.value = width;
    }
    if (height) {
      this.inputBannerHeight.value = height;
    }
    if (weight) {
      this.inputBannerWeight.value = weight;
    }
    this.inputBannerDescription.value = description;
    this.inputBannerStatus.value = status;
    this.inputChannelId.value = channelId;
    this.inputBannerIsIFrame.value = isIFrame;
    if (bannerType) {
      const type = bannerType.value;
      if (type === 'html') {
        if (isIFrame === true) {
          this.insertBannerHtml(html, width, height);
        } else {
          document.getElementById('banner').innerHTML = '';
        }
        if (this.inputBannerHTML !== undefined && this.inputBannerHtmlType.value !== undefined &&
          this.inputBannerHtmlType.value !== undefined) {
          this.state.checkTypeBanner = 'html';
          this.state.imageUrl = '';
          this.inputBannerHTML.value = html;
          this.inputBannerAdServer.value = adServer;
          this.inputBannerHtmlType.value = bannerHtmlTypeId;
        }
      } else if (type === 'img') {
        this.state.imageUrl = imageUrl;
        this.state.checkTypeBanner = 'img';
        if (this.inputBannerImageUrl !== undefined && this.inputBannerTarget !== undefined
          && this.inputBannerUrl !== undefined) {
          this.inputBannerTarget.value = target;
          this.inputBannerUrl.value = url;
          this.inputBannerImageUrl.value = imageUrl;
        }
      }
    }
  }

  componentDidUpdate() {
    /* eslint-disable no-undef */
    if (this.props.banner) {
      if (this.props.banner.isIFrame === true) {
        $('#inputBannerIsIFrame').iCheck('check');
      } else {
        $('#inputBannerIsIFrame').iCheck('uncheck');
      }
    }
    /* eslint-enable no-undef */
  }

  updateBanner() {
    const name = this.inputBannerName.value;
    const width = this.inputBannerWidth.value;
    const height = this.inputBannerHeight.value;
    const keyword = document.getElementById('inputBannerKeyWord').value;
    const weight = this.inputBannerWeight.value;
    const description = this.inputBannerDescription.value;
    const channelId = this.inputChannelId.value;
    const isIFrame = document.getElementById('inputBannerIsIFrame').checked;
    let html = '';
    let target = '';
    let imageUrl = '';
    let url = '';
    let bannerHtmlTypeId = null;
    let adServer = '';
    const type = this.props.banner.bannerType.value;
    if (type === 'html') {
      html = this.inputBannerHTML.value;
      adServer = this.inputBannerAdServer.value;
      bannerHtmlTypeId = this.inputBannerHtmlType.value;
    } else if (type === 'img') {
      target = this.inputBannerTarget.value;
      url = this.inputBannerUrl.value;
      imageUrl = this.state.imageUrl;
    }
    const status = this.inputBannerStatus.value;
    const banner = { id: this.props.bannerId };
    if (name && name !== this.props.banner.name) {
      banner.name = name;
    }
    banner.width = width;
    banner.height = height;
    banner.keyword = keyword;
    banner.weight = weight;
    banner.bannerTypeId = this.props.banner.bannerType.id;

    if (description && description !== this.props.banner.description) {
      banner.description = description;
    }
    banner.type = type;
    if (type === 'html') {
      if (html && html !== this.props.banner.html) {
        banner.html = html;
      }
      if (adServer && adServer !== this.props.banner.adServer) {
        banner.adServer = adServer;
      }
      banner.bannerHtmlTypeId = bannerHtmlTypeId;
    } else if (type === 'img') {
      if (target && target !== this.props.banner.target) {
        banner.target = target;
      }
      if (url && url !== this.props.banner.url) {
        banner.url = url;
      }
      banner.imageUrl = imageUrl;
      banner.bannerHtmlTypeId = null;
    }
    banner.isIFrame = isIFrame;
    banner.status = status;
    if (channelId && channelId !== this.props.banner.channelId) {
      banner.channelId = channelId;
    }
    banner.isCountView = this.props.banner.isCountView;
    banner.isFixIE = this.props.banner.isFixIE;
    banner.isDefault = this.props.banner.isDefault;
    banner.isRelative = this.props.banner.isRelative;
    banner.isImpressionsBooked = this.props.banner.isImpressionsBooked;
    banner.isClicksBooked = this.props.banner.isClicksBooked;
    banner.isActivationDate = this.props.banner.isActivationDate;
    banner.isExpirationDate = this.props.banner.isExpirationDate;
    this.props.updateBanner(banner).then(() => {
      this.props.getBanner(this.props.bannerId);
    });
  }

  insertBannerHtml(html, w, h) { // eslint-disable-line no-unused-vars, class-methods-use-this
    const idw = document.getElementById('banner');
    if (idw) {
      /* eslint-disable prefer-template */
      idw.innerHTML = '<iframe src="javacript:void(0);" frameborder="0" scrolling="no" width="' + w + '" height="' + h + '" id="bannerCode"></iframe>';
      /* eslint-enable prefer-template */
      const idb = document.getElementById('bannerCode');
      const io = idb.contentWindow;
      io.document.write(html);
    }
  }

  deleteBanner() {
    this.props.deleteBanner(this.props.bannerId);
    this.props.removeBanner(this.props.bannerId);
  }

  render() {
    if (this.state.checkTypeBanner === 'img') {
      const img = this.state.imageUrl;
      /* eslint-disable */
      this.djsConfig = {
        acceptedFiles: 'image/jpeg,image/png,image/gif',
        addRemoveLinks: true,
        maxFiles: 1,
        init: function () {
          const mockFile = { name: 'image', size: 125, type: 'image/jpeg' };
          this.options.addedfile.call(this, mockFile);
          this.options.thumbnail.call(this, mockFile, img);
          mockFile.previewElement.classList.add('dz-success');
          mockFile.previewElement.classList.add('dz-complete');
          mockFile.previewElement.classList.add('dz-processing');
          mockFile.previewElement.classList.add('dz-success');
        },
      };
      /* eslint-enable */
      this.componentConfig = {
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
    return (
      <form className="form-horizontal">
        {
          this.props.banner && this.props.banner.bannerType &&
          (this.props.banner.bannerType.value === 'img' && this.state.checkTypeBanner === 'img') ? (
            <div className="bannerImage">
              <div className="form-group">
                <div className="col-sm-12">
                  <div className="row">
                    <div className="col-sm-8">
                      <div
                        id="inputBannerImageUrl"
                        ref={c => {
                          this.inputBannerImageUrl = c;
                        }}
                      >
                        <img
                          src={this.props.banner ?
                            this.props.banner.imageUrl : ''
                          }
                          alt="demo"
                        />
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <DropzoneComponent
                        config={this.componentConfig}
                        eventHandlers={this.eventHandlers}
                        djsConfig={this.djsConfig}
                      />
                    </div>
                  </div>
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
          ) : (
            <div className="bannerHTML">
              <div className="form-group">
                <div className="col-lg-12">
                  <div id="banner">&nbsp;</div>
                </div>
              </div>
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
                    {this.props.bannerHtmlTypeList &&
                    this.props.bannerHtmlTypeList.map((bannerHtmlType) => (
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
          )
        }

        <div className="form-group">
          <label
            htmlFor="inputBannerName"
            className="col-sm-2 control-label"
          >Name</label>
          <div className="col-sm-10">
            <input
              type="text" className="form-control" id="inputBannerName"
              placeholder="Banner Top"
              ref={c => {
                this.inputBannerName = c;
              }}
            />
          </div>
        </div>

        <div className="form-group">
          <label
            htmlFor="inputBannerWidth"
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
            htmlFor="inputBannerHeight"
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
              data={this.state.keyWord}
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
              type="number"
              className="form-control" id="inputBannerWeight" placeholder="1"
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
          >Use iframe</label>
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

        <hr />

        <div className="clearfix">
          <Link
            to="/resource/banner"
            className="btn btn-app pull-right"
          ><i className="fa fa-undo" /> Cancel</Link>
          <Link
            to="/resource/banner"
            className="btn btn-app pull-right"
            onClick={event => this.deleteBanner(event)}
          ><i className="fa fa-trash-o" /> Delete</Link>
          <Link
            to="#"
            className="btn btn-app pull-right"
            onClick={event => this.updateBanner(event)}
          ><i className="fa fa-floppy-o" /> Save</Link>
        </div>
      </form>
    );
  }
}

export default UpdateBannerForm;
