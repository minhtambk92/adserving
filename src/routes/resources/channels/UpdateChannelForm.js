import React, { Component, PropTypes } from 'react';
import Link from '../../../components/Link';

class UpdateChannelForm extends Component {

  static propTypes = {
    channelId: PropTypes.string.isRequired,
    updateChannel: PropTypes.func,
    channel: PropTypes.object,
    deleteChannel: PropTypes.func,
    getChannel: PropTypes.func,
    sites: PropTypes.array,
  };

  componentWillReceiveProps(nextProps) {
    const {
      name,
      description,
      status,
      siteId,
    } = nextProps.channel && (nextProps.channel || {});
    this.inputChannelName.value = name;
    this.inputChannelDescription.value = description;
    this.inputChannelStatus.value = status;
    this.inputSiteId.value = siteId;
  }

  updateChannel() {
    const name = this.inputChannelName.value;
    const description = this.inputChannelDescription.value;
    const status = this.inputChannelStatus.value;
    const siteId = this.inputSiteId.value;

    const channel = { id: this.props.channelId };

    if (name && name !== this.props.channel.name) {
      channel.name = name;
    }

    if (description && description !== this.props.channel.description) {
      channel.description = description;
    }

    if (status && status !== this.props.channel.status) {
      channel.status = status;
    }

    if (siteId && siteId !== this.props.channel.siteId) {
      channel.siteId = siteId;
    }

    this.props.updateChannel(channel).then(() => {
      this.props.getChannel(this.props.channelId);
    });
  }

  deleteChannel() {
    this.props.deleteChannel(this.props.channelId);
  }

  render() {
    return (
      <form className="form-horizontal">
        <div className="box-body">
          {/* Name */}
          <div className="form-group">
            <label
              htmlFor="inputChannelName"
              className="col-sm-3 control-label"
            >Name</label>
            <div className="col-sm-9">
              <input
                type="text" className="form-control" id="inputChannelName"
                placeholder="Dan Tri"
                ref={c => {
                  this.inputChannelName = c;
                }}
              />
            </div>
          </div>
          {/* Site */}
          <div className="form-group">
            <label htmlFor="inputSiteId" className="col-sm-3 control-label">Site</label>
            <div className="col-sm-9">
              <select
                id="inputSiteId" className="form-control"
                ref={c => {
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
          {/* Description */}
          <div className="form-group">
            <label
              htmlFor="inputChannelDescription"
              className="col-sm-3 control-label"
            >Description</label>
            <div className="col-sm-9">
              <textarea
                className="form-control" id="inputChannelDescription"
                rows="5" placeholder="More info..."
                ref={c => {
                  this.inputChannelDescription = c;
                }}
              />
            </div>
          </div>
          {/* Status */}
          <div className="form-group">
            <label
              htmlFor="inputChannelStatus"
              className="col-sm-3 control-label"
            >Status</label>
            <div className="col-sm-9">
              <select
                id="inputChannelStatus" className="form-control"
                ref={c => {
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
            to="/resource/Channel"
            className="btn btn-app pull-right"
          ><i className="fa fa-undo" /> Cancel</Link>
          <Link
            to="/resource/Channel"
            className="btn btn-app pull-right"
            onClick={event => this.deleteChannel(event)}
          ><i className="fa fa-trash-o" /> Delete</Link>
          <Link
            to="#"
            className="btn btn-app pull-right"
            onClick={event => this.updateChannel(event)}
          ><i className="fa fa-floppy-o" /> Save</Link>
        </div>
        {/* /.box-footer */}
      </form>
    );
  }
}

export default UpdateChannelForm;
