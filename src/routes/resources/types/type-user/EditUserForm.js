/* global $ */

import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import { Select2 } from '../../../../components/UI';
import Link from '../../../../components/Link';

class EditUserForm extends Component {

  static propTypes = {
    index: PropTypes.number,
    roleList: PropTypes.array.isRequired,
    id: PropTypes.string,
    user: PropTypes.object,
    setStatusUpdateUser: PropTypes.func,
    getUsers: PropTypes.func,
    page: PropTypes.object,
    updateUser: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      currentRoles: [],
    };
  }

  componentDidMount() {
    $('#inputUserRoles').select2();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user) {
      this.inputUserEmail.value = nextProps.user.email;
      const roles = nextProps.user.roles;
      this.setState({ currentRoles: roles.map(role => role.uniqueName).sort() });
      this.inputUserPassword.value = nextProps.user.password;
      this.inputUserPasswordConfirmation.value = nextProps.user.password;
      this.inputUserEmailConfirmed.value = nextProps.user.emailConfirmed;
      this.inputUserStatus.value = nextProps.user.status;
    }
  }

  clearInput() {
    this.inputUserEmail.value = null;
    this.inputUserPassword.value = null;
    this.inputUserPasswordConfirmation.value = null;
  }

  save() {
    const roleList = this.props.roleList;
    const email = this.inputUserEmail.value;
    const roles = $('#inputUserRoles').val(); // eslint-disable-line no-undef
    const password = this.inputUserPassword.value;
    const passwordConfirmation = this.inputUserPasswordConfirmation.value;
    const emailConfirmed = this.inputUserEmailConfirmed.value;
    const status = this.inputUserStatus.value;

    const user = { id: this.props.id };

    if (email && email !== this.props.user.email) {
      user.email = email;
    }

    if (roles && !_.isEqual(roles.sort(), this.state.currentRoles)) {
      user.roles = JSON.stringify(roleList.map(role => ({
        id: role.id,
        isGranted: roles.indexOf(role.uniqueName) !== -1,
      })));
    }

    if (password && passwordConfirmation && password === passwordConfirmation) {
      user.password = password;
    }

    if (emailConfirmed && emailConfirmed !== this.props.user.emailConfirmed.toString()) {
      user.emailConfirmed = emailConfirmed === 'true'; // Convert to boolean
    }

    if (status && status !== this.props.user.status) {
      user.status = status;
    }

    this.props.updateUser(user).then(() => {
      this.props.getUsers();
    });

    this.clearInput();
    this.props.setStatusUpdateUser(false);
  }

  removeCreateForm() {
    this.props.setStatusUpdateUser(false);
  }

  render() {
    return (
      <div
        className="edit-user"
      >
        <div className="box-header with-border">
          <h3
            className="box-title"
          >
            {`Edit: ${this.props.user.profile ? this.props.user.profile.displayName : ''}`}</h3>
          <div className="box-tools pull-right">
            <button
              className="btn btn-box-tool remove-User-zone"
              onClick={event => this.removeCreateForm(event)}
            >
              <i className="fa fa-times" />
            </button>
          </div>
        </div>
        <div className="box-body">
          <div className="form-horizontal">
            {/* email */}
            <div className="form-group">
              <label
                htmlFor="inputUserEmail"
                className="col-sm-2 control-label"
              >Email</label>
              <div className="col-sm-10">
                <input
                  type="text" className="form-control" id="inputUserEmail"
                  placeholder="contact@dantri.com.vn"
                  ref={(c) => {
                    this.inputUserEmail = c;
                  }}
                />
              </div>
            </div>
            {/* role */}
            <div className="form-group">
              <label
                htmlFor="inputUserRoles"
                className="col-sm-2 control-label"
              >Role</label>
              <div className="col-sm-10">
                <Select2
                  id="inputUserRoles"
                  className="form-control"
                  style={{ width: '100%' }}
                  data-placeholder="Select roles"
                  defaultValue={this.state.currentRoles}
                  multiple
                  ref={(c) => {
                    this.inputUserRoles = c;
                  }}
                >
                  <optgroup>
                    {this.props.roleList.map(role => (
                      <option
                        key={role.id} value={role.uniqueName}
                      >{role.name}</option>
                    ))}
                  </optgroup>
                </Select2>
              </div>
            </div>
            {/* password */}
            <div className="form-group">
              <label
                htmlFor="inputUserPassword"
                className="col-sm-2 control-label"
              >Password</label>
              <div className="col-sm-10">
                <input
                  type="password" className="form-control" id="inputUserPassword"
                  placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                  ref={(c) => {
                    this.inputUserPassword = c;
                  }}
                />
              </div>
            </div>
            {/* passwordConfirmation */}
            <div className="form-group">
              <label
                htmlFor="inputUserPasswordConfirmation"
                className="col-sm-2 control-label"
              >Password again</label>
              <div className="col-sm-10">
                <input
                  type="password" className="form-control"
                  id="inputUserPasswordConfirmation"
                  placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                  ref={(c) => {
                    this.inputUserPasswordConfirmation = c;
                  }}
                />
              </div>
            </div>
            {/* emailConfirmed */}
            <div className="form-group">
              <label
                htmlFor="inputUserEmailConfirmed"
                className="col-sm-2 control-label"
              >Email confirmed</label>
              <div className="col-sm-10">
                <select
                  id="inputUserEmailConfirmed"
                  className="form-control"
                  ref={(c) => {
                    this.inputUserEmailConfirmed = c;
                  }}
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
            </div>
            {/* status */}
            <div className="form-group">
              <label
                htmlFor="inputUserStatus"
                className="col-sm-2 control-label"
              >Status</label>
              <div className="col-sm-10">
                <select
                  id="inputUserStatus"
                  className="form-control"
                  ref={(c) => {
                    this.inputUserStatus = c;
                  }}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
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
          ><i className="fa fa-check" /> Confirm</Link>
        </div>
        {/* /.box-footer */}
      </div>
    );
  }
}

export default EditUserForm;
