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
import Layout from '../../../../components/Layout';
import {
  getChannelOptionCategories,
  createChannelOptionCategory,
  deleteChannelOptionCategory,
  updateChannelOptionCategory,
} from '../../../../actions/channelOptionCategories';
import {
  setStatusChannelOptionCategoryCreate,
  setStatusChannelOptionCategoryEdit,
} from '../../../../actions/pages/resources';
import ChannelOptionCategoryList from './ChannelOptionCategoryList';
import s from './ChannelOptionCategory.css';

const pageTitle = 'ChannelOptionCategory';

class ChannelOptionCategory extends Component {

  static propTypes = {
    resourceId: PropTypes.string.isRequired,
    page: PropTypes.object,
    resources: PropTypes.object,
    getChannelOptionCategories: PropTypes.func,
    channelOptionCategories: PropTypes.object,
    setStatusChannelOptionCategoryCreate: PropTypes.func,
    setStatusChannelOptionCategoryEdit: PropTypes.func,
    createChannelOptionCategory: PropTypes.func,
    deleteChannelOptionCategory: PropTypes.func,
    updateChannelOptionCategory: PropTypes.func,
  };

  componentWillMount() {
    this.props.getChannelOptionCategories();
  }

  render() {
    return (
      <Layout
        pageTitle={pageTitle}
        pageSubTitle=""
      >
        <div>
          <ChannelOptionCategoryList
            list={this.props.channelOptionCategories.list}
            statusCategoryCreate={this.props.setStatusChannelOptionCategoryCreate}
            statusCategoryEdit={this.props.setStatusChannelOptionCategoryEdit}
            getChannelOptionCategories={this.props.getChannelOptionCategories}
            channelOptionCategories={this.props.channelOptionCategories}
            createChannelOptionCategory={this.props.createChannelOptionCategory}
            deleteChannelOptionCategory={this.props.deleteChannelOptionCategory}
            updateChannelOptionCategory={this.props.updateChannelOptionCategory}
            page={this.props.page}
          />
        </div>
      </Layout>
    );
  }

}

const mapState = (state) => ({
  resources: state.resources,
  channelOptionCategories: state.channelOptionCategories,
  page: state.page.resources,
});

const mapDispatch = {
  getChannelOptionCategories,
  setStatusChannelOptionCategoryCreate,
  setStatusChannelOptionCategoryEdit,
  createChannelOptionCategory,
  deleteChannelOptionCategory,
  updateChannelOptionCategory,
};

export default withStyles(s)(connect(mapState, mapDispatch)(ChannelOptionCategory));
