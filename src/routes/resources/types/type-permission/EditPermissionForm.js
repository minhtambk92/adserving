/* global $ */

import React, { Component, PropTypes } from 'react';
import Link from '../../../../components/Link';

class EditPermissionForm extends Component {

  static propTypes = {
    id: PropTypes.string,
    permission: PropTypes.object,
    setStatusUpdatePermission: PropTypes.func,
    getPermissions: PropTypes.func,
    page: PropTypes.object,
    updatePermission: PropTypes.func,
    user: PropTypes.object,
    createActivity: PropTypes.func,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.permission) {
      this.inputPermissionName.value = nextProps.permission.name;
      this.inputPermissionStatus.value = nextProps.permission.status;
    }
  }

  clearInput() {
    this.inputPermissionName.value = null;
  }

  save() {
    const name = this.inputPermissionName.value;
    const status = this.inputPermissionStatus.value;

    const permissionObject = this.props.permission;
    const permission = { id: this.props.id };

    permission.name = name;
    permission.status = status;

    this.props.updatePermission(permission).then(() => {
      const userId = this.props.user.id;
      const subject = `Permission ${name}`;
      const subjectId = this.props.permission.id;
      const action = 'updated';
      const other = JSON.stringify(permissionObject);
      this.props.createActivity({ action,
        subject,
        subjectId,
        other,
        userId }).then(() => {
          this.props.getPermissions();
        });
    });

    this.clearInput();
    this.props.setStatusUpdatePermission(false);
  }

  removeEditForm() {
    this.props.setStatusUpdatePermission(false);
  }

  render() {
    return (
      <div
        className="edit-permission"
      >
        <div className="box-header with-border">
          <h3
            className="box-title"
          >
            {`Edit: ${this.props.permission ? this.props.permission.name : ''}`}</h3>
          <div className="box-tools pull-right">
            <button
              className="btn btn-box-tool remove-permission-zone"
              onClick={event => this.removeEditForm(event)}
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
            onClick={event => this.save(event)}
          ><i className="fa fa-check" /> Confirm</Link>
        </div>
        {/* /.box-footer */}
      </div>
    );
  }
}

export default EditPermissionForm;
