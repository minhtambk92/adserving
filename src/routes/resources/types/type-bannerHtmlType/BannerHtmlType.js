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
  getBannerHtmlTypes,
  createBannerHtmlType,
  deleteBannerHtmlType,
  updateBannerHtmlType,
} from '../../../../actions/bannerHtmlTypes';
import {
  setStatusCreateBannerHtmlType,
  setStatusUpdateBannerHtmlType,
} from '../../../../actions/pages/resources';
import BannerHtmlTypeList from './BannerHtmlTypeList';
import s from './BannerHtmlType.css';

const pageTitle = 'Banner HTML Type';

class BannerHtmlType extends Component {

  static propTypes = {
    resourceId: PropTypes.string.isRequired,
    page: PropTypes.object,
    resources: PropTypes.object,
    getBannerHtmlTypes: PropTypes.func,
    bannerHtmlTypes: PropTypes.object,
    setStatusCreateBannerHtmlType: PropTypes.func,
    setStatusUpdateBannerHtmlType: PropTypes.func,
    user: PropTypes.object,
    createBannerHtmlType: PropTypes.func,
    deleteBannerHtmlType: PropTypes.func,
    updateBannerHtmlType: PropTypes.func,
  };

  componentWillMount() {
    this.props.getBannerHtmlTypes();
  }

  render() {
    return (
      <Layout
        pageTitle={pageTitle}
        pageSubTitle=""
      >
        <div>
          <BannerHtmlTypeList
            list={this.props.bannerHtmlTypes && this.props.bannerHtmlTypes.list}
            statusCreateBannerHtmlType={this.props.setStatusCreateBannerHtmlType}
            statusUpdateBannerHtmlType={this.props.setStatusUpdateBannerHtmlType}
            getBannerHtmlTypes={this.props.getBannerHtmlTypes}
            bannerHtmlTypes={this.props.bannerHtmlTypes}
            createBannerHtmlType={this.props.createBannerHtmlType}
            deleteBannerHtmlType={this.props.deleteBannerHtmlType}
            updateBannerHtmlType={this.props.updateBannerHtmlType}
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
  bannerHtmlTypes: state.bannerHtmlTypes,
  page: state.page.resources,
  user: state.user,
});

const mapDispatch = {
  getBannerHtmlTypes,
  setStatusCreateBannerHtmlType,
  setStatusUpdateBannerHtmlType,
  createBannerHtmlType,
  deleteBannerHtmlType,
  updateBannerHtmlType,
};

export default withStyles(s)(connect(mapState, mapDispatch)(BannerHtmlType));
