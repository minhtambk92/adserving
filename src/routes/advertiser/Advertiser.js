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
import { getAdvertiser, updateAdvertiser, deleteAdvertiser } from '../../actions/advertisers';
import Layout from '../../components/Layout';
import Link from '../../components/Link';
import s from './Advertiser.css';

const pageTitle = 'Advertiser';

class Advertiser extends Component {

  static propTypes = {
    advertiserId: PropTypes.string.isRequired,
    advertisers: PropTypes.object,
    getAdvertiser: PropTypes.func,
    updateAdvertiser: PropTypes.func,
    deleteAdvertiser: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);

    // this.state = {
    //   contact: '',
    //   name: '',
    //   email: '',
    //   description: '',
    // };
  }

  componentWillMount() {
    this.props.getAdvertiser(this.props.advertiserId);
  }

  componentWillReceiveProps(nextProps) {
    const {
      contact,
      name,
      email,
      description,
    } = nextProps.advertisers && (nextProps.advertisers.current || {});

    document.getElementById('inputAdvertiserContact').value = contact;
    document.getElementById('inputAdvertiserName').value = name;
    document.getElementById('inputAdvertiserEmail').value = email;
    document.getElementById('inputAdvertiserDescription').value = description;
  }

  onInputChange(event, field) {
    event.persist();

    this.setState(previousState => ({
      ...previousState,
      [field]: event.target.value,
    }));
  }

  updateAdvertiser() {
    const { email, name, contact, description } = this.state;
    const advertiser = { id: this.props.advertiserId };

    if (contact && contact !== this.props.advertisers.current.contact) {
      advertiser.contact = contact;
    }

    if (name && name !== this.props.advertisers.current.name) {
      advertiser.name = name;
    }

    if (email && email !== this.props.advertisers.current.email) {
      advertiser.email = email;
    }

    if (description && description !== this.props.advertisers.current.description) {
      advertiser.description = description;
    }

    this.props.updateAdvertiser(advertiser);
  }

  deleteAdvertiser() {
    this.props.deleteAdvertiser(this.props.advertiserId);
  }

  render() {
    return (
      <Layout
        pageTitle={
          pageTitle
            .concat(': ')
            .concat(this.props.advertisers.current ? this.props.advertisers.current.name : '...')
        }
        pageSubTitle=''
      >
        <div>

          <div className="row">
            <section className="col-lg-12">
              {/* BOX: FORM OF CREATE NEW WEBSITE */}
              <div className="box box-primary">
                <div className="box-header with-border">
                  <h3 className="box-title">Change advertiser information</h3>
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
                      <label htmlFor="inputAdvertiserName" className="col-sm-2 control-label">Name</label>
                      <div className="col-sm-10">
                        <input
                          type="text" className="form-control" id="inputAdvertiserName"
                          placeholder="Dan Tri"
                          onChange={event => this.onInputChange(event, 'name')}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="inputAdvertiserContact" className="col-sm-2 control-label"
                      >Advertiser contact</label>
                      <div className="col-sm-10">
                        <input
                          type="text" className="form-control" id="inputAdvertiserContact"
                          placeholder="0987666888"
                          onChange={event => this.onInputChange(event, 'contact')}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="inputAdvertiserEmail"
                        className="col-sm-2 control-label"
                      >Email</label>
                      <div className="col-sm-10">
                        <input
                          type="text" className="form-control" id="inputAdvertiserEmail"
                          placeholder="contact@dantri.com.vn"
                          onChange={event => this.onInputChange(event, 'email')}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="inputAdvertiserDescription"
                        className="col-sm-2 control-label"
                      >Description</label>
                      <div className="col-sm-10">
                        <textarea
                          className="form-control" id="inputAdvertiserDescription"
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
                      to="/advertisers"
                      className={'btn btn-app pull-right '.concat(s.btn)}
                    ><i className="fa fa-undo" /> Cancel</Link>
                    <Link
                      to="/advertisers"
                      className={'btn btn-app pull-right '.concat(s.btn)}
                      onClick={event => this.deleteAdvertiser(event)}
                    ><i className="fa fa-trash-o" /> Delete</Link>
                    <a
                      className={'btn btn-app pull-right '.concat(s.btn)}
                      onClick={event => this.updateAdvertiser(event)}
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
  advertisers: state.advertisers,
});

const mapDispatch = {
  getAdvertiser,
  updateAdvertiser,
  deleteAdvertiser,
};

export default withStyles(s)(connect(mapState, mapDispatch)(Advertiser));
