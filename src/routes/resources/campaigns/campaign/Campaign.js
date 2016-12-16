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
// import { defineMessages, FormattedRelative } from 'react-intl';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  getCampaign,
  updateCampaign,
  deleteCampaign,
} from '../../../../actions/campaigns';
import { getAdvertisers } from '../../../../actions/advertisers';
import { createPlacement } from '../../../../actions/placements';
import { setPagePlacementActiveTab } from '../../../../actions/pages/placements';
import Layout from '../../../../components/Layout';
import PlacementList from '../../placements/PlacementList';
import UpdateCampaignForm from '../UpdateCampaignForm';
import CreatePlacementInCampaign from '../../placements/CreatePlacementForm';
import s from './Campaign.css';

const pageTitle = 'Campaign';

class Campaign extends Component {

  static propTypes = {
    campaignId: PropTypes.string.isRequired,
    page: PropTypes.object,
    campaigns: PropTypes.object,
    advertisers: PropTypes.object,
    getCampaign: PropTypes.func,
    getAdvertisers: PropTypes.func,
    updateCampaign: PropTypes.func,
    deleteCampaign: PropTypes.func,
    placements: PropTypes.object,
    createPlacement: PropTypes.func,
    setPagePlacementActiveTab: PropTypes.func,
  };

  componentWillMount() {
    this.props.getCampaign(this.props.campaignId);
    this.props.getAdvertisers();
  }

  componentDidMount() {
    // Set latest active tab
    $('.campaign-edit-box ul li').removeClass('active');
    $(`a[href="#${this.props.page.activeTab}"]`).trigger('click');
  }

  render() {
    return (
      <Layout
        pageTitle={
          pageTitle
            .concat(': ')
            .concat(this.props.campaigns.editing ? this.props.campaigns.editing.name : '...')
        }
        pageSubTitle=""
      >
        <div>
          <div className="row">
            <section className="col-lg-12">
              <div className="nav-tabs-custom campaign-edit-box">
                <ul className="nav nav-tabs">
                  <li className="active">
                    <a href="#editCampaign" data-toggle="tab">
                      Edit Campaign
                    </a>
                  </li>
                  <li>
                    <a href="#addPlacement" data-toggle="tab">
                      Add Placement
                    </a>
                  </li>
                </ul>
                <div className="tab-content">
                  <div className="active tab-pane" id="editCampaign">
                    <div className="row">
                      <section className="col-lg-12">
                        {/* BOX: FORM OF CREATE NEW WEBSITE */}
                        <UpdateCampaignForm
                          campaign={this.props.campaigns && this.props.campaigns.editing}
                          updateCampaign={this.props.updateCampaign}
                          advertisers={this.props.advertisers && this.props.advertisers.list}
                          deleteCampaign={this.props.deleteCampaign}
                          campaignId={this.props.campaignId}
                          getCampaign={this.props.getCampaign}
                        />
                        {/* /.col */}
                      </section>
                    </div>
                  </div>
                  <div className="tab-pane" id="addPlacement">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="row">
                          <section className="col-lg-5">
                            {/* BOX: FORM OF CREATE NEW PlacementS */}
                            <div className="box">
                              <div className="box-header with-border">
                                <h3 className="box-title">Add New Placement</h3>
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
                              {/* form start */}
                              <CreatePlacementInCampaign
                                createPlacement={this.props.createPlacement}
                                campaignId={this.props.campaignId}
                                getCampaign={this.props.getCampaign}
                              />
                            </div>
                            {/* /.col */}
                          </section>
                          <section className="col-lg-7">
                            {/* BOX: LIST OF Placements */}
                            <div className="box">
                              <div className="box-header with-border">
                                <h3 className="box-title">List Placement of {
                                  this.props.campaigns.editing ?
                                    this.props.campaigns.editing.name : '...'
                                }</h3>
                              </div>
                              {/* /.box-header */}
                              <div className="box-body">
                                <PlacementList
                                  list={this.props.campaigns.editing &&
                                    this.props.campaigns.editing.placements &&
                                    this.props.campaigns.editing.placements}
                                  setPagePlacementActiveTab={this.props.setPagePlacementActiveTab}
                                  createPlacement={this.props.createPlacement}
                                  campaignId={this.props.campaignId}
                                  getCampaign={this.props.getCampaign}
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
  page: state.page.campaigns,
  campaigns: state.campaigns,
  placements: state.placements,
  advertisers: state.advertisers,
});

const mapDispatch = {
  getCampaign,
  updateCampaign,
  getAdvertisers,
  deleteCampaign,
  createPlacement,
  setPagePlacementActiveTab,
};

export default withStyles(s)(connect(mapState, mapDispatch)(Campaign));
