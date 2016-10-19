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
import { getUsers, createUser } from '../../actions/users';
import Layout from '../../components/Layout';
import Link from '../../components/Link';
import s from './Users.css';

const pageTitle = 'Users Management';
const pageSubTitle = 'Control panel';

class Users extends Component {

  static propTypes = {
    users: PropTypes.object,
    getUsers: PropTypes.func,
    createUser: PropTypes.func,
  };

  componentWillMount() {
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

  clearInput(event) { // eslint-disable-line no-unused-vars, class-methods-use-this
    document.getElementById('inputUserEmail').value = null;
    document.getElementById('inputUserPassword').value = null;
    document.getElementById('inputUserPasswordConfirmation').value = null;
    document.getElementById('inputUserEmailConfirmed').value = null;
    document.getElementById('inputUserStatus').value = null;
  }

  createUser(event) { // eslint-disable-line no-unused-vars
    const email = document.getElementById('inputUserEmail').value;
    const password = document.getElementById('inputUserPassword').value;
    const passwordConfirmation = document.getElementById('inputUserPasswordConfirmation').value;
    const description = document.getElementById('inputUserEmailConfirmed').value;
    const status = document.getElementById('inputUserStatus').value;

    if (
      email &&
      password &&
      passwordConfirmation &&
      password === passwordConfirmation &&
      description &&
      status
    ) {
      this.props.createUser({ email, password, passwordConfirmation, description, status });
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

  render() {
    return (
      <Layout pageTitle={pageTitle} pageSubTitle={pageSubTitle}>
        <div>

          <div className="row">
            <section className="col-lg-12">
              {/* BOX: FORM OF CREATE A NEW USER */}
              <div className="box box-primary collapsed-box">
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
                        />
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
                          placeholder="123456789"
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
                          placeholder="123456789"
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
                      className={'btn btn-app pull-right '.concat(s.btn)}
                      onClick={event => this.clearInput(event)}
                    ><i className="fa fa-eraser" /> Clear</a>
                    <a
                      className={'btn btn-app pull-right '.concat(s.btn)}
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
                      {this.props.users.list && this.props.users.list.map(user => (
                        <tr key={user.id}>
                          <td><input type="checkbox" className="inputChooseUser" /></td>
                          <td><Link to={`/user/${user.id}`}>{user.email}</Link></td>
                          <td>{user.emailConfirmed ? 'yes' : 'no'}</td>
                          <td>{user.status}</td>
                        </tr>
                      ))}
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
  users: state.users,
});

const mapDispatch = {
  getUsers,
  createUser,
};

export default withStyles(s)(connect(mapState, mapDispatch)(Users));
