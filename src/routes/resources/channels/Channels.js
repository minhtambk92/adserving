/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { getChannels, createChannel, getChannelsFilters, setChannelsFilters } from '../../../actions/channels';
import { getSites } from '../../../actions/sites';
import { setPageChannelActiveTab } from '../../../actions/pages/channels';
import { createOptionChannel } from '../../../actions/optionChannels';
import { createActivity } from '../../../actions/activities';
import CreateChannelForm from './CreateChannelForm';
import ChannelList from './ChannelList';
import FilterChannelForm from './FilterChannelsForm';
import s from './Channels.css';

class Channels extends Component {
  static propTypes = {
    getChannelsFilters: PropTypes.func,
    setChannelsFilters: PropTypes.func,
    channels: PropTypes.object,
    getChannels: PropTypes.func,
    createChannel: PropTypes.func,
    sites: PropTypes.object,
    getSites: PropTypes.func,
    setPageChannelActiveTab: PropTypes.func,
    optionChannels: PropTypes.object,
    createOptionChannel: PropTypes.func,
    createActivity: PropTypes.func,
    activities: PropTypes.object,
    user: PropTypes.object,
  };

  componentWillMount() {
    this.props.getChannels();
    this.props.getChannelsFilters();
    this.props.getSites();
  }

  getFilteredChannels() {
    return _.filter(this.props.channels.list, channel => this.isFiltered(channel));
  }

  isFiltered(channel) {
    const { status, siteId } = this.props.channels.filters;

    const notMatchStatus = (
      status !== undefined && status !== channel.status
    );
    const notMatchSite = (
      siteId !== undefined && siteId !== channel.siteId
    );

    return !(notMatchStatus || notMatchSite);
  }

  render() {
    return (
      <div>
        <div className="row">
          <section className="col-lg-12">
            {/* BOX: FILTER */}
            <div className="box box-default">
              <div className="box-header with-border">
                <h3 className="box-title">Filter by:</h3>
                <div className="box-tools pull-right">
                  <button type="button" className="btn btn-box-tool" data-widget="collapse">
                    <i className="fa fa-minus" />
                  </button>
                </div>
              </div>
              {/* /.box-header */}
              {/* form start */}
              <FilterChannelForm
                sites={this.props.sites && this.props.sites.list}
                filters={this.props.channels.filters}
                setChannelsFilters={this.props.setChannelsFilters}
              />
            </div>
            {/* /.col */}
          </section>
        </div>

        <div className="row">
          <section className="col-lg-12">
            {/* BOX: FORM OF CREATE NEW WEB Channel */}
            <div className="box collapsed-box">
              <div className="box-header with-border">
                <h3 className="box-title">Add new Channel</h3>
                <div className="box-tools pull-right">
                  <button type="button" className="btn btn-box-tool" data-widget="collapse">
                    <i className="fa fa-plus" />
                  </button>
                </div>
              </div>
              {/* /.box-header */}
              <CreateChannelForm
                filters={this.props.channels.filters}
                createChannel={this.props.createChannel}
                sites={this.props.sites && this.props.sites.list}
                createActivity={this.props.createActivity}
                user={this.props.user}
                channels={this.props.channels && this.props.channels.list}
              />
            </div>
            {/* /.col */}
          </section>
        </div>

        <div className="row">
          <section className="col-lg-12">
            {/* BOX: LIST OF ChannelS */}
            <div className="box">
              <div className="box-header with-border">
                <h3 className="box-title">List Channel</h3>
              </div>
              {/* /.box-header */}
              <div className="box-body">
                <ChannelList
                  list={this.getFilteredChannels()}
                  setPageChannelActiveTab={this.props.setPageChannelActiveTab}
                  createChannel={this.props.createChannel}
                  optionChannels={this.props.optionChannels}
                  createOptionChannel={this.props.createOptionChannel}
                  channels={this.props.channels}
                  createActivity={this.props.createActivity}
                  user={this.props.user}
                />
              </div>
              {/* /.box-body */}
            </div>
            {/* /.box */}
          </section>
          {/* /.col */}
        </div>
      </div>
    );
  }

}

const mapState = state => ({
  channels: state.channels,
  sites: state.sites,
  optionChannels: state.optionChannels,
  activities: state.activities,
  user: state.user,
});

const mapDispatch = {
  getChannels,
  createChannel,
  getSites,
  getChannelsFilters,
  setPageChannelActiveTab,
  setChannelsFilters,
  createOptionChannel,
  createActivity,
};

export default withStyles(s)(connect(mapState, mapDispatch)(Channels));

