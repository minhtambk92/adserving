/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
// import { defineMessages, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { logUserOut, getUser } from '../../actions/users/users';
import { redirect } from '../../actions/route';
import s from './Navigation.css';
import Link from '../Link';

// const messages = defineMessages({
//   about: {
//     id: 'navigation.about',
//     defaultMessage: 'About',
//     description: 'About link in header',
//   },
//   contact: {
//     id: 'navigation.contact',
//     defaultMessage: 'Contact',
//     description: 'Contact link in header',
//   },
//   login: {
//     id: 'navigation.login',
//     defaultMessage: 'Log in',
//     description: 'Log in link in header',
//   },
//   or: {
//     id: 'navigation.separator.or',
//     defaultMessage: 'or',
//     description: 'Last separator in list, lowercase "or"',
//   },
//   signup: {
//     id: 'navigation.signup',
//     defaultMessage: 'Sign up',
//     description: 'Sign up link in header',
//   },
// });

class Navigation extends Component {

  static propTypes = {
    user: PropTypes.object,
    logUserOut: PropTypes.func,
    redirect: PropTypes.func,
    getUser: PropTypes.func,
    users: PropTypes.object,
  };

  componentWillMount() {
    this.props.getUser(this.props.user.id);
  }


  async logUserOut() {
    await this.props.logUserOut();
    this.props.redirect('/login');
  }

  render() {
    const { user } = this.props;

    return (
      <header className="main-header">
        {/* Logo */}
        <Link to="/" className="logo">
          {/* mini logo for sidebar mini 50x50 pixels */}
          <span className="logo-mini"><b>AD</b>S</span>
          {/* logo for regular state and mobile devices */}
          <span className="logo-lg"><b>Ad</b>serving</span>
        </Link>
        {/* Header Navbar: style can be found in header.less */}
        <nav className="navbar navbar-static-top">
          {/* Sidebar toggle button*/}
          <Link to="#" className="sidebar-toggle" data-toggle="offcanvas" role="button">
            <span className="sr-only">Toggle navigation</span>
          </Link>
          {/* Navbar Right Menu */}
          <div className="navbar-custom-menu">
            <ul className="nav navbar-nav">
              {/* User Account: style can be found in dropdown.less */}
              <li className="dropdown user user-menu">
                <Link to="#" className="dropdown-toggle" data-toggle="dropdown">
                  <img
                    src={(this.props.users && this.props.users.editing &&
                    this.props.users.editing.profile && this.props.users.editing.profile.picture ?
                    this.props.users.editing.profile.picture : '/default_avatar.png')}
                    className="user-image" alt="User"
                  />
                  <span
                    className="hidden-xs"
                  >{this.props.users && this.props.users.editing &&
                  this.props.users.editing.profile &&
                  this.props.users.editing.profile.displayName ?
                    this.props.users.editing.profile.displayName : ''}</span>
                </Link>
                <ul className="dropdown-menu">
                  {/* User image */}
                  <li className="user-header">
                    <img
                      src={(this.props.users && this.props.users.editing &&
                      this.props.users.editing.profile &&
                      this.props.users.editing.profile.picture ?
                        this.props.users.editing.profile.picture : '/default_avatar.png')}
                      className="img-circle"
                      alt="User"
                    />
                    <p>{user && user.email}</p>
                  </li>
                  {/* Menu Body */}
                  <li className="user-body">
                    <div className="row">
                      <div className="col-xs-4 text-center">
                        <Link to="#">Followers</Link>
                      </div>
                      <div className="col-xs-4 text-center">
                        <Link to="#">Sales</Link>
                      </div>
                      <div className="col-xs-4 text-center">
                        <Link to="#">Friends</Link>
                      </div>
                    </div>
                    {/* /.row */}
                  </li>
                  {/* Menu Footer*/}
                  <li className="user-footer">
                    <div className="pull-left">
                      <Link to="/profile" className="btn btn-default btn-flat">Profile</Link>
                    </div>
                    <div className="pull-right">
                      <Link
                        to="#" className="btn btn-default btn-flat"
                        onClick={event => this.logUserOut(event)}
                      >Sign out</Link>
                    </div>
                  </li>
                </ul>
              </li>
              {/* Control Sidebar Toggle Button */}
              <li>
                <Link to="#" data-toggle="control-sidebar"><i className="fa fa-gears" /></Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}

const mapState = state => ({
  user: state.user,
  users: state.users,
});

const mapDispatch = {
  logUserOut,
  redirect,
  getUser,
};

export default withStyles(s)(connect(mapState, mapDispatch)(Navigation));
