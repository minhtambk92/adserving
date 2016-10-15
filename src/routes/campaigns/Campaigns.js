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
import { getCampaigns, createCampaign } from '../../actions/campaigns';
import Layout from '../../components/Layout';
import Link from '../../components/Link';
import s from './Campaigns.css';

const pageTitle = 'Campaigns';
const pageSubTitle = 'Control panel';

class Campaigns extends Component {
  static propTypes = {
    campaigns: PropTypes.object,
    getCampaigns: PropTypes.func,
    createCampaign: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      searchText: '',
    };
  }

  componentWillMount() {
    this.props.getCampaigns();
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
      formatDate: 'mm/dd/yyyy 00:00:00',
    });
    $('#inputCampaignEndTime').datepicker({
      autoclose: true,
      formatDate: 'mm/dd/yyyy 00:00:00',
    });
  }

  searchFor(event) {
    event.persist();
    this.setState((previousState) => ({
      ...previousState,
      searchText: event.target.value.trim(),
    }));
  }

  clearInput(event) { // eslint-disable-line no-unused-vars, class-methods-use-this
    document.getElementById('inputCampaignName').value = null;
    document.getElementById('inputAdvertiser').value = null;
    document.getElementById('inputCampaignStartTime').value = null;
    document.getElementById('inputCampaignEndTime').value = null;
    document.getElementById('inputCampaignViews').value = null;
    document.getElementById('inputCampaignViewPerSession').value = null;
    document.getElementById('inputCampaignTimeResetViewCount').value = null;
    document.getElementById('inputCampaignWeight').value = null;
    document.getElementById('inputCampaignDescription').value = null;
  }

  isIndexOf(...args) {
    for (let i = 0; i < args.length; i += 1) {
      if (args[i].toLowerCase().indexOf(this.state.searchText.toLowerCase()) !== -1) {
        return true;
      }
    }
    return false;
  }

  createCampaign() {
    const name = document.getElementById('inputCampaignName').value;
    const userId = 'da31ecf7-83ce-4c64-932a-ec165d42e65d';
    const advertiserId = document.getElementById('inputAdvertiser').value;
    const startTime = new Date(moment(new Date(document.getElementById('inputCampaignStartTime').value)).format('YYYY-MM-DD 00:00:00'));
    const endTime = new Date(moment(new Date(document.getElementById('inputCampaignEndTime').value)).format('YYYY-MM-DD 00:00:00'));
    const views = document.getElementById('inputCampaignViews').value;
    const viewPerSession = document.getElementById('inputCampaignViewPerSession').value;
    const timeResetViewCount = document.getElementById('inputCampaignTimeResetViewCount').value;
    const weight = document.getElementById('inputCampaignWeight').value;
    const description = document.getElementById('inputCampaignDescription').value;
    if (userId && name && advertiserId && startTime && endTime && views && viewPerSession && timeResetViewCount && weight && description) {
      this.props.createCampaign({
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
      }).then(() => {
        this.clearInput();
      });
    }
  }

  render() {
    return (
      <Layout pageTitle={pageTitle} pageSubTitle={pageSubTitle}>
        <div>

          <div className="row">
            <section className="col-lg-12">
              {/* BOX: FORM OF CREATE NEW CAMPAIGNS */}
              <div className="box box-primary collapsed-box">
                <div className="box-header with-border">
                  <h3 className="box-title">Create a new campaigns</h3>
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
                               id="inputCampaignStartTime" />
                      </div>
                    </div>
                    <div className="form-group has-feedback">
                      <label htmlFor="inputCampaignEndTime" className="col-sm-2 control-label">
                        End Time:</label>
                      <div className=" col-sm-10 date">
                        <span className="fa fa-calendar form-control-feedback" />
                        <input type="text" className="form-control pull-right"
                               id="inputCampaignEndTime" />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="inputCampaignViews" className="col-sm-2 control-label">Total
                        Views</label>
                      <div className="col-sm-10">
                        <input
                          type="number" className="form-control" id="inputCampaignViews"
                          placeholder="1000"
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
                        />
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
                        <th>Views</th>
                        <th>View/Session</th>
                        <th>Time Reset View</th>
                      </tr>
                    </thead>
                    <tbody>
                      { this.props.campaigns.latest && this.props.campaigns.latest.map(campaign => {
                        if (this.isIndexOf(campaign.name, campaign.startTime, campaign.endTime, campaign.views, campaign.viewPerSession, campaign.timeResetViewCount)) {
                          return (
                            <tr key={campaign.id}>
                              <th><input type="checkbox" className="inputChooseCampaign" /></th>
                              <th><Link to={`/campaign/${campaign.id}`}>{campaign.name}</Link>
                              </th>
                              <td>{moment(new Date(campaign.startTime)).format('L')}</td>
                              <td>{moment(new Date(campaign.endTime)).format('L')}</td>
                              <td>{campaign.views}</td>
                              <td>{campaign.viewPerSession}</td>
                              <td>{campaign.timeResetViewCount}</td>
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
                        <th>Views</th>
                        <th>View/Session</th>
                        <th>Time Reset View</th>
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
});

const mapDispatch = {
  getCampaigns,
  createCampaign,
};

export default withStyles(s)(connect(mapState, mapDispatch)(Campaigns));


