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
// import { defineMessages, FormattedRelative } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { getSite, updateSiteIncludeZone, deleteSite } from '../../../../actions/sites';
import { createZoneIncludeSite } from '../../../../actions/zones';
import Layout from '../../../../components/Layout';
import Link from '../../../../components/Link';
import s from './Site.css';

const pageTitle = 'Site';

class Site extends Component {

  static propTypes = {
    siteId: PropTypes.string.isRequired,
    sites: PropTypes.object,
    getSite: PropTypes.func,
    updateSiteIncludeZone: PropTypes.func,
    deleteSite: PropTypes.func,
    zones: PropTypes.object,
    createZoneIncludeSite: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      domain: '',
      name: '',
      email: '',
      description: '',
      status: '',
    };
  }

  componentWillMount() {
    this.props.getSite(this.props.siteId);
  }

  componentWillReceiveProps(nextProps) {
    const {
      domain,
      name,
      email,
      description,
      status,
    } = nextProps.sites && (nextProps.sites.editing || {});

    document.getElementById('inputSiteDomain').value = domain;
    document.getElementById('inputSiteName').value = name;
    document.getElementById('inputSiteEmail').value = email;
    document.getElementById('inputSiteDescription').value = description;
    document.getElementById('inputSiteStatus').value = status;
  }

  onInputChange(event, field) {
    event.persist();

    this.setState(previousState => ({
      ...previousState,
      [field]: event.target.value,
    }));
  }

  clearInput(event) { // eslint-disable-line no-unused-vars, class-methods-use-this
    document.getElementById('inputZoneName').value = null;
    document.getElementById('inputZoneDescription').value = null;
    document.getElementById('inputZoneHTML').value = null;
    document.getElementById('inputZoneCSS').value = null;
    document.getElementById('inputZoneSlot').value = null;
  }

  createZoneIncludeSite() {
    const name = document.getElementById('inputZoneName').value;
    const siteId = this.props.siteId;
    const type = document.getElementById('inputZoneType').value;
    const description = document.getElementById('inputZoneDescription').value;
    const html = document.getElementById('inputZoneHTML').value;
    const css = document.getElementById('inputZoneCSS').value;
    const slot = document.getElementById('inputZoneSlot').value;

    if (name && siteId && type && description && slot) {
      this.props.createZoneIncludeSite({
        name,
        siteId,
        type,
        description,
        html,
        css,
        slot,
      }).then(() => {
        this.props.getSite(this.props.siteId);
      });
      this.clearInput();
    }
  }

  updateSiteIncludeZone() {
    const {
      domain,
      name,
      email,
      description,
      status,
    } = this.state;

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
    site.status = document.getElementById('inputSiteStatus').value;
    this.props.updateSiteIncludeZone(site);
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
                            onChange={event => this.onInputChange(event, 'domain')}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="inputSiteName" className="col-sm-3 control-label">Name</label>
                        <div className="col-sm-9">
                          <input
                            type="text" className="form-control" id="inputSiteName"
                            placeholder="Dan Tri"
                            onChange={event => this.onInputChange(event, 'name')}
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
                            onChange={event => this.onInputChange(event, 'email')}
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
                            onChange={event => this.onInputChange(event, 'description')}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label
                          htmlFor="inputSiteStatus"
                          className="col-sm-3 control-label"
                        >Status</label>
                        <div className="col-sm-9">
                          <select id="inputSiteStatus" className="form-control">
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
                        onClick={event => this.updateSiteIncludeZone(event)}
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
                    <h3 className="box-title">Create a new zone</h3>
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
                          >
                            <option>Type 1</option>
                            <option>Type 2</option>
                            <option>Type 3</option>
                            <option>Type 4</option>
                            <option>Type 5</option>
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
                          >
                            <option>Active</option>
                            <option>Inactive</option>
                          </select>
                        </div>
                      </div>
                      <div className="form-group">
                        <label
                          htmlFor="inputZoneDescription"
                          className="col-sm-3 control-label"
                        >Description</label>
                        <div className="col-sm-9">
                          <textarea className="form-control" id="inputZoneDescription" rows="5" placeholder="More info..." />
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
                        onClick={event => this.createZoneIncludeSite(event)}
                      ><i className="fa fa-check" /> Confirm</a>
                      {/* eslint-enable jsx-a11y/no-static-element-interactions */}
                    </div>
                    {/* /.box-footer */}
                  </form>
                </div>
                {/* /.col */}
              </section>
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
                        <th><input type="checkbox" className="inputChooseSite" /></th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Description</th>
                        <th>Slot</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.props.sites.editing && this.props.sites.editing.zones &&
                      this.props.sites.editing.zones.map(zone => (
                        <tr key={zone.id}>
                          <td><input type="checkbox" className="inputChooseSite" /></td>
                          <td><Link to={`/zone/${zone.id}`}>{zone.name}</Link></td>
                          <td>{zone.type}</td>
                          <td>{zone.description}</td>
                          <td>{zone.slot}</td>
                          <td><Link to={`/zone/${zone.id}`}>Add New Placements</Link></td>
                        </tr>
                      ))}
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
  getSite,
  updateSiteIncludeZone,
  deleteSite,
  createZoneIncludeSite,
};

export default withStyles(s)(connect(mapState, mapDispatch)(Site));
