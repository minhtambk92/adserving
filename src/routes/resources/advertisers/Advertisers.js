/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { getAdvertisers, createAdvertiser } from '../../../actions/advertiser/advertisers';
import { setPageAdvertiserActiveTab } from '../../../actions/pages/advertisers';
import { createActivity } from '../../../actions/activity/activities';
import CreateAdvertiserForm from './CreateAdvertiserForm';
import AdvertiserList from './AdvertiserList';
import s from './Advertisers.css';

class Advertisers extends Component {

  static propTypes = {
    advertisers: PropTypes.object,
    getAdvertisers: PropTypes.func,
    createAdvertiser: PropTypes.func,
    setPageAdvertiserActiveTab: PropTypes.func,
    createActivity: PropTypes.func,
    user: PropTypes.object,
    activities: PropTypes.object,
  };

  componentWillMount() {
    this.props.getAdvertisers();
  }

  render() {
    const { advertisers } = this.props;

    return (
      <div>

        <div className="row">
          <section className="col-lg-12">
            {/* BOX: FORM OF ADD NEW WEB ADVERTISER */}
            <div className="box collapsed-box">
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
                createActivity={this.props.createActivity}
                advertisers={this.props.advertisers}
                user={this.props.user}
              />
            </div>
            {/* /.col */}
          </section>
        </div>

        <div className="row">
          <section className="col-lg-12">
            {/* BOX: LIST OF ADVERTISERS */}
            <div className="box box-info">
              <div className="box-header with-border">
                <h3 className="box-title">List Advertiser</h3>
              </div>
              {/* /.box-header */}
              <div className="box-body">
                <AdvertiserList
                  list={advertisers.list}
                  setPageAdvertiserActiveTab={this.props.setPageAdvertiserActiveTab}
                  createAdvertiser={this.props.createAdvertiser}
                  createActivity={this.props.createActivity}
                  user={this.props.user}
                />
              </div>
              {/* /.box-body */}
            </div>
            {/* /.box */}
          </section>
          {/* /.col */}
        </div>

      </div>
    );
  }

}

const mapState = state => ({
  advertisers: state.advertisers,
  activities: state.activities,
  user: state.user,
});

const mapDispatch = {
  getAdvertisers,
  createAdvertiser,
  setPageAdvertiserActiveTab,
  createActivity,
};

export default withStyles(s)(connect(mapState, mapDispatch)(Advertisers));

