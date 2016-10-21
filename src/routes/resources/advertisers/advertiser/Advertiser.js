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
  updateAdvertiserIncludeCampaign,
  deleteAdvertiser,
} from '../../../../actions/advertisers';
import { createCampaignIncludeAdvertiser } from '../../../../actions/campaigns';
import Layout from '../../../../components/Layout';
import Link from '../../../../components/Link';
import s from './Advertiser.css';

const pageTitle = 'Advertiser';

class Advertiser extends Component {

  static propTypes = {
    advertiserId: PropTypes.string.isRequired,
    advertisers: PropTypes.object,
    updateAdvertiserIncludeCampaign: PropTypes.func,
    getAdvertiser: PropTypes.func,
    campaigns: PropTypes.object,
    createCampaignIncludeAdvertiser: PropTypes.func,
    deleteAdvertiser: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      searchText: '',
      name: '',
      email: '',
      contact: '',
      description: '',
    };
  }

  componentWillMount() {
    this.props.getAdvertiser(this.props.advertiserId);
  }

  componentDidMount() {
    /* eslint-disable no-undef */
    $('input[type="checkbox"].inputChooseCampaign').iCheck({
      checkboxClass: 'icheckbox_minimal-blue',
      radioClass: 'iradio_minimal-blue',
    });

    const dateStart = new Date();
    dateStart.setDate(dateStart.getDate());

    $('#inputCampaignStartTime').datepicker({
      autoclose: true,
      todayHighlight: 'TRUE',
      startDate: dateStart,
    });

    const dateEnd = new Date();
    dateEnd.setDate(dateEnd.getDate() + 1);
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
    } = nextProps.advertisers && (nextProps.advertisers.current || {});

    document.getElementById('inputAdvertiserContact').value = contact;
    document.getElementById('inputAdvertiserName').value = name;
    document.getElementById('inputAdvertiserEmail').value = email;
    document.getElementById('inputAdvertiserDescription').value = description;
  }

  onInputChange(event, field) {
    event.persist();
    this.setState(previousState => ({
      ...previousState,
      [field]: event.target.value,
    }));
  }

  createCampaignIncludeAdvertiser() {
    const name = document.getElementById('inputCampaignName').value;
    const advertiserId = this.props.advertiserId;
    const startTime = new Date(moment(new Date(document.getElementById('inputCampaignStartTime').value)).format('YYYY-MM-DD 00:00:00'));
    const endTime = new Date(moment(new Date(document.getElementById('inputCampaignEndTime').value)).format('YYYY-MM-DD 00:00:00'));
    const views = document.getElementById('inputCampaignViews').value;
    const viewPerSession = document.getElementById('inputCampaignViewPerSession').value;
    const timeResetViewCount = document.getElementById('inputCampaignTimeResetViewCount').value;
    const weight = document.getElementById('inputCampaignWeight').value;
    const description = document.getElementById('inputCampaignDescription').value;
    if (name && advertiserId && startTime && endTime && views && viewPerSession
      && timeResetViewCount && weight && description) {
      if (moment(startTime).format('x') < moment(endTime).format('x')) {
        this.props.createCampaignIncludeAdvertiser({
          advertiserId,
          name,
          startTime,
          endTime,
          views,
          viewPerSession,
          timeResetViewCount,
          weight,
          description,
        }).then(() => {
          this.props.getAdvertiser(this.props.advertiserId);
          this.clearInput();
        });
      } else {
        document.getElementById('inputCampaignEndTime').value = null;
        document.getElementById('inputCampaignEndTime').focus();
      }
    }
  }

  clearInput() { // eslint-disable-line no-unused-vars, class-methods-use-this
    document.getElementById('inputCampaignName').value = null;
    document.getElementById('inputCampaignStartTime').value = null;
    document.getElementById('inputCampaignEndTime').value = null;
    document.getElementById('inputCampaignViews').value = null;
    document.getElementById('inputCampaignViewPerSession').value = null;
    document.getElementById('inputCampaignTimeResetViewCount').value = null;
    document.getElementById('inputCampaignWeight').value = null;
    document.getElementById('inputCampaignDescription').value = null;
  }

  searchFor(event) {
    event.persist();
    this.setState((previousState) => ({
      ...previousState,
      searchText: event.target.value.trim(),
    }));
  }

  isIndexOf(...args) {
    for (let i = 0; i < args.length; i += 1) {
      if (args[i].toLowerCase().indexOf(this.state.searchText.toLowerCase()) !== -1) {
        return true;
      }
    }
    return false;
  }

  updateAdvertiserIncludeCampaign() {
    const { email, name, contact, description } = this.state;
    const advertiser = { id: this.props.advertiserId };
    if (email && email !== this.props.advertisers.current.email) {
      advertiser.email = email;
    }

    if (name && name !== this.props.advertisers.current.name) {
      advertiser.name = name;
    }

    if (contact && contact !== this.props.advertisers.current.contact) {
      advertiser.contact = contact;
    }

    if (description && description !== this.props.advertisers.current.description) {
      advertiser.description = description;
    }

    this.props.updateAdvertiserIncludeCampaign(advertiser);
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
            .concat(this.props.advertisers.current ? this.props.advertisers.current.name : '...')
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
                          className="col-sm-2 control-label"
                        >Name</label>
                        <div className="col-sm-10">
                          <input
                            type="text" className="form-control" id="inputAdvertiserName"
                            placeholder="Dan Tri"
                            onChange={event => this.onInputChange(event, 'name')}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label
                          htmlFor="inputAdvertiserContact" className="col-sm-2 control-label"
                        >Contact</label>
                        <div className="col-sm-10">
                          <input
                            type="text" className="form-control" id="inputAdvertiserContact"
                            placeholder="0987666888"
                            onChange={event => this.onInputChange(event, 'contact')}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label
                          htmlFor="inputAdvertiserEmail"
                          className="col-sm-2 control-label"
                        >Email</label>
                        <div className="col-sm-10">
                          <input
                            type="text" className="form-control" id="inputAdvertiserEmail"
                            placeholder="contact@dantri.com.vn"
                            onChange={event => this.onInputChange(event, 'email')}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label
                          htmlFor="inputAdvertiserDescription"
                          className="col-sm-2 control-label"
                        >Description</label>
                        <div className="col-sm-10">
                          <textarea
                            className="form-control" id="inputAdvertiserDescription"
                            rows="5" placeholder="More info..."
                            onChange={event => this.onInputChange(event, 'description')}
                          />
                        </div>
                      </div>
                    </div>
                    {/* /.box-body */}
                    <div className="box-footer">
                      {/* eslint-disable jsx-a11y/no-static-element-interactions */}
                      <Link
                        to="/resource/advertiser"
                        className={'btn btn-app pull-right '.concat(s.btn)}
                      ><i className="fa fa-undo" /> Cancel</Link>
                      <Link
                        to="/resource/advertiser"
                        className={'btn btn-app pull-right '.concat(s.btn)}
                        onClick={event => this.deleteAdvertiser(event)}
                      ><i className="fa fa-trash-o" /> Delete</Link>
                      <a
                        className={'btn btn-app pull-right '.concat(s.btn)}
                        onClick={event => this.updateAdvertiserIncludeCampaign(event)}
                      ><i className="fa fa-floppy-o" /> Save</a>
                      {/* eslint-enable jsx-a11y/no-static-element-interactions */}
                    </div>
                    {/* /.box-footer */}
                  </form>
                </div>
                {/* /.col */}
              </section>
              <section className="col-lg-6">
                <div className="box box-primary">
                  <div className="box-header with-border">
                    <h3 className="box-title">Create New Campaign</h3>
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
                          />
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
                        onClick={event => this.createCampaignIncludeAdvertiser(event)}
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
              {/* BOX: LIST OF campaigns */}
              <div className="box box-info">
                <div className="box-header with-border">
                  <h3 className="box-title">Campaigns of {
                    pageTitle
                      .concat(': ')
                      .concat(this.props.advertisers.current ? this.props.advertisers.current.name : '...')
                  } </h3>

                  <div className="box-tools">
                    <div className="input-group input-group-sm" style={{ width: 150 }}>
                      <input
                        type="text" name="inputSearchCampaign"
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
                        <th><input type="checkbox" className="inputChooseCampaign" /></th>
                        <th>Name</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.props.advertisers.current
                      && this.props.advertisers.current.campaigns.map(campaign => {
                        if (this.isIndexOf(campaign.name, campaign.startTime, campaign.endTime,
                            campaign.views, campaign.viewPerSession, campaign.timeResetViewCount)) {
                          return (
                            <tr key={campaign.id}>
                              <th><input type="checkbox" className="inputChooseCampaign" /></th>
                              <th><Link to={`/resource/campaign/${campaign.id}`}>{campaign.name}</Link>
                              </th>
                              <td>{moment(new Date(campaign.startTime)).format('L')}</td>
                              <td>{moment(new Date(campaign.endTime)).format('L')}</td>
                              <td><Link to={`/resource/campaign/${campaign.id}`}>Add New Placement</Link></td>
                            </tr>
                          );
                        }
                        return false;
                      })}
                    </tbody>
                    <tfoot>
                      <tr>
                        <th><input type="checkbox" className="inputChooseCampaign" /></th>
                        <th>Name</th>
                        <th>Start Time</th>
                        <th>End Time</th>
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
  updateAdvertiserIncludeCampaign,
  deleteAdvertiser,
  createCampaignIncludeAdvertiser,
};

export default withStyles(s)(connect(mapState, mapDispatch)(Advertiser));
