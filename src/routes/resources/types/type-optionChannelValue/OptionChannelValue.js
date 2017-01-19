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
  getOptionChannelValues,
  createOptionChannelValue,
  deleteOptionChannelValue,
  updateOptionChannelValue,
} from '../../../../actions/optionChannelValues';
import {
  setStatusCreateOptionChannelValue,
  setStatusUpdateOptionChannelValue,
} from '../../../../actions/pages/resources';
import OptionChannelValueList from './OptionChannelValueList';
import s from './OptionChannelValue.css';

const pageTitle = 'Option Channel Value';

class OptionChannelValue extends Component {

  static propTypes = {
    resourceId: PropTypes.string.isRequired,
    page: PropTypes.object,
    resources: PropTypes.object,
    getOptionChannelValues: PropTypes.func,
    optionChannelValues: PropTypes.object,
    setStatusCreateOptionChannelValue: PropTypes.func,
    setStatusUpdateOptionChannelValue: PropTypes.func,
    createOptionChannelValue: PropTypes.func,
    deleteOptionChannelValue: PropTypes.func,
    updateOptionChannelValue: PropTypes.func,
  };

  componentWillMount() {
    this.props.getOptionChannelValues();
  }

  render() {
    return (
      <Layout
        pageTitle={pageTitle}
        pageSubTitle=""
      >
        <div>
          <OptionChannelValueList
            list={this.props.optionChannelValues && this.props.optionChannelValues.list}
            statusCreateOptionChannelValue={this.props.setStatusCreateOptionChannelValue}
            statusUpdateOptionChannelValue={this.props.setStatusUpdateOptionChannelValue}
            getOptionChannelValues={this.props.getOptionChannelValues}
            optionChannelValues={this.props.optionChannelValues}
            createOptionChannelValue={this.props.createOptionChannelValue}
            deleteOptionChannelValue={this.props.deleteOptionChannelValue}
            updateOptionChannelValue={this.props.updateOptionChannelValue}
            page={this.props.page}
          />
        </div>
      </Layout>
    );
  }

}

const mapState = (state) => ({
  resources: state.resources,
  optionChannelValues: state.optionChannelValues,
  page: state.page.resources,
});

const mapDispatch = {
  getOptionChannelValues,
  setStatusCreateOptionChannelValue,
  setStatusUpdateOptionChannelValue,
  createOptionChannelValue,
  deleteOptionChannelValue,
  updateOptionChannelValue,
};

export default withStyles(s)(connect(mapState, mapDispatch)(OptionChannelValue));
