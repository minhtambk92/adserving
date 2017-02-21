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
  getOptionChannelTypes,
  createOptionChannelType,
  deleteOptionChannelType,
  updateOptionChannelType,
} from '../../../../actions/optionChannelTypes';
import { setOptionChannelValueFilters } from '../../../../actions/optionChannelValues';
import {
  setStatusCreateOptionChannelType,
  setStatusUpdateOptionChannelType,
} from '../../../../actions/pages/resources';
import { createActivity } from '../../../../actions/activities';
import OptionChannelTypeList from './OptionChannelTypeList';
import s from './OptionChannelType.css';

const pageTitle = 'Option Channel Type';

class OptionChannelType extends Component {

  static propTypes = {
    resourceId: PropTypes.string.isRequired,
    page: PropTypes.object,
    resources: PropTypes.object,
    getOptionChannelTypes: PropTypes.func,
    optionChannelTypes: PropTypes.object,
    setStatusCreateOptionChannelType: PropTypes.func,
    setStatusUpdateOptionChannelType: PropTypes.func,
    createOptionChannelType: PropTypes.func,
    deleteOptionChannelType: PropTypes.func,
    updateOptionChannelType: PropTypes.func,
    setOptionChannelValueFilters: PropTypes.func,
    user: PropTypes.object,
    createActivity: PropTypes.func,
    activities: PropTypes.object,
  };

  componentWillMount() {
    this.props.getOptionChannelTypes();
  }

  render() {
    return (
      <Layout
        pageTitle={pageTitle}
        pageSubTitle=""
      >
        <div>
          <OptionChannelTypeList
            list={this.props.optionChannelTypes && this.props.optionChannelTypes.list}
            statusCreateOptionChannelType={this.props.setStatusCreateOptionChannelType}
            statusUpdateOptionChannelType={this.props.setStatusUpdateOptionChannelType}
            getOptionChannelTypes={this.props.getOptionChannelTypes}
            optionChannelTypes={this.props.optionChannelTypes}
            createOptionChannelType={this.props.createOptionChannelType}
            deleteOptionChannelType={this.props.deleteOptionChannelType}
            updateOptionChannelType={this.props.updateOptionChannelType}
            setOptionChannelValueFilters={this.props.setOptionChannelValueFilters}
            page={this.props.page}
            user={this.props.user}
            createActivity={this.props.createActivity}
          />
        </div>
      </Layout>
    );
  }

}

const mapState = (state) => ({
  resources: state.resources,
  optionChannelTypes: state.optionChannelTypes,
  page: state.page.resources,
  optionChannelValues: state.optionChannelValues,
  user: state.user,
  activities: state.activities,
});

const mapDispatch = {
  getOptionChannelTypes,
  setStatusCreateOptionChannelType,
  setStatusUpdateOptionChannelType,
  createOptionChannelType,
  deleteOptionChannelType,
  updateOptionChannelType,
  setOptionChannelValueFilters,
  createActivity,
};

export default withStyles(s)(connect(mapState, mapDispatch)(OptionChannelType));
