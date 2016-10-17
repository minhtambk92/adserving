/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { getCampaign, updateCampaign, deleteCampaign } from '../../actions/campaigns';
import Layout from '../../components/Layout';
import Link from '../../components/Link';
import s from './Campaign.css';
// import { defineMessages, FormattedRelative } from 'react-intl';

const pageTitle = 'Campaign';

class Campaign extends Component {

  static propTypes = {
    campaignId: PropTypes.string.isRequired,
    campaigns: PropTypes.object,
    getCampaign: PropTypes.func,
    updateCampaign: PropTypes.func,
    deleteCampaign: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);

    // this.state = {
    //   advertiserId: '',
    //   userId: '',
    //   name: '',
    //   startTime: Date.now(),
    //   endTime: Date.now(),
    //   views: 0,
    //   viewPerSession: 0,
    //   timeResetViewCount: 0,
    //   weight: 1,
    //   description: '',
    // };
  }

  componentWillMount() {
    this.props.getCampaign(this.props.campaignId);
  }

  componentDidMount() {
    /* eslint-disable no-undef */
    // $('.select2').select2();
    // $('#example1').DataTable(); // eslint-disable-line new-cap

    // iCheck for checkbox and radio inputs
    $('input[type="checkbox"].inputChooseCampaign').iCheck({
      checkboxClass: 'icheckbox_minimal-blue',
      radioClass: 'iradio_minimal-blue',
    });
    /* eslint-enable no-undef */
    $('#inputCampaignStartTime').datepicker({
      autoclose: true,
    });
    $('#inputCampaignEndTime').datepicker({
      autoclose: true,
    });
  }

  componentWillReceiveProps(nextProps) {
    const {
      advertiserId,
      userId='da31ecf7-83ce-4c64-932a-ec165d42e65d',
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

  onInputChange(event, field) {
    event.persist();

    this.setState(previousState => ({
      ...previousState,
      [field]: event.target.value,
    }));
  }

  updateCampaign() {
    const {
      advertiserId,
      userId,
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
    if (advertiserId && advertiserId !== this.props.campaigns.current.advertiserId) {
      campaign.advertiserId = advertiserId;
    }
    if (userId && userId !== this.props.campaigns.current.userId) {
      campaign.userId = userId;
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
    if (viewPerSession && viewPerSession !== this.props.campaigns.current.viewPerSession) {
      campaign.viewPerSession = viewPerSession;
    }
    if (timeResetViewCount && timeResetViewCount !== this.props.campaigns.current.timeResetViewCount) {
      campaign.timeResetViewCount = timeResetViewCount;
    }
    if (weight && weight !== this.props.campaigns.current.weight) {
      campaign.weight = weight;
    }

    if (description && description !== this.props.campaigns.current.description) {
      campaign.description = description;
    }
    this.props.updateCampaign(campaign);
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
                        htmlFor="inputCampaignName" className="col-sm-2 control-label"
                      >Name</label>
                      <div className="col-sm-10">
                        <input
                          type="text" className="form-control" id="inputCampaignName"
                          placeholder="Admicro"
                          onChange={event => this.onInputChange(event, 'name')}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="inputAdvertiser"
                             className="col-sm-2 control-label">Advertiser</label>
                      <div className="col-sm-10">
                        <select id="inputAdvertiser" className="form-control">
                          <option value="32b2b006-e17a-4254-b576-73130f015201">Admicro</option>
                          <option value="92a4c58b-7ea0-42b1-ba5b-8eb70395714c">Zing</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group has-feedback">
                      <label htmlFor="inputCampaignStartTime" className="col-sm-2 control-label">
                        Start Time:</label>
                      <div className=" col-sm-10 date">
                        <span className="fa fa-calendar form-control-feedback" />
                        <input type="text" className="form-control pull-right"
                               id="inputCampaignStartTime"
                               onChange={event => this.onInputChange(event, 'startTime')} />
                      </div>
                    </div>
                    <div className="form-group has-feedback">
                      <label htmlFor="inputCampaignEndTime" className="col-sm-2 control-label">
                        End Time:</label>
                      <div className=" col-sm-10 date">
                        <span className="fa fa-calendar form-control-feedback" />
                        <input type="text" className="form-control pull-right"
                               id="inputCampaignEndTime"
                               onChange={event => this.onInputChange(event, 'endTime')} />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="inputCampaignViews" className="col-sm-2 control-label">Total
                        Views</label>
                      <div className="col-sm-10">
                        <input
                          type="number" className="form-control" id="inputCampaignViews"
                          placeholder="1000" onChange={event => this.onInputChange(event, 'views')}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="inputCampaignViewPerSession"
                             className="col-sm-2 control-label">Views/Session</label>
                      <div className="col-sm-10">
                        <input
                          type="number" className="form-control" id="inputCampaignViewPerSession"
                          placeholder="10"
                          onChange={event => this.onInputChange(event, 'viewPerSession')}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="inputCampaignTimeResetViewCount"
                             className="col-sm-2 control-label">Time reset view(h)</label>
                      <div className="col-sm-10">
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
                        className="col-sm-2 control-label"
                      >Weight</label>
                      <div className="col-sm-10">
                        <input
                          type="number" className="form-control" id="inputCampaignWeight"
                          placeholder="1" onChange={event => this.onInputChange(event, 'weight')}
                        />
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
                          onChange={event => this.onInputChange(event, 'description')}
                        />
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
      </Layout>
    );
  }

}

const mapState = (state) => ({
  campaigns: state.campaigns,
});

const mapDispatch = {
  getCampaign,
  updateCampaign,
  deleteCampaign,
};

export default withStyles(s)(connect(mapState, mapDispatch)(Campaign));
