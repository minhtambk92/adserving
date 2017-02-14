/* global $ */

import React, { Component, PropTypes } from 'react';
import DropzoneComponent from 'react-dropzone-component/lib/react-dropzone';
import Link from '../../components/Link';

class InformationProfile extends Component {

  static propTypes = {
    user: PropTypes.object,
    page: PropTypes.object,
    setStatusUpdateProfileUser: PropTypes.func,
    id: PropTypes.string,
    updateProfile: PropTypes.func,
    getUser: PropTypes.func,
    setPageProfileActiveTab: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      imageUrl: '',
      isChangeAvatar: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user) {
      if (nextProps.user.profile) {
        const picture = nextProps.user.profile.picture;
        this.setState({ imageUrl: picture });
      }
    }
  }

  changeImage() { // eslint-disable-line no-unused-vars, class-methods-use-this
    $('.dropzone').click();
    this.setState({ isChangeAvatar: true });
  }

  updateAbout() {
    this.props.setPageProfileActiveTab('settings');
    this.props.setStatusUpdateProfileUser(true);
  }

  saveAvatar() {
    const picture = this.state.imageUrl;

    const user = { id: this.props.id };
    user.profile = {};

    if (picture && picture !== this.props.user.profile.picture) {
      user.profile.picture = picture;
    }

    user.profile.displayName = this.props.user.profile.displayName;
    user.profile.location = this.props.user.profile.location;
    user.profile.gender = this.props.user.profile.gender;

    this.props.updateProfile(user).then(() => {
      this.props.getUser(this.props.id);
      this.setState({ isChangeAvatar: false });
    });
  }

  clearAvatar() {
    let image = '/default_avatar.png';
    if (this.props.user) {
      if (this.props.user.profile.picture !== '') {
        image = this.props.user.profile.picture;
      } else if (this.props.user.profile.picture === '') {
        image = '/default_avatar.png';
      }
      this.setState({ imageUrl: image });
    }
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
      <div className="information-profile">
        {/* Profile Image */}
        <div className="box box-primary">
          <div className="box-body box-profile">
            <div className="box-tools pull-right">
              { this.state.isChangeAvatar === false ? (
                <button
                  className="btn btn-box-tool"
                  onClick={() => this.changeImage()}
                >
                  <i
                    className="fa fa-camera"
                  />
                </button>) : (
                  <button
                    className="btn btn-box-tool"
                    onClick={() => this.clearAvatar()}
                  >
                    <i className="fa fa-times" />
                  </button>
                )}
            </div>
            <img
              className="profile-user-img img-responsive img-circle"
              src={(this.props.user && this.props.user.profile &&
              this.props.user.profile.picture &&
              this.props.user.profile.picture !== '') ?
                this.state.imageUrl : '/default_avatar.png'
              }
              alt="avatar"
            />
            <h3
              className="profile-username text-center"
            >{this.props.user && this.props.user.profile
            && this.props.user.profile ? this.props.user.profile.displayName : ''}
            </h3>
            <p
              className="text-muted text-center"
            >
              { this.props.user && this.props.user ? this.props.user.email : 'No '}
            </p>
            <ul className="list-group list-group-unbordered">
              <li className="list-group-item">
                <b>Followers</b> <a className="pull-right">1,322</a>
              </li>
              <li className="list-group-item">
                <b>Following</b> <a className="pull-right">543</a>
              </li>
              <li className="list-group-item">
                <b>Friends</b> <a className="pull-right">13,287</a>
              </li>
            </ul>
            <div className="col-sm-12" id="uploadImage">
              <DropzoneComponent
                config={this.componentConfig}
                eventHandlers={this.eventHandlers}
                djsConfig={this.djsConfig}
              />
            </div>
            {this.state.isChangeAvatar && this.state.isChangeAvatar === true ? (
              <Link
                to="#"
                className="btn btn-primary btn-block"
                onClick={() => this.saveAvatar()}
              >
                <b>Save Avatar</b>
              </Link>
              ) : ('')}
          </div>
          {/* /.box-body */}
        </div>
        {/* /.box */}
        {/* About Me Box */}
        <div className="box box-primary">
          <div className="box-header with-border">
            <h3 className="box-title">About Me</h3>
            <div className="box-tools pull-right">
              <button
                className="btn btn-box-tool edit-option"
                onClick={() => this.updateAbout()}
              >
                <i
                  className="fa fa-edit"
                />
              </button>
            </div>
          </div>
          {/* /.box-header */}
          <div className="box-body">
            <strong><i className="fa fa-transgender margin-r-5" /> Gender</strong>
            <p className="text-muted">
              { this.props.user && this.props.user.profile
              && this.props.user.profile ? this.props.user.profile.gender : ''}
            </p>
            <hr />
            <strong><i className="fa fa-map-marker margin-r-5" /> Location</strong>
            <p className="text-muted">{ this.props.user && this.props.user.profile
            && this.props.user.profile ? this.props.user.profile.location : ''}</p>
            <hr />
            <strong><i className="fa fa-pencil margin-r-5" />Roles</strong>
            <p>
              {this.props.user && this.props.user.roles && this.props.user.roles.map(role => (
                <span key={role.id} className="label label-info">{role.name}</span>
              ))}
            </p>
            <hr />
            <strong><i className="fa fa-file-text-o margin-r-5" /> Notes</strong>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Etiam fermentum enim neque.</p>
          </div>
          {/* /.box-body */}
        </div>
        {/* /.box */}
      </div>
    );
  }
}

export default InformationProfile;
