/* global $ */

import React, { Component, PropTypes } from 'react';
import Link from '../../../../components/Link';

class EditAdsServerForm extends Component {

  static propTypes = {
    id: PropTypes.string,
    adsServers: PropTypes.object,
    statusUpdateAdsServer: PropTypes.func,
    page: PropTypes.object,
    adsServer: PropTypes.object,
    updateAdsServer: PropTypes.func,
    getAdsServers: PropTypes.func,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.adsServer) {
      this.inputAdsServerName.value = nextProps.adsServer.name;
      this.inputAdsServerStatus.value = nextProps.adsServer.status;
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
    this.inputAdsServerName.value = null;
  }

  save() {
    const id = this.props.id;
    const name = this.inputAdsServerName.value;
    const value = this.convertToSlug(name);
    const status = this.inputAdsServerStatus.value;
    if (name) {
      this.props.updateAdsServer({
        id,
        name,
        value,
        status,
      }).then(() => {
        this.props.getAdsServers();
      });
    }
    this.props.statusUpdateAdsServer(false);
  }

  removeEditForm() {
    this.props.statusUpdateAdsServer(false);
  }

  render() {
    return (
      <div
        className="edit-AdsServer"
      >
        <div className="box-header with-border">
          <h3
            className="box-title"
          >
            {`Edit: ${this.props.adsServer.name}`}</h3>
          <div className="box-tools pull-right">
            <button
              className="btn btn-box-tool remove-AdsServer-zone"
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
                htmlFor="inputAdsServerName" className="col-sm-2 control-label"
              >Name</label>
              <div className="col-sm-10">
                <input
                  type="text" className="form-control" id="inputAdsServerName"
                  placeholder="Name"
                  ref={(c) => {
                    this.inputAdsServerName = c;
                  }}
                />
              </div>
            </div>

            <div className="form-group">
              <label
                htmlFor="inputEditAdsServerStatus"
                className="col-sm-2 control-label"
              >Status</label>
              <div className="col-sm-10">
                <select
                  id="inputAdsServerStatus" className="form-control"
                  ref={(c) => {
                    this.inputAdsServerStatus = c;
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

export default EditAdsServerForm;
