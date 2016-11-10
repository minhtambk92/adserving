/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
// import { defineMessages, FormattedRelative } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  getAdvertiser,
  updateAdvertiser,
  deleteAdvertiser,
} from '../../../../actions/advertisers';
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
    advertisers: PropTypes.object,
    updateAdvertiser: PropTypes.func,
    getAdvertiser: PropTypes.func,
    campaigns: PropTypes.object,
    createCampaign: PropTypes.func,
    deleteAdvertiser: PropTypes.func,
  };
  componentWillMount() {
    this.props.getAdvertiser(this.props.advertiserId);
  }

  componentDidMount() {
    const dateStart = new Date();
    dateStart.setDate(dateStart.getDate());
    const dateEnd = new Date();
    dateEnd.setDate(dateEnd.getDate() + 1);
    /* eslint-disable no-undef */
    $('#inputCampaignStartTime').datepicker({
      autoclose: true,
      todayHighlight: 'TRUE',
      startDate: dateStart,
    });
    $('#inputCampaignEndTime').datepicker({
      autoclose: true,
      todayHighlight: 'TRUE',
      startDate: dateEnd,
    });
    /* eslint-enable no-undef */
  }
  componentDidUpdate() {
    /* eslint-disable no-undef */
    $('#inputCampaignStartTime').datepicker('update', new Date());
    /* eslint-disable no-underscore-dangle */
    $('#inputCampaignEndTime').datepicker('update', moment().add(1, 'month')._d);
    /* eslint-enable no-underscore-dangle */
    /* eslint-enable no-undef */
  }
  createCampaign() {
    const name = this.inputCampaignName.value;
    const advertiserId = this.props.advertiserId;
    const startTime = new Date(moment(new Date(this.inputCampaignStartTime.value)).format('YYYY-MM-DD 00:00:00'));
    const endTime = new Date(moment(new Date(this.inputCampaignEndTime.value)).format('YYYY-MM-DD 00:00:00'));
    const views = this.inputCampaignViews.value;
    const viewPerSession = this.inputCampaignViewPerSession.value;
    const timeResetViewCount = this.inputCampaignTimeResetViewCount.value;
    const weight = this.inputCampaignWeight.value;
    const description = this.inputCampaignDescription.value;
    const status = this.inputCampaignStatus.value;
    if (name && advertiserId && startTime && endTime && views && viewPerSession
      && timeResetViewCount && weight && description) {
      if (moment(startTime).format('x') < moment(endTime).format('x')) {
        this.props.createCampaign({
          advertiserId,
          name,
          startTime,
          endTime,
          views,
          viewPerSession,
          timeResetViewCount,
          weight,
          description,
          status,
        }).then(() => {
          this.props.getAdvertiser(this.props.advertiserId);
          this.clearInput();
        });
      } else {
        this.inputCampaignEndTime.value = null;
        this.inputCampaignEndTime.focus();
      }
    }
  }

  clearInput() { // eslint-disable-line no-unused-vars, class-methods-use-this
    this.inputCampaignName.value = null;
    this.inputCampaignStartTime.value = null;
    this.inputCampaignEndTime.value = null;
    this.inputCampaignViews.value = null;
    this.inputCampaignViewPerSession.value = null;
    this.inputCampaignTimeResetViewCount.value = null;
    this.inputCampaignWeight.value = null;
    this.inputCampaignDescription.value = null;
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
              <div className="nav-tabs-custom">
                <ul className="nav nav-tabs">
                  <li className="active">
                    <a href="#editAdvertiser" data-toggle="tab">
                      Edit Advertiser
                    </a>
                  </li>
                  <li>
                    <a href="#addCampaign" data-toggle="tab">
                      Add Campaign
                    </a>
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
                              <button type="button" className="btn btn-box-tool" data-widget="collapse">
                                <i className="fa fa-minus" />
                              </button>
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
                                  <button type="button" className="btn btn-box-tool" data-widget="collapse">
                                    <i className="fa fa-minus" />
                                  </button>
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
  advertisers: state.advertisers,
  campaigns: state.campaigns,
});

const mapDispatch = {
  getAdvertiser,
  updateAdvertiser,
  deleteAdvertiser,
  createCampaign,
};

export default withStyles(s)(connect(mapState, mapDispatch)(Advertiser));
