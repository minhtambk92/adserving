/* global $ */

import React, { Component, PropTypes } from 'react';
import { ICheck } from '../../../../components/UI';
import Link from '../../../../components/Link';

class EditZoneTypeForm extends Component {

  static propTypes = {
    id: PropTypes.string,
    zoneTypes: PropTypes.object,
    statusUpdateZoneType: PropTypes.func,
    page: PropTypes.object,
    zoneType: PropTypes.object,
    updateZoneType: PropTypes.func,
    getZoneTypes: PropTypes.func,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.zoneType) {
      this.inputZoneTypeName.value = nextProps.zoneType.name;
      this.inputZoneTypeStatus.value = nextProps.zoneType.status;
      this.inputZoneTypeIsSize.value = nextProps.zoneType.isSize;
    }
  }

  componentDidUpdate() {
    /* eslint-disable no-undef */
    if (this.props.zoneType) {
      if (this.props.zoneType.isSize === true) {
        $('#inputZoneTypeIsSize').iCheck('check');
      } else {
        $('#inputZoneTypeIsSize').iCheck('uncheck');
      }
    }
    /* eslint-enable no-undef */
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
    this.inputZoneTypeName.value = null;
    this.inputZoneTypeIsSize.value = null;
  }

  save() {
    const name = this.inputZoneTypeName.value;
    const value = this.convertToSlug(name);
    const isSize = document.getElementById('inputZoneTypeIsSize').checked;
    const status = this.inputZoneTypeStatus.value;

    const zoneType = { id: this.props.id };
    zoneType.name = name;
    zoneType.value = value;
    zoneType.isSize = isSize;
    zoneType.status = status;
    this.props.updateZoneType(zoneType).then(() => {
      this.props.getZoneTypes();
    });
    this.props.statusUpdateZoneType(false);
  }

  removeEditForm() {
    this.props.statusUpdateZoneType(false);
  }

  render() {
    return (
      <div
        className="edit-ZoneType"
      >
        <div className="box-header with-border">
          <h3
            className="box-title"
          >
            {`Edit: ${this.props.zoneType.name}`}</h3>
          <div className="box-tools pull-right">
            <button
              className="btn btn-box-tool remove-ZoneType-zone"
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
                htmlFor="inputZoneTypeName" className="col-sm-2 control-label"
              >Name</label>
              <div className="col-sm-10">
                <input
                  type="text" className="form-control" id="inputZoneTypeName"
                  placeholder="Name"
                  ref={(c) => {
                    this.inputZoneTypeName = c;
                  }}
                />
              </div>
            </div>

            <div className="form-group">
              <label
                htmlFor="inputZoneTypeIsSize" className="col-sm-2 control-label"
              >Has Size</label>
              <div className="col-sm-10 checkbox">
                <ICheck
                  type="checkbox" id="inputZoneTypeIsSize" className="form-control"
                  ref={(c) => {
                    this.inputZoneTypeIsSize = c;
                  }}
                />
              </div>
            </div>

            <div className="form-group">
              <label
                htmlFor="inputEditZoneTypeStatus"
                className="col-sm-2 control-label"
              >Status</label>
              <div className="col-sm-10">
                <select
                  id="inputZoneTypeStatus" className="form-control"
                  ref={(c) => {
                    this.inputZoneTypeStatus = c;
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

export default EditZoneTypeForm;
