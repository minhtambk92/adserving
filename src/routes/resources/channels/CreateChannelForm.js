/* global $ */

import React, { Component, PropTypes } from 'react';
import Link from '../../../components/Link';

class CreateChannelForm extends Component {

  static propTypes = {
    filters: PropTypes.object,
    createChannel: PropTypes.func,
    sites: PropTypes.array,
    siteId: PropTypes.string,
    getSite: PropTypes.func,
    createActivity: PropTypes.func,
    channels: PropTypes.array,
    site: PropTypes.object,
    user: PropTypes.object,
  };

  clearInput() {
    this.inputChannelName.value = null;
    this.inputChannelDescription.value = null;
  }

  createChannel() {
    const name = this.inputChannelName.value;
    const description = this.inputChannelDescription.value;
    const status = this.inputChannelStatus.value;
    let siteId = '';
    if (this.props.siteId) {
      siteId = this.props.siteId;
    } else {
      siteId = this.inputSiteId.value;
    }
    if (!name) {
      $('#inputChannelName').parents('.form-group').addClass('has-error ');
      setTimeout(() => {
        $('#inputChannelName').parents('.form-group').removeClass('has-error ');
      }, 2000);
    }
    if (name && description && siteId) {
      this.props.createChannel({ name, description, status, siteId }).then(() => {
        if (this.props.channels && this.props.channels.length > 0) {
          const userId = this.props.user.id;
          const subject = `Channel ${name}`;
          const subjectId = this.props.channels[0].id;
          const action = 'created';
          const other = '';
          this.props.createActivity({ action,
            subject,
            subjectId,
            other,
            userId });
        }
        this.clearInput();
        if (this.props.siteId) {
          this.props.getSite(this.props.siteId).then(() => {
            const userId = this.props.user.id;
            const subject = `Channel ${name}`;
            const subjectId = this.props.site.channels[0].id;
            const action = 'created';
            const other = '';
            this.props.createActivity({ action,
              subject,
              subjectId,
              other,
              userId });
          });
        }
      });
    }
  }

  render() {
    return (
      <form className="form-horizontal">
        <div className="box-body">
          {/* name */}
          <div className="form-group">
            <label
              htmlFor="inputChannelName" className="col-sm-2 control-label"
            >Name</label>
            <div className="col-sm-10">
              <input
                type="text" className="form-control" id="inputChannelName"
                placeholder="Admicro"
                ref={(c) => {
                  this.inputChannelName = c;
                }}
              />
            </div>
          </div>
          {/* Site */}
          {this.props.siteId ? ('') : (
            <div className="form-group">
              <label htmlFor="inputSiteId" className="col-sm-2 control-label">Site</label>
              <div className="col-sm-10">
                <select
                  id="inputSiteId" className="form-control"
                  ref={(c) => {
                    this.inputSiteId = c;
                  }}
                >
                  {this.props.sites
                  && this.props.sites.map(site => (
                    <option
                      key={site.id} value={site.id}
                    >
                      {site.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
          {/* description */}
          <div className="form-group">
            <label
              htmlFor="inputChannelDescription"
              className="col-sm-2 control-label"
            >Description</label>
            <div className="col-sm-10">
              <textarea
                className="form-control" id="inputChannelDescription"
                rows="5" placeholder="More info..."
                ref={(c) => {
                  this.inputChannelDescription = c;
                }}
              />
            </div>
          </div>
          <div className="form-group">
            <label
              htmlFor="inputChannelStatus"
              className="col-sm-2 control-label"
            >Status</label>
            <div className="col-sm-10">
              <select
                id="inputChannelStatus" className="form-control"
                ref={(c) => {
                  this.inputChannelStatus = c;
                }}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>
        {/* /.box-body */}
        <div className="box-footer">
          <Link
            to="#"
            className="btn btn-app pull-right"
            onClick={event => this.clearInput(event)}
          ><i className="fa fa-eraser" /> Clear</Link>
          <Link
            to="#"
            className="btn btn-app pull-right"
            onClick={event => this.createChannel(event)}
          ><i className="fa fa-check" /> Confirm</Link>
        </div>
        {/* /.box-footer */}
      </form>
    );
  }
}

export default CreateChannelForm;
