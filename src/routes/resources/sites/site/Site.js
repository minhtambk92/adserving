/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* global $ */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { getSite, updateSite, deleteSite, checkSitesByDomain } from '../../../../actions/sites';
import { createZone } from '../../../../actions/zones';
import { getChannels, createChannel } from '../../../../actions/channels';
import { setPageZoneActiveTab } from '../../../../actions/pages/zones';
import { setPageChannelActiveTab } from '../../../../actions/pages/channels';
import { createShare } from '../../../../actions/shares';
import { createOptionChannel } from '../../../../actions/optionChannels';
import { getZoneSizeTypes } from '../../../../actions/zoneSizeTypes';
import { getZoneTypes } from '../../../../actions/zoneTypes';
import { createActivity, getActivitiesBySubjectId } from '../../../../actions/activities';
import { setPageSiteActiveTab } from '../../../../actions/pages/sites';
import Layout from '../../../../components/Layout';
import ListZoneOfSite from '../ListZoneOfSite';
import ListChannelOfSite from '../ListChannelOfSite';
import UpdateSiteForm from '../UpdateSiteForm';
import CreateZoneInSite from '../../zones/CreateZoneForm';
import Activities from '../Activities';
import CreateChannelForm from '../../channels/CreateChannelForm';
import s from './Site.css';
// import { defineMessages, FormattedRelative } from 'react-intl';

const pageTitle = 'Site';

class Site extends Component {

  static propTypes = {
    siteId: PropTypes.string.isRequired,
    page: PropTypes.object,
    sites: PropTypes.object,
    getSite: PropTypes.func,
    updateSite: PropTypes.func,
    deleteSite: PropTypes.func,
    zones: PropTypes.object,
    createZone: PropTypes.func,
    checkSitesByDomain: PropTypes.func,
    getChannels: PropTypes.func,
    createChannel: PropTypes.func,
    channels: PropTypes.object,
    setPageZoneActiveTab: PropTypes.func,
    setPageChannelActiveTab: PropTypes.func,
    createShare: PropTypes.func,
    shares: PropTypes.object,
    createOptionChannel: PropTypes.func,
    getZoneTypes: PropTypes.func,
    zoneTypes: PropTypes.object,
    getZoneSizeTypes: PropTypes.func,
    zoneSizeTypes: PropTypes.object,
    users: PropTypes.object,
    activities: PropTypes.object,
    getActivitiesBySubjectId: PropTypes.func,
    createActivity: PropTypes.func,
    setPageSiteActiveTab: PropTypes.func,
  };

  componentWillMount() {
    this.props.getSite(this.props.siteId);
    this.props.getChannels();
    this.props.getZoneTypes();
    this.props.getZoneSizeTypes();
    this.props.getActivitiesBySubjectId(this.props.siteId);
  }

  componentDidMount() {
    // Set latest active tab
    $('.site-edit-box ul li').removeClass('active');
    $(`a[href="#${this.props.page.activeTab}"]`).trigger('click');
  }
  componentDidUpdate() {
    // Set latest active tab
    $('.site-edit-box ul li').removeClass('active');
    $(`a[href="#${this.props.page.activeTab}"]`).trigger('click');
  }

  onTabClick(event) {
    event.persist();
    this.props.setPageSiteActiveTab(event.target.getAttribute('data-id'));
    if (event.target.getAttribute('data-id') === 'activity') {
      this.props.getActivitiesBySubjectId(this.props.siteId);
    }
  }

