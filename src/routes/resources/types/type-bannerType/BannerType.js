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
// import { defineMessages, FormattedRelative } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Layout from '../../../../components/Layout';
import {
  getBannerTypes,
  createBannerType,
  deleteBannerType,
  updateBannerType,
} from '../../../../actions/bannerTypes';
import {
  setStatusCreateBannerType,
  setStatusUpdateBannerType,
} from '../../../../actions/pages/resources';
import BannerTypeList from './BannerTypeList';
import s from './BannerType.css';

const pageTitle = 'Banner Type';

class BannerType extends Component {

  static propTypes = {
    resourceId: PropTypes.string.isRequired,
    page: PropTypes.object,
    resources: PropTypes.object,
    getBannerTypes: PropTypes.func,
    bannerTypes: PropTypes.object,
    setStatusCreateBannerType: PropTypes.func,
    setStatusUpdateBannerType: PropTypes.func,
    createBannerType: PropTypes.func,
    user: PropTypes.object,
    deleteBannerType: PropTypes.func,
    updateBannerType: PropTypes.func,
  };

  componentWillMount() {
    this.props.getBannerTypes();
  }

  render() {
    return (
      <Layout
        pageTitle={pageTitle}
        pageSubTitle=""
      >
        <div>
          <BannerTypeList
            list={this.props.bannerTypes && this.props.bannerTypes.list}
            statusCreateBannerType={this.props.setStatusCreateBannerType}
            statusUpdateBannerType={this.props.setStatusUpdateBannerType}
            getBannerTypes={this.props.getBannerTypes}
            bannerTypes={this.props.bannerTypes}
            createBannerType={this.props.createBannerType}
            deleteBannerType={this.props.deleteBannerType}
            updateBannerType={this.props.updateBannerType}
            user={this.props.user}
            page={this.props.page}
          />
        </div>
      </Layout>
    );
  }

}

const mapState = state => ({
  resources: state.resources,
  bannerTypes: state.bannerTypes,
  user: state.user,
  page: state.page.resources,
});

const mapDispatch = {
  getBannerTypes,
  setStatusCreateBannerType,
  setStatusUpdateBannerType,
  createBannerType,
  deleteBannerType,
  updateBannerType,
};

export default withStyles(s)(connect(mapState, mapDispatch)(BannerType));
