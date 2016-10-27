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
import Link from '../../../components/Link';
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
    // $('#example1').DataTable(); // eslint-disable-line new-cap

    // iCheck for checkbox and radio inputs
    $('input[type="checkbox"].inputChooseUser').iCheck({
      checkboxClass: 'icheckbox_minimal-blue',
      radioClass: 'iradio_minimal-blue',
    });
    /* eslint-enable no-undef */
  }

  componentDidUpdate() {
    /* eslint-disable no-undef */
    // iCheck for checkbox and radio inputs
    $('input[type="checkbox"].inputChooseUser').iCheck({
      checkboxClass: 'icheckbox_minimal-blue',
      radioClass: 'iradio_minimal-blue',
    });
    /* eslint-enable no-undef */
  }

  async onFilterChange(event, field) {
    event.persist();

    await this.props.setUsersFilters({
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

  searchFor(event) {
    event.persist();
    this.setState((previousState) => ({
      ...previousState,
      searchText: event.target.value.trim(),
    }));
  }

  isIndexOf(...args) {
    for (let i = 0; i < args.length; i += 1) {
      if (args[i].toLowerCase().indexOf(this.state.searchText.toLowerCase()) !== -1) {
        return true;
      }
    }
    return false;
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
              {/* BOX: LIST OF USERS */}
              <div className="box box-info">
                <div className="box-header with-border">
                  <h3 className="box-title">List of users</h3>

                  <div className="box-tools">
                    <div className="input-group input-group-sm" style={{ width: 150 }}>
                      <input
                        type="text" name="inputSearchUsers"
                        className="form-control pull-right"
                        placeholder="Search..."
                        onChange={event => this.searchFor(event)}
                      />
                      <div className="input-group-btn">
                        <button
                          type="submit" className="btn btn-default"
                        ><i className="fa fa-search" /></button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /.box-header */}
                <div className="box-body table-responsive no-padding">
                  <table id="example1" className="table table-hover">
                    <thead>
                      <tr>
                        <th><input type="checkbox" className="inputChooseUser" /></th>
                        <th>Email</th>
                        <th>Email confirmed</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.props.users.list && this.props.users.list.map(user => {
                        if (this.isFiltered(user)) {
                          return (
                            <tr key={user.id}>
                              <td><input type="checkbox" className="inputChooseUser" /></td>
                              <td>
                                <Link
                                  to={`/resource/user/${user.id}`}
                                ><strong>{user.email}</strong></Link>
                              </td>
                              <td>{user.emailConfirmed ? 'yes' : 'no'}</td>
                              <td>{user.status}</td>
                            </tr>
                          );
                        }

                        return false;
                      })}
                    </tbody>
                    <tfoot>
                      <tr>
                        <th><input type="checkbox" className="inputChooseUser" /></th>
                        <th>Email</th>
                        <th>Email confirmed</th>
                        <th>Status</th>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                {/* /.box-body */}
                <div className="box-footer clearfix">
                  <ul className="pagination pagination-sm no-margin pull-right">
                    <li><a>&laquo;</a></li>
                    <li><a>1</a></li>
                    <li><a>2</a></li>
                    <li><a>3</a></li>
                    <li><a>&raquo;</a></li>
                  </ul>
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
