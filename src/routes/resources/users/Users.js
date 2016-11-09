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
import _ from 'lodash';
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
import FilterUsersForm from './FilterUsersForm';
import CreateUserForm from './CreateUserForm';
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

  onFilterChange(event, field) {
    event.persist();

    this.props.setUsersFilters({
      [field]: event.target.value,
    });
  }

  getFilteredUsers() {
    return _.filter(this.props.users.list, user => this.isFiltered(user));
  }

  isFiltered(user) {
    const { roleUniqueName, emailConfirmed, status } = this.props.users.filters;

    const notMatchRole = (
      roleUniqueName !== undefined &&
      typeof user.roles === 'object' &&
      JSON.stringify(user.roles).indexOf(roleUniqueName) === -1
    );

    const notMatchEmailConfirmed = (
      emailConfirmed !== undefined && emailConfirmed !== user.emailConfirmed
    );

    const notMatchStatus = (
      status !== undefined && status !== user.status
    );

    return !(notMatchRole || notMatchEmailConfirmed || notMatchStatus);
  }

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
        emailConfirmed,
        status,
      });

      this.clearInput();
    }
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
                <FilterUsersForm
                  roles={this.props.roles.list}
                  filters={this.props.users.filters}
                  setUsersFilters={this.props.setUsersFilters}
                />
              </div>
              {/* /.col */}
            </section>
          </div>

          <div className="row">
            <section className="col-lg-12">
              {/* BOX: CREATE */}
              <div className="box box-primary collapsed-box">
                <div className="box-header with-border">
                  <h3 className="box-title">Create a new resource</h3>
                  <div className="box-tools pull-right">
                    <button type="button" className="btn btn-box-tool" data-widget="collapse">
                      <i className="fa fa-plus" />
                    </button>
                  </div>
                </div>
                {/* /.box-header */}
                <CreateUserForm
                  filters={this.props.users.filters}
                  roles={this.props.roles.list}
                  createUser={this.props.createUser}
                />
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
                <div className="box-body">
                  <UserList list={this.getFilteredUsers()} />
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
