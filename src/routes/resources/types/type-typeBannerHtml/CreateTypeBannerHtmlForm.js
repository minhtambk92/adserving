/* global $ */

import React, { Component, PropTypes } from 'react';
import Link from '../../../../components/Link';

class CreateTypeBannerHtmlForm extends Component {

  static propTypes = {
    id: PropTypes.string,
    allTypeBannerHtml: PropTypes.object,
    statusCreateTypeBannerHtml: PropTypes.func,
    page: PropTypes.object,
    createTypeBannerHtml: PropTypes.func,
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
    this.inputTypeBannerHtmlName.value = null;
    this.inputTypeBannerHtmlWeight.value = null;
  }

  createTypeBannerHtml() {
    const name = this.inputTypeBannerHtmlName.value;
    const value = this.convertToSlug(name);
    const weight = this.inputTypeBannerHtmlWeight.value;
    const status = this.inputTypeBannerHtmlStatus.value;
    if (name) {
      this.props.createTypeBannerHtml({
        name,
        value,
        weight,
        status,
      });
    }
    this.props.statusCreateTypeBannerHtml(false);
    // this.props.setPageZoneActiveTab('TypeBannerHtmlZone');
  }

  removeCreateForm() {
    this.props.statusCreateTypeBannerHtml(false);
  }

  render() {
    return (
      <div
        className="createTypeBannerHtml"
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
                htmlFor="inputTypeBannerHtmlName" className="col-sm-2 control-label"
              >Name</label>
              <div className="col-sm-10">
                <input
                  type="text" className="form-control" id="inputTypeBannerHtmlName"
                  placeholder="Name"
                  ref={c => {
                    this.inputTypeBannerHtmlName = c;
                  }}
                />
              </div>
            </div>

            <div className="form-group">
              <label
                htmlFor="inputTypeBannerHtmlWeight" className="col-sm-2 control-label"
              >Weight</label>
              <div className="col-sm-10">
                <input
                  type="number" className="form-control" id="inputTypeBannerHtmlWeight"
                  placeholder="0"
                  ref={c => {
                    this.inputTypeBannerHtmlWeight = c;
                  }}
                />
              </div>
            </div>

            <div className="form-group">
              <label
                htmlFor="inputTypeBannerHtmlStatus"
                className="col-sm-2 control-label"
              >Status</label>
              <div className="col-sm-10">
                <select
                  id="inputTypeBannerHtmlStatus" className="form-control"
                  ref={c => {
                    this.inputTypeBannerHtmlStatus = c;
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
            onClick={event => this.createTypeBannerHtml(event)}
          ><i className="fa fa-floppy-o" /> Save</Link>
        </div>
      </div>
    );
  }
}

export default CreateTypeBannerHtmlForm;
