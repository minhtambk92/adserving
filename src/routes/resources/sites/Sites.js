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
import { getSites, createSite, checkSitesByDomain } from '../../../actions/sites';
import { getChannels } from '../../../actions/channels';
import Layout from '../../../components/Layout';
import SiteList from './SiteList';
import CreateSiteForm from './CreateSiteForm';
import s from './Sites.css';

const pageTitle = 'Sites Management';
const pageSubTitle = 'Control panel';

class Sites extends Component {

  static propTypes = {
    sites: PropTypes.object,
    getSites: PropTypes.func,
    checkSitesByDomain: PropTypes.func,
    createSite: PropTypes.func,
    getChannels: PropTypes.func,
    channels: PropTypes.object,
  };

  componentWillMount() {
    this.props.getSites();
    this.props.getChannels();
  }

  componentDidMount() {
    /* eslint-disable no-undef */
    /* eslint-enable no-undef */
  }

  componentDidUpdate() {
    /* eslint-disable no-undef */
    /* eslint-enable no-undef */
  }


  render() {
    const { sites } = this.props;
    return (
      <Layout pageTitle={pageTitle} pageSubTitle={pageSubTitle}>
        <div>

          <div className="row">
            <section className="col-lg-12">
              {/* BOX: FORM OF CREATE A NEW WEBSITE */}
              <div className="box box-info collapsed-box">
                <div className="box-header with-border">
                  <h3 className="box-title">Create a new website</h3>
                  <div className="box-tools pull-right">
                    <button type="button" className="btn btn-box-tool" data-widget="collapse">
                      <i className="fa fa-plus" />
                    </button>
                  </div>
                </div>
                {/* /.box-header */}
                <CreateSiteForm
                  filters={this.props.sites.filters}
                  sites={this.props.sites}
                  createSite={this.props.createSite}
                  checkSitesByDomain={this.props.checkSitesByDomain}
                  channels={this.props.channels.list}
                />
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
                </div>
                {/* /.box-header */}
                <div className="box-body">
                  <SiteList list={sites && sites.list} />
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
  channels: state.channels,
});

const mapDispatch = {
  getSites,
  checkSitesByDomain,
  createSite,
  getChannels,
};

export default withStyles(s)(connect(mapState, mapDispatch)(Sites));
