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
import { getSite, updateSite, deleteSite, checkSitesByDomain } from '../../../../actions/sites';
import { createZone } from '../../../../actions/zones';
import Layout from '../../../../components/Layout';
import Link from '../../../../components/Link';
import LisrZoneOfSite from '../ListZoneOfSite';
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
    checkSitesByDomain: PropTypes.func,
  };
  constructor(props, context) {
    super(props, context);

    this.state = {
      searchText: '',
      checkTypeZone: true,
    };
  }
  componentWillMount() {
    this.props.getSite(this.props.siteId);
  }

  componentDidMount() {
    /* eslint-disable no-undef */
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
  validateDomain(event) { // eslint-disable-line no-unused-vars, class-methods-use-this
    const domain = this.inputSiteDomain.value;
    /* eslint-disable max-len */
    const urlRegex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
    /* eslint-enable max-len */
    if (urlRegex.test(domain) === true) {
      this.props.checkSitesByDomain(domain).then(() => {
        if (this.props.sites.check && this.props.sites.check.length > 0) {
          this.inputSiteDomain.parentNode.setAttribute('class', 'col-sm-9 has-error');
          this.inputSiteDomainError.innerHTML = ('Domain has been used');
          this.inputSiteDomain.value = '';
          setTimeout(() => {
            this.inputSiteDomain.parentNode.setAttribute('class', 'col-sm-9');
            this.inputSiteDomainError.innerHTML = ('');
          }, 2000);
        } else if (this.props.sites.check && this.props.sites.check.length === 0) {
          this.inputSiteDomain.value = domain;
          this.inputSiteDomain.parentNode.setAttribute('class', 'col-sm-9 has-success');
          setTimeout(() => {
            this.inputSiteDomain.parentNode.setAttribute('class', 'col-sm-9');
            this.inputSiteDomainError.innerHTML = ('');
          }, 2000);
        }
      });
    } else {
      this.inputSiteDomain.parentNode.setAttribute('class', 'col-sm-9 has-error');
      this.inputSiteDomainError.innerHTML = ('Domain fail');
      this.inputSiteDomain.value = '';
      setTimeout(() => {
        this.inputSiteDomain.parentNode.setAttribute('class', 'col-sm-9');
        this.inputSiteDomainError.innerHTML = ('');
      }, 2000);
    }
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
              <div className="nav-tabs-custom">
                <ul className="nav nav-tabs">
                  <li className="active">
                    <a href="#editSite" data-toggle="tab">
                      Edit Site
                    </a>
                  </li>
                  <li>
                    <a href="#addZone" data-toggle="tab">
                      Add Zone
                    </a>
                  </li>
                </ul>
                <div className="tab-content">
                  <div className="active tab-pane" id="editSite">
                    <div className="row">
                      <section className="col-lg-12">
                        {/* BOX: FORM OF CREATE NEW WEBSITE */}
                        <div className="box box-info">
                          <div className="box-header with-border">
                            <h3 className="box-title">Change site information</h3>
                            <div className="box-tools pull-right">
                              <button
                                type="button" className="btn btn-box-tool"
                                data-widget="collapse"
                              >
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
                                    placeholder="http://dantri.com.vn"
                                    onBlur={event => this.validateDomain(event)}
                                    ref={c => {
                                      this.inputSiteDomain = c;
                                    }}
                                  />
                                  <span // eslint-disable-line react/self-closing-comp
                                    id="inputSiteDomainErr"
                                    className="help-block"
                                    ref={c => {
                                      this.inputSiteDomainError = c;
                                    }}
                                  >
                                  </span>
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
                    </div>
                  </div>
                  <div className="tab-pane" id="addZone">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="row">
                          <section className="col-lg-6">
                            {/* BOX: FORM OF CREATE A NEW ZONE */}
                            <div className="box box-info">
                              <div className="box-header with-border">
                                <h3 className="box-title">Create New Zone</h3>
                                <div className="box-tools pull-right">
                                  <button
                                    type="button" className="btn btn-box-tool"
                                    data-widget="collapse"
                                  >
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
                                          className="col-sm-3 control-label"
                                        >Size</label>
                                        <div className="col-sm-9">
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
                                          className="col-sm-3 control-label"
                                        >&nbsp;</label>
                                        <div className="col-sm-9">
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
                                        id="inputZoneDescription" rows="5"
                                        placeholder="More info..."
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
                          <section className="col-lg-6">
                            {/* BOX: LIST OF ZONES */}
                            <div className="box box-info">
                              <div className="box-header with-border">
                                <h3 className="box-title">
                                  List of zones: {this.props.sites.editing ?
                                  this.props.sites.editing.name : '...'}
                                </h3>
                              </div>
                              {/* /.box-header */}
                              <div className="box-body">
                                <LisrZoneOfSite
                                  list={this.props.sites.editing &&
                                      this.props.sites.editing.zones &&
                                      this.props.sites.editing.zones}
                                />
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
                    </div>
                  </div>
                </div>
              </div>
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
  checkSitesByDomain,
};

export default withStyles(s)(connect(mapState, mapDispatch)(Site));
