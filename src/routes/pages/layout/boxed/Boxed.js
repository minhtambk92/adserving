import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Layout from '../../../../components/Layout';
import s from './Boxed.css';

const pageTitle = 'Boxed Layout';
const pageSubTitle = 'Blank example to the boxed layout';

class Boxed extends Component {

  render() {
    return (
      <Layout pageTitle={pageTitle} pageSubTitle={pageSubTitle} isBoxed>
        <div>
          <div className="callout callout-info">
            <h4>Tip!</h4>
            <p>Add the layout-boxed class to the body tag to get this layout. The boxed layout is
              helpful when working on
              large screens because it prevents the site from stretching very wide.</p>
          </div>
          {/* Default box */}
          <div className="box">
            <div className="box-header with-border">
              <h3 className="box-title">Title</h3>
              <div className="box-tools pull-right">
                <button type="button" className="btn btn-box-tool" data-widget="collapse"
                        data-toggle="tooltip" title="Collapse">
                  <i className="fa fa-minus"/></button>
                <button type="button" className="btn btn-box-tool" data-widget="remove"
                        data-toggle="tooltip" title="Remove">
                  <i className="fa fa-times"/></button>
              </div>
            </div>
            <div className="box-body">
              Start creating your amazing application!
            </div>
            {/* /.box-body */}
            <div className="box-footer">
              Footer
            </div>
            {/* /.box-footer*/}
          </div>
          {/* /.box */}
        </div>
      </Layout>
    );
  }

}

export default withStyles(s)(Boxed);
