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
import { getCampaign, updateCampaignIncludePlacement, deleteCampaign } from '../../actions/campaigns';
import { getAdvertisers } from '../../actions/advertisers';
import { createPlacement } from '../../actions/placements';
import Layout from '../../components/Layout';
import Link from '../../components/Link';
import s from './Campaign.css';
// import { defineMessages, FormattedRelative } from 'react-intl';

const pageTitle = 'Campaign';

class Campaign extends Component {

  static propTypes = {
    campaignId: PropTypes.string.isRequired,
    campaigns: PropTypes.object,
    advertisers: PropTypes.object,
    getCampaign: PropTypes.func,
    getAdvertisers: PropTypes.func,
    updateCampaignIncludePlacement: PropTypes.func,
    deleteCampaign: PropTypes.func,
    placements: PropTypes.object,
    createPlacement: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      advertiserId: '',
      name: '',
      startTime: Date.now(),
      endTime: Date.now(),
      views: 0,
      viewPerSession: 0,
      timeResetViewCount: 0,
      weight: 1,
      description: '',
      searchText: '',
    };
  }

  componentWillMount() {
    this.props.getCampaign(this.props.campaignId);
    this.props.getAdvertisers();
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
    } = nextProps.campaigns && (nextProps.campaigns.current || {});

    document.getElementById('inputCampaignName').value = name;
    document.getElementById('inputAdvertiser').value = advertiserId;
    document.getElementById('inputCampaignStartTime').value = moment(new Date(startTime)).format('L');
    document.getElementById('inputCampaignEndTime').value = moment(new Date(endTime)).format('L');
    document.getElementById('inputCampaignViews').value = views;
    document.getElementById('inputCampaignViewPerSession').value = viewPerSession;
    document.getElementById('inputCampaignTimeResetViewCount').value = timeResetViewCount;
    document.getElementById('inputCampaignWeight').value = weight;
    document.getElementById('inputCampaignDescription').value = description;
  }

  componentDidUpdate() {
    /* eslint-disable no-undef */
    $('input[type="checkbox"].inputChoosePlacement').iCheck({
      checkboxClass: 'icheckbox_minimal-blue',
      radioClass: 'iradio_minimal-blue',
    });
    /* eslint-enable no-undef */
  }

  onInputChange(event, field) {
    event.persist();

    this.setState(previousState => ({
      ...previousState,
      [field]: event.target.value,
    }));
  }

  createPlacement() {
    const name = document.getElementById('inputPlacementName').value;
    const startTime = new Date(moment(new Date(document.getElementById('inputPlacementStartTime').value)).format('YYYY-MM-DD 00:00:00'));
    const endTime = new Date(moment(new Date(document.getElementById('inputPlacementEndTime').value)).format('YYYY-MM-DD 00:00:00'));
    const size = document.getElementById('inputPlacementSize').value;
    const weight = document.getElementById('inputPlacementWeight').value;
    const description = document.getElementById('inputPlacementDescription').value;
    const campaignId = this.props.campaignId;
    if (name && startTime && endTime && size && weight && description && campaignId) {
      if (endTime > startTime) {
        this.props.createPlacement({
          name,
          startTime,
          endTime,
          size,
          weight,
          description,
          campaignId,
        }).then(() => {
          this.props.getCampaign(this.props.campaignId);
          this.clearInput();
        });
      } else {
        document.getElementById('inputPlacementEndTime').value = null;
      }
    }
  }

  clearInput() { // eslint-disable-line no-unused-vars, class-methods-use-this
    document.getElementById('inputPlacementName').value = null;
    document.getElementById('inputPlacementStartTime').value = null;
    document.getElementById('inputPlacementEndTime').value = null;
    document.getElementById('inputPlacementSize').value = null;
    document.getElementById('inputPlacementWeight').value = null;
    document.getElementById('inputPlacementDescription').value = null;
  }
  isIndexOf(...args) {
    for (let i = 0; i < args.length; i += 1) {
      if (args[i].toLowerCase().indexOf(this.state.searchText.toLowerCase()) !== -1) {
        return true;
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

  updateCampaignIncludePlacement() {
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
    } = this.state;
    const campaign = { id: this.props.campaignId };

    if (name && name !== this.props.campaigns.current.name) {
      campaign.name = name;
    }
    if (advertiserId &&
      advertiserId !== this.props.campaigns.current.advertiserId) {
      campaign.advertiserId = document.getElementById('inputAdvertiser').value;
    }
    if (startTime && startTime !== this.props.campaigns.current.startTime) {
      campaign.startTime = new Date(document.getElementById('inputCampaignStartTime').value);
    }

    if (endTime && endTime !== this.props.campaigns.current.endTime) {
      campaign.endTime = new Date(document.getElementById('inputCampaignEndTime').value);
    }
    if (views && views !== this.props.campaigns.current.views) {
      campaign.views = views;
    }
    if (viewPerSession &&
      viewPerSession !== this.props.campaigns.current.viewPerSession) {
      campaign.viewPerSession = viewPerSession;
    }
    if (timeResetViewCount &&
      timeResetViewCount !== this.props.campaigns.current.timeResetViewCount) {
      campaign.timeResetViewCount = timeResetViewCount;
    }
    if (weight && weight !== this.props.campaigns.current.weight) {
      campaign.weight = weight;
    }

    if (description &&
      description !== this.props.campaigns.current.description) {
      campaign.description = description;
    }
    if (moment(new Date(document.getElementById('inputCampaignStartTime').value)).format('x') < moment(new Date(document.getElementById('inputCampaignEndTime').value))) {
      this.props.updateCampaignIncludePlacement(campaign);
    } else {
      document.getElementById('inputCampaignEndTime').value = null;
      document.getElementById('inputCampaignEndTime').focus();
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
            .concat(this.props.campaigns.current ? this.props.campaigns.current.name : '...')
        }
        pageSubTitle=""
      >
        <div>

          <div className="row">
            <section className="col-lg-12">
              <section className="col-lg-6">
                {/* BOX: FORM OF CREATE NEW WEBSITE */}
                <div className="box box-primary">
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
                          htmlFor="inputCampaignName" className="col-sm-3 control-label"
                        >Name</label>
                        <div className="col-sm-9">
                          <input
                            type="text" className="form-control" id="inputCampaignName"
                            placeholder="Admicro"
                            onChange={event => this.onInputChange(event, 'name')}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="inputAdvertiser" className="col-sm-3 control-label"> Advertiser </label>
                        <div className="col-sm-9">
                          <select id="inputAdvertiser" className="form-control" onChange={event => this.onInputChange(event, 'advertiserId')}>
                            {this.props.advertisers.latest &&
                            this.props.advertisers.latest.map(advertiser => (
                              <option key={advertiser.id} value={advertiser.id}>
                                {advertiser.name}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="form-group has-feedback">
                        <label htmlFor="inputCampaignStartTime" className="col-sm-3 control-label">Start Time:</label>
                        <div className=" col-sm-9 date">
                          <span className="fa fa-calendar form-control-feedback" />
                          <input type="text" className="form-control pull-right" id="inputCampaignStartTime" onChange={event => this.onInputChange(event, 'startTime')} />
                        </div>
                      </div>
                      <div className="form-group has-feedback">
                        <label htmlFor="inputCampaignEndTime" className="col-sm-3 control-label">End Time:</label>
                        <div className=" col-sm-9 date">
                          <span className="fa fa-calendar form-control-feedback" />
                          <input type="text" className="form-control pull-right" id="inputCampaignEndTime" onChange={event => this.onInputChange(event, 'endTime')} />
                        </div>
                      </div>

                      <div className="form-group">
                        <label htmlFor="inputCampaignViews" className="col-sm-3 control-label">Total Views</label>
                        <div className="col-sm-9">
                          <input
                            type="number" className="form-control" id="inputCampaignViews"
                            placeholder="1000"
                            onChange={event => this.onInputChange(event, 'views')}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="inputCampaignViewPerSession" className="col-sm-3 control-label">Views/Session</label>
                        <div className="col-sm-9">
                          <input
                            type="number" className="form-control" id="inputCampaignViewPerSession"
                            placeholder="10"
                            onChange={event => this.onInputChange(event, 'viewPerSession')}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="inputCampaignTimeResetViewCount" className="col-sm-3 control-label">Time reset view(h)</label>
                        <div className="col-sm-9">
                          <input
                            type="number" className="form-control"
                            id="inputCampaignTimeResetViewCount"
                            placeholder="24"
                            onChange={event => this.onInputChange(event, 'timeResetViewCount')}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label
                          htmlFor="inputCampaignWeight"
                          className="col-sm-3 control-label"
                        >Weight</label>
                        <div className="col-sm-9">
                          <input
                            type="number" className="form-control" id="inputCampaignWeight"
                            placeholder="1" onChange={event => this.onInputChange(event, 'weight')}
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label
                          htmlFor="inputCampaignDescription"
                          className="col-sm-3 control-label"
                        >Description</label>
                        <div className="col-sm-9">
                          <textarea className="form-control" id="inputCampaignDescription" rows="5" placeholder="More info..." onChange={event => this.onInputChange(event, 'description')} />
                        </div>
                      </div>
                    </div>
                    {/* /.box-body */}
                    <div className="box-footer">
                      {/* eslint-disable jsx-a11y/no-static-element-interactions */}
                      <Link
                        to="/campaigns"
                        className={'btn btn-app pull-right '.concat(s.btn)}
                      ><i className="fa fa-undo" /> Cancel</Link>
                      <Link
                        to="/campaigns"
                        className={'btn btn-app pull-right '.concat(s.btn)}
                        onClick={event => this.deleteCampaign(event)}
                      ><i className="fa fa-trash-o" /> Delete</Link>
                      <a
                        className={'btn btn-app pull-right '.concat(s.btn)}
                        onClick={event => this.updateCampaignIncludePlacement(event)}
                      ><i className="fa fa-floppy-o" /> Save</a>
                      {/* eslint-enable jsx-a11y/no-static-element-interactions */}
                    </div>
                    {/* /.box-footer */}
                  </form>
                </div>
                {/* /.col */}
              </section>
              <section className="col-lg-6">
                {/* BOX: FORM OF CREATE NEW PlacementS */}
                <div className="box box-primary">
                  <div className="box-header with-border">
                    <h3 className="box-title">Create New Placement</h3>
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
                          htmlFor="inputPlacementName" className="col-sm-3 control-label"
                        >Name</label>
                        <div className="col-sm-9">
                          <input
                            type="text" className="form-control" id="inputPlacementName"
                            placeholder="Admicro"
                          />
                        </div>
                      </div>
                      <div className="form-group has-feedback">
                        <label htmlFor="inputPlacementStartTime" className="col-sm-3 control-label">Start Time:</label>
                        <div className=" col-sm-9 date">
                          <span className="fa fa-calendar form-control-feedback" />
                          <input type="text" className="form-control pull-right" id="inputPlacementStartTime" />
                        </div>
                      </div>
                      <div className="form-group has-feedback">
                        <label htmlFor="inputPlacementEndTime" className="col-sm-3 control-label">End Time:</label>
                        <div className=" col-sm-9 date">
                          <span className="fa fa-calendar form-control-feedback" />
                          <input type="text" className="form-control pull-right" id="inputPlacementEndTime" />
                        </div>
                      </div>

                      <div className="form-group">
                        <label htmlFor="inputPlacementSize" className="col-sm-3 control-label">Size</label>
                        <div className="col-sm-9">
                          <input
                            type="text" className="form-control"
                            id="inputPlacementSize"
                            placeholder="300x300"
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label
                          htmlFor="inputPlacementWeight"
                          className="col-sm-3 control-label"
                        >Weight</label>
                        <div className="col-sm-9">
                          <input
                            type="text" className="form-control" id="inputPlacementWeight"
                            placeholder="1"
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label
                          htmlFor="inputPlacementDescription"
                          className="col-sm-3 control-label"
                        >Description</label>
                        <div className="col-sm-9">
                          <textarea className="form-control" id="inputPlacementDescription" rows="5" placeholder="More info..." />
                        </div>
                      </div>
                    </div>
                    {/* /.box-body */}
                    <div className="box-footer">
                      {/* eslint-disable jsx-a11y/no-static-element-interactions */}
                      <a
                        className={'btn btn-app pull-right '.concat(s.btn)}
                      ><i className="fa fa-eraser" /> Clear</a>
                      <a
                        className={'btn btn-app pull-right '.concat(s.btn)}
                        onClick={event => this.createPlacement(event)}
                      ><i className="fa fa-check" /> Confirm</a>
                      {/* eslint-enable jsx-a11y/no-static-element-interactions */}
                    </div>
                    {/* /.box-footer */}
                  </form>
                </div>
                {/* /.col */}
              </section>
            </section>
          </div>
          <div className="row">
            <section className="col-lg-12">
              {/* BOX: LIST OF Placements */}
              <div className="box box-info">
                <div className="box-header with-border">
                  <h3 className="box-title">List Placement of {
                    pageTitle
                      .concat(': ')
                      .concat(this.props.campaigns.current ? this.props.campaigns.current.name : '...')
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
                        <th>Weight</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      { this.props.campaigns.current &&
                      this.props.campaigns.current.placements.map(placement => {
                        if (this.isIndexOf(placement.name, placement.startTime,
                            placement.endTime, placement.size,
                            placement.description, placement.weight)) {
                          return (
                            <tr key={placement.id}>
                              <th><input type="checkbox" className="inputChoosePlacement" /></th>
                              <th><Link to={`/placement/${placement.id}`}>{placement.name}</Link>
                              </th>
                              <td>{placement.size}</td>
                              <td>{moment(new Date(placement.startTime)).format('L')}</td>
                              <td>{moment(new Date(placement.endTime)).format('L')}</td>
                              <td>{placement.weight}</td>
                              <td>{placement.description}</td>
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
                        <th>Weight</th>
                        <th>Description</th>
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
  updateCampaignIncludePlacement,
  getAdvertisers,
  deleteCampaign,
  createPlacement,
};

export default withStyles(s)(connect(mapState, mapDispatch)(Campaign));
