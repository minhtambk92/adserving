import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Layout from '../../components/Layout';
import Link from '../../components/Link';
import s from './Login.css';
import { submitLoginUser, checkEmailExist } from '../../actions/users';
import {
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL_PASSWORD,
  USER_LOGIN_NOT_EXISTS
} from '../../constants';

class Login extends Component {
  static propTypes = {
    // Wrap all content props to one parent props
    content: PropTypes.shape({
      // Document title
      title: PropTypes.string.isRequired,
    }).isRequired,
    // Define page layout
    isFullWidth: PropTypes.bool,
    userLoginReducers: PropTypes.object,
    submitLoginUser: PropTypes.func,
    emailExist: PropTypes.bool,
    statusLogin: PropTypes.string,
    checkEmailExist: PropTypes.func,
  };

  componentDidMount() {
    require('admin-lte/plugins/iCheck/icheck.min.js'); // eslint-disable-line
                                                       // react/require-extension, max-len,
                                                       // global-require

    $(() => {
      $('input').iCheck({
        checkboxClass: 'icheckbox_square-blue',
        radioClass: 'iradio_square-blue',
        increaseArea: '20%', // optional
      });
    });
  }

  loginUser() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    if (email.trim() !== '' && password.trim() !== '') {
      this.props.submitLoginUser({ email, password }).then(() => {
        if (this.props.statusLogin === USER_LOGIN_SUCCESS) {
          window.location.href = '/';
        } else if (this.props.statusLogin === USER_LOGIN_FAIL_PASSWORD) {
          document.getElementById('password-err').innerHTML = ('Password not correct');
          document.getElementById('password').parentNode.setAttribute('class', 'form-group has-error has-feedback');
          setTimeout(function () {
            document.getElementById('password').focus();
            document.getElementById('password').value = null;
            document.getElementById('password-err').innerHTML = ('');
            document.getElementById('password').parentNode.setAttribute('class', 'form-group has-feedback');
          }, 2000);
        }
      });
    }
  }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  validate() {
    const email = document.getElementById('email').value;
    if (this.validateEmail(email)) {
      this.props.checkEmailExist({ email }).then(() => {
        if (this.props.emailExist === true) {
          document.getElementById('email').parentNode.setAttribute('class', 'form-group has-success has-feedback');
          document.getElementById('email-err').innerHTML = ('Email correct');
          setTimeout(function () {
            document.getElementById('email').parentNode.setAttribute('class', 'form-group has-feedback');
            document.getElementById('email-err').innerHTML = ('');
          }, 2000);
        } else if (this.props.emailExist === false) {
          document.getElementById('email').parentNode.setAttribute('class', 'form-group has-error has-feedback');
          document.getElementById('email-err').innerHTML = ('Email not exist');
          setTimeout(function () {
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

  render() {
    return (
      <Layout bodyClasses="hold-transition login-page" isFullWidth>
        <div>
          <div className="login-box">
            <div className="login-logo">
              <Link to="/index2"><b>Admin</b>LTE</Link>
            </div>
            { /* /.login-logo */ }
            <div className="login-box-body">
              <p className="login-box-msg">
                Sign in to start your session
              </p>
              <form role="form">
                <div className="form-group has-feedback">
                  <input type="email" id="email" className="form-control"
                         onBlur={event => this.validate(event)}
                         placeholder="Email" />
                  <span className="glyphicon glyphicon-envelope form-control-feedback" />
                  <span id="email-err" className="help-block"></span>
                </div>
                <div className="form-group has-feedback">
                  <input type="password" id="password" className="form-control"
                         placeholder="Password" />
                  <span className="glyphicon glyphicon-lock form-control-feedback" />
                  <span id="password-err" className="help-block"></span>
                </div>

                <div className="form-group has-error">
                  <label className="control-label" htmlFor="inputError">
                    <i className="fa fa-times-circle-o" /> Input with error
                  </label><input type="text" className="form-control"
                                 id="inputError"
                                 placeholder="Enter ..." /><span
                  className="help-block">Help block with error</span></div>

                <div className="row">
                  <div className="col-xs-8">
                    <div className="checkbox icheck">
                      <label><input type="checkbox" /> Remember Me</label>
                    </div>
                  </div>
                  { /* /.col */ }
                  <div className="col-xs-4">
                    <button type="button" onClick={event => this.loginUser(event)}
                            className="btn btn-primary btn-block btn-flat">
                      Sign In
                    </button>
                  </div>
                  { /* /.col */ }
                </div>
              </form>
              <div className="social-auth-links text-center">
                <p>
                  - OR -
                </p>
                <Link to="#" className="btn btn-block btn-social btn-facebook btn-flat">
                  <i className="fa fa-facebook" />
                  Sign in using Facebook
                </Link>
                <Link to="#" className="btn btn-block btn-social btn-google btn-flat">
                  <i className="fa fa-google-plus" />
                  Sign in using Google+
                </Link>
              </div>
              { /* /.social-auth-links */ }
              <Link to="#">I forgot my password</Link>
              <br />
              <Link to="/pages/examples/register" className="text-center">
                Register a new membership
              </Link>
            </div>
            { /* /.login-box-body */ }
          </div>
        </div>
      </Layout>
    );
  }

}

const mapState = (state) => ({
  userLoginReducers: state.users.userLoginReducers,
  isAuthenticated: state.users.userLoginReducers.isAuthenticated,
  emailExist: state.users.checkEmail.emailExist,
});

const mapDispatch = {
  submitLoginUser,
  checkEmailExist,
};

export default withStyles(s)(connect(mapState, mapDispatch)(Login));
