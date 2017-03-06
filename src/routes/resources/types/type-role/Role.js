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
  getRoles,
  createRole,
  deleteRole,
  updateRole,
} from '../../../../actions/role/roles';
import {
  setStatusCreateRole,
  setStatusUpdateRole,
} from '../../../../actions/pages/resources';
import RoleList from './RoleList';
import s from './Role.css';

const pageTitle = 'Role';

class Role extends Component {

  static propTypes = {
    resourceId: PropTypes.string.isRequired,
    page: PropTypes.object,
    resources: PropTypes.object,
    getRoles: PropTypes.func,
    roles: PropTypes.object,
    setStatusCreateRole: PropTypes.func,
    setStatusUpdateRole: PropTypes.func,
    createRole: PropTypes.func,
    deleteRole: PropTypes.func,
    updateRole: PropTypes.func,
  };

  componentWillMount() {
    this.props.getRoles();
  }

  render() {
    return (
      <Layout
        pageTitle={pageTitle}
        pageSubTitle=""
      >
        <div>
          <RoleList
            list={this.props.roles.list}
            page={this.props.page}
            updateRole={this.props.updateRole}
            createRole={this.props.createRole}
            deleteRole={this.props.deleteRole}
            getRoles={this.props.getRoles}
            roles={this.props.roles}
            setStatusCreateRole={this.props.setStatusCreateRole}
            setStatusUpdateRole={this.props.setStatusUpdateRole}
          />
        </div>
      </Layout>
    );
  }

}

const mapState = state => ({
  resources: state.resources,
  roles: state.roles,
  page: state.page.resources,
});

const mapDispatch = {
  getRoles,
  setStatusCreateRole,
  setStatusUpdateRole,
  createRole,
  deleteRole,
  updateRole,
};

export default withStyles(s)(connect(mapState, mapDispatch)(Role));
