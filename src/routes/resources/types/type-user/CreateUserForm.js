/* global $ */

import React, { Component, PropTypes } from 'react';
import Link from '../../../../components/Link';

class CreateUserForm extends Component {

  static propTypes = {
    roleList: PropTypes.array.isRequired,
    id: PropTypes.string,
    users: PropTypes.object,
    setStatusCreateUser: PropTypes.func,
    getUsers: PropTypes.func,
    page: PropTypes.object,
    createUser: PropTypes.func,
  };

  componentDidMount() {
    $('#inputUserRoles').select2();
  }

  clearInput() {
    this.inputUserEmail.value = null;
    this.inputUserPassword.value = null;
    this.inputUserPasswordConfirmation.value = null;
  }

  createUser() {
    const email = this.inputUserEmail.value;
    const displayName = this.inputUserDisplayName.value;
    const roles = $('#inputUserRoles').val(); // eslint-disable-line no-undef
    const password = this.inputUserPassword.value;
    const passwordConfirmation = this.inputUserPasswordConfirmation.value;
    const emailConfirmed = this.inputUserEmailConfirmed.value;
    const status = this.inputUserStatus.value;

    if (
      email &&
      displayName &&
      roles &&
      password &&
      passwordConfirmation &&
      password === passwordConfirmation &&
      emailConfirmed &&
      status
    ) {
      this.props.createUser({
        email,
        profile: {
          displayName,
        },
        roles,
        password,
        emailConfirmed: emailConfirmed === 'true', // Convert to boolean
        status,
      });

      this.clearInput();
    }
    this.props.setStatusCreateUser(false);
  }

  removeCreateForm() {
    this.props.setStatusCreateUser(false);
  }

  render() {
    return (
      <div
        className="create-user"
      >
        <div className="box-header with-border">
          <h3
            className="box-title"
          >
            Add New</h3>
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
            {/* displayName */}
            <div className="form-group">
              <label
                htmlFor="inputUserDisplayName"
                className="col-sm-2 control-label"
              >Name</label>
              <div className="col-sm-10">
                <input
                  type="text" className="form-control" id="inputUserDisplayName"
                  placeholder="John Doe"
                  ref={(c) => {
                    this.inputUserDisplayName = c;
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
                <select
                  id="inputUserRoles"
                  className="form-control"
                  style={{ width: '100%' }}
                  data-placeholder="Select roles"
                  defaultValue={['user']}
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
                </select>
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
            onClick={event => this.createUser(event)}
          ><i className="fa fa-check" /> Confirm</Link>
        </div>
        {/* /.box-footer */}
      </div>
    );
  }
}

export default CreateUserForm;
