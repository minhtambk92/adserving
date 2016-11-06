/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
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
import { getPlacements } from '../../../actions/placements';
import Layout from '../../../components/Layout';
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
    placements: PropTypes.object,
    getPlacements: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      searchText: '',
      checkTypeZone: true,
    };
  }
  componentWillMount() {
    this.props.getSites();
    this.props.getZonesFilters();
    this.props.getPlacements();
    this.props.getZones();
  }

  componentDidMount() {
    /* eslint-disable no-undef */
    /* eslint-enable no-undef */
  }

  componentDidUpdate() {
    /* eslint-disable no-undef */
    /* eslint-enable no-undef */
  }

  onKeyDown(event) { // eslint-disable-line no-unused-vars, class-methods-use-this
    this.inputZoneSize.value = 'custom';
  }
  onSelectZoneType(event) { // eslint-disable-line no-unused-vars, class-methods-use-this
    const zoneType = this.inputZoneType.value;
    if (zoneType !== 'type-3') {
      event.persist();
      this.setState((previousState) => ({
        ...previousState,
        checkTypeZone: true,
      }));
    } else if (zoneType === 'type-3') {
      event.persist();
      this.setState((previousState) => ({
        ...previousState,
        checkTypeZone: false,
      }));
    }
  }
  onSelectSize(event) { // eslint-disable-line no-unused-vars, class-methods-use-this
    const sizeType = this.inputZoneSize.value;
    if (sizeType !== 'custom') {
      this.inputZoneHeight.value = sizeType.split('x')[1];
      this.inputZoneWidth.value = sizeType.split('x')[0];
    } else if (sizeType === 'custom') {
      this.inputZoneHeight.value = 0;
      this.inputZoneWidth.value = 0;
    }
  }
  async onFilterChange(event, field) {
    event.persist();

    await this.props.setZonesFilters({
      [field]: event.target.value,
    });
  }

  clearInput() {
    this.inputZoneName.value = null;
    this.inputZoneHTML.value = null;
    this.inputZoneCSS.value = null;
    this.inputZoneSlot.value = null;
    this.inputZoneDescription.value = null;
  }

  createZone() {
    const name = this.inputZoneName.value;
    const siteId = this.inputZoneSite.value;
    const type = this.inputZoneType.value;
    const html = this.inputZoneHTML.value;
    const css = this.inputZoneCSS.value;
    const slot = this.inputZoneSlot.value;
    let width = 0;
    let height = 0;
    let sizeText = '';
    let sizeValue = '';
    if (this.state.checkTypeZone === true && type !== 'type-3') {
      sizeValue = this.inputZoneSize.value;
      if (this.inputZoneSize.value === 'custom') {
        if (this.inputZoneWidth.value.trim() !== '' && this.inputZoneHeight.value.trim() !== '') {
          width = this.inputZoneWidth.value;
          height = this.inputZoneHeight.value;
          sizeText = `Custom (${width} x ${height})`;
        } else {
          width = 0;
          height = 0;
          sizeText = 'Custom (0 x 0)';
        }
      } else if (this.inputZoneSize.value !== 'custom') {
        width = this.inputZoneWidth.value;
        height = this.inputZoneHeight.value;
        sizeText = this.inputZoneSize.options[this.inputZoneSize.selectedIndex].text;
      }
    } else if (this.state.checkTypeZone === false && type === 'type-3') {
      width = 0;
      height = 0;
      sizeText = 'Custom (Text ad)';
      sizeValue = '';
    }
    const status = this.inputZoneStatus.value;
    const description = this.inputZoneDescription.value;
    if (name && siteId && type && description && slot) {
      this.props.createZone({
        name,
        siteId,
        type,
        html,
        css,
        slot,
        width,
        height,
        sizeText,
        sizeValue,
        status,
        description,
      });
      this.clearInput();
    }
  }

  isFiltered(zone) {
    const { placementId, status, siteId, type } = this.props.zones.filters;

    const notMatchPlacement = (
      placementId !== undefined &&
      typeof zone.pbzZone === 'object' &&
      JSON.stringify(zone.pbzZone).indexOf(placementId) === -1
    );

    const notMatchStatus = (
      status !== undefined && status !== zone.status
    );
    const notMatchSite = (
      siteId !== undefined && siteId !== zone.siteId
    );
    const notMatchType = (
      type !== undefined && type !== zone.type
    );

    return !(notMatchPlacement || notMatchStatus || notMatchSite || notMatchType);
  }
  render() {
    const { zones } = this.props;
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
                <form className="form-horizontal">
                  <div className="box-body">
                    <div className="form-group">
                      <label
                        htmlFor="inputZonesFilterPlacement"
                        className="col-sm-2 control-label"
                      >Placement</label>
                      <div className="col-sm-10">
                        <select
                          id="inputZonesFilterPlacement"
                          className="form-control select2"
                          style={{ width: '100%' }}
                          ref={c => {
                            this.inputZonesFilterPlacement = c;
                          }}
                          onChange={event => this.onFilterChange(event, 'placementId')}
                          defaultValue={this.props.zones.filters &&
                          this.props.zones.filters.placementId}
                        >
                          <option value="null">All placements</option>
                          {this.props.placements.list &&
                          this.props.placements.list.map(placement => (
                            <option
                              key={placement.id} value={placement.id}
                            >{placement.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="inputZonesFilterSite"
                        className="col-sm-2 control-label"
                      >Website</label>
                      <div className="col-sm-10">
                        <select
                          id="inputZonesFilterSite"
                          className="form-control select2"
                          style={{ width: '100%' }}
                          ref={c => {
                            this.inputZonesFilterSite = c;
                          }}
                          onChange={event => this.onFilterChange(event, 'siteId')}
                          defaultValue={this.props.zones.filters && this.props.zones.filters.siteId}
                        >
                          <option value="null">All sites</option>
                          {this.props.sites.list && this.props.sites.list.map(site => (
                            <option
                              key={site.id} value={site.id}
                            >{site.name} | {site.domain}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="inputZonesFilterType"
                        className="col-sm-2 control-label"
                      >Type</label>
                      <div className="col-sm-10">
                        <select
                          id="inputZonesFilterType"
                          className="form-control"
                          ref={c => {
                            this.inputZonesFilterType = c;
                          }}
                          onChange={event => this.onFilterChange(event, 'type')}
                          defaultValue={this.props.zones.filters && this.props.zones.filters.type}
                        >
                          <option value="null">All types</option>
                          <option value="type-1">Banner, Button or Rectangle </option>
                          <option value="type-2">Interstitial or Floating DHTML </option>
                          <option value="type-3">Text ad </option>
                          <option value="type-4">Email/Newsletter zone</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="inputZonesFilterStatus"
                        className="col-sm-2 control-label"
                      >Status</label>
                      <div className="col-sm-10">
                        <select
                          id="inputZonesFilterStatus" className="form-control"
                          ref={c => {
                            this.inputZonesFilterStatus = c;
                          }}
                          onChange={event => this.onFilterChange(event, 'status')}
                          defaultValue={this.props.zones.filters && this.props.zones.filters.status}
                        >
                          <option value="null">All states</option>
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  {/* /.box-body */}
                </form>
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
                <form className="form-horizontal">
                  <div className="box-body">
                    <div className="form-group">
                      <label
                        htmlFor="inputZoneName"
                        className="col-sm-2 control-label"
                      >Name</label>
                      <div className="col-sm-10">
                        <input
                          type="text" className="form-control" id="inputZoneName"
                          placeholder="Dan Tri"
                          ref={c => {
                            this.inputZoneName = c;
                          }}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="inputZoneSite"
                        className="col-sm-2 control-label"
                      >Website</label>
                      <div className="col-sm-10">
                        <select
                          id="inputZoneSite"
                          className="form-control select2"
                          style={{ width: '100%' }}
                          ref={c => {
                            this.inputZoneSite = c;
                          }}
                        >
                          {this.props.sites.list && this.props.sites.list.map(site => (
                            <option
                              key={site.id} value={site.id}
                            >{site.name} | {site.domain}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="inputZoneType"
                        className="col-sm-2 control-label"
                      >Type</label>
                      <div className="col-sm-10">
                        <select
                          id="inputZoneType"
                          className="form-control"
                          onChange={event => this.onSelectZoneType(event)}
                          ref={c => {
                            this.inputZoneType = c;
                          }}
                        >
                          <option value="type-1">Banner, Button or Rectangle </option>
                          <option value="type-2">Interstitial or Floating DHTML </option>
                          <option value="type-3">Text ad </option>
                          <option value="type-4">Email/Newsletter zone</option>
                        </select>
                      </div>
                    </div>
                    { this.state.checkTypeZone === true ? (
                      <div className="size">
                        <div className="form-group">
                          <label
                            htmlFor="inputZoneSize"
                            className="col-sm-2 control-label"
                          >Size</label>
                          <div className="col-sm-10">
                            <select
                              id="inputZoneSize"
                              className="form-control"
                              onChange={event => this.onSelectSize(event)}
                              ref={c => {
                                this.inputZoneSize = c;
                              }}
                            >
                              <option value="468x60">IAB Full Banner (468 x 60)</option>
                              <option value="120x600">IAB Skyscraper (120 x 600)</option>
                              <option value="728x90">IAB Leaderboard (728 x 90)</option>
                              <option value="120x90">IAB Button 1 (120 x 90)</option>
                              <option value="120x60">IAB Button 2 (120 x 60)</option>
                              <option value="234x60">IAB Half Banner (234 x 60)</option>
                              <option value="88x31">IAB Micro Bar (88 x 31)</option>
                              <option value="125x125">IAB Square Button (125 x 125)</option>
                              <option value="120x240">IAB Vertical Banner (120 x 240)</option>
                              <option value="180x150">IAB Rectangle (180 x 150)</option>
                              <option value="300x250">IAB Medium Rectangle (300 x 250)</option>
                              <option value="336x280">IAB Large Rectangle (336 x 280)</option>
                              <option value="240x400">IAB Vertical Rectangle (240 x 400)</option>
                              <option value="250x250">IAB Square Pop-up (250 x 250)</option>
                              <option value="160x600">IAB Wide Skyscraper (160 x 600)</option>
                              <option value="720x300">IAB Pop-Under (720 x 300)</option>
                              <option value="300x100">IAB 3:1 Rectangle (300 x 100)</option>
                              <option value="custom">Custom</option>
                            </select>
                          </div>
                        </div>
                        <div className="form-group">
                          <label
                            htmlFor="inputZoneSize"
                            className="col-sm-2 control-label"
                          >&nbsp;</label>
                          <div className="col-sm-10">
                            <div className="row">
                              <div className="col-sm-6">
                                <label
                                  htmlFor="inputZoneWidth"
                                  className="col-sm-4 control-label"
                                >Width</label>
                                <div className="col-sm-8">
                                  <input
                                    type="number" className="form-control" id="inputZoneWidth"
                                    defaultValue="468"
                                    onKeyDown={event => this.onKeyDown(event)}
                                    placeholder="300"
                                    ref={c => {
                                      this.inputZoneWidth = c;
                                    }}
                                  />
                                </div>
                              </div>
                              <div className="col-sm-6">
                                <label
                                  htmlFor="inputZoneHeight"
                                  className="col-sm-4 control-label"
                                >Height</label>
                                <div className="col-sm-8">
                                  <input
                                    type="number" className="form-control" id="inputZoneHeight"
                                    defaultValue="60"
                                    onKeyDown={event => this.onKeyDown(event)}
                                    placeholder="300"
                                    ref={c => {
                                      this.inputZoneHeight = c;
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : ('') }
                    <div className="form-group">
                      <label
                        htmlFor="inputZoneHTML"
                        className="col-sm-2 control-label"
                      >HTML</label>
                      <div className="col-sm-10">
                        <textarea
                          className="form-control" id="inputZoneHTML"
                          rows="5" placeholder="More info..."
                          ref={c => {
                            this.inputZoneHTML = c;
                          }}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="inputZoneCSS"
                        className="col-sm-2 control-label"
                      >CSS</label>
                      <div className="col-sm-10">
                        <textarea
                          className="form-control" id="inputZoneCSS"
                          rows="5" placeholder="More info..."
                          ref={c => {
                            this.inputZoneCSS = c;
                          }}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="inputZoneSlot"
                        className="col-sm-2 control-label"
                      >Slot</label>
                      <div className="col-sm-10">
                        <input
                          type="text" className="form-control" id="inputZoneSlot"
                          placeholder="..."
                          ref={c => {
                            this.inputZoneSlot = c;
                          }}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="inputZoneStatus"
                        className="col-sm-2 control-label"
                      >Status</label>
                      <div className="col-sm-10">
                        <select
                          id="inputZoneStatus" className="form-control"
                          ref={c => {
                            this.inputZoneStatus = c;
                          }}
                        >
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="inputZoneDescription"
                        className="col-sm-2 control-label"
                      >Description</label>
                      <div className="col-sm-10">
                        <textarea
                          className="form-control" id="inputZoneDescription"
                          rows="5" placeholder="More info..."
                          ref={c => {
                            this.inputZoneDescription = c;
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  {/* /.box-body */}
                  <div className="box-footer">
                    {/* eslint-disable jsx-a11y/no-static-element-interactions */}
                    <a
                      className="btn btn-app pull-right"
                      onClick={event => this.clearInput(event)}
                    ><i className="fa fa-eraser" /> Clear</a>
                    <a
                      className="btn btn-app pull-right"
                      onClick={event => this.createZone(event)}
                    ><i className="fa fa-check" /> Confirm</a>
                    {/* eslint-enable jsx-a11y/no-static-element-interactions */}
                  </div>
                  {/* /.box-footer */}
                </form>
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
                  <ZoneList list={zones && zones.list} />
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
  placements: state.placements,
});

const mapDispatch = {
  getZonesFilters,
  setZonesFilters,
  getSites,
  getZones,
  createZone,
  getPlacements,
};

export default withStyles(s)(connect(mapState, mapDispatch)(Zones));
