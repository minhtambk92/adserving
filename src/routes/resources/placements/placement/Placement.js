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
import { getPlacement, updatePlacement, deletePlacement } from '../../../../actions/placements';
import { getCampaigns } from '../../../../actions/campaigns';
import { getBanners } from '../../../../actions/banners';
import { createPlacementBannerZone } from '../../../../actions/placementBannerZones';
import { getZones } from '../../../../actions/zones';
import Layout from '../../../../components/Layout';
import Link from '../../../../components/Link';
import s from './Placement.css';

const pageTitle = 'Placement';

class Placement extends Component {

  static propTypes = {
    placementId: PropTypes.string.isRequired,
    placements: PropTypes.object,
    campaigns: PropTypes.object,
    getPlacement: PropTypes.func,
    updatePlacement: PropTypes.func,
    deletePlacement: PropTypes.func,
    getCampaigns: PropTypes.func,
    banners: PropTypes.object,
    getBanners: PropTypes.func,
    placementBannerZones: PropTypes.object,
    createPlacementBannerZone: PropTypes.func,
    zones: PropTypes.object,
    getZones: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      name: '',
      startTime: Date.now(),
      endTime: Date.now(),
      size: '',
      weight: 1,
      description: '',
      campaignId: '',
      searchText: '',

    };
  }

  componentWillMount() {
    this.props.getPlacement(this.props.placementId);
    this.props.getCampaigns();
    this.props.getBanners();
    this.props.getZones();
  }

  componentDidMount() {
    /* eslint-disable no-undef */
    // $('.select2').select2();
    // $('#example1').DataTable(); // eslint-disable-line new-cap

    // iCheck for checkbox and radio inputs
    $('input[type="checkbox"].inputChoosePlacement').iCheck({
      checkboxClass: 'icheckbox_minimal-blue',
      radioClass: 'iradio_minimal-blue',
    });
    $('input[type="checkbox"].inputChooseBanner').iCheck({
      checkboxClass: 'icheckbox_minimal-blue',
      radioClass: 'iradio_minimal-blue',
    });
    $('input[type="checkbox"].inputChooseZone').iCheck({
      checkboxClass: 'icheckbox_minimal-blue',
      radioClass: 'iradio_minimal-blue',
    });
    const dateStart = new Date();
    dateStart.setDate(dateStart.getDate());

    $('#inputPlacementStartTime').datepicker({
      autoclose: true,
      todayHighlight: 'TRUE',
      startDate: dateStart,
      defaultDate: new Date(),
    });

    const dateEnd = new Date();
    dateEnd.setDate(dateEnd.getDate());
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
      name,
      startTime,
      endTime,
      size,
      weight,
      description,
      campaignId,
    } = nextProps.placements && (nextProps.placements.editing || {});

    document.getElementById('inputPlacementName').value = name;
    document.getElementById('inputPlacementStartTime').value = moment(new Date(startTime)).format('L');
    document.getElementById('inputPlacementEndTime').value = moment(new Date(endTime)).format('L');
    document.getElementById('inputPlacementSize').value = size;
    document.getElementById('inputPlacementWeight').value = weight;
    document.getElementById('inputPlacementDescription').value = description;
    document.getElementById('inputCampaign').value = campaignId;
  }
  componentDidUpdate() {
    /* eslint-disable no-undef */
    $('input[type="checkbox"].inputChoosePlacement').iCheck({
      checkboxClass: 'icheckbox_minimal-blue',
      radioClass: 'iradio_minimal-blue',
    });
    $('input[type="checkbox"].inputChooseBanner').iCheck({
      checkboxClass: 'icheckbox_minimal-blue',
      radioClass: 'iradio_minimal-blue',
    });
    $('input[type="checkbox"].inputChooseZone').iCheck({
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
  isIndexOf(...args) {
    for (let i = 0; i < args.length; i += 1) {
      if (args[i].toLowerCase().indexOf(this.state.searchText.toLowerCase()) !== -1) {
        return true;
      }
    }
    return false;
  }

  updatePlacement() {
    const {
      name,
      size,
      startTime,
      endTime,
      weight,
      description,
      campaignId,
    } = this.state;
    const placement = { id: this.props.placementId };

    if (name && name !== this.props.placements.editing.name) {
      placement.name = name;
    }
    if (startTime && startTime !== this.props.placements.editing.startTime) {
      placement.startTime = new Date(document.getElementById('inputPlacementStartTime').value);
    }

    if (endTime && endTime !== this.props.placements.editing.endTime) {
      placement.endTime = new Date(document.getElementById('inputPlacementEndTime').value);
    }
    if (weight && weight !== this.props.placements.editing.weight) {
      placement.weight = weight;
    }

    if (description && description !== this.props.placements.editing.description) {
      placement.description = description;
    }
    if (size && size !== this.props.placements.editing.size) {
      placement.size = size;
    }
    if (campaignId && campaignId !== this.props.placements.editing.campaignId) {
      placement.campaignId = campaignId;
    }
    if (moment(new Date(document.getElementById('inputPlacementStartTime').value)).format('x') < moment(new Date(document.getElementById('inputPlacementEndTime').value))) {
      this.props.updatePlacement(placement).then(() => {
        this.props.getPlacement(this.props.placementId);
      });
    } else {
      document.getElementById('inputPlacementEndTime').value = null;
      document.getElementById('inputPlacementEndTime').focus();
    }
  }

  deletePlacement() {
    this.props.deletePlacement(this.props.placementId);
  }
  filterBanner(allBanner, bof) { // eslint-disable-line no-unused-vars, class-methods-use-this
    if (bof.length === 0) {
      return allBanner;
    } else if (bof.length > 0) {
      const arrId = [];
      const newArr = [];
      const arrBanner = [];
      for (let i = 0; i < bof.length; i += 1) {
        if (bof[i].banners !== null) {
          newArr.push(bof[i].banners.id);
        }
      }
      for (let j = 0; j < allBanner.length; j += 1) {
        arrId.push(allBanner[j].id);
      }
      for (let k = 0; k < newArr.length; k += 1) {
        if (arrId.indexOf(newArr[k]) > -1) {
          arrId.splice(arrId.indexOf(newArr[k]), 1);
        }
      }
      if (arrId.length > 0) {
        for (let m = 0; m < allBanner.length; m += 1) {
          for (let h = 0; h < arrId.length; h += 1) {
            if (allBanner[m].id === arrId[h]) {
              arrBanner.push(allBanner[m]);
            }
          }
        }
        return arrBanner;
      } else if (arrId.length === 0) {
        return [];
      }
    }
    return false;
  }
  filterZones(allZones, zof) { // eslint-disable-line no-unused-vars, class-methods-use-this
    if (zof.length === 0) {
      return allZones;
    } else if (zof.length > 0) {
      const arrId = [];
      const newArr = [];
      const arrZones = [];
      for (let i = 0; i < zof.length; i += 1) {
        if (zof[i].zones !== null) {
          newArr.push(zof[i].zones.id);
        }
      }
      for (let j = 0; j < allZones.length; j += 1) {
        arrId.push(allZones[j].id);
      }
      for (let k = 0; k < newArr.length; k += 1) {
        if (arrId.indexOf(newArr[k]) > -1) {
          arrId.splice(arrId.indexOf(newArr[k]), 1);
        }
      }
      if (arrId.length > 0) {
        for (let m = 0; m < allZones.length; m += 1) {
          for (let h = 0; h < arrId.length; h += 1) {
            if (allZones[m].id === arrId[h]) {
              arrZones.push(allZones[m]);
            }
          }
        }
        return arrZones;
      } else if (arrId.length === 0) {
        return [];
      }
    }
    return false;
  }

  pushBannerToPlacement(bannerId) { // eslint-disable-line no-unused-vars, class-methods-use-this
    const placementId = this.props.placementId;
    const zoneId = null;
    if (placementId && bannerId) {
      this.props.createPlacementBannerZone({ placementId, bannerId, zoneId }).then(() => {
        this.props.getPlacement(this.props.placementId).then(() => {
          this.props.getBanners();
        });
      });
    }
  }
  pushZoneToPlacement(zoneId) { // eslint-disable-line no-unused-vars, class-methods-use-this
    const placementId = this.props.placementId;
    const bannerId = null;
    if (placementId && zoneId) {
      this.props.createPlacementBannerZone({ placementId, bannerId, zoneId }).then(() => {
        this.props.getPlacement(this.props.placementId).then(() => {
          this.props.getZones();
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
            .concat(this.props.placements.editing ? this.props.placements.editing.name : '...')
        }
        pageSubTitle=""
      >
        <div>

          <div className="row">
            <section className="col-lg-12">
              {/* BOX: FORM OF CREATE NEW WEBSITE */}
              <div className="box box-primary collapsed-box">
                <div className="box-header with-border">
                  <h3 className="box-title">Change Placement information</h3>
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
                          onChange={event => this.onInputChange(event, 'name')}
                        />
                      </div>
                    </div>
                    <div className="form-group has-feedback">
                      <label htmlFor="inputCampaign" className="col-sm-2 control-label">Campaign</label>
                      <div className="col-sm-10">
                        <select
                          id="inputCampaign" className="form-control"
                          onChange={event => this.onInputChange(event, 'campaignId')}
                        >
                          {this.props.campaigns.list
                          && this.props.campaigns.list.map(campaign => (
                            <option key={campaign.id} value={campaign.id}>{campaign.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="form-group has-feedback">
                      <label
                        htmlFor="inputPlacementStartTime" className="col-sm-2 control-label"
                      >
                        Start Time:
                      </label>
                      <div className=" col-sm-10 date">
                        <span className="fa fa-calendar form-control-feedback" />
                        <input
                          type="text" className="form-control pull-right"
                          id="inputPlacementStartTime"
                          onChange={event => this.onInputChange(event, 'startTime')}
                        />
                      </div>
                    </div>
                    <div className="form-group has-feedback">
                      <label
                        htmlFor="inputPlacementEndTime" className="col-sm-2 control-label"
                      >
                        End Time:
                      </label>
                      <div className=" col-sm-10 date">
                        <span className="fa fa-calendar form-control-feedback" />
                        <input
                          type="text" className="form-control pull-right"
                          id="inputPlacementEndTime"
                          onChange={event => this.onInputChange(event, 'endTime')}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="inputPlacementSize" className="col-sm-2 control-label">
                        Size
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text" className="form-control" id="inputPlacementSize"
                          placeholder="300x250"
                          onChange={event => this.onInputChange(event, 'size')}
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
                          type="number" className="form-control" id="inputPlacementWeight"
                          placeholder="1" onChange={event => this.onInputChange(event, 'weight')}
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
                          onChange={event => this.onInputChange(event, 'description')}
                        />
                      </div>
                    </div>
                  </div>
                  {/* /.box-body */}
                  <div className="box-footer">
                    {/* eslint-disable jsx-a11y/no-static-element-interactions */}
                    <Link
                      to="/resource/placement"
                      className="btn btn-app pull-right"
                    ><i className="fa fa-undo" /> Cancel</Link>
                    <Link
                      to="/resource/placement"
                      className="btn btn-app pull-right"
                      onClick={event => this.deletePlacement(event)}
                    ><i className="fa fa-trash-o" /> Delete</Link>
                    <a
                      className="btn btn-app pull-right"
                      onClick={event => this.updatePlacement(event)}
                    ><i className="fa fa-floppy-o" /> Save</a>
                    {/* eslint-enable jsx-a11y/no-static-element-interactions */}
                  </div>
                  {/* /.box-footer */}
                </form>
              </div>
              {/* /.col */}
            </section>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="row">
                <section className="col-lg-6">
                  {/* BOX: LIST OF Placements */}
                  <div className="box box-info">
                    <div className="box-header with-border">
                      <h3 className="box-title">List All Banner</h3>

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
                            <th>Size(px)</th>
                            <th>KeyWords</th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* eslint-disable jsx-a11y/no-static-element-interactions */}
                          { this.props.banners.list && this.props.placements.editing &&
                            this.filterBanner(this.props.banners.list,
                            this.props.placements.editing.pbzPlacement
                            ).map(banner => {
                              if (this.isIndexOf(banner.name, banner.height,
                                  banner.width, banner.keyword, banner.weight,
                                  banner.html, banner.description)) {
                                return (
                                  <tr key={banner.id}>
                                    <th><input type="checkbox" className="inputChooseBanner" /></th>
                                    <td><Link to={`/resource/banner/${banner.id}`}>{banner.name}</Link>
                                    </td>
                                    <td>{banner.width}px - {banner.height}px</td>
                                    <td>{banner.keyword}</td>
                                    <td
                                      onClick={() => this.pushBannerToPlacement(banner.id)}
                                    >
                                      Add To Placement
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
                            <th>Size(px)</th>
                            <th>KeyWords</th>
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
                      <h3 className="box-title">List Banner Of {
                        this.props.placements.editing ? this.props.placements.editing.name : '...'
                      }
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
                            <th><input type="checkbox" className="inputChooseBanner" /></th>
                            <th>Name</th>
                            <th>Size(px)</th>
                            <th>Key Words</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.props.placements.editing &&
                          this.props.placements.editing.pbzPlacement.map(banner => {
                            if (banner.banners) {
                              return (
                                <tr key={banner.banners.id}>
                                  <th><input type="checkbox" className="inputChooseBanner" /></th>
                                  <th><Link to={`/resource/banner/${banner.banners.id}`}>
                                    {banner.banners.name}
                                  </Link>
                                  </th>
                                  <td>{banner.banners.width}px - {banner.banners.height}px</td>
                                  <td>{banner.banners.keyword}</td>
                                  <td>Remove</td>
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
                            <th>Size(px)</th>
                            <th>Key Words</th>
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
          <div className="row">
            <div className="col-lg-12">
              <div className="row">
                <section className="col-lg-6">
                  {/* BOX: LIST OF Placements */}
                  <div className="box box-info">
                    <div className="box-header with-border">
                      <h3 className="box-title">List All Zones</h3>

                      <div className="box-tools">
                        <div className="input-group input-group-sm" style={{ width: 150 }}>
                          <input
                            type="text" name="inputSearchZones"
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
                            <th><input type="checkbox" className="inputChooseZone" /></th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Description</th>
                            <th>Slot</th>
                            <th>&nbsp;</th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* eslint-disable jsx-a11y/no-static-element-interactions */}
                          { this.props.zones.list && this.props.placements.editing &&
                          this.filterZones(this.props.zones.list,
                            this.props.placements.editing.pbzPlacement
                          ).map(zone => {
                            if (this.isIndexOf(zone.name, zone.type,
                                zone.width, zone.html, zone.description)) {
                              return (
                                <tr key={zone.id}>
                                  <td><input type="checkbox" className="inputChooseZone" /></td>
                                  <td>
                                    <Link to={`/resource/zone/${zone.id}`}>
                                      <strong>{zone.name}</strong>
                                    </Link>
                                  </td>
                                  <td>{zone.type}</td>
                                  <td>{zone.description}</td>
                                  <td>{zone.slot}</td>
                                  <td
                                    onClick={() => this.pushZoneToPlacement(zone.id)}
                                  >
                                    Add To Placement
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
                            <th><input type="checkbox" className="inputChooseZone" /></th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Description</th>
                            <th>Slot</th>
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
                <section className="col-lg-6">
                  {/* BOX: LIST OF Placements */}
                  <div className="box box-info">
                    <div className="box-header with-border">
                      <h3 className="box-title">List Zone Of {
                        this.props.placements.editing ? this.props.placements.editing.name : '...'
                      }
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
                            <th><input type="checkbox" className="inputChooseZone" /></th>
                            <th>Name</th>
                            <th>Size(px)</th>
                            <th>Key Words</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.props.placements.editing &&
                          this.props.placements.editing.pbzPlacement.map(zone => {
                            if (zone.zones) {
                              return (
                                <tr key={zone.zones.id}>
                                  <td><input type="checkbox" className="inputChooseZone" /></td>
                                  <td>
                                    <Link to={`/resource/zone/${zone.zones.id}`}>
                                      <strong>{zone.zones.name}</strong>
                                    </Link>
                                  </td>
                                  <td>{zone.zones.type}</td>
                                  <td>{zone.zones.description}</td>
                                  <td>{zone.zones.slot}</td>
                                  <td>Remove</td>
                                </tr>
                              );
                            }
                            return false;
                          })}
                        </tbody>
                        <tfoot>
                          <tr>
                            <th><input type="checkbox" className="inputChooseZone" /></th>
                            <th>Name</th>
                            <th>Size(px)</th>
                            <th>Key Words</th>
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
  placements: state.placements,
  campaigns: state.campaigns,
  banners: state.banners,
  placementBannerZones: state.placementBannerZones,
  zones: state.zones,
});

const mapDispatch = {
  getPlacement,
  updatePlacement,
  deletePlacement,
  getCampaigns,
  getBanners,
  createPlacementBannerZone,
  getZones,
};

export default withStyles(s)(connect(mapState, mapDispatch)(Placement));
