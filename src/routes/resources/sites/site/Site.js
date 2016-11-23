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
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { getSite, updateSite, deleteSite, checkSitesByDomain } from '../../../../actions/sites';
import { createZone } from '../../../../actions/zones';
import { getChannels, createChannel } from '../../../../actions/channels';
import Layout from '../../../../components/Layout';
import ListZoneOfSite from '../ListZoneOfSite';
import ListChannelOfSite from '../ListChannelOfSite';
import UpdateSiteForm from '../UpdateSiteForm';
import CreateZoneInSite from '../../zones/CreateZoneForm';
import CreateChannelForm from '../../channels/CreateChannelForm';
import s from './Site.css';
// import { defineMessages, FormattedRelative } from 'react-intl';

const pageTitle = 'Site';

class Site extends Component {

  static propTypes = {
    siteId: PropTypes.string.isRequired,
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
  };

  componentWillMount() {
    this.props.getSite(this.props.siteId);
    this.props.getChannels();
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
              <div className="nav-tabs-custom">
                <ul className="nav nav-tabs">
                  <li>
                    <a href="#editSite" data-toggle="tab">
                      Edit Site
                    </a>
                  </li>
                  <li>
                    <a href="#addZone" data-toggle="tab">
                      Add Zone
                    </a>
                  </li>
                  <li className="active">
                    <a href="#addChannel" data-toggle="tab">
                      Add Channel
                    </a>
                  </li>
                </ul>
                <div className="tab-content">
                  <div className="tab-pane" id="editSite">
                    <div className="row">
                      <section className="col-lg-12">
                        {/* BOX: FORM OF CREATE NEW WEBSITE */}
                        <div className="box box-info">
                          <div className="box-header with-border">
                            <h3 className="box-title">Change site information</h3>
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
                          <UpdateSiteForm
                            site={this.props.sites && this.props.sites.editing}
                            updateSite={this.props.updateSite}
                            deleteSite={this.props.deleteSite}
                            siteId={this.props.siteId}
                            getSite={this.props.getSite}
                            sites={this.props.sites}
                            checkSitesByDomain={this.props.checkSitesByDomain}
                          />
                        </div>
                        {/* /.col */}
                      </section>
                    </div>
                  </div>
                  <div className="tab-pane" id="addZone">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="row">
                          <section className="col-lg-6">
                            {/* BOX: FORM OF CREATE A NEW ZONE */}
                            <div className="box box-info">
                              <div className="box-header with-border">
                                <h3 className="box-title">Create New Zone</h3>
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
                              />
                            </div>
                            {/* /.col */}
                          </section>
                          <section className="col-lg-6">
                            {/* BOX: LIST OF ZONES */}
                            <div className="box box-info">
                              <div className="box-header with-border">
                                <h3 className="box-title">
                                  List of zones: {this.props.sites.editing ?
                                  this.props.sites.editing.name : '...'}
                                </h3>
                              </div>
                              {/* /.box-header */}
                              <div className="box-body">
                                <ListZoneOfSite
                                  list={this.props.sites.editing &&
                                      this.props.sites.editing.zones &&
                                      this.props.sites.editing.zones}
                                />
                              </div>
                              {/* /.box-body */}
                            </div>
                            {/* /.box */}
                          </section>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="active tab-pane" id="addChannel">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="row">
                          <section className="col-lg-6">
                            {/* BOX: FORM OF CREATE A NEW CHANNEL */}
                            <div className="box box-info">
                              <div className="box-header with-border">
                                <h3 className="box-title">Create New Channel</h3>
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
                          </section>
                          <section className="col-lg-6">
                            {/* BOX: LIST OF ZONES */}
                            <div className="box box-info">
                              <div className="box-header with-border">
                                <h3 className="box-title">
                                  List of channels: {this.props.sites.editing ?
                                  this.props.sites.editing.name : '...'}
                                </h3>
                              </div>
                              {/* /.box-header */}
                              <div className="box-body">
                                <ListChannelOfSite
                                  list={this.props.sites.editing &&
                                  this.props.sites.editing.channels &&
                                  this.props.sites.editing.channels}
                                />
                              </div>
                              {/* /.box-body */}
                            </div>
                            {/* /.box */}
                          </section>
                        </div>
                      </div>
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
  sites: state.sites,
  zones: state.zones,
  channels: state.channels,
});

const mapDispatch = {
  getSite,
  updateSite,
  deleteSite,
  createZone,
  checkSitesByDomain,
  createChannel,
  getChannels,
};

export default withStyles(s)(connect(mapState, mapDispatch)(Site));
