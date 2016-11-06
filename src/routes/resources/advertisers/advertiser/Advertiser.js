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
import Link from '../../../../components/Link';
import CampaignList from '../../campaigns/CampaignList';
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
  constructor(props, context) {
    super(props, context);

    this.state = {
      searchText: '',
    };
  }
  componentWillMount() {
    this.props.getAdvertiser(this.props.advertiserId);
  }

  componentDidMount() {
    const dateStart = new Date();
    dateStart.setDate(dateStart.getDate());
    const dateEnd = new Date();
    dateEnd.setDate(dateEnd.getDate() + 1);
    /* eslint-disable no-undef */
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
    /* eslint-enable no-undef */
  }

  componentWillReceiveProps(nextProps) {
    const {
      email,
      name,
      contact,
      description,
      status,
    } = nextProps.advertisers && (nextProps.advertisers.editing || {});

    this.inputAdvertiserContact.value = contact;
    this.inputAdvertiserName.value = name;
    this.inputAdvertiserEmail.value = email;
    this.inputAdvertiserDescription.value = description;
    this.inputAdvertiserStatus.value = status;
  }
  componentDidUpdate() {
    /* eslint-disable no-undef */
    $('input[type="checkbox"].inputChooseCampaign').iCheck({
      checkboxClass: 'icheckbox_minimal-blue',
      radioClass: 'iradio_minimal-blue',
    });
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


  isIndexOf(...args) {
    for (let i = 0; i < args.length; i += 1) {
      if (args[i].toLowerCase().indexOf(this.state.searchText.toLowerCase()) !== -1) {
        return true;
      }
    }
    return false;
  }

  updateAdvertiser() {
    const name = this.inputAdvertiserName.value;
    const contact = this.inputAdvertiserContact.value;
    const email = this.inputAdvertiserEmail.value;
    const description = this.inputAdvertiserDescription.value;
    const status = this.inputAdvertiserStatus.value;
    const advertiser = { id: this.props.advertiserId };
    if (email && email !== this.props.advertisers.editing.email) {
      advertiser.email = email;
    }

    if (name && name !== this.props.advertisers.editing.name) {
      advertiser.name = name;
    }

    if (contact && contact !== this.props.advertisers.editing.contact) {
      advertiser.contact = contact;
    }

    if (description && description !== this.props.advertisers.editing.description) {
      advertiser.description = description;
    }

    if (status && status !== this.props.advertisers.editing.status) {
      advertiser.status = status;
    }

    this.props.updateAdvertiser(advertiser).then(() => {
      this.props.getAdvertiser(this.props.advertiserId);
    });
  }

  deleteAdvertiser() {
    this.props.deleteAdvertiser(this.props.advertiserId);
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
                          <form className="form-horizontal">
                            <div className="box-body">
                              <div className="form-group">
                                <label
                                  htmlFor="inputAdvertiserName"
                                  className="col-sm-3 control-label"
                                >Name</label>
                                <div className="col-sm-9">
                                  <input
                                    type="text" className="form-control" id="inputAdvertiserName"
                                    placeholder="Dan Tri"
                                    ref={c => {
                                      this.inputAdvertiserName = c;
                                    }}
                                  />
                                </div>
                              </div>
                              <div className="form-group">
                                <label
                                  htmlFor="inputAdvertiserContact" className="col-sm-3 control-label"
                                >Contact</label>
                                <div className="col-sm-9">
                                  <input
                                    type="text" className="form-control" id="inputAdvertiserContact"
                                    placeholder="0987666888"
                                    ref={c => {
                                      this.inputAdvertiserContact = c;
                                    }}
                                  />
                                </div>
                              </div>
                              <div className="form-group">
                                <label
                                  htmlFor="inputAdvertiserEmail"
                                  className="col-sm-3 control-label"
                                >Email</label>
                                <div className="col-sm-9">
                                  <input
                                    type="text" className="form-control" id="inputAdvertiserEmail"
                                    placeholder="contact@dantri.com.vn"
                                    ref={c => {
                                      this.inputAdvertiserEmail = c;
                                    }}
                                  />
                                </div>
                              </div>
                              <div className="form-group">
                                <label
                                  htmlFor="inputAdvertiserStatus"
                                  className="col-sm-3 control-label"
                                >Status</label>
                                <div className="col-sm-9">
                                  <select
                                    id="inputAdvertiserStatus" className="form-control"
                                    ref={c => {
                                      this.inputAdvertiserStatus = c;
                                    }}
                                  >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                  </select>
                                </div>
                              </div>
                              <div className="form-group">
                                <label
                                  htmlFor="inputAdvertiserDescription"
                                  className="col-sm-3 control-label"
                                >Description</label>
                                <div className="col-sm-9">
                                  <textarea
                                    className="form-control" id="inputAdvertiserDescription"
                                    rows="5" placeholder="More info..."
                                    ref={c => {
                                      this.inputAdvertiserDescription = c;
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                            {/* /.box-body */}
                            <div className="box-footer">
                              {/* eslint-disable jsx-a11y/no-static-element-interactions */}
                              <Link
                                to="/resource/advertiser"
                                className="btn btn-app pull-right"
                              ><i className="fa fa-undo" /> Cancel</Link>
                              <Link
                                to="/resource/advertiser"
                                className="btn btn-app pull-right"
                                onClick={event => this.deleteAdvertiser(event)}
                              ><i className="fa fa-trash-o" /> Delete</Link>
                              <a
                                className="btn btn-app pull-right"
                                onClick={event => this.updateAdvertiser(event)}
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
                                        ref={c => {
                                          this.inputCampaignName = c;
                                        }}
                                      />
                                    </div>
                                  </div>
                                  <div className="form-group has-feedback">
                                    <label
                                      htmlFor="inputCampaignStartTime" className="col-sm-3 control-label"
                                    >Start Time:</label>
                                    <div className=" col-sm-9 date">
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
                                      htmlFor="inputCampaignEndTime" className="col-sm-3 control-label"
                                    >End Time:</label>
                                    <div className=" col-sm-9 date">
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
                                      htmlFor="inputCampaignViews" className="col-sm-3 control-label"
                                    >Total Views</label>
                                    <div className="col-sm-9">
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
                                      className="col-sm-3 control-label"
                                    >Views/Session</label>
                                    <div className="col-sm-9">
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
                                      className="col-sm-3 control-label"
                                    >Time reset view(h)</label>
                                    <div className="col-sm-9">
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
                                      className="col-sm-3 control-label"
                                    >Weight</label>
                                    <div className="col-sm-9">
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
                                      className="col-sm-3 control-label"
                                    >Status</label>
                                    <div className="col-sm-9">
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
                                      className="col-sm-3 control-label"
                                    >Description</label>
                                    <div className="col-sm-9">
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
