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
// import { FormattedRelative } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { getSites } from '../../../actions/sites';
import {
  getZones,
  createZone,
  getZonesFilters,
  setZonesFilters,
} from '../../../actions/zones';
import { setPageZoneActiveTab } from '../../../actions/pages/zones';
import { createShare, getShareByZoneId } from '../../../actions/shares';
import Layout from '../../../components/Layout';
import CreateZoneForm from './CreateZoneForm';
import FilterZonesForm from './FilterZonesForm';
import ZoneList from './ZoneList';
import s from './Zones.css';

const pageTitle = 'Zone Management';
const pageSubTitle = 'Control panel';

class Zones extends Component {

  static propTypes = {
    getZonesFilters: PropTypes.func,
    setZonesFilters: PropTypes.func,
    sites: PropTypes.object,
    getSites: PropTypes.func,
    zones: PropTypes.object,
    getZones: PropTypes.func,
    createZone: PropTypes.func,
    setPageZoneActiveTab: PropTypes.func,
    createShare: PropTypes.func,
    getShareByZoneId: PropTypes.func,
    shares: PropTypes.object,
  };

  componentWillMount() {
    this.props.getSites();
    this.props.getZonesFilters();
    this.props.getZones();
  }

  getFilteredZones() {
    return _.filter(this.props.zones.list, zone => this.isFiltered(zone));
  }

  isFiltered(zone) {
    const { status, siteId, type } = this.props.zones.filters;

    const notMatchStatus = (
      status !== undefined && status !== zone.status
    );
    const notMatchSite = (
      siteId !== undefined && siteId !== zone.siteId
    );
    const notMatchType = (
      type !== undefined && type !== zone.type
    );

    return !(notMatchStatus || notMatchSite || notMatchType);
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
                <FilterZonesForm
                  sites={this.props.sites.list}
                  filters={this.props.zones.filters}
                  setZonesFilters={this.props.setZonesFilters}
                />
              </div>
              {/* /.col */}
            </section>
          </div>

          <div className="row">
            <section className="col-lg-12">
              {/* BOX: FORM OF CREATE A NEW ZONE */}
              <div className="box box-default collapsed-box">
                <div className="box-header with-border">
                  <h3 className="box-title">Create a new zone</h3>
                  <div className="box-tools pull-right">
                    <button type="button" className="btn btn-box-tool" data-widget="collapse">
                      <i className="fa fa-plus" />
                    </button>
                  </div>
                </div>
                {/* /.box-header */}
                {/* form start */}
                <CreateZoneForm
                  filters={this.props.zones.filters}
                  sites={this.props.sites.list}
                  createShare={this.props.createShare}
                  createZone={this.props.createZone}
                  zones={this.props.zones && this.props.zones.list}
                  getZones={this.props.getZones}
                />
              </div>
              {/* /.col */}
            </section>
          </div>

          <div className="row">
            <section className="col-lg-12">
              {/* BOX: LIST OF ZONES */}
              <div className="box box-info">
                <div className="box-header with-border">
                  <h3 className="box-title">List of zones</h3>
                </div>
                {/* /.box-header */}
                <div className="box-body">
                  <ZoneList
                    list={this.getFilteredZones()}
                    setPageZoneActiveTab={this.props.setPageZoneActiveTab}
                    createZone={this.props.createZone}
                    createShare={this.props.createShare}
                    zones={this.props.zones}
                    shares={this.props.shares}
                    getShareByZoneId={this.props.getShareByZoneId}
                  />
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
  sites: state.sites,
  zones: state.zones,
  shares: state.shares,
});

const mapDispatch = {
  getZonesFilters,
  setZonesFilters,
  getSites,
  getZones,
  createZone,
  setPageZoneActiveTab,
  createShare,
  getShareByZoneId,
};

export default withStyles(s)(connect(mapState, mapDispatch)(Zones));
