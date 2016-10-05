import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Layout from '../../../../components/Layout';
import Link from '../../../../components/Link';
import s from './404.css';

class Page404 extends Component {

  static propTypes = {
    // Wrap all props to one parent props
    content: PropTypes.shape({
      // Document title
      title: PropTypes.string.isRequired,
      // Page title
      pageTitle: PropTypes.string.isRequired,
      // Page subtitle
      pageSubTitle: PropTypes.string,
    }).isRequired,
  };

  render() {
    return (
      <Layout childrenProps={this.props}>
        <div>
          <div className="error-page">
            <h2 className="headline text-yellow"> 404</h2>
            <div className="error-content">
              <h3><i className="fa fa-warning text-yellow"/> Oops! Page not found.</h3>
              <p>
                We could not find the page you were looking for.
                Meanwhile, you may <Link to="/">return to dashboard</Link> or try using the search
                form.
              </p>
              <form className="search-form">
                <div className="input-group">
                  <input type="text" name="search" className="form-control" placeholder="Search"/>
                  <div className="input-group-btn">
                    <button type="submit" name="submit" className="btn btn-warning btn-flat"><i
                      className="fa fa-search"/></button>
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

}

export default withStyles(s)(Page404);
