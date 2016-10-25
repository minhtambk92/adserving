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
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { getSite, updateSite, deleteSite } from '../../../../actions/sites';
import { createZone } from '../../../../actions/zones';
import Layout from '../../../../components/Layout';
import Link from '../../../../components/Link';
import s from './Site.css';
// import { defineMessages, FormattedRelative } from 'react-intl';

const pageTitle = 'Site';

class Site extends Component {

  static propTypes = {
    siteId: PropTypes.string.isRequired,
    sites: PropTypes.object,
    getSite: PropTypes.func,
    updateSite: PropTypes.func,
    deleteSite: PropTypes.func,
    zones: PropTypes.object,
    createZone: PropTypes.func,
  };

  componentWillMount() {
    this.props.getSite(this.props.siteId);
  }

  componentDidMount() {
    /* eslint-disable no-undef */
    $('input[type="checkbox"].inputChooseSite').iCheck({
      checkboxClass: 'icheckbox_minimal-blue',
      radioClass: 'iradio_minimal-blue',
    });
    /* eslint-enable no-undef */
  }

  componentWillReceiveProps(nextProps) {
    const {
      domain,
      name,
      email,
      description,
      status,
    } = nextProps.sites && (nextProps.sites.editing || {});
    this.inputSiteDomain.value = domain;
    this.inputSiteName.value = name;
    this.inputSiteEmail.value = email;
    this.inputSiteDescription.value = description;
    this.inputSiteStatus.value = status;
  }

  componentDidUpdate() {
    /* eslint-disable no-undef */
    // iCheck for checkbox and radio inputs
    $('input[type="checkbox"].inputChooseSite').iCheck({
      checkboxClass: 'icheckbox_minimal-blue',
      radioClass: 'iradio_minimal-blue',
    });
    /* eslint-enable no-undef */
  }

  clearInput(event) { // eslint-disable-line no-unused-vars, class-methods-use-this
    this.inputZoneName.value = null;
    this.inputZoneHTML.value = null;
    this.inputZoneCSS.value = null;
    this.inputZoneSlot.value = null;
    this.inputZoneDescription.value = null;
  }

  createZone() {
    const name = this.inputZoneName.value;
    const siteId = this.props.siteId;
    const type = this.inputZoneType.value;
    const html = this.inputZoneHTML.value;
    const css = this.inputZoneCSS.value;
    const slot = this.inputZoneSlot.value;
    const status = this.inputZoneStatus.value;
    const description = this.inputZoneDescription.value;
    if (name && siteId && type && description && slot) {
      this.props.createZone({
        siteId,
        name,
        type,
        html,
        css,
        slot,
        status,
        description,
      }).then(() => {
        this.props.getSite(this.props.siteId);
      });
      this.clearInput();
    }
  }
  updateSite() {
    const domain = this.inputSiteDomain.value;
    const name = this.inputSiteName.value;
    const email = this.inputSiteEmail.value;
    const description = this.inputSiteDescription.value;
    const status = this.inputSiteStatus.value;
    const site = { id: this.props.siteId };

    if (domain && domain !== this.props.sites.editing.domain) {
      site.domain = domain;
    }

    if (name && name !== this.props.sites.editing.name) {
      site.name = name;
    }

    if (email && email !== this.props.sites.editing.email) {
      site.email = email;
    }

    if (description && description !== this.props.sites.editing.description) {
      site.description = description;
    }
    if (status && status !== this.props.sites.editing.status) {
      site.status = status;
    }
    // site.status = document.getElementById('inputSiteStatus').value;
    this.props.updateSite(site).then(() => {
      this.props.getSite(this.props.siteId);
    });
  }

  deleteSite() {
    this.props.deleteSite(this.props.siteId);
  }

