/* global $ */
/* global jQuery */

import React, { Component, PropTypes } from 'react';
import DropzoneComponent from 'react-dropzone-component/lib/react-dropzone';
import Link from '../../../../components/Link';

class EditProfileForm extends Component {

  static propTypes = {
    id: PropTypes.string,
    profile: PropTypes.object,
    setStatusUpdateProfile: PropTypes.func,
    getUsers: PropTypes.func,
    page: PropTypes.object,
    updateProfile: PropTypes.func,
    user: PropTypes.object,
    createActivity: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      imageUrl: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile) {
      const picture = nextProps.profile.picture;
      this.setState({ imageUrl: picture });
      this.inputProfileName.value = nextProps.profile.displayName;
      this.inputProfileGender.value = nextProps.profile.gender;
      this.inputProfileLocation.value = nextProps.profile.location;
      this.inputProfileWebsite.value = nextProps.profile.website;
    }
  }

  clearInput() {
    this.inputProfileName.value = null;
    this.inputProfileLocation.value = null;
    this.inputProfileWebsite.value = null;
  }

  save() {
    const profileObject = jQuery.extend({}, this.props.profile);
    const displayName = this.inputProfileName.value;
    const gender = this.inputProfileGender.value;
    const location = this.inputProfileLocation.value;
    const website = this.inputProfileWebsite.value;
    const picture = this.state.imageUrl;

    const user = { id: this.props.id };
    user.emailConfirmed = false;
    user.profile = {};

    user.profile.displayName = displayName;

    if (picture && picture !== this.props.profile.picture) {
      user.profile.picture = picture;
    }

    if (website && website !== this.props.profile.website) {
      user.profile.website = website;
    }

    if (location && location !== this.props.profile.location) {
      user.profile.location = location;
    }

    if (gender && gender !== this.props.profile.gender) {
      user.profile.gender = gender;
    }

    this.props.updateProfile(user).then(() => {
      const userId = this.props.user.id;
      const subject = `User ${displayName}`;
      const subjectId = this.props.profile.id;
      const action = 'updated';
      const other = JSON.stringify(profileObject);
      this.props.createActivity({ action,
        subject,
        subjectId,
        other,
        userId }).then(() => {
          this.props.getUsers();
        });
    });
    this.clearInput();
    this.props.setStatusUpdateProfile(false);
  }

  removeUpdateProfile() {
    this.props.setStatusUpdateProfile(false);
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
      <div
        className="edit-Profile"
      >
        <div className="box-header with-border">
          <h3
            className="box-title"
          >
            {`Edit: ${this.props.profile.displayName}`}
          </h3>
          <div className="box-tools pull-right">
            <button
              className="btn btn-box-tool remove-Profile-zone"
              onClick={event => this.removeUpdateProfile(event)}
            >
              <i className="fa fa-times" />
            </button>
          </div>
        </div>
        <div className="box-body">
          <div className="form-horizontal">
            <div className="col-sm-3">
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
                          src={(this.props.profile && this.props.profile.picture !== '') ?
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
            <div className="col-sm-9">
              {/* name */}
              <div className="form-group">
                <label
                  htmlFor="inputProfileEmail"
                  className="col-sm-2 control-label"
                >Name</label>
                <div className="col-sm-10">
                  <input
                    type="text" className="form-control" id="inputProfileName"
                    placeholder="Perter"
                    ref={(c) => {
                      this.inputProfileName = c;
                    }}
                  />
                </div>
              </div>
              {/* Gender */}
              <div className="form-group">
                <label
                  htmlFor="inputProfileGender"
                  className="col-sm-2 control-label"
                >Gender</label>
                <div className="col-sm-10">
                  <select
                    id="inputProfileGender"
                    className="form-control"
                    ref={(c) => {
                      this.inputProfileGender = c;
                    }}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              {/* website */}
              <div className="form-group">
                <label
                  htmlFor="inputProfileWebsite"
                  className="col-sm-2 control-label"
                >Website</label>
                <div className="col-sm-10">
                  <input
                    type="text" className="form-control" id="inputProfileWebsite"
                    placeholder="http://www.bongdaso.com"
                    ref={(c) => {
                      this.inputProfileWebsite = c;
                    }}
                  />
                </div>
              </div>
              {/* location */}
              <div className="form-group">
                <label
                  htmlFor="inputProfileLocation"
                  className="col-sm-2 control-label"
                >Location</label>
                <div className="col-sm-10">
                  <input
                    type="text" className="form-control" id="inputProfileLocation"
                    placeholder="Perter"
                    ref={(c) => {
                      this.inputProfileLocation = c;
                    }}
                  />
                </div>
              </div>
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
            onClick={event => this.save(event)}
          ><i className="fa fa-check" /> Save</Link>
        </div>
        {/* /.box-footer */}
      </div>
    );
  }
}

export default EditProfileForm;
