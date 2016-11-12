/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Footer.css';
import Link from '../Link';

class Footer extends Component {
  render() {
    return (
      <footer className="main-footer">
        {/* To the right */}
        <div className="pull-right hidden-xs">CoreJS Team - AdTech</div>
        {/* Default to the left */}
        <strong>
          <span>Copyright © 2016</span>&nbsp;<Link to="http://admicro.vn/">Admicro</Link>.
        </strong>
        <span>&nbsp;All rights reserved.</span>
      </footer>
    );
  }
}

export default withStyles(s)(Footer);
