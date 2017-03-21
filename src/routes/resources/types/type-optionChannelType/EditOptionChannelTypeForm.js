/* global $ */
/* global jQuery */

import React, { Component, PropTypes } from 'react';
import Link from '../../../../components/Link';

class EditOptionChannelTypeForm extends Component {

  static propTypes = {
    id: PropTypes.string,
    optionChannelTypes: PropTypes.object,
    statusUpdateOptionChannelType: PropTypes.func,
    page: PropTypes.object,
    optionChannelType: PropTypes.object,
    updateOptionChannelType: PropTypes.func,
    getOptionChannelTypes: PropTypes.func,
    user: PropTypes.object,
    createActivity: PropTypes.func,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.optionChannelType) {
      this.inputOptionChannelTypeName.value = nextProps.optionChannelType.name;
      this.inputOptionChannelTypeStatus.value = nextProps.optionChannelType.status;
    }
  }

  componentDidUpdate() {
    if (this.props.optionChannelType) {
      if (this.props.optionChannelType.isInputLink === true) {
        $('#inputOptionChannelTypeIsInputLink').iCheck('check');
      } else if (this.props.optionChannelType.isInputLink === false) {
        $('#inputOptionChannelTypeIsInputLink').iCheck('uncheck');
      }
      if (this.props.optionChannelType.isSelectOption === true) {
        $('#inputOptionChannelTypeIsSelectOption').iCheck('check');
      } else if (this.props.optionChannelType.isSelectOption === false) {
        $('#inputOptionChannelTypeIsSelectOption').iCheck('uncheck');
      }
      if (this.props.optionChannelType.isVariable === true) {
        $('#inputOptionChannelTypeIsVariable').iCheck('check');
      } else if (this.props.optionChannelType.isVariable === false) {
        $('#inputOptionChannelTypeIsVariable').iCheck('uncheck');
      }
    }
  }

  clear() { // eslint-disable-line no-unused-vars, class-methods-use-this
    this.inputOptionChannelTypeName.value = null;
  }

  save() {
    const optionChannelTypeObject = jQuery.extend({}, this.props.optionChannelType);
    const name = this.inputOptionChannelTypeName.value;
    const status = this.inputOptionChannelTypeStatus.value;

    const optionChannelType = { id: this.props.id };
    optionChannelType.name = name;
    optionChannelType.status = status;
    optionChannelType.isInputLink = document.getElementById('inputOptionChannelTypeIsInputLink').checked;
    optionChannelType.isSelectOption = document.getElementById('inputOptionChannelTypeIsSelectOption').checked;
    optionChannelType.isVariable = document.getElementById('inputOptionChannelTypeIsVariable').checked;
    this.props.updateOptionChannelType(optionChannelType).then(() => {
      const userId = this.props.user.id;
      const subject = `Option Channel Type ${name}`;
      const subjectId = this.props.optionChannelType.id;
      const action = 'updated';
      const other = JSON.stringify(optionChannelTypeObject);
      this.props.createActivity({ action,
        subject,
        subjectId,
        other,
        userId }).then(() => {
          this.props.getOptionChannelTypes();
        });
    });
    this.props.statusUpdateOptionChannelType(false);
  }

  removeEditForm() {
    this.props.statusUpdateOptionChannelType(false);
  }

  render() {
    return (
      <div
        className="editOptionChannelType"
      >
        <div className="box-header with-border">
          <h3
            className="box-title"
          >
            {`Edit: ${this.props.optionChannelType.name}`}</h3>
          <div className="box-tools pull-right">
            <button
              className="btn btn-box-tool remove-OptionChannelType-zone"
              onClick={event => this.removeEditForm(event)}
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
                  ref={(c) => {
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
                htmlFor="inputEditOptionChannelTypeStatus"
                className="col-sm-2 control-label"
              >Status</label>
              <div className="col-sm-10">
                <select
                  id="inputOptionChannelTypeStatus" className="form-control"
                  ref={(c) => {
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
            onClick={event => this.save(event)}
          ><i className="fa fa-floppy-o" /> Save</Link>
        </div>
      </div>
    );
  }
}

export default EditOptionChannelTypeForm;
