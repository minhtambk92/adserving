/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  getBanners,
  createBanner,
  getBannersFilters,
  setBannersFilters,
} from '../../../actions/banners';
import { getPlacements } from '../../../actions/placements';
import { getChannels } from '../../../actions/channels';
import { setPageBannerActiveTab } from '../../../actions/pages/banners';
import { createTrack } from '../../../actions/tracks';
import { getBannerHtmlTypes } from '../../../actions/bannerHtmlTypes';
import { getBannerTypes } from '../../../actions/bannerTypes';
import { getAdsServers } from '../../../actions/adsServers';
import BannerList from './BannerList';
import CreateBannerForm from './CreateBannerForm';
import FilterBannersForm from './FilterBannersForm';
import s from './Banners.css';

class Banners extends Component {

  static propTypes = {
    getBannersFilters: PropTypes.func,
    setBannersFilters: PropTypes.func,
    banners: PropTypes.object,
    getBanners: PropTypes.func,
    createBanner: PropTypes.func,
    placements: PropTypes.object,
    getPlacements: PropTypes.func,
    getChannels: PropTypes.func,
    channels: PropTypes.object,
    setPageBannerActiveTab: PropTypes.func,
    tracks: PropTypes.object,
    createTrack: PropTypes.func,
    getBannerHtmlTypes: PropTypes.func,
    bannerHtmlTypes: PropTypes.object,
    getBannerTypes: PropTypes.func,
    bannerTypes: PropTypes.object,
    getAdsServers: PropTypes.func,
    adsServers: PropTypes.object,
  };

  componentWillMount() {
    this.props.getBannersFilters();
    this.props.getBanners();
    this.props.getPlacements();
    this.props.getChannels();
    this.props.getBannerHtmlTypes();
    this.props.getBannerTypes();
    this.props.getAdsServers();
  }

  getFilteredBanners() {
    return _.filter(this.props.banners.list, banner => this.isFiltered(banner));
  }

  isFiltered(banner) {
    const { placementId, status } = this.props.banners.filters;

    const notMatchPlacement = (
      placementId !== undefined &&
      typeof banner.placements === 'object' &&
      JSON.stringify(banner.placements).indexOf(placementId) === -1
    );

    const notMatchStatus = (
      status !== undefined && status !== banner.status
    );

    return !(notMatchPlacement || notMatchStatus);
  }

  render() {
    return (
      <div>

        <div className="row">
          <section className="col-lg-12">
            {/* BOX: FILTER */}
            <div className="box box-default">
              <div className="box-header with-border">
                <h3 className="box-title">Filter by:</h3>
                <div className="box-tools pull-right">
                  <button type="button" className="btn btn-box-tool" data-widget="collapse">
                    <i className="fa fa-minus" />
                  </button>
                </div>
              </div>
              {/* /.box-header */}
              <FilterBannersForm
                placements={this.props.placements.list}
                filters={this.props.banners.filters}
                setBannersFilters={this.props.setBannersFilters}
              />
            </div>
            {/* /.col */}
          </section>
        </div>

        <div className="row">
          <section className="col-lg-12">
            {/* BOX: FORM OF ADD NEW WEB BANNER */}
            <div className="box collapsed-box">
              <div className="box-header with-border">
                <h3 className="box-title">Create a new Banner</h3>
                <div className="box-tools pull-right">
                  <button type="button" className="btn btn-box-tool" data-widget="collapse">
                    <i className="fa fa-plus" />
                  </button>
                </div>
              </div>
              {/* /.box-header */}
              {/* form start */}
              <CreateBannerForm
                filters={this.props.banners.filters}
                bannerHtmlTypeList={this.props.bannerHtmlTypes.list}
                createBanner={this.props.createBanner}
                channels={this.props.channels.list}
                bannerTypes={this.props.bannerTypes}
                bannerTypeList={this.props.bannerTypes && this.props.bannerTypes.list}
                getBannerTypes={this.props.getBannerTypes}
                adsServerList={this.props.adsServers && this.props.adsServers.list}
              />
            </div>
            {/* /.col */}
          </section>
        </div>

        <div className="row">
          <section className="col-lg-12">
            {/* BOX: LIST OF BannerS */}
            <div className="box box-info">
              <div className="box-header with-border">
                <h3 className="box-title">List Banner</h3>
              </div>
              {/* /.box-header */}
              <div className="box-body">
                <BannerList
                  list={this.getFilteredBanners()}
                  setPageBannerActiveTab={this.props.setPageBannerActiveTab}
                  createBanner={this.props.createBanner}
                  banners={this.props.banners}
                  tracks={this.props.tracks}
                  createTrack={this.props.createTrack}
                />
              </div>
              {/* /.box-body */}
            </div>
            {/* /.box */}
          </section>
          {/* /.col */}
        </div>

      </div>
    );
  }

}

const mapState = (state) => ({
  banners: state.banners,
  placements: state.placements,
  channels: state.channels,
  tracks: state.tracks,
  bannerHtmlTypes: state.bannerHtmlTypes,
  bannerTypes: state.bannerTypes,
  adsServers: state.adsServers,
});

const mapDispatch = {
  getBanners,
  createBanner,
  getBannersFilters,
  setBannersFilters,
  getPlacements,
  getChannels,
  setPageBannerActiveTab,
  createTrack,
  getBannerHtmlTypes,
  getBannerTypes,
  getAdsServers,
};

export default withStyles(s)(connect(mapState, mapDispatch)(Banners));

