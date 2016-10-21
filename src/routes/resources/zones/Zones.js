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
import { getZones, createZone } from '../../../actions/zones';
import Layout from '../../../components/Layout';
import Link from '../../../components/Link';
import s from './Zones.css';

const pageTitle = 'Zone Management';
const pageSubTitle = 'Control panel';

class Zones extends Component {

  static propTypes = {
    sites: PropTypes.object,
    getSites: PropTypes.func,
    zones: PropTypes.object,
    getZones: PropTypes.func,
    createZone: PropTypes.func,
  };

  componentWillMount() {
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

  clearInput(event) { // eslint-disable-line no-unused-vars, class-methods-use-this
    document.getElementById('inputZoneName').value = null;
    document.getElementById('inputZoneDescription').value = null;
    document.getElementById('inputZoneHTML').value = null;
    document.getElementById('inputZoneCSS').value = null;
    document.getElementById('inputZoneSlot').value = null;
  }

  createZone() {
    const name = document.getElementById('inputZoneName').value;
    const siteId = document.getElementById('inputZoneSite').value;
    const type = document.getElementById('inputZoneType').value;
    const description = document.getElementById('inputZoneDescription').value;
    const html = document.getElementById('inputZoneHTML').value;
    const css = document.getElementById('inputZoneCSS').value;
    const slot = document.getElementById('inputZoneSlot').value;

    if (name && siteId && type && description && slot) {
      this.props.createZone({
        name,
        siteId,
        type,
        description,
        html,
        css,
        slot,
      });

      this.clearInput();
    }
  }

  render() {
    return (
      <Layout pageTitle={pageTitle} pageSubTitle={pageSubTitle}>
        <div>

          <div className="row">
            <section className="col-lg-12">
              {/* BOX: FORM OF CREATE A NEW ZONE */}
              <div className="box box-primary collapsed-box">
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
                        className="col-sm-2 control-label"
                      >HTML</label>
                      <div className="col-sm-10">
                        <textarea
                          className="form-control" id="inputZoneHTML"
                          rows="5" placeholder="More info..."
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
                        />
                      </div>
                    </div>
                  </div>
                  {/* /.box-body */}
                  <div className="box-footer">
                    {/* eslint-disable jsx-a11y/no-static-element-interactions */}
                    <a
                      className={'btn btn-app pull-right '.concat(s.btn)}
                      onClick={event => this.clearInput(event)}
                    ><i className="fa fa-eraser" /> Clear</a>
                    <a
                      className={'btn btn-app pull-right '.concat(s.btn)}
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
                        <th>ID</th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Description</th>
                        <th>Slot</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.props.zones.list && this.props.zones.list.map(zone => (
                        <tr key={zone.id}>
                          <td><input type="checkbox" className="inputChooseZone" /></td>
                          <td>{zone.siteId}</td>
                          <td><Link to={`/resource/zone/${zone.id}`}>{zone.name}</Link></td>
                          <td>{zone.type}</td>
                          <td>{zone.description}</td>
                          <td>{zone.slot}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <th><input type="checkbox" className="inputChooseZones" /></th>
                        <th>ID</th>
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
  getSites,
  getZones,
  createZone,
};

export default withStyles(s)(connect(mapState, mapDispatch)(Zones));
