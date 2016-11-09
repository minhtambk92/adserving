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
    this.inputResourceModelName.value = null;
    this.inputResourceName.value = null;
    this.inputResourceDescription.value = null;
  }

  createResource() {
    const uniqueName = this.inputResourceUniqueName.value;
    const modelName = this.inputResourceModelName.value;
    const name = this.inputResourceName.value;
    const hasMeta = this.inputResourceHasMeta.value;
    const description = this.inputResourceDescription.value;
    const status = this.inputResourceStatus.value;

    if (uniqueName && modelName && name && hasMeta && description && status) {
      this.props.createResource({
        uniqueName,
        modelName,
        name,
        hasMeta,
        description,
        status,
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
          {/* modelName */}
          <div className="form-group">
            <label
              htmlFor="inputResourceModelName" className="col-sm-2 control-label"
            >Model name</label>
            <div className="col-sm-10">
              <input
                type="text" className="form-control" id="inputResourceModelName"
                placeholder="User"
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
            >Display name</label>
            <div className="col-sm-10">
              <input
                type="text" className="form-control" id="inputResourceName"
                placeholder="Resource"
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
