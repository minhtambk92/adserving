/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import style from 'react-dropzone-component/styles/filepicker.css';
import dropZoneStyle from 'dropzone/dist/min/dropzone.min.css';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { getBanner, updateBanner, deleteBanner } from '../../../../actions/banners';
import { getCampaigns } from '../../../../actions/campaigns';
import { createPlacement, getPlacements } from '../../../../actions/placements';
import { getChannels } from '../../../../actions/channels';
import {
  createPlacementBannerZone,
  removeBanner,
  removeBannerInPlacementBannerZone,
} from '../../../../actions/placementBannerZones';
import Layout from '../../../../components/Layout';
import ListPlacementNotBelongBanner from '../ListPlacementNotBelongBanner';
import ListPlacementOfBanner from '../ListPlacementOfBanner';
import UpdateBannerForm from '../UpdateBannerForm';
import CreatePlacementInBanner from '../../placements/CreatePlacementForm';
import { DatePicker } from '../../../../components/UI';
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
    getChannels: PropTypes.func,
    channels: PropTypes.object,
    removeBannerInPlacementBannerZone: PropTypes.func,
  };
  constructor(props, context) {
    super(props, context);

    this.state = {
      showActivationDate: false,
      showExpirationDate: false,
      showImpressionsBooked: false,
      showClicksBooked: false,
    };
  }

  componentWillMount() {
    this.props.getBanner(this.props.bannerId);
    this.props.getCampaigns();
    this.props.getPlacements();
    this.props.getChannels();
  }

  filterPlacements(arr) { // eslint-disable-line no-unused-vars, class-methods-use-this
    const arrId = [];
    const arrPlacement = [];
    for (let i = 0; i < arr.length; i += 1) {
      if (arr[i].placements !== null) {
        if (arrId.indexOf(arr[i].placements.id) === -1) {
          arrId.push(arr[i].placements.id);
          arrPlacement.push(arr[i].placements);
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

  chooseExpirationDate() { // eslint-disable-line no-unused-vars, class-methods-use-this
    const expirationDate = this.inputBannerExpirationDate.value;
    if (expirationDate === '1') {
      this.setState({ showExpirationDate: true });
    } else if (expirationDate === '0') {
      this.setState({ showExpirationDate: false });
    }
  }

  chooseActivationDate() { // eslint-disable-line no-unused-vars, class-methods-use-this
    const activationDate = this.inputBannerActivationDate.value;
    if (activationDate === '1') {
      this.setState({ showActivationDate: true });
    } else if (activationDate === '0') {
      this.setState({ showActivationDate: false });
    }
  }

  chooseImpressionsBooked() { // eslint-disable-line no-unused-vars, class-methods-use-this
    const impressionsBooked = this.inputImpressionsBooked.value;
    if (impressionsBooked === '1') {
      this.setState({ showImpressionsBooked: true });
    } else if (impressionsBooked === '0') {
      this.setState({ showImpressionsBooked: false });
    }
  }

  chooseClicksBooked() { // eslint-disable-line no-unused-vars, class-methods-use-this
    const clicksBooked = this.inputClicksBooked.value;
    if (clicksBooked === '1') {
      this.setState({ showClicksBooked: true });
    } else if (clicksBooked === '0') {
      this.setState({ showClicksBooked: false });
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
                  <li>
                    <a href="#editBanner" data-toggle="tab">
                      Edit Banner
                    </a>
                  </li>
                  <li className="active">
                    <a href="#optionBanner" data-toggle="tab">
                      Option Banner
                    </a>
                  </li>
                  <li>
                    <a href="#addPlacement" data-toggle="tab">
                      Add Placement
                    </a>
                  </li>
                </ul>
                <div className="tab-content">
                  {/* /#EditBanner */}
                  <div className="tab-pane" id="editBanner">
                    <div className="row">
                      <section className="col-lg-12">
                        <div className="box box-info">
                          <div className="box-header with-border">
                            <h3 className="box-title">Change Banner information</h3>
                            <div className="box-tools pull-right">
                              <button
                                type="button" className="btn btn-box-tool"
                                data-widget="collapse"
                              >
                                <i className="fa fa-minus" />
                              </button>
                            </div>
                          </div>
                          <UpdateBannerForm
                            banner={this.props.banners && this.props.banners.editing}
                            updateBanner={this.props.updateBanner}
                            deleteBanner={this.props.deleteBanner}
                            bannerId={this.props.bannerId}
                            getBanner={this.props.getBanner}
                            removeBanner={this.props.removeBanner}
                            channels={this.props.channels && this.props.channels.list}
                          />
                        </div>
                      </section>
                    </div>
                  </div>
                  {/* /#OptionBanner */}
                  <div className="tab-pane active" id="optionBanner">
                    <div className="row">
                      <section className="col-lg-12">
                        <div className="box box-info">
                          <div className="box-header with-border">
                            <h3 className="box-title">Option</h3>
                            <div className="box-tools pull-right">
                              <button
                                type="button" className="btn btn-box-tool"
                                data-widget="collapse"
                              >
                                <i
                                  className="fa fa-minus"
                                />
                              </button>
                            </div>
                          </div>
                          <div className="box-body">
                            {/* /Setting Detail */}
                            <div className="box box-default">
                              <div className="box-header with-border">
                                <h3 className="box-title">Setting</h3>
                                <div className="box-tools pull-right">
                                  <button
                                    type="button" className="btn btn-box-tool"
                                    data-widget="collapse"
                                  >
                                    <i className="fa fa-minus" />
                                  </button>
                                </div>
                              </div>
                              <div className="box-body">
                                <form className="form-horizontal">
                                  <div className="form-group">
                                    <label
                                      htmlFor="inputBannerUserIFrame"
                                      className="col-sm-2 control-label"
                                    >Count View Banner</label>
                                    <div className="col-sm-8">
                                      <select
                                        id="inputBannerCountView" className="form-control"
                                        ref={c => {
                                          this.inputBannerCountView = c;
                                        }}
                                      >
                                        <option value="0">NO</option>
                                        <option value="1">YES</option>
                                      </select>
                                    </div>
                                  </div>
                                  <div className="form-group">
                                    <label
                                      htmlFor="inputBannerFixIE"
                                      className="col-sm-2 control-label"
                                    >Fix IE(User for banner fail in IE)</label>
                                    <div className="col-sm-8">
                                      <select
                                        id="inputBannerFixIE" className="form-control"
                                        ref={c => {
                                          this.inputBannerFixIE = c;
                                        }}
                                      >
                                        <option value="0">NO</option>
                                        <option value="1">YES</option>
                                      </select>
                                    </div>
                                  </div>
                                  <div className="form-group">
                                    <label
                                      htmlFor="inputBannerIsDefault"
                                      className="col-sm-2 control-label"
                                    >Is Default(Banner default)</label>
                                    <div className="col-sm-8">
                                      <select
                                        id="inputBannerIsDefault" className="form-control"
                                        ref={c => {
                                          this.inputBannerIsDefault = c;
                                        }}
                                      >
                                        <option value="0">NO</option>
                                        <option value="1">YES</option>
                                      </select>
                                    </div>
                                  </div>
                                  <div className="form-group">
                                    <label
                                      htmlFor="inputBannerIsRelative"
                                      className="col-sm-2 control-label"
                                    >Relative()</label>
                                    <div className="col-sm-8">
                                      <select
                                        id="inputBannerIsRelative" className="form-control"
                                        placeholder="Marking the banner will appear on one page"
                                        ref={c => {
                                          this.inputBannerIsRelative = c;
                                        }}
                                      >
                                        <option value="0">NO</option>
                                        <option value="1">YES</option>
                                      </select>
                                    </div>
                                  </div>
                                  <div className="form-group">
                                    <label
                                      htmlFor="inputBannerAdStore"
                                      className="col-sm-2 control-label"
                                    >URL Ad-Store</label>
                                    <div className="col-sm-8">
                                      <input
                                        type="text" className="form-control"
                                        id="inputBannerAdStore" placeholder="1"
                                        defaultValue="rd[timestamp]&rtu=-1"
                                        ref={c => {
                                          this.inputBannerAdStore = c;
                                        }}
                                      />
                                    </div>
                                  </div>
                                </form>
                              </div>
                            </div>
                            {/* /Inventory Detail */}
                            <div className="box box-default">
                              <div className="box-header with-border">
                                <h3 className="box-title">Inventory Detail</h3>
                                <div className="box-tools pull-right">
                                  <button
                                    type="button" className="btn btn-box-tool"
                                    data-widget="collapse"
                                  >
                                    <i className="fa fa-minus" />
                                  </button>
                                </div>
                              </div>
                              <div className="box-body">
                                <form className="form-horizontal">
                                  {/* /Impressions Booked */}
                                  <div className="form-group">
                                    <label
                                      htmlFor="inputImpressionsBooked"
                                      className="col-sm-2 control-label"
                                    >Impressions Booked</label>
                                    <div className="col-sm-8">
                                      <select
                                        id="inputImpressionsBooked" className="form-control"
                                        ref={c => {
                                          this.inputImpressionsBooked = c;
                                        }}
                                        onChange={event => this.chooseImpressionsBooked(event)}
                                      >
                                        <option value="0">Unlimited</option>
                                        <option value="1">Input Impressions Booked</option>
                                      </select>
                                    </div>
                                  </div>
                                  { this.state.showImpressionsBooked === true ? (
                                    <div className="form-group">
                                      <label
                                        htmlFor="inputBannerImpressionsBooked"
                                        className="col-sm-2 control-label"
                                      >&nbsp;</label>
                                      <div className="col-sm-8">
                                        <input
                                          type="number" className="form-control"
                                          id="inputBannerImpressionsBooked" placeholder="1000"
                                          ref={c => {
                                            this.inputBannerImpressionsBooked = c;
                                          }}
                                        />
                                      </div>
                                    </div>
                                  ) : ('') }
                                  {/* /Click Booked */}
                                  <div className="form-group">
                                    <label
                                      htmlFor="inputClicksBooked"
                                      className="col-sm-2 control-label"
                                    >Impressions Booked</label>
                                    <div className="col-sm-8">
                                      <select
                                        id="inputClicksBooked" className="form-control"
                                        ref={c => {
                                          this.inputClicksBooked = c;
                                        }}
                                        onChange={event => this.chooseClicksBooked(event)}
                                      >
                                        <option value="0">Unlimited</option>
                                        <option value="1">Input Clicks Booked</option>
                                      </select>
                                    </div>
                                  </div>
                                  {this.state.showClicksBooked === true ? (
                                    <div className="form-group">
                                      <label
                                        htmlFor="inputBannerClicksBooked"
                                        className="col-sm-2 control-label"
                                      >Clicks Booked</label>
                                      <div className="col-sm-8">
                                        <input
                                          type="text" className="form-control"
                                          id="inputBannerClicksBooked" placeholder="1000"
                                          ref={c => {
                                            this.inputBannerClicksBooked = c;
                                          }}
                                        />
                                      </div>
                                    </div>
                                  ) :('')}
                                </form>
                              </div>
                            </div>
                            {/* /Contract Detail */}
                            <div className="box box-default">
                              <div className="box-header with-border">
                                <h3 className="box-title">Contract Detail</h3>
                                <div className="box-tools pull-right">
                                  <button
                                    type="button" className="btn btn-box-tool"
                                    data-widget="collapse"
                                  >
                                    <i
                                      className="fa fa-minus"
                                    />
                                  </button>
                                </div>
                              </div>
                              <div className="box-body">
                                <form className="form-horizontal">
                                  <div className="form-group">
                                    <label
                                      htmlFor="inputBannerActivationDate"
                                      className="col-sm-2 control-label"
                                    >Activation Date</label>
                                    <div className="col-sm-8">
                                      <select
                                        id="inputBannerActivationDate" className="form-control"
                                        ref={c => {
                                          this.inputBannerActivationDate = c;
                                        }}
                                        onChange={event => this.chooseActivationDate(event)}
                                      >
                                        <option value="0">Active Immediately</option>
                                        <option value="1">Choose Data</option>
                                      </select>
                                    </div>
                                  </div>
                                  { this.state.showActivationDate === true ? (
                                    <div className="form-group has-feedback">
                                      <label
                                        htmlFor="inputActivationDate"
                                        className="col-sm-2 control-label"
                                      >
                                        &nbsp;
                                      </label>
                                      <div className=" col-sm-8 date">
                                        <span className="fa fa-calendar form-control-feedback" />
                                        {/* /DatePicker */}
                                        <DatePicker
                                          id="inputActivationDate"
                                          type="text"
                                          className="form-control pull-right"
                                          name="end"
                                        />
                                      </div>
                                    </div>) : ('')}
                                  <div className="form-group">
                                    <label
                                      htmlFor="inputBannerExpirationDate"
                                      className="col-sm-2 control-label"
                                    >Expiration Date</label>
                                    <div className="col-sm-8">
                                      <select
                                        id="inputBannerExpirationDate" className="form-control"
                                        onChange={event => this.chooseExpirationDate(event)}
                                        ref={c => {
                                          this.inputBannerExpirationDate = c;
                                        }}
                                      >
                                        <option value="0">Dont Expire</option>
                                        <option value="1">Choose Data</option>
                                      </select>
                                    </div>
                                  </div>
                                  {this.state.showExpirationDate === true ? (
                                    <div className="form-group has-feedback">
                                      <label
                                        htmlFor="inputExpirationDate"
                                        className="col-sm-2 control-label"
                                      >
                                        &nbsp;
                                      </label>
                                      <div className=" col-sm-8 date">
                                        <span className="fa fa-calendar form-control-feedback" />
                                        {/* /DatePicker */}
                                        <DatePicker
                                          id="inputExpirationDate"
                                          type="text"
                                          className="form-control pull-right"
                                          name="end"
                                        />
                                      </div>
                                    </div>
                                  ) : ('')}
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </section>
                    </div>
                  </div>
                  {/* /#addPlacement */}
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
                                <ListPlacementNotBelongBanner
                                  list={this.props.placements.list &&
                                  this.props.banners.editing &&
                                  this.props.banners.editing.pbzBanner &&
                                  this.filterPlmNotIn(
                                    this.props.placements.list,
                                    this.props.banners.editing.pbzBanner,
                                  )}
                                  createPlacementBannerZone={this.props.createPlacementBannerZone}
                                  getBanner={this.props.getBanner}
                                  getPlacements={this.props.getPlacements}
                                  bannerId={this.props.bannerId}
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
                                  List Placement Of {this.props.banners.editing ?
                                  this.props.banners.editing.name : '...'}
                                </h3>
                              </div>
                              {/* /.box-header */}
                              <div className="box-body">
                                <ListPlacementOfBanner
                                  list={this.props.banners.editing &&
                                  this.props.banners.editing.pbzBanner &&
                                  this.filterPlacements(
                                    this.props.banners.editing.pbzBanner,
                                  )}
                                  /* eslint-disable max-len */
                                  removeBannerInPlacementBannerZone={this.props.removeBannerInPlacementBannerZone}
                                  /* eslint-enable max-len */
                                  getPlacements={this.props.getPlacements}
                                  getBanner={this.props.getBanner}
                                  bannerId={this.props.bannerId}
                                />
                              </div>
                              {/* /.box-body */}
                            </div>
                            {/* /.box */}
                          </section>
                        </div>
                        <div className="row">
                          <section className="col-lg-6">
                            {/* BOX: CREATE */}
                            <div className="box box-info">
                              <div className="box-header with-border">
                                <h3 className="box-title">Create New Placement</h3>
                                <div className="box-tools pull-right">
                                  <button
                                    type="button" className="btn btn-box-tool"
                                    data-widget="collapse"
                                  ><i className="fa fa-minus" /></button>
                                </div>
                              </div>
                              {/* /.box-header */}
                              {/* form start */}
                              <CreatePlacementInBanner
                                createPlacement={this.props.createPlacement}
                                bannerId={this.props.bannerId}
                                campaigns={this.props.campaigns && this.props.campaigns.list}
                                getPlacements={this.props.getPlacements}
                                placements={this.props.placements && this.props.placements.list}
                                getBanner={this.props.getBanner}
                                createPlacementBannerZone={this.props.createPlacementBannerZone}
                              />
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
  channels: state.channels,
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
  getChannels,
};

export default withStyles(s, style, dropZoneStyle)(connect(mapState, mapDispatch)(Banner));
