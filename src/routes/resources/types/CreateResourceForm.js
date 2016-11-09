/**
 * Created by Manhhailua on 11/9/16.
 */

import React, { Component, PropTypes } from 'react';

class CreateResourceForm extends Component {

  static propTypes = {
    createResource: PropTypes.func.isRequired,
  };

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

  render() {
    return (
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
    );
  }
}

export default CreateResourceForm;
