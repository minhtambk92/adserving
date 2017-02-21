/* global $ */

import React, { Component, PropTypes } from 'react';
import Link from '../../../../components/Link';

class EditBannerHtmlTypeForm extends Component {

  static propTypes = {
    id: PropTypes.string,
    bannerHtmlTypes: PropTypes.object,
    statusUpdateBannerHtmlType: PropTypes.func,
    page: PropTypes.object,
    bannerHtmlType: PropTypes.object,
    updateBannerHtmlType: PropTypes.func,
    getBannerHtmlTypes: PropTypes.func,
    user: PropTypes.object,
    createActivity: PropTypes.func,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.bannerHtmlType) {
      this.inputBannerHtmlTypeName.value = nextProps.bannerHtmlType.name;
      this.inputBannerHtmlTypeStatus.value = nextProps.bannerHtmlType.status;
      this.inputBannerHtmlTypeWeight.value = nextProps.bannerHtmlType.weight;
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
    this.inputBannerHtmlTypeName.value = null;
    this.inputBannerHtmlTypeWeight.value = null;
  }

  save() {
    const bannerHtmlTypeObject = this.props.bannerHtmlType;
    const id = this.props.id;
    const name = this.inputBannerHtmlTypeName.value;
    const value = this.convertToSlug(name);
    const weight = this.inputBannerHtmlTypeWeight.value;
    const status = this.inputBannerHtmlTypeStatus.value;
    if (name) {
      this.props.updateBannerHtmlType({
        id,
        name,
        weight,
        value,
        status,
      }).then(() => {
        const userId = this.props.user.id;
        const subject = `Banner Html Type ${name}`;
        const subjectId = this.props.bannerHtmlType.id;
        const action = 'updated';
        const other = JSON.stringify(bannerHtmlTypeObject);
        this.props.createActivity({ action,
          subject,
          subjectId,
          other,
          userId }).then(() => {
            this.props.getBannerHtmlTypes();
          });
      });
    }
    this.props.statusUpdateBannerHtmlType(false);
  }

  removeEditForm() {
    this.props.statusUpdateBannerHtmlType(false);
  }

  render() {
    return (
      <div
        className="edit-bannerHtmlType"
      >
        <div className="box-header with-border">
          <h3
            className="box-title"
          >
            {`Edit: ${this.props.bannerHtmlType.name}`}</h3>
          <div className="box-tools pull-right">
            <button
              className="btn btn-box-tool remove-bannerHtmlType-zone"
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
                  type="text" className="form-control" id="inputBannerHtmlTypeWeight"
                  placeholder="0"
                  ref={(c) => {
                    this.inputBannerHtmlTypeWeight = c;
                  }}
                />
              </div>
            </div>

            <div className="form-group">
              <label
                htmlFor="inputEditbannerHtmlTypeStatus"
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
            onClick={event => this.save(event)}
          ><i className="fa fa-floppy-o" /> Save</Link>
        </div>
      </div>
    );
  }
}

export default EditBannerHtmlTypeForm;
