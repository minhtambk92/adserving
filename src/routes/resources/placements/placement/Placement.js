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
import { getPlacement, updatePlacement, deletePlacement } from '../../../../actions/placements';
import { getCampaigns } from '../../../../actions/campaigns';
import { getBanners, updateBanner, createBanner } from '../../../../actions/banners';
import { getChannels } from '../../../../actions/channels';
import { createTrack } from '../../../../actions/tracks';
import { getBannerHtmlTypes } from '../../../../actions/bannerHtmlTypes';
import { getBannerTypes } from '../../../../actions/bannerTypes';
import { getAdsServers } from '../../../../actions/adsServers';
import { createActivity, getActivitiesBySubjectId } from '../../../../actions/activities';
import { setPagePlacementActiveTab } from '../../../../actions/pages/placements';
import Layout from '../../../../components/Layout';
import ListBannerNotBelongPlacement from '../ListBannerNotBelongPlacement';
import ListBannerOfPlacement from '../ListBannerOfPlacement';
import UpdatePlacementForm from '../UpdatePlacementForm';
import Activities from '../Activities';
import CreateBannerForm from '../../banners/CreateBannerForm';
import s from './Placement.css';

const pageTitle = 'Placement';

class Placement extends Component {

  static propTypes = {
    placementId: PropTypes.string.isRequired,
    page: PropTypes.object,
    placements: PropTypes.object,
    campaigns: PropTypes.object,
    getPlacement: PropTypes.func,
    updatePlacement: PropTypes.func,
    deletePlacement: PropTypes.func,
    getCampaigns: PropTypes.func,
    banners: PropTypes.object,
    getBanners: PropTypes.func,
    createBanner: PropTypes.func,
    getChannels: PropTypes.func,
    channels: PropTypes.object,
    createZone: PropTypes.func,
    createTrack: PropTypes.func,
    getBannerHtmlTypes: PropTypes.func,
    bannerHtmlTypes: PropTypes.object,
    getBannerTypes: PropTypes.func,
    bannerTypes: PropTypes.object,
    getAdsServers: PropTypes.func,
    adsServers: PropTypes.object,
    updateBanner: PropTypes.func,
    activities: PropTypes.object,
    user: PropTypes.object,
    getActivitiesBySubjectId: PropTypes.func,
    createActivity: PropTypes.func,
    setPagePlacementActiveTab: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      createBanner: false,
      arrBanner: [],
    };
  }

  componentWillMount() {
    this.props.getPlacement(this.props.placementId);
    this.props.getCampaigns();
    this.props.getBanners();
    this.props.getChannels();
    this.props.getBannerHtmlTypes();
    this.props.getBannerTypes();
    this.props.getAdsServers();
    this.props.getActivitiesBySubjectId(this.props.placementId);
  }

  componentDidMount() {
    // Set latest active tab
    $('.placement-edit-box ul li').removeClass('active');
    $(`a[href="#${this.props.page.activeTab}"]`).trigger('click');
  }

  componentWillReceiveProps(nextProps) {
    const {
      banners,
    } = nextProps.placements && (nextProps.placements.editing || {});
    if (banners && banners.length > 0) {
      if (banners[0].id !== undefined) {
        this.setState({ arrBanner: banners });
      } else if (banners[0].id === undefined) {
        const arr = JSON.parse(banners);
        _.remove(arr, {
          isDeleted: true,
        });
        this.setState({ arrBanner: arr });
      }
    } else if (banners && banners.length === 0) {
      this.setState({ arrBanner: [] });
    }
  }

  componentDidUpdate() {
    // Set latest active tab
    $('.placement-edit-box ul li').removeClass('active');
    $(`a[href="#${this.props.page.activeTab}"]`).trigger('click');
  }

  onTabClick(event) {
    event.persist();
    this.props.setPagePlacementActiveTab(event.target.getAttribute('data-id'));
    if (event.target.getAttribute('data-id') === 'activity') {
      this.props.getActivitiesBySubjectId(this.props.placementId);
    }
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

  createBannerInPlacement() {
    this.setState({ createBanner: true });
  }

  hideCreateBanner() {
    this.setState({ createBanner: false });
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
              <div className="nav-tabs-custom placement-edit-box">
                <ul className="nav nav-tabs">
                  <li className="active">
                    <a
                      href="#editPlacement" data-toggle="tab" data-id="editPlacement"
                      onClick={event => this.onTabClick(event)}
                    >Edit Placement</a>
                  </li>
                  <li>
                    <a
                      href="#addBanner" data-toggle="tab" data-id="addBanner"
                      onClick={event => this.onTabClick(event)}
                    >Add Banner</a>
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
                  <div className="active tab-pane" id="editPlacement">
                    <UpdatePlacementForm
                      placement={this.props.placements && this.props.placements.editing}
                      updatePlacement={this.props.updatePlacement}
                      deletePlacement={this.props.deletePlacement}
                      placementId={this.props.placementId}
                      getPlacement={this.props.getPlacement}
                      campaigns={this.props.campaigns && this.props.campaigns.list}
                      user={this.props.user}
                      createActivity={this.props.createActivity}
                    />
                  </div>

                  <div className="tab-pane" id="addBanner">
                    <div className="row">
                      <div className="col-lg-6">
                        {/* BOX: LIST OF Placements */}
                        <div className="box">
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
                              getPlacement={this.props.getPlacement}
                              getBanners={this.props.getBanners}
                              updatePlacement={this.props.updatePlacement}
                              placementId={this.props.placementId}
                              placement={this.props.placements && this.props.placements.editing}
                              createActivity={this.props.createActivity}
                              user={this.props.user}
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
                            <h3 className="box-title">List Banner Of {
                              this.props.placements.editing ?
                                this.props.placements.editing.name : '...'
                            }
                            </h3>
                          </div>
                          {/* /.box-header */}
                          <div className="box-body">
                            <ListBannerOfPlacement
                              list={this.state.arrBanner}
                              getPlacement={this.props.getPlacement}
                              getBanners={this.props.getBanners}
                              placementId={this.props.placementId}
                              createBanner={this.props.createBanner}
                              channels={this.props.channels && this.props.channels.list}
                              banners={this.props.banners}
                              createTrack={this.props.createTrack}
                              updatePlacement={this.props.updatePlacement}
                              placement={this.props.placements && this.props.placements.editing}
                              updateBanner={this.props.updateBanner}
                            />
                          </div>
                          {/* /.box-body */}
                        </div>
                        {/* /.box */}
                      </div>
                    </div>

                    <div className="row">
                      {this.state.createBanner === false ? (
                        <div className="col-sm-6">
                          <button
                            type="button"
                            id="createBannerInPlacement"
                            onClick={event => this.createBannerInPlacement(event)}
                            className="btn btn-primary"
                          >
                              Create Banner
                            </button>
                        </div>
                        ) : (
                          <div className="col-lg-12">
                            <div className="box">
                              <div className="box-header with-border">
                                <h3 className="box-title">Add new banner</h3>
                                <div className="box-tools pull-right">
                                  <button
                                    type="button"
                                    className="btn btn-box-tool"
                                    onClick={event => this.hideCreateBanner(event)}
                                  >
                                    <i className="fa fa-remove" />
                                  </button>
                                </div>
                              </div>
                              {/* /.box-header */}
                              <div className="box-body">
                                <CreateBannerForm
                                  createBanner={this.props.createBanner}
                                  channels={this.props.channels.list}
                                  placementId={this.props.placementId}
                                  getPlacement={this.props.getPlacement}
                                  placement={this.props.placements && this.props.placements.editing}
                                  updatePlacement={this.props.updatePlacement}
                                  banners={this.props.banners.list}
                                  getBanners={this.props.getBanners}
                                  bannerHtmlTypeList={this.props.bannerHtmlTypes.list}
                                  bannerTypeList={this.props.bannerTypes &&
                                  this.props.bannerTypes.list}
                                  getBannerTypes={this.props.getBannerTypes}
                                  adsServerList={this.props.adsServers &&
                                  this.props.adsServers.list}
                                  user={this.props.user}
                                  createActivity={this.props.createActivity}
                                />
                              </div>
                              {/* /.box-body */}
                            </div>
                          </div>
                        )}
                    </div>
                  </div>
                  <div className="tab-pane" id="activity">
                    <div className="row">
                      <section className="col-lg-12">
                        <Activities
                          activities={this.props.activities && this.props.activities.list}
                          updatePlacement={this.props.updatePlacement}
                          setPagePlacementActiveTab={this.props.setPagePlacementActiveTab}
                          createActivity={this.props.createActivity}
                          placement={this.props.placements && this.props.placements.editing}
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
  page: state.page.placements,
  placements: state.placements,
  campaigns: state.campaigns,
  banners: state.banners,
  zones: state.zones,
  channels: state.channels,
  sites: state.sites,
  bannerHtmlTypes: state.bannerHtmlTypes,
  bannerTypes: state.bannerTypes,
  adsServers: state.adsServers,
  user: state.user,
  activities: state.activities,
});

const mapDispatch = {
  getPlacement,
  updatePlacement,
  deletePlacement,
  getCampaigns,
  getBanners,
  createBanner,
  getChannels,
  createTrack,
  getBannerHtmlTypes,
  getBannerTypes,
  getAdsServers,
  updateBanner,
  createActivity,
  getActivitiesBySubjectId,
  setPagePlacementActiveTab,
};

export default withStyles(s)(connect(mapState, mapDispatch)(Placement));
