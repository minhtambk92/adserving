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
import { createPlacementBannerZone, removePlacement, removeBannerInPlacementBannerZone, removeZoneInPlacementBannerZone } from '../../../../actions/placementBannerZones';
import { getZones } from '../../../../actions/zones';
import Layout from '../../../../components/Layout';
import Link from '../../../../components/Link';
import ListBannerNotBelongPlacement from '../ListBannerNotBelongPlacement';
import ListBannerOfPlacement from '../ListBannerOfPlacement';
import ListZoneNotBelongPlacement from '../ListZoneNotBelongPlacement';
import ListZoneOfPlacement from '../ListZoneOfPlacement';
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
    removePlacement: PropTypes.func,
    removeBannerInPlacementBannerZone: PropTypes.func,
    removeZoneInPlacementBannerZone: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
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
      sizeWidth,
      sizeHeight,
      weight,
      description,
      campaignId,
      status,
    } = nextProps.placements && (nextProps.placements.editing || {});

    this.inputPlacementName.value = name;
    this.inputPlacementStartTime.value = moment(new Date(startTime)).format('L');
    this.inputPlacementEndTime.value = moment(new Date(endTime)).format('L');
    this.inputPlacementSizeWidth.value = sizeWidth;
    this.inputPlacementSizeHeight.value = sizeHeight;
    this.inputPlacementWeight.value = weight;
    this.inputPlacementDescription.value = description;
    this.inputCampaign.value = campaignId;
    this.inputPlacementStatus.value = status;
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
  isIndexOf(...args) {
    for (let i = 0; i < args.length; i += 1) {
      if (args[i] !== undefined) {
        if (args[i].toLowerCase().indexOf(this.state.searchText.toLowerCase()) !== -1) {
          return true;
        }
      }
    }
    return false;
  }

  updatePlacement() {
    const name = this.inputPlacementName.value;
    const sizeWidth = this.inputPlacementSizeWidth.value;
    const sizeHeight = this.inputPlacementSizeHeight.value;
    const startTime = this.inputPlacementStartTime.value;
    const endTime = this.inputPlacementEndTime.value;
    const weight = this.inputPlacementWeight.value;
    const description = this.inputPlacementDescription.value;
    const campaignId = this.inputCampaign.value;
    const status = this.inputPlacementStatus.value;
    const placement = { id: this.props.placementId };

    if (name && name !== this.props.placements.editing.name) {
      placement.name = name;
    }
    if (startTime && startTime !== this.props.placements.editing.startTime) {
      placement.startTime = startTime;
    }

    if (endTime && endTime !== this.props.placements.editing.endTime) {
      placement.endTime = endTime;
    }
    if (weight && weight !== this.props.placements.editing.weight) {
      placement.weight = weight;
    }

    if (description && description !== this.props.placements.editing.description) {
      placement.description = description;
    }
    if (sizeWidth && sizeWidth !== this.props.placements.editing.sizeWidth) {
      placement.sizeWidth = sizeWidth;
    }
    if (sizeHeight && sizeHeight !== this.props.placements.editing.sizeHeight) {
      placement.sizeHeight = sizeHeight;
    }
    if (campaignId && campaignId !== this.props.placements.editing.campaignId) {
      placement.campaignId = campaignId;
    }
    if (status && status !== this.props.placements.editing.status) {
      placement.status = status;
    }
    if (moment(new Date(startTime)).format('x') < moment(new Date(endTime)).format('x')) {
      this.props.updatePlacement(placement).then(() => {
        this.props.getPlacement(this.props.placementId);
      });
    } else {
      this.inputPlacementEndTime.value = null;
      this.inputPlacementEndTime.focus();
    }
  }

  deletePlacement() {
    this.props.deletePlacement(this.props.placementId);
    this.props.removePlacement(this.props.placementId);
  }
  filterBanner(allBanner, bof) { // eslint-disable-line no-unused-vars, class-methods-use-this
    if (allBanner.length === 0) {
      return [];
    } else if (bof.length === 0) {
      return allBanner;
    } else if (bof.length > 0 && allBanner.length > 0) {
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
    if (allZones.length === 0) {
      return [];
    } else if (zof.length === 0) {
      return allZones;
    } else if (zof.length > 0 && allZones.length > 0) {
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
  dataBanner(arr) { // eslint-disable-line no-unused-vars, class-methods-use-this
    const arrBanner = [];
    for (let i = 0; i < arr.length; i += 1) {
      if (arr[i].banners !== null) {
        arrBanner.push(arr[i].banners);
      }
    }
    return arrBanner;
  }
  dataZone(arr) { // eslint-disable-line no-unused-vars, class-methods-use-this
    const arrZone = [];
    for (let i = 0; i < arr.length; i += 1) {
      if (arr[i].zones !== null) {
        arrZone.push(arr[i].zones);
      }
    }
    return arrZone;
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
              <div className="nav-tabs-custom">
                <ul className="nav nav-tabs">
                  <li className="active">
                    <a href="#editPlacement" data-toggle="tab">
                      Edit Placement
                    </a>
                  </li>
                  <li>
                    <a href="#addBanner" data-toggle="tab">
                      Add Banner
                    </a>
                  </li>
                  <li>
                    <a href="#addZone" data-toggle="tab">
                      Add Zone
                    </a>
                  </li>
                </ul>
                <div className="tab-content">
                  <div className="active tab-pane" id="editPlacement">
                    <div className="row">
                      <section className="col-lg-12">
                        {/* BOX: FORM OF CREATE NEW WEBSITE */}
                        <div className="box box-info">
                          <div className="box-header with-border">
                            <h3 className="box-title">Change Placement information</h3>
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
                                    ref={c => {
                                      this.inputPlacementStartTime = c;
                                    }}
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
                                    ref={c => {
                                      this.inputPlacementEndTime = c;
                                    }}
                                  />
                                </div>
                              </div>

                              <div className="form-group">
                                <label htmlFor="inputPlacementSizeWidth" className="col-sm-2 control-label">
                                  Size (Width)
                                </label>
                                <div className="col-sm-10">
                                  <input
                                    type="text" className="form-control" id="inputPlacementSizeWidth"
                                    placeholder="300"
                                    ref={c => {
                                      this.inputPlacementSizeWidth = c;
                                    }}
                                  />
                                </div>
                              </div>
                              <div className="form-group">
                                <label htmlFor="inputPlacementSizeHeight" className="col-sm-2 control-label">
                                  Size (Height)
                                </label>
                                <div className="col-sm-10">
                                  <input
                                    type="text" className="form-control" id="inputPlacementSizeHeight"
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
                                    type="number" className="form-control" id="inputPlacementWeight"
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
                  </div>
                  <div className="tab-pane" id="addBanner">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="row">
                          <section className="col-lg-6">
                            {/* BOX: LIST OF Placements */}
                            <div className="box box-info">
                              <div className="box-header with-border">
                                <h3 className="box-title">List All Banner</h3>
                              </div>
                              {/* /.box-header */}
                              <div className="box-body">
                                <ListBannerNotBelongPlacement
                                  list={this.props.banners && this.props.banners.list
                                   && this.props.placements && this.props.placements.editing &&
                                    this.props.placements.editing.pbzPlacement &&
                                    this.filterBanner(this.props.banners.list,
                                      this.props.placements.editing.pbzPlacement
                                    )}
                                  createPlacementBannerZone={this.props.createPlacementBannerZone}
                                  getPlacement={this.props.getPlacement}
                                  getBanners={this.props.getBanners}
                                  placementId={this.props.placementId}
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
                                <h3 className="box-title">List Banner Of {
                                  this.props.placements.editing ?
                                    this.props.placements.editing.name : '...'
                                }
                                </h3>
                              </div>
                              {/* /.box-header */}
                              <div className="box-body">
                                <ListBannerOfPlacement
                                  list={this.props.placements && this.props.placements.editing &&
                                    this.props.placements.editing.pbzPlacement &&
                                    this.dataBanner(this.props.placements.editing.pbzPlacement)}
                                  /* eslint-disable max-len */
                                  removeBannerInPlacementBannerZone={this.props.removeBannerInPlacementBannerZone}
                                  /* eslint-enable max-len */
                                  getPlacement={this.props.getPlacement}
                                  getBanners={this.props.getBanners}
                                  placementId={this.props.placementId}
                                />
                              </div>
                              {/* /.box-body */}
                            </div>
                            {/* /.box */}
                          </section>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane" id="addZone">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="row">
                          <section className="col-lg-6">
                            {/* BOX: LIST OF Placements */}
                            <div className="box box-info">
                              <div className="box-header with-border">
                                <h3 className="box-title">List All Zones</h3>
                              </div>
                              {/* /.box-header */}
                              <div className="box-body">
                                <ListZoneNotBelongPlacement
                                  list={this.props.zones && this.props.zones.list &&
                                  this.props.placements &&
                                  this.props.placements.editing &&
                                    this.props.placements.editing.pbzPlacement &&
                                    this.filterZones(this.props.zones.list,
                                      this.props.placements.editing.pbzPlacement)}
                                  createPlacementBannerZone={this.props.createPlacementBannerZone}
                                  getPlacement={this.props.getPlacement}
                                  getZones={this.props.getZones}
                                  placementId={this.props.placementId}
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
                                <h3 className="box-title">List Zone Of {
                                  this.props.placements.editing ?
                                    this.props.placements.editing.name : '...'
                                }
                                </h3>
                              </div>
                              {/* /.box-header */}
                              <div className="box-body">
                                <ListZoneOfPlacement
                                  list={this.props.placements && this.props.placements.editing &&
                                    this.props.placements.editing.pbzPlacement &&
                                    this.dataZone(this.props.placements.editing.pbzPlacement)}
                                  /* eslint-disable max-len */
                                  removeZoneInPlacementBannerZone={this.props.removeZoneInPlacementBannerZone}
                                  /* eslint-enable max-len */
                                  getPlacement={this.props.getPlacement}
                                  getZones={this.props.getZones}
                                  placementId={this.props.placementId}
                                />
                              </div>
                              {/* /.box-body */}
                            </div>
                            {/* /.box */}
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
  removePlacement,
  removeBannerInPlacementBannerZone,
  removeZoneInPlacementBannerZone,
};

export default withStyles(s)(connect(mapState, mapDispatch)(Placement));
