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
import { getRoles } from '../../../actions/roles';
import {
  getUsers,
  createUser,
  getUsersFilters,
  setUsersFilters,
} from '../../../actions/users';
import Layout from '../../../components/Layout';
import UserList from './UserList';
import s from './Users.css';

const pageTitle = 'Users Management';
const pageSubTitle = 'Control panel';

class Users extends Component {

  static propTypes = {
    getRoles: PropTypes.func,
    roles: PropTypes.object,
    users: PropTypes.object,
    getUsers: PropTypes.func,
    createUser: PropTypes.func,
    getUsersFilters: PropTypes.func,
    setUsersFilters: PropTypes.func,
  };

  componentWillMount() {
    this.props.getRoles();
    this.props.getUsersFilters();
    this.props.getUsers();
  }

  componentDidMount() {
    /* eslint-disable no-undef */
    // $('.select2').select2();
  }

  onFilterChange(event, field) {
    event.persist();

    this.props.setUsersFilters({
      [field]: event.target.value,
    });
  }

  clearInput() {
    this.inputUserEmail.value = null;
    this.inputUserPassword.value = null;
    this.inputUserPasswordConfirmation.value = null;
  }

  createUser() {
    const email = this.inputUserEmail.value;
    const roleIds = [this.inputUsersRole.value];
    const password = this.inputUserPassword.value;
    const passwordConfirmation = this.inputUserPasswordConfirmation.value;
    const emailConfirmed = this.inputUserEmailConfirmed.value;
    const status = this.inputUserStatus.value;

    if (
      email &&
      roleIds &&
      password &&
      passwordConfirmation &&
      password === passwordConfirmation &&
      emailConfirmed &&
      status
    ) {
      this.props.createUser({ email, roleIds, password, emailConfirmed, status });
      this.clearInput();
    }
  }

  isFiltered(user) {
    const { roleId, emailConfirmed, status } = this.props.users.filters;

    const notMatchRole = (
      roleId !== undefined &&
      typeof user.roles === 'object' &&
      JSON.stringify(user.roles).indexOf(roleId) === -1
    );

    const notMatchEmailConfirmed = (
      emailConfirmed !== undefined && emailConfirmed !== user.emailConfirmed
    );

    const notMatchStatus = (
      status !== undefined && status !== user.status
    );

    return !(notMatchRole || notMatchEmailConfirmed || notMatchStatus);
  }

  render() {
    const { users } = this.props;

    return (
      <Layout pageTitle={pageTitle} pageSubTitle={pageSubTitle}>
        <div>

          <div className="row">
            <section className="col-lg-12">
              {/* BOX: FILTER */}
              <div className="box box-default">
                <div className="box-header with-border">
                  <h3 className="box-title">Filter by:</h3>
                  <div className="box-tools pull-right">
                    <button type="button" className="btn btn-box-tool" data-widget="collapse">
                      <i className="fa fa-minus" />
                    </button>
                  </div>
                </div>
                {/* /.box-header */}
                {/* form start */}
                <form className="form-horizontal">
                  <div className="box-body">
                    <div className="form-group">
                      <label
                        htmlFor="inputUsersFilterRole"
                        className="col-sm-2 control-label"
                      >Role</label>
                      <div className="col-sm-10">
                        <select
                          id="inputUsersFilterRole"
                          className="form-control select2"
                          style={{ width: '100%' }}
                          ref={c => {
                            this.inputUsersFilterRole = c;
                          }}
                          onChange={event => this.onFilterChange(event, 'roleId')}
                          defaultValue={this.props.users.filters && this.props.users.filters.roleId}
                        >
                          <option value="null">All roles</option>
                          {this.props.roles.list && this.props.roles.list.map(role => (
                            <option
                              key={role.id} value={role.id}
                            >{role.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="inputUsersFilterEmailConfirmed"
                        className="col-sm-2 control-label"
                      >Email confirmed</label>
                      <div className="col-sm-10">
                        <select
                          id="inputUsersFilterEmailConfirmed"
                          className="form-control"
                          ref={c => {
                            this.inputUsersFilterEmailConfirmed = c;
                          }}
                          onChange={event => this.onFilterChange(event, 'emailConfirmed')}
                          defaultValue={
                            this.props.users.filters && this.props.users.filters.emailConfirmed
                          }
                        >
                          <option value="null">All types</option>
                          <option value="true">Yes</option>
                          <option value="false">No</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="inputUsersFilterStatus"
                        className="col-sm-2 control-label"
                      >Status</label>
                      <div className="col-sm-10">
                        <select
                          id="inputUsersFilterStatus" className="form-control"
                          ref={c => {
                            this.inputUsersFilterStatus = c;
                          }}
                          onChange={event => this.onFilterChange(event, 'status')}
                          defaultValue={this.props.users.filters && this.props.users.filters.status}
                        >
                          <option value="null">All states</option>
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  {/* /.box-body */}
                </form>
              </div>
              {/* /.col */}
            </section>
          </div>

          <div className="row">
            <section className="col-lg-12">
              {/* BOX: FORM OF CREATE A NEW USER */}
              <div className="box box-default collapsed-box">
                <div className="box-header with-border">
                  <h3 className="box-title">Create a new user</h3>
                  <div className="box-tools pull-right">
                    <button type="button" className="btn btn-box-tool" data-widget="collapse">
                      <i className="fa fa-plus" />
                    </button>
                  </div>
                </div>
                {/* /.box-header */}
                {/* form start */}
                <form className="form-horizontal">
                  <div className="box-body">
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
                    <div className="form-group">
                      <label
                        htmlFor="inputUsersRole"
                        className="col-sm-2 control-label"
                      >Role</label>
                      <div className="col-sm-10">
                        <select
                          id="inputUsersRole"
                          className="form-control select2"
                          style={{ width: '100%' }}
                          ref={c => {
                            this.inputUsersRole = c;
                          }}
                          defaultValue={this.props.users.filters && this.props.users.filters.roleId}
                        >
                          {this.props.roles.list && this.props.roles.list.map(role => (
                            <option key={role.id} value={role.id}>{role.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>
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
              </div>
              {/* /.col */}
            </section>
          </div>

          <div className="row">
            <section className="col-lg-12">
              <div className="box box-info">
                <div className="box-header with-border">
                  <h3 className="box-title">List of users</h3>
                </div>
                {/* /.box-header */}
                <div className="box-body table-responsive">
                  <UserList list={users && users.list} />
                </div>
              </div>
              {/* /.box */}
            </section>
            {/* /.col */}
          </div>

        </div>
      </Layout>
    );
  }

}

const mapState = (state) => ({
  roles: state.roles,
  users: state.users,
});

const mapDispatch = {
  getRoles,
  getUsers,
  createUser,
  getUsersFilters,
  setUsersFilters,
};

export default withStyles(s)(connect(mapState, mapDispatch)(Users));
