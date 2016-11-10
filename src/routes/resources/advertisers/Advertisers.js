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
import CreateAdvertiserForm from './CreateAdvertiserForm';
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

  componentWillMount() {
    this.props.getAdvertisers();
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
                <CreateAdvertiserForm
                  filters={this.props.advertisers.filters}
                  createAdvertiser={this.props.createAdvertiser}
                />
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

