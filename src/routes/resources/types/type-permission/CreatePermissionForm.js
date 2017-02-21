/* global $ */

import React, { Component, PropTypes } from 'react';
import Link from '../../../../components/Link';

class CreatePermissionForm extends Component {

  static propTypes = {
    id: PropTypes.string,
    permissions: PropTypes.object,
    setStatusCreatePermission: PropTypes.func,
    getPermissions: PropTypes.func,
    page: PropTypes.object,
    createPermission: PropTypes.func,
  };

  clearInput() {
    this.inputPermissionName.value = null;
  }

  createPermission() {
    const name = this.inputPermissionName.value;
    const status = this.inputPermissionStatus.value;
    this.props.createPermission({
      name,
      status,
    });
    this.clearInput();
    this.props.setStatusCreatePermission(false);
  }

  removeCreateForm() {
    this.props.setStatusCreatePermission(false);
  }

  render() {
    return (
      <div
        className="create-permission"
      >
        <div className="box-header with-border">
          <h3
            className="box-title"
          >
            Add New</h3>
          <div className="box-tools pull-right">
            <button
              className="btn btn-box-tool remove-permission-zone"
              onClick={event => this.removeCreateForm(event)}
            >
              <i className="fa fa-times" />
            </button>
          </div>
        </div>
        <div className="box-body">
          <div className="form-horizontal">
            {/* name */}
            <div className="form-group">
              <label
                htmlFor="inputPermissionName"
                className="col-sm-2 control-label"
              >Name</label>
              <div className="col-sm-10">
                <input
                  type="text" className="form-control" id="inputPermissionName"
                  placeholder="John Doe"
                  ref={(c) => {
                    this.inputPermissionName = c;
                  }}
                />
              </div>
            </div>

            {/* status */}
            <div className="form-group">
              <label
                htmlFor="inputPermissionStatus"
                className="col-sm-2 control-label"
              >Status</label>
              <div className="col-sm-10">
                <select
                  id="inputPermissionStatus"
                  className="form-control"
                  ref={(c) => {
                    this.inputPermissionStatus = c;
                  }}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        {/* /.box-body */}
        <div className="box-footer">
          <Link
            to="#"
            className="btn btn-app pull-right"
            onClick={event => this.clearInput(event)}
          ><i className="fa fa-eraser" /> Clear</Link>
          <Link
            to="#"
            className="btn btn-app pull-right"
            onClick={event => this.createPermission(event)}
          ><i className="fa fa-check" /> Confirm</Link>
        </div>
        {/* /.box-footer */}
      </div>
    );
  }
}

export default CreatePermissionForm;
