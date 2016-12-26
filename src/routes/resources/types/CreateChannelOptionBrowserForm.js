/* global $ */

import React, { Component, PropTypes } from 'react';
import Link from '../../../components/Link';

class CreateChannelOptionBrowserForm extends Component {

  static propTypes = {
    index: PropTypes.number,
    id: PropTypes.string,
    channelOptionBrowsers: PropTypes.object,
    statusBrowserCreate: PropTypes.func,
    statusBrowserEdit: PropTypes.func,
    page: PropTypes.object,
    createChannelOptionBrowser: PropTypes.func,
  };

  clear() { // eslint-disable-line no-unused-vars, class-methods-use-this
    $('#inputCreateChannelOptionBrowserName').val('');
  }

  createChannelOptionBrowser() {
    const name = $('#inputCreateChannelOptionBrowserName').val();
    const value = name;
    const status = $('#inputCreateChannelOptionBrowserStatus').val();
    if (name) {
      this.props.createChannelOptionBrowser({
        name,
        value,
        status,
      });
    }
    this.props.statusBrowserCreate(false);
    // this.props.setPageZoneActiveTab('ChannelOptionBrowserZone');
  }

  removeCreateForm() {
    this.props.statusBrowserCreate(false);
  }

  render() {
    return (
      <div
        className={`list-zone-ChannelOptionBrowser list-zone-ChannelOptionBrowser-${this.props.index}`}
      >
        <div className="box-header with-border">
          <h3
            className="box-title"
          >
            Add New</h3>
          <div className="box-tools pull-right">
            <button
              className="btn btn-box-tool remove-ChannelOptionBrowser-zone"
              onClick={event => this.removeCreateForm(event)}
            >
              <i className="fa fa-times" />
            </button>
          </div>
        </div>
        <div className="box-body">
          <div className={`form-horizontal ListChannelOptionBrowser-${this.props.index}`}>
            <div className="form-group">
              <label
                htmlFor="inputCreateChannelOptionBrowserName" className="col-sm-2 control-label"
              >Name</label>
              <div className="col-sm-10">
                <input
                  type="text" className="form-control" id="inputCreateChannelOptionBrowserName"
                  placeholder="Name"
                  ref={c => {
                    this.inputCreateChannelOptionBrowserName = c;
                  }}
                />
              </div>
            </div>
            <div className="form-group">
              <label
                htmlFor="inputCreateChannelOptionBrowserStatus"
                className="col-sm-2 control-label"
              >Status</label>
              <div className="col-sm-10">
                <select
                  id="inputCreateChannelOptionBrowserStatus" className="form-control"
                  ref={c => {
                    this.inputCreateChannelOptionBrowserStatus = c;
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
            onClick={event => this.createChannelOptionBrowser(event)}
          ><i className="fa fa-floppy-o" /> Save</Link>
        </div>
      </div>
    );
  }
}

export default CreateChannelOptionBrowserForm;
