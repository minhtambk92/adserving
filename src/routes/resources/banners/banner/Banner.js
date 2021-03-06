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
import style from 'react-dropzone-component/styles/filepicker.css';
import dropZoneStyle from 'dropzone/dist/min/dropzone.min.css';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { getBanner, updateBanner, deleteBanner } from '../../../../actions/banner/banners';
import { getBannerTypes } from '../../../../actions/bannerType/bannerTypes';
import { getCampaigns } from '../../../../actions/campaign/campaigns';
import { createPlacement, getPlacements } from '../../../../actions/placement/placements';
import { getBannerHtmlTypes } from '../../../../actions/bannerHtmlType/bannerHtmlTypes';
import { getAdsServers } from '../../../../actions/adsServer/adsServers';
import { getChannels } from '../../../../actions/channel/channels';
import {
  createTrack,
  deleteTrack,
  updateTrack,
} from '../../../../actions/track/tracks';
import { createActivity, getActivitiesBySubjectId } from '../../../../actions/activity/activities';
import { setPageBannerActiveTab } from '../../../../actions/pages/banners';
import Layout from '../../../../components/Layout';
import ListPlacementNotBelongBanner from '../ListPlacementNotBelongBanner';
import ListPlacementOfBanner from '../ListPlacementOfBanner';
import UpdateBannerForm from '../UpdateBannerForm';
import CreatePlacementInBanner from '../../placements/CreatePlacementForm';
import OptionBannerForm from '../OptionBannerForm';
import Activities from '../Activities';
import s from './Banner.css'; // eslint-disable-line css-modules/no-unused-class
// import { defineMessages, FormattedRelative } from 'react-intl';

const pageTitle = 'Banner';

class Banner extends Component {

