/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// import { defineMessages, FormattedRelative } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { getUser, updateUser, deleteUser } from '../../../../actions/users';
import { getRoles } from '../../../../actions/roles';
import { createActivity } from '../../../../actions/activities';
import Layout from '../../../../components/Layout';
import UpdateUserForm from '../UpdateUserForm';
import s from './User.css';

const pageTitle = 'User';

class User extends Component {

  static propTypes = {
    userId: PropTypes.string.isRequired,
    roles: PropTypes.object,
    users: PropTypes.object,
    getRoles: PropTypes.func,
    getUser: PropTypes.func,
    updateUser: PropTypes.func,
    deleteUser: PropTypes.func,
    createActivity: PropTypes.func,
    user: PropTypes.object,
  };

  componentWillMount() {
    this.props.getRoles();
    this.props.getUser(this.props.userId);
  }

  render() {
    const {
      userId,
      roles,
      users,
      updateUser, // eslint-disable-line no-shadow
      deleteUser, // eslint-disable-line no-shadow
    } = this.props;

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
                <UpdateUserForm
                  userId={userId}
                  roleList={roles.list}
                  userEditing={users.editing}
                  updateUser={updateUser}
                  deleteUser={deleteUser}
                  createActivity={this.props.createActivity}
                  user={this.props.user}
                />
              </div>
              {/* /.col */}
            </section>
          </div>

        </div>
      </Layout>
    );
  }

}

const mapState = state => ({
  users: state.users,
  roles: state.roles,
  user: state.user,
});

const mapDispatch = {
  getRoles,
  getUser,
  updateUser,
  deleteUser,
  createActivity,
};

export default withStyles(s)(connect(mapState, mapDispatch)(User));
