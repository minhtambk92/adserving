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
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Link from '../../components/Link';
import Layout from '../../components/Layout';
import s from './Register.css';
import { submitRegisterUser, checkEmailExist } from '../../actions/users';
class Register extends Component {

  static propTypes = {
    // Wrap all content props to one parent props
    content: PropTypes.shape({
      // Document title
      title: PropTypes.string.isRequired,
    }).isRequired,
    // Define page layout
    isFullWidth: PropTypes.bool,
    userRegisterReducers: PropTypes.object,
    emailExist: PropTypes.bool,
    checkEmailExist: PropTypes.func,
    submitRegisterUser: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);

    if (context.setTitle) {
      context.setTitle(this.props.content.title);
    }

    if (context.setBodyClasses) {
      context.setBodyClasses('hold-transition register-page');
    }
  }

  componentDidMount() {
    require('admin-lte/plugins/iCheck/icheck.min.js'); // eslint-disable-line
                                                       // react/require-extension, max-len,
                                                       // global-require

    $(() => { // eslint-disable-line no-undef, func-names
      $('input').iCheck({ // eslint-disable-line no-undef
        checkboxClass: 'icheckbox_square-blue',
        radioClass: 'iradio_square-blue',
        increaseArea: '20%', // optional
      });
    });
  }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  validate() {
    const email = document.getElementById('email').value;
    if (this.validateEmail(email)) {
      this.props.checkEmailExist({ email }).then(() => {
        if (this.props.emailExist === false) {
          document.getElementById('email').parentNode.setAttribute('class', 'form-group has-success has-feedback');
          document.getElementById('email-err').innerHTML = ('Email can used');
          setTimeout(function () {
            document.getElementById('email').parentNode.setAttribute('class', 'form-group has-feedback');
            document.getElementById('email-err').innerHTML = ('');
          }, 2000);
        } else if (this.props.emailExist === true) {
          document.getElementById('email').parentNode.setAttribute('class', 'form-group has-error has-feedback');
          document.getElementById('email-err').innerHTML = ('Email has been used');
          setTimeout(function () {
            document.getElementById('email').focus();
            document.getElementById('email').value = null;
            document.getElementById('email').parentNode.setAttribute('class', 'form-group has-feedback');
            document.getElementById('email-err').innerHTML = ('');
          }, 2000);
        }
      });
    } else {
      document.getElementById('email').parentNode.setAttribute('class', 'form-group has-error has-feedback');
      document.getElementById('email-err').innerHTML = ('Please input email correct');
      setTimeout(function () {
        document.getElementById('email').focus();
        document.getElementById('email').value = null;
        document.getElementById('email').parentNode.setAttribute('class', 'form-group has-feedback');
        document.getElementById('email-err').innerHTML = ('');
      }, 2000);
    }
    return false;
  }

  registerUser() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('retype-password').value;
    if (password !== confirmPassword) {
      document.getElementById('retype-password').value = null;
      setTimeout(function () {
        document.getElementById('retype-password').parentNode.setAttribute('class', 'form-group has-error has-feedback');
        document.getElementById('retype-password').parentNode.setAttribute('class', 'form-group has-feedback');
      }, 2000);
    } else if (username.trim() === '') {
      document.getElementById('username').parentNode.setAttribute('class', 'form-group has-error has-feedback');
      setTimeout(function () {
        document.getElementById('username').parentNode.setAttribute('class', 'form-group has-feedback');
      }, 2000);
    } else if (email.trim() === '') {
      document.getElementById('email').parentNode.setAttribute('class', 'form-group has-error has-feedback');
      setTimeout(function () {
        document.getElementById('email').parentNode.setAttribute('class', 'form-group has-feedback');
      }, 2000);
    } else if (password.trim() === '') {
      document.getElementById('password').parentNode.setAttribute('class', 'form-group has-error has-feedback');
      setTimeout(function () {
        document.getElementById('password').parentNode.setAttribute('class', 'form-group has-feedback');
      }, 2000);
    } else if (confirmPassword.trim() === '') {
      document.getElementById('retype-password').parentNode.setAttribute('class', 'form-group has-error has-feedback');
      setTimeout(function () {
        document.getElementById('retype-password').parentNode.setAttribute('class', 'form-group has-feedback');
      }, 2000);
    }
    if ((username.trim() !== '') && email.trim() !== '' && (password.trim() !== '') && (confirmPassword.trim() !== '')) {
      this.props.submitRegisterUser({ email, username, password }).then(() => {
        if (this.props.userRegisterReducers.statusRegister === 'success') {
          document.getElementById('title-register').innerHTML = ('Register user success');
          setTimeout(function () {
            window.location.href = '/login';
          }, 2000);
        }
      });
    }
  }

  render() {
    return (
      <Layout bodyClasses="hold-transition register-page" isFullWidth>
        <div>
          <div className="register-box">
            <div className="register-logo">
              <Link to="/"><b>ADMICRO</b></Link>
            </div>
            <div className="register-box-body">
              <p id="title-register" className="login-box-msg">Register a new membership</p>
              <form role="form">
                <div className="form-group has-feedback">
                  <input type="text" id="username" className="form-control username"
                         placeholder="Username" />
                  <span className="glyphicon glyphicon-user form-control-feedback" />
                </div>
                <div className="form-group has-feedback">
                  <input type="email" id="email" className="form-control email"
                         onBlur={event => this.validate(event)}
                         placeholder="Email" />
                  <span className="glyphicon glyphicon-envelope form-control-feedback" />
                  <span id="email-err" className="help-block"></span>
                </div>
                <div className="form-group has-feedback">
                  <input type="password" id="password" className="form-control password"
                         placeholder="Password" />
                  <span className="glyphicon glyphicon-lock form-control-feedback" />
                </div>
                <div className="form-group has-feedback">
                  <input type="password" id="retype-password"
                         className="form-control retype-password" placeholder="Retype password" />
                  <span className="glyphicon glyphicon-log-in form-control-feedback" />
                </div>
                <div className="row">
                  <div className="col-xs-8">
                    <div className="checkbox icheck">
                      <label htmlFor>
                        <input type="checkbox" /> I agree to the <Link to="#">terms</Link>
                      </label>
                    </div>
                  </div>
                  { /* /.col */ }
                  <div className="col-xs-4">
                    <button type="button" className="btn btn-primary btn-block btn-flat"
                            onClick={event => this.registerUser(event)}>Register
                    </button>
                  </div>
                  { /* /.col */ }
                </div>
              </form>
              <div className="social-auth-links text-center">
                <p>- OR -</p>
                <Link to="#" className="btn btn-block btn-social btn-facebook btn-flat"><i
                  className="fa fa-facebook"
                /> Sign up using Facebook</Link>
                <Link to="#" className="btn btn-block btn-social btn-google btn-flat"><i
                  className="fa fa-google-plus"
                /> Sign up using Google+</Link>
              </div>
              <Link to="/login" className="text-center">I already have a membership</Link>
            </div>
            { /* /.form-box */ }
          </div>
        </div>
      </Layout>
    );
  }
}

const mapState = (state) => ({
  userRegisterReducers: state.users.userRegisterReducers,
  isAuthenticated: state.users.userLoginReducers.isAuthenticated,
  emailExist: state.users.checkEmail.emailExist,
});

const mapDispatch = {
  submitRegisterUser,
  checkEmailExist,
};

export default withStyles(s)(connect(mapState, mapDispatch)(Register));
