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
import { getSites } from '../../../../actions/sites';
import { getZone, updateZone, deleteZone } from '../../../../actions/zones';
import Layout from '../../../../components/Layout';
import Link from '../../../../components/Link';
import s from './Zone.css';

const pageTitle = 'Zone';

class Zone extends Component {

  static propTypes = {
    sites: PropTypes.object,
    getSites: PropTypes.func,
    zoneId: PropTypes.string.isRequired,
    zones: PropTypes.object,
    getZone: PropTypes.func,
    updateZone: PropTypes.func,
    deleteZone: PropTypes.func,
  };

  componentWillMount() {
    this.props.getSites();
    this.props.getZone(this.props.zoneId);
  }

  componentWillReceiveProps(nextProps) {
    const {
      siteId,
      name,
      description,
      type,
      html,
      css,
      slot,
      status,
    } = nextProps.zones && (nextProps.zones.editing || {});

    this.inputZoneSite.value = siteId;
    this.inputZoneName.value = name;
    this.inputZoneType.value = type;
    this.inputZoneHtml.value = html;
    this.inputZoneCss.value = css;
    this.inputZoneSlot.value = slot;
    this.inputZoneStatus.value = status;
    this.inputZoneDescription.value = description;
  }

  updateZone() {
    const siteId = this.inputZoneSite.value;
    const name = this.inputZoneName.value;
    const type = this.inputZoneType.value;
    const html = this.inputZoneHtml.value;
    const css = this.inputZoneCss.value;
    const slot = this.inputZoneSlot.value;
    const status = this.inputZoneStatus.value;
    const description = this.inputZoneDescription.value;

    const zone = { id: this.props.zoneId };

    if (siteId && siteId !== this.props.zones.editing.siteId) {
      zone.siteId = siteId;
    }

    if (name && name !== this.props.zones.editing.name) {
      zone.name = name;
    }

    if (type && type !== this.props.zones.editing.type) {
      zone.type = type;
    }

    if (html && html !== this.props.zones.editing.html) {
      zone.html = html;
    }

    if (css && css !== this.props.zones.editing.css) {
      zone.css = css;
    }

    if (slot && slot !== this.props.zones.editing.slot) {
      zone.slot = slot;
    }

    if (status && status !== this.props.zones.editing.status) {
      zone.status = status;
    }

    if (description && description !== this.props.zones.editing.description) {
      zone.description = description;
    }

    this.props.updateZone(zone);
  }

  deleteZone() {
    this.props.deleteZone(this.props.zoneId);
  }

  render() {
    return (
      <Layout
        pageTitle={
          pageTitle
            .concat(': ')
            .concat(this.props.zones.editing ? this.props.zones.editing.name : '...')
        }
        pageSubTitle={this.props.zones.editing ? this.props.zones.editing.type : ''}
      >
        <div>

          <div className="row">
            <section className="col-lg-12">
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
                        htmlFor="inputZoneHtml"
                        className="col-sm-2 control-label"
                      >HTML</label>
                      <div className="col-sm-10">
                        <textarea
                          className="form-control" id="inputZoneHtml"
                          rows="5" placeholder="More info..."
                          ref={c => {
                            this.inputZoneHtml = c;
                          }}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="inputZoneCss"
                        className="col-sm-2 control-label"
                      >CSS</label>
                      <div className="col-sm-10">
                        <textarea
                          className="form-control" id="inputZoneCss"
                          rows="5" placeholder="More info..."
                          ref={c => {
                            this.inputZoneCss = c;
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
                    <Link
                      to="/resource/zone"
                      className="btn btn-app pull-right"
                    ><i className="fa fa-undo" /> Cancel</Link>
                    <Link
                      to="/resource/zone"
                      className="btn btn-app pull-right"
                      onClick={event => this.deleteZone(event)}
                    ><i className="fa fa-trash-o" /> Delete</Link>
                    <a
                      className="btn btn-app pull-right"
                      onClick={event => this.updateZone(event)}
                    ><i className="fa fa-floppy-o" /> Save</a>
                    {/* eslint-enable jsx-a11y/no-static-element-interactions */}
                  </div>
                  {/* /.box-footer */}
                </form>
              </div>
              {/* /.col */}
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
  getSites,
  getZone,
  updateZone,
  deleteZone,
};

export default withStyles(s)(connect(mapState, mapDispatch)(Zone));
