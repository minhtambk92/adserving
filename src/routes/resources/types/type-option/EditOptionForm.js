/* global $ */

import React, { Component, PropTypes } from 'react';
import { ICheck } from '../../../../components/UI';
import Link from '../../../../components/Link';

class EditOptionForm extends Component {

  static propTypes = {
    id: PropTypes.string,
    option: PropTypes.object,
    setStatusUpdateOption: PropTypes.func,
    getOptions: PropTypes.func,
    page: PropTypes.object,
    updateOption: PropTypes.func,
    user: PropTypes.object,
    createActivity: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      currentRoles: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.option) {
      this.inputOptionName.value = nextProps.option.name;
      this.inputOptionValue.value = nextProps.option.value;
      this.inputOptionStatus.value = nextProps.option.status;
    }
  }

  componentDidUpdate() {
    /* eslint-disable no-undef */
    if (this.props.option) {
      if (this.props.option.autoLoad === true) {
        $('#inputOptionAutoLoad').iCheck('check');
      } else {
        $('#inputOptionAutoLoad').iCheck('uncheck');
      }
    }
    /* eslint-enable no-undef */
  }

  clearInput() {
    this.inputOptionStatus.value = null;
    this.inputOptionName.value = null;
    this.inputOptionValue.value = null;
  }

  save() {
    const name = this.inputOptionName.value;
    const value = this.inputOptionValue.value;
    const autoLoad = document.getElementById('inputOptionAutoLoad').value;
    const status = this.inputOptionStatus.value;

    const optionObject = this.props.option;
    const option = { id: this.props.id };
    option.name = name;
    option.value = value;
    option.autoLoad = autoLoad;
    option.status = status;
    this.props.updateOption(option).then(() => {
      const userId = this.props.user.id;
      const subject = `Option ${name}`;
      const subjectId = this.props.option.id;
      const action = 'updated';
      const other = JSON.stringify(optionObject);
      this.props.createActivity({ action,
        subject,
        subjectId,
        other,
        userId }).then(() => {
          this.props.getOptions();
        });
    });

    this.clearInput();
    this.props.setStatusUpdateOption(false);
  }

  removeEditForm() {
    this.props.setStatusUpdateOption(false);
  }

  render() {
    return (
      <div
        className="edit-Option"
      >
        <div className="box-header with-border">
          <h3
            className="box-title"
          >
            {`Edit: ${this.props.option ? this.props.option.name : ''}`}</h3>
          <div className="box-tools pull-right">
            <button
              className="btn btn-box-tool remove-Option-zone"
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
                htmlFor="inputOptionName"
                className="col-sm-2 control-label"
              >Name</label>
              <div className="col-sm-10">
                <input
                  type="text" className="form-control" id="inputOptionName"
                  placeholder="John Doe"
                  ref={(c) => {
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
                  ref={(c) => {
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
                  ref={(c) => {
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
                  ref={(c) => {
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
            onClick={event => this.save(event)}
          ><i className="fa fa-check" /> Confirm</Link>
        </div>
        {/* /.box-footer */}
      </div>
    );
  }
}

export default EditOptionForm;
