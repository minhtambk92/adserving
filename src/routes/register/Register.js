import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { registerUser } from '../../actions/users';
import Layout from '../../components/Layout';
import Link from '../../components/Link';
import s from './Register.css';

class Register extends Component {

  static propTypes = {
    user: PropTypes.object,
    registerUser: PropTypes.func,
  };

  componentDidMount() {
    /* eslint-disable no-undef */
    $(() => {
      $('input').iCheck({
        checkboxClass: 'icheckbox_square-blue',
        radioClass: 'iradio_square-blue',
        increaseArea: '20%', // optional
      });
    });

    $(this.inputAgreeTerms).on('ifChecked', () => {
      this.inputAgreeTerms.value = true;
    });

    $(this.inputAgreeTerms).on('ifUnchecked', () => {
      this.inputAgreeTerms.value = false;
    });
    /* eslint-enable no-undef */
  }

  registerUser() {
    const email = this.inputUserEmail.value;
    const password = this.inputUserPassword.value;
    const passwordConfirmation = this.inputUserPasswordConfirmation.value;
    const fullName = this.inputUserFullName.value;
    const agreeTerms = this.inputAgreeTerms.value;

    if (agreeTerms === 'true' && password && password === passwordConfirmation) {
      this.props.registerUser({
        email,
        password,
        fullName,
      });
    }
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
              <form>
                <div className="form-group has-feedback">
                  <input
                    id="inputUserFullName"
                    type="text" className="form-control" placeholder="Full name"
                    ref={c => {
                      this.inputUserFullName = c;
                    }}
                  />
                  <span className="glyphicon glyphicon-user form-control-feedback" />
                </div>
                <div className="form-group has-feedback">
                  <input
                    id="inputUserEmail"
                    type="email" className="form-control" placeholder="Email"
                    ref={c => {
                      this.inputUserEmail = c;
                    }}
                  />
                  <span className="glyphicon glyphicon-envelope form-control-feedback" />
                </div>
                <div className="form-group has-feedback">
                  <input
                    id="inputUserPassword"
                    type="password" className="form-control" placeholder="Password"
                    ref={c => {
                      this.inputUserPassword = c;
                    }}
                  />
                  <span className="glyphicon glyphicon-lock form-control-feedback" />
                </div>
                <div className="form-group has-feedback">
                  <input
                    id="inputUserPasswordConfirmation"
                    type="password" className="form-control" placeholder="Retype password"
                    ref={c => {
                      this.inputUserPasswordConfirmation = c;
                    }}
                  />
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
                    <Link
                      to="#"
                      className="btn btn-primary btn-block btn-flat"
                      onClick={event => this.registerUser(event)}
                    >Register</Link>
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

const mapState = (state) => ({
  user: state.user,
});

const mapDispatch = {
  registerUser,
};

export default withStyles(s)(connect(mapState, mapDispatch)(Register));
