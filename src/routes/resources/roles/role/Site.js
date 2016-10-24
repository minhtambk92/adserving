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
import { getRole, updateRole, deleteRole } from '../../../../actions/roles';
import Layout from '../../../../components/Layout';
import Link from '../../../../components/Link';
import s from './Role.css';

const pageTitle = 'Role';

class Role extends Component {

  static propTypes = {
    roleId: PropTypes.string.isRequired,
    roles: PropTypes.object,
    getRole: PropTypes.func,
    updateRole: PropTypes.func,
    deleteRole: PropTypes.func,
  };

  componentWillMount() {
    this.props.getRole(this.props.roleId);
  }

  componentWillReceiveProps(nextProps) {
    const {
      uniqueName,
      name,
    } = nextProps.roles && (nextProps.roles.editing || {});

    this.inputRoleUniqueName.value = uniqueName;
    this.inputRoleName.value = name;
  }

  clearInput() {
    this.inputRoleUniqueName.value = null;
    this.inputRoleName.value = null;
  }

  updateRole() {
    const {
      uniqueName,
      name,
    } = this.state;

    const role = { id: this.props.roleId };

    if (uniqueName && uniqueName !== this.props.roles.editing.uniqueName) {
      role.uniqueName = uniqueName;
    }

    if (name && name !== this.props.roles.editing.name) {
      role.name = name;
    }

    this.props.updateRole(role);
  }

  deleteRole() {
    this.props.deleteRole(this.props.roleId);
  }

  render() {
    return (
      <Layout
        pageTitle={
          pageTitle
            .concat(': ')
            .concat(this.props.roles.editing ? this.props.roles.editing.name : '...')
        }
        pageSubTitle={this.props.roles.editing ? this.props.roles.editing.uniqueName : ''}
      >
        <div>

          <div className="row">
            <section className="col-lg-12">
              {/* BOX: UPDATE */}
              <div className="box box-primary">
                <div className="box-header with-border">
                  <h3 className="box-title">Change role information</h3>
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
                        htmlFor="inputRoleUniqueName" className="col-sm-3 control-label"
                      >Webrole domain</label>
                      <div className="col-sm-9">
                        <input
                          type="text" className="form-control" id="inputRoleUniqueName"
                          placeholder="admin"
                          ref={c => {
                            this.inputRoleUniqueName = c;
                          }}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="inputRoleName" className="col-sm-3 control-label">Name</label>
                      <div className="col-sm-9">
                        <input
                          type="text" className="form-control" id="inputRoleName"
                          placeholder="Administrator"
                          ref={c => {
                            this.inputRoleName = c;
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  {/* /.box-body */}
                  <div className="box-footer">
                    {/* eslint-disable jsx-a11y/no-static-element-interactions */}
                    <Link
                      to="/resource/role"
                      className="btn btn-app pull-right"
                    ><i className="fa fa-undo" /> Cancel</Link>
                    <Link
                      to="/resource/role"
                      className="btn btn-app pull-right"
                      onClick={event => this.deleteRole(event)}
                    ><i className="fa fa-trash-o" /> Delete</Link>
                    <a
                      className="btn btn-app pull-right"
                      onClick={event => this.updateRole(event)}
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
  roles: state.roles,
});

const mapDispatch = {
  getRole,
  updateRole,
  deleteRole,
};

export default withStyles(s)(connect(mapState, mapDispatch)(Role));
