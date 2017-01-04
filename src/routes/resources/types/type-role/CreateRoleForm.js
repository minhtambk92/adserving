/* global $ */

import React, { Component, PropTypes } from 'react';
import Link from '../../../../components/Link';

class CreateRoleForm extends Component {

  static propTypes = {
    id: PropTypes.string,
    roles: PropTypes.object,
    setStatusCreateRole: PropTypes.func,
    getRoles: PropTypes.func,
    page: PropTypes.object,
    createRole: PropTypes.func,
  };

  clear() { // eslint-disable-line no-unused-vars, class-methods-use-this
    this.inputRoleName.value = null;
    this.inputUniqueName.value = null;
  }

  createRole() {
    const name = this.inputRoleName.value;
    const uniqueName = this.inputUniqueName.value;
    if (name) {
      this.props.createRole({
        uniqueName,
        name,
      });
    }
    this.props.setStatusCreateRole(false);
    // this.props.setPageZoneActiveTab('RoleZone');
  }

  removeCreateForm() {
    this.props.setStatusCreateRole(false);
  }

  render() {
    return (
      <div
        className="create-role"
      >
        <div className="box-header with-border">
          <h3
            className="box-title"
          >
            Add New</h3>
          <div className="box-tools pull-right">
            <button
              className="btn btn-box-tool remove-Role-zone"
              onClick={event => this.removeCreateForm(event)}
            >
              <i className="fa fa-times" />
            </button>
          </div>
        </div>
        <div className="box-body">
          <div className="form-horizontal">
            <div className="form-group">
              <label
                htmlFor="inputRoleName" className="col-sm-2 control-label"
              >Name</label>
              <div className="col-sm-10">
                <input
                  type="text" className="form-control" id="inputRoleName"
                  placeholder="Name"
                  ref={c => {
                    this.inputRoleName = c;
                  }}
                />
              </div>
            </div>
            <div className="form-group">
              <label
                htmlFor="inputUniqueName" className="col-sm-2 control-label"
              >UniqueName</label>
              <div className="col-sm-10">
                <input
                  type="text" className="form-control" id="inputUniqueName"
                  placeholder="uniqueName"
                  ref={c => {
                    this.inputUniqueName = c;
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="box-footer">
          <Link
            to="#"
            className="btn btn-app pull-right"
            onClick={event => this.clear(event)}
          >
            <i className="fa fa-undo" />
            Clear
          </Link>
          <Link
            to="#"
            className="btn btn-app pull-right"
            onClick={event => this.createRole(event)}
          ><i className="fa fa-floppy-o" /> Save</Link>
        </div>
      </div>
    );
  }
}

export default CreateRoleForm;
