import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Layout from '../../../../components/Layout';
import Link from '../../../../components/Link';
import s from './Blank.css';

const pageTitle = 'Blank page';
const pageSubTitle = 'it all starts here';

class Blank extends Component {

  render() {
    return (
      <Layout pageTitle={pageTitle} pageSubTitle={pageSubTitle}>
        <div>
          {/* Default box */}
          <div className="box">
            <div className="box-header with-border">
              <h3 className="box-title">Title</h3>
              <div className="box-tools pull-right">
                <button
                  type="button" className="btn btn-box-tool"
                  data-widget="collapse" data-toggle="tooltip"
                  title="Collapse"
                >
                  <i className="fa fa-minus"/>
                </button>
                <button
                  type="button" className="btn btn-box-tool"
                  data-widget="remove" data-toggle="tooltip" title="Remove"
                >
                  <i className="fa fa-times"/>
                </button>
              </div>
            </div>
            <div className="box-body">
              <p>Start creating your amazing application!</p>
              <p>Or back to the <Link to="/">Home Page</Link></p>
            </div>
            {/* /.box-body */}
            <div className="box-footer">Footer</div>
            {/* /.box-footer*/}
          </div>
          {/* /.box */}
        </div>
      </Layout>
    );
  }

}

export default withStyles(s)(Blank);
