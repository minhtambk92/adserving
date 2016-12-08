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
import { getPlacements, createPlacement, getPlacement } from '../../../../actions/placements';
import { getCampaigns } from '../../../../actions/campaigns';
import { createShare, updateShare, deleteShare } from '../../../../actions/shares';
import {
  createSharePlacement,
  removeShareInSharePlacement,
  removeShare,
} from '../../../../actions/sharePlacements';
import Layout from '../../../../components/Layout';
import UpdateZoneForm from '../UpdateZoneForm';
import ListPlacementOfShare from '../ListPlacementOfShare';
import ListPlacementNotBelongToShare from '../ListPlacementNotBelongToShare';
import ZoneSettingForm from '../SettingZoneForm';
import ListShare from '../ListShare';
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
    placementBanners: PropTypes.object,
    updateShare: PropTypes.func,
    createShare: PropTypes.func,
    deleteShare: PropTypes.func,
    removeShareInSharePlacement: PropTypes.func,
    createSharePlacement: PropTypes.func,
    removeShare: PropTypes.func,
    getPlacement: PropTypes.func,
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
                  <li>
                    <a href="#editZone" data-toggle="tab">
                      Edit Zone
                    </a>
                  </li>
                  <li>
                    <a href="#settingZone" data-toggle="tab">
                      Setting
                    </a>
                  </li>
                  <li className="active">
                    <a href="#shareZone" data-toggle="tab">
                      Share Zone
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
                          />
                        </div>
                        {/* /.col */}
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane" id="settingZone">
                    <div className="row">
                      <div className="col-lg-12">
                        {/* BOX: FORM OF CREATE A NEW ZONE */}
                        <div className="box box-info">
                          <div className="box-header with-border">
                            <h3 className="box-title">Tag Setting</h3>
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
                          <ZoneSettingForm
                            zone={this.props.zones && this.props.zones.editing}
                            updateZone={this.props.updateZone}
                            zoneId={this.props.zoneId}
                            getZone={this.props.getZone}
                          />
                        </div>
                        {/* /.col */}
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane" id="shareZone">
                    <div className="row">
                      <div className="col-lg-12">
                        {/* BOX: FORM OF CREATE A NEW ZONE */}
                        <div className="box box-info">
                          <div className="box-header with-border">
                            <h3 className="box-title">List Share</h3>
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
                          <form className="form-horizontal">
                            <div className="box-body">
                              <div className="row">
                                <div className="col-lg-12" id="shareZoneForm">
                                  <ListShare
                                    list={this.props.zones && this.props.zones.editing
                                    && this.props.zones.editing.shares}
                                    deleteShareZone={this.props.deleteShare}
                                    getZone={this.props.getZone}
                                    zoneId={this.props.zoneId}
                                    updateShareZone={this.props.updateShare}
                                    createShareZone={this.props.createShare}
                                    removeShare={this.props.removeShare}
                                  />
                                </div>
                              </div>
                            </div>
                            {/* /.box-body */}
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
                        {this.props.zones && this.props.zones.editing &&
                        this.props.zones.editing.shares &&
                        this.props.zones.editing.shares.map((share) => (
                          <div className="row" key={share.id}>
                            <section className="col-lg-6">
                              {/* BOX: LIST OF Placements */}
                              <div className="box box-info">
                                <div className="box-header with-border">
                                  <h3 className="box-title">
                                    List Placement Not Belong To {share.name}</h3>
                                </div>
                                {/* /.box-header */}
                                <div className="box-body">
                                  <ListPlacementNotBelongToShare
                                    list={this.props.placements && this.props.placements.list &&
                                    this.filterPlmNotIn(this.props.placements.list,
                                    share.placements)}
                                    createSharePlacement={this.props.createSharePlacement}
                                    getZone={this.props.getZone}
                                    getPlacements={this.props.getPlacements}
                                    zoneId={this.props.zoneId}
                                    shareId={share.id}
                                    getPlacement={this.props.getPlacement}
                                    zone={this.props.zones && this.props.zones.editing}
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
                                    List placements of {share.name}
                                  </h3>
                                </div>
                                {/* /.box-header */}
                                <div className="box-body">
                                  <ListPlacementOfShare
                                    list={share.placements}
                                    /* eslint-disable max-len */
                                    removeShareInSharePlacement={this.props.removeShareInSharePlacement}
                                    /* eslint-enable max-len */
                                    getPlacements={this.props.getPlacements}
                                    getZone={this.props.getZone}
                                    zoneId={this.props.zoneId}
                                    shareId={share.id}
                                  />
                                </div>
                                {/* /.box-body */}
                              </div>
                              {/* /.box */}
                            </section>
                          </div>
                        ))}
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
  page: state.page.zones,
  zones: state.zones,
  sites: state.sites,
  placements: state.placements,
  campaigns: state.campaigns,
  sharePlacements: state.sharePlacements,
});

const mapDispatch = {
  getZone,
  updateZone,
  deleteZone,
  getSites,
  getPlacements,
  getCampaigns,
  createPlacement,
  createShare,
  updateShare,
  deleteShare,
  createSharePlacement,
  removeShareInSharePlacement,
  removeShare,
  getPlacement,
};

export default withStyles(s)(connect(mapState, mapDispatch)(Zone));
