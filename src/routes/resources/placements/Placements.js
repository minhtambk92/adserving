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
import { getPlacements, createPlacement, getPlacementsFilters, setPlacementsFilters } from '../../../actions/placements';
import { getCampaigns } from '../../../actions/campaigns';
import Layout from '../../../components/Layout';
import Link from '../../../components/Link';
import s from './Placements.css';

const pageTitle = 'Placements';
const pageSubTitle = 'Control panel';

class Placements extends Component {
  static propTypes = {
    getPlacementsFilters: PropTypes.func,
    setPlacementsFilters: PropTypes.func,
    placements: PropTypes.object,
    getPlacements: PropTypes.func,
    createPlacement: PropTypes.func,
    campaigns: PropTypes.object,
    getCampaigns: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      searchText: '',
    };
  }

  componentWillMount() {
    this.props.getPlacements();
    this.props.getPlacementsFilters();
    this.props.getCampaigns();
  }

  componentDidMount() {
    const dateStart = new Date();
    dateStart.setDate(dateStart.getDate());
    const dateEnd = new Date();
    dateEnd.setDate(dateEnd.getDate() + 1);
    /* eslint-disable no-undef */
    $('input[type="checkbox"].inputChoosePlacement').iCheck({
      checkboxClass: 'icheckbox_minimal-blue',
      radioClass: 'iradio_minimal-blue',
    });

    $('#inputPlacementStartTime').datepicker({
      autoclose: true,
      todayHighlight: 'TRUE',
      startDate: dateStart,
      defaultDate: new Date(),
    });

    $('#inputPlacementEndTime').datepicker({
      autoclose: true,
      todayHighlight: 'TRUE',
      startDate: dateEnd,
      defaultDate: new Date(),
    });
    /* eslint-enable no-undef */
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

  async onFilterChange(event, field) {
    event.persist();

    await this.props.setPlacementsFilters({
      [field]: event.target.value,
    });
  }
  isFiltered(placement) {
    const filters = this.props.placements.filters;

    for (const criteria in filters) { // eslint-disable-line no-restricted-syntax
      if (
        !{}.hasOwnProperty.call(placement, criteria) ||
        filters[criteria] !== placement[criteria]
      ) {
        return false;
      }
    }

    return true;
  }
  clearInput(event) { // eslint-disable-line no-unused-vars, class-methods-use-this
    this.inputPlacementName.value = null;
    this.inputPlacementSize.value = null;
    this.inputPlacementWeight.value = null;
    this.inputPlacementDescription.value = null;
  }

  createPlacement() {
    const name = this.inputPlacementName.value;
    const startTime = new Date(moment(new Date(this.inputPlacementStartTime.value)).format('YYYY-MM-DD 00:00:00'));
    const endTime = new Date(moment(new Date(this.inputPlacementEndTime.value)).format('YYYY-MM-DD 00:00:00'));
    const size = this.inputPlacementSize.value;
    const weight = this.inputPlacementWeight.value;
    const description = this.inputPlacementDescription.value;
    const campaignId = this.inputCampaign.value;
    const status = this.inputPlacementStatus.value;
    if (name && startTime && endTime && size && weight && description) {
      if (moment(startTime).format('x') < moment(endTime).format('x')) {
        this.props.createPlacement({
          name,
          startTime,
          endTime,
          size,
          weight,
          description,
          campaignId,
          status,
        }).then(() => {
          this.clearInput();
        });
      } else {
        this.inputPlacementEndTime.value = null;
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
                        htmlFor="inputPlacementsFilterCampaign"
                        className="col-sm-2 control-label"
                      >Campaign</label>
                      <div className="col-sm-10">
                        <select
                          id="inputPlacementsFilterCampaign"
                          className="form-control select2"
                          style={{ width: '100%' }}
                          ref={c => {
                            this.inputPlacementsFilterCampaign = c;
                          }}
                          onChange={event => this.onFilterChange(event, 'campaignId')}
                          defaultValue={this.props.placements.filters &&
                          this.props.placements.filters.campaignId}
                        >
                          <option value="null">All campaigns</option>
                          {this.props.campaigns.list &&
                          this.props.campaigns.list.map(campaign => (
                            <option
                              key={campaign.id} value={campaign.id}
                            >{campaign.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="inputPlacementsFilterStatus"
                        className="col-sm-2 control-label"
                      >Status</label>
                      <div className="col-sm-10">
                        <select
                          id="inputPlacementsFilterStatus" className="form-control"
                          ref={c => {
                            this.inputPlacementsFilterStatus = c;
                          }}
                          onChange={event => this.onFilterChange(event, 'status')}
                          defaultValue={this.props.placements.filters &&
                          this.props.placements.filters.status}
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
              {/* BOX: FORM OF CREATE NEW PlacementS */}
              <div className="box box-info collapsed-box">
                <div className="box-header with-border">
                  <h3 className="box-title">Create New Placements</h3>
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
                      <label htmlFor="inputCampaign" className="col-sm-2 control-label">Campaign</label>
                      <div className="col-sm-10">
                        <select
                          id="inputCampaign" className="form-control"
                          ref={c => {
                            this.inputCampaign = c;
                          }}
                        >
                          {this.props.campaigns.list
                          && this.props.campaigns.list.map(campaign => (
                            <option key={campaign.id} value={campaign.id}>{campaign.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="form-group has-feedback">
                      <label htmlFor="inputPlacementStartTime" className="col-sm-2 control-label">Start Time:</label>
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
                      <label htmlFor="inputPlacementEndTime" className="col-sm-2 control-label">End Time:</label>
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
                      <label htmlFor="inputPlacementSize" className="col-sm-2 control-label">Size</label>
                      <div className="col-sm-10">
                        <input
                          type="text" className="form-control"
                          id="inputPlacementSize"
                          placeholder="24"
                          ref={c => {
                            this.inputPlacementSize = c;
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
                          rows="5" placeholder="More info..."
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
          </div>

          {/* Main row */}
          <div className="row">
            <section className="col-lg-12">
              {/* BOX: LIST OF Placements */}
              <div className="box box-info">
                <div className="box-header with-border">
                  <h3 className="box-title">List Placement</h3>

                  <div className="box-tools">
                    <div className="input-group input-group-sm" style={{ width: 150 }}>
                      <input
                        type="text" name="inputSearchPlacements"
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
                      { this.props.placements.list &&
                      this.props.placements.list.map(placement => {
                        if (!this.isFiltered(placement)) {
                          return false;
                        }
                        return (
                          <tr key={placement.id}>
                            <th><input type="checkbox" className="inputChoosePlacement" /></th>
                            <th><Link to={`/resource/placement/${placement.id}`}>{placement.name}</Link>
                            </th>
                            <td>{placement.size}</td>
                            <td>{moment(new Date(placement.startTime)).format('L')}</td>
                            <td>{moment(new Date(placement.endTime)).format('L')}</td>
                            <th><Link to={`/resource/placement/${placement.id}`}>Add banner</Link>
                            </th>
                            <th><Link to={`/resource/placement/${placement.id}`}>Add Zone</Link>
                            </th>
                          </tr>
                        );
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
            {/* /.col */}
          </div>
          {/* /.row (main row) */}
        </div>
      </Layout>
    );
  }

}
const mapState = (state) => ({
  placements: state.placements,
  campaigns: state.campaigns,
});

const mapDispatch = {
  getPlacements,
  createPlacement,
  getCampaigns,
  getPlacementsFilters,
  setPlacementsFilters,
};

export default withStyles(s)(connect(mapState, mapDispatch)(Placements));
