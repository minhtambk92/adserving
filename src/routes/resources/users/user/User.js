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
import { getUser, updateUser, deleteUser } from '../../../actions/users';
import Layout from '../../../components/Layout';
import Link from '../../../components/Link';
import s from './User.css';

const pageTitle = 'User';

class User extends Component {

  static propTypes = {
    userId: PropTypes.string.isRequired,
    users: PropTypes.object,
    getUser: PropTypes.func,
    updateUser: PropTypes.func,
    deleteUser: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      email: '',
      password: '',
      passwordConfirmation: '',
      emailConfirmed: '',
      status: '',
    };
  }

  componentWillMount() {
    this.props.getUser(this.props.userId);
  }

  componentWillReceiveProps(nextProps) {
    const {
      email,
      emailConfirmed,
      status,
    } = nextProps.users && (nextProps.users.editing || {});

    document.getElementById('inputUserEmail').value = email;
    document.getElementById('inputUserEmailConfirmed').value = emailConfirmed;
    document.getElementById('inputUserStatus').value = status;
  }

  onInputChange(event, field) {
    event.persist();

    this.setState(previousState => ({
      ...previousState,
      [field]: event.target.value,
    }));
  }

  updateUser() {
    const {
      email,
      password,
      passwordConfirmation,
      emailConfirmed,
      status,
    } = this.state;

    const user = { id: this.props.userId };

    if (email && email !== this.props.users.editing.email) {
      user.email = email;
    }

    if (password && passwordConfirmation && password === passwordConfirmation) {
      user.password = password;
    }

    if (emailConfirmed && emailConfirmed !== this.props.users.editing.emailConfirmed) {
      user.emailConfirmed = emailConfirmed;
    }

    if (status && status !== this.props.users.editing.status) {
      user.status = status;
    }

    this.props.updateUser(user);
  }

  deleteUser() {
    this.props.deleteUser(this.props.userId);
  }

  render() {
    return (
      <Layout
        pageTitle={
          pageTitle
            .concat(': ')
            .concat(this.props.users.editing ? this.props.users.editing.email : '...')
        }
        pageSubTitle={this.props.users.editing ? this.props.users.editing.email : ''}
      >
        <div>

          <div className="row">
            <section className="col-lg-12">
              {/* BOX: FORM OF USER INFORMATION */}
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
                          onChange={event => this.onInputChange(event, 'email')}
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
                          placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                          onChange={event => this.onInputChange(event, 'password')}
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
                          onChange={event => this.onInputChange(event, 'passwordConfirmation')}
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
                          onChange={event => this.onInputChange(event, 'emailConfirmed')}
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
                          onChange={event => this.onInputChange(event, 'status')}
                        >
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  {/* /.box-body */}
                  <div className="box-footer">
                    <Link
                      to="/resource/user" className="btn btn-app pull-right"
                    ><i className="fa fa-undo" /> Cancel</Link>
                    <Link
                      to="/resource/user" className="btn btn-app pull-right"
                      onClick={event => this.deleteUser(event)}
                    ><i className="fa fa-trash-o" /> Delete</Link>
                    {/* eslint-disable jsx-a11y/no-static-element-interactions */}
                    <a
                      className="btn btn-app pull-right"
                      onClick={event => this.updateUser(event)}
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
  users: state.users,
});

const mapDispatch = {
  getUser,
  updateUser,
  deleteUser,
};

export default withStyles(s)(connect(mapState, mapDispatch)(User));
