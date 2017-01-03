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
  getChannelOptionBrowsers,
  createChannelOptionBrowser,
  deleteChannelOptionBrowser,
  updateChannelOptionBrowser,
} from '../../../../actions/channelOptionBrowsers';
import {
  setStatusChannelOptionBrowserCreate,
  setStatusChannelOptionBrowserEdit,
} from '../../../../actions/pages/resources';
import ChannelOptionBrowserList from './ChannelOptionBrowserList';
import s from './ChannelOptionBrowser.css';

const pageTitle = 'ChannelOptionBrowser';

class ChannelOptionBrowser extends Component {

  static propTypes = {
    resourceId: PropTypes.string.isRequired,
    page: PropTypes.object,
    resources: PropTypes.object,
    getChannelOptionBrowsers: PropTypes.func,
    channelOptionBrowsers: PropTypes.object,
    setStatusChannelOptionBrowserCreate: PropTypes.func,
    setStatusChannelOptionBrowserEdit: PropTypes.func,
    createChannelOptionBrowser: PropTypes.func,
    deleteChannelOptionBrowser: PropTypes.func,
    updateChannelOptionBrowser: PropTypes.func,
  };

  componentWillMount() {
    this.props.getChannelOptionBrowsers();
  }

  render() {
    return (
      <Layout
        pageTitle={pageTitle}
        pageSubTitle=""
      >
        <div>
          <ChannelOptionBrowserList
            list={this.props.channelOptionBrowsers.list}
            statusBrowserCreate={this.props.setStatusChannelOptionBrowserCreate}
            statusBrowserEdit={this.props.setStatusChannelOptionBrowserEdit}
            getChannelOptionBrowsers={this.props.getChannelOptionBrowsers}
            channelOptionBrowsers={this.props.channelOptionBrowsers}
            createChannelOptionBrowser={this.props.createChannelOptionBrowser}
            deleteChannelOptionBrowser={this.props.deleteChannelOptionBrowser}
            updateChannelOptionBrowser={this.props.updateChannelOptionBrowser}
            page={this.props.page}
          />
        </div>
      </Layout>
    );
  }

}

const mapState = (state) => ({
  resources: state.resources,
  channelOptionBrowsers: state.channelOptionBrowsers,
  page: state.page.resources,
});

const mapDispatch = {
  getChannelOptionBrowsers,
  setStatusChannelOptionBrowserCreate,
  setStatusChannelOptionBrowserEdit,
  createChannelOptionBrowser,
  deleteChannelOptionBrowser,
  updateChannelOptionBrowser,
};

export default withStyles(s)(connect(mapState, mapDispatch)(ChannelOptionBrowser));
