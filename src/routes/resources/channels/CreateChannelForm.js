import React, { Component, PropTypes } from 'react';
import Link from '../../../components/Link';

class CreateChannelForm extends Component {

  static propTypes = {
    filters: PropTypes.object,
    createChannel: PropTypes.func,
  };

  clearInput() {
    this.inputChannelName.value = null;
    this.inputChannelDescription.value = null;
  }

  createChannel() {
    const name = this.inputChannelName.value;
    const description = this.inputChannelDescription.value;
    const status = this.inputChannelStatus.value;

    if (name && description) {
      this.props.createChannel({ name, description, status }).then(() => {
        this.clearInput();
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
                ref={c => {
                  this.inputChannelName = c;
                }}
              />
            </div>
          </div>
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
                ref={c => {
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
