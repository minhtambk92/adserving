/* global $ */

import React, { Component, PropTypes } from 'react';
import Link from '../../../../components/Link';

class CreateZoneSizeTypeForm extends Component {

  static propTypes = {
    id: PropTypes.string,
    zoneSizeTypes: PropTypes.object,
    statusCreateZoneSizeType: PropTypes.func,
    page: PropTypes.object,
    createZoneSizeType: PropTypes.func,
    user: PropTypes.object,
    createActivity: PropTypes.func,
  };

  clear() { // eslint-disable-line no-unused-vars, class-methods-use-this
    this.inputZoneSizeTypeName.value = null;
    this.inputZoneSizeTypeWidth.value = null;
    this.inputZoneSizeTypeHeight.value = null;
  }

  createZoneSizeType() {
    const name = this.inputZoneSizeTypeName.value;
    const width = this.inputZoneSizeTypeWidth.value;
    const height = this.inputZoneSizeTypeHeight.value;
    const status = this.inputZoneSizeTypeStatus.value;
    const userId = this.props.user.id;
    if (name) {
      this.props.createZoneSizeType({
        name,
        width,
        height,
        status,
        userId,
      }).then(() => {
        if (this.props.zoneSizeTypes && this.props.zoneSizeTypes.list.length > 0) {
          /* eslint-disable no-shadow */
          const userId = this.props.user.id;
          const subject = `Zone Size Type ${name}`;
          const subjectId = this.props.zoneSizeTypes.list[0].id;
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
    this.props.statusCreateZoneSizeType(false);
  }

  removeCreateForm() {
    this.props.statusCreateZoneSizeType(false);
  }

  render() {
    return (
      <div
        className="createZoneSizeType"
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
                htmlFor="inputZoneSizeTypeStatus"
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
            onClick={event => this.createZoneSizeType(event)}
          ><i className="fa fa-floppy-o" /> Save</Link>
        </div>
      </div>
    );
  }
}

export default CreateZoneSizeTypeForm;
