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
import Link from '../../../../components/Link';
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

    $('input[type="checkbox"].inputChoosePlacement').iCheck({
      checkboxClass: 'icheckbox_minimal-blue',
      radioClass: 'iradio_minimal-blue',
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

  componentWillReceiveProps(nextProps) {
    const {
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
    } = nextProps.campaigns && (nextProps.campaigns.editing || {});

    this.inputCampaignName.value = name;
    this.inputAdvertiser.value = advertiserId;
    this.inputCampaignStartTime.value = moment(new Date(startTime)).format('L');
    this.inputCampaignEndTime.value = moment(new Date(endTime)).format('L');
    this.inputCampaignViews.value = views;
    this.inputCampaignViewPerSession.value = viewPerSession;
    this.inputCampaignTimeResetViewCount.value = timeResetViewCount;
    this.inputCampaignWeight.value = weight;
    this.inputCampaignDescription.value = description;
    this.inputCampaignStatus.value = status;
  }

  componentDidUpdate() {
    /* eslint-disable no-undef */
    $('input[type="checkbox"].inputChoosePlacement').iCheck({
      checkboxClass: 'icheckbox_minimal-blue',
      radioClass: 'iradio_minimal-blue',
    });
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

  isIndexOf(...args) {
    for (let i = 0; i < args.length; i += 1) {
      if (args[i] !== undefined) {
        if (args[i].toLowerCase().indexOf(this.state.searchText.toLowerCase()) !== -1) {
          return true;
        }
      }
    }
    return false;
  }

  searchFor(event) {
    event.persist();
    this.setState((previousState) => ({
      ...previousState,
      searchText: event.target.value.trim(),
    }));
  }

  updateCampaign() {
    const advertiserId = this.inputAdvertiser.value;
    const name = this.inputCampaignName.value;
    const startTime = this.inputCampaignStartTime.value;
    const endTime = this.inputCampaignEndTime.value;
    const views = this.inputCampaignViews.value;
    const viewPerSession = this.inputCampaignViewPerSession.value;
    const timeResetViewCount = this.inputCampaignTimeResetViewCount.value;
    const weight = this.inputCampaignWeight.value;
    const description = this.inputCampaignDescription.value;
    const status = this.inputCampaignStatus.value;
    const campaign = { id: this.props.campaignId };

    if (name && name !== this.props.campaigns.editing.name) {
      campaign.name = name;
    }
    if (advertiserId &&
      advertiserId !== this.props.campaigns.editing.advertiserId) {
      campaign.advertiserId = advertiserId;
    }
    if (startTime && startTime !== this.props.campaigns.editing.startTime) {
      campaign.startTime = startTime;
    }

    if (endTime && endTime !== this.props.campaigns.editing.endTime) {
      campaign.endTime = endTime;
    }
    if (views && views !== this.props.campaigns.editing.views) {
      campaign.views = views;
    }
    if (viewPerSession &&
      viewPerSession !== this.props.campaigns.editing.viewPerSession) {
      campaign.viewPerSession = viewPerSession;
    }
    if (timeResetViewCount &&
      timeResetViewCount !== this.props.campaigns.editing.timeResetViewCount) {
      campaign.timeResetViewCount = timeResetViewCount;
    }
    if (weight && weight !== this.props.campaigns.editing.weight) {
      campaign.weight = weight;
    }

    if (description &&
      description !== this.props.campaigns.editing.description) {
      campaign.description = description;
    }
    if (status && status !== this.props.campaigns.editing.status) {
      campaign.status = status;
    }
    if (moment(new Date(startTime)).format('x') < moment(new Date(endTime)).format('x')) {
      this.props.updateCampaign(campaign).then(() => {
        this.props.getCampaign(this.props.campaignId);
      });
    } else {
      this.inputCampaignEndTime.value = null;
      this.inputCampaignEndTime.focus();
    }
  }

  deleteCampaign() {
    this.props.deleteCampaign(this.props.campaignId);
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
                                <label
                                  htmlFor="inputAdvertiser" className="col-sm-2 control-label"
                                >Advertiser</label>
                                <div className="col-sm-10">
                                  <select
                                    id="inputAdvertiser" className="form-control"
                                    ref={c => {
                                      this.inputAdvertiser = c;
                                    }}
                                  >
                                    {this.props.advertisers.list &&
                                    this.props.advertisers.list.map(advertiser => (
                                      <option key={advertiser.id} value={advertiser.id}>
                                        {advertiser.name}</option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                              <div className="form-group has-feedback">
                                <label
                                  htmlFor="inputCampaignStartTime" className="col-sm-2 control-label"
                                >Start Time:</label>
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
                                  htmlFor="inputCampaignEndTime" className="col-sm-2 control-label"
                                >End Time:</label>
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
                                <label
                                  htmlFor="inputCampaignViews" className="col-sm-2 control-label"
                                >Total Views</label>
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
                                <label
                                  htmlFor="inputCampaignViewPerSession"
                                  className="col-sm-2 control-label"
                                >Views/Session</label>
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
                                <label
                                  htmlFor="inputCampaignTimeResetViewCount"
                                  className="col-sm-2 control-label"
                                >Time reset view(h)</label>
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
                                    className="form-control" id="inputCampaignDescription" rows="5"
                                    placeholder="More info..."
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
                              <Link
                                to="/resource/campaign"
                                className="btn btn-app pull-right"
                              ><i className="fa fa-undo" /> Cancel</Link>
                              <Link
                                to="/resource/campaign"
                                className="btn btn-app pull-right"
                                onClick={event => this.deleteCampaign(event)}
                              ><i className="fa fa-trash-o" /> Delete</Link>
                              <a
                                className="btn btn-app pull-right"
                                onClick={event => this.updateCampaign(event)}
                              ><i className="fa fa-floppy-o" /> Save</a>
                              {/* eslint-enable jsx-a11y/no-static-element-interactions */}
                            </div>
                            {/* /.box-footer */}
                          </form>
                        </div>
                        {/* /.col */}
                      </section>
                    </div>
                  </div>
                  <div className="tab-pane" id="addPlacement">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="row">
                          <section className="col-lg-6">
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
                              <form className="form-horizontal">
                                <div className="box-body">
                                  <div className="form-group">
                                    <label
                                      htmlFor="inputPlacementName" className="col-sm-2 control-label"
                                    >Name</label>
                                    <div className="col-sm-10">
                                      <input
                                        type="text" className="form-control" id="inputPlacementName"
                                        placeholder="Admicro"
                                        ref={c => {
                                          this.inputPlacementName = c;
                                        }}
                                      />
                                    </div>
                                  </div>
                                  <div className="form-group has-feedback">
                                    <label
                                      htmlFor="inputPlacementStartTime" className="col-sm-2 control-label"
                                    >Start Time:</label>
                                    <div className=" col-sm-10 date">
                                      <span className="fa fa-calendar form-control-feedback" />
                                      <input
                                        type="text" className="form-control pull-right"
                                        id="inputPlacementStartTime"
                                        ref={c => {
                                          this.inputPlacementStartTime = c;
                                        }}
                                      />
                                    </div>
                                  </div>
                                  <div className="form-group has-feedback">
                                    <label
                                      htmlFor="inputPlacementEndTime" className="col-sm-2 control-label"
                                    >End Time:</label>
                                    <div className=" col-sm-10 date">
                                      <span className="fa fa-calendar form-control-feedback" />
                                      <input
                                        type="text" className="form-control pull-right"
                                        id="inputPlacementEndTime"
                                        ref={c => {
                                          this.inputPlacementEndTime = c;
                                        }}
                                      />
                                    </div>
                                  </div>
                                  <div className="form-group">
                                    <label htmlFor="inputPlacementSizeWidth" className="col-sm-2 control-label">Size(Width)</label>
                                    <div className="col-sm-10">
                                      <input
                                        type="number" className="form-control"
                                        id="inputPlacementSizeWidth"
                                        placeholder="300"
                                        ref={c => {
                                          this.inputPlacementSizeWidth = c;
                                        }}
                                      />
                                    </div>
                                  </div>
                                  <div className="form-group">
                                    <label htmlFor="inputPlacementSizeHeight" className="col-sm-2 control-label">Size(Height)</label>
                                    <div className="col-sm-10">
                                      <input
                                        type="number" className="form-control"
                                        id="inputPlacementSizeHeight"
                                        placeholder="300"
                                        ref={c => {
                                          this.inputPlacementSizeHeight = c;
                                        }}
                                      />
                                    </div>
                                  </div>
                                  <div className="form-group">
                                    <label
                                      htmlFor="inputPlacementWeight"
                                      className="col-sm-2 control-label"
                                    >Weight</label>
                                    <div className="col-sm-10">
                                      <input
                                        type="text" className="form-control" id="inputPlacementWeight"
                                        placeholder="1"
                                        ref={c => {
                                          this.inputPlacementWeight = c;
                                        }}
                                      />
                                    </div>
                                  </div>
                                  <div className="form-group">
                                    <label
                                      htmlFor="inputPlacementStatus"
                                      className="col-sm-2 control-label"
                                    >Status</label>
                                    <div className="col-sm-10">
                                      <select
                                        id="inputPlacementStatus" className="form-control"
                                        ref={c => {
                                          this.inputPlacementStatus = c;
                                        }}
                                      >
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                      </select>
                                    </div>
                                  </div>

                                  <div className="form-group">
                                    <label
                                      htmlFor="inputPlacementDescription"
                                      className="col-sm-2 control-label"
                                    >Description</label>
                                    <div className="col-sm-10">
                                      <textarea
                                        className="form-control" id="inputPlacementDescription"
                                        rows="5"
                                        placeholder="More info..."
                                        ref={c => {
                                          this.inputPlacementDescription = c;
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
                                    onClick={event => this.createPlacement(event)}
                                  ><i className="fa fa-check" /> Confirm</a>
                                  {/* eslint-enable jsx-a11y/no-static-element-interactions */}
                                </div>
                                {/* /.box-footer */}
                              </form>
                            </div>
                            {/* /.col */}
                          </section>
                          <section className="col-lg-6">
                            {/* BOX: LIST OF Placements */}
                            <div className="box box-info">
                              <div className="box-header with-border">
                                <h3 className="box-title">List Placement of {
                                  this.props.campaigns.editing ?
                                    this.props.campaigns.editing.name : '...'
                                }</h3>

                                <div className="box-tools">
                                  <div className="input-group input-group-sm" style={{ width: 150 }}>
                                    <input
                                      type="text" name="inputSearchPlacements"
                                      className="form-control pull-right"
                                      placeholder="Search..." onChange={event => this.searchFor(event)}
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
                                      <th><input type="checkbox" className="inputChoosePlacement" /></th>
                                      <th>Name</th>
                                      <th>Size</th>
                                      <th>Start Time</th>
                                      <th>End Time</th>
                                      <th>&nbsp;</th>
                                      <th>&nbsp;</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    { this.props.campaigns.editing &&
                                    this.props.campaigns.editing.placements &&
                                    this.props.campaigns.editing.placements.map(placement => {
                                      if (this.isIndexOf(placement.name, placement.startTime,
                                          placement.endTime, placement.sizeWidth,
                                          placement.sizeHeight,
                                          placement.description, placement.weight)) {
                                        return (
                                          <tr key={placement.id}>
                                            <th><input type="checkbox" className="inputChoosePlacement" /></th>
                                            <th><Link to={`/placement/${placement.id}`}>{placement.name}</Link>
                                            </th>
                                            <td>
                                              {placement.sizeWidth}px - {placement.sizeHeight}px
                                            </td>
                                            <td>{moment(new Date(placement.startTime)).format('L')}</td>
                                            <td>{moment(new Date(placement.endTime)).format('L')}</td>
                                            <th><Link to={`/placement/${placement.id}`}>Add Banner</Link></th>
                                            <th><Link to={`/placement/${placement.id}`}>Add Zone</Link></th>
                                          </tr>
                                        );
                                      }
                                      return false;
                                    })}
                                  </tbody>
                                  <tfoot>
                                    <tr>
                                      <th><input type="checkbox" className="inputChoosePlacement" /></th>
                                      <th>Name</th>
                                      <th>Size</th>
                                      <th>Start Time</th>
                                      <th>End Time</th>
                                      <th>&nbsp;</th>
                                      <th>&nbsp;</th>
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
