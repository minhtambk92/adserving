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
  getZoneTypes,
  createZoneType,
  deleteZoneType,
  updateZoneType,
} from '../../../../actions/zoneTypes';
import {
  setStatusCreateZoneType,
  setStatusUpdateZoneType,
} from '../../../../actions/pages/resources';
import { createActivity } from '../../../../actions/activities';
import ZoneTypeList from './ZoneTypeList';
import s from './ZoneType.css';

const pageTitle = 'Zone Type';

class ZoneType extends Component {

  static propTypes = {
    resourceId: PropTypes.string.isRequired,
    page: PropTypes.object,
    resources: PropTypes.object,
    getZoneTypes: PropTypes.func,
    zoneTypes: PropTypes.object,
    setStatusCreateZoneType: PropTypes.func,
    setStatusUpdateZoneType: PropTypes.func,
    createZoneType: PropTypes.func,
    deleteZoneType: PropTypes.func,
    updateZoneType: PropTypes.func,
    user: PropTypes.object,
    createActivity: PropTypes.func,
    activities: PropTypes.object,
  };

  componentWillMount() {
    this.props.getZoneTypes();
  }

  render() {
    return (
      <Layout
        pageTitle={pageTitle}
        pageSubTitle=""
      >
        <div>
          <ZoneTypeList
            list={this.props.zoneTypes && this.props.zoneTypes.list}
            statusCreateZoneType={this.props.setStatusCreateZoneType}
            statusUpdateZoneType={this.props.setStatusUpdateZoneType}
            getZoneTypes={this.props.getZoneTypes}
            zoneTypes={this.props.zoneTypes}
            createZoneType={this.props.createZoneType}
            deleteZoneType={this.props.deleteZoneType}
            updateZoneType={this.props.updateZoneType}
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
  zoneTypes: state.zoneTypes,
  page: state.page.resources,
  user: state.user,
  activities: state.activities,
});

const mapDispatch = {
  getZoneTypes,
  setStatusCreateZoneType,
  setStatusUpdateZoneType,
  createZoneType,
  deleteZoneType,
  updateZoneType,
  createActivity,
};

export default withStyles(s)(connect(mapState, mapDispatch)(ZoneType));