  static propTypes = {
    bannerId: PropTypes.string.isRequired,
    page: PropTypes.object,
    banners: PropTypes.object,
    getBanner: PropTypes.func,
    updateBanner: PropTypes.func,
    deleteBanner: PropTypes.func,
    campaigns: PropTypes.object,
    getCampaigns: PropTypes.func,
    createPlacement: PropTypes.func,
    placements: PropTypes.object,
    getPlacements: PropTypes.func,
    getChannels: PropTypes.func,
    channels: PropTypes.object,
    createTrack: PropTypes.func,
    deleteTrack: PropTypes.func,
    updateTrack: PropTypes.func,
    getBannerHtmlTypes: PropTypes.func,
    bannerHtmlTypes: PropTypes.object,
    getBannerTypes: PropTypes.func,
    bannerTypes: PropTypes.object,
    getAdsServers: PropTypes.func,
    adsServers: PropTypes.object,
    createActivity: PropTypes.func,
    activities: PropTypes.object,
    user: PropTypes.object,
    getActivitiesBySubjectId: PropTypes.func,
    setPageBannerActiveTab: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      createPlacement: false,
      arrPlacement: [],
    };
  }

  componentWillMount() {
    this.props.getBanner(this.props.bannerId);
    this.props.getCampaigns();
    this.props.getPlacements();
    this.props.getChannels();
    this.props.getBannerHtmlTypes();
    this.props.getBannerTypes();
    this.props.getAdsServers();
    this.props.getActivitiesBySubjectId(this.props.bannerId);
  }

  componentDidMount() {
    // Set latest active tab
    $('.banner-edit-box ul li').removeClass('active');
    $(`a[href="#${this.props.page.activeTab}"]`).trigger('click');
  }

  componentWillReceiveProps(nextProps) {
    const {
      placements,
    } = nextProps.banners && (nextProps.banners.editing || {});
    if (placements && placements.length > 0) {
      if (placements[0].id !== undefined) {
        this.setState({ arrPlacement: placements });
      } else if (placements[0].id === undefined) {
        const arr = JSON.parse(placements);
        _.remove(arr, {
          isDeleted: true,
        });
        this.setState({ arrPlacement: arr });
      }
    } else if (placements && placements.length === 0) {
      this.setState({ arrPlacement: [] });
    }
  }

  componentDidUpdate() {
    // Set latest active tab
    $('.banner-edit-box ul li').removeClass('active');
    $(`a[href="#${this.props.page.activeTab}"]`).trigger('click');
  }

  onTabClick(event) {
    event.persist();
    this.props.setPageBannerActiveTab(event.target.getAttribute('data-id'));
    if (event.target.getAttribute('data-id') === 'activity') {
      this.props.getActivitiesBySubjectId(this.props.bannerId);
    }
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

  createPlacementInBanner() {
    this.setState({ createPlacement: true });
  }

  hideCreatePlacement() {
    this.setState({ createPlacement: false });
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
              <div className="nav-tabs-custom banner-edit-box">
                <ul className="nav nav-tabs">
                  <li className="active">
                    <a href="#editBanner" data-toggle="tab" data-id="editBanner" onClick={event => this.onTabClick(event)}>Edit Banner</a>
                  </li>
                  <li>
                    <a href="#optionBanner" data-toggle="tab" data-id="optionBanner" onClick={event => this.onTabClick(event)}>Option Banner</a>
                  </li>
                  <li>
                    <a href="#addPlacement" data-toggle="tab" data-id="addPlacement" onClick={event => this.onTabClick(event)}>Add Placement</a>
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
                  {/* /#EditBanner */}
                  <div className="tab-pane active" id="editBanner">
                    <UpdateBannerForm
                      banner={this.props.banners.editing}
                      updateBanner={this.props.updateBanner}
                      deleteBanner={this.props.deleteBanner}
                      bannerId={this.props.bannerId}
                      bannerHtmlTypeList={this.props.bannerHtmlTypes &&
                      this.props.bannerHtmlTypes.list}
                      bannerTypes={this.props.bannerTypes}
                      bannerTypeList={this.props.bannerTypes && this.props.bannerTypes.list}
                      getBanner={this.props.getBanner}
                      channels={this.props.channels.list}
                      adsServerList={this.props.adsServers && this.props.adsServers.list}
                      createActivity={this.props.createActivity}
                      user={this.props.user}
                    />
                  </div>

                  {/* /#OptionBanner */}
                  <div className="tab-pane" id="optionBanner">
                    <OptionBannerForm
                      banner={this.props.banners.editing}
                      updateBanner={this.props.updateBanner}
                      bannerId={this.props.bannerId}
                      getBanner={this.props.getBanner}
                      channels={this.props.channels.list}
                      createTrack={this.props.createTrack}
                      deleteTrack={this.props.deleteTrack}
                      updateTrack={this.props.updateTrack}
                      createActivity={this.props.createActivity}
                      user={this.props.user}
                    />
                  </div>

                  {/* /#addPlacement */}
                  <div className="tab-pane" id="addPlacement">
                    <div className="row">
                      <section className="col-lg-6">
                        {/* BOX: LIST OF Placements */}
                        <div className="box">
                          <div className="box-header with-border">
                            <h3 className="box-title">List Placement</h3>
                          </div>
                          {/* /.box-header */}
                          <div className="box-body">
                            <ListPlacementNotBelongBanner
                              list={this.props.placements.list &&
                              this.props.banners.editing &&
                              this.props.banners.editing.placements &&
                              this.filterPlmNotIn(
                                this.props.placements.list,
                                this.props.banners.editing.placements,
                              )}
                              banner={this.props.banners && this.props.banners.editing}
                              updateBanner={this.props.updateBanner}
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
                        <div className="box">
                          <div className="box-header with-border">
                            <h3 className="box-title">
                              {this.props.banners.editing ?
                              this.props.banners.editing.name : '...'} Belong To Placements
                            </h3>
                          </div>
                          {/* /.box-header */}
                          <div className="box-body">
                            <ListPlacementOfBanner
                              list={this.state.arrPlacement}
                              getPlacements={this.props.getPlacements}
                              getBanner={this.props.getBanner}
                              bannerId={this.props.bannerId}
                              banner={this.props.banners && this.props.banners.editing}
                              updateBanner={this.props.updateBanner}
                            />
                          </div>
                          {/* /.box-body */}
                        </div>
                        {/* /.box */}
                      </section>
                    </div>

                    <div className="row">
                      {this.state.createPlacement === false ? (
                        <div className="col-sm-6">
                          <button
                            type="button"
                            id="createBannerInPlacement"
                            onClick={event => this.createPlacementInBanner(event)}
                            className="btn btn-primary"
                          >
                            Create Placement
                          </button>
                        </div>
                      ) : (<div className="col-lg-12">
                        {/* BOX: CREATE */}
                        <div className="box">
                          <div className="box-header with-border">
                            <h3 className="box-title">Add New Placement</h3>
                            <div className="box-tools pull-right">
                              <button
                                type="button" className="btn btn-box-tool"
                                onClick={event => this.hideCreatePlacement(event)}
                              ><i className="fa fa-remove" /></button>
                            </div>
                          </div>
                          {/* /.box-header */}
                          {/* form start */}
                          <CreatePlacementInBanner
                            createPlacement={this.props.createPlacement}
                            bannerId={this.props.bannerId}
                            campaigns={this.props.campaigns && this.props.campaigns.list}
                            getPlacements={this.props.getPlacements}
                            banner={this.props.banners && this.props.banners.editing}
                            placements={this.props.placements && this.props.placements.list}
                            updateBanner={this.props.updateBanner}
                            getBanner={this.props.getBanner}
                            createActivity={this.props.createActivity}
                            user={this.props.user}
                          />
                        </div>
                        {/* /.col */}
                      </div>)}
                    </div>
                  </div>

                  {/* /#Activity */}
                  <div className="tab-pane" id="activity">
                    <div className="row">
                      <section className="col-lg-12">
                        <Activities
                          activities={this.props.activities && this.props.activities.list}
                          setPageBannerActiveTab={this.props.setPageBannerActiveTab}
                          createActivity={this.props.createActivity}
                          user={this.props.user}
                          banner={this.props.banners.editing}
                          updateBanner={this.props.updateBanner}
                          bannerId={this.props.bannerId}
                          getBanner={this.props.getBanner}
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
  page: state.page.banners,
  banners: state.banners,
  campaigns: state.campaigns,
  placements: state.placements,
  channels: state.channels,
  tracks: state.tracks,
  bannerHtmlTypes: state.bannerHtmlTypes,
  bannerTypes: state.bannerTypes,
  adsServers: state.adsServers,
  activities: state.activities,
  user: state.user,
});

const mapDispatch = {
  getBanner,
  updateBanner,
  deleteBanner,
  getCampaigns,
  createPlacement,
  getPlacements,
  getChannels,
  createTrack,
  deleteTrack,
  updateTrack,
  getBannerHtmlTypes,
  getBannerTypes,
  getAdsServers,
  createActivity,
  getActivitiesBySubjectId,
  setPageBannerActiveTab,
};

export default withStyles(s, style, dropZoneStyle)(connect(mapState, mapDispatch)(Banner));
