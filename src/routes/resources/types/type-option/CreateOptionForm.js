/* global $ */

import React, { Component, PropTypes } from 'react';
import { ICheck } from '../../../../components/UI';
import Link from '../../../../components/Link';

class CreateOptionForm extends Component {

  static propTypes = {
    id: PropTypes.string,
    options: PropTypes.object,
    setStatusCreateOption: PropTypes.func,
    getOptions: PropTypes.func,
    page: PropTypes.object,
    createOption: PropTypes.func,
  };

  clearInput() {
    this.inputOptionStatus.value = null;
    this.inputOptionName.value = null;
    this.inputOptionValue.value = null;
  }

  createOption() {
    const name = this.inputOptionName.value;
    const value = this.inputOptionValue.value;
    const autoLoad = document.getElementById('inputOptionAutoLoad').value;
    const status = this.inputOptionStatus.value;
    this.props.createOption({
      name,
      value,
      autoLoad,
      status,
    });
    this.clearInput();
    this.props.setStatusCreateOption(false);
  }

  removeCreateForm() {
    this.props.setStatusCreateOption(false);
  }

  render() {
    return (
      <div
        className="create-Option"
      >
        <div className="box-header with-border">
          <h3
            className="box-title"
          >
            Add New</h3>
          <div className="box-tools pull-right">
            <button
              className="btn btn-box-tool remove-Option-zone"
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
                htmlFor="inputOptionName"
                className="col-sm-2 control-label"
              >Name</label>
              <div className="col-sm-10">
                <input
                  type="text" className="form-control" id="inputOptionName"
                  placeholder="John Doe"
                  ref={c => {
                    this.inputOptionName = c;
                  }}
                />
              </div>
            </div>
            {/* value */}
            <div className="form-group">
              <label
                htmlFor="inputOptionValue"
                className="col-sm-2 control-label"
              >Value</label>
              <div className="col-sm-10">
                <input
                  type="text" className="form-control" id="inputOptionValue"
                  placeholder="share"
                  ref={c => {
                    this.inputOptionValue = c;
                  }}
                />
              </div>
            </div>
            {/* autoLoad */}
            <div className="form-group">
              <label
                htmlFor="inputOptionAutoLoad"
                className="col-sm-2 control-label"
              >AutoLoad</label>
              <div className="col-sm-10 checkbox">
                <ICheck
                  type="checkbox" id="inputOptionAutoLoad" className="form-control"
                  ref={c => {
                    this.inputOptionAutoLoad = c;
                  }}
                />
              </div>
            </div>
            {/* status */}
            <div className="form-group">
              <label
                htmlFor="inputOptionStatus"
                className="col-sm-2 control-label"
              >Status</label>
              <div className="col-sm-10">
                <select
                  id="inputOptionStatus"
                  className="form-control"
                  ref={c => {
                    this.inputOptionStatus = c;
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
            onClick={event => this.createOption(event)}
          ><i className="fa fa-check" /> Confirm</Link>
        </div>
        {/* /.box-footer */}
      </div>
    );
  }
}

export default CreateOptionForm;
