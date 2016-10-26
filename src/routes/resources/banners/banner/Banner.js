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
import { getBanner, updateBanner, deleteBanner } from '../../../../actions/banners';
import { getCampaigns } from '../../../../actions/campaigns';
import { createPlacement, getPlacements } from '../../../../actions/placements';
import { createPlacementBannerZone, removeBanner, removeBannerInPlacementBannerZone } from '../../../../actions/placementBannerZones';
import Layout from '../../../../components/Layout';
import Link from '../../../../components/Link';
import s from './Banner.css';
// import { defineMessages, FormattedRelative } from 'react-intl';

const pageTitle = 'Banner';

class Banner extends Component {

  static propTypes = {
    bannerId: PropTypes.string.isRequired,
    banners: PropTypes.object,
    getBanner: PropTypes.func,
    updateBanner: PropTypes.func,
    deleteBanner: PropTypes.func,
    campaigns: PropTypes.object,
    getCampaigns: PropTypes.func,
    createPlacement: PropTypes.func,
    placements: PropTypes.object,
    createPlacementBannerZone: PropTypes.func,
    getPlacements: PropTypes.func,
    placementBannerZones: PropTypes.object,
    removeBanner: PropTypes.func,
    removeBannerInPlacementBannerZone: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      name: '',
      html: '',
      width: 0,
      height: 0,
      keyword: '',
      weight: 0,
      description: '',
      searchText: '',
    };
  }

  componentWillMount() {
    this.props.getBanner(this.props.bannerId);
    this.props.getCampaigns();
    this.props.getPlacements();
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
      name,
      html,
      width,
      height,
      keyword,
      weight,
      description,
      status,
    } = nextProps.banners && (nextProps.banners.editing || {});

    this.inputBannerName.value = name;
    this.inputBannerHTML.value = html;
    this.inputBannerWidth.value = width;
    this.inputBannerHeight.value = height;
    this.inputBannerKeyWord.value = keyword;
    this.inputBannerWeight.value = weight;
    this.inputBannerDescription.value = description;
    this.inputBannerStatus.value = status;
  }

  componentDidUpdate() {
    /* eslint-disable no-undef */
    $('input[type="checkbox"].inputChoosePlacement').iCheck({
      checkboxClass: 'icheckbox_minimal-blue',
      radioClass: 'iradio_minimal-blue',
    });
    /* eslint-enable no-undef */
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
    if (name && startTime && endTime && size && weight && description && campaignId) {
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
          const placementId = this.props.placements.list[0].id;
          const bannerId = this.props.bannerId;
          const zoneId = null;
          this.props.createPlacementBannerZone({ placementId, bannerId, zoneId }).then(() => {
            this.clearInput();
            this.props.getBanner(this.props.bannerId);
            this.props.getPlacements();
          });
        });
      } else {
        this.inputPlacementEndTime.value = null;
      }
    }
  }

  clearInput(event) { // eslint-disable-line no-unused-vars, class-methods-use-this
    this.inputPlacementName.value = null;
    this.inputPlacementSize.value = null;
    this.inputPlacementWeight.value = null;
    this.inputPlacementDescription.value = null;
  }

  isIndexOf(...args) {
    for (let i = 0; i < args.length; i += 1) {
      if (args[i].toLowerCase().indexOf(this.state.searchText.toLowerCase()) !== -1) {
        return true;
      }
    }
    return false;
  }

  filterPlacements(arr) { // eslint-disable-line no-unused-vars, class-methods-use-this
    const arrId = [];
    const arrPlacement = [];
    for (let i = 0; i < arr.length; i += 1) {
      if (arr[i].placements !== null) {
        if (arrId.indexOf(arr[i].placements.id) === -1) {
          arrId.push(arr[i].placements.id);
          arrPlacement.push(arr[i]);
        }
      }
    }
    return arrPlacement;
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

  pushPlacementToBanner(placementId) { // eslint-disable-line no-unused-vars, class-methods-use-this
    const bannerId = this.props.bannerId;
    const zoneId = null;
    if (placementId && bannerId) {
      this.props.createPlacementBannerZone({ placementId, bannerId, zoneId }).then(() => {
        this.props.getBanner(this.props.bannerId).then(() => {
          this.props.getPlacements();
        });
      });
    }
  }

  updateBanner() {
    const name = this.inputBannerName.value;
    const html = this.inputBannerHTML.value;
    const width = this.inputBannerWidth.value;
    const height = this.inputBannerHeight.value;
    const keyword = this.inputBannerKeyWord.value;
    const weight = this.inputBannerWeight.value;
    const description = this.inputBannerDescription.value;
    const status = this.inputBannerStatus.value;
    const banner = { id: this.props.bannerId };

    if (name && name !== this.props.banners.editing.name) {
      banner.name = name;
    }
    if (html && html !== this.props.banners.editing.html) {
      banner.html = html;
    }

    if (width && width !== this.props.banners.editing.width) {
      banner.width = width;
    }

    if (height && height !== this.props.banners.editing.height) {
      banner.height = height;
    }

    if (keyword && keyword !== this.props.banners.editing.keyword) {
      banner.keyword = keyword;
    }
    if (weight && weight !== this.props.banners.editing.weight) {
      banner.weight = weight;
    }
    if (description && description !== this.props.banners.editing.description) {
      banner.description = description;
    }
    if (status && status !== this.props.banners.editing.status) {
      banner.status = status;
    }

    this.props.updateBanner(banner).then(() => {
      this.props.getBanner(this.props.bannerId);
    });
  }

  deleteBanner() {
    this.props.deleteBanner(this.props.bannerId);
    this.props.removeBanner(this.props.bannerId);
  }
  removePlacement(placementId) {
    const bId = this.props.bannerId;
    if (placementId && bId) {
      this.props.removeBannerInPlacementBannerZone({ placementId, bId }).then(() => {
        this.props.getBanner(this.props.bannerId).then(() => {
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
            .concat(this.props.banners.editing ? this.props.banners.editing.name : '...')
        }
        pageSubTitle=""
      >
        <div>
          <div className="row">
            <section className="col-lg-12">
              <div className="nav-tabs-custom">
                <ul className="nav nav-tabs">
                  <li className="active">
                    <a href="#editBanner" data-toggle="tab">
                      Edit Banner
                    </a>
                  </li>
                  <li>
                    <a href="#addPlacement" data-toggle="tab">
                      Add Placement
                    </a>
                  </li>
                </ul>
                <div className="tab-content">
                  <div className="active tab-pane" id="editBanner">
                    <div className="row">
                      <section className="col-lg-12">
                        {/* BOX: FORM OF CREATE NEW WEBSITE */}
                        <div className="box box-info">
                          <div className="box-header with-border">
                            <h3 className="box-title">Change Banner information</h3>
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
                                  htmlFor="inputBannerName"
                                  className="col-sm-2 control-label"
                                >Name</label>
                                <div className="col-sm-10">
                                  <input
                                    type="text" className="form-control" id="inputBannerName"
                                    placeholder="Banner Top"
                                    ref={c => {
                                      this.inputBannerName = c;
                                    }}
                                  />
                                </div>
                              </div>
                              <div className="form-group">
                                <label
                                  htmlFor="inputBannerHTML"
                                  className="col-sm-2 control-label"
                                >HTML</label>
                                <div className="col-sm-10">
                                  <textarea
                                    className="form-control" id="inputBannerHTML"
                                    rows="5" placeholder="More info..."
                                    ref={c => {
                                      this.inputBannerHTML = c;
                                    }}
                                  />
                                </div>
                              </div>
                              <div className="form-group">
                                <label
                                  htmlFor="inputBannerWidth"
                                  className="col-sm-2 control-label"
                                >Width(px)</label>
                                <div className="col-sm-10">
                                  <input
                                    type="number" className="form-control" id="inputBannerWidth"
                                    placeholder="300"
                                    ref={c => {
                                      this.inputBannerWidth = c;
                                    }}
                                  />
                                </div>
                              </div>
                              <div className="form-group">
                                <label
                                  htmlFor="inputBannerHeight"
                                  className="col-sm-2 control-label"
                                >Height(px)</label>
                                <div className="col-sm-10">
                                  <input
                                    type="number" className="form-control" id="inputBannerHeight"
                                    placeholder="300"
                                    ref={c => {
                                      this.inputBannerHeight = c;
                                    }}
                                  />
                                </div>
                              </div>
                              <div className="form-group">
                                <label
                                  htmlFor="inputBannerKeyWord"
                                  className="col-sm-2 control-label"
                                >KeyWord</label>
                                <div className="col-sm-10">
                                  <input
                                    type="text" className="form-control" id="inputBannerKeyWord"
                                    placeholder="dantri"
                                    ref={c => {
                                      this.inputBannerKeyWord = c;
                                    }}
                                  />
                                </div>
                              </div>
                              <div className="form-group">
                                <label
                                  htmlFor="inputBannerWeight"
                                  className="col-sm-2 control-label"
                                >Weight</label>
                                <div className="col-sm-10">
                                  <input
                                    type="number"
                                    className="form-control" id="inputBannerWeight" placeholder="1"
                                    ref={c => {
                                      this.inputBannerWeight = c;
                                    }}
                                  />
                                </div>
                              </div>
                              <div className="form-group">
                                <label
                                  htmlFor="inputBannerStatus"
                                  className="col-sm-2 control-label"
                                >Status</label>
                                <div className="col-sm-10">
                                  <select
                                    id="inputBannerStatus" className="form-control"
                                    ref={c => {
                                      this.inputBannerStatus = c;
                                    }}
                                  >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                  </select>
                                </div>
                              </div>
                              <div className="form-group">
                                <label
                                  htmlFor="inputBannerDescription"
                                  className="col-sm-2 control-label"
                                >Description</label>
                                <div className="col-sm-10">
                                  <textarea
                                    className="form-control" id="inputBannerDescription"
                                    rows="5" placeholder="More info..."
                                    ref={c => {
                                      this.inputBannerDescription = c;
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                            {/* /.box-body */}
                            <div className="box-footer">
                              {/* eslint-disable jsx-a11y/no-static-element-interactions */}
                              <Link
                                to="/resource/banner"
                                className="btn btn-app pull-right"
                              ><i className="fa fa-undo" /> Cancel</Link>
                              <Link
                                to="/resource/banner"
                                className="btn btn-app pull-right"
                                onClick={event => this.deleteBanner(event)}
                              ><i className="fa fa-trash-o" /> Delete</Link>
                              <a
                                className="btn btn-app pull-right"
                                onClick={event => this.updateBanner(event)}
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
                            {/* BOX: LIST OF Placements */}
                            <div className="box box-info">
                              <div className="box-header with-border">
                                <h3 className="box-title">List Placement</h3>

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
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {/* eslint-disable jsx-a11y/no-static-element-interactions */}
                                    {this.props.placements.list && this.props.banners.editing &&
                                    this.props.banners.editing.pbzBanner &&
                                    this.filterPlmNotIn(this.props.placements.list,
                                      this.props.banners.editing.pbzBanner).map(placement => {
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
                                                onClick={() =>
                                                this.pushPlacementToBanner(placement.id)}
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
                                  List Placement Of {this.props.banners.editing ?
                                  this.props.banners.editing.name : '...'}
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
                                    {this.props.banners.editing &&
                                    this.props.banners.editing.pbzBanner &&
                                    this.filterPlacements(this.props.banners.editing.pbzBanner)
                                      .map(placement => {
                                        if (this.isIndexOf(placement.placements.name,
                                            placement.placements.startTime,
                                            placement.placements.endTime, placement.placements.size,
                                            placement.placements.description,
                                            placement.placements.weight)) {
                                          return (
                                            <tr key={placement.placements.id} >
                                              <th><input type="checkbox" className="inputChoosePlacement" /></th>
                                              <th><Link to={`/resource/placement/${placement.placements.id}`}>
                                                {placement.placements.name}
                                              </Link>
                                              </th>
                                              <td>{placement.placements.size}</td>
                                              <td>{moment(new Date(placement.placements.startTime)).format('L')}</td>
                                              <td>{moment(new Date(placement.placements.endTime)).format('L')}</td>
                                              <td
                                                onClick={() =>
                                                this.removePlacement(placement.placements.id)}
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
                                      htmlFor="inputPlacementEndTime"
                                      className="col-sm-2 control-label"
                                    >
                                      End Time:
                                    </label>
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
                                        placeholder="300x300"
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
  banners: state.banners,
  campaigns: state.campaigns,
  placements: state.placements,
  placementBannerZones: state.placementBannerZones,
});

const mapDispatch = {
  getBanner,
  updateBanner,
  deleteBanner,
  getCampaigns,
  createPlacement,
  createPlacementBannerZone,
  getPlacements,
  removeBanner,
  removeBannerInPlacementBannerZone,
};

export default withStyles(s)(connect(mapState, mapDispatch)(Banner));
