/* global $ */

import React, { Component, PropTypes } from 'react';
import Link from '../../../../components/Link';

class EditZoneSizeTypeForm extends Component {

  static propTypes = {
    id: PropTypes.string,
    zoneSizeTypes: PropTypes.object,
    statusUpdateZoneSizeType: PropTypes.func,
    page: PropTypes.object,
    zoneSizeType: PropTypes.object,
    updateZoneSizeType: PropTypes.func,
    getZoneSizeTypes: PropTypes.func,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.zoneSizeType) {
      this.inputZoneSizeTypeName.value = nextProps.zoneSizeType.name;
      this.inputZoneSizeTypeStatus.value = nextProps.zoneSizeType.status;
      this.inputZoneSizeTypeHeight.value = nextProps.zoneSizeType.height;
      this.inputZoneSizeTypeWidth.value = nextProps.zoneSizeType.width;
    }
  }

  clear() { // eslint-disable-line no-unused-vars, class-methods-use-this
    this.inputZoneSizeTypeName.value = null;
    this.inputZoneSizeTypeWidth.value = null;
    this.inputZoneSizeTypeHeight.value = null;
  }

  save() {
    const name = this.inputZoneSizeTypeName.value;
    const width = this.inputZoneSizeTypeWidth.value;
    const height = this.inputZoneSizeTypeHeight.value;
    const status = this.inputZoneSizeTypeStatus.value;

    const zoneSizeType = { id: this.props.id };
    zoneSizeType.name = name;
    zoneSizeType.width = width;
    zoneSizeType.height = height;
    zoneSizeType.status = status;
    this.props.updateZoneSizeType(zoneSizeType).then(() => {
      this.props.getZoneSizeTypes();
    });
    this.props.statusUpdateZoneSizeType(false);
    // this.props.setPageZoneActiveTab('ZoneSizeTypeZone');
  }

  removeEditForm() {
    this.props.statusUpdateZoneSizeType(false);
  }

  render() {
    return (
      <div
        className="editZoneSizeType"
      >
        <div className="box-header with-border">
          <h3
            className="box-title"
          >
            {`Edit: ${this.props.zoneSizeType.name}`}</h3>
          <div className="box-tools pull-right">
            <button
              className="btn btn-box-tool remove-ZoneSizeType-zone"
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
                htmlFor="inputZoneSizeTypeName" className="col-sm-2 control-label"
              >Name</label>
              <div className="col-sm-10">
                <input
                  type="text" className="form-control" id="inputZoneSizeTypeName"
                  placeholder="Name"
                  ref={(c) => {
                    this.inputZoneSizeTypeName = c;
                  }}
                />
              </div>
            </div>

            <div className="form-group">
              <label
                htmlFor="inputZoneSizeTypeWidth"
                className="col-sm-2 control-label"
              >Size(Width)</label>
              <div className="col-sm-10">
                <input
                  type="number" className="form-control"
                  id="inputZoneSizeTypeWidth"
                  placeholder="300"
                  ref={(c) => {
                    this.inputZoneSizeTypeWidth = c;
                  }}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="inputZoneSizeTypeHeight" className="col-sm-2 control-label">Size(Height)</label>
              <div className="col-sm-10">
                <input
                  type="number" className="form-control"
                  id="inputZoneSizeTypeHeight"
                  placeholder="300"
                  ref={(c) => {
                    this.inputZoneSizeTypeHeight = c;
                  }}
                />
              </div>
            </div>

            <div className="form-group">
              <label
                htmlFor="inputEditZoneSizeTypeStatus"
                className="col-sm-2 control-label"
              >Status</label>
              <div className="col-sm-10">
                <select
                  id="inputZoneSizeTypeStatus" className="form-control"
                  ref={(c) => {
                    this.inputZoneSizeTypeStatus = c;
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

export default EditZoneSizeTypeForm;
