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
import { getSites } from '../../../actions/sites';
import { getZone, updateZone, deleteZone } from '../../../actions/zones';
import Layout from '../../../components/Layout';
import Link from '../../../components/Link';
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

  constructor(props, context) {
    super(props, context);

    this.state = {
      userId: '',
      siteId: '',
      name: '',
      description: '',
      type: '',
      html: '',
      css: '',
      slot: '',
    };
  }

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
    } = nextProps.zones && (nextProps.zones.editing || {});

    document.getElementById('inputZoneSite').value = siteId;
    document.getElementById('inputZoneName').value = name;
    document.getElementById('inputZoneDescription').value = description;
    document.getElementById('inputZoneType').value = type;
    document.getElementById('inputZoneHtml').value = html;
    document.getElementById('inputZoneCss').value = css;
    document.getElementById('inputZoneSlot').value = slot;
  }

  onInputChange(event, field) {
    event.persist();

    this.setState(previousState => {
      const nextState = previousState;
      nextState[field] = event.target.value;
      return nextState;
    });
  }

  updateZone() {
    const {
      userId,
      siteId,
      name,
      description,
      type,
      html,
      css,
      slot,
    } = this.state;

    const zone = { id: this.props.zoneId };

    if (userId && userId !== this.props.zones.editing.userId) {
      zone.userId = userId;
    }

    if (siteId && siteId !== this.props.zones.editing.siteId) {
      zone.siteId = siteId;
    }

    if (name && name !== this.props.zones.editing.name) {
      zone.name = name;
    }

    if (description && description !== this.props.zones.editing.description) {
      zone.description = description;
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
                          onChange={event => this.onInputChange(event, 'name')}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="inputZoneType"
                        className="col-sm-2 control-label"
                      >Website</label>
                      <div className="col-sm-10">
                        <select
                          id="inputZoneSite"
                          className="form-control select2"
                          style={{ width: '100%' }}
                          onChange={event => this.onInputChange(event, 'siteId')}
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
                          onChange={event => this.onInputChange(event, 'type')}
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
                        htmlFor="inputZoneHtml"
                        className="col-sm-2 control-label"
                      >HTML</label>
                      <div className="col-sm-10">
                        <textarea
                          className="form-control" id="inputZoneHtml"
                          rows="5" placeholder="More info..."
                          onChange={event => this.onInputChange(event, 'html')}
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
                          onChange={event => this.onInputChange(event, 'css')}
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
                          onChange={event => this.onInputChange(event, 'slot')}
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
                          onChange={event => this.onInputChange(event, 'status')}
                        >
                          <option>Active</option>
                          <option>Inactive</option>
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
                          onChange={event => this.onInputChange(event, 'description')}
                        />
                      </div>
                    </div>
                  </div>
                  {/* /.box-body */}
                  <div className="box-footer">
                    {/* eslint-disable jsx-a11y/no-static-element-interactions */}
                    <Link
                      to="/resource/zone"
                      className={'btn btn-app pull-right '.concat(s.btn)}
                    ><i className="fa fa-undo" /> Cancel</Link>
                    <Link
                      to="/resource/zone"
                      className={'btn btn-app pull-right '.concat(s.btn)}
                      onClick={event => this.deleteZone(event)}
                    ><i className="fa fa-trash-o" /> Delete</Link>
                    <a
                      className={'btn btn-app pull-right '.concat(s.btn)}
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
