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
import _ from 'lodash';
import { connect } from 'react-redux';
// import { defineMessages, FormattedRelative } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { getPlacement, updatePlacement, deletePlacement } from '../../../../actions/placements';
import { getCampaigns } from '../../../../actions/campaigns';
import { getBanners, createBanner } from '../../../../actions/banners';
import { getChannels } from '../../../../actions/channels';
import {
  createPlacementBanner,
  removePlacement,
  removeBannerInPlacementBanner,
} from '../../../../actions/placementBanners';
import { removePlacementInSharePlacement } from '../../../../actions/sharePlacements';
import { createClickImpression } from '../../../../actions/clickImpressions';
import Layout from '../../../../components/Layout';
import ListBannerNotBelongPlacement from '../ListBannerNotBelongPlacement';
import ListBannerOfPlacement from '../ListBannerOfPlacement';
import UpdatePlacementForm from '../UpdatePlacementForm';
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
    placementBanners: PropTypes.object,
    createPlacementBanner: PropTypes.func,
    removePlacement: PropTypes.func,
    removeBannerInPlacementBanner: PropTypes.func,
    createBanner: PropTypes.func,
    getChannels: PropTypes.func,
    channels: PropTypes.object,
    createZone: PropTypes.func,
    removePlacementInSharePlacement: PropTypes.func,
    createClickImpression: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      createBanner: false,
    };
  }

  componentWillMount() {
    this.props.getPlacement(this.props.placementId);
    this.props.getCampaigns();
    this.props.getBanners();
    this.props.getChannels();
  }

  componentDidMount() {
    // Set latest active tab
    $('.placement-edit-box ul li').removeClass('active');
    $(`a[href="#${this.props.page.activeTab}"]`).trigger('click');
  }

  filterBanner(allBanner, bof) { // eslint-disable-line no-unused-vars, class-methods-use-this
    const arrBanner = allBanner;
    for (let i = 0, len = bof.length; i < len; i += 1) {
      for (let j = 0, len2 = arrBanner.length; j < len2; j += 1) {
        if (bof[i].id === arrBanner[j].id) {
          arrBanner.splice(j, 1);
          len2 = arrBanner.length;
        }
      }
    }
    return arrBanner;
  }

  createBannerInPlacement() {
    this.setState({ createBanner: true });
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
                    <a href="#editPlacement" data-toggle="tab">
                      Edit Placement
                    </a>
                  </li>
                  <li>
                    <a href="#addBanner" data-toggle="tab">
                      Add Banner
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
                              <button
                                type="button" className="btn btn-box-tool"
                                data-widget="collapse"
                              >
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
                            /* eslint-disable max-len */
                            removePlacementInSharePlacement={this.props.removePlacementInSharePlacement}
                            /* eslint-enable max-len */
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
                                  createPlacementBanner={this.props.createPlacementBanner}
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
                                    this.props.placements.editing.banners}
                                  /* eslint-disable max-len */
                                  removeBannerInPlacementBanner={this.props.removeBannerInPlacementBanner}
                                  /* eslint-enable max-len */
                                  getPlacement={this.props.getPlacement}
                                  getBanners={this.props.getBanners}
                                  placementId={this.props.placementId}
                                  createBanner={this.props.createBanner}
                                  channels={this.props.channels && this.props.channels.list}
                                  createPlacementBanner={this.props.createPlacementBanner}
                                  banners={this.props.banners}
                                  createClickImpression={this.props.createClickImpression}
                                />
                              </div>
                              {/* /.box-body */}
                            </div>
                            {/* /.box */}
                          </section>
                        </div>
                        <div className="row">
                          {this.state.createBanner === false ? (
                            <div className="form-group">
                              <div className="col-sm-2">
                                <button
                                  type="button"
                                  id="createBannerInPlacement"
                                  onClick={(event) => this.createBannerInPlacement(event)}
                                  className="btn btn-block btn-info btn-sm"
                                >
                                  Create Share
                                </button>
                              </div>
                              <div className="col-sm-10">
                                &nbsp;
                              </div>
                            </div>
                          ) : (
                            <div className="col-lg-12">
                              <CreateBannerForm
                                createBanner={this.props.createBanner}
                                channels={this.props.channels && this.props.channels.list}
                                placementId={this.props.placementId}
                                getPlacement={this.props.getPlacement}
                                banners={this.props.banners && this.props.banners.list}
                                getBanners={this.props.getBanners}
                                createPlacementBanner={this.props.createPlacementBanner}
                              />
                            </div>
                          )}
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
  page: state.page.placements,
  placements: state.placements,
  campaigns: state.campaigns,
  banners: state.banners,
  placementBanners: state.placementBanners,
  zones: state.zones,
  channels: state.channels,
  sites: state.sites,
  sharePlacements: state.sharePlacements,
});

const mapDispatch = {
  getPlacement,
  updatePlacement,
  deletePlacement,
  getCampaigns,
  getBanners,
  createPlacementBanner,
  removePlacement,
  removeBannerInPlacementBanner,
  createBanner,
  getChannels,
  removePlacementInSharePlacement,
  createClickImpression,
};

export default withStyles(s)(connect(mapState, mapDispatch)(Placement));
