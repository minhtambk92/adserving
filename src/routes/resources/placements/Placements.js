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
  getPlacements,
  createPlacement,
  getPlacementsFilters,
  setPlacementsFilters,
} from '../../../actions/placements';
import { getCampaigns } from '../../../actions/campaigns';
import { setPagePlacementActiveTab } from '../../../actions/pages/placements';
import Layout from '../../../components/Layout';
import PlacemenList from './PlacementList';
import CreatePlacementForm from './CreatePlacementForm';
import FilterPlacementForm from './FilterPlacementForm';
import s from './Placements.css';

const pageTitle = 'Placements';
const pageSubTitle = 'Control panel';

class Placements extends Component {

  static propTypes = {
    getPlacementsFilters: PropTypes.func,
    setPlacementsFilters: PropTypes.func,
    placements: PropTypes.object,
    getPlacements: PropTypes.func,
    createPlacement: PropTypes.func,
    campaigns: PropTypes.object,
    getCampaigns: PropTypes.func,
    setPagePlacementActiveTab: PropTypes.func,
  };

  componentWillMount() {
    this.props.getPlacements();
    this.props.getPlacementsFilters();
    this.props.getCampaigns();
  }

  getFilteredPlacements() {
    return _.filter(this.props.placements.list, placement => this.isFiltered(placement));
  }

  isFiltered(placement) {
    const filters = this.props.placements.filters;

    for (const criteria in filters) { // eslint-disable-line no-restricted-syntax
      if (
        !{}.hasOwnProperty.call(placement, criteria) ||
        filters[criteria] !== placement[criteria]
      ) {
        return false;
      }
    }

    return true;
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
                <FilterPlacementForm
                  campaigns={this.props.campaigns.list}
                  filters={this.props.placements.filters}
                  setPlacementsFilters={this.props.setPlacementsFilters}
                />
              </div>
              {/* /.col */}
            </section>
          </div>
          <div className="row">
            <section className="col-lg-12">
              {/* BOX: FORM OF CREATE NEW PlacementS */}
              <div className="box collapsed-box">
                <div className="box-header with-border">
                  <h3 className="box-title">Add New Placements</h3>
                  <div className="box-tools pull-right">
                    <button type="button" className="btn btn-box-tool" data-widget="collapse">
                      <i className="fa fa-plus" />
                    </button>
                  </div>
                </div>
                {/* /.box-header */}
                <CreatePlacementForm
                  filters={this.props.placements.filters}
                  campaigns={this.props.campaigns.list}
                  createPlacement={this.props.createPlacement}
                />
              </div>
              {/* /.col */}
            </section>
          </div>

          {/* Main row */}
          <div className="row">
            <section className="col-lg-12">
              {/* BOX: LIST OF Placements */}
              <div className="box box-info">
                <div className="box-header with-border">
                  <h3 className="box-title">List Placement</h3>
                </div>
                {/* /.box-header */}
                <div className="box-body">
                  <PlacemenList
                    list={this.getFilteredPlacements()}
                    setPagePlacementActiveTab={this.props.setPagePlacementActiveTab}
                    createPlacement={this.props.createPlacement}
                  />
                </div>
                {/* /.box-body */}
              </div>
              {/* /.box */}
            </section>
            {/* /.col */}
          </div>
          {/* /.row (main row) */}
        </div>
      </Layout>
    );
  }

}

const mapState = (state) => ({
  placements: state.placements,
  campaigns: state.campaigns,
});

const mapDispatch = {
  getPlacements,
  createPlacement,
  getCampaigns,
  getPlacementsFilters,
  setPlacementsFilters,
  setPagePlacementActiveTab,
};

export default withStyles(s)(connect(mapState, mapDispatch)(Placements));
