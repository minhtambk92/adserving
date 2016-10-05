/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Footer.css';
import Link from '../Link';

function Footer() {
  return (
    <footer className="main-footer">
      {/* To the right */}
      <div className="pull-right hidden-xs">Anything you want</div>
      {/* Default to the left */}
      <strong>Copyright © 2016 <Link to="#">Company</Link>.</strong> All rights reserved.
    </footer>
  );
}

export default withStyles(s)(Footer);
