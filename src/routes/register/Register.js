import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Layout from '../../components/Layout';
import Link from '../../components/Link';
import s from './Register.css';

class Register extends Component {

  componentDidMount() {
    /* eslint-disable no-undef */
    $(() => {
      $('input').iCheck({
        checkboxClass: 'icheckbox_square-blue',
        radioClass: 'iradio_square-blue',
        increaseArea: '20%', // optional
      });
    });
    /* eslint-enable no-undef */
  }

  render() {
    return (
      <Layout bodyClasses="hold-transition register-page" isFullWidth>
        <div>
          <div className="register-box">
            <div className="register-logo">
              <Link to="/"><b>Admin</b>LTE</Link>
            </div>
            <div className="register-box-body">
              <p className="login-box-msg">Register a new membership</p>
              <form action="/" method="post">
                <div className="form-group has-feedback">
                  <input type="text" className="form-control" placeholder="Full name" />
                  <span className="glyphicon glyphicon-user form-control-feedback" />
                </div>
                <div className="form-group has-feedback">
                  <input type="email" className="form-control" placeholder="Email" />
                  <span className="glyphicon glyphicon-envelope form-control-feedback" />
                </div>
                <div className="form-group has-feedback">
                  <input type="password" className="form-control" placeholder="Password" />
                  <span className="glyphicon glyphicon-lock form-control-feedback" />
                </div>
                <div className="form-group has-feedback">
                  <input type="password" className="form-control" placeholder="Retype password" />
                  <span className="glyphicon glyphicon-log-in form-control-feedback" />
                </div>
                <div className="row">
                  <div className="col-xs-8">
                    <div className="checkbox icheck">
                      <label htmlFor="inputAgreeTerms">
                        <input
                          id="inputAgreeTerms"
                          type="checkbox"
                          ref={c => {
                            this.inputAgreeTerms = c;
                          }}
                        /> I agree to the <Link to="#">terms</Link>
                      </label>
                    </div>
                  </div>
                  {/* /.col */}
                  <div className="col-xs-4">
                    <button
                      className="btn btn-primary btn-block btn-flat" type="submit"
                    >Register</button>
                  </div>
                  {/* /.col */}
                </div>
              </form>
              <div className="social-auth-links text-center">
                <p>- OR -</p>
                <Link
                  to="#"
                  className="btn btn-block btn-social btn-facebook btn-flat"
                ><i className="fa fa-facebook" /> Sign up using Facebook</Link>
                <Link
                  to="#"
                  className="btn btn-block btn-social btn-google btn-flat"
                ><i className="fa fa-google-plus" /> Sign up using Google+</Link>
              </div>
              <Link
                to="/login" className="text-center"
              >I already have a membership</Link>
            </div>
            {/* /.form-box */}
          </div>
        </div>
      </Layout>
    );
  }

}

export default withStyles(s)(Register);
