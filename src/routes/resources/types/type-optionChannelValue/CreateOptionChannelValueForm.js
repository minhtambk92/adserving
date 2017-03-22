/* global $ */

import React, { Component, PropTypes } from 'react';
import { ICheck } from '../../../../components/UI';
import Link from '../../../../components/Link';

class CreateOptionChannelValueForm extends Component {

  static propTypes = {
    id: PropTypes.string,
    optionChannelValues: PropTypes.object,
    statusCreateOptionChannelValue: PropTypes.func,
    page: PropTypes.object,
    createOptionChannelValue: PropTypes.func,
    optionChannelTypeList: PropTypes.array,
    currentOptionChannelTypeId: PropTypes.string,
    user: PropTypes.object,
    createActivity: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      isCustomValue: false,
    };
  }

  componentDidMount() {
    /* eslint-disable no-undef */
    $('#inputOptionChannelValueIsProperties').iCheck('check');

    const self = this;

    $('#inputOptionChannelValueIsCustomValue').on('ifClicked', () => {
      const isStartNow = document.getElementById('inputOptionChannelValueIsCustomValue').checked;
      if (isStartNow === true) {
        self.setState({ isCustomValue: false });
      } else if (isStartNow === false) {
        self.setState({ isCustomValue: true });
      }
    });

    /* eslint-enable no-undef */
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentOptionChannelTypeId && nextProps.currentOptionChannelTypeId !== 'null' && nextProps.currentOptionChannelTypeId !== '') {
      this.inputOptionChannelTypeId.value = nextProps.currentOptionChannelTypeId;
    }
  }

  clear() { // eslint-disable-line no-unused-vars, class-methods-use-this
    this.inputOptionChannelValueName.value = null;
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

  createValue() {
    if (this.inputOptionChannelValueName.value) {
      if (this.state.isCustomValue === false) {
        const name = this.inputOptionChannelValueName.value;
        const value = this.convertToSlug(name);
        this.inputOptionChannelValueNoCustom.value = value;
      }
    }
  }

  createOptionChannelValue() {
    const name = this.inputOptionChannelValueName.value;
    const status = this.inputOptionChannelValueStatus.value;
    const optionChannelTypeId = this.inputOptionChannelTypeId.value;
    const userId = this.props.user.id;
    const isProperties = document.getElementById('inputOptionChannelValueIsProperties').checked;
    const isCustomValue = document.getElementById('inputOptionChannelValueIsCustomValue').checked;
    let value = '';
    if (this.state.isCustomValue === true) {
      value = this.inputOptionChannelValue.value;
    } else {
      value = this.convertToSlug(name);
    }
    if (name) {
      this.props.createOptionChannelValue({
        name,
        value,
        status,
        optionChannelTypeId,
        userId,
        isProperties,
        isCustomValue,
      }).then(() => {
        if (this.props.optionChannelValues && this.props.optionChannelValues.list.length > 0) {
          /* eslint-disable no-shadow */
          const userId = this.props.user.id;
          const subject = `Option Channel Value ${name}`;
          const subjectId = this.props.optionChannelValues.list[0].id;
          const action = 'created';
          const other = '';
          this.props.createActivity({
            action,
            subject,
            subjectId,
            other,
            userId,
          });
        }
      });
    }
    this.props.statusCreateOptionChannelValue(false);
  }

  removeCreateForm() {
    this.props.statusCreateOptionChannelValue(false);
  }

  render() {
    return (
      <div
        className="createOptionChannelValue"
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
                htmlFor="inputOptionChannelValueName" className="col-sm-2 control-label"
              >Name</label>
              <div className="col-sm-10">
                <input
                  onBlur={() => this.createValue()}
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
                htmlFor="inputOptionChannelValueIsProperties"
                className="col-sm-2 control-label"
              >Has Properties</label>
              <div className="col-sm-10 checkbox">
                <ICheck
                  type="checkbox" id="inputOptionChannelValueIsProperties" className="form-control"
                  ref={(c) => {
                    this.inputOptionChannelValueIsProperties = c;
                  }}
                />
              </div>
            </div>
            <div className="form-group">
              <label
                htmlFor="inputOptionChannelValueIsCustomValue"
                className="col-sm-2 control-label"
              >Custom Value</label>
              <div className="col-sm-10 checkbox">
                <ICheck
                  type="checkbox" id="inputOptionChannelValueIsCustomValue" className="form-control"
                  ref={(c) => {
                    this.inputOptionChannelValueIsCustomValue = c;
                  }}
                />
              </div>
            </div>
            {this.state.isCustomValue === true ? (
              <div className="form-group">
                <label
                  htmlFor="inputOptionChannelValue" className="col-sm-2 control-label"
                >Value</label>
                <div className="col-sm-10">
                  <input
                    type="text" className="form-control" id="inputOptionChannelValue"
                    placeholder="Value"
                    ref={(c) => {
                      this.inputOptionChannelValue = c;
                    }}
                  />
                </div>
              </div>
              ) : (
                <div className="form-group">
                  <label
                    htmlFor="inputOptionChannelValueNoCustom" className="col-sm-2 control-label"
                  >Value</label>
                  <div className="col-sm-10">
                    <input
                      type="text" className="form-control" readOnly
                      id="inputOptionChannelValueNoCustom"
                      placeholder="Value"
                      ref={(c) => {
                        this.inputOptionChannelValueNoCustom = c;
                      }}
                    />
                  </div>
                </div>
              )}
            <div className="form-group">
              <label
                htmlFor="inputOptionChannelValueStatus"
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
            onClick={event => this.createOptionChannelValue(event)}
          ><i className="fa fa-floppy-o" /> Save</Link>
        </div>
      </div>
    );
  }
}

export default CreateOptionChannelValueForm;
