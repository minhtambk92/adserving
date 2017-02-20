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
import Layout from '../../../../components/Layout';
import {
  getPermissions,
  createPermission,
  deletePermission,
  updatePermission,
} from '../../../../actions/permissions';
import {
  setStatusCreatePermission,
  setStatusUpdatePermission,
} from '../../../../actions/pages/resources';
import PermissionList from './PermissionList';
import s from './Permission.css';

const pageTitle = 'Permission';

class Permission extends Component {

  static propTypes = {
    resourceId: PropTypes.string.isRequired,
    page: PropTypes.object,
    resources: PropTypes.object,
    getPermissions: PropTypes.func,
    permissions: PropTypes.object,
    setStatusCreatePermission: PropTypes.func,
    setStatusUpdatePermission: PropTypes.func,
    createPermission: PropTypes.func,
    deletePermission: PropTypes.func,
    updatePermission: PropTypes.func,
  };

  componentWillMount() {
    this.props.getPermissions();
  }

  render() {
    return (
      <Layout
        pageTitle={pageTitle}
        pageSubTitle=""
      >
        <div>
          <PermissionList
            list={this.props.permissions.list}
            page={this.props.page}
            updatePermission={this.props.updatePermission}
            createPermission={this.props.createPermission}
            deletePermission={this.props.deletePermission}
            getPermissions={this.props.getPermissions}
            permissions={this.props.permissions}
            setStatusCreatePermission={this.props.setStatusCreatePermission}
            setStatusUpdatePermission={this.props.setStatusUpdatePermission}
          />
        </div>
      </Layout>
    );
  }

}

const mapState = state => ({
  resources: state.resources,
  permissions: state.permissions,
  page: state.page.resources,
});

const mapDispatch = {
  getPermissions,
  setStatusCreatePermission,
  setStatusUpdatePermission,
  createPermission,
  deletePermission,
  updatePermission,
};

export default withStyles(s)(connect(mapState, mapDispatch)(Permission));
