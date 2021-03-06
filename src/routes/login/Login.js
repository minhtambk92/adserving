/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* global $ */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { logUserIn } from '../../actions/users/users';
import { navigate } from '../../actions/route';
import Link from '../../components/Link';
import s from './Login.css';

class Login extends Component {

  static propTypes = {
    user: PropTypes.object,
    logUserIn: PropTypes.func,
    navigate: PropTypes.func,
  };

  componentDidMount() {
    $(() => {
      $(this.inputRememberMe).iCheck({
        checkboxClass: 'icheckbox_square-blue',
        radioClass: 'iradio_square-blue',
        increaseArea: '20%', // optional
      });

      $(this.inputRememberMe).on('ifChecked', () => {
        this.inputRememberMe.value = true;
      });

      $(this.inputRememberMe).on('ifUnchecked', () => {
        this.inputRememberMe.value = false;
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user) {
      this.props.navigate('/');
    }
  }

  login() {
    const email = this.inputUserEmail.value;
    const password = this.inputUserPassword.value;
    const rememberMe = this.inputRememberMe.value;

    this.props.logUserIn({
      email,
      password,
      rememberMe,
    });
  }

  render() {
    return (
      <div className="login-box">
        <div className="login-logo">
          <Link to="/"><b>Admin</b>LTE</Link>
        </div>
        { /* /.login-logo */ }
        <div className="login-box-body">
          <p className="login-box-msg">Sign in to start your session</p>
          <form action="/" method="post">
            <div className="form-group has-feedback">
              <input
                id="inputUserEmail"
                type="email" className="form-control" placeholder="Email"
                ref={(c) => {
                  this.inputUserEmail = c;
                }}
              />
              <span className="glyphicon glyphicon-envelope form-control-feedback" />
            </div>
            <div className="form-group has-feedback">
              <input
                id="inputUserPassword"
                type="password" className="form-control" placeholder="Password"
                ref={(c) => {
                  this.inputUserPassword = c;
                }}
              />
              <span className="glyphicon glyphicon-lock form-control-feedback" />
            </div>
            <div className="row">
              <div className="col-xs-8">
                <div className="checkbox icheck">
                  <label htmlFor="inputRememberMe">
                    <input
                      type="checkbox" id="inputRememberMe"
                      ref={(c) => {
                        this.inputRememberMe = c;
                      }}
                    /> Remember Me</label>
                </div>
              </div>
              { /* /.col */ }
              <div className="col-xs-4">
                <Link
                  to="#"
                  className="btn btn-primary btn-block btn-flat"
                  onClick={event => this.login(event)}
                >Sign In</Link>
              </div>
              { /* /.col */ }
            </div>
          </form>
          <div className="social-auth-links text-center">
            <p>- OR -</p>
            <Link
              to="#" className="btn btn-block btn-social btn-facebook btn-flat"
            ><i className="fa fa-facebook" />Sign in using Facebook</Link>
            <Link
              to="#" className="btn btn-block btn-social btn-google btn-flat"
            ><i className="fa fa-google-plus" />Sign in using Google+</Link>
          </div>
          { /* /.social-auth-links */ }
          <Link to="#">I forgot my password</Link>
          <br />
          <Link
            to="/register" className="text-center"
          >Register a new membership</Link>
        </div>
        { /* /.login-box-body */ }
      </div>
    );
  }

}

const mapState = state => ({
  user: state.user,
});

const mapDispatch = {
  logUserIn,
  navigate,
};

export default withStyles(s)(connect(mapState, mapDispatch)(Login));
