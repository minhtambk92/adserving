/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* global $ */

import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
// import { defineMessages, FormattedRelative } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { getZone, updateZone, deleteZone } from '../../../../actions/zone/zones';
import {
  setPageZoneActiveTab,
  setCurrentShare,
  setStatusShareFormEdit,
  setStatusShareFormCreate,
} from '../../../../actions/pages/zones';
import { getSites } from '../../../../actions/site/sites';
import { getPlacements, createPlacement, getPlacement } from '../../../../actions/placement/placements';
import { getCampaigns } from '../../../../actions/campaign/campaigns';
import { getZoneSizeTypes } from '../../../../actions/zoneSizeType/zoneSizeTypes';
import { createShare, updateShare, deleteShare } from '../../../../actions/share/shares';
import { getZoneTypes } from '../../../../actions/zoneType/zoneTypes';
import { getCharacterSets } from '../../../../actions/characterSet/characterSets';
import { getActivitiesBySubjectId, createActivity } from '../../../../actions/activity/activities';
import Layout from '../../../../components/Layout';
import UpdateZoneForm from '../UpdateZoneForm';
import ListPlacementOfShare from '../ListPlacementOfShare';
import ListPlacementNotBelongToShare from '../ListPlacementNotBelongToShare';
import Activities from '../Activities';
import ZoneSettingForm from '../SettingZoneForm';
import ListShare from '../ListShare';
import AdsCode from '../AdsCode';
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
    updateShare: PropTypes.func,
    createShare: PropTypes.func,
    deleteShare: PropTypes.func,
    getPlacement: PropTypes.func,
    setPageZoneActiveTab: PropTypes.func,
    setCurrentShare: PropTypes.func,
    shares: PropTypes.object,
    setStatusShareFormEdit: PropTypes.func,
    setStatusShareFormCreate: PropTypes.func,
    getZoneTypes: PropTypes.func,
    zoneTypes: PropTypes.object,
    getZoneSizeTypes: PropTypes.func,
    zoneSizeTypes: PropTypes.object,
    getCharacterSets: PropTypes.func,
    characterSets: PropTypes.object,
    user: PropTypes.object,
    activities: PropTypes.object,
    createActivity: PropTypes.func,
    getActivitiesBySubjectId: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      arrShare: {},
    };
  }

  componentWillMount() {
    this.props.getSites();
    this.props.getPlacements();
    this.props.getCampaigns();
    this.props.getZoneTypes();
    this.props.getZoneSizeTypes();
    this.props.getZone(this.props.zoneId);
    this.props.getCharacterSets();
    this.props.getActivitiesBySubjectId(this.props.zoneId);
  }

  componentDidMount() {
    // Set latest active tab
    $('.zone-edit-box ul li').removeClass('active');
    $(`a[href="#${this.props.page.activeTab}"]`).trigger('click');
  }

  componentWillReceiveProps(nextProps) {
    const {
      shares,
    } = nextProps.zones && (nextProps.zones.editing || {});
    if (shares && shares.length > 0) {
      if (this.props.page.currentShare) {
        this.inputSelectShare.value = this.props.page.currentShare;
        const shareId = this.props.page.currentShare;
        const arr = _.filter(shares, { id: shareId });
        if (arr[0].placements.length > 0 && arr[0].placements[0].id !== undefined) {
          this.setState({ arrShare: arr[0] });
        } else if (arr[0].placements.length > 0 && arr[0].placements[0].id === undefined) {
          const arrShares = arr[0];
          arrShares.placements = JSON.parse(arr[0].placements);
          _.remove(arrShares.placements, {
            isDeleted: true,
          });
          this.setState({ arrShare: arrShares });
        } else if (arr[0].placements.length === 0) {
          this.setState({ arrShare: shares[0] });
        }
      } else if (!this.props.page.currentShare) {
        if (shares[0].placements.length > 0 && shares[0].placements[0].id !== undefined) {
          this.setState({ arrShare: shares[0] });
        } else if (shares[0].placements.length > 0 && shares[0].placements[0].id === undefined) {
          const arrShares = shares[0];
          arrShares.placements = JSON.parse(shares[0].placements);
          _.remove(arrShares.placements, {
            isDeleted: true,
          });
          this.setState({ arrShare: arrShares });
        } else if (shares[0].placements.length === 0) {
          this.setState({ arrShare: shares[0] });
        }
      }
    } else if (shares && shares.length === 0) {
      this.setState({ arrShare: {} });
    }
  }

  componentDidUpdate() {
    // Set latest active tab
    $('.zone-edit-box ul li').removeClass('active');
    $(`a[href="#${this.props.page.activeTab}"]`).trigger('click');
  }

  onTabClick(event) {
    event.persist();
    this.props.setPageZoneActiveTab(event.target.getAttribute('data-id'));
    if (event.target.getAttribute('data-id') === 'activity') {
      this.props.getActivitiesBySubjectId(this.props.zoneId);
    }
  }

  getFilteredShare() {
    const isFilter = this.inputSelectShare.value;
    let arr = [];
    if (isFilter) {
      if (this.props.zones && this.props.zones.editing && this.props.zones.editing.shares) {
        arr = _.filter(this.props.zones.editing.shares, { id: isFilter });
      }
    }
    this.setState({ arrShare: arr[0] });
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
    const share = this.state.arrShare;
    return (
      <Layout
        pageTitle={
          pageTitle
            .concat(': ')
            .concat(this.props.zones.editing ? this.props.zones.editing.name : '...')
        }
      >
        <div>
          <div className="row">
            <section className="col-lg-12">
              <div className="nav-tabs-custom zone-edit-box">
                <ul className="nav nav-tabs">
                  <li className="active">
                    <a
                      href="#editZone" data-toggle="tab"
                      data-id="editZone"
                      onClick={event => this.onTabClick(event)}
                    >Edit</a>
                  </li>
                  <li>
                    <a
                      href="#settingZone" data-toggle="tab"
                      data-id="settingZone"
                      onClick={event => this.onTabClick(event)}
                    >Settings</a>
                  </li>
                  <li>
                    <a
                      href="#shareZone" data-toggle="tab"
                      data-id="shareZone"
                      onClick={event => this.onTabClick(event)}
                    >Shares</a>
                  </li>
                  <li>
                    <a
                      href="#addPlacement" data-toggle="tab"
                      data-id="addPlacement"
                      onClick={event => this.onTabClick(event)}
                    >Placements</a>
                  </li>
                  <li>
                    <a
                      href="#apiData" data-toggle="tab" data-id="apiData"
                      onClick={event => this.onTabClick(event)}
                    >API Data</a>
                  </li>
                  <li>
                    <a
                      href="#adsCode" data-toggle="tab" data-id="adsCode"
                      onClick={event => this.onTabClick(event)}
                    >Code</a>
                  </li>
                  <li>
                    <a
                      href="#activity" data-toggle="tab"
                      data-id="activity"
                      onClick={event => this.onTabClick(event)}
                    >Activity</a>
                  </li>
                </ul>

                <div className="tab-content">
                  <div className="active tab-pane" id="editZone">
                    <UpdateZoneForm
                      zone={this.props.zones.editing}
                      updateZone={this.props.updateZone}
                      deleteZone={this.props.deleteZone}
                      sites={this.props.sites.list}
                      zoneId={this.props.zoneId}
                      shares={this.props.shares}
                      getZone={this.props.getZone}
                      setPageZoneActiveTab={this.props.setPageZoneActiveTab}
                      zoneTypeList={this.props.zoneTypes && this.props.zoneTypes.list}
                      zoneSizeTypeList={this.props.zoneSizeTypes && this.props.zoneSizeTypes.list}
                      user={this.props.user}
                      createActivity={this.props.createActivity}
                    />
                  </div>

                  <div className="tab-pane" id="settingZone">
                    <ZoneSettingForm
                      zone={this.props.zones.editing}
                      updateZone={this.props.updateZone}
                      zoneId={this.props.zoneId}
                      getZone={this.props.getZone}
                      setPageZoneActiveTab={this.props.setPageZoneActiveTab}
                      characterSetList={this.props.characterSets && this.props.characterSets.list}
                      user={this.props.user}
                      createActivity={this.props.createActivity}
                    />
                  </div>

                  <div className="tab-pane" id="shareZone">
                    <ListShare
                      list={this.props.zones.editing && this.props.zones.editing.shares}
                      deleteShare={this.props.deleteShare}
                      getZone={this.props.getZone}
                      zoneId={this.props.zoneId}
                      createShare={this.props.createShare}
                      setPageZoneActiveTab={this.props.setPageZoneActiveTab}
                      setCurrentShare={this.props.setCurrentShare}
                      page={this.props.page}
                      shares={this.props.shares}
                      setStatusShareFormEdit={this.props.setStatusShareFormEdit}
                      setStatusShareFormCreate={this.props.setStatusShareFormCreate}
                      updateShare={this.props.updateShare}
                      shareId={this.state.arrShare.id}
                      user={this.props.user}
                      createActivity={this.props.createActivity}
                    />
                  </div>

                  <div className="tab-pane" id="addPlacement">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label
                            className="control-label"
                            htmlFor="inputSelectValue"
                          >Choose a share</label>
                          <select
                            id="inputSelectShare" className="form-control"
                            ref={(c) => {
                              this.inputSelectShare = c;
                            }}
                            onChange={event => this.getFilteredShare(event)}
                          >
                            {this.props.zones.editing && this.props.zones.editing.shares &&
                            this.props.zones.editing.shares.map(option => (
                              <option
                                key={option.id}
                                value={option.id}
                              >{option.name}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    <hr />

                    <div className="row">
                      <div className="col-lg-12">
                        <div className="row">
                          <div className="col-lg-6">
                            {/* BOX: LIST OF Placements */}
                            <div className="box">
                              <div className="box-header with-border">
                                <h3 className="box-title">
                                    List Placement Not Belong To {share.name}</h3>
                              </div>
                              {/* /.box-header */}
                              <div className="box-body">
                                <ListPlacementNotBelongToShare
                                  list={this.props.placements.list && share.placements &&
                                    this.filterPlmNotIn(
                                      this.props.placements.list,
                                      share.placements,
                                    )}
                                  listPlacementNotBelongShare={share.placements}
                                  getZone={this.props.getZone}
                                  zoneId={this.props.zoneId}
                                  shareId={share.id}
                                  getPlacements={this.props.getPlacements}
                                  setCurrentShare={this.props.setCurrentShare}
                                  updateShare={this.props.updateShare}
                                  share={share}
                                />
                              </div>
                              {/* /.box-body */}
                            </div>
                            {/* /.box */}
                          </div>

                          <div className="col-lg-6">
                            {/* BOX: LIST OF Placements */}
                            <div className="box">
                              <div className="box-header with-border">
                                <h3 className="box-title">List placements of {share.name}</h3>
                              </div>
                              {/* /.box-header */}
                              <div className="box-body">
                                <ListPlacementOfShare
                                  list={share.placements}
                                  getPlacements={this.props.getPlacements}
                                  getZone={this.props.getZone}
                                  zoneId={this.props.zoneId}
                                  shareId={share.id}
                                  share={share}
                                  updateShare={this.props.updateShare}
                                  setCurrentShare={this.props.setCurrentShare}
                                />
                              </div>
                              {/* /.box-body */}
                            </div>
                            {/* /.box */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="tab-pane" id="apiData">
                    <p>API Data</p>
                  </div>

                  <div className="tab-pane" id="adsCode">
                    <AdsCode zone={this.props.zones.editing} />
                  </div>
                  <div className="tab-pane" id="activity">
                    <div className="row">
                      <section className="col-lg-12">
                        <Activities
                          activities={this.props.activities && this.props.activities.list}
                          updateZone={this.props.updateZone}
                          setPageZoneActiveTab={this.props.setPageZoneActiveTab}
                          createActivity={this.props.createActivity}
                          zone={this.props.zones && this.props.zones.editing}
                          user={this.props.user}
                        />
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

const mapState = state => ({
  page: state.page.zones,
  zones: state.zones,
  sites: state.sites,
  placements: state.placements,
  campaigns: state.campaigns,
  shares: state.shares,
  zoneTypes: state.zoneTypes,
  zoneSizeTypes: state.zoneSizeTypes,
  characterSets: state.characterSets,
  user: state.user,
  activities: state.activities,
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
  getPlacement,
  setPageZoneActiveTab,
  setCurrentShare,
  setStatusShareFormEdit,
  setStatusShareFormCreate,
  getZoneTypes,
  getZoneSizeTypes,
  getCharacterSets,
  getActivitiesBySubjectId,
  createActivity,
};

export default withStyles(s)(connect(mapState, mapDispatch)(Zone));
