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
import style from 'react-dropzone-component/styles/filepicker.css';
import dropZoneStyle from 'dropzone/dist/min/dropzone.min.css';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { getBanner, updateBanner, deleteBanner } from '../../../../actions/banners';
import { getCampaigns } from '../../../../actions/campaigns';
import { createPlacement, getPlacements } from '../../../../actions/placements';
import { getChannels } from '../../../../actions/channels';
import {
  createPlacementBanner,
  removeBanner,
  removeBannerInPlacementBanner,
} from '../../../../actions/placementBanners';
import {
  createClickImpression,
  deleteClickImpression,
  updateClickImpression,
} from '../../../../actions/clickImpressions';
import Layout from '../../../../components/Layout';
import ListPlacementNotBelongBanner from '../ListPlacementNotBelongBanner';
import ListPlacementOfBanner from '../ListPlacementOfBanner';
import UpdateBannerForm from '../UpdateBannerForm';
import CreatePlacementInBanner from '../../placements/CreatePlacementForm';
import OptionBannerForm from '../OptionBannerForm';
import s from './Banner.css';
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
    createPlacementBanner: PropTypes.func,
    getPlacements: PropTypes.func,
    placementBanners: PropTypes.object,
    removeBanner: PropTypes.func,
    getChannels: PropTypes.func,
    channels: PropTypes.object,
    removeBannerInPlacementBanner: PropTypes.func,
    createClickImpression: PropTypes.func,
    deleteClickImpression: PropTypes.func,
    updateClickImpression: PropTypes.func,

  };

  componentWillMount() {
    this.props.getBanner(this.props.bannerId);
    this.props.getCampaigns();
    this.props.getPlacements();
    this.props.getChannels();
  }

  componentDidMount() {
    // Set latest active tab
    $('.banner-edit-box ul li').removeClass('active');
    $(`a[href="#${this.props.page.activeTab}"]`).trigger('click');
  }

  filterPlmNotIn(allPlacement, pob) { // eslint-disable-line no-unused-vars, class-methods-use-this
    const arrPlacement = allPlacement;
    for (let i = 0, len = pob.length; i < len; i += 1) {
      for (let j = 0, len2 = arrPlacement.length; j < len2; j += 1) {
        if (pob[i].id === arrPlacement[j].id) {
          arrPlacement.splice(j, 1);
          len2 = arrPlacement.length;
        }
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
                    <a href="#editBanner" data-toggle="tab">
                      Edit Banner
                    </a>
                  </li>
                  <li>
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
                  <div className="tab-pane active" id="editBanner">
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
                  <div className="tab-pane" id="optionBanner">
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
                          <OptionBannerForm
                            banner={this.props.banners && this.props.banners.editing}
                            updateBanner={this.props.updateBanner}
                            bannerId={this.props.bannerId}
                            getBanner={this.props.getBanner}
                            channels={this.props.channels && this.props.channels.list}
                            createClickImpression={this.props.createClickImpression}
                            deleteClickImpression={this.props.deleteClickImpression}
                            updateClickImpression={this.props.updateClickImpression}
                          />
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
                                  this.props.banners.editing.placements &&
                                  this.filterPlmNotIn(
                                    this.props.placements.list,
                                    this.props.banners.editing.placements,
                                  )}
                                  createPlacementBanner={this.props.createPlacementBanner}
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
                                  this.props.banners.editing.placements}
                                  /* eslint-disable max-len */
                                  removeBannerInPlacementBanner={this.props.removeBannerInPlacementBanner}
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
                                createPlacementBanner={this.props.createPlacementBanner}
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
  page: state.page.banners,
  banners: state.banners,
  campaigns: state.campaigns,
  placements: state.placements,
  channels: state.channels,
  clickImpressions: state.clickImpressions,
  placementBanners: state.placementBanners,
});

const mapDispatch = {
  getBanner,
  updateBanner,
  deleteBanner,
  getCampaigns,
  createPlacement,
  createPlacementBanner,
  getPlacements,
  removeBanner,
  removeBannerInPlacementBanner,
  getChannels,
  createClickImpression,
  deleteClickImpression,
  updateClickImpression,
};

export default withStyles(s, style, dropZoneStyle)(connect(mapState, mapDispatch)(Banner));
