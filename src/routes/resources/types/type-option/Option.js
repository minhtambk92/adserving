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
  getOptions,
  createOption,
  deleteOption,
  updateOption,
} from '../../../../actions/options';
import {
  setStatusCreateOption,
  setStatusUpdateOption,
} from '../../../../actions/pages/resources';
import { createActivity } from '../../../../actions/activity/activities';
import OptionList from './OptionList';
import s from './Option.css';

const pageTitle = 'Option';

class Option extends Component {

  static propTypes = {
    resourceId: PropTypes.string.isRequired,
    page: PropTypes.object,
    resources: PropTypes.object,
    getOptions: PropTypes.func,
    options: PropTypes.object,
    setStatusCreateOption: PropTypes.func,
    setStatusUpdateOption: PropTypes.func,
    createOption: PropTypes.func,
    deleteOption: PropTypes.func,
    updateOption: PropTypes.func,
    createActivity: PropTypes.func,
    user: PropTypes.object,
  };

  componentWillMount() {
    this.props.getOptions();
  }

  render() {
    return (
      <Layout
        pageTitle={pageTitle}
        pageSubTitle=""
      >
        <div>
          <OptionList
            list={this.props.options.list}
            page={this.props.page}
            updateOption={this.props.updateOption}
            createOption={this.props.createOption}
            deleteOption={this.props.deleteOption}
            getOptions={this.props.getOptions}
            options={this.props.options}
            setStatusCreateOption={this.props.setStatusCreateOption}
            setStatusUpdateOption={this.props.setStatusUpdateOption}
            user={this.props.user}
            createActivity={this.props.createActivity}
          />
        </div>
      </Layout>
    );
  }

}

const mapState = state => ({
  resources: state.resources,
  options: state.options,
  page: state.page.resources,
  user: state.user,
});

const mapDispatch = {
  getOptions,
  setStatusCreateOption,
  setStatusUpdateOption,
  createOption,
  deleteOption,
  updateOption,
  createActivity,
};

export default withStyles(s)(connect(mapState, mapDispatch)(Option));
