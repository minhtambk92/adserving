import React, { Component, PropTypes } from 'react';
import { ICheck } from '../../../components/UI';
import Link from '../../../components/Link';

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
    this.inputAdvertiserReportInterval.value = null;
    this.inputAdvertiserIsEmailReport.value = null;
    this.inputAdvertiserIsEmailStatus.value = null;
  }

  createAdvertiser() {
    const name = this.inputAdvertiserName.value;
    const contact = this.inputAdvertiserContact.value;
    const email = this.inputAdvertiserEmail.value;
    const isEmailStatus = document.getElementById('inputAdvertiserIsEmailStatus').checked;
    const isEmailReport = document.getElementById('inputAdvertiserIsEmailReport').checked;
    const reportInterval = this.inputAdvertiserReportInterval.value;
    const description = this.inputAdvertiserDescription.value;
    const status = this.inputAdvertiserStatus.value;

    if (contact && name && email && description) {
      this.props.createAdvertiser({
        email,
        name,
        contact,
        isEmailStatus,
        isEmailReport,
        reportInterval,
        description,
        status,
      }).then(() => {
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
            <label
              htmlFor="inputAdvertiserContact"
              className="col-sm-2 control-label"
            >Contact</label>
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
          {/* isEmailStatus */}
          <div className="form-group">
            <div className="col-sm-2">&nbsp;</div>
            <div className="col-sm-2">
              <ICheck
                type="checkbox" id="inputAdvertiserIsEmailStatus" className="form-control"
                ref={c => {
                  this.inputAdvertiserIsEmailStatus = c;
                }}
              />
            </div>
            <label
              htmlFor="inputBannerIsDefault"
              className="col-sm-6"
            >Email when a campaign is automatically activated/deactivated</label>
          </div>
          {/* isEmailReport */}
          <div className="form-group">
            <div className="col-sm-2">&nbsp;</div>
            <div className="col-sm-2">
              <ICheck
                type="checkbox" id="inputAdvertiserIsEmailReport" className="form-control"
                ref={c => {
                  this.inputAdvertiserIsEmailReport = c;
                }}
              />
            </div>
            <label
              htmlFor="inputBannerIsDefault"
              className="col-sm-6"
            >Email campaign delivery reports</label>
          </div>
          {/* reportInterval */}
          <div className="form-group">
            <div className="col-sm-2">&nbsp;</div>
            <div className="col-sm-2">
              <input
                type="text" className="form-control" id="inputAdvertiserReportInterval"
                placeholder="7"
                ref={c => {
                  this.inputAdvertiserReportInterval = c;
                }}
              />
            </div>
            <label
              htmlFor="inputAdvertiserEmail"
              className="col-sm-6"
            >Number of days between campaign delivery reports</label>
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
                  this.inputAdvertiserStatus = c;
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
          <Link
            to="#"
            className="btn btn-app pull-right"
            onClick={event => this.clearInput(event)}
          ><i className="fa fa-eraser" /> Clear</Link>
          <Link
            to="#"
            className="btn btn-app pull-right"
            onClick={event => this.createAdvertiser(event)}
          ><i className="fa fa-check" /> Confirm</Link>
        </div>
        {/* /.box-footer */}
      </form>
    );
  }
}

export default CreateAdvertiserForm;
