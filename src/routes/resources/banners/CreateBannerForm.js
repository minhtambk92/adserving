import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from 'react-dropzone-component/styles/filepicker.css';
import dropZoneStyle from 'dropzone/dist/min/dropzone.min.css';
import DropzoneComponent from 'react-dropzone-component/lib/react-dropzone';
import { InputTags } from '../../../components/UI';
import Link from '../../../components/Link';

class CreateBannerForm extends Component {

  static propTypes = {
    filters: PropTypes.object,
    createBanner: PropTypes.func,
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
    const type = this.inputBannerType.value;
    let target = '';
    let imageUrl = '';
    let html = '';
    if (type === 'html') {
      html = this.inputBannerHTML.value;
      target = '';
      imageUrl = '';
    } else if (type === 'img') {
      target = this.inputBannerTarget.value;
      html = '';
      imageUrl = this.state.imageUrl;
    }
    const status = this.inputBannerStatus.value;
    const keyword = document.getElementById('inputBannerKeyWord').value;
    if (name && height && weight && keyword && width && description && type) {
      this.props.createBanner({
        name,
        html,
        width,
        height,
        keyword,
        weight,
        description,
        type,
        target,
        imageUrl,
        status,
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
                      htmlFor="inputBannerTarget"
                      className="col-sm-2 control-label"
                    >Target</label>
                    <div className="col-sm-10">
                      <input
                        type="text" className="form-control" id="inputBannerTarget"
                        placeholder="http://kenh14.vn"
                        ref={c => {
                          this.inputBannerTarget = c;
                        }}
                      />
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
              <InputTags
                id="inputBannerKeyWord"
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
