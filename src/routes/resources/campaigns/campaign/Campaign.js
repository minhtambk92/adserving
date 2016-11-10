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
import Layout from '../../../../components/Layout';
import PlacementList from '../../placements/PlacementList';
import UpdateCampaignForm from '../UpdateCampaignForm';
import CreatePlacementInCampaign from '../../placements/CreatePlacementForm';
import s from './Campaign.css';

const pageTitle = 'Campaign';

class Campaign extends Component {

  static propTypes = {
    campaignId: PropTypes.string.isRequired,
    campaigns: PropTypes.object,
    advertisers: PropTypes.object,
    getCampaign: PropTypes.func,
    getAdvertisers: PropTypes.func,
    updateCampaign: PropTypes.func,
    deleteCampaign: PropTypes.func,
    placements: PropTypes.object,
    createPlacement: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      searchText: '',
    };
  }

  componentWillMount() {
    this.props.getCampaign(this.props.campaignId);
    this.props.getAdvertisers();
  }

  componentDidMount() {
    /* eslint-disable no-undef */
    const dateStart = new Date();
    dateStart.setDate(dateStart.getDate());
    const dateEnd = new Date();
    dateEnd.setDate(dateEnd.getDate() + 1);
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

    $('#inputPlacementStartTime').datepicker({
      autoclose: true,
      todayHighlight: 'TRUE',
      startDate: dateStart,
      setDate: new Date(),
    });

    $('#inputPlacementEndTime').datepicker({
      autoclose: true,
      todayHighlight: 'TRUE',
      startDate: dateEnd,
      setDate: new Date(),
    });
    /* eslint-enable no-undef */
  }

  componentDidUpdate() {
    /* eslint-disable no-undef */
    $('#inputPlacementStartTime').datepicker('update', new Date());
    /* eslint-disable no-underscore-dangle */
    $('#inputPlacementEndTime').datepicker('update', moment().add(1, 'month')._d);
    /* eslint-enable no-underscore-dangle */
    /* eslint-enable no-undef */
  }
  createPlacement() {
    const name = this.inputPlacementName.value;
    const startTime = new Date(moment(new Date(this.inputPlacementStartTime.value)).format('YYYY-MM-DD 00:00:00'));
    const endTime = new Date(moment(new Date(this.inputPlacementEndTime.value)).format('YYYY-MM-DD 00:00:00'));
    const sizeWidth = this.inputPlacementSizeWidth.value;
    const sizeHeight = this.inputPlacementSizeHeight.value;
    const weight = this.inputPlacementWeight.value;
    const description = this.inputPlacementDescription.value;
    const campaignId = this.props.campaignId;
    const status = this.inputPlacementStatus.value;
    if (name && startTime && endTime && sizeHeight && sizeWidth && weight
      && description && campaignId) {
      if (moment(endTime).format('x') > moment(startTime).format('x')) {
        this.props.createPlacement({
          name,
          startTime,
          endTime,
          sizeWidth,
          sizeHeight,
          weight,
          description,
          campaignId,
          status,
        }).then(() => {
          this.props.getCampaign(this.props.campaignId);
          this.clearInput();
        });
      } else {
        this.inputPlacementEndTime.value = null;
      }
    }
  }
  clearInput() { // eslint-disable-line no-unused-vars, class-methods-use-this
    this.inputPlacementName.value = null;
    this.inputPlacementSizeWidth.value = null;
    this.inputPlacementSizeHeight.value = null;
    this.inputPlacementWeight.value = null;
    this.inputPlacementDescription.value = null;
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
              <div className="nav-tabs-custom">
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
                        <div className="box box-info">
                          <div className="box-header with-border">
                            <h3 className="box-title">Change campaign information</h3>
                            <div className="box-tools pull-right">
                              <button type="button" className="btn btn-box-tool" data-widget="collapse">
                                <i className="fa fa-minus" />
                              </button>
                            </div>
                          </div>
                          {/* /.box-header */}
                          <UpdateCampaignForm
                            campaign={this.props.campaigns && this.props.campaigns.editing}
                            updateCampaign={this.props.updateCampaign}
                            advertisers={this.props.advertisers && this.props.advertisers.list}
                            deleteCampaign={this.props.deleteCampaign}
                            campaignId={this.props.campaignId}
                            getCampaign={this.props.getCampaign}
                          />
                        </div>
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
                            <div className="box box-info">
                              <div className="box-header with-border">
                                <h3 className="box-title">Create New Placement</h3>
                                <div className="box-tools pull-right">
                                  <button type="button" className="btn btn-box-tool" data-widget="collapse">
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
                            <div className="box box-info">
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
};

export default withStyles(s)(connect(mapState, mapDispatch)(Campaign));
