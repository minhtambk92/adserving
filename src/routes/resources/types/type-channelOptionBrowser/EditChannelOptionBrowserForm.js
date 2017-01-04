/* global $ */

import React, { Component, PropTypes } from 'react';
import Link from '../../../../components/Link';

class EditChannelOptionBrowserForm extends Component {

  static propTypes = {
    id: PropTypes.string,
    channelOptionBrowsers: PropTypes.object,
    statusBrowserEdit: PropTypes.func,
    page: PropTypes.object,
    browser: PropTypes.object,
    updateChannelOptionBrowser: PropTypes.func,
    getChannelOptionBrowsers: PropTypes.func,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.browser) {
      this.inputChannelOptionBrowserName.value = nextProps.browser.name;
      this.inputChannelOptionBrowserStatus.value = nextProps.browser.status;
    }
  }

  convertToSlug(Text) { // eslint-disable-line no-unused-vars, class-methods-use-this
    let str;
    str = Text.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    const from = 'ăắãàáäâẽèéëêếềìịíïîõòóöôộùụúüûñç·/_,:;';
    const to = 'aaaaaaaeeeeeeeiiiiioooooouuuuunc------';
    for (let i = 0, l = from.length; i < l; i += 1) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
      .replace(/\s+/g, '-') // collapse whitespace and replace by -
      .replace(/-+/g, '-'); // collapse dashes

    return str;
  }

  clear() { // eslint-disable-line no-unused-vars, class-methods-use-this
    this.inputChannelOptionBrowserName.value = null;
  }

  save() {
    const id = this.props.id;
    const name = this.inputChannelOptionBrowserName.value;
    const value = this.convertToSlug(name);
    const status = this.inputChannelOptionBrowserStatus.value;
    if (name) {
      this.props.updateChannelOptionBrowser({
        id,
        name,
        value,
        status,
      }).then(() => {
        this.props.getChannelOptionBrowsers();
      });
    }
    this.props.statusBrowserEdit(false);
    // this.props.setPageZoneActiveTab('ChannelOptionBrowserZone');
  }

  removeEditForm() {
    this.props.statusBrowserEdit(false);
  }

  render() {
    return (
      <div
        className="listChannelOptionBrowser"
      >
        <div className="box-header with-border">
          <h3
            className="box-title"
          >
            {`Edit: ${this.props.browser.name}`}</h3>
          <div className="box-tools pull-right">
            <button
              className="btn btn-box-tool remove-ChannelOptionBrowser-zone"
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
                htmlFor="inputChannelOptionBrowserName" className="col-sm-2 control-label"
              >Name</label>
              <div className="col-sm-10">
                <input
                  type="text" className="form-control" id="inputChannelOptionBrowserName"
                  placeholder="Name"
                  ref={c => {
                    this.inputChannelOptionBrowserName = c;
                  }}
                />
              </div>
            </div>
            <div className="form-group">
              <label
                htmlFor="inputChannelOptionBrowserStatus"
                className="col-sm-2 control-label"
              >Status</label>
              <div className="col-sm-10">
                <select
                  id="inputChannelOptionBrowserStatus" className="form-control"
                  ref={c => {
                    this.inputChannelOptionBrowserStatus = c;
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

export default EditChannelOptionBrowserForm;
