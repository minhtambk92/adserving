/**
 * Created by Manhhailua on 11/9/16.
 */

import React, { Component, PropTypes } from 'react';

class CreateRoleForm extends Component {

  static propTypes = {
    createRole: PropTypes.func.isRequired,
  };

  clearInput() {
    this.inputRoleUniqueName.value = null;
    this.inputRoleName.value = null;
  }

  createRole() {
    const uniqueName = this.inputRoleUniqueName.value;
    const name = this.inputRoleName.value;

    if (uniqueName && name && status) {
      this.props.createRole({
        uniqueName,
        name,
      });

      this.clearInput();
    }
  }

  render() {
    return (
      <form className="form-horizontal">
        <div className="box-body">
          {/* uniqueName */}
          <div className="form-group">
            <label
              htmlFor="inputRoleUniqueName" className="col-sm-2 control-label"
            >Unique name</label>
            <div className="col-sm-10">
              <input
                type="text" className="form-control" id="inputRoleUniqueName"
                placeholder="user"
                ref={c => {
                  this.inputRoleUniqueName = c;
                }}
              />
            </div>
          </div>
          {/* name */}
          <div className="form-group">
            <label
              htmlFor="inputRoleName" className="col-sm-2 control-label"
            >Display name</label>
            <div className="col-sm-10">
              <input
                type="text" className="form-control" id="inputRoleName"
                placeholder="Role"
                ref={c => {
                  this.inputRoleName = c;
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
            onClick={event => this.createRole(event)}
          ><i className="fa fa-check" /> Confirm</a>
          {/* eslint-enable jsx-a11y/no-static-element-interactions */}
        </div>
        {/* /.box-footer */}
      </form>
    );
  }
}

export default CreateRoleForm;
