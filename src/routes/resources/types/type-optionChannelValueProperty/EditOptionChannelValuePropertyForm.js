/* global $ */
/* global jQuery */

import React, { Component, PropTypes } from 'react';
import Link from '../../../../components/Link';

class EditOptionChannelValuePropertyForm extends Component {

  static propTypes = {
    id: PropTypes.string,
    optionChannelValueProperties: PropTypes.object,
    statusUpdateOptionChannelValueProperty: PropTypes.func,
    page: PropTypes.object,
    optionChannelValueProperty: PropTypes.object,
    updateOptionChannelValueProperty: PropTypes.func,
    getOptionChannelValueProperties: PropTypes.func,
    optionChannelValueList: PropTypes.array,
    user: PropTypes.object,
    createActivity: PropTypes.func,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.optionChannelValueProperty) {
      this.inputOptionChannelValuePropertyName.value =
        nextProps.optionChannelValueProperty.name;
      this.inputOptionChannelValuePropertyStatus.value =
        nextProps.optionChannelValueProperty.status;
      this.inputOptionChannelValueId.value =
        nextProps.optionChannelValueProperty.optionChannelValue.id;
      this.inputOptionChannelValueDescription.value =
        nextProps.optionChannelValueProperty.description;
    }
  }

  clear() { // eslint-disable-line no-unused-vars, class-methods-use-this
    this.inputOptionChannelValuePropertyName.value = null;
  }

  save() {
    const optionChannelValuePropertyObject =
      jQuery.extend({}, this.props.optionChannelValueProperty);
    const name = this.inputOptionChannelValuePropertyName.value;
    const status = this.inputOptionChannelValuePropertyStatus.value;
    const optionChannelValueId = this.inputOptionChannelValueId.value;
    const description = this.inputOptionChannelValueDescription.value;

    const optionChannelValueProperty = { id: this.props.id };
    optionChannelValueProperty.name = name;
    optionChannelValueProperty.status = status;
    optionChannelValueProperty.optionChannelValueId = optionChannelValueId;
    optionChannelValueProperty.description = description;
    this.props.updateOptionChannelValueProperty(optionChannelValueProperty).then(() => {
      const userId = this.props.user.id;
      const subject = `Option Channel Value Property ${name}`;
      const subjectId = this.props.optionChannelValueProperty.id;
      const action = 'updated';
      const other = JSON.stringify(optionChannelValuePropertyObject);
      this.props.createActivity({ action,
        subject,
        subjectId,
        other,
        userId }).then(() => {
          this.props.getOptionChannelValueProperties();
        });
    });
    this.props.statusUpdateOptionChannelValueProperty(false);
  }

  removeEditForm() {
    this.props.statusUpdateOptionChannelValueProperty(false);
  }

  render() {
    return (
      <div
        className="editOptionChannelValueProperty"
      >
        <div className="box-header with-border">
          <h3
            className="box-title"
          >
            {`Edit: ${this.props.optionChannelValueProperty.name}`}</h3>
          <div className="box-tools pull-right">
            <button
              className="btn btn-box-tool remove-OptionChannelValueProperty-zone"
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
                htmlFor="inputEditOptionChannelValuePropertyStatus"
                className="col-sm-2 control-label"
              >Status</label>
              <div className="col-sm-10">
                <select
                  id="inputOptionChannelValuePropertyStatus" className="form-control"
                  ref={(c) => {
                    this.inputOptionChannelValuePropertyStatus = c;
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
            onClick={event => this.save(event)}
          ><i className="fa fa-floppy-o" /> Save</Link>
        </div>
      </div>
    );
  }
}

export default EditOptionChannelValuePropertyForm;
