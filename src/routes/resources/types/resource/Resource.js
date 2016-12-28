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
import {
  getResource,
  updateResource,
  deleteResource,
} from '../../../../actions/resources';
import Layout from '../../../../components/Layout';
import {
  getChannelOptionBrowsers,
  createChannelOptionBrowser,
  deleteChannelOptionBrowser,
  updateChannelOptionBrowser,
} from '../../../../actions/channelOptionBrowsers';
import {
  getChannelOptionCategories,
  updateChannelOptionCategory,
  deleteChannelOptionCategory,
  createChannelOptionCategory,
} from '../../../../actions/channelOptionCategories';
import {
  setStatusChannelOptionBrowserCreate,
  setStatusChannelOptionBrowserEdit,
  setStatusChannelOptionCategoryCreate,
  setStatusChannelOptionCategoryEdit,
  setCurrentPageResource,
} from '../../../../actions/pages/resources';
import UpdateResourceForm from '../UpdateResourceForm';
import ChannelOptionBrowserList from '../ChannelOptionBrowserList';
import ChannelOptionCategoryList from '../ChannelOptionCategoryList';
import s from './Resource.css';

const pageTitle = 'Resource';

class Resource extends Component {

  static propTypes = {
    resourceId: PropTypes.string.isRequired,
    setCurrentPageResource: PropTypes.func,
    page: PropTypes.object,
    resources: PropTypes.object,
    getResource: PropTypes.func,
    updateResource: PropTypes.func,
    deleteResource: PropTypes.func,
    getChannelOptionBrowsers: PropTypes.func,
    channelOptionBrowsers: PropTypes.object,
    setStatusChannelOptionBrowserCreate: PropTypes.func,
    setStatusChannelOptionBrowserEdit: PropTypes.func,
    createChannelOptionBrowser: PropTypes.func,
    deleteChannelOptionBrowser: PropTypes.func,
    updateChannelOptionBrowser: PropTypes.func,
    getChannelOptionCategories: PropTypes.func,
    channelOptionCategories: PropTypes.object,
    setStatusChannelOptionCategoryCreate: PropTypes.func,
    setStatusChannelOptionCategoryEdit: PropTypes.func,
    createChannelOptionCategory: PropTypes.func,
    deleteChannelOptionCategory: PropTypes.func,
    updateChannelOptionCategory: PropTypes.func,
  };

  componentWillMount() {
    this.props.getResource(this.props.resourceId);
    this.props.getChannelOptionBrowsers();
    this.props.getChannelOptionCategories();
  }

  render() {
    let resource = null;
    if (this.props.resourceId === 'eba545d8-2eee-4565-ab95-fe732c968e48') {
      resource = (<ChannelOptionBrowserList
        list={this.props.channelOptionBrowsers.list}
        statusBrowserCreate={this.props.setStatusChannelOptionBrowserCreate}
        statusBrowserEdit={this.props.setStatusChannelOptionBrowserEdit}
        getChannelOptionBrowsers={this.props.getChannelOptionBrowsers}
        channelOptionBrowsers={this.props.channelOptionBrowsers}
        createChannelOptionBrowser={this.props.createChannelOptionBrowser}
        deleteChannelOptionBrowser={this.props.deleteChannelOptionBrowser}
        updateChannelOptionBrowser={this.props.updateChannelOptionBrowser}
        page={this.props.page}
      />);
    } else if (this.props.resourceId === '7d242780-4048-4f73-9ba4-8b39e27584d4') {
      resource = (<ChannelOptionCategoryList
        list={this.props.channelOptionCategories.list}
        statusCategoryCreate={this.props.setStatusChannelOptionCategoryCreate}
        statusCategoryEdit={this.props.setStatusChannelOptionCategoryEdit}
        getChannelOptionCategories={this.props.getChannelOptionCategories}
        channelOptionCategories={this.props.channelOptionCategories}
        createChannelOptionCategory={this.props.createChannelOptionCategory}
        deleteChannelOptionCategory={this.props.deleteChannelOptionCategory}
        updateChannelOptionCategory={this.props.updateChannelOptionCategory}
        page={this.props.page}
      />);
    } else {
      resource = null;
    }
    return (
      <Layout
        pageTitle={
          pageTitle
            .concat(': ')
            .concat(this.props.resources.editing ? this.props.resources.editing.name : '...')
        }
        pageSubTitle=""
      >
        <div>
          <div className="row">
            <section className="col-lg-12">
              <div className="nav-tabs-custom resource-edit-box">
                <ul className="nav nav-tabs">
                  <li className="active">
                    <a href="#editResource" data-toggle="tab">
                      Edit Resource
                    </a>
                  </li>
                  <li>
                    <a href="#addOptionResource" data-toggle="tab">
                      Add New Option
                    </a>
                  </li>
                </ul>
                <div className="tab-content">
                  <div className="active tab-pane" id="editResource">
                    <div className="row">
                      <section className="col-lg-12">
                        {/* BOX: FORM OF UPDATE RESOURCE */}
                        <UpdateResourceForm
                          updateResource={this.props.updateResource}
                          resourceId={this.props.resourceId}
                          getResource={this.props.getResource}
                          deleteResource={this.props.deleteResource}
                          resource={this.props.resources.editing}
                        />
                        {/* /.col */}
                      </section>
                    </div>
                  </div>
                  <div className="tab-pane" id="addOptionResource">
                    {resource}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </Layout>
    );
  }

}

const mapState = (state) => ({
  resources: state.resources,
  channelOptionBrowsers: state.channelOptionBrowsers,
  channelOptionCategories: state.channelOptionCategories,
  page: state.page.resources,
});

const mapDispatch = {
  getResource,
  updateResource,
  deleteResource,
  getChannelOptionBrowsers,
  setStatusChannelOptionBrowserCreate,
  setStatusChannelOptionBrowserEdit,
  createChannelOptionBrowser,
  deleteChannelOptionBrowser,
  updateChannelOptionBrowser,
  getChannelOptionCategories,
  setStatusChannelOptionCategoryCreate,
  setStatusChannelOptionCategoryEdit,
  createChannelOptionCategory,
  deleteChannelOptionCategory,
  updateChannelOptionCategory,
  setCurrentPageResource,
};

export default withStyles(s)(connect(mapState, mapDispatch)(Resource));
