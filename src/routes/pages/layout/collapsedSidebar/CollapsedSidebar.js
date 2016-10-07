import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Layout from '../../../../components/Layout';
import s from './CollapsedSidebar.css';

const pageTitle = 'Sidebar Collapsed';
const pageSubTitle = 'Layout with collapsed sidebar on load';

class CollapsedSidebar extends Component {

  render() {
    return (
      <Layout pageTitle={pageTitle} pageSubTitle={pageSubTitle} isCollapsedSidebar>
        <div>
          <div className="callout callout-info">
            <h4>Tip!</h4>
            <p>Add the sidebar-collapse class to the body tag to get this layout. You should combine
              this option with a
              fixed layout if you have a long sidebar. Doing that will prevent your page content
              from getting stretched
              vertically.</p>
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

export default withStyles(s)(CollapsedSidebar);
