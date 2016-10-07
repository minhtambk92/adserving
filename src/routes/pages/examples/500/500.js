import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Layout from '../../../../components/Layout';
import Link from '../../../../components/Link';
import s from './500.css';

const pageTitle = '500 Error Page';
const pageSubTitle = '';

class Page500 extends Component {

  render() {
    return (
      <Layout pageTitle={pageTitle} pageSubTitle={pageSubTitle}>
        <div>
          <div className="error-page">
            <h2 className="headline text-red">500</h2>
            <div className="error-content">
              <h3><i className="fa fa-warning text-red"/> Oops! Something went wrong.</h3>
              <p>
                We will work on fixing that right away.
                Meanwhile, you may <Link to="/">return to dashboard</Link> or try using the search
                form.
              </p>
              <form className="search-form">
                <div className="input-group">
                  <input type="text" name="search" className="form-control" placeholder="Search"/>
                  <div className="input-group-btn">
                    <button type="submit" name="submit" className="btn btn-danger btn-flat"><i
                      className="fa fa-search"/>
                    </button>
                  </div>
                </div>
                {/* /.input-group */}
              </form>
            </div>
          </div>
          {/* /.error-page */}
        </div>
      </Layout>
    );
  }

}

export default withStyles(s)(Page500);