  render() {
    return (
      <Layout
        pageTitle={
          pageTitle
            .concat(': ')
            .concat(this.props.sites.editing ? this.props.sites.editing.name : '...')
        }
        pageSubTitle={this.props.sites.editing ? this.props.sites.editing.domain : ''}
      >
        <div>
          <div className="row">
            <section className="col-lg-12">
              <div className="nav-tabs-custom site-edit-box">
                <ul className="nav nav-tabs">
                  <li className="active">
                    <a
                      href="#editSite" data-toggle="tab" data-id="editSite"
                      onClick={event => this.onTabClick(event)}
                    >
                      Edit Site
                    </a>
                  </li>
                  <li>
                    <a
                      href="#addZone" data-toggle="tab" data-id="addZone"
                      onClick={event => this.onTabClick(event)}
                    >
                      Add Zone
                    </a>
                  </li>
                  <li>
                    <a
                      href="#addChannel" data-toggle="tab" data-id="addChannel"
                      onClick={event => this.onTabClick(event)}
                    >
                      Add Channel
                    </a>
                  </li>
                  <li>
                    <a
                      href="#activity" data-toggle="tab"
                      data-id="activity"
                      onClick={event => this.onTabClick(event)}
                    >Activity</a>
                  </li>
                </ul>

                <div className="tab-content">
                  <div className="tab-pane" id="editSite">
                    {/* BOX: FORM OF CREATE NEW WEBSITE */}
                    <UpdateSiteForm
                      site={this.props.sites.editing}
                      updateSite={this.props.updateSite}
                      deleteSite={this.props.deleteSite}
                      siteId={this.props.siteId}
                      getSite={this.props.getSite}
                      sites={this.props.sites}
                      checkSitesByDomain={this.props.checkSitesByDomain}
                      createActivity={this.props.createActivity}
                      users={this.props.users && this.props.users.editing}
                    />
                  </div>

                  <div className="tab-pane" id="addZone">
                    <div className="row">
                      <div className="col-lg-5">
                        {/* BOX: FORM OF CREATE A NEW ZONE */}
                        <div className="box">
                          <div className="box-header with-border">
                            <h3 className="box-title">Add New Zone</h3>
                            <div className="box-tools pull-right">
                              <button
                                type="button" className="btn btn-box-tool"
                                data-widget="collapse"
                              >
                                <i className="fa fa-minus" />
                              </button>
                            </div>
                          </div>
                          {/* /.box-header */}
                          <CreateZoneInSite
                            createZone={this.props.createZone}
                            getSite={this.props.getSite}
                            siteId={this.props.siteId}
                            zoneTypeList={this.props.zoneTypes && this.props.zoneTypes.list}
                            zoneSizeTypeList={this.props.zoneSizeTypes &&
                            this.props.zoneSizeTypes.list}
                          />
                        </div>
                        {/* /.col */}
                      </div>

                      <div className="col-lg-7">
                        {/* BOX: LIST OF ZONES */}
                        <div className="box">
                          <div className="box-header with-border">
                            <h3 className="box-title">
                              List zones of Site: {this.props.sites.editing ?
                              this.props.sites.editing.name : '...'}
                            </h3>
                          </div>
                          {/* /.box-header */}
                          <div className="box-body">
                            <ListZoneOfSite
                              list={this.props.sites.editing && this.props.sites.editing.zones}
                              setPageZoneActiveTab={this.props.setPageZoneActiveTab}
                              createZone={this.props.createZone}
                              createShare={this.props.createShare}
                              zones={this.props.zones}
                              getSite={this.props.getSite}
                              siteId={this.props.siteId}
                            />
                          </div>
                          {/* /.box-body */}
                        </div>
                        {/* /.box */}
                      </div>
                    </div>
                  </div>

                  <div className="active tab-pane" id="addChannel">
                    <div className="row">
                      <div className="col-lg-6">
                        {/* BOX: FORM OF CREATE A NEW CHANNEL */}
                        <div className="box">
                          <div className="box-header with-border">
                            <h3 className="box-title">Add New Channel</h3>
                            <div className="box-tools pull-right">
                              <button
                                type="button" className="btn btn-box-tool"
                                data-widget="collapse"
                              >
                                <i className="fa fa-minus" />
                              </button>
                            </div>
                          </div>
                          {/* /.box-header */}
                          <CreateChannelForm
                            createChannel={this.props.createChannel}
                            siteId={this.props.siteId}
                            getSite={this.props.getSite}
                          />
                        </div>
                        {/* /.col */}
                      </div>

                      <div className="col-lg-6">
                        {/* BOX: LIST OF ZONES */}
                        <div className="box">
                          <div className="box-header with-border">
                            <h3 className="box-title">
                              List channels of Site: {this.props.sites.editing ?
                              this.props.sites.editing.name : '...'}
                            </h3>
                          </div>
                          {/* /.box-header */}
                          <div className="box-body">
                            <ListChannelOfSite
                              list={this.props.sites.editing &&
                              this.props.sites.editing.channels &&
                              this.props.sites.editing.channels}
                              setPageChannelActiveTab={this.props.setPageChannelActiveTab}
                              createChannel={this.props.createChannel}
                              channels={this.props.channels}
                              siteId={this.props.siteId}
                              createOptionChannel={this.props.createOptionChannel}
                              getSite={this.props.getSite}
                            />
                          </div>
                          {/* /.box-body */}
                        </div>
                        {/* /.box */}
                      </div>
                    </div>
                  </div>

                  <div className="tab-pane" id="activity">
                    <div className="row">
                      <section className="col-lg-12">
                        <Activities
                          activities={this.props.activities && this.props.activities.list}
                          updateSite={this.props.updateSite}
                          setPageSiteActiveTab={this.props.setPageSiteActiveTab}
                          createActivity={this.props.createActivity}
                          site={this.props.sites && this.props.sites.editing}
                          users={this.props.users && this.props.users.editing}
                        />
                      </section>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </Layout>
    );
  }
}

const mapState = (state) => ({
  page: state.page.sites,
  sites: state.sites,
  zones: state.zones,
  channels: state.channels,
  shares: state.shares,
  zoneTypes: state.zoneTypes,
  zoneSizeTypes: state.zoneSizeTypes,
  activities: state.activities,
  users: state.users,
});

const mapDispatch = {
  getSite,
  updateSite,
  deleteSite,
  createZone,
  checkSitesByDomain,
  createChannel,
  getChannels,
  setPageChannelActiveTab,
  setPageZoneActiveTab,
  createShare,
  createOptionChannel,
  getZoneTypes,
  getZoneSizeTypes,
  getActivitiesBySubjectId,
  createActivity,
  setPageSiteActiveTab,
};

export default withStyles(s)(connect(mapState, mapDispatch)(Site));
