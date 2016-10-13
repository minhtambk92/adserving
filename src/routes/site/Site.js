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
import { getSite, updateSite, deleteSite } from '../../actions/sites';
import Layout from '../../components/Layout';
import Link from '../../components/Link';
import s from './Site.css';

const pageTitle = 'Site';

class Site extends Component {

  static propTypes = {
    siteId: PropTypes.string.isRequired,
    sites: PropTypes.object,
    getSite: PropTypes.func,
    updateSite: PropTypes.func,
    deleteSite: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      userId: '',
      domain: '',
      name: '',
      email: '',
      description: '',
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
    } = nextProps.sites && (nextProps.sites.current || {});

    document.getElementById('inputSiteDomain').value = domain;
    document.getElementById('inputSiteName').value = name;
    document.getElementById('inputSiteEmail').value = email;
    document.getElementById('inputSiteDescription').value = description;
  }

  onInputChange(event, field) {
    event.persist();

    this.setState(previousState => ({
      ...previousState,
      [field]: event.target.value,
    }));
  }

  updateSite() { // eslint-disable-line no-unused-vars
    const { userId, domain, name, email, description } = this.state;
    const site = { id: this.props.siteId };

    if (userId && userId !== this.props.sites.current.userId) {
      site.userId = userId;
    }

    if (domain && domain !== this.props.sites.current.domain) {
      site.domain = domain;
    }

    if (name && name !== this.props.sites.current.name) {
      site.name = name;
    }

    if (email && email !== this.props.sites.current.email) {
      site.email = email;
    }

    if (description && description !== this.props.sites.current.description) {
      site.description = description;
    }

    this.props.updateSite(site);
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
            .concat(this.props.sites.current ? this.props.sites.current.name : '...')
        }
        pageSubTitle={this.props.sites.current ? this.props.sites.current.domain : ''}
      >
        <div>

          <div className="row">
            <section className="col-lg-12">
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
                        htmlFor="inputSiteDomain" className="col-sm-2 control-label"
                      >Website domain</label>
                      <div className="col-sm-10">
                        <input
                          type="text" className="form-control" id="inputSiteDomain"
                          placeholder="dantri.com.vn"
                          onChange={event => this.onInputChange(event, 'domain')}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="inputSiteName" className="col-sm-2 control-label">Name</label>
                      <div className="col-sm-10">
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
                        className="col-sm-2 control-label"
                      >Email</label>
                      <div className="col-sm-10">
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
                        className="col-sm-2 control-label"
                      >Description</label>
                      <div className="col-sm-10">
                        <textarea
                          className="form-control" id="inputSiteDescription"
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
                      to="/sites"
                      className={'btn btn-app pull-right '.concat(s.btn)}
                    ><i className="fa fa-undo" /> Cancel</Link>
                    <Link
                      to="/sites"
                      className={'btn btn-app pull-right '.concat(s.btn)}
                      onClick={event => this.deleteSite(event)}
                    ><i className="fa fa-trash-o" /> Delete</Link>
                    <a
                      className={'btn btn-app pull-right '.concat(s.btn)}
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
      </Layout>
    );
  }

}

const mapState = (state) => ({
  sites: state.sites,
});

const mapDispatch = {
  getSite,
  updateSite,
  deleteSite,
};

export default withStyles(s)(connect(mapState, mapDispatch)(Site));
