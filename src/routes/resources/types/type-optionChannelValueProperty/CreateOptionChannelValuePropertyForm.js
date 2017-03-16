/* global $ */

import React, { Component, PropTypes } from 'react';
import Link from '../../../../components/Link';

class CreateOptionChannelValuePropertyForm extends Component {

  static propTypes = {
    id: PropTypes.string,
    optionChannelValueProperties: PropTypes.object,
    statusCreateOptionChannelValueProperty: PropTypes.func,
    page: PropTypes.object,
    createOptionChannelValueProperty: PropTypes.func,
    optionChannelValueList: PropTypes.array,
    currentOptionChannelValueId: PropTypes.string,
    user: PropTypes.object,
    createActivity: PropTypes.func,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentOptionChannelValueId && nextProps.currentOptionChannelValueId !== 'null' && nextProps.currentOptionChannelValueId !== '') {
      this.inputOptionChannelValueId.value = nextProps.currentOptionChannelValueId;
    }
  }

  clear() { // eslint-disable-line no-unused-vars, class-methods-use-this
    this.inputOptionChannelValuePropertyName.value = null;
  }

  createOptionChannelValueProperty() {
    const name = this.inputOptionChannelValuePropertyName.value;
    const status = this.inputOptionOptionChannelValuePropertyStatus.value;
    const optionChannelValueId = this.inputOptionChannelValueId.value;
    const userId = this.props.user.id;
    const description = this.inputOptionChannelValueDescription.value;
    if (name) {
      this.props.createOptionChannelValueProperty({
        name,
        status,
        optionChannelValueId,
        userId,
        description,
      }).then(() => {
        if (this.props.optionChannelValueProperties &&
          this.props.optionChannelValueProperties.list.length > 0) {
          /* eslint-disable no-shadow */
          const userId = this.props.user.id;
          const subject = `Option Channel Value Property ${name}`;
          const subjectId = this.props.optionChannelValueProperties.list[0].id;
          const action = 'created';
          const other = '';
          this.props.createActivity({ action,
            subject,
            subjectId,
            other,
            userId });
        }
      });
    }
    this.props.statusCreateOptionChannelValueProperty(false);
  }

  removeCreateForm() {
    this.props.statusCreateOptionChannelValueProperty(false);
  }

  render() {
    return (
      <div
        className="createOptionChannelValueProperty"
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
                htmlFor="inputOptionChannelValuePropertyName" className="col-sm-2 control-label"
              >Name</label>
              <div className="col-sm-10">
                <input
                  type="text" className="form-control" id="inputOptionChannelValuePropertyName"
                  placeholder="Name"
                  ref={(c) => {
                    this.inputOptionChannelValuePropertyName = c;
                  }}
                />
              </div>
            </div>
            <div className="form-group">
              <label
                htmlFor="inputOptionChannelValueId"
                className="col-sm-2 control-label"
              >Channel Type</label>
              <div className="col-sm-10">
                <select
                  id="inputOptionChannelValueId" className="form-control"
                  ref={(c) => {
                    this.inputOptionChannelValueId = c;
                  }}
                >
                  {this.props.optionChannelValueList &&
                  this.props.optionChannelValueList.map(option => (
                    <option
                      key={option.id} value={option.id}
                    >{option.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-group">
              <label
                htmlFor="inputOptionChannelValuePropertyStatus"
                className="col-sm-2 control-label"
              >Status</label>
              <div className="col-sm-10">
                <select
                  id="inputOptionOptionChannelValuePropertyStatus" className="form-control"
                  ref={(c) => {
                    this.inputOptionOptionChannelValuePropertyStatus = c;
                  }}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label
                htmlFor="inputOptionChannelValueDescription"
                className="col-sm-2 control-label"
              >Description</label>
              <div className="col-sm-10">
                <textarea
                  className="form-control" id="inputOptionChannelValueDescription"
                  rows="5" placeholder="More info..."
                  ref={(c) => {
                    this.inputOptionChannelValueDescription = c;
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
            onClick={event => this.createOptionChannelValueProperty(event)}
          ><i className="fa fa-floppy-o" /> Save</Link>
        </div>
      </div>
    );
  }
}

export default CreateOptionChannelValuePropertyForm;
