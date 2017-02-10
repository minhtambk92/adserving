/* global $ */

import React, { Component, PropTypes } from 'react';
import DropzoneComponent from 'react-dropzone-component/lib/react-dropzone';
import Link from '../../components/Link';

class SettingProfile extends Component {

  static propTypes = {
    user: PropTypes.object,
    updateProfile: PropTypes.func,
    id: PropTypes.string,
    getUser: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      imageUrl: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user) {
      if (nextProps.user.profile) {
        const picture = nextProps.user.profile.picture;
        this.setState({ imageUrl: picture });
        this.inputProfileName.value = nextProps.user.profile.displayName;
        this.inputProfileGender.value = nextProps.user.profile.gender;
        this.inputProfileLocation.value = nextProps.user.profile.location;
      }
      this.inputProfileEmail.value = nextProps.user.email;
    }
  }

  saveProfile() {
    const displayName = this.inputProfileName.value;
    const gender = this.inputProfileGender.value;
    const location = this.inputProfileLocation.value;
    const picture = this.state.imageUrl;

    const user = { id: this.props.id };
    user.emailConfirmed = false;
    user.profile = {};

    user.profile.displayName = displayName;

    if (picture && picture !== this.props.user.profile.picture) {
      user.profile.picture = picture;
    }

    if (location && location !== this.props.user.profile.location) {
      user.profile.location = location;
    }

    if (gender && gender !== this.props.user.profile.gender) {
      user.profile.gender = gender;
    }

    this.props.updateProfile(user).then(() => {
      this.props.getUser(this.props.id);
    });
  }

  changeImage() { // eslint-disable-line no-unused-vars, class-methods-use-this
    $('.dropzone').click();
  }

  removeAvatar() { // eslint-disable-line no-unused-vars, class-methods-use-this
    const image = '/default_avatar.png';
    this.setState({ imageUrl: image });
  }

  render() {
    const img = this.state.imageUrl;
    /* eslint-disable */
    this.djsConfig = {
      acceptedFiles: 'image/jpeg,image/png,image/gif',
      addRemoveLinks: true,
      init: function () {
        const mockFile = { name: 'avatar', type: 'image/jpeg' };
        this.options.addedfile.call(this, mockFile);
        this.options.thumbnail.call(this, mockFile, img);
        mockFile.previewElement.classList.add('dz-success');
        mockFile.previewElement.classList.add('dz-complete');
        mockFile.previewElement.classList.add('dz-processing');
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
        const image = e.xhr.response;
        this.setState({ imageUrl: image });
      }
    };
    this.eventHandlers = {
      drop: this.callbackFail,
      success: this.callback,
    };
    return (
      <div className="row">
        <form className="form-horizontal">
          <div className="col-sm-12">
            <div className="col-sm-4">
              {/* picture */}
              <div className="form-group">
                <div className="col-sm-12">
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="box-tools pull-right">
                        <button
                          className="btn btn-box-tool remove-avatar"
                          onClick={event => this.removeAvatar(event)}
                        >
                          <i className="fa fa-times" />
                        </button>
                      </div>
                      <div
                        id="inputProfilePicture"
                      >
                        <img
                          src={(this.props.user && this.props.user.profile &&
                          this.props.user.profile.picture &&
                          this.props.user.profile.picture !== '') ?
                            this.state.imageUrl : '/default_avatar.png'
                          }
                          alt="avatar"
                        />
                      </div>
                      <button
                        type="button"
                        className="btn btn-default col-sm-12"
                        onClick={() => this.changeImage()}
                      >
                        Change Avatar
                      </button>
                    </div>
                    <div className="col-sm-12" id="uploadImage">
                      <DropzoneComponent
                        config={this.componentConfig}
                        eventHandlers={this.eventHandlers}
                        djsConfig={this.djsConfig}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-8">
              {/* /.Profile Name */}
              <div className="form-group">
                <label htmlFor="inputProfileName" className="col-sm-2 control-label">Name</label>
                <div className="col-sm-10">
                  <input
                    type="email"
                    className="form-control"
                    id="inputProfileName"
                    ref={c => {
                      this.inputProfileName = c;
                    }}
                    placeholder="Name"
                  />
                </div>
              </div>

              {/* /.Profile Email */}
              <div className="form-group">
                <label htmlFor="inputEmail" className="col-sm-2 control-label">Email</label>
                <div className="col-sm-10">
                  <input
                    type="email"
                    readOnly="readOnly"
                    className="form-control"
                    id="inputEmail"
                    ref={c => {
                      this.inputProfileEmail = c;
                    }}
                    placeholder="Email"
                  />
                </div>
              </div>

              {/* /.Profile Gender */}
              <div className="form-group">
                <label
                  htmlFor="inputProfileGender"
                  className="col-sm-2 control-label"
                >Gender</label>
                <div className="col-sm-10">
                  <select
                    id="inputProfileGender" className="form-control"
                    ref={c => {
                      this.inputProfileGender = c;
                    }}
                  >
                    <option value="other">Other</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>

              {/* /.Profile Location */}
              <div className="form-group">
                <label htmlFor="inputProfileLocation" className="col-sm-2 control-label">Location</label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="inputProfileLocation"
                    placeholder="Ha Noi,Viet Nam"
                    ref={c => {
                      this.inputProfileLocation = c;
                    }}
                  />
                </div>
              </div>

              {/* /.Profile Description */}
              <div className="form-group">
                <div className="col-sm-offset-2 col-sm-10">
                  <Link
                    to="#"
                    onClick={() => this.saveProfile()}
                    className="btn btn-primary"
                  >Save</Link>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default SettingProfile;