  render() {
    return (
      <Layout
        pageTitle={
          pageTitle
            .concat(': ')
            .concat(this.props.sites.editing ? this.props.sites.editing.name : '...')
        }
        pageSubTitle={this.props.sites.editing ? this.props.sites.editing.domain : ''}
      >
        <div>
          <div className="row">
            <section className="col-lg-12">
              <div className="row">
                <section className="col-lg-6">
                  {/* BOX: FORM OF CREATE NEW WEBSITE */}
                  <div className="box box-primary">
                    <div className="box-header with-border">
                      <h3 className="box-title">Change site information</h3>
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
                            htmlFor="inputSiteDomain" className="col-sm-3 control-label"
                          >Website domain</label>
                          <div className="col-sm-9">
                            <input
                              type="text" className="form-control" id="inputSiteDomain"
                              placeholder="dantri.com.vn"
                              ref={c => {
                                this.inputSiteDomain = c;
                              }}
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label
                            htmlFor="inputSiteName" className="col-sm-3 control-label"
                          >
                            Name
                          </label>
                          <div className="col-sm-9">
                            <input
                              type="text" className="form-control" id="inputSiteName"
                              placeholder="Dan Tri"
                              ref={c => {
                                this.inputSiteName = c;
                              }}
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label
                            htmlFor="inputSiteEmail"
                            className="col-sm-3 control-label"
                          >Email</label>
                          <div className="col-sm-9">
                            <input
                              type="text" className="form-control" id="inputSiteEmail"
                              placeholder="contact@dantri.com.vn"
                              ref={c => {
                                this.inputSiteEmail = c;
                              }}
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label
                            htmlFor="inputSiteDescription"
                            className="col-sm-3 control-label"
                          >Description</label>
                          <div className="col-sm-9">
                            <textarea
                              className="form-control" id="inputSiteDescription"
                              rows="5" placeholder="More info..."
                              ref={c => {
                                this.inputSiteDescription = c;
                              }}
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label
                            htmlFor="inputSiteStatus"
                            className="col-sm-3 control-label"
                          >Status</label>
                          <div className="col-sm-9">
                            <select
                              id="inputSiteStatus" className="form-control"
                              ref={c => {
                                this.inputSiteStatus = c;
                              }}
                            >
                              <option value="active">Active</option>
                              <option value="inactive">Inactive</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      {/* /.box-body */}
                      <div className="box-footer">
                        {/* eslint-disable jsx-a11y/no-static-element-interactions */}
                        <Link
                          to="/resource/site"
                          className="btn btn-app pull-right"
                        ><i className="fa fa-undo" /> Cancel</Link>
                        <Link
                          to="/resource/site"
                          className="btn btn-app pull-right"
                          onClick={event => this.deleteSite(event)}
                        ><i className="fa fa-trash-o" /> Delete</Link>
                        <a
                          className="btn btn-app pull-right"
                          onClick={event => this.updateSite(event)}
                        ><i className="fa fa-floppy-o" /> Save</a>
                        {/* eslint-enable jsx-a11y/no-static-element-interactions */}
                      </div>
                      {/* /.box-footer */}
                    </form>
                  </div>
                  {/* /.col */}
                </section>
                <section className="col-lg-6">
                  {/* BOX: FORM OF CREATE A NEW ZONE */}
                  <div className="box box-primary">
                    <div className="box-header with-border">
                      <h3 className="box-title">Create New Zone</h3>
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
                            htmlFor="inputZoneName"
                            className="col-sm-3 control-label"
                          >Name</label>
                          <div className="col-sm-9">
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
                            htmlFor="inputZoneType"
                            className="col-sm-3 control-label"
                          >Type</label>
                          <div className="col-sm-9">
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
                            className="col-sm-3 control-label"
                          >HTML</label>
                          <div className="col-sm-9">
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
                            className="col-sm-3 control-label"
                          >CSS</label>
                          <div className="col-sm-9">
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
                            className="col-sm-3 control-label"
                          >Slot</label>
                          <div className="col-sm-9">
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
                            className="col-sm-3 control-label"
                          >Status</label>
                          <div className="col-sm-9">
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
                            className="col-sm-3 control-label"
                          >Description</label>
                          <div className="col-sm-9">
                            <textarea
                              className="form-control"
                              id="inputZoneDescription" rows="5" placeholder="More info..."
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
            </section>
          </div>
          <div className="row">
            <section className="col-lg-12">
              {/* BOX: LIST OF ZONES */}
              <div className="box box-info">
                <div className="box-header with-border">
                  <h3 className="box-title">
                    List of zones: {this.props.sites.editing ?
                    this.props.sites.editing.name : '...'}
                  </h3>
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
                        <th><input type="checkbox" className="inputChooseSite" /></th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Description</th>
                        <th>Slot</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.props.sites.editing && this.props.sites.editing.zones &&
                      this.props.sites.editing.zones.map(zone => {
                        return (
                          <tr key={zone.id}>
                            <td><input type="checkbox" className="inputChooseSite" /></td>
                            <td><Link to={`/resource/zone/${zone.id}`}>{zone.name}</Link></td>
                            <td>{zone.type}</td>
                            <td>{zone.description}</td>
                            <td>{zone.slot}</td>
                            <td><Link to={`/resource/zone/${zone.id}`}>Add New Placements</Link></td>
                          </tr>
                        );
                      }
                      )}
                    </tbody>
                    <tfoot>
                      <tr>
                        <th><input type="checkbox" className="inputChooseSite" /></th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Description</th>
                        <th>Slot</th>
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
  getSite,
  updateSite,
  deleteSite,
  createZone,
};

export default withStyles(s)(connect(mapState, mapDispatch)(Site));
