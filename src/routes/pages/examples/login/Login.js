import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Layout from '../../../../components/Layout';
import Link from '../../../../components/Link';
import s from './Login.css';

class Login extends Component {

  componentDidMount() {
    $(function () {
      $('input').iCheck({
        checkboxClass: 'icheckbox_square-blue',
        radioClass: 'iradio_square-blue',
        increaseArea: '20%', // optional
      });
    });
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
              <form action="/index2" method="post">
                <div className="form-group has-feedback">
                  <input type="email" className="form-control" placeholder="Email"/>
                  <span className="glyphicon glyphicon-envelope form-control-feedback"/>
                </div>
                <div className="form-group has-feedback">
                  <input type="password" className="form-control" placeholder="Password"/>
                  <span className="glyphicon glyphicon-lock form-control-feedback"/>
                </div>
                <div className="row">
                  <div className="col-xs-8">
                    <div className="checkbox icheck">
                      <label><input type="checkbox"/> Remember Me</label>
                    </div>
                  </div>
                  { /* /.col */ }
                  <div className="col-xs-4">
                    <button type="submit" className="btn btn-primary btn-block btn-flat">
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
                  <i className="fa fa-facebook"/>
                  Sign in using Facebook
                </Link>
                <Link to="#" className="btn btn-block btn-social btn-google btn-flat">
                  <i className="fa fa-google-plus"/>
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

export default withStyles(s)(Login);
