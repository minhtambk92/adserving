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
                  <li className="active">
                    <a href="#editBanner" data-toggle="tab">
                      Edit Banner
                    </a>
                  </li>
                  <li>
                    <a href="#addPlacement" data-toggle="tab">
                      Add Placement
                    </a>
                  </li>
                </ul>
                <div className="tab-content">
                  <div className="active tab-pane" id="editBanner">
                    <div className="row">
                      <section className="col-lg-12">
                        {/* BOX: FORM OF CREATE NEW WEBSITE */}
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
                          {/* /.box-header */}
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
                        {/* /.col */}
                      </section>
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
