/* global $ */

import React, { Component, PropTypes } from 'react';
import Link from '../../../components/Link';

class EditChannelOptionBrowserForm extends Component {

  static propTypes = {
    index: PropTypes.number,
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
      this.inputEditChannelOptionBrowserName.value = nextProps.browser.name;
      this.inputEditChannelOptionBrowserStatus.value = nextProps.browser.status;
    }
  }

  clear() { // eslint-disable-line no-unused-vars, class-methods-use-this
    $('#inputEditChannelOptionBrowserName').val('');
  }

  save() {
    const id = this.props.id;
    const name = $('#inputEditChannelOptionBrowserName').val();
    const value = encodeURIComponent(name);
    const status = $('#inputEditChannelOptionBrowserStatus').val();
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
        className={`list-zone-ChannelOptionBrowser list-zone-ChannelOptionBrowser-${this.props.index}`}
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
          <div className={`form-horizontal ListChannelOptionBrowser-${this.props.index}`}>
            <div className="form-group">
              <label
                htmlFor="inputEditChannelOptionBrowserName" className="col-sm-2 control-label"
              >Name</label>
              <div className="col-sm-10">
                <input
                  type="text" className="form-control" id="inputEditChannelOptionBrowserName"
                  placeholder="Name"
                  ref={c => {
                    this.inputEditChannelOptionBrowserName = c;
                  }}
                />
              </div>
            </div>
            <div className="form-group">
              <label
                htmlFor="inputEditChannelOptionBrowserStatus"
                className="col-sm-2 control-label"
              >Status</label>
              <div className="col-sm-10">
                <select
                  id="inputEditChannelOptionBrowserStatus" className="form-control"
                  ref={c => {
                    this.inputEditChannelOptionBrowserStatus = c;
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
