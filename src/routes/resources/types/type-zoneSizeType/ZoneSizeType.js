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
  getZoneSizeTypes,
  createZoneSizeType,
  deleteZoneSizeType,
  updateZoneSizeType,
} from '../../../../actions/zoneSizeTypes';
import {
  setStatusCreateZoneSizeType,
  setStatusUpdateZoneSizeType,
} from '../../../../actions/pages/resources';
import ZoneSizeTypeList from './ZoneSizeTypeList';
import s from './ZoneSizeType.css';

const pageTitle = 'Zone Size Type';

class ZoneSizeType extends Component {

  static propTypes = {
    resourceId: PropTypes.string.isRequired,
    page: PropTypes.object,
    resources: PropTypes.object,
    getZoneSizeTypes: PropTypes.func,
    zoneSizeTypes: PropTypes.object,
    setStatusCreateZoneSizeType: PropTypes.func,
    setStatusUpdateZoneSizeType: PropTypes.func,
    createZoneSizeType: PropTypes.func,
    deleteZoneSizeType: PropTypes.func,
    updateZoneSizeType: PropTypes.func,
    user: PropTypes.object,
  };

  componentWillMount() {
    this.props.getZoneSizeTypes();
  }

  render() {
    return (
      <Layout
        pageTitle={pageTitle}
        pageSubTitle=""
      >
        <div>
          <ZoneSizeTypeList
            list={this.props.zoneSizeTypes && this.props.zoneSizeTypes.list}
            statusCreateZoneSizeType={this.props.setStatusCreateZoneSizeType}
            statusUpdateZoneSizeType={this.props.setStatusUpdateZoneSizeType}
            getZoneSizeTypes={this.props.getZoneSizeTypes}
            zoneSizeTypes={this.props.zoneSizeTypes}
            createZoneSizeType={this.props.createZoneSizeType}
            deleteZoneSizeType={this.props.deleteZoneSizeType}
            updateZoneSizeType={this.props.updateZoneSizeType}
            page={this.props.page}
            user={this.props.user}
          />
        </div>
      </Layout>
    );
  }

}

const mapState = (state) => ({
  resources: state.resources,
  zoneSizeTypes: state.zoneSizeTypes,
  page: state.page.resources,
  user: state.user,
});

const mapDispatch = {
  getZoneSizeTypes,
  setStatusCreateZoneSizeType,
  setStatusUpdateZoneSizeType,
  createZoneSizeType,
  deleteZoneSizeType,
  updateZoneSizeType,
};

export default withStyles(s)(connect(mapState, mapDispatch)(ZoneSizeType));
