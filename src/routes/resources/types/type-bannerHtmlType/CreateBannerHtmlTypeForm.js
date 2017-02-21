/* global $ */

import React, { Component, PropTypes } from 'react';
import Link from '../../../../components/Link';

class CreateBannerHtmlTypeForm extends Component {

  static propTypes = {
    id: PropTypes.string,
    bannerHtmlTypes: PropTypes.object,
    statusCreateBannerHtmlType: PropTypes.func,
    page: PropTypes.object,
    createBannerHtmlType: PropTypes.func,
    user: PropTypes.object,
    createActivity: PropTypes.func,
  };

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
    this.inputBannerHtmlTypeName.value = null;
    this.inputBannerHtmlTypeWeight.value = null;
  }

  createBannerHtmlType() {
    const name = this.inputBannerHtmlTypeName.value;
    const value = this.convertToSlug(name);
    const weight = this.inputBannerHtmlTypeWeight.value;
    const status = this.inputBannerHtmlTypeStatus.value;
    const userId = this.props.user.id;
    if (name) {
      this.props.createBannerHtmlType({
        name,
        value,
        weight,
        status,
        userId,
      }).then(() => {
        if (this.props.bannerHtmlTypes && this.props.bannerHtmlTypes.list.length > 0) {
          /* eslint-disable no-shadow */
          const userId = this.props.user.id;
          const subject = `Banner Html Type ${name}`;
          const subjectId = this.props.bannerHtmlTypes.list[0].id;
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
    this.props.statusCreateBannerHtmlType(false);
  }

  removeCreateForm() {
    this.props.statusCreateBannerHtmlType(false);
  }

  render() {
    return (
      <div
        className="CreateBannerHtmlType"
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
                htmlFor="inputBannerHtmlTypeName" className="col-sm-2 control-label"
              >Name</label>
              <div className="col-sm-10">
                <input
                  type="text" className="form-control" id="inputBannerHtmlTypeName"
                  placeholder="Name"
                  ref={(c) => {
                    this.inputBannerHtmlTypeName = c;
                  }}
                />
              </div>
            </div>

            <div className="form-group">
              <label
                htmlFor="inputBannerHtmlTypeWeight" className="col-sm-2 control-label"
              >Weight</label>
              <div className="col-sm-10">
                <input
                  type="number" className="form-control" id="inputBannerHtmlTypeWeight"
                  placeholder="0"
                  ref={(c) => {
                    this.inputBannerHtmlTypeWeight = c;
                  }}
                />
              </div>
            </div>

            <div className="form-group">
              <label
                htmlFor="inputBannerHtmlTypeStatus"
                className="col-sm-2 control-label"
              >Status</label>
              <div className="col-sm-10">
                <select
                  id="inputBannerHtmlTypeStatus" className="form-control"
                  ref={(c) => {
                    this.inputBannerHtmlTypeStatus = c;
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
            onClick={event => this.createBannerHtmlType(event)}
          ><i className="fa fa-floppy-o" /> Save</Link>
        </div>
      </div>
    );
  }
}

export default CreateBannerHtmlTypeForm;
