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
import { getOptionChannelTypeIsSelectOption } from '../../../../actions/optionChannelTypes';
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
    getOptionChannelTypeIsSelectOption: PropTypes.func,
    optionChannelTypes: PropTypes.object,
  };

  componentWillMount() {
    this.props.getOptionChannelValues();
    this.props.getOptionChannelTypeIsSelectOption();
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
            optionChannelTypeList={this.props.optionChannelTypes &&
            this.props.optionChannelTypes.list}
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
  optionChannelTypes: state.optionChannelTypes,
});

const mapDispatch = {
  getOptionChannelValues,
  setStatusCreateOptionChannelValue,
  setStatusUpdateOptionChannelValue,
  createOptionChannelValue,
  deleteOptionChannelValue,
  updateOptionChannelValue,
  getOptionChannelTypeIsSelectOption,
};

export default withStyles(s)(connect(mapState, mapDispatch)(OptionChannelValue));
