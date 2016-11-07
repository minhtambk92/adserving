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
import ListPlacementNotBelongToZone from '../ListPlacementNotBelongToZone';
import ListPlacementOfZone from '../ListPlacementOfZone';
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
      searchText: '',
      checkTypeZone: true,
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
      width,
      height,
      sizeValue,
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
    if (type !== 'type-3') {
      this.state.checkTypeZone = true;
      this.inputZoneWidth.value = width;
      this.inputZoneHeight.value = height;
      this.inputZoneSize.value = sizeValue;
    } else if (type === 'type-3') {
      this.state.checkTypeZone = false;
    }
  }
  componentDidUpdate() {
    /* eslint-disable no-undef */
    $('#inputPlacementStartTime').datepicker('update', new Date());
    /* eslint-disable no-underscore-dangle */
    $('#inputPlacementEndTime').datepicker('update', moment().add(1, 'month')._d);
    /* eslint-enable no-underscore-dangle */
    /* eslint-enable no-undef */
  }
  onKeyDown(event) { // eslint-disable-line no-unused-vars, class-methods-use-this
    this.inputZoneSize.value = 'custom';
  }
  onSelectZoneType(event) { // eslint-disable-line no-unused-vars, class-methods-use-this
    const zoneType = this.inputZoneType.value;
    if (zoneType !== 'type-3') {
      event.persist();
      this.setState((previousState) => ({
        ...previousState,
        checkTypeZone: true,
      }));
    } else if (zoneType === 'type-3') {
      event.persist();
      this.setState((previousState) => ({
        ...previousState,
        checkTypeZone: false,
      }));
    }
  }
  onSelectSize(event) { // eslint-disable-line no-unused-vars, class-methods-use-this
    const sizeType = this.inputZoneSize.value;
    if (sizeType !== 'custom') {
      this.inputZoneHeight.value = sizeType.split('x')[1];
      this.inputZoneWidth.value = sizeType.split('x')[0];
    } else if (sizeType === 'custom') {
      this.inputZoneHeight.value = 0;
      this.inputZoneWidth.value = 0;
    }
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
    let sizeText = '';
    let sizeValue = '';
    let height = 0;
    let width = 0;

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
    if (this.state.checkTypeZone === true && type !== 'type-3') {
      sizeValue = this.inputZoneSize.value;
      if (this.inputZoneSize.value === 'custom') {
        if (this.inputZoneWidth.value.trim() !== '' && this.inputZoneHeight.value.trim() !== '') {
          width = this.inputZoneWidth.value;
          height = this.inputZoneHeight.value;
          sizeText = `Custom (${width} x ${height})`;
        } else {
          width = 0;
          height = 0;
          sizeText = 'Custom (0 x 0)';
        }
      } else if (this.inputZoneSize.value !== 'custom') {
        width = this.inputZoneWidth.value;
        height = this.inputZoneHeight.value;
        sizeText = this.inputZoneSize.options[this.inputZoneSize.selectedIndex].text;
      }
    } else if (this.state.checkTypeZone === false && type === 'type-3') {
      width = 0;
      height = 0;
      sizeText = 'Custom (Text ad)';
      sizeValue = '';
    }
    if (width && width !== this.props.zones.editing.width) {
      zone.width = width;
    }
    if (height && height !== this.props.zones.editing.height) {
      zone.height = height;
    }
    if (sizeText && sizeText !== this.props.zones.editing.sizeText) {
      zone.sizeText = sizeText;
    }
    if (sizeValue && sizeValue !== this.props.zones.editing.sizeValue) {
      zone.sizeValue = sizeValue;
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
  createPlacement() {
    const name = this.inputPlacementName.value;
    const startTime = new Date(moment(new Date(this.inputPlacementStartTime.value)).format('YYYY-MM-DD 00:00:00'));
    const endTime = new Date(moment(new Date(this.inputPlacementEndTime.value)).format('YYYY-MM-DD 00:00:00'));
    const sizeWidth = this.inputPlacementSizeWidth.value;
    const sizeHeight = this.inputPlacementSizeHeight.value;
    const weight = this.inputPlacementWeight.value;
    const description = this.inputPlacementDescription.value;
    const campaignId = this.inputPlacementCampaign.value;
    const status = this.inputPlacementStatus.value;
    if (name && startTime && endTime && sizeHeight && sizeWidth && weight && description) {
      if (moment(startTime).format('x') < moment(endTime).format('x')) {
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
    this.inputPlacementSizeWidth.value = null;
    this.inputPlacementSizeHeight.value = null;
    this.inputPlacementWeight.value = null;
  }
  filterPlmNotIn(allPlacement, pob) { // eslint-disable-line no-unused-vars, class-methods-use-this
    if (allPlacement.length === 0) {
      return [];
    } else if (pob.length === 0) {
      return allPlacement;
    } else if (pob.length > 0 && allPlacement.length > 0) {
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
  dataPlacement(arr) { // eslint-disable-line no-unused-vars, class-methods-use-this
    const arrPlacement = [];
    for (let i = 0; i < arr.length; i += 1) {
      if (arr[i].placements !== null) {
        arrPlacement.push(arr[i].placements);
      }
    }
    return arrPlacement;
  }
  render() {
    return (
      <Layout
        pageTitle={
          pageTitle
            .concat(': ')
            .concat(this.props.zones.editing ? this.props.zones.editing.name : '...')
        }
        pageSubTitle={this.props.zones.editing ? this.props.zones.editing.sizeText : ''}
      >
        <div>
          <div className="row">
            <section className="col-lg-12">
              <div className="nav-tabs-custom">
                <ul className="nav nav-tabs">
                  <li className="active">
                    <a href="#editZone" data-toggle="tab">
                      Edit Zone
                    </a>
                  </li>
                  <li>
                    <a href="#addPlacement" data-toggle="tab">
                      Add Placement
                    </a>
                  </li>
                </ul>
                <div className="tab-content">
                  <div className="active tab-pane" id="editZone">
                    <div className="row">
                      <div className="col-lg-12">
                        {/* BOX: FORM OF CREATE A NEW ZONE */}
                        <div className="box box-info">
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
                                    onChange={event => this.onSelectZoneType(event)}
                                    ref={c => {
                                      this.inputZoneType = c;
                                    }}
                                  >
                                    <option value="type-1">Banner, Button or Rectangle </option>
                                    <option value="type-2">Interstitial or Floating DHTML </option>
                                    <option value="type-3">Text ad </option>
                                    <option value="type-4">Email/Newsletter zone</option>
                                  </select>
                                </div>
                              </div>
                              { this.state.checkTypeZone === true ? (
                                <div className="size">
                                  <div className="form-group">
                                    <label
                                      htmlFor="inputZoneSize"
                                      className="col-sm-2 control-label"
                                    >Size</label>
                                    <div className="col-sm-10">
                                      <select
                                        id="inputZoneSize"
                                        className="form-control"
                                        onChange={event => this.onSelectSize(event)}
                                        ref={c => {
                                          this.inputZoneSize = c;
                                        }}
                                      >
                                        <option value="468x60">IAB Full Banner (468 x 60)</option>
                                        <option value="120x600">IAB Skyscraper (120 x 600)</option>
                                        <option value="728x90">IAB Leaderboard (728 x 90)</option>
                                        <option value="120x90">IAB Button 1 (120 x 90)</option>
                                        <option value="120x60">IAB Button 2 (120 x 60)</option>
                                        <option value="234x60">IAB Half Banner (234 x 60)</option>
                                        <option value="88x31">IAB Micro Bar (88 x 31)</option>
                                        <option value="125x125">IAB Square Button (125 x 125)</option>
                                        <option value="120x240">IAB Vertical Banner (120 x 240)</option>
                                        <option value="180x150">IAB Rectangle (180 x 150)</option>
                                        <option value="300x250">IAB Medium Rectangle (300 x 250)</option>
                                        <option value="336x280">IAB Large Rectangle (336 x 280)</option>
                                        <option value="240x400">IAB Vertical Rectangle (240 x 400)</option>
                                        <option value="250x250">IAB Square Pop-up (250 x 250)</option>
                                        <option value="160x600">IAB Wide Skyscraper (160 x 600)</option>
                                        <option value="720x300">IAB Pop-Under (720 x 300)</option>
                                        <option value="300x100">IAB 3:1 Rectangle (300 x 100)</option>
                                        <option value="custom">Custom</option>
                                      </select>
                                    </div>
                                  </div>
                                  <div className="form-group">
                                    <label
                                      htmlFor="inputZoneSize"
                                      className="col-sm-2 control-label"
                                    >&nbsp;</label>
                                    <div className="col-sm-10">
                                      <div className="row">
                                        <div className="col-sm-6">
                                          <label
                                            htmlFor="inputZoneWidth"
                                            className="col-sm-4 control-label"
                                          >Width</label>
                                          <div className="col-sm-8">
                                            <input
                                              type="number" className="form-control" id="inputZoneWidth"
                                              defaultValue="468"
                                              onKeyDown={event => this.onKeyDown(event)}
                                              placeholder="300"
                                              ref={c => {
                                                this.inputZoneWidth = c;
                                              }}
                                            />
                                          </div>
                                        </div>
                                        <div className="col-sm-6">
                                          <label
                                            htmlFor="inputZoneHeight"
                                            className="col-sm-4 control-label"
                                          >Height</label>
                                          <div className="col-sm-8">
                                            <input
                                              type="number" className="form-control" id="inputZoneHeight"
                                              defaultValue="60"
                                              onKeyDown={event => this.onKeyDown(event)}
                                              placeholder="300"
                                              ref={c => {
                                                this.inputZoneHeight = c;
                                              }}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ) : ('') }
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
                    </div>
                  </div>
                  <div className="tab-pane" id="addPlacement">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="row">
                          <section className="col-lg-6">
                            {/* BOX: LIST OF Placements */}
                            <div className="box box-info">
                              <div className="box-header with-border">
                                <h3 className="box-title">List Placement</h3>
                              </div>
                              {/* /.box-header */}
                              <div className="box-body">
                                <ListPlacementNotBelongToZone
                                  list={this.props.placements.list && this.props.zones.editing &&
                                    this.props.zones.editing.pbzZone &&
                                    this.filterPlmNotIn(this.props.placements.list,
                                      this.props.zones.editing.pbzZone)}
                                  createPlacementBannerZone={this.props.createPlacementBannerZone}
                                  getZone={this.props.getZone}
                                  getPlacements={this.props.getPlacements}
                                  zoneId={this.props.zoneId}
                                />
                              </div>
                              {/* /.box-body */}
                            </div>
                            {/* /.box */}
                          </section>
                          <section className="col-lg-6">
                            {/* BOX: LIST OF Placements */}
                            <div className="box box-info">
                              <div className="box-header with-border">
                                <h3 className="box-title">
                                  List placements of {this.props.zones.editing ?
                                  this.props.zones.editing.name : '...'}
                                </h3>
                              </div>
                              {/* /.box-header */}
                              <div className="box-body">
                                <ListPlacementOfZone
                                  list={this.props.zones.editing &&
                                  this.props.zones.editing.pbzZone &&
                                    this.dataPlacement(this.props.zones.editing.pbzZone)}
                                  /* eslint-disable max-len */
                                  removeZoneInPlacementBannerZone={this.props.removeZoneInPlacementBannerZone}
                                  /* eslint-enable max-len */
                                  getPlacements={this.props.getPlacements}
                                  getZone={this.props.getZone}
                                  zoneId={this.props.zoneId}
                                />
                              </div>
                              {/* /.box-body */}
                            </div>
                            {/* /.box */}
                          </section>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <section className="col-lg-6">
                        {/* BOX: FORM OF CREATE NEW PlacementS */}
                        <div className="box box-info">
                          <div className="box-header with-border">
                            <h3 className="box-title">Create New Placements</h3>
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
                                    ref={c => { this.inputPlacementWeight = c; }}
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
