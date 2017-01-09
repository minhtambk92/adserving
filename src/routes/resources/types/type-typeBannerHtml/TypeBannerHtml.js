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
  getAllTypeBannerHtml,
  createTypeBannerHtml,
  deleteTypeBannerHtml,
  updateTypeBannerHtml,
} from '../../../../actions/allTypeBannerHtml';
import {
  setStatusCreateTypeBannerHtml,
  setStatusUpdateTypeBannerHtml,
} from '../../../../actions/pages/resources';
import TypeBannerHtmlList from './TypeBannerHtmlList';
import s from './TypeBannerHtml.css';

const pageTitle = 'Type Banner HTML';

class TypeBannerHtml extends Component {

  static propTypes = {
    resourceId: PropTypes.string.isRequired,
    page: PropTypes.object,
    resources: PropTypes.object,
    getAllTypeBannerHtml: PropTypes.func,
    allTypeBannerHtml: PropTypes.object,
    setStatusCreateTypeBannerHtml: PropTypes.func,
    setStatusUpdateTypeBannerHtml: PropTypes.func,
    createTypeBannerHtml: PropTypes.func,
    deleteTypeBannerHtml: PropTypes.func,
    updateTypeBannerHtml: PropTypes.func,
  };

  componentWillMount() {
    this.props.getAllTypeBannerHtml();
  }

  render() {
    return (
      <Layout
        pageTitle={pageTitle}
        pageSubTitle=""
      >
        <div>
          <TypeBannerHtmlList
            list={this.props.allTypeBannerHtml && this.props.allTypeBannerHtml.list}
            statusCreateTypeBannerHtml={this.props.setStatusCreateTypeBannerHtml}
            statusUpdateTypeBannerHtml={this.props.setStatusUpdateTypeBannerHtml}
            getAllTypeBannerHtml={this.props.getAllTypeBannerHtml}
            allTypeBannerHtml={this.props.allTypeBannerHtml}
            createTypeBannerHtml={this.props.createTypeBannerHtml}
            deleteTypeBannerHtml={this.props.deleteTypeBannerHtml}
            updateTypeBannerHtml={this.props.updateTypeBannerHtml}
            page={this.props.page}
          />
        </div>
      </Layout>
    );
  }

}

const mapState = (state) => ({
  resources: state.resources,
  allTypeBannerHtml: state.allTypeBannerHtml,
  page: state.page.resources,
});

const mapDispatch = {
  getAllTypeBannerHtml,
  setStatusCreateTypeBannerHtml,
  setStatusUpdateTypeBannerHtml,
  createTypeBannerHtml,
  deleteTypeBannerHtml,
  updateTypeBannerHtml,
};

export default withStyles(s)(connect(mapState, mapDispatch)(TypeBannerHtml));
