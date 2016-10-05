import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Link from '../Link';
import s from './Content.css';

class Content extends Component {

  static propTypes = {
    content: PropTypes.object,
    children: PropTypes.element.isRequired,
  };

  render() {
    return (
      <div className="content-wrapper" style={{ minHeight: '1048px' }}>
        {/* Content Header (Page header) */}
        <section className="content-header">

          <h1>
            {this.props.content.pageTitle || ''}
            <small>{this.props.content.pageSubTitle || ''}</small>
          </h1>

          <ol className="breadcrumb">
            <li><Link to="#"><i className="fa fa-dashboard"/> Level</Link></li>
            <li className="active">Here</li>
          </ol>

        </section>
        {/* End of .content-header */}

        {/* Main content */}
        <section className="content">
          {this.props.children}
        </section>
        {/* /.content */}
      </div>
    );
  }
}

export default withStyles(s)(Content);
