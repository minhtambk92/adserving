/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Layout from '../../components/Layout';
import Link from '../../components/Link';
import s from './NotFound.css';

const pageTitle = '404';

function NotFound({ title }) {
  return (
    <Layout pageTitle={pageTitle} pageSubTitle={title}>
      <div>
        <div className="error-page">
          <h2 className="headline text-yellow"> 404</h2>
          <div className="error-content">
            <h3><i className="fa fa-warning text-yellow" /> Oops! Page not found.</h3>
            <p>We could not find the page you were looking for. Meanwhile,
              you may <Link to="/">return to dashboard</Link> or try using the search form.</p>
            <form className="search-form">
              <div className="input-group">
                <input type="text" name="search" className="form-control" placeholder="Search" />
                <div className="input-group-btn">
                  <button
                    type="submit" name="submit" className="btn btn-warning btn-flat"
                  ><i className="fa fa-search" /></button>
                </div>
              </div>
              {/* /.input-group */}
            </form>
          </div>
          {/* /.error-content */}
        </div>
        {/* /.error-page */}
      </div>
    </Layout>
  );
}

NotFound.propTypes = {
  title: PropTypes.string.isRequired,
};

export default withStyles(s)(NotFound);
