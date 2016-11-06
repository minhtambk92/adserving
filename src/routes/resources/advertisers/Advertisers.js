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
import { getAdvertisers, createAdvertiser } from '../../../actions/advertisers';
import Layout from '../../../components/Layout';
import AdvertiserList from './AdvertiserList';
import s from './Advertisers.css';

const pageTitle = 'Home';
const pageSubTitle = 'Control panel';

class Advertisers extends Component {
  static propTypes = {
    advertisers: PropTypes.object,
    getAdvertisers: PropTypes.func,
    createAdvertiser: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      searchText: '',
    };
  }

  componentWillMount() {
    this.props.getAdvertisers();
  }

  componentDidMount() {
    /* eslint-disable no-undef */
    /* eslint-enable no-undef */
  }

  componentDidUpdate() {
    /* eslint-disable no-undef */
    /* eslint-enable no-undef */
  }

  clearInput() {
    this.inputAdvertiserName.value = null;
    this.inputAdvertiserContact.value = null;
    this.inputAdvertiserEmail.value = null;
    this.inputAdvertiserDescription.value = null;
  }

  createAdvertiser() {
    const name = this.inputAdvertiserName.value;
    const contact = this.inputAdvertiserContact.value;
    const email = this.inputAdvertiserEmail.value;
    const description = this.inputAdvertiserDescription.value;
    const status = this.inputAdvetiserStatus.value;

    if (contact && name && email && description) {
      this.props.createAdvertiser({ email, name, contact, description, status }).then(() => {
        this.clearInput();
      });
    }
  }

  render() {
    const { advertisers } = this.props;
    return (
      <Layout pageTitle={pageTitle} pageSubTitle={pageSubTitle}>
        <div>
          <div className="row">
            <section className="col-lg-12">
              {/* BOX: FORM OF CREATE NEW WEB ADVERTISER */}
              <div className="box box-info collapsed-box">
                <div className="box-header with-border">
                  <h3 className="box-title">Add new advertiser</h3>
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
                        htmlFor="inputAdvertiserName" className="col-sm-2 control-label"
                      >Name</label>
                      <div className="col-sm-10">
                        <input
                          type="text" className="form-control" id="inputAdvertiserName"
                          placeholder="Admicro"
                          ref={c => {
                            this.inputAdvertiserName = c;
                          }}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="inputAdvertiserContact" className="col-sm-2 control-label">Contact</label>
                      <div className="col-sm-10">
                        <input
                          type="text" className="form-control" id="inputAdvertiserContact"
                          placeholder="0987654321"
                          ref={c => {
                            this.inputAdvertiserContact = c;
                          }}
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
                          ref={c => {
                            this.inputAdvertiserEmail = c;
                          }}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="inputAdvertiserStatus"
                        className="col-sm-2 control-label"
                      >Status</label>
                      <div className="col-sm-10">
                        <select
                          id="inputAdvertiserStatus" className="form-control"
                          ref={c => {
                            this.inputAdvetiserStatus = c;
                          }}
                        >
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </select>
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
                          ref={c => {
                            this.inputAdvertiserDescription = c;
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
                      onClick={event => this.createAdvertiser(event)}
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
              {/* BOX: LIST OF ADVERTISERS */}
              <div className="box">
                <div className="box-header with-border">
                  <h3 className="box-title">List Advertiser</h3>
                </div>
                {/* /.box-header */}
                <div className="box-body">
                  <AdvertiserList list={advertisers && advertisers.list} />
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
  advertisers: state.advertisers,
});

const mapDispatch = {
  getAdvertisers,
  createAdvertiser,
};

export default withStyles(s)(connect(mapState, mapDispatch)(Advertisers));

