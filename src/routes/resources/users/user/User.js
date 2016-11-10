/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// import { defineMessages, FormattedRelative } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { getUser, updateUser, deleteUser } from '../../../../actions/users';
import Layout from '../../../../components/Layout';
import Link from '../../../../components/Link';
import s from './User.css';

const pageTitle = 'User';

class User extends Component {

  static propTypes = {
    userId: PropTypes.string.isRequired,
    roles: PropTypes.object,
    users: PropTypes.object,
    getUser: PropTypes.func,
    updateUser: PropTypes.func,
    deleteUser: PropTypes.func,
  };

  componentWillMount() {
    this.props.getUser(this.props.userId);
  }

  componentWillReceiveProps(nextProps) {
    const {
      email,
      emailConfirmed,
      status,
    } = nextProps.users.editing;

    this.inputUserEmail.value = email;
    this.inputUserEmailConfirmed.value = emailConfirmed;
    this.inputUserStatus.value = status;
  }

  updateUser() {
    const email = this.inputUserEmail.value;
    const password = this.inputUserPassword.value;
    const passwordConfirmation = this.inputUserPasswordConfirmation.value;
    const emailConfirmed = this.inputUserEmailConfirmed.value;
    const status = this.inputUserStatus.value;

    const user = { id: this.props.userId };

    if (email && email !== this.props.users.editing.email) {
      user.email = email;
    }

    if (password && passwordConfirmation && password === passwordConfirmation) {
      user.password = password;
    }

    if (emailConfirmed && emailConfirmed !== this.props.users.editing.emailConfirmed) {
      user.emailConfirmed = emailConfirmed;
    }

    if (status && status !== this.props.users.editing.status) {
      user.status = status;
    }

    this.props.updateUser(user);
  }

  deleteUser() {
    this.props.deleteUser(this.props.userId);
  }

  render() {
    const { roles, users } = this.props;

    return (
      <Layout
        pageTitle={`${pageTitle}: ${users.editing.profile && (
          users.editing.profile.displayName || '...'
        )}`}
        pageSubTitle={users.editing.email || ''}
      >
        <div>

          <div className="row">
            <section className="col-lg-12">
              {/* BOX: UPDATE */}
              <div className="box box-primary">
                <div className="box-header with-border">
                  <h3 className="box-title">Change user information</h3>
                  <div className="box-tools pull-right">
                    <button type="button" className="btn btn-box-tool" data-widget="collapse">
                      <i className="fa fa-minus" />
                    </button>
                  </div>
                </div>
                {/* /.box-header */}
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
                        >
                          {roles && roles.list.map(role => (
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
                    <Link
                      to="/resource/user" className="btn btn-app pull-right"
                    ><i className="fa fa-undo" /> Cancel</Link>
                    <Link
                      to="/resource/user" className="btn btn-app pull-right"
                      onClick={event => this.deleteUser(event)}
                    ><i className="fa fa-trash-o" /> Delete</Link>
                    {/* eslint-disable jsx-a11y/no-static-element-interactions */}
                    <a
                      className="btn btn-app pull-right"
                      onClick={event => this.updateUser(event)}
                    ><i className="fa fa-floppy-o" /> Save</a>
                    {/* eslint-enable jsx-a11y/no-static-element-interactions */}
                  </div>
                  {/* /.box-footer */}
                </form>
              </div>
              {/* /.col */}
            </section>
          </div>

        </div>
      </Layout>
    );
  }

}

const mapState = (state) => ({
  users: state.users,
  roles: state.roles,
});

const mapDispatch = {
  getUser,
  updateUser,
  deleteUser,
};

export default withStyles(s)(connect(mapState, mapDispatch)(User));
