/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
// import { FormattedRelative } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { getSites } from '../../../actions/site/sites';
import {
  getZones,
  createZone,
  getZonesFilters,
  setZonesFilters,
} from '../../../actions/zone/zones';
import { setPageZoneActiveTab } from '../../../actions/pages/zones';
import { createShare } from '../../../actions/share/shares';
import { getZoneSizeTypes } from '../../../actions/zoneSizeType/zoneSizeTypes';
import { getZoneTypes } from '../../../actions/zoneType/zoneTypes';
import { createActivity } from '../../../actions/activity/activities';
import CreateZoneForm from './CreateZoneForm';
import FilterZonesForm from './FilterZonesForm';
import ZoneList from './ZoneList';
import BulkActions from './BulkActions';
import s from './Zones.css';

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
    shares: PropTypes.object,
    getZoneTypes: PropTypes.func,
    zoneTypes: PropTypes.object,
    getZoneSizeTypes: PropTypes.func,
    zoneSizeTypes: PropTypes.object,
    createActivity: PropTypes.func,
    activities: PropTypes.object,
    user: PropTypes.object,
  };

  componentWillMount() {
    this.props.getSites();
    this.props.getZonesFilters();
    this.props.getZones();
    this.props.getZoneTypes();
    this.props.getZoneSizeTypes();
  }

  getFilteredZones() {
    return _.filter(this.props.zones.list, zone => this.isFiltered(zone));
  }

  isFiltered(zone) {
    const { status, siteId, zoneTypeId } = this.props.zones.filters;

    const notMatchStatus = (
      status !== undefined && status !== zone.status
    );
    const notMatchSite = (
      siteId !== undefined && siteId !== zone.siteId
    );
    const notMatchType = (
      zoneTypeId !== undefined &&
      typeof zone.zoneType === 'object' &&
      JSON.stringify(zone.zoneType).indexOf(zoneTypeId) === -1
    );

    return !(notMatchStatus || notMatchSite || notMatchType);
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
              <FilterZonesForm
                sites={this.props.sites.list}
                filters={this.props.zones.filters}
                setZonesFilters={this.props.setZonesFilters}
                zoneTypes={this.props.zoneTypes && this.props.zoneTypes.list}
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
                zoneTypeList={this.props.zoneTypes && this.props.zoneTypes.list}
                zoneSizeTypeList={this.props.zoneSizeTypes && this.props.zoneSizeTypes.list}
                user={this.props.user}
                createActivity={this.props.createActivity}
              />
            </div>
            {/* /.col */}
          </section>
        </div>

        <div className="row">
          <section className="col-lg-12">
            <div className="nav-tabs-custom">
              <ul className="nav nav-tabs">
                <li className="active">
                  <a href="#zonesList" data-toggle="tab" aria-expanded="true">List</a>
                </li>
                <li className>
                  <a href="#zonesBulkActions" data-toggle="tab" aria-expanded="false">Bulk</a>
                </li>
              </ul>
              <div className="tab-content">
                <div className="tab-pane active" id="zonesList">
                  <ZoneList
                    list={this.getFilteredZones()}
                    setPageZoneActiveTab={this.props.setPageZoneActiveTab}
                    createZone={this.props.createZone}
                    createShare={this.props.createShare}
                    zones={this.props.zones}
                    shares={this.props.shares}
                    user={this.props.user}
                    createActivity={this.props.createActivity}
                  />
                </div>
                {/* /.tab-pane */}
                <div className="tab-pane" id="zonesBulkActions">
                  <BulkActions />
                </div>
                {/* /.tab-pane */}
              </div>
              {/* /.tab-content */}
            </div>
          </section>
          {/* /.col */}
        </div>

      </div>
    );
  }

}

const mapState = state => ({
  sites: state.sites,
  zones: state.zones,
  shares: state.shares,
  zoneTypes: state.zoneTypes,
  zoneSizeTypes: state.zoneSizeTypes,
  user: state.user,
  activities: state.activities,
});

const mapDispatch = {
  getZonesFilters,
  setZonesFilters,
  getSites,
  getZones,
  createZone,
  setPageZoneActiveTab,
  createShare,
  getZoneTypes,
  getZoneSizeTypes,
  createActivity,
};

export default withStyles(s)(connect(mapState, mapDispatch)(Zones));
