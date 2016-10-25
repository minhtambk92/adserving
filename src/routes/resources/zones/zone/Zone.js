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
import { getZone, updateZone, deleteZone } from '../../../../actions/zones';
import { getSites } from '../../../../actions/sites';
import { getPlacements, createPlacement } from '../../../../actions/placements';
import { getCampaigns } from '../../../../actions/campaigns';
import { createPlacementBannerZone, removeZone, removeZoneInPlacementBannerZone } from '../../../../actions/placementBannerZones';
import Layout from '../../../../components/Layout';
import Link from '../../../../components/Link';
import s from './Zone.css';

const pageTitle = 'Zone';

class Zone extends Component {

  static propTypes = {
    zoneId: PropTypes.string.isRequired,
    zones: PropTypes.object,
    getZone: PropTypes.func,
    updateZone: PropTypes.func,
    deleteZone: PropTypes.func,
    sites: PropTypes.object,
    getSites: PropTypes.func,
    placements: PropTypes.object,
    createPlacement: PropTypes.func,
    getPlacements: PropTypes.func,
    campaigns: PropTypes.object,
    getCampaigns: PropTypes.func,
    placementBannerZones: PropTypes.object,
    createPlacementBannerZone: PropTypes.func,
    removeZone: PropTypes.func,
    removeZoneInPlacementBannerZone: PropTypes.func,
  };
  constructor(props, context) {
    super(props, context);
    this.state = {
      name: '',
      siteId: '',
      description: '',
      type: '',
      searchText: '',
      status: '',
      slot: '',
    };
  }

