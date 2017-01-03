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
import Layout from '../../../../components/Layout';
import {
  getUsers,
  createUser,
  deleteUser,
  updateUser,
} from '../../../../actions/users';
import { getRoles } from '../../../../actions/roles';
import {
  setStatusCreateUser,
  setStatusUpdateUser,
} from '../../../../actions/pages/resources';
import UserList from './UserList';
import s from './User.css';

const pageTitle = 'User';

class User extends Component {

  static propTypes = {
    resourceId: PropTypes.string.isRequired,
    page: PropTypes.object,
    resources: PropTypes.object,
    getUsers: PropTypes.func,
    roles: PropTypes.object,
    users: PropTypes.object,
    getRoles: PropTypes.func,
    setStatusCreateUser: PropTypes.func,
    setStatusUpdateUser: PropTypes.func,
    createUser: PropTypes.func,
    deleteUser: PropTypes.func,
    updateUser: PropTypes.func,
  };

  componentWillMount() {
    this.props.getUsers();
    this.props.getRoles();
  }

  render() {
    return (
      <Layout
        pageTitle={pageTitle}
        pageSubTitle=""
      >
        <div>
          <UserList
            list={this.props.users.list}
            page={this.props.page}
            updateUser={this.props.updateUser}
            createUser={this.props.createUser}
            deleteUser={this.props.deleteUser}
            getUsers={this.props.getUsers}
            users={this.props.users}
            roleList={this.props.roles.list}
            setStatusCreateUser={this.props.setStatusCreateUser}
            setStatusUpdateUser={this.props.setStatusUpdateUser}
          />
        </div>
      </Layout>
    );
  }

}

const mapState = (state) => ({
  resources: state.resources,
  users: state.users,
  page: state.page.resources,
  roles: state.roles,
});

const mapDispatch = {
  getUsers,
  setStatusCreateUser,
  setStatusUpdateUser,
  createUser,
  deleteUser,
  updateUser,
  getRoles,
};

export default withStyles(s)(connect(mapState, mapDispatch)(User));
