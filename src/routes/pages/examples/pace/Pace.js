import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Layout from '../../../../components/Layout';
import s from './Pace.css';

const pageTitle = 'Pace page';
const pageSubTitle = 'Loading example';

class Pace extends Component {
  componentDidMount() {
    // To make Pace works on Ajax calls
    $(document).ajaxStart(function () {
      Pace.restart();
    });
    $('.ajax').click(function () {
      $.ajax({
        url: '#', success: function (result) {
          $('.ajax-content').html('<hr>Ajax Request Completed !');
        }
      });
    });
  }

  render() {
    return (
      <Layout pageTitle={pageTitle} pageSubTitle={pageSubTitle}>
        <div>
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
              Pace loading works automatically on page. You can still implement it with ajax
              requests by adding this js:
              <br /><code>$(document).ajaxStart(function() {'{'} Pace.restart(); {'}'});</code>
              <br />
              <div className="row">
                <div className="col-xs-12 text-center">
                  <button type="button" className="btn btn-default btn-lrg ajax"
                          title="Ajax Request">
                    <i className="fa fa-spin fa-refresh"/>&nbsp; Get External Content
                  </button>
                </div>
              </div>
              <div className="ajax-content"/>
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

export default withStyles(s)(Pace);
