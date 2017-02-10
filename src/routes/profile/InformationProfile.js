
/* global $ */

import React, { Component, PropTypes } from 'react';
import Link from '../../components/Link';

class InformationProfile extends Component {

  static propTypes = {
    user: PropTypes.object,
  };

  render() {
    return (
      <div className="information-profile">
        {/* Profile Image */}
        <div className="box box-primary">
          <div className="box-body box-profile">
            <div className="box-tools pull-right">
              <button
                className="btn btn-box-tool remove-option"
              >
                <i
                  className="fa fa-edit"
                />
              </button>
            </div>
            <img
              className="profile-user-img img-responsive img-circle"
              src="/default_avatar.png" alt="avatar"
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
            <Link to="#" className="btn btn-primary btn-block"><b>Change Information</b></Link>
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