  componentWillMount() {
    this.props.getZone(this.props.zoneId);
    this.props.getSites();
    this.props.getPlacements();
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
  componentWillReceiveProps(nextProps) {
    const {
      siteId,
      name,
      description,
      type,
      html,
      css,
      slot,
      status,
    } = nextProps.zones && (nextProps.zones.editing || {});

    this.inputZoneSite.value = siteId;
    this.inputZoneName.value = name;
    this.inputZoneType.value = type;
    this.inputZoneHtml.value = html;
    this.inputZoneCss.value = css;
    this.inputZoneSlot.value = slot;
    this.inputZoneStatus.value = status;
    this.inputZoneDescription.value = description;
  }
  componentDidUpdate() {
    /* eslint-disable no-undef */
    $('input[type="checkbox"].inputChoosePlacement').iCheck({
      checkboxClass: 'icheckbox_minimal-blue',
      radioClass: 'iradio_minimal-blue',
    });
    /* eslint-enable no-undef */
  }
  updateZone() {
    const siteId = this.inputZoneSite.value;
    const name = this.inputZoneName.value;
    const type = this.inputZoneType.value;
    const html = this.inputZoneHtml.value;
    const css = this.inputZoneCss.value;
    const slot = this.inputZoneSlot.value;
    const status = this.inputZoneStatus.value;
    const description = this.inputZoneDescription.value;

    const zone = { id: this.props.zoneId };

    if (siteId && siteId !== this.props.zones.editing.siteId) {
      zone.siteId = siteId;
    }

    if (name && name !== this.props.zones.editing.name) {
      zone.name = name;
    }

    if (type && type !== this.props.zones.editing.type) {
      zone.type = type;
    }

    if (html && html !== this.props.zones.editing.html) {
      zone.html = html;
    }

    if (css && css !== this.props.zones.editing.css) {
      zone.css = css;
    }

    if (slot && slot !== this.props.zones.editing.slot) {
      zone.slot = slot;
    }

    if (status && status !== this.props.zones.editing.status) {
      zone.status = status;
    }

    if (description && description !== this.props.zones.editing.description) {
      zone.description = description;
    }

    this.props.updateZone(zone).then(() => {
      this.props.getZone(this.props.zoneId);
    });
  }

  deleteZone() {
    this.props.deleteZone(this.props.zoneId);
    this.props.removeZone(this.props.zoneId);
  }
  isIndexOf(...args) {
    for (let i = 0; i < args.length; i += 1) {
      if (args[i].toLowerCase().indexOf(this.state.searchText.toLowerCase()) !== -1) {
        return true;
      }
    }
    return false;
  }
  createPlacement() {
    const name = this.inputPlacementName.value;
    const startTime = new Date(moment(new Date(this.inputPlacementStartTime.value)).format('YYYY-MM-DD 00:00:00'));
    const endTime = new Date(moment(new Date(this.inputPlacementEndTime.value)).format('YYYY-MM-DD 00:00:00'));
    const size = this.inputPlacementSize.value;
    const weight = this.inputPlacementWeight.value;
    const description = this.inputPlacementDescription.value;
    const campaignId = this.inputPlacementCampaign.value;
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
        }).then(() => {
          const placementId = this.props.placements.list[0].id;
          const zoneId = this.props.zoneId;
          const bannerId = null;
          this.props.createPlacementBannerZone({ placementId, bannerId, zoneId }).then(() => {
            this.clearInput();
            this.props.getZone(this.props.zoneId);
            this.props.getPlacements();
          });
        });
      } else {
        this.inputPlacementEndTime.value = null;
      }
    }
  }
  clearInput() {
    this.inputPlacementDescription.value = null;
    this.inputPlacementName.value = null;
    this.inputPlacementSize.value = null;
    this.inputPlacementWeight.value = null;
  }
  filterPlmNotIn(allPlacement, pob) { // eslint-disable-line no-unused-vars, class-methods-use-this
    if (pob.length === 0) {
      return allPlacement;
    } else if (pob.length > 0) {
      const arrId = [];
      const newArr = [];
      const arrPlacement = [];
      for (let i = 0; i < pob.length; i += 1) {
        if (pob[i].placements !== null) {
          newArr.push(pob[i].placements.id);
        }
      }
      for (let j = 0; j < allPlacement.length; j += 1) {
        arrId.push(allPlacement[j].id);
      }
      for (let k = 0; k < newArr.length; k += 1) {
        if (arrId.indexOf(newArr[k]) > -1) {
          arrId.splice(arrId.indexOf(newArr[k]), 1);
        }
      }
      if (arrId.length > 0) {
        for (let m = 0; m < allPlacement.length; m += 1) {
          for (let h = 0; h < arrId.length; h += 1) {
            if (allPlacement[m].id === arrId[h]) {
              arrPlacement.push(allPlacement[m]);
            }
          }
        }
        return arrPlacement;
      } else if (arrId.length === 0) {
        return [];
      }
    }
    return false;
  }
  pushZoneToPlacement(placementId) { // eslint-disable-line no-unused-vars, class-methods-use-this
    const zoneId = this.props.zoneId;
    const bannerId = null;
    if (placementId && zoneId) {
      this.props.createPlacementBannerZone({ placementId, bannerId, zoneId }).then(() => {
        this.props.getZone(this.props.zoneId).then(() => {
          this.props.getPlacements();
        });
      });
    }
  }
  removePlacement(placementId) { // eslint-disable-line no-unused-vars, class-methods-use-this
    const zId = this.props.zoneId;
    if (placementId && zId) {
      this.props.removeZoneInPlacementBannerZone({ placementId, zId }).then(() => {
        this.props.getZone(this.props.zoneId).then(() => {
          this.props.getPlacements();
        });
      });
    }
  }
  render() {
    return (
      <Layout
        pageTitle={
          pageTitle
            .concat(': ')
            .concat(this.props.zones.editing ? this.props.zones.editing.name : '...')
        }
        pageSubTitle={this.props.zones.editing ? this.props.zones.editing.type : ''}
      >
        <div>
          <div className="row">
            <section className="col-lg-12">
              <div className="row">
                <div className="col-lg-6">
                  {/* BOX: FORM OF CREATE A NEW ZONE */}
                  <div className="box box-primary">
                    <div className="box-header with-border">
                      <h3 className="box-title">Change Zone Information</h3>
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
                            htmlFor="inputZoneName"
                            className="col-sm-2 control-label"
                          >Name</label>
                          <div className="col-sm-10">
                            <input
                              type="text" className="form-control" id="inputZoneName"
                              placeholder="Dan Tri"
                              ref={c => {
                                this.inputZoneName = c;
                              }}
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label
                            htmlFor="inputZoneSite"
                            className="col-sm-2 control-label"
                          >Website</label>
                          <div className="col-sm-10">
                            <select
                              id="inputZoneSite"
                              className="form-control select2"
                              style={{ width: '100%' }}
                              ref={c => {
                                this.inputZoneSite = c;
                              }}
                            >
                              {this.props.sites.list && this.props.sites.list.map(site => (
                                <option
                                  key={site.id} value={site.id}
                                >{site.name} | {site.domain}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="form-group">
                          <label
                            htmlFor="inputZoneType"
                            className="col-sm-2 control-label"
                          >Type</label>
                          <div className="col-sm-10">
                            <select
                              id="inputZoneType"
                              className="form-control"
                              ref={c => {
                                this.inputZoneType = c;
                              }}
                            >
                              <option value="type-1">Type 1</option>
                              <option value="type-2">Type 2</option>
                              <option value="type-3">Type 3</option>
                              <option value="type-4">Type 4</option>
                              <option value="type-5">Type 5</option>
                            </select>
                          </div>
                        </div>
                        <div className="form-group">
                          <label
                            htmlFor="inputZoneHtml"
                            className="col-sm-2 control-label"
                          >HTML</label>
                          <div className="col-sm-10">
                            <textarea
                              className="form-control" id="inputZoneHtml"
                              rows="5" placeholder="More info..."
                              ref={c => {
                                this.inputZoneHtml = c;
                              }}
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label
                            htmlFor="inputZoneCss"
                            className="col-sm-2 control-label"
                          >CSS</label>
                          <div className="col-sm-10">
                            <textarea
                              className="form-control" id="inputZoneCss"
                              rows="5" placeholder="More info..."
                              ref={c => {
                                this.inputZoneCss = c;
                              }}
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label
                            htmlFor="inputZoneSlot"
                            className="col-sm-2 control-label"
                          >Slot</label>
                          <div className="col-sm-10">
                            <input
                              type="text" className="form-control" id="inputZoneSlot"
                              placeholder="..."
                              ref={c => {
                                this.inputZoneSlot = c;
                              }}
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label
                            htmlFor="inputZoneStatus"
                            className="col-sm-2 control-label"
                          >Status</label>
                          <div className="col-sm-10">
                            <select
                              id="inputZoneStatus" className="form-control"
                              ref={c => {
                                this.inputZoneStatus = c;
                              }}
                            >
                              <option value="active">Active</option>
                              <option value="inactive">Inactive</option>
                            </select>
                          </div>
                        </div>
                        <div className="form-group">
                          <label
                            htmlFor="inputZoneDescription"
                            className="col-sm-2 control-label"
                          >Description</label>
                          <div className="col-sm-10">
                            <textarea
                              className="form-control" id="inputZoneDescription"
                              rows="5" placeholder="More info..."
                              ref={c => {
                                this.inputZoneDescription = c;
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      {/* /.box-body */}
                      <div className="box-footer">
                        {/* eslint-disable jsx-a11y/no-static-element-interactions */}
                        <Link
                          to="/resource/zone"
                          className="btn btn-app pull-right"
                        ><i className="fa fa-undo" /> Cancel</Link>
                        <Link
                          to="/resource/zone"
                          className="btn btn-app pull-right"
                          onClick={event => this.deleteZone(event)}
                        ><i className="fa fa-trash-o" /> Delete</Link>
                        <a
                          className="btn btn-app pull-right"
                          onClick={event => this.updateZone(event)}
                        ><i className="fa fa-floppy-o" /> Save</a>
                        {/* eslint-enable jsx-a11y/no-static-element-interactions */}
                      </div>
                      {/* /.box-footer */}
                    </form>
                  </div>
                  {/* /.col */}
                </div>
                <section className="col-lg-6">
                  {/* BOX: FORM OF CREATE NEW PlacementS */}
                  <div className="box box-primary">
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
                              ref={c => { this.inputPlacementName = c; }}
                            />
                          </div>
                        </div>
                        <div className="form-group has-feedback">
                          <label htmlFor="inputPlacementCampaign" className="col-sm-2 control-label">Campaign</label>
                          <div className="col-sm-10">
                            <select
                              id="inputPlacementCampaign" className="form-control"
                              ref={c => {
                                this.inputPlacementCampaign = c;
                              }}
                            >
                              {this.props.campaigns.list
                              && this.props.campaigns.list.map(campaign => (
                                <option
                                  key={campaign.id} value={campaign.id}
                                >
                                  {campaign.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="form-group has-feedback">
                          <label htmlFor="inputPlacementStartTime" className="col-sm-2 control-label">Start Time:</label>
                          <div className=" col-sm-10 date">
                            <span className="fa fa-calendar form-control-feedback" />
                            <input
                              type="text" className="form-control pull-right" id="inputPlacementStartTime"
                              ref={c => { this.inputPlacementStartTime = c; }}
                            />
                          </div>
                        </div>
                        <div className="form-group has-feedback">
                          <label htmlFor="inputPlacementEndTime" className="col-sm-2 control-label">End Time:</label>
                          <div className=" col-sm-10 date">
                            <span className="fa fa-calendar form-control-feedback" />
                            <input
                              type="text" className="form-control pull-right" id="inputPlacementEndTime"
                              ref={c => { this.inputPlacementEndTime = c; }}
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
                              ref={c => { this.inputPlacementSize = c; }}
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
                              ref={c => { this.inputPlacementWeight = c; }}
                            />
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
                              ref={c => { this.inputPlacementDescription = c; }}
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
            </section>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="row">
                <section className="col-lg-6">
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
                          </tr>
                        </thead>
                        <tbody>
                          {/* eslint-disable jsx-a11y/no-static-element-interactions */}
                          {this.props.placements.list && this.props.zones.editing &&
                          this.props.zones.editing.pbzZone &&
                          this.filterPlmNotIn(this.props.placements.list,
                            this.props.zones.editing.pbzZone).map(placement => {
                              if (this.isIndexOf(placement.name,
                                  placement.startTime,
                                  placement.endTime, placement.size,
                                  placement.description, placement.weight)) {
                                return (
                                  <tr key={placement.id}>
                                    <th><input type="checkbox" className="inputChoosePlacement" /></th>
                                    <th><Link to={`/resource/placement/${placement.id}`}>
                                      {placement.name}
                                    </Link>
                                    </th>
                                    <td>{placement.size}</td>
                                    <td>{moment(new Date(placement.startTime)).format('L')}</td>
                                    <td>{moment(new Date(placement.endTime)).format('L')}</td>
                                    <td
                                      onClick={() => this.pushZoneToPlacement(placement.id)}
                                    >
                                      Add Placement
                                    </td>
                                  </tr>
                                );
                              }
                              return false;
                            })}
                          {/* eslint-enable jsx-a11y/no-static-element-interactions */}
                        </tbody>
                        <tfoot>
                          <tr>
                            <th><input type="checkbox" className="inputChoosePlacement" /></th>
                            <th>Name</th>
                            <th>Size</th>
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
                <section className="col-lg-6">
                  {/* BOX: LIST OF Placements */}
                  <div className="box box-info">
                    <div className="box-header with-border">
                      <h3 className="box-title">
                        List placements of {this.props.zones.editing ? this.props.zones.editing.name : '...'}
                      </h3>
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
                          </tr>
                        </thead>
                        <tbody>
                          {/* eslint-disable jsx-a11y/no-static-element-interactions */}
                          {this.props.zones.editing && this.props.zones.editing.pbzZone &&
                            this.props.zones.editing.pbzZone.map(placement => {
                              if (this.isIndexOf(placement.placements.name,
                                  placement.placements.startTime,
                                  placement.placements.endTime, placement.placements.size,
                                  placement.placements.description, placement.placements.weight)) {
                                return (
                                  <tr key={placement.placements.id}>
                                    <th><input type="checkbox" className="inputChoosePlacement" /></th>
                                    <th><Link to={`/resource/placement/${placement.placements.id}`}>
                                      {placement.placements.name}
                                    </Link>
                                    </th>
                                    <td>{placement.placements.size}</td>
                                    <td>{moment(new Date(placement.placements.startTime)).format('L')}</td>
                                    <td>{moment(new Date(placement.placements.endTime)).format('L')}</td>
                                    <td
                                      onClick={() => this.removePlacement(placement.placements.id)}
                                    >
                                      Remove
                                    </td>
                                  </tr>
                                );
                              }
                              return false;
                            })}
                          {/* eslint-enable jsx-a11y/no-static-element-interactions */}
                        </tbody>
                        <tfoot>
                          <tr>
                            <th><input type="checkbox" className="inputChoosePlacement" /></th>
                            <th>Name</th>
                            <th>Size</th>
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
          </div>
        </div>
      </Layout>
    );
  }

}

const mapState = (state) => ({
  zones: state.zones,
  sites: state.sites,
  placements: state.placements,
  campaigns: state.campaigns,
  placementBannerZones: state.placementBannerZones,
});

const mapDispatch = {
  getZone,
  updateZone,
  deleteZone,
  getSites,
  getPlacements,
  getCampaigns,
  createPlacement,
  createPlacementBannerZone,
  removeZone,
  removeZoneInPlacementBannerZone,
};

export default withStyles(s)(connect(mapState, mapDispatch)(Zone));
