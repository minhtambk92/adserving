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
    channels: PropTypes.array,
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
      type,
      imageUrl,
      isIFrame,
      status,
      adServer,
      bannerHTMLType,
      channelId,
    } = nextProps.banner && (nextProps.banner || {});
    this.state.keyWord = keyword;
    this.inputBannerName.value = name;
    this.inputBannerWidth.value = width;
    this.inputBannerHeight.value = height;
    this.inputBannerWeight.value = weight;
    this.inputBannerDescription.value = description;
    this.inputBannerStatus.value = status;
    this.inputChannelId.value = channelId;
    this.inputBannerIsIFrame.value = isIFrame;

    if (type === 'html') {
      if (isIFrame === true) {
        this.insertBannerHtml(html, width, height);
      } else {
        document.getElementById('banner').innerHTML = '';
      }
      if (this.inputBannerHTML !== undefined && this.inputBannerHTMLType.value !== undefined &&
        this.inputBannerHTMLType.value !== undefined) {
        this.state.checkTypeBanner = 'html';
        this.state.imageUrl = '';
        this.inputBannerHTML.value = html;
        this.inputBannerAdServer.value = adServer;
        this.inputBannerHTMLType.value = bannerHTMLType;
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
    // this.inputBannerIsIFrame.value;
    let html = '';
    let target = '';
    let imageUrl = '';
    let url = '';
    let bannerHTMLType = '';
    let adServer = '';
    const type = this.props.banner.type;
    if (type === 'html') {
      html = this.inputBannerHTML.value;
      adServer = this.inputBannerAdServer.value;
      bannerHTMLType = this.inputBannerHTMLType.value;
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

    if (width && width !== this.props.banner.width) {
      banner.width = width;
    }

    if (height && height !== this.props.banner.height) {
      banner.height = height;
    }

    if (keyword && keyword !== this.props.banner.keyword) {
      banner.keyword = keyword;
    }
    if (weight && weight !== this.props.banner.weight) {
      banner.weight = weight;
    }
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
      if (bannerHTMLType && bannerHTMLType !== this.props.banner.bannerHTMLType) {
        banner.bannerHTMLType = bannerHTMLType;
      }
    } else if (type === 'img') {
      if (target && target !== this.props.banner.target) {
        banner.target = target;
      }
      if (url && url !== this.props.banner.url) {
        banner.url = url;
      }
      banner.imageUrl = imageUrl;
    }
    banner.isIFrame = isIFrame;
    if (status && status !== this.props.banner.status) {
      banner.status = status;
    }
    if (channelId && channelId !== this.props.banner.channelId) {
      banner.channelId = channelId;
    }
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
        <div className="box-body">
          {
            this.props.banner &&
            (this.props.banner.type === 'img' && this.state.checkTypeBanner === 'img') ?
              (
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
            )}
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
        {/* /.box-footer */}
      </form>
    );
  }
}

export default UpdateBannerForm;
