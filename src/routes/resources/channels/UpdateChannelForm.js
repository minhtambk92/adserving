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
    createActivity: PropTypes.func,
    users: PropTypes.object,
  };

  componentWillReceiveProps(nextProps) {
    const {
      name,
      description,
      status,
    } = nextProps.channel && (nextProps.channel || {});
    this.inputChannelName.value = name;
    this.inputChannelDescription.value = description;
    this.inputChannelStatus.value = status;
  }

  updateChannel() {
    const name = this.inputChannelName.value;
    const description = this.inputChannelDescription.value;
    const status = this.inputChannelStatus.value;

    const channelObject = this.props.channel;
    const channel = { id: this.props.channelId };

    channel.name = name;
    channel.status = status;

    if (description && description !== this.props.channel.description) {
      channel.description = description;
    }

    this.props.updateChannel(channel).then(() => {
      const userId = this.props.users.id;
      const subject = `Channel ${name}`;
      const subjectId = this.props.channel.id;
      const action = 'updated';
      const other = JSON.stringify(channelObject);
      this.props.createActivity({ action,
        subject,
        subjectId,
        other,
        userId }).then(() => {
          this.props.getChannel(this.props.channelId);
        });
    });
  }

  deleteChannel() {
    const channelObject = this.props.channel;
    this.props.deleteChannel(this.props.channelId).then(() => {
      const userId = this.props.users.id;
      const subject = `Channel ${channelObject.name}`;
      const subjectId = this.props.channelId;
      const action = 'deleted';
      const other = JSON.stringify(channelObject);
      this.props.createActivity({ action,
        subject,
        subjectId,
        other,
        userId });
    });
  }

  render() {
    return (
      <form className="form-horizontal">
        <div className="form-group">
          <label
            htmlFor="inputChannelName"
            className="col-sm-2 control-label"
          >Name</label>
          <div className="col-sm-10">
            <input
              type="text" className="form-control" id="inputChannelName"
              placeholder="Dan Tri"
              ref={(c) => {
                this.inputChannelName = c;
              }}
            />
          </div>
        </div>

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

        <hr />

        <div className="clearfix">
          <Link
            to="/resource/channel"
            className="btn btn-app pull-right"
          ><i className="fa fa-undo" /> Cancel</Link>
          <Link
            to="/resource/channel"
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
