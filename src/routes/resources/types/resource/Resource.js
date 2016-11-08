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
import { getResource, updateResource, deleteResource } from '../../../../actions/resources';
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
      name,
    } = nextProps.resources && (nextProps.resources.editing || {});

    this.inputResourceUniqueName.value = uniqueName;
    this.inputResourceName.value = name;
  }

  clearInput() {
    this.inputResourceUniqueName.value = null;
    this.inputResourceName.value = null;
  }

  updateResource() {
    const uniqueName = this.inputResourceUniqueName.value;
    const name = this.inputResourceName.value;

    const resource = { id: this.props.resourceId };

    if (uniqueName && uniqueName !== this.props.resources.editing.uniqueName) {
      resource.uniqueName = uniqueName;
    }

    if (name && name !== this.props.resources.editing.name) {
      resource.name = name;
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
                {/* form start */}
                <form className="form-horizontal">
                  <div className="box-body">
                    <div className="form-group">
                      <label
                        htmlFor="inputResourceUniqueName" className="col-sm-3 control-label"
                      >Webresource domain</label>
                      <div className="col-sm-9">
                        <input
                          type="text" className="form-control" id="inputResourceUniqueName"
                          placeholder="admin"
                          ref={c => {
                            this.inputResourceUniqueName = c;
                          }}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="inputResourceName" className="col-sm-3 control-label">Name</label>
                      <div className="col-sm-9">
                        <input
                          type="text" className="form-control" id="inputResourceName"
                          placeholder="Administrator"
                          ref={c => {
                            this.inputResourceName = c;
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  {/* /.box-body */}
                  <div className="box-footer">
                    {/* eslint-disable jsx-a11y/no-static-element-interactions */}
                    <Link
                      to="/resource/resource"
                      className="btn btn-app pull-right"
                    ><i className="fa fa-undo" /> Cancel</Link>
                    <Link
                      to="/resource/resource"
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
