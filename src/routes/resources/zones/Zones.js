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
  getZonesFilters,
  setZonesFilters,
  getZones,
  createZone,
} from '../../../actions/zones';
import Layout from '../../../components/Layout';
import Link from '../../../components/Link';
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
  };

  componentWillMount() {
    this.props.getZonesFilters();
    this.props.getSites();
    this.props.getZones();
  }

  componentDidMount() {
    /* eslint-disable no-undef */
    // $(this.inputZoneType).select2();

    // iCheck for checkbox and radio inputs
    $('input[type="checkbox"].inputChooseZones').iCheck({
      checkboxClass: 'icheckbox_minimal-blue',
      radioClass: 'iradio_minimal-blue',
    });
    /* eslint-enable no-undef */
  }

  componentDidUpdate() {
    /* eslint-disable no-undef */
    // iCheck for checkbox and radio inputs
    $('input[type="checkbox"].inputChooseZone').iCheck({
      checkboxClass: 'icheckbox_minimal-blue',
      radioClass: 'iradio_minimal-blue',
    });
    /* eslint-enable no-undef */
  }

  async onFilterChange(event, field) {
    event.persist();

    await this.props.setZonesFilters({
      [field]: event.target.value === 'null' ? null : event.target.value,
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
        status,
        description,
      });

      this.clearInput();
    }
  }

  isFiltered(zone) {
    const { siteId, type, status } = this.props.zones.filters;
    let displayable = false;

    if (!siteId || siteId === zone.siteId) {
      displayable = true;
    } else {
      return false;
    }

    if (!type || type === zone.type) {
      displayable = true;
    } else {
      return false;
    }

    if (!status || status === zone.status) {
      displayable = true;
    } else {
      return false;
    }

    return displayable;
  }

  render() {
    return (
      <Layout pageTitle={pageTitle} pageSubTitle={pageSubTitle}>
        <div>

          <div className="row">
            <section className="col-lg-12">
              {/* BOX: FORM OF FILTER */}
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
                          <option value="type-1">Type 1</option>
                          <option value="type-2">Type 2</option>
                          <option value="type-3">Type 3</option>
                          <option value="type-4">Type 4</option>
                          <option value="type-5">Type 5</option>
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
                          ref={c => {
                            this.inputZoneType = c;
                          }}
                        >
                          <option value="type-1">Type 1</option>
                          <option value="type-2">Type 2</option>
                          <option value="type-3">Type 3</option>
                          <option value="type-4">Type 4</option>
                          <option value="type-5">Type 5</option>
                        </select>
                      </div>
                    </div>
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

                  <div className="box-tools">
                    <div className="input-group input-group-sm" style={{ width: 150 }}>
                      <input
                        type="text" name="inputSearchZones"
                        className="form-control pull-right"
                        placeholder="Search..."
                      />
                      <div className="input-group-btn">
                        <button
                          type="submit" className="btn btn-default"
                        ><i className="fa fa-search" /></button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /.box-header */}
                <div className="box-body table-responsive no-padding">
                  <table id="example1" className="table table-hover">
                    <thead>
                      <tr>
                        <th><input type="checkbox" className="inputChooseZones" /></th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Description</th>
                        <th>Slot</th>
                        <th>&nbsp;</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.props.zones.list && this.props.zones.list.map(zone => {
                        if (!this.isFiltered(zone)) {
                          return false;
                        }

                        return (
                          <tr key={zone.id}>
                            <td><input type="checkbox" className="inputChooseZone" /></td>
                            <td>
                              <Link to={`/resource/zone/${zone.id}`}>
                                <strong>{zone.name}</strong>
                              </Link>
                            </td>
                            <td>{zone.type}</td>
                            <td>{zone.description}</td>
                            <td>{zone.slot}</td>
                            <td><Link to={`/resource/zone/${zone.id}`}>Add New Placements</Link>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                    <tfoot>
                      <tr>
                        <th><input type="checkbox" className="inputChooseZones" /></th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Description</th>
                        <th>Slot</th>
                        <th>&nbsp;</th>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                {/* /.box-body */}
                <div className="box-footer clearfix">
                  <ul className="pagination pagination-sm no-margin pull-right">
                    <li><a>&laquo;</a></li>
                    <li><a>1</a></li>
                    <li><a>2</a></li>
                    <li><a>3</a></li>
                    <li><a>&raquo;</a></li>
                  </ul>
                </div>
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
});

const mapDispatch = {
  getZonesFilters,
  setZonesFilters,
  getSites,
  getZones,
  createZone,
};

export default withStyles(s)(connect(mapState, mapDispatch)(Zones));
