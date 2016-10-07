import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Link from '../Link';
import s from './Content.css';

function Content({ pageTitle, pageSubTitle, children }) {
  return (
    <div className="content-wrapper" style={{ minHeight: '1048px' }}>
      {/* Content Header (Page header) */}
      <section className="content-header">
        <h1>
          {pageTitle || ''}
          <small>{pageSubTitle || ''}</small>
        </h1>

        <ol className="breadcrumb">
          <li><Link to="#"><i className="fa fa-dashboard" /> Level</Link></li>
          <li className="active">Here</li>
        </ol>
      </section>
      {/* End of .content-header */}

      {/* Main content */}
      <section className="content">
        {React.Children.only(children)}
      </section>
      {/* /.content */}
    </div>
  );
}

Content.propTypes = {
  pageTitle: PropTypes.string,
  pageSubTitle: PropTypes.string,
  children: PropTypes.element.isRequired,
};

export default withStyles(s)(Content);
