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
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { getCampaigns, createCampaign, getCampaignsFilters, setCampaignsFilters } from '../../../actions/campaigns';
import { getAdvertisers } from '../../../actions/advertisers';
import Layout from '../../../components/Layout';
import Link from '../../../components/Link';
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
    // iCheck for checkbox and radio inputs
    $('input[type="checkbox"].inputChooseCampaign').iCheck({
      checkboxClass: 'icheckbox_minimal-blue',
      radioClass: 'iradio_minimal-blue',
    });

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
    $('input[type="checkbox"].inputChooseCampaign').iCheck({
      checkboxClass: 'icheckbox_minimal-blue',
      radioClass: 'iradio_minimal-blue',
    });
    /* eslint-enable no-undef */
  }

  async onFilterChange(event, field) {
    event.persist();

    await this.props.setCampaignsFilters({
      [field]: event.target.value,
    });
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

  clearInput(event) { // eslint-disable-line no-unused-vars, class-methods-use-this
    this.inputCampaignName.value = null;
    this.inputCampaignViews.value = null;
    this.inputCampaignViewPerSession.value = null;
    this.inputCampaignTimeResetViewCount.value = null;
    this.inputCampaignWeight.value = null;
    this.inputCampaignDescription.value = null;
  }

  createCampaign() {
    const name = this.inputCampaignName.value;
    const advertiserId = this.inputAdvertiser.value;
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
          this.clearInput();
        });
      } else {
        this.inputCampaignEndTime.value = null;
        this.inputCampaignEndTime.focus();
      }
    }
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
                <form className="form-horizontal">
                  <div className="box-body">
                    <div className="form-group">
                      <label
                        htmlFor="inputCampaignsFilterAdvertiser"
                        className="col-sm-2 control-label"
                      >Website</label>
                      <div className="col-sm-10">
                        <select
                          id="inputCampaignsFilterAdvertiser"
                          className="form-control select2"
                          style={{ width: '100%' }}
                          ref={c => {
                            this.inputCampaignsFilterAdvertiser = c;
                          }}
                          onChange={event => this.onFilterChange(event, 'advertiserId')}
                          defaultValue={this.props.campaigns.filters &&
                          this.props.campaigns.filters.advertiserId}
                        >
                          <option value="null">All sites</option>
                          {this.props.advertisers.list &&
                          this.props.advertisers.list.map(advertiser => (
                            <option
                              key={advertiser.id} value={advertiser.id}
                            >{advertiser.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="inputCampaignsFilterStatus"
                        className="col-sm-2 control-label"
                      >Status</label>
                      <div className="col-sm-10">
                        <select
                          id="inputCampaignsFilterStatus" className="form-control"
                          ref={c => {
                            this.inputCampaignsFilterStatus = c;
                          }}
                          onChange={event => this.onFilterChange(event, 'status')}
                          defaultValue={this.props.campaigns.filters &&
                          this.props.campaigns.filters.status}
                        >
                          <option value="null">All states</option>
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  {/* /.box-body */}
                </form>
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
                <form className="form-horizontal">
                  <div className="box-body">
                    <div className="form-group">
                      <label
                        htmlFor="inputCampaignName" className="col-sm-2 control-label"
                      >Name</label>
                      <div className="col-sm-10">
                        <input
                          type="text" className="form-control" id="inputCampaignName"
                          placeholder="Admicro"
                          ref={c => {
                            this.inputCampaignName = c;
                          }}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="inputAdvertiser" className="col-sm-2 control-label">Advertiser</label>
                      <div className="col-sm-10">
                        <select
                          id="inputAdvertiser" className="form-control"
                          ref={c => {
                            this.inputAdvertiser = c;
                          }}
                        >
                          {this.props.advertisers.list
                          && this.props.advertisers.list.map(advertiser => (
                            <option
                              key={advertiser.id} value={advertiser.id}
                            >
                              {advertiser.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="form-group has-feedback">
                      <label
                        htmlFor="inputCampaignStartTime" className="col-sm-2 control-label"
                      >
                        Start Time
                      </label>
                      <div className=" col-sm-10 date">
                        <span className="fa fa-calendar form-control-feedback" />
                        <input
                          type="text" className="form-control pull-right"
                          id="inputCampaignStartTime"
                          ref={c => {
                            this.inputCampaignStartTime = c;
                          }}
                        />
                      </div>
                    </div>
                    <div className="form-group has-feedback">
                      <label
                        htmlFor="inputCampaignEndTime"
                        className="col-sm-2 control-label"
                      >
                        End Time
                      </label>
                      <div className=" col-sm-10 date">
                        <span className="fa fa-calendar form-control-feedback" />
                        <input
                          type="text" className="form-control pull-right"
                          id="inputCampaignEndTime"
                          ref={c => {
                            this.inputCampaignEndTime = c;
                          }}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="inputCampaignViews" className="col-sm-2 control-label">Total Views</label>
                      <div className="col-sm-10">
                        <input
                          type="number" className="form-control" id="inputCampaignViews"
                          placeholder="1000"
                          ref={c => {
                            this.inputCampaignViews = c;
                          }}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="inputCampaignViewPerSession" className="col-sm-2 control-label">Views/Session</label>
                      <div className="col-sm-10">
                        <input
                          type="number" className="form-control" id="inputCampaignViewPerSession"
                          placeholder="10"
                          ref={c => {
                            this.inputCampaignViewPerSession = c;
                          }}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="inputCampaignTimeResetViewCount" className="col-sm-2 control-label">Time reset view(h)</label>
                      <div className="col-sm-10">
                        <input
                          type="number" className="form-control"
                          id="inputCampaignTimeResetViewCount"
                          placeholder="24"
                          ref={c => {
                            this.inputCampaignTimeResetViewCount = c;
                          }}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="inputCampaignWeight"
                        className="col-sm-2 control-label"
                      >Weight</label>
                      <div className="col-sm-10">
                        <input
                          type="number" className="form-control" id="inputCampaignWeight"
                          placeholder="1"
                          ref={c => {
                            this.inputCampaignWeight = c;
                          }}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="inputCampaignStatus"
                        className="col-sm-2 control-label"
                      >Status</label>
                      <div className="col-sm-10">
                        <select
                          id="inputCampaignStatus" className="form-control"
                          ref={c => {
                            this.inputCampaignStatus = c;
                          }}
                        >
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group">
                      <label
                        htmlFor="inputCampaignDescription"
                        className="col-sm-2 control-label"
                      >Description</label>
                      <div className="col-sm-10">
                        <textarea
                          className="form-control" id="inputCampaignDescription"
                          rows="5" placeholder="More info..."
                          ref={c => {
                            this.inputCampaignDescription = c;
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  {/* /.box-body */}
                  <div className="box-footer">
                    {/* eslint-disable jsx-a11y/no-static-element-interactions */}
                    <a
                      className="btn btn-app pull-right"
                    ><i className="fa fa-eraser" /> Clear</a>
                    <a
                      className="btn btn-app pull-right"
                      onClick={event => this.createCampaign(event)}
                    ><i className="fa fa-check" /> Confirm</a>
                    {/* eslint-enable jsx-a11y/no-static-element-interactions */}
                  </div>
                  {/* /.box-footer */}
                </form>
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

                  <div className="box-tools">
                    <div className="input-group input-group-sm" style={{ width: 150 }}>
                      <input
                        type="text" name="inputSearchcampaigns"
                        className="form-control pull-right"
                        placeholder="Search..."
                      />
                      <div className="input-group-btn">
                        <button
                          type="submit" className="btn btn-default"
                        ><i className="fa fa-search" /></button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /.box-header */}
                <div className="box-body table-responsive no-padding">
                  <table id="example1" className="table table-hover">
                    <thead>
                      <tr>
                        <th><input type="checkbox" className="inputChooseCampaign" /></th>
                        <th>Name</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Views</th>
                        <th>View/Session</th>
                      </tr>
                    </thead>
                    <tbody>
                      { this.props.campaigns.list && this.props.campaigns.list.map(campaign => {
                        if (!this.isFiltered(campaign)) {
                          return false;
                        }
                        return (
                          <tr key={campaign.id}>
                            <th><input type="checkbox" className="inputChooseCampaign" /></th>
                            <th><Link to={`/resource/campaign/${campaign.id}`}>{campaign.name}</Link>
                            </th>
                            <td>{moment(new Date(campaign.startTime)).format('L')}</td>
                            <td>{moment(new Date(campaign.endTime)).format('L')}</td>
                            <td>{campaign.views}</td>
                            <td>{campaign.viewPerSession}</td>
                            <th><Link to={`/resource/campaign/${campaign.id}`}>Add New Placements</Link>
                            </th>
                          </tr>
                          );
                      })}
                    </tbody>
                    <tfoot>
                      <tr>
                        <th><input type="checkbox" className="inputChooseCampaign" /></th>
                        <th>Name</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Views</th>
                        <th>View/Session</th>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                {/* /.box-body */}
                <div className="box-footer clearfix">
                  <ul className="pagination pagination-sm no-margin pull-right">
                    <li><a>&laquo;</a></li>
                    <li><a>1</a></li>
                    <li><a>2</a></li>
                    <li><a>3</a></li>
                    <li><a>&raquo;</a></li>
                  </ul>
                </div>
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
