/* global $ */

import React, { Component, PropTypes } from 'react';
import Link from '../../../../components/Link';

class CreateBannerTypeForm extends Component {

  static propTypes = {
    id: PropTypes.string,
    bannerTypes: PropTypes.object,
    statusCreateBannerType: PropTypes.func,
    page: PropTypes.object,
    createBannerType: PropTypes.func,
  };

  convertToSlug(Text) { // eslint-disable-line no-unused-vars, class-methods-use-this
    let str;
    str = Text.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    const from = 'aàáạãảăằắẵặẳâậầấẫẩeèéẽẹẻiíìịĩỉoọòóõỏôốồộỗổơớờỡợởêệềếễểủúùụũưửừứựữëïöüũûñç·/_,:;';
    const to = 'aaaaaaaaaaaaaaaaaaeeeeeeiiiiiiooooooooooooooooooeeeeeeuuuuuuuuuuueiouunc------';
    for (let i = 0, l = from.length; i < l; i += 1) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
      .replace(/\s+/g, '-') // collapse whitespace and replace by -
      .replace(/-+/g, '-'); // collapse dashes

    return str;
  }

  clear() { // eslint-disable-line no-unused-vars, class-methods-use-this
    this.inputBannerTypeName.value = null;
    this.inputBannerTypeWeight.value = null;
  }

  createBannerType() {
    const name = this.inputBannerTypeName.value;
    const value = this.convertToSlug(name);
    const weight = this.inputBannerTypeWeight.value;
    const status = this.inputBannerTypeStatus.value;
    if (name) {
      this.props.createBannerType({
        name,
        value,
        weight,
        status,
      });
    }
    this.props.statusCreateBannerType(false);
    // this.props.setPageZoneActiveTab('TypeBannerHtmlZone');
  }

  removeCreateForm() {
    this.props.statusCreateBannerType(false);
  }

  render() {
    return (
      <div
        className="CreateBannerType"
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
                htmlFor="inputBannerTypeName" className="col-sm-2 control-label"
              >Name</label>
              <div className="col-sm-10">
                <input
                  type="text" className="form-control" id="inputBannerTypeName"
                  placeholder="Name"
                  ref={c => {
                    this.inputBannerTypeName = c;
                  }}
                />
              </div>
            </div>

            <div className="form-group">
              <label
                htmlFor="inputBannerTypeWeight" className="col-sm-2 control-label"
              >Weight</label>
              <div className="col-sm-10">
                <input
                  type="number" className="form-control" id="inputBannerTypeWeight"
                  placeholder="0"
                  ref={c => {
                    this.inputBannerTypeWeight = c;
                  }}
                />
              </div>
            </div>

            <div className="form-group">
              <label
                htmlFor="inputBannerTypeStatus"
                className="col-sm-2 control-label"
              >Status</label>
              <div className="col-sm-10">
                <select
                  id="inputBannerTypeStatus" className="form-control"
                  ref={c => {
                    this.inputBannerTypeStatus = c;
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
            onClick={event => this.createBannerType(event)}
          ><i className="fa fa-floppy-o" /> Save</Link>
        </div>
      </div>
    );
  }
}

export default CreateBannerTypeForm;
