/* global $ */

import React, { Component, PropTypes } from 'react';
import Link from '../../../../components/Link';

class EditTypeBannerHtmlForm extends Component {

  static propTypes = {
    id: PropTypes.string,
    allTypeBannerHtml: PropTypes.object,
    statusUpdateTypeBannerHtml: PropTypes.func,
    page: PropTypes.object,
    typeBannerHtml: PropTypes.object,
    updateTypeBannerHtml: PropTypes.func,
    getAllTypeBannerHtml: PropTypes.func,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.typeBannerHtml) {
      this.inputTypeBannerHtmlName.value = nextProps.typeBannerHtml.name;
      this.inputTypeBannerHtmlStatus.value = nextProps.typeBannerHtml.status;
      this.inputTypeBannerHtmlWeight.value = nextProps.typeBannerHtml.weight;
    }
  }

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

  save() {
    const id = this.props.id;
    const name = this.inputTypeBannerHtmlName.value;
    const value = this.convertToSlug(name);
    const weight = this.inputTypeBannerHtmlWeight.value;
    const status = this.inputTypeBannerHtmlStatus.value;
    if (name) {
      this.props.updateTypeBannerHtml({
        id,
        name,
        weight,
        value,
        status,
      }).then(() => {
        this.props.getAllTypeBannerHtml();
      });
    }
    this.props.statusUpdateTypeBannerHtml(false);
    // this.props.setPageZoneActiveTab('TypeBannerHtmlZone');
  }

  removeEditForm() {
    this.props.statusUpdateTypeBannerHtml(false);
  }

  render() {
    return (
      <div
        className="edit-TypeBannerHtml"
      >
        <div className="box-header with-border">
          <h3
            className="box-title"
          >
            {`Edit: ${this.props.typeBannerHtml.name}`}</h3>
          <div className="box-tools pull-right">
            <button
              className="btn btn-box-tool remove-TypeBannerHtml-zone"
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
                  type="text" className="form-control" id="inputTypeBannerHtmlWeight"
                  placeholder="0"
                  ref={c => {
                    this.inputTypeBannerHtmlWeight = c;
                  }}
                />
              </div>
            </div>

            <div className="form-group">
              <label
                htmlFor="inputEditTypeBannerHtmlStatus"
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
            onClick={event => this.save(event)}
          ><i className="fa fa-floppy-o" /> Save</Link>
        </div>
      </div>
    );
  }
}

export default EditTypeBannerHtmlForm;
