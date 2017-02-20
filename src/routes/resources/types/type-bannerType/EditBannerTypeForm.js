/* global $ */

import React, { Component, PropTypes } from 'react';
import { ICheck } from '../../../../components/UI';
import Link from '../../../../components/Link';

class EditBannerTypeForm extends Component {

  static propTypes = {
    id: PropTypes.string,
    bannerTypes: PropTypes.object,
    statusUpdateBannerType: PropTypes.func,
    page: PropTypes.object,
    bannerType: PropTypes.object,
    updateBannerType: PropTypes.func,
    getBannerTypes: PropTypes.func,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.bannerType) {
      this.inputBannerTypeName.value = nextProps.bannerType.name;
      this.inputBannerTypeStatus.value = nextProps.bannerType.status;
    }
  }

  componentDidUpdate() {
    /* eslint-disable no-undef */
    if (this.props.bannerType) {
      if (this.props.bannerType.isUpload === true) {
        $('#inputBannerTypeIsUpload').iCheck('check');
      } else {
        $('#inputBannerTypeIsUpload').iCheck('uncheck');
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
    this.inputBannerTypeName.value = null;
    document.getElementById('inputBannerTypeIsUpload').checked = false;
  }

  save() {
    const id = this.props.id;
    const name = this.inputBannerTypeName.value;
    const value = this.convertToSlug(name);
    const isUpload = document.getElementById('inputBannerTypeIsUpload').checked;
    const status = this.inputBannerTypeStatus.value;
    if (name) {
      this.props.updateBannerType({
        id,
        name,
        isUpload,
        value,
        status,
      }).then(() => {
        this.props.getBannerTypes();
      });
    }
    this.props.statusUpdateBannerType(false);
  }

  removeEditForm() {
    this.props.statusUpdateBannerType(false);
  }

  render() {
    return (
      <div
        className="edit-bannerType"
      >
        <div className="box-header with-border">
          <h3
            className="box-title"
          >
            {`Edit: ${this.props.bannerType.name}`}</h3>
          <div className="box-tools pull-right">
            <button
              className="btn btn-box-tool remove-bannerType-zone"
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
                htmlFor="inputBannerTypeName" className="col-sm-2 control-label"
              >Name</label>
              <div className="col-sm-10">
                <input
                  type="text" className="form-control" id="inputBannerTypeName"
                  placeholder="Name"
                  ref={(c) => {
                    this.inputBannerTypeName = c;
                  }}
                />
              </div>
            </div>

            <div className="form-group">
              <label
                htmlFor="inputBannerTypeIsUpload" className="col-sm-2 control-label"
              >Upload</label>
              <div className="col-sm-10 checkbox">
                <ICheck
                  type="checkbox" id="inputBannerTypeIsUpload" className="form-control"
                  ref={(c) => {
                    this.inputBannerTypeIsUpload = c;
                  }}
                />
              </div>
            </div>

            <div className="form-group">
              <label
                htmlFor="inputEditbannerTypeStatus"
                className="col-sm-2 control-label"
              >Status</label>
              <div className="col-sm-10">
                <select
                  id="inputBannerTypeStatus" className="form-control"
                  ref={(c) => {
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
            onClick={event => this.save(event)}
          ><i className="fa fa-floppy-o" /> Save</Link>
        </div>
      </div>
    );
  }
}

export default EditBannerTypeForm;
