import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Layout from '../../../../components/Layout';
import Link from '../../../../components/Link';
import s from './Register.css';

class Register extends Component {

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
      <Layout bodyClasses="hold-transition register-page" isFullWidth>
        <div>
          <div className="register-box">
            <div className="register-logo">
              <Link to="/index2"><b>Admin</b>LTE</Link>
            </div>
            <div className="register-box-body">
              <p className="login-box-msg">Register a new membership</p>
              <form action="/index2" method="post">
                <div className="form-group has-feedback">
                  <input type="text" className="form-control" placeholder="Full name"/>
                  <span className="glyphicon glyphicon-user form-control-feedback"/>
                </div>
                <div className="form-group has-feedback">
                  <input type="email" className="form-control" placeholder="Email"/>
                  <span className="glyphicon glyphicon-envelope form-control-feedback"/>
                </div>
                <div className="form-group has-feedback">
                  <input type="password" className="form-control" placeholder="Password"/>
                  <span className="glyphicon glyphicon-lock form-control-feedback"/>
                </div>
                <div className="form-group has-feedback">
                  <input type="password" className="form-control" placeholder="Retype password"/>
                  <span className="glyphicon glyphicon-log-in form-control-feedback"/>
                </div>
                <div className="row">
                  <div className="col-xs-8">
                    <div className="checkbox icheck">
                      <label>
                        <input type="checkbox"/> I agree to the <Link to="#">terms</Link>
                      </label>
                    </div>
                  </div>
                  {/* /.col */}
                  <div className="col-xs-4">
                    <button type="submit" className="btn btn-primary btn-block btn-flat">Register
                    </button>
                  </div>
                  {/* /.col */}
                </div>
              </form>
              <div className="social-auth-links text-center">
                <p>- OR -</p>
                <Link to="#" className="btn btn-block btn-social btn-facebook btn-flat"><i
                  className="fa fa-facebook"/> Sign up using
                  Facebook</Link>
                <Link to="#" className="btn btn-block btn-social btn-google btn-flat"><i
                  className="fa fa-google-plus"/> Sign up using
                  Google+</Link>
              </div>
              <Link to="/pages/examples/login" className="text-center">I already have a
                membership</Link>
            </div>
            {/* /.form-box */}
          </div>
        </div>
      </Layout>
    );
  }

}

export default withStyles(s)(Register);
