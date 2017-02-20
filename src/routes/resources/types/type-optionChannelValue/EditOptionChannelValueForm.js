/* global $ */

import React, { Component, PropTypes } from 'react';
import Link from '../../../../components/Link';

class EditOptionChannelValueForm extends Component {

  static propTypes = {
    id: PropTypes.string,
    optionChannelValues: PropTypes.object,
    statusUpdateOptionChannelValue: PropTypes.func,
    page: PropTypes.object,
    optionChannelValue: PropTypes.object,
    updateOptionChannelValue: PropTypes.func,
    getOptionChannelValues: PropTypes.func,
    optionChannelTypeList: PropTypes.array,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.optionChannelValue) {
      this.inputOptionChannelValueName.value = nextProps.optionChannelValue.name;
      this.inputOptionChannelValueStatus.value = nextProps.optionChannelValue.status;
      this.inputOptionChannelTypeId.value = nextProps.optionChannelValue.optionChannelType.id;
    }
  }

  convertToSlug(Text) { // eslint-disable-line no-unused-vars, class-methods-use-this
    let str;
    str = Text.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    const from = 'đỹýỳỷaàáạãảăằắẵặẳâậầấẫẩeèéẽẹẻiíìịĩỉoọòóõỏôốồộỗổơớờỡợởêệềếễểủúùụũưửừứựữëïöüũûñç·/_,:;';
    const to = 'dyyyyaaaaaaaaaaaaaaaaaaeeeeeeiiiiiiooooooooooooooooooeeeeeeuuuuuuuuuuueiouunc------';
    for (let i = 0, l = from.length; i < l; i += 1) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
      .replace(/\s+/g, '-') // collapse whitespace and replace by -
      .replace(/-+/g, '-'); // collapse dashes

    return str;
  }

  clear() { // eslint-disable-line no-unused-vars, class-methods-use-this
    this.inputOptionChannelValueName.value = null;
  }

  save() {
    const name = this.inputOptionChannelValueName.value;
    const status = this.inputOptionChannelValueStatus.value;
    const optionChannelTypeId = this.inputOptionChannelTypeId.value;

    const optionChannelValue = { id: this.props.id };
    optionChannelValue.name = name;
    optionChannelValue.status = status;
    optionChannelValue.value = this.convertToSlug(name);
    optionChannelValue.optionChannelTypeId = optionChannelTypeId;
    this.props.updateOptionChannelValue(optionChannelValue).then(() => {
      this.props.getOptionChannelValues();
    });
    this.props.statusUpdateOptionChannelValue(false);
  }

  removeEditForm() {
    this.props.statusUpdateOptionChannelValue(false);
  }

  render() {
    return (
      <div
        className="editOptionChannelValue"
      >
        <div className="box-header with-border">
          <h3
            className="box-title"
          >
            {`Edit: ${this.props.optionChannelValue.name}`}</h3>
          <div className="box-tools pull-right">
            <button
              className="btn btn-box-tool remove-OptionChannelValue-zone"
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
                htmlFor="inputOptionChannelValueName" className="col-sm-2 control-label"
              >Name</label>
              <div className="col-sm-10">
                <input
                  type="text" className="form-control" id="inputOptionChannelValueName"
                  placeholder="Name"
                  ref={(c) => {
                    this.inputOptionChannelValueName = c;
                  }}
                />
              </div>
            </div>

            <div className="form-group">
              <label
                htmlFor="inputOptionChannelTypeId"
                className="col-sm-2 control-label"
              >Channel Type</label>
              <div className="col-sm-10">
                <select
                  id="inputOptionChannelTypeId" className="form-control"
                  ref={(c) => {
                    this.inputOptionChannelTypeId = c;
                  }}
                >
                  {this.props.optionChannelTypeList &&
                  this.props.optionChannelTypeList.map(option => (
                    <option
                      key={option.id} value={option.id}
                    >{option.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label
                htmlFor="inputEditOptionChannelValueStatus"
                className="col-sm-2 control-label"
              >Status</label>
              <div className="col-sm-10">
                <select
                  id="inputOptionChannelValueStatus" className="form-control"
                  ref={(c) => {
                    this.inputOptionChannelValueStatus = c;
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

export default EditOptionChannelValueForm;
