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
import Layout from '../../../components/Layout';
import BannerList from './BannerList';
import CreateBannerForm from './CreateBannerForm';
import FilterBannersForm from './FilterBannersForm';
import s from './Banners.css';

const pageTitle = 'Home';
const pageSubTitle = 'Control panel';
class Banners extends Component {
  static propTypes = {
    getBannersFilters: PropTypes.func,
    setBannersFilters: PropTypes.func,
    banners: PropTypes.object,
    getBanners: PropTypes.func,
    createBanner: PropTypes.func,
    placements: PropTypes.object,
    getPlacements: PropTypes.func,
  };


  componentWillMount() {
    this.props.getBannersFilters();
    this.props.getBanners();
    this.props.getPlacements();
  }

  componentDidMount() {
    /* eslint-disable no-undef */
    // iCheck for checkbox and radio inputs
  }

  componentDidUpdate() {
    /* eslint-disable no-undef */
    /* eslint-enable no-undef */
  }

  async onFilterChange(event, field) {
    event.persist();

    await this.props.setBannersFilters({
      [field]: event.target.value,
    });
  }
  getFilteredBanners() {
    return _.filter(this.props.banners.list, banner => this.isFiltered(banner));
  }
  isFiltered(banner) {
    const { placementId, status } = this.props.banners.filters;

    const notMatchPlacement = (
      placementId !== undefined &&
      typeof banner.pbzBanner === 'object' &&
      JSON.stringify(banner.pbzBanner).indexOf(placementId) === -1
    );

    const notMatchStatus = (
      status !== undefined && status !== banner.status
    );

    return !(notMatchPlacement || notMatchStatus);
  }
  render() {
    return (
      <Layout pageTitle={pageTitle} pageSubTitle={pageSubTitle}>
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
                {/* form start */}
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
              {/* BOX: FORM OF CREATE NEW WEB BANNER */}
              <div className="box box-info collapsed-box">
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
                  createBanner={this.props.createBanner}
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
                  <BannerList list={this.getFilteredBanners()} />
                </div>
                {/* /.box-body */}
              </div>
              {/* /.box */}
            </section>
            {/* /.col */}
          </div>

        </div>
      </Layout>
    );
  }

}

const mapState = (state) => ({
  banners: state.banners,
  placements: state.placements,
});

const mapDispatch = {
  getBanners,
  createBanner,
  getBannersFilters,
  setBannersFilters,
  getPlacements,
};

export default withStyles(s)(connect(mapState, mapDispatch)(Banners));

