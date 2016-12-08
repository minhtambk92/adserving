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
// import { defineMessages, FormattedRelative } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  getAdvertiser,
  updateAdvertiser,
  deleteAdvertiser,
} from '../../../../actions/advertisers';
import {
  setPageAdvertiserActiveTab,
} from '../../../../actions/pages/advertisers';
import { setPageCampaignActiveTab } from '../../../../actions/pages/campaigns';
import { createCampaign } from '../../../../actions/campaigns';
import Layout from '../../../../components/Layout';
import CampaignList from '../../campaigns/CampaignList';
import UpdateAdvertiserForm from '../UpdateAdvertiserForm';
import CreateCampaignInAdvertiser from '../../campaigns/CreateCampaignForm';
import s from './Advertiser.css';

const pageTitle = 'Advertiser';

class Advertiser extends Component {

  static propTypes = {
    advertiserId: PropTypes.string.isRequired,
    page: PropTypes.object,
    advertisers: PropTypes.object,
    updateAdvertiser: PropTypes.func,
    getAdvertiser: PropTypes.func,
    setPageAdvertiserActiveTab: PropTypes.func,
    campaigns: PropTypes.object,
    createCampaign: PropTypes.func,
    deleteAdvertiser: PropTypes.func,
    setPageCampaignActiveTab: PropTypes.func,
  };

  componentWillMount() {
    this.props.getAdvertiser(this.props.advertiserId);
  }

  componentDidMount() {
    // Set latest active tab
    $('.advertiser-edit-box ul li').removeClass('active');
    $(`a[href="#${this.props.page.activeTab}"]`).trigger('click');
  }

  onTabClick(event) {
    event.persist();
    this.props.setPageAdvertiserActiveTab(event.target.getAttribute('data-id'));
  }

  render() {
    return (
      <Layout
        pageTitle={
          pageTitle
            .concat(': ')
            .concat(this.props.advertisers.editing ? this.props.advertisers.editing.name : '...')
        }
        pageSubTitle=""
      >
        <div>
          <div className="row">
            <section className="col-lg-12">
              <div className="nav-tabs-custom advertiser-edit-box">
                <ul className="nav nav-tabs">
                  <li className="active">
                    <a
                      href="#editAdvertiser" data-toggle="tab"
                      data-id="editAdvertiser"
                      onClick={event => this.onTabClick(event)}
                    >Edit Advertiser</a>
                  </li>
                  <li>
                    <a
                      href="#addCampaign" data-toggle="tab"
                      data-id="addCampaign"
                      onClick={event => this.onTabClick(event)}
                    >Add Campaign</a>
                  </li>
                </ul>
                <div className="tab-content">
                  <div className="active tab-pane" id="editAdvertiser">
                    <div className="row">
                      <section className="col-lg-12">
                        {/* BOX: FORM OF CREATE NEW WEBSITE */}
                        <div className="box box-info">
                          <div className="box-header with-border">
                            <h3 className="box-title">Change Advertiser information</h3>
                            <div className="box-tools pull-right">
                              <button
                                type="button" className="btn btn-box-tool"
                                data-widget="collapse"
                              ><i className="fa fa-minus" /></button>
                            </div>
                          </div>
                          {/* /.box-header */}
                          {/* form start */}
                          <UpdateAdvertiserForm
                            advertiser={this.props.advertisers && this.props.advertisers.editing}
                            updateAdvertiser={this.props.updateAdvertiser}
                            deleteAdvertiser={this.props.deleteAdvertiser}
                            advertiserId={this.props.advertiserId}
                            getAdvertiser={this.props.getAdvertiser}
                          />
                        </div>
                        {/* /.col */}
                      </section>
                    </div>
                  </div>
                  <div className="tab-pane" id="addCampaign">
                    <div className="row">
                      <section className="col-lg-12">
                        <div className="row">
                          <div className="col-lg-5">
                            <div className="box box-info">
                              <div className="box-header with-border">
                                <h3 className="box-title">Add New Campaign</h3>
                                <div className="box-tools pull-right">
                                  <button
                                    type="button" className="btn btn-box-tool"
                                    data-widget="collapse"
                                  ><i className="fa fa-minus" /></button>
                                </div>
                              </div>
                              {/* /.box-header */}
                              {/* form start */}
                              <CreateCampaignInAdvertiser
                                createCampaign={this.props.createCampaign}
                                advertiserId={this.props.advertiserId}
                                getAdvertiser={this.props.getAdvertiser}
                              />
                            </div>
                          </div>
                          <div className="col-lg-7">
                            {/* BOX: LIST OF campaigns */}
                            <div className="box box-info">
                              <div className="box-header with-border">
                                <h3 className="box-title">Campaigns of {
                                  pageTitle
                                    .concat(': ')
                                    .concat(this.props.advertisers.editing ?
                                      this.props.advertisers.editing.name : '...')
                                } </h3>
                              </div>
                              {/* /.box-header */}
                              <div className="box-body">
                                <CampaignList
                                  list={this.props.advertisers.editing &&
                                  this.props.advertisers.editing.campaigns
                                  && this.props.advertisers.editing.campaigns}
                                  setPageCampaignActiveTab={this.props.setPageCampaignActiveTab}
                                  createCampaign={this.props.createCampaign}
                                  advertiserId={this.props.advertiserId}
                                  getAdvertiser={this.props.getAdvertiser}
                                />
                              </div>
                              {/* /.box-body */}
                            </div>
                            {/* /.box */}
                          </div>
                        </div>
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
  page: state.page.advertisers,
  advertisers: state.advertisers,
  campaigns: state.campaigns,
});

const mapDispatch = {
  getAdvertiser,
  updateAdvertiser,
  deleteAdvertiser,
  setPageAdvertiserActiveTab,
  createCampaign,
  setPageCampaignActiveTab,
};

export default withStyles(s)(connect(mapState, mapDispatch)(Advertiser));
