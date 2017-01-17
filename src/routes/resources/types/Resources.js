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
import _ from 'lodash';
// import { defineMessages, FormattedRelative } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  getResources,
  createResource,
  getResourcesFilters,
  setResourcesFilters,
} from '../../../actions/resources';
import { setCurrentPageResource } from '../../../actions/pages/resources';
import FilterResourcesForm from './FilterResourcesForm';
import CreateResourceForm from './CreateResourceForm';
import ResourceList from './ResourceList';
import s from './Resources.css';

class Resources extends Component {

  static propTypes = {
    resources: PropTypes.object,
    getResources: PropTypes.func,
    createResource: PropTypes.func,
    getResourcesFilters: PropTypes.func,
    setResourcesFilters: PropTypes.func,
    setCurrentPageResource: PropTypes.func,
  };

  componentWillMount() {
    this.props.getResourcesFilters();
    this.props.getResources();
  }

  getFilteredResources() {
    return _.filter(this.props.resources.list, resource => this.isFiltered(resource));
  }

  isFiltered(resource) {
    const { hasMeta, status } = this.props.resources.filters;

    const notMatchHasMeta = (
      hasMeta !== undefined && hasMeta !== resource.hasMeta
    );

    const notMatchStatus = (
      status !== undefined && status !== resource.status
    );

    return !(notMatchHasMeta || notMatchStatus);
  }

  render() {
    return (
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
              <FilterResourcesForm
                filters={this.props.resources.filters}
                setResourcesFilters={this.props.setResourcesFilters}
              />
            </div>
            {/* /.col */}
          </section>
        </div>

        <div className="row">
          <section className="col-lg-12">
            {/* BOX: CREATE */}
            <div className="box collapsed-box">
              <div className="box-header with-border">
                <h3 className="box-title">Create a new resource</h3>
                <div className="box-tools pull-right">
                  <button type="button" className="btn btn-box-tool" data-widget="collapse">
                    <i className="fa fa-plus" />
                  </button>
                </div>
              </div>
              {/* /.box-header */}
              <CreateResourceForm createResource={this.props.createResource} />
            </div>
            {/* /.col */}
          </section>
        </div>

        <div className="row">
          <section className="col-lg-12">
            {/* BOX: LIST */}
            <div className="box box-info">
              <div className="box-header with-border">
                <h3 className="box-title">List of resources</h3>
              </div>
              {/* /.box-header */}
              <div className="box-body">
                <ResourceList
                  list={this.getFilteredResources()}
                  setCurrentPageResource={this.props.setCurrentPageResource}
                />
              </div>
            </div>
            {/* /.box */}
          </section>
          {/* /.col */}
        </div>

      </div>
    );
  }

}

const mapState = (state) => ({
  resources: state.resources,
  page: state.page.resources,
});

const mapDispatch = {
  getResourcesFilters,
  setResourcesFilters,
  getResources,
  createResource,
  setCurrentPageResource,
};

export default withStyles(s)(connect(mapState, mapDispatch)(Resources));
