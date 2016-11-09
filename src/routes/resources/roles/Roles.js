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
import { getRoles, createRole, getRolesFilters, setRolesFilters } from '../../../actions/roles';
import { setUsersFilters } from '../../../actions/users';
import Layout from '../../../components/Layout';
import CreateRoleForm from './CreateRoleForm';
import RoleList from './RoleList';
import s from './Roles.css';

const pageTitle = 'Roles Management';
const pageSubTitle = 'Control panel';

class Roles extends Component {

  static propTypes = {
    roles: PropTypes.object,
    getRoles: PropTypes.func,
    createRole: PropTypes.func,
    setUsersFilters: PropTypes.func,
    getRolesFilters: PropTypes.func,
    setRolesFilters: PropTypes.func,
  };

  componentWillMount() {
    this.props.getRolesFilters();
    this.props.getRoles();
  }

  getFilteredRoles() {
    return _.filter(this.props.roles.list, role => this.isFiltered(role));
  }

  isFiltered(role) {
    const { status } = this.props.roles.filters;

    const notMatchStatus = (
      status !== undefined && status !== role.status
    );

    return !(notMatchStatus);
  }

  render() {
    return (
      <Layout pageTitle={pageTitle} pageSubTitle={pageSubTitle}>
        <div>

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
                <CreateRoleForm createRole={this.props.createRole} />
              </div>
              {/* /.col */}
            </section>
          </div>

          <div className="row">
            <section className="col-lg-12">
              {/* BOX: LIST */}
              <div className="box box-info">
                <div className="box-header with-border">
                  <h3 className="box-title">List of resources</h3>
                </div>
                {/* /.box-header */}
                <div className="box-body">
                  <RoleList
                    list={this.getFilteredRoles()}
                    setUsersFilters={this.props.setUsersFilters}
                  />
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
});

const mapDispatch = {
  getRoles,
  createRole,
  setUsersFilters,
  getRolesFilters,
  setRolesFilters,
};

export default withStyles(s)(connect(mapState, mapDispatch)(Roles));
