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
import { getResources, createResource } from '../../../actions/resources';
import { setUsersFilters } from '../../../actions/users';
import Layout from '../../../components/Layout';
import CreateResourceForm from './CreateResourceForm';
import ResourceList from './ResourceList';
import s from './Resources.css';

const pageTitle = 'Resources Management';
const pageSubTitle = 'Control panel';

class Resources extends Component {

  static propTypes = {
    resources: PropTypes.object,
    getResources: PropTypes.func,
    createResource: PropTypes.func,
    setUsersFilters: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      searchText: '',
    };
  }

  componentWillMount() {
    this.props.getResources();
  }

  render() {
    return (
      <Layout pageTitle={pageTitle} pageSubTitle={pageSubTitle}>
        <div>

          <div className="row">
            <section className="col-lg-12">
              {/* BOX: CREATE */}
              <div className="box box-primary collapsed-box">
                <div className="box-header with-border">
                  <h3 className="box-title">Create a new resource</h3>
                  <div className="box-tools pull-right">
                    <button type="button" className="btn btn-box-tool" data-widget="collapse">
                      <i className="fa fa-plus" />
                    </button>
                  </div>
                </div>
                {/* /.box-header */}
                {/* form start */}
                <CreateResourceForm createResource={this.createResource} />
              </div>
              {/* /.col */}
            </section>
          </div>

          <div className="row">
            <section className="col-lg-12">
              <div className="box box-info">
                <div className="box-header with-border">
                  <h3 className="box-title">List of resources</h3>
                </div>
                {/* /.box-header */}
                <div className="box-body">
                  <ResourceList list={this.props.resources.list} />
                </div>
              </div>
              {/* /.box */}
            </section>
            {/* /.col */}
          </div>

        </div>
      </Layout>
    );
  }

}

const mapState = (state) => ({
  resources: state.resources,
});

const mapDispatch = {
  getResources,
  createResource,
  setUsersFilters,
};

export default withStyles(s)(connect(mapState, mapDispatch)(Resources));
