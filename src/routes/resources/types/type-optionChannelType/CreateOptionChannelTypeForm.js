/* global $ */

import React, { Component, PropTypes } from 'react';
import Link from '../../../../components/Link';

class CreateOptionChannelTypeForm extends Component {

  static propTypes = {
    id: PropTypes.string,
    optionChannelTypes: PropTypes.object,
    statusCreateOptionChannelType: PropTypes.func,
    page: PropTypes.object,
    createOptionChannelType: PropTypes.func,
    user: PropTypes.object,
  };

  clear() { // eslint-disable-line no-unused-vars, class-methods-use-this
    this.inputOptionChannelTypeName.value = null;
  }

  createOptionChannelType() {
    const name = this.inputOptionChannelTypeName.value;
    const status = this.inputOptionChannelTypeStatus.value;
    const isInputLink = document.getElementById('inputOptionChannelTypeIsInputLink').checked;
    const isSelectOption = document.getElementById('inputOptionChannelTypeIsSelectOption').checked;
    const isVariable = document.getElementById('inputOptionChannelTypeIsVariable').checked;
    const userId = this.props.user.id;
    if (name) {
      this.props.createOptionChannelType({
        name,
        isInputLink,
        isSelectOption,
        isVariable,
        status,
        userId,
      });
    }
    this.props.statusCreateOptionChannelType(false);
  }

  removeCreateForm() {
    this.props.statusCreateOptionChannelType(false);
  }

  render() {
    return (
      <div
        className="createOptionChannelType"
      >
        <div className="box-header with-border">
          <h3
            className="box-title"
          >
            Add New</h3>
          <div className="box-tools pull-right">
            <button
              className="btn btn-box-tool removeTypeBannerHtml"
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
                htmlFor="inputOptionChannelTypeName" className="col-sm-2 control-label"
              >Name</label>
              <div className="col-sm-10">
                <input
                  type="text" className="form-control" id="inputOptionChannelTypeName"
                  placeholder="Name"
                  ref={c => {
                    this.inputOptionChannelTypeName = c;
                  }}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-2">&nbsp;</div>
              <div className="col-sm-10">
                <label
                  htmlFor="inputOptionChannelTypeIsInputLink"
                  className="col-sm-4"
                >
                  <input
                    type="radio" name="r1" className="minimal"
                    id="inputOptionChannelTypeIsInputLink"
                  />
                  &nbsp; Input Link
                </label>
                <label
                  htmlFor="inputOptionChannelTypeIsSelectOption"
                  className="col-sm-4"
                >
                  <input
                    type="radio" name="r1" className="minimal"
                    id="inputOptionChannelTypeIsSelectOption"
                  />
                  &nbsp; Select Option
                </label>
                <label
                  htmlFor="inputOptionChannelTypeIsVariable"
                  className="col-sm-4"
                >
                  <input
                    type="radio" name="r1" className="minimal"
                    id="inputOptionChannelTypeIsVariable"
                  />
                  &nbsp; Variable
                </label>
              </div>
            </div>
            <div className="form-group">
              <label
                htmlFor="inputOptionChannelTypeStatus"
                className="col-sm-2 control-label"
              >Status</label>
              <div className="col-sm-10">
                <select
                  id="inputOptionChannelTypeStatus" className="form-control"
                  ref={c => {
                    this.inputOptionChannelTypeStatus = c;
                  }}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
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
            onClick={event => this.createOptionChannelType(event)}
          ><i className="fa fa-floppy-o" /> Save</Link>
        </div>
      </div>
    );
  }
}

export default CreateOptionChannelTypeForm;
