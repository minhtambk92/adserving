/**
 * Created by Manhhailua on 11/11/16.
 */

import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import Link from '../../../components/Link';
import { Select2 } from '../../../components/UI';

class UpdateUserForm extends Component {

  static propTypes = {
    userId: PropTypes.string.isRequired,
    userEditing: PropTypes.object.isRequired,
    roleList: PropTypes.array.isRequired,
    updateUser: PropTypes.func.isRequired,
    deleteUser: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      currentRoles: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    const {
      email,
      roles,
      emailConfirmed,
      status,
    } = nextProps.userEditing;

    this.inputUserEmail.value = email;
    if (roles) {
      this.setState({ currentRoles: roles.map(role => role.uniqueName).sort() });
    }
    this.inputUserEmailConfirmed.value = emailConfirmed;
    this.inputUserStatus.value = status;
  }

  updateUser() {
    const { userEditing, roleList } = this.props;

    const email = this.inputUserEmail.value;
    const roles = $('#inputUserRoles').val(); // eslint-disable-line no-undef
    const password = this.inputUserPassword.value;
    const passwordConfirmation = this.inputUserPasswordConfirmation.value;
    const emailConfirmed = this.inputUserEmailConfirmed.value;
    const status = this.inputUserStatus.value;

    const user = { id: this.props.userId };

    if (email && email !== userEditing.email) {
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

    if (emailConfirmed && emailConfirmed !== userEditing.emailConfirmed.toString()) {
      user.emailConfirmed = emailConfirmed === 'true'; // Convert to boolean
    }

    if (status && status !== userEditing.status) {
      user.status = status;
    }

    this.props.updateUser(user);
  }

  deleteUser() {
    this.props.deleteUser(this.props.userId);
  }

  render() {
    const { roleList } = this.props;

    return (
      <form className="form-horizontal">
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
              ref={c => {
                this.inputUserRoles = c;
              }}
            >
              <optgroup>
                {roleList.map(role => (
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
        {/* /.box-body */}
        <div className="clearfix">
          <Link
            to="/resource/user" className="btn btn-app pull-right"
          ><i className="fa fa-undo" /> Cancel</Link>
          <Link
            to="/resource/user" className="btn btn-app pull-right"
            onClick={event => this.deleteUser(event)}
          ><i className="fa fa-trash-o" /> Delete</Link>
          <Link
            to="#"
            className="btn btn-app pull-right"
            onClick={event => this.updateUser(event)}
          ><i className="fa fa-floppy-o" /> Save</Link>
        </div>
        {/* /.box-footer */}
      </form>
    );
  }
}

export default UpdateUserForm;
