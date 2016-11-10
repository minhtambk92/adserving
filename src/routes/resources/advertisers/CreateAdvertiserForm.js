import React, { Component, PropTypes } from 'react';

class CreateAdvertiserForm extends Component {

  static propTypes = {
    filters: PropTypes.object,
    createAdvertiser: PropTypes.func,
  };

  clearInput() {
    this.inputAdvertiserName.value = null;
    this.inputAdvertiserContact.value = null;
    this.inputAdvertiserEmail.value = null;
    this.inputAdvertiserDescription.value = null;
  }

  createAdvertiser() {
    const name = this.inputAdvertiserName.value;
    const contact = this.inputAdvertiserContact.value;
    const email = this.inputAdvertiserEmail.value;
    const description = this.inputAdvertiserDescription.value;
    const status = this.inputAdvetiserStatus.value;

    if (contact && name && email && description) {
      this.props.createAdvertiser({ email, name, contact, description, status }).then(() => {
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
              htmlFor="inputAdvertiserName" className="col-sm-2 control-label"
            >Name</label>
            <div className="col-sm-10">
              <input
                type="text" className="form-control" id="inputAdvertiserName"
                placeholder="Admicro"
                ref={c => {
                  this.inputAdvertiserName = c;
                }}
              />
            </div>
          </div>
          {/* contact */}
          <div className="form-group">
            <label htmlFor="inputAdvertiserContact" className="col-sm-2 control-label">Contact</label>
            <div className="col-sm-10">
              <input
                type="text" className="form-control" id="inputAdvertiserContact"
                placeholder="0987654321"
                ref={c => {
                  this.inputAdvertiserContact = c;
                }}
              />
            </div>
          </div>
          {/* email */}
          <div className="form-group">
            <label
              htmlFor="inputAdvertiserEmail"
              className="col-sm-2 control-label"
            >Email</label>
            <div className="col-sm-10">
              <input
                type="text" className="form-control" id="inputAdvertiserEmail"
                placeholder="contact@dantri.com.vn"
                ref={c => {
                  this.inputAdvertiserEmail = c;
                }}
              />
            </div>
          </div>
          {/* status */}
          <div className="form-group">
            <label
              htmlFor="inputAdvertiserStatus"
              className="col-sm-2 control-label"
            >Status</label>
            <div className="col-sm-10">
              <select
                id="inputAdvertiserStatus" className="form-control"
                ref={c => {
                  this.inputAdvetiserStatus = c;
                }}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
          {/* description */}
          <div className="form-group">
            <label
              htmlFor="inputAdvertiserDescription"
              className="col-sm-2 control-label"
            >Description</label>
            <div className="col-sm-10">
              <textarea
                className="form-control" id="inputAdvertiserDescription"
                rows="5" placeholder="More info..."
                ref={c => {
                  this.inputAdvertiserDescription = c;
                }}
              />
            </div>
          </div>
        </div>
        {/* /.box-body */}
        <div className="box-footer">
          {/* eslint-disable jsx-a11y/no-static-element-interactions */}
          <a
            className="btn btn-app pull-right"
            onClick={event => this.clearInput(event)}
          ><i className="fa fa-eraser" /> Clear</a>
          <a
            className="btn btn-app pull-right"
            onClick={event => this.createAdvertiser(event)}
          ><i className="fa fa-check" /> Confirm</a>
          {/* eslint-enable jsx-a11y/no-static-element-interactions */}
        </div>
        {/* /.box-footer */}
      </form>
    );
  }
}

export default CreateAdvertiserForm;
