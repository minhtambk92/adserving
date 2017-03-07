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
  getOptionChannelValues,
  createOptionChannelValue,
  deleteOptionChannelValue,
  updateOptionChannelValue,
  getOptionChannelValueFilters,
  setOptionChannelValueFilters,
} from '../../../../actions/optionChannelValue/optionChannelValues';
import {
  setStatusCreateOptionChannelValue,
  setStatusUpdateOptionChannelValue,
} from '../../../../actions/pages/resources';
import { getOptionChannelTypeIsSelectOption } from '../../../../actions/optionChannelType/optionChannelTypes';
import { createActivity } from '../../../../actions/activity/activities';
import OptionChannelValueList from './OptionChannelValueList';
import FilterOptionChannelTypesForm from './FilterOptionChannelTypesForm';
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
    getOptionChannelValueFilters: PropTypes.func,
    setOptionChannelValueFilters: PropTypes.func,
    user: PropTypes.object,
    createActivity: PropTypes.func,
    activities: PropTypes.object,
  };

  componentWillMount() {
    this.props.getOptionChannelValues();
    this.props.getOptionChannelValueFilters();
    this.props.getOptionChannelTypeIsSelectOption();
  }

  getFilteredOptionChannelValues() {
    return _.filter(this.props.optionChannelValues.list,
      optionChannelValue => this.isFiltered(optionChannelValue));
  }

  isFiltered(optionChannelValue) {
    const { optionChannelTypeId, status } = this.props.optionChannelValues.filters;

    let notMatchPlacement = false;
    if (this.props.optionChannelTypes && this.props.optionChannelTypes.list.length > 0 &&
        optionChannelTypeId !== undefined) {
      notMatchPlacement = (
        optionChannelTypeId !== undefined &&
        typeof optionChannelValue.optionChannelType === 'object' &&
        JSON.stringify(optionChannelValue.optionChannelType).indexOf(optionChannelTypeId) === -1);
    } else if (this.props.optionChannelTypes && optionChannelTypeId === undefined &&
      this.props.optionChannelTypes.list.length > 0) {
      const id = this.props.optionChannelTypes.list[0].id;
      notMatchPlacement = JSON.stringify(optionChannelValue.optionChannelType).indexOf(id) === -1;
    }

    const notMatchStatus = (
      status !== undefined && status !== optionChannelValue.status
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
                <FilterOptionChannelTypesForm
                  optionChannelTypeList={this.props.optionChannelTypes &&
                  this.props.optionChannelTypes.list}
                  filters={this.props.optionChannelValues.filters}
                  setOptionChannelValueFilters={this.props.setOptionChannelValueFilters}
                  currentOptionChannelTypeId={this.props.optionChannelValues &&
                  this.props.optionChannelValues.filters.optionChannelTypeId}
                />
              </div>
              {/* /.col */}
            </section>
          </div>
          <OptionChannelValueList
            list={this.getFilteredOptionChannelValues()}
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
  optionChannelValues: state.optionChannelValues,
  page: state.page.resources,
  optionChannelTypes: state.optionChannelTypes,
  user: state.user,
  activities: state.activities,
});

const mapDispatch = {
  getOptionChannelValues,
  setStatusCreateOptionChannelValue,
  setStatusUpdateOptionChannelValue,
  createOptionChannelValue,
  deleteOptionChannelValue,
  updateOptionChannelValue,
  getOptionChannelTypeIsSelectOption,
  getOptionChannelValueFilters,
  setOptionChannelValueFilters,
  createActivity,
};

export default withStyles(s)(connect(mapState, mapDispatch)(OptionChannelValue));
