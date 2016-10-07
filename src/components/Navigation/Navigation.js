/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Navigation.css';
import Link from '../Link';

const messages = defineMessages({
  about: {
    id: 'navigation.about',
    defaultMessage: 'About',
    description: 'About link in header',
  },
  contact: {
    id: 'navigation.contact',
    defaultMessage: 'Contact',
    description: 'Contact link in header',
  },
  login: {
    id: 'navigation.login',
    defaultMessage: 'Log in',
    description: 'Log in link in header',
  },
  or: {
    id: 'navigation.separator.or',
    defaultMessage: 'or',
    description: 'Last separator in list, lowercase "or"',
  },
  signup: {
    id: 'navigation.signup',
    defaultMessage: 'Sign up',
    description: 'Sign up link in header',
  },
});

function Navigation({ className }) {
  return (
    <header className="main-header">
      {/* Logo */}
      <Link to="/dashboard2" className="logo">
        {/* mini logo for sidebar mini 50x50 pixels */}
        <span className="logo-mini"><b>A</b>LT</span>
        {/* logo for regular state and mobile devices */}
        <span className="logo-lg"><b>Admin</b>LTE</span>
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
            {/* Messages: style can be found in dropdown.less*/}
            <li className="dropdown messages-menu">
              <Link to="#" className="dropdown-toggle" data-toggle="dropdown">
                <i className="fa fa-envelope-o"/>
                <span className="label label-success">4</span>
              </Link>
              <ul className="dropdown-menu">
                <li className="header">You have 4 messages</li>
                <li>
                  {/* inner menu: contains the actual data */}
                  <ul className="menu">
                    <li>{/* start message */}
                      <Link to="#">
                        <div className="pull-left">
                          <img src="/AdminLTE/dist/img/user2-160x160.jpg" className="img-circle"
                               alt="User"/>
                        </div>
                        <h4>
                          Support Team
                          <small><i className="fa fa-clock-o"/> 5 mins</small>
                        </h4>
                        <p>Why not buy a new awesome theme?</p>
                      </Link>
                    </li>
                    {/* end message */}
                    <li>
                      <Link to="#">
                        <div className="pull-left">
                          <img src="/AdminLTE/dist/img/user3-128x128.jpg" className="img-circle"
                               alt="User"/>
                        </div>
                        <h4>
                          AdminLTE Design Team
                          <small><i className="fa fa-clock-o"/> 2 hours</small>
                        </h4>
                        <p>Why not buy a new awesome theme?</p>
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <div className="pull-left">
                          <img src="/AdminLTE/dist/img/user4-128x128.jpg" className="img-circle"
                               alt="User"/>
                        </div>
                        <h4>
                          Developers
                          <small><i className="fa fa-clock-o"/> Today</small>
                        </h4>
                        <p>Why not buy a new awesome theme?</p>
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <div className="pull-left">
                          <img src="/AdminLTE/dist/img/user3-128x128.jpg" className="img-circle"
                               alt="User"/>
                        </div>
                        <h4>
                          Sales Department
                          <small><i className="fa fa-clock-o"/> Yesterday</small>
                        </h4>
                        <p>Why not buy a new awesome theme?</p>
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <div className="pull-left">
                          <img src="/AdminLTE/dist/img/user4-128x128.jpg" className="img-circle"
                               alt="User"/>
                        </div>
                        <h4>
                          Reviewers
                          <small><i className="fa fa-clock-o"/> 2 days</small>
                        </h4>
                        <p>Why not buy a new awesome theme?</p>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="footer"><Link to="#">See All Messages</Link></li>
              </ul>
            </li>
            {/* Notifications: style can be found in dropdown.less */}
            <li className="dropdown notifications-menu">
              <Link to="#" className="dropdown-toggle" data-toggle="dropdown">
                <i className="fa fa-bell-o"/>
                <span className="label label-warning">10</span>
              </Link>
              <ul className="dropdown-menu">
                <li className="header">You have 10 notifications</li>
                <li>
                  {/* inner menu: contains the actual data */}
                  <ul className="menu">
                    <li>
                      <Link to="#">
                        <i className="fa fa-users text-aqua"/> 5 new members joined today
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <i className="fa fa-warning text-yellow"/> Very long description here that
                        may not fit into the
                        page and may cause design problems
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <i className="fa fa-users text-red"/> 5 new members joined
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <i className="fa fa-shopping-cart text-green"/> 25 sales made
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <i className="fa fa-user text-red"/> You changed your username
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="footer"><Link to="#">View all</Link></li>
              </ul>
            </li>
            {/* Tasks: style can be found in dropdown.less */}
            <li className="dropdown tasks-menu">
              <Link to="#" className="dropdown-toggle" data-toggle="dropdown">
                <i className="fa fa-flag-o"/>
                <span className="label label-danger">9</span>
              </Link>
              <ul className="dropdown-menu">
                <li className="header">You have 9 tasks</li>
                <li>
                  {/* inner menu: contains the actual data */}
                  <ul className="menu">
                    <li>{/* Task item */}
                      <Link to="#">
                        <h3>
                          Design some buttons
                          <small className="pull-right">20%</small>
                        </h3>
                        <div className="progress xs">
                          <div className="progress-bar progress-bar-aqua" style={{ width: '20%' }}
                               role="progressbar" aria-valuenow={20} aria-valuemin={0}
                               aria-valuemax={100}>
                            <span className="sr-only">20% Complete</span>
                          </div>
                        </div>
                      </Link>
                    </li>
                    {/* end task item */}
                    <li>{/* Task item */}
                      <Link to="#">
                        <h3>
                          Create a nice theme
                          <small className="pull-right">40%</small>
                        </h3>
                        <div className="progress xs">
                          <div className="progress-bar progress-bar-green" style={{ width: '40%' }}
                               role="progressbar" aria-valuenow={20} aria-valuemin={0}
                               aria-valuemax={100}>
                            <span className="sr-only">40% Complete</span>
                          </div>
                        </div>
                      </Link>
                    </li>
                    {/* end task item */}
                    <li>{/* Task item */}
                      <Link to="#">
                        <h3>
                          Some task I need to do
                          <small className="pull-right">60%</small>
                        </h3>
                        <div className="progress xs">
                          <div className="progress-bar progress-bar-red" style={{ width: '60%' }}
                               role="progressbar" aria-valuenow={20} aria-valuemin={0}
                               aria-valuemax={100}>
                            <span className="sr-only">60% Complete</span>
                          </div>
                        </div>
                      </Link>
                    </li>
                    {/* end task item */}
                    <li>{/* Task item */}
                      <Link to="#">
                        <h3>
                          Make beautiful transitions
                          <small className="pull-right">80%</small>
                        </h3>
                        <div className="progress xs">
                          <div className="progress-bar progress-bar-yellow" style={{ width: '80%' }}
                               role="progressbar" aria-valuenow={20} aria-valuemin={0}
                               aria-valuemax={100}>
                            <span className="sr-only">80% Complete</span>
                          </div>
                        </div>
                      </Link>
                    </li>
                    {/* end task item */}
                  </ul>
                </li>
                <li className="footer">
                  <Link to="#">View all tasks</Link>
                </li>
              </ul>
            </li>
            {/* User Account: style can be found in dropdown.less */}
            <li className="dropdown user user-menu">
              <Link to="#" className="dropdown-toggle" data-toggle="dropdown">
                <img src="/AdminLTE/dist/img/user2-160x160.jpg" className="user-image" alt="User"/>
                <span className="hidden-xs">Alexander Pierce</span>
              </Link>
              <ul className="dropdown-menu">
                {/* User image */}
                <li className="user-header">
                  <img src="/AdminLTE/dist/img/user2-160x160.jpg" className="img-circle"
                       alt="User"/>
                  <p>
                    Alexander Pierce - Web Developer
                    <small>Member since Nov. 2012</small>
                  </p>
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
                    <Link to="#" className="btn btn-default btn-flat">Profile</Link>
                  </div>
                  <div className="pull-right">
                    <Link to="#" className="btn btn-default btn-flat">Sign out</Link>
                  </div>
                </li>
              </ul>
            </li>
            {/* Control Sidebar Toggle Button */}
            <li>
              <a href="#" data-toggle="control-sidebar"><i className="fa fa-gears"/></a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

Navigation.propTypes = {
  className: PropTypes.string,
};

export default withStyles(s)(Navigation);
