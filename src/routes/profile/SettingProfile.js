/* global $ */

import React, { Component, PropTypes } from 'react';
import Link from '../../components/Link';

class SettingProfile extends Component {

  static propTypes = {
    user: PropTypes.object,
    updateProfile: PropTypes.func,
    id: PropTypes.string,
    getUser: PropTypes.func,
    page: PropTypes.object,
    setStatusUpdateProfileUser: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      statusUpdateSettingProfile: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.page && nextProps.page.statusUpdateSettingProfile) {
      if (nextProps.user) {
        if (nextProps.user.profile) {
          const status = nextProps.page.statusUpdateSettingProfile;
          this.setState({ statusUpdateSettingProfile: status });
          if (this.state.statusUpdateSettingProfile === true) {
            if (this.inputProfileGender !== undefined &&
              this.inputProfileName !== undefined && this.inputProfileGender !== undefined) {
              this.inputProfileName.value = nextProps.user.profile.displayName;
              this.inputProfileGender.value = nextProps.user.profile.gender;
              this.inputProfileLocation.value = nextProps.user.profile.location;
              this.inputProfileEmail.value = nextProps.user.email;
            }
          }
        }
      }
    }
  }

  saveProfile() {
    const displayName = this.inputProfileName.value;
    const gender = this.inputProfileGender.value;
    const location = this.inputProfileLocation.value;

    const user = { id: this.props.id };
    user.profile = {};
    user.email = this.props.user.email;
    user.emailConfirmed = this.props.user.emailConfirmed;
    user.password = this.props.user.password;

    user.profile.displayName = displayName;

    if (location && location !== this.props.user.profile.location) {
      user.profile.location = location;
    }

    if (gender && gender !== this.props.user.profile.gender) {
      user.profile.gender = gender;
    }

    this.props.updateProfile(user).then(() => {
      this.props.getUser(this.props.id).then(() => {
        this.props.setStatusUpdateProfileUser(false);
        this.setState({ statusUpdateSettingProfile: false });
      });
    });
  }
  cancel() {
    this.setState({ statusUpdateSettingProfile: false });
  }

  render() {
    return (
      <div className="row">
        { this.state.statusUpdateSettingProfile &&
        this.state.statusUpdateSettingProfile === true ? (
          <form className="form-horizontal">
            <div className="col-sm-12">
              {/* /.Profile Name */}
              <div className="form-group">
                <label htmlFor="inputProfileName" className="col-sm-2 control-label">Name</label>
                <div className="col-sm-10">
                  <input
                    type="email"
                    className="form-control"
                    id="inputProfileName"
                    defaultValue={this.props.user && this.props.user.profile &&
                    this.props.user.profile.displayName ? this.props.user.profile.displayName : ''}
                    ref={(c) => {
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
                    defaultValue={this.props.user && this.props.user.email ?
                      this.props.user.email : ''}
                    ref={(c) => {
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
                    defaultValue={this.props.user && this.props.user.profile &&
                    this.props.user.profile.gender ? this.props.user.profile.gender : ''}
                    ref={(c) => {
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
                <label
                  htmlFor="inputProfileLocation"
                  className="col-sm-2 control-label"
                >Location</label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="inputProfileLocation"
                    placeholder="Ha Noi,Viet Nam"
                    defaultValue={this.props.user && this.props.user.profile &&
                    this.props.user.profile.location ? this.props.user.profile.location : ''}
                    ref={(c) => {
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
                  <Link
                    to="#"
                    className="btn btn-default"
                    onClick={event => this.cancel(event)}
                  >Cancel</Link>
                </div>
              </div>
            </div>
          </form>

          ) : ''}
      </div>
    );
  }
}

export default SettingProfile;
