/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// import { defineMessages, FormattedRelative } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { getSites, createSite } from '../../actions/sites';

import Layout from '../../components/Layout';
// import Link from '../../components/Link';
import s from './Sites.css';

const pageTitle = 'Sites Management';
const pageSubTitle = 'Control panel';

class Sites extends Component {

  static propTypes = {
    sites: PropTypes.object,
    getSites: PropTypes.func,
    createSite: PropTypes.func,
  };

  componentWillMount() {
    this.props.getSites();
  }

  componentDidMount() {
    /* eslint-disable no-undef */
    // $('.select2').select2();
    // $('#example1').DataTable(); // eslint-disable-line new-cap
    /* eslint-enable no-undef */
  }

  clearInput(event) { // eslint-disable-line no-unused-vars, class-methods-use-this
    document.getElementById('inputSiteDomain').value = null;
    document.getElementById('inputSiteName').value = null;
    document.getElementById('inputSiteEmail').value = null;
    document.getElementById('inputSiteDescription').value = null;
  }

  createSite(event) { // eslint-disable-line no-unused-vars
    const domain = document.getElementById('inputSiteDomain').value;
    const name = document.getElementById('inputSiteName').value;
    const email = document.getElementById('inputSiteEmail').value;
    const description = document.getElementById('inputSiteDescription').value;

    if (domain && name && email && description) {
      this.props.createSite({ domain, name, email, description });
      this.clearInput();
    }
  }

  render() {
    return (
      <Layout pageTitle={pageTitle} pageSubTitle={pageSubTitle}>
        <div>

          <div className="row">
            <section className="col-lg-12">
              {/* BOX: FORM OF CREATE NEW WEBSITE */}
              <div className="box box-info">
                <div className="box-header with-border">
                  <h3 className="box-title">Create a new site for ads</h3>
                  <div className="box-tools pull-right">
                    <button type="button" className="btn btn-box-tool" data-widget="collapse">
                      <i className="fa fa-minus" />
                    </button>
                  </div>
                </div>
                {/* /.box-header */}
                {/* form start */}
                <form className="form-horizontal">
                  <div className="box-body">
                    <div className="form-group">
                      <label
                        htmlFor="inputSiteDomain" className="col-sm-2 control-label"
                      >Website domain</label>
                      <div className="col-sm-10">
                        <input
                          type="text" className="form-control" id="inputSiteDomain"
                          placeholder="dantri.com.vn"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="inputSiteName" className="col-sm-2 control-label">Name</label>
                      <div className="col-sm-10">
                        <input
                          type="text" className="form-control" id="inputSiteName"
                          placeholder="Dan Tri"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="inputSiteEmail"
                        className="col-sm-2 control-label"
                      >Email</label>
                      <div className="col-sm-10">
                        <input
                          type="text" className="form-control" id="inputSiteEmail"
                          placeholder="contact@dantri.com.vn"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="inputSiteDescription"
                        className="col-sm-2 control-label"
                      >Description</label>
                      <div className="col-sm-10">
                        <textarea
                          className="form-control" id="inputSiteDescription"
                          rows="5" placeholder="More info..."
                        />
                      </div>
                    </div>
                  </div>
                  {/* /.box-body */}
                  <div className="box-footer">
                    {/* eslint-disable jsx-a11y/no-static-element-interactions */}
                    <a
                      className={'btn btn-default pull-right '.concat(s.btn)}
                      onClick={event => this.clearInput(event)}
                    >Clear</a>
                    <a
                      className={'btn btn-primary pull-right '.concat(s.btn)}
                      onClick={event => this.createSite(event)}
                    >Confirm</a>
                    {/* eslint-enable jsx-a11y/no-static-element-interactions */}
                  </div>
                  {/* /.box-footer */}
                </form>
              </div>
              {/* /.col */}
            </section>
          </div>

          <div className="row">
            <section className="col-lg-12">
              {/* BOX: LIST OF WEBSITES */}
              <div className="box">
                <div className="box-header">
                  <h3 className="box-title">List of website</h3>
                </div>
                {/* /.box-header */}
                <div className="box-body">
                  <table id="example1" className="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th>Domain</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.props.sites.latest && this.props.sites.latest.map(site => (
                        <tr key={site.id}>
                          <td>{site.domain}</td>
                          <td>{site.name}</td>
                          <td>{site.email}</td>
                          <td>{site.description}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <th>Name</th>
                        <th>Domain</th>
                        <th>Status</th>
                        <th>Description</th>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                {/* /.box-body */}
              </div>
              {/* /.box */}
            </section>
            {/* /.col */}
          </div>

        </div>
      </Layout>
    );
  }

}

const mapState = (state) => ({
  sites: state.sites,
});

const mapDispatch = {
  getSites,
  createSite,
};

export default withStyles(s)(connect(mapState, mapDispatch)(Sites));
