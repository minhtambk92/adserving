/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* global $ */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// import { defineMessages, FormattedRelative } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { getZone, updateZone, deleteZone } from '../../../../actions/zones';
import { getSites } from '../../../../actions/sites';
import { getPlacements, createPlacement } from '../../../../actions/placements';
import { getCampaigns } from '../../../../actions/campaigns';
import {
  createPlacementBannerZone,
  removeZone,
  removeZoneInPlacementBannerZone,
} from '../../../../actions/placementBannerZones';
import Layout from '../../../../components/Layout';
import ListPlacementNotBelongToZone from '../ListPlacementNotBelongToZone';
import ListPlacementOfZone from '../ListPlacementOfZone';
import UpdateZoneForm from '../UpdateZoneForm';
import CreatePlacementInZone from '../../placements/CreatePlacementForm';
import s from './Zone.css';

const pageTitle = 'Zone';

class Zone extends Component {

  static propTypes = {
    zoneId: PropTypes.string.isRequired,
    page: PropTypes.object,
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

  componentWillMount() {
    this.props.getZone(this.props.zoneId);
    this.props.getSites();
    this.props.getPlacements();
    this.props.getCampaigns();
  }

  componentDidMount() {
    // Set latest active tab
    $('.zone-edit-box ul li').removeClass('active');
    $(`a[href="#${this.props.page.activeTab}"]`).trigger('click');
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
        if (pob[i] !== null) {
          newArr.push(pob[i].id);
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
      if (arr[i] !== null) {
        arrPlacement.push(arr[i]);
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
              <div className="nav-tabs-custom zone-edit-box">
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
                              <button
                                type="button" className="btn btn-box-tool"
                                data-widget="collapse"
                              >
                                <i className="fa fa-minus" />
                              </button>
                            </div>
                          </div>
                          {/* /.box-header */}
                          <UpdateZoneForm
                            zone={this.props.zones && this.props.zones.editing}
                            updateZone={this.props.updateZone}
                            deleteZone={this.props.deleteZone}
                            sites={this.props.sites && this.props.sites.list}
                            zoneId={this.props.zoneId}
                            getZone={this.props.getZone}
                            removeZone={this.props.removeZone}
                          />
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
                                    this.props.zones.editing.placements &&
                                    this.filterPlmNotIn(this.props.placements.list,
                                      this.props.zones.editing.placements)}
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
                                  list={this.props.zones && this.props.zones.editing &&
                                  this.props.zones.editing.placements &&
                                    this.dataPlacement(this.props.zones.editing.placements)}
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
                              <button
                                type="button" className="btn btn-box-tool"
                                data-widget="collapse"
                              >
                                <i className="fa fa-minus" />
                              </button>
                            </div>
                          </div>
                          {/* /.box-header */}
                          {/* form start */}
                          <CreatePlacementInZone
                            createPlacement={this.props.createPlacement}
                            zoneId={this.props.zoneId}
                            campaigns={this.props.campaigns && this.props.campaigns.list}
                            getPlacements={this.props.getPlacements}
                            placements={this.props.placements && this.props.placements.list}
                            getZone={this.props.getZone}
                            createPlacementBannerZone={this.props.createPlacementBannerZone}
                          />
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
  page: state.page.zones,
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
