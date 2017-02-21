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
import Layout from '../../../../components/Layout';
import {
  getAdsServers,
  createAdsServer,
  deleteAdsServer,
  updateAdsServer,
} from '../../../../actions/adsServers';
import {
  setStatusCreateAdsServer,
  setStatusUpdateAdsServer,
} from '../../../../actions/pages/resources';
import { createActivity } from '../../../../actions/activities';
import AdsServerList from './AdsServerList';
import s from './AdsServer.css';

const pageTitle = 'Ads Server';

class AdsServer extends Component {

  static propTypes = {
    resourceId: PropTypes.string.isRequired,
    page: PropTypes.object,
    resources: PropTypes.object,
    getAdsServers: PropTypes.func,
    adsServers: PropTypes.object,
    setStatusCreateAdsServer: PropTypes.func,
    setStatusUpdateAdsServer: PropTypes.func,
    createAdsServer: PropTypes.func,
    deleteAdsServer: PropTypes.func,
    updateAdsServer: PropTypes.func,
    user: PropTypes.object,
    createActivity: PropTypes.func,
    activities: PropTypes.object,
  };

  componentWillMount() {
    this.props.getAdsServers();
  }

  render() {
    return (
      <Layout
        pageTitle={pageTitle}
        pageSubTitle=""
      >
        <div>
          <AdsServerList
            list={this.props.adsServers && this.props.adsServers.list}
            statusCreateAdsServer={this.props.setStatusCreateAdsServer}
            statusUpdateAdsServer={this.props.setStatusUpdateAdsServer}
            getAdsServers={this.props.getAdsServers}
            adsServers={this.props.adsServers}
            createAdsServer={this.props.createAdsServer}
            deleteAdsServer={this.props.deleteAdsServer}
            updateAdsServer={this.props.updateAdsServer}
            page={this.props.page}
            user={this.props.user}
            createActivity={this.props.createActivity}
          />
        </div>
      </Layout>
    );
  }

}

const mapState = (state) => ({
  resources: state.resources,
  adsServers: state.adsServers,
  page: state.page.resources,
  user: state.user,
  activities: state.activities,
});

const mapDispatch = {
  getAdsServers,
  setStatusCreateAdsServer,
  setStatusUpdateAdsServer,
  createAdsServer,
  deleteAdsServer,
  updateAdsServer,
  createActivity,
};

export default withStyles(s)(connect(mapState, mapDispatch)(AdsServer));
