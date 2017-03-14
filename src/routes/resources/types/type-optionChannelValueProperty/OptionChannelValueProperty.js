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
import _ from 'lodash';
// import { defineMessages, FormattedRelative } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Layout from '../../../../components/Layout';
import {
  getOptionChannelValueProperties,
  createOptionChannelValueProperty,
  deleteOptionChannelValueProperty,
  updateOptionChannelValueProperty,
  getOptionChannelValuePropertyFilters,
  setOptionChannelValuePropertyFilters,
} from '../../../../actions/optionChannelValueProperty/optionChannelValueProperties';
import {
  setStatusCreateOptionChannelValueProperty,
  setStatusUpdateOptionChannelValueProperty,
} from '../../../../actions/pages/resources';
import { getOptionChannelValueIsProperties } from '../../../../actions/optionChannelValue/optionChannelValues';
import { createActivity } from '../../../../actions/activity/activities';
import OptionChannelValuePropertyList from './OptionChannelValuePropertyList';
import FilterOptionChannelValuesForm from './FilterOptionChannelValuesForm';
import s from './OptionChannelValueProperty.css';

const pageTitle = 'Option Channel Value Property';

class OptionChannelValueProperty extends Component {

  static propTypes = {
    resourceId: PropTypes.string.isRequired,
    page: PropTypes.object,
    resources: PropTypes.object,
    getOptionChannelValueProperties: PropTypes.func,
    optionChannelValues: PropTypes.object,
    setStatusCreateOptionChannelValueProperty: PropTypes.func,
    setStatusUpdateOptionChannelValueProperty: PropTypes.func,
    createOptionChannelValueProperty: PropTypes.func,
    deleteOptionChannelValueProperty: PropTypes.func,
    updateOptionChannelValueProperty: PropTypes.func,
    getOptionChannelValueIsProperties: PropTypes.func,
    optionChannelValueProperties: PropTypes.object,
    getOptionChannelValuePropertyFilters: PropTypes.func,
    setOptionChannelValuePropertyFilters: PropTypes.func,
    user: PropTypes.object,
    createActivity: PropTypes.func,
    activities: PropTypes.object,
  };

  componentWillMount() {
    this.props.getOptionChannelValueProperties();
    this.props.getOptionChannelValuePropertyFilters();
    this.props.getOptionChannelValueIsProperties();
  }

  getFilteredOptionChannelValueProperties() {
    return _.filter(this.props.optionChannelValueProperties.list,
      optionChannelValueProperty => this.isFiltered(optionChannelValueProperty));
  }

  isFiltered(optionChannelValueProperty) {
    const { optionChannelValueId, status } = this.props.optionChannelValueProperties.filters;
    let notMatchPlacement = false;
    if (this.props.optionChannelValues && this.props.optionChannelValues.list.length > 0 &&
      optionChannelValueId !== undefined) {
      notMatchPlacement = (
      optionChannelValueId !== undefined &&
      typeof optionChannelValueProperty.optionChannelValue === 'object' &&
      JSON.stringify(optionChannelValueProperty.optionChannelValue).indexOf(optionChannelValueId)
      === -1);
    } else if (this.props.optionChannelValues && optionChannelValueId === undefined &&
      this.props.optionChannelValues.list.length > 0) {
      const id = this.props.optionChannelValues.list[0].id;
      notMatchPlacement =
        JSON.stringify(optionChannelValueProperty.optionChannelValue).indexOf(id) === -1;
    }

    const notMatchStatus = (
      status !== undefined && status !== optionChannelValueProperty.status
    );
    return !(notMatchPlacement || notMatchStatus);
  }

  render() {
    return (
      <Layout
        pageTitle={pageTitle}
        pageSubTitle=""
      >
        <div>
          <div className="row">
            <section className="col-lg-12">
              {/* BOX: FILTER */}
              <div className="box box-default">
                <div className="box-header with-border">
                  <h3 className="box-title">Filter by:</h3>
                  <div className="box-tools pull-right">
                    <button type="button" className="btn btn-box-tool" data-widget="collapse">
                      <i className="fa fa-minus" />
                    </button>
                  </div>
                </div>
                {/* /.box-header */}
                <FilterOptionChannelValuesForm
                  optionChannelValueList={this.props.optionChannelValues &&
                  this.props.optionChannelValues.list}
                  filters={this.props.optionChannelValueProperties.filters}
                  setOptionChannelValuePropertyFilters={
                    this.props.setOptionChannelValuePropertyFilters}
                  currentOptionChannelValueId={this.props.optionChannelValueProperties &&
                  this.props.optionChannelValueProperties.filters.optionChannelValueId}
                />
              </div>
              {/* /.col */}
            </section>
          </div>
          <OptionChannelValuePropertyList
            list={this.getFilteredOptionChannelValueProperties()}
            statusCreateOptionChannelValueProperty={
              this.props.setStatusCreateOptionChannelValueProperty}
            statusUpdateOptionChannelValueProperty={
              this.props.setStatusUpdateOptionChannelValueProperty}
            getOptionChannelValueProperties={this.props.getOptionChannelValueProperties}
            optionChannelValueProperties={this.props.optionChannelValueProperties}
            createOptionChannelValueProperty={this.props.createOptionChannelValueProperty}
            deleteOptionChannelValueProperty={this.props.deleteOptionChannelValueProperty}
            updateOptionChannelValueProperty={this.props.updateOptionChannelValueProperty}
            optionChannelValueList={this.props.optionChannelValues &&
            this.props.optionChannelValues.list}
            page={this.props.page}
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
  optionChannelValueProperties: state.optionChannelValueProperties,
  page: state.page.resources,
  optionChannelValues: state.optionChannelValues,
  user: state.user,
  activities: state.activities,
});

const mapDispatch = {
  getOptionChannelValueProperties,
  setStatusCreateOptionChannelValueProperty,
  setStatusUpdateOptionChannelValueProperty,
  createOptionChannelValueProperty,
  deleteOptionChannelValueProperty,
  updateOptionChannelValueProperty,
  getOptionChannelValueIsProperties,
  getOptionChannelValuePropertyFilters,
  setOptionChannelValuePropertyFilters,
  createActivity,
};

export default withStyles(s)(connect(mapState, mapDispatch)(OptionChannelValueProperty));
