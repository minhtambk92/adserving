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
import { getSite } from '../../actions/sites';
import Layout from '../../components/Layout';
import s from './Site.css';

const pageTitle = 'Sites Management';
const pageSubTitle = 'Control panel';

class Sites extends Component {

  static propTypes = {
    siteId: PropTypes.string.isRequired,
    sites: PropTypes.object,
    getSite: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);

    props.getSite({ id: props.siteId });
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
      // this.props.updateSite({ domain, name, email, description });
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

        </div>
      </Layout>
    );
  }

}

const mapState = (state) => ({
  sites: state.sites,
});

const mapDispatch = {
  getSite,
};

export default withStyles(s)(connect(mapState, mapDispatch)(Sites));
