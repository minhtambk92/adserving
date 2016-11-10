/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import moment from 'moment';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { getCampaigns, createCampaign, getCampaignsFilters, setCampaignsFilters } from '../../../actions/campaigns';
import { getAdvertisers } from '../../../actions/advertisers';
import Layout from '../../../components/Layout';
import CreateCampaignForm from './CreateCampaignForm';
import FilterCampaignsForm from './FilterCampaignsForm';
import CampaignList from './CampaignList';
import s from './Campaigns.css';

const pageTitle = 'Campaigns';
const pageSubTitle = 'Control panel';

class Campaigns extends Component {
  static propTypes = {
    getCampaignsFilters: PropTypes.func,
    setCampaignsFilters: PropTypes.func,
    campaigns: PropTypes.object,
    getCampaigns: PropTypes.func,
    createCampaign: PropTypes.func,
    getAdvertisers: PropTypes.func,
    advertisers: PropTypes.object,
  };
  componentWillMount() {
    this.props.getCampaigns();
    this.props.getCampaignsFilters();
    this.props.getAdvertisers();
  }

  componentDidMount() {
    const dateEnd = new Date();
    dateEnd.setDate(dateEnd.getDate() + 1);
    const dateStart = new Date();
    dateStart.setDate(dateStart.getDate());
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
  }

  componentDidUpdate() {
    /* eslint-disable no-undef */
    $('#inputCampaignStartTime').datepicker('update', new Date());
    /* eslint-disable no-underscore-dangle */
    $('#inputCampaignEndTime').datepicker('update', moment().add(1, 'month')._d);
    /* eslint-enable no-underscore-dangle */
    /* eslint-enable no-undef */
  }

  async onFilterChange(event, field) {
    event.persist();

    await this.props.setCampaignsFilters({
      [field]: event.target.value,
    });
  }
  getFilteredCampaigns() {
    return _.filter(this.props.campaigns.list, campaign => this.isFiltered(campaign));
  }
  isFiltered(campaign) {
    const filters = this.props.campaigns.filters;

    for (const criteria in filters) { // eslint-disable-line no-restricted-syntax
      if (
        !{}.hasOwnProperty.call(campaign, criteria) ||
        filters[criteria] !== campaign[criteria]
      ) {
        return false;
      }
    }

    return true;
  }

  render() {
    return (
      <Layout pageTitle={pageTitle} pageSubTitle={pageSubTitle}>
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
                <FilterCampaignsForm
                  advertisers={this.props.advertisers.list}
                  filters={this.props.campaigns.filters}
                  setCampaignsFilters={this.props.setCampaignsFilters}
                />
              </div>
              {/* /.col */}
            </section>
          </div>
          <div className="row">
            <section className="col-lg-12">
              {/* BOX: FORM OF CREATE NEW CAMPAIGNS */}
              <div className="box box-info collapsed-box">
                <div className="box-header with-border">
                  <h3 className="box-title">Create New campaigns</h3>
                  <div className="box-tools pull-right">
                    <button type="button" className="btn btn-box-tool" data-widget="collapse">
                      <i className="fa fa-plus" />
                    </button>
                  </div>
                </div>
                {/* /.box-header */}
                {/* form start */}
                <CreateCampaignForm
                  filters={this.props.campaigns.filters}
                  advertisers={this.props.advertisers.list}
                  createCampaign={this.props.createCampaign}
                />
              </div>
              {/* /.col */}
            </section>
          </div>

          {/* Main row */}
          <div className="row">
            <section className="col-lg-12">
              {/* BOX: LIST OF campaigns */}
              <div className="box box-info">
                <div className="box-header with-border">
                  <h3 className="box-title">List Campaign</h3>
                </div>
                {/* /.box-header */}
                <div className="box-body">
                  <CampaignList list={this.getFilteredCampaigns()} />
                </div>
                {/* /.box-body */}
              </div>
              {/* /.box */}
            </section>
            {/* /.col */}
          </div>
          {/* /.row (main row) */}
        </div>
      </Layout>
    );
  }

}
const mapState = (state) => ({
  campaigns: state.campaigns,
  advertisers: state.advertisers,
});

const mapDispatch = {
  getCampaignsFilters,
  setCampaignsFilters,
  getCampaigns,
  createCampaign,
  getAdvertisers,
};

export default withStyles(s)(connect(mapState, mapDispatch)(Campaigns));
