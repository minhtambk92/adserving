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
// import { defineMessages, FormattedRelative } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { getPlacement, updatePlacement, deletePlacement } from '../../../../actions/placements';
import { getCampaigns } from '../../../../actions/campaigns';
import { getBanners } from '../../../../actions/banners';
import { createPlacementBannerZone, removePlacement, removeBannerInPlacementBannerZone, removeZoneInPlacementBannerZone } from '../../../../actions/placementBannerZones';
import { getZones } from '../../../../actions/zones';
import Layout from '../../../../components/Layout';
import ListBannerNotBelongPlacement from '../ListBannerNotBelongPlacement';
import ListBannerOfPlacement from '../ListBannerOfPlacement';
import ListZoneNotBelongPlacement from '../ListZoneNotBelongPlacement';
import ListZoneOfPlacement from '../ListZoneOfPlacement';
import UpdatePlacementForm from '../UpdatePlacementForm';
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

  componentWillMount() {
    this.props.getPlacement(this.props.placementId);
    this.props.getCampaigns();
    this.props.getBanners();
    this.props.getZones();
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
        if (bof[i] !== null) {
          newArr.push(bof[i].id);
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
        if (zof[i] !== null) {
          newArr.push(zof[i].id);
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
      if (arr[i] !== null) {
        arrBanner.push(arr[i]);
      }
    }
    return arrBanner;
  }
  dataZone(arr) { // eslint-disable-line no-unused-vars, class-methods-use-this
    const arrZone = [];
    for (let i = 0; i < arr.length; i += 1) {
      if (arr[i] !== null) {
        arrZone.push(arr[i]);
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
                          <UpdatePlacementForm
                            placement={this.props.placements && this.props.placements.editing}
                            updatePlacement={this.props.updatePlacement}
                            deletePlacement={this.props.deletePlacement}
                            placementId={this.props.placementId}
                            getPlacement={this.props.getPlacement}
                            campaigns={this.props.campaigns && this.props.campaigns.list}
                            removePlacement={this.props.removePlacement}
                          />
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
                                    this.props.placements.editing.banners &&
                                    this.filterBanner(this.props.banners.list,
                                      this.props.placements.editing.banners,
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
                                    this.props.placements.editing.banners &&
                                    this.dataBanner(this.props.placements.editing.banners)}
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
                                    this.props.placements.editing.zones &&
                                    this.filterZones(this.props.zones.list,
                                      this.props.placements.editing.zones)}
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
                                    this.props.placements.editing.zones &&
                                    this.dataZone(this.props.placements.editing.zones)}
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
