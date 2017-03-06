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
import {
  getResource,
  updateResource,
  deleteResource,
} from '../../../../actions/resource/resources';
import Layout from '../../../../components/Layout';
import UpdateResourceForm from '../UpdateResourceForm';
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
  };

  componentWillMount() {
    this.props.getResource(this.props.resourceId);
  }

  render() {
    return (
      <Layout
        pageTitle={pageTitle}
        pageSubTitle=""
      >
        <div>
          <UpdateResourceForm
            updateResource={this.props.updateResource}
            resourceId={this.props.resourceId}
            getResource={this.props.getResource}
            deleteResource={this.props.deleteResource}
            resource={this.props.resources.editing}
          />
        </div>
      </Layout>
    );
  }

}

const mapState = state => ({
  resources: state.resources,
  page: state.page.resources,
});

const mapDispatch = {
  getResource,
  updateResource,
  deleteResource,
};

export default withStyles(s)(connect(mapState, mapDispatch)(Resource));
