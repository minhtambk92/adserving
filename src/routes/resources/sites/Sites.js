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
import { getSites, createSite } from '../../../actions/sites';
import Layout from '../../../components/Layout';
import Link from '../../../components/Link';
import s from './Sites.css';

const pageTitle = 'Sites Management';
const pageSubTitle = 'Control panel';

class Sites extends Component {

  static propTypes = {
    sites: PropTypes.object,
    getSites: PropTypes.func,
    createSite: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      searchText: '',
    };
  }

  componentWillMount() {
    this.props.getSites();
  }

  componentDidMount() {
    /* eslint-disable no-undef */
    $('input[type="checkbox"].inputChooseSite').iCheck({
      checkboxClass: 'icheckbox_minimal-blue',
      radioClass: 'iradio_minimal-blue',
    });
    /* eslint-enable no-undef */
  }

  componentDidUpdate() {
    /* eslint-disable no-undef */
    // iCheck for checkbox and radio inputs
    $('input[type="checkbox"].inputChooseSite').iCheck({
      checkboxClass: 'icheckbox_minimal-blue',
      radioClass: 'iradio_minimal-blue',
    });
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
    const status = document.getElementById('inputSiteStatus').value;

    if (domain && name && email && description && status) {
      this.props.createSite({ domain, name, email, description, status });
      this.clearInput();
    }
  }

  searchFor(event) {
    event.persist();
    this.setState((previousState) => ({
      ...previousState,
      searchText: event.target.value.trim(),
    }));
  }

  isIndexOf(...args) {
    for (let i = 0; i < args.length; i += 1) {
      if (args[i].toLowerCase().indexOf(this.state.searchText.toLowerCase()) !== -1) {
        return true;
      }
    }
    return false;
  }

  render() {
    return (
      <Layout pageTitle={pageTitle} pageSubTitle={pageSubTitle}>
        <div>

          <div className="row">
            <section className="col-lg-12">
              {/* BOX: FORM OF CREATE A NEW WEBSITE */}
              <div className="box box-primary collapsed-box">
                <div className="box-header with-border">
                  <h3 className="box-title">Create a new website</h3>
                  <div className="box-tools pull-right">
                    <button type="button" className="btn btn-box-tool" data-widget="collapse">
                      <i className="fa fa-plus" />
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
                    <div className="form-group">
                      <label
                        htmlFor="inputSiteStatus"
                        className="col-sm-2 control-label"
                      >Status</label>
                      <div className="col-sm-10">
                        <select
                          id="inputSiteStatus" className="form-control"
                        >
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  {/* /.box-body */}
                  <div className="box-footer">
                    {/* eslint-disable jsx-a11y/no-static-element-interactions */}
                    <a
                      className={'btn btn-app pull-right '.concat(s.btn)}
                      onClick={event => this.clearInput(event)}
                    ><i className="fa fa-eraser" /> Clear</a>
                    <a
                      className={'btn btn-app pull-right '.concat(s.btn)}
                      onClick={event => this.createSite(event)}
                    ><i className="fa fa-check" /> Confirm</a>
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
              <div className="box box-info">
                <div className="box-header with-border">
                  <h3 className="box-title">List of websites</h3>

                  <div className="box-tools">
                    <div className="input-group input-group-sm" style={{ width: 150 }}>
                      <input
                        type="text" name="inputSearchSites"
                        className="form-control pull-right"
                        placeholder="Search..."
                        onChange={event => this.searchFor(event)}
                      />
                      <div className="input-group-btn">
                        <button
                          type="submit" className="btn btn-default"
                        ><i className="fa fa-search" /></button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /.box-header */}
                <div className="box-body table-responsive no-padding">
                  <table id="example1" className="table table-hover">
                    <thead>
                      <tr>
                        <th><input type="checkbox" className="inputChooseSite" /></th>
                        <th>Name</th>
                        <th>Domain</th>
                        <th>Email</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.props.sites.list && this.props.sites.list.map(site => {
                        if (this.isIndexOf(site.domain, site.name, site.email, site.description)) {
                          return (
                            <tr key={site.id}>
                              <td><input type="checkbox" className="inputChooseSite" /></td>
                              <td><Link to={`/resource/site/${site.id}`}>{site.name}</Link></td>
                              <td>{site.domain}</td>
                              <td>{site.email}</td>
                              <td>{site.description}</td>
                            </tr>
                          );
                        }
                        return false;
                      })}
                    </tbody>
                    <tfoot>
                      <tr>
                        <th><input type="checkbox" className="inputChooseSite" /></th>
                        <th>Name</th>
                        <th>Domain</th>
                        <th>Status</th>
                        <th>Description</th>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                {/* /.box-body */}
                <div className="box-footer clearfix">
                  <ul className="pagination pagination-sm no-margin pull-right">
                    <li><a>&laquo;</a></li>
                    <li><a>1</a></li>
                    <li><a>2</a></li>
                    <li><a>3</a></li>
                    <li><a>&raquo;</a></li>
                  </ul>
                </div>
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
