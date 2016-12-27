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
  setStatusChannelOptionBrowserCreate,
  setStatusChannelOptionBrowserEdit,
  setCurrentPageResource,
} from '../../../../actions/pages/resources';
import UpdateResourceForm from '../UpdateResourceForm';
import ChannelOptionBrowserList from '../ChannelOptionBrowserList';
import s from './Resource.css';

const pageTitle = 'Resource';

class Resource extends Component {

  static propTypes = {
    resourceId: PropTypes.string.isRequired,
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
    setCurrentPageResource: PropTypes.func,
  };

  componentWillMount() {
    this.props.getResource(this.props.resourceId);
    this.props.getChannelOptionBrowsers();
    this.props.setCurrentPageResource(this.props.resourceId);
  }

  render() {
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
                  { this.props.page && this.props.page.currentPage === 'eba545d8-2eee-4565-ab95-fe732c968e48' ? (
                    <li>
                      <a href="#addOptionResource" data-toggle="tab">
                        Add New Option
                      </a>
                    </li>
                    ) : ('') }
                </ul>
                <div className="tab-content">
                  <div className="active tab-pane" id="editResource">
                    <div className="row">
                      <section className="col-lg-12">
                        {/* BOX: FORM OF UPDATE ROURSE */}
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
                  { this.props.page && this.props.page.currentPage === 'eba545d8-2eee-4565-ab95-fe732c968e48' ? (
                    <div className="tab-pane" id="addOptionResource">
                      <div className="row">
                        <div className="col-lg-12">
                          <ChannelOptionBrowserList
                            list={this.props.channelOptionBrowsers.list}
                            statusBrowserCreate={this.props.setStatusChannelOptionBrowserCreate}
                            statusBrowserEdit={this.props.setStatusChannelOptionBrowserEdit}
                            getChannelOptionBrowsers={this.props.getChannelOptionBrowsers}
                            channelOptionBrowsers={this.props.channelOptionBrowsers}
                            createChannelOptionBrowser={this.props.createChannelOptionBrowser}
                            deleteChannelOptionBrowser={this.props.deleteChannelOptionBrowser}
                            updateChannelOptionBrowser={this.props.updateChannelOptionBrowser}
                            page={this.props.page}
                          />
                        </div>
                      </div>
                    </div>
                    ) : ('')}
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
  setCurrentPageResource,
};

export default withStyles(s)(connect(mapState, mapDispatch)(Resource));
