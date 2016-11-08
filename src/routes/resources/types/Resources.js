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
import Link from '../../../components/Link';
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

  componentDidMount() {
    /* eslint-disable no-undef */
    $('input[type="checkbox"].inputChooseResource').iCheck({
      checkboxClass: 'icheckbox_minimal-blue',
      radioClass: 'iradio_minimal-blue',
    });
    /* eslint-enable no-undef */
  }

  componentDidUpdate() {
    /* eslint-disable no-undef */
    // iCheck for checkbox and radio inputs
    $('input[type="checkbox"].inputChooseResource').iCheck({
      checkboxClass: 'icheckbox_minimal-blue',
      radioClass: 'iradio_minimal-blue',
    });
    /* eslint-enable no-undef */
  }

  clearInput() {
    this.inputResourceUniqueName.value = null;
    this.inputResourceName.value = null;
  }

  createResource() {
    const uniqueName = this.inputResourceUniqueName.value;
    const name = this.inputResourceName.value;

    if (uniqueName && name) {
      this.props.createResource({ uniqueName, name });
      this.clearInput();
    }
  }

  searchFor(event) {
    event.persist();
    this.setState((previousState) => ({
      ...previousState,
      searchText: event.target.value.trim(),
    }));
  }

  isIndexOf(...args) {
    for (let i = 0; i < args.length; i += 1) {
      if (args[i].toLowerCase().indexOf(this.state.searchText.toLowerCase()) !== -1) {
        return true;
      }
    }
    return false;
  }

  addUserToThisResource(resourceId) {
    this.props.setUsersFilters({ resourceId });
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
                <form className="form-horizontal">
                  <div className="box-body">
                    <div className="form-group">
                      <label
                        htmlFor="inputResourceUniqueName" className="col-sm-2 control-label"
                      >Unique name</label>
                      <div className="col-sm-10">
                        <input
                          type="text" className="form-control" id="inputResourceUniqueName"
                          placeholder="user"
                          ref={c => {
                            this.inputResourceUniqueName = c;
                          }}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="inputResourceName" className="col-sm-2 control-label"
                      >Display name</label>
                      <div className="col-sm-10">
                        <input
                          type="text" className="form-control" id="inputResourceName"
                          placeholder="User"
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
                    <a
                      className="btn btn-app pull-right"
                      onClick={event => this.clearInput(event)}
                    ><i className="fa fa-eraser" /> Clear</a>
                    <a
                      className="btn btn-app pull-right"
                      onClick={event => this.createResource(event)}
                    ><i className="fa fa-check" /> Confirm</a>
                    {/* eslint-enable jsx-a11y/no-static-element-interactions */}
                  </div>
                  {/* /.box-footer */}
                </form>
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

                  <div className="box-tools">
                    <div className="input-group input-group-sm" style={{ width: 150 }}>
                      <input
                        type="text" name="inputSearchResources"
                        className="form-control pull-right"
                        placeholder="Search..."
                        onChange={event => this.searchFor(event)}
                      />
                      <div className="input-group-btn">
                        <button
                          type="submit" className="btn btn-default"
                        ><i className="fa fa-search" /></button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /.box-header */}
                <div className="box-body table-responsive no-padding">
                  <table id="example1" className="table table-hover">
                    <thead>
                      <tr>
                        <th><input type="checkbox" className="inputChooseResource" /></th>
                        <th>Alias</th>
                        <th>Name</th>
                        <th>&nbsp;</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.props.resources.list && this.props.resources.list.map(resource => {
                        if (this.isIndexOf(resource.uniqueName, resource.name)) {
                          return (
                            <tr key={resource.id}>
                              <td><input type="checkbox" className="inputChooseResource" /></td>
                              <td>
                                <Link to={`/resource/resource/${resource.id}`}>{resource.uniqueName}</Link>
                              </td>
                              <td>{resource.name}</td>
                              <td>
                                <Link
                                  to="/resource/user"
                                  onClick={event => this.addUserToThisResource(resource.id, event)}
                                >Add New User</Link>
                              </td>
                            </tr>
                          );
                        }
                        return false;
                      })}
                    </tbody>
                    <tfoot>
                      <tr>
                        <th><input type="checkbox" className="inputChooseResource" /></th>
                        <th>Alias</th>
                        <th>Name</th>
                        <th>&nbsp;</th>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                {/* /.box-body */}
                <div className="box-footer clearfix">
                  <ul className="pagination pagination-sm no-margin pull-right">
                    <li><a>&laquo;</a></li>
                    <li><a>1</a></li>
                    <li><a>2</a></li>
                    <li><a>3</a></li>
                    <li><a>&raquo;</a></li>
                  </ul>
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
