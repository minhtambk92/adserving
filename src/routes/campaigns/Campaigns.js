/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import { FormattedRelative } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Layout from '../../components/Layout';
import Link from '../../components/Link';
import s from './Campaigns.css';

const pageTitle = 'Home';
const pageSubTitle = 'Control panel';

class Campaigns extends Component {

  componentDidMount() {
    // somethings happens at client side
  }

  render() {
    return (
      <Layout pageTitle={pageTitle} pageSubTitle={pageSubTitle}>
        <div>

          <div className="row">
            <section className="col-lg-12">
              <div className="box box-warning">
                <div className="box-header with-border">
                  <h3 className="box-title">Create campaign</h3>
                </div>
                {/* /.box-header */}
                <div className="box-body">
                  <form role="form">
                    {/* text input */}
                    <div className="form-group">
                      <label>Text</label>
                      <input type="text" className="form-control" placeholder="Enter ..." />
                    </div>
                    <div className="form-group">
                      <label>Text Disabled</label>
                      <input type="text" className="form-control" placeholder="Enter ..." disabled />
                    </div>
                    {/* textarea */}
                    <div className="form-group">
                      <label>Textarea</label>
                      <textarea className="form-control" rows={3} placeholder="Enter ..." defaultValue={''} />
                    </div>
                  </form>
                </div>
                {/* /.box-body */}
              </div>
              {/* /.box */}
            </section>
          </div>

          {/* Main row */}
          <div className="row">
            {/* Left col */}
            <section className="col-lg-12">

              {/* TABLE: LATEST ORDERS */}
              <div className="box box-info">
                <div className="box-header with-border">
                  <h3 className="box-title">Latest Orders</h3>
                  <div className="box-tools pull-right">
                    <button type="button" className="btn btn-box-tool" data-widget="collapse">
                      <i className="fa fa-minus" />
                    </button>
                    <button type="button" className="btn btn-box-tool" data-widget="remove">
                      <i className="fa fa-times" />
                    </button>
                  </div>
                </div>
                {/* /.box-header */}
                <div className="box-body">
                  <div className="table-responsive">
                    <table className="table no-margin">
                      <thead>
                        <tr>
                          <th>Order ID</th>
                          <th>Item</th>
                          <th>Status</th>
                          <th>Popularity</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><Link to="pages/examples/invoice.html">OR9842</Link></td>
                          <td>Call of Duty IV</td>
                          <td><span className="label label-success">Shipped</span></td>
                          <td>
                            <div className="sparkbar" data-color="#00a65a" data-height={20}>
                              90,80,90,-70,61,-83,63
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  {/* /.table-responsive */}
                </div>
                {/* /.box-body */}
                <div className="box-footer clearfix">
                  <button
                    className="btn btn-sm btn-info btn-flat pull-left"
                  >Place New Order</button>
                  <button
                    className="btn btn-sm btn-default btn-flat pull-right"
                  >View All Orders</button>
                </div>
                {/* /.box-footer */}
              </div>

            </section>
            {/* right col */}
          </div>
          {/* /.row (main row) */}
        </div>
      </Layout>
    );
  }

}

export default withStyles(s)(Campaigns);
