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
import Link from '../../../../components/Link';
import s from './Resource.css';

const pageTitle = 'Resource';

class Resource extends Component {

  static propTypes = {
    resourceId: PropTypes.string.isRequired,
    resources: PropTypes.object,
    getResource: PropTypes.func,
    updateResource: PropTypes.func,
    deleteResource: PropTypes.func,
  };

  componentWillMount() {
    this.props.getResource(this.props.resourceId);
  }

  componentWillReceiveProps(nextProps) {
    const {
      uniqueName,
      modelName,
      name,
      hasMeta,
      description,
      status,
    } = nextProps.resources.editing;

    this.inputResourceUniqueName.value = uniqueName;
    this.inputResourceModelName.value = modelName;
    this.inputResourceName.value = name;
    this.inputResourceHasMeta.value = hasMeta;
    this.inputResourceDescription.value = description;
    this.inputResourceStatus.value = status;
  }

  clearInput() {
    this.inputResourceUniqueName.value = null;
    this.inputResourceName.value = null;
  }

  updateResource() {
    const uniqueName = this.inputResourceUniqueName.value;
    const modelName = this.inputResourceModelName.value;
    const name = this.inputResourceName.value;
    const hasMeta = this.inputResourceHasMeta.value;
    const description = this.inputResourceDescription.value;
    const status = this.inputResourceStatus.value;

    const resource = { id: this.props.resourceId };

    if (modelName && modelName !== this.props.resources.editing.modelName) {
      resource.modelName = modelName;
    }

    if (uniqueName && uniqueName !== this.props.resources.editing.uniqueName) {
      resource.uniqueName = uniqueName;
    }

    if (name && name !== this.props.resources.editing.name) {
      resource.name = name;
    }

    if (hasMeta && hasMeta !== this.props.resources.editing.hasMeta) {
      resource.hasMeta = hasMeta;
    }

    if (description && description !== this.props.resources.editing.description) {
      resource.description = description;
    }

    if (status && status !== this.props.resources.editing.status) {
      resource.status = status;
    }

    this.props.updateResource(resource);
  }

  deleteResource() {
    this.props.deleteResource(this.props.resourceId);
  }

  render() {
    return (
      <Layout
        pageTitle={
          pageTitle
            .concat(': ')
            .concat(this.props.resources.editing ? this.props.resources.editing.name : '...')
        }
        pageSubTitle={this.props.resources.editing ? this.props.resources.editing.uniqueName : ''}
      >
        <div>

          <div className="row">
            <section className="col-lg-12">
              {/* BOX: UPDATE */}
              <div className="box box-primary">
                <div className="box-header with-border">
                  <h3 className="box-title">Change resource information</h3>
                  <div className="box-tools pull-right">
                    <button type="button" className="btn btn-box-tool" data-widget="collapse">
                      <i className="fa fa-minus" />
                    </button>
                  </div>
                </div>
                {/* /.box-header */}
                <form className="form-horizontal">
                  <div className="box-body">
                    {/* uniqueName */}
                    <div className="form-group">
                      <label
                        htmlFor="inputResourceUniqueName" className="col-sm-2 control-label"
                      >Unique name</label>
                      <div className="col-sm-10">
                        <input
                          type="text" className="form-control" id="inputResourceUniqueName"
                          placeholder="admin"
                          ref={c => {
                            this.inputResourceUniqueName = c;
                          }}
                        />
                      </div>
                    </div>
                    {/* modelName */}
                    <div className="form-group">
                      <label
                        htmlFor="inputResourceModelName" className="col-sm-2 control-label"
                      >Model name</label>
                      <div className="col-sm-10">
                        <input
                          type="text" className="form-control" id="inputResourceModelName"
                          placeholder="admin"
                          ref={c => {
                            this.inputResourceModelName = c;
                          }}
                        />
                      </div>
                    </div>
                    {/* name */}
                    <div className="form-group">
                      <label
                        htmlFor="inputResourceName" className="col-sm-2 control-label"
                      >Name</label>
                      <div className="col-sm-10">
                        <input
                          type="text" className="form-control" id="inputResourceName"
                          placeholder="Administrator"
                          ref={c => {
                            this.inputResourceName = c;
                          }}
                        />
                      </div>
                    </div>
                    {/* hasMeta */}
                    <div className="form-group">
                      <label
                        htmlFor="inputResourceHasMeta"
                        className="col-sm-2 control-label"
                      >Has meta value</label>
                      <div className="col-sm-10">
                        <select
                          id="inputResourceHasMeta"
                          className="form-control"
                          ref={c => {
                            this.inputResourceHasMeta = c;
                          }}
                        >
                          <option value="true">Yes</option>
                          <option value="false">No</option>
                        </select>
                      </div>
                    </div>
                    {/* description */}
                    <div className="form-group">
                      <label
                        htmlFor="inputResourceDescription" className="col-sm-2 control-label"
                      >Description</label>
                      <div className="col-sm-10">
                        <textarea
                          className="form-control" id="inputResourceDescription"
                          placeholder="Resource description..."
                          ref={c => {
                            this.inputResourceDescription = c;
                          }}
                        />
                      </div>
                    </div>
                    {/* status */}
                    <div className="form-group">
                      <label
                        htmlFor="inputResourceStatus"
                        className="col-sm-2 control-label"
                      >Status</label>
                      <div className="col-sm-10">
                        <select
                          id="inputResourceStatus"
                          className="form-control"
                          ref={c => {
                            this.inputResourceStatus = c;
                          }}
                        >
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  {/* /.box-body */}
                  <div className="box-footer">
                    {/* eslint-disable jsx-a11y/no-static-element-interactions */}
                    <Link
                      to="/resource/type"
                      className="btn btn-app pull-right"
                    ><i className="fa fa-undo" /> Cancel</Link>
                    <Link
                      to="/resource/type"
                      className="btn btn-app pull-right"
                      onClick={event => this.deleteResource(event)}
                    ><i className="fa fa-trash-o" /> Delete</Link>
                    <a
                      className="btn btn-app pull-right"
                      onClick={event => this.updateResource(event)}
                    ><i className="fa fa-floppy-o" /> Save</a>
                    {/* eslint-enable jsx-a11y/no-static-element-interactions */}
                  </div>
                  {/* /.box-footer */}
                </form>
              </div>
              {/* /.col */}
            </section>
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
  getResource,
  updateResource,
  deleteResource,
};

export default withStyles(s)(connect(mapState, mapDispatch)(Resource));
