import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Layout from '../../../../components/Layout';
import Link from '../../../../components/Link';
import s from './LockScreen.css';

class LockScreen extends Component {

  render() {
    return (
      <Layout bodyClasses="hold-transition lockscreen" isFullWidth>
        <div>
          <div className="lockscreen-wrapper">
            <div className="lockscreen-logo">
              <Link to="/"><b>Admin</b>LTE</Link>
            </div>
            {/* User name */}
            <div className="lockscreen-name">John Doe</div>
            {/* START LOCK SCREEN ITEM */}
            <div className="lockscreen-item">
              {/* lockscreen image */}
              <div className="lockscreen-image">
                <img src="/AdminLTE/dist/img/user1-128x128.jpg" alt="User"/>
              </div>
              {/* /.lockscreen-image */}
              {/* lockscreen credentials (contains the form) */}
              <form className="lockscreen-credentials">
                <div className="input-group">
                  <input type="password" className="form-control" placeholder="password"/>
                  <div className="input-group-btn">
                    <button type="button" className="btn"><i
                      className="fa fa-arrow-right text-muted"/></button>
                  </div>
                </div>
              </form>
              {/* /.lockscreen credentials */}
            </div>
            {/* /.lockscreen-item */}
            <div className="help-block text-center">Enter your password to retrieve your session
            </div>
            <div className="text-center">
              <Link to="login.html">Or sign in as a different user</Link>
            </div>
            <div className="lockscreen-footer text-center">
              Copyright © 2014-2016 <b><Link to="http://almsaeedstudio.com" className="text-black">Almsaeed
              Studio</Link></b><br />
              All rights reserved
            </div>
          </div>
        </div>
      </Layout>
    );
  }

}

export default withStyles(s)(LockScreen);
