/**
 * Created by Manhhailua on 11/9/16.
 */

import React, { Component, PropTypes } from 'react';

class CreateUserForm extends Component {

  static propTypes = {
    filters: PropTypes.object,
    roles: PropTypes.array.isRequired,
    createUser: PropTypes.func.isRequired,
  };

  clearInput() {
    this.inputUserEmail.value = null;
    this.inputUserPassword.value = null;
    this.inputUserPasswordConfirmation.value = null;
  }

  createUser() {
    const email = this.inputUserEmail.value;
    const displayName = this.inputUserDisplayName.value;
    const roles = [this.inputUserRoles.value];
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
  }

  render() {
    return (
      <form className="form-horizontal">
        <div className="box-body">
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
                ref={c => {
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
                ref={c => {
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
                className="form-control select2"
                style={{ width: '100%' }}
                ref={c => {
                  this.inputUserRoles = c;
                }}
                defaultValue={this.props.filters.roleUniqueName}
              >
                {this.props.roles && this.props.roles.map(role => (
                  <option key={role.id} value={role.uniqueName}>{role.name}</option>
                ))}
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
                ref={c => {
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
                ref={c => {
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
                ref={c => {
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
                ref={c => {
                  this.inputUserStatus = c;
                }}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>
        {/* /.box-body */}
        <div className="box-footer">
          {/* eslint-disable jsx-a11y/no-static-element-interactions */}
          <a
            className="btn btn-app pull-right"
            onClick={event => this.clearInput(event)}
          ><i className="fa fa-eraser" /> Clear</a>
          <a
            className="btn btn-app pull-right"
            onClick={event => this.createUser(event)}
          ><i className="fa fa-check" /> Confirm</a>
          {/* eslint-enable jsx-a11y/no-static-element-interactions */}
        </div>
        {/* /.box-footer */}
      </form>
    );
  }
}

export default CreateUserForm;
