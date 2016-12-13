/* global $ */

import React, { Component, PropTypes } from 'react';
import { ICheck } from '../../../components/UI';
import Link from '../../../components/Link';

class UpdateAdvertiserForm extends Component {

  static propTypes = {
    advertiserId: PropTypes.string.isRequired,
    updateAdvertiser: PropTypes.func,
    advertiser: PropTypes.object,
    deleteAdvertiser: PropTypes.func,
    getAdvertiser: PropTypes.func,
  };

  componentWillReceiveProps(nextProps) {
    const {
      email,
      name,
      contact,
      reportInterval,
      description,
      status,
    } = nextProps.advertiser && (nextProps.advertiser || {});

    this.inputAdvertiserContact.value = contact;
    this.inputAdvertiserName.value = name;
    this.inputAdvertiserEmail.value = email;
    this.inputAdvertiserReportInterval.value = reportInterval;
    this.inputAdvertiserDescription.value = description;
    this.inputAdvertiserStatus.value = status;
  }

  componentDidUpdate() {
    if (this.props.advertiser) {
      if (this.props.advertiser.isEmailStatus === true) {
        $('#inputAdvertiserIsEmailStatus').iCheck('check');
      } else if (this.props.advertiser.isEmailStatus === false) {
        $('#inputAdvertiserIsEmailStatus').iCheck('uncheck');
      }
      if (this.props.advertiser.isEmailReport === true) {
        $('#inputAdvertiserIsEmailReport').iCheck('check');
      } else if (this.props.advertiser.isEmailReport === false) {
        $('#inputAdvertiserIsEmailReport').iCheck('uncheck');
      }
    }
  }

  updateAdvertiser() {
    const name = this.inputAdvertiserName.value;
    const contact = this.inputAdvertiserContact.value;
    const email = this.inputAdvertiserEmail.value;
    const description = this.inputAdvertiserDescription.value;
    const status = this.inputAdvertiserStatus.value;
    const isEmailStatus = document.getElementById('inputAdvertiserIsEmailStatus').checked;
    const isEmailReport = document.getElementById('inputAdvertiserIsEmailReport').checked;
    const reportInterval = this.inputAdvertiserReportInterval.value;
    const advertiser = { id: this.props.advertiserId };

    if (email && email !== this.props.advertiser.email) {
      advertiser.email = email;
    }

    if (name && name !== this.props.advertiser.name) {
      advertiser.name = name;
    }

    if (contact && contact !== this.props.advertiser.contact) {
      advertiser.contact = contact;
    }
    if (reportInterval && reportInterval !== this.props.advertiser.reportInterval) {
      advertiser.reportInterval = reportInterval;
    }

    advertiser.isEmailStatus = isEmailStatus;

    advertiser.isEmailReport = isEmailReport;

    if (description && description !== this.props.advertiser.description) {
      advertiser.description = description;
    }

    if (status && status !== this.props.advertiser.status) {
      advertiser.status = status;
    }

    this.props.updateAdvertiser(advertiser).then(() => {
      this.props.getAdvertiser(this.props.advertiserId);
    });
  }

  deleteAdvertiser() {
    this.props.deleteAdvertiser(this.props.advertiserId);
  }

  render() {
    return (
      <form className="form-horizontal">
        <div className="box-body">

          {/* Name */}
          <div className="form-group">
            <label
              htmlFor="inputAdvertiserName"
              className="col-sm-2 control-label"
            >Name</label>
            <div className="col-sm-10">
              <input
                type="text" className="form-control" id="inputAdvertiserName"
                placeholder="Dan Tri"
                ref={c => {
                  this.inputAdvertiserName = c;
                }}
              />
            </div>
          </div>

          {/* Contact */}
          <div className="form-group">
            <label
              htmlFor="inputAdvertiserContact" className="col-sm-2 control-label"
            >Contact</label>
            <div className="col-sm-10">
              <input
                type="text" className="form-control" id="inputAdvertiserContact"
                placeholder="0987666888"
                ref={c => {
                  this.inputAdvertiserContact = c;
                }}
              />
            </div>
          </div>

          {/* Email */}
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

          {/* Status */}
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

          {/* Description */}
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
            to="/resource/advertiser"
            className="btn btn-app pull-right"
          ><i className="fa fa-undo" /> Cancel</Link>
          <Link
            to="/resource/advertiser"
            className="btn btn-app pull-right"
            onClick={event => this.deleteAdvertiser(event)}
          ><i className="fa fa-trash-o" /> Delete</Link>
          <Link
            to="#"
            className="btn btn-app pull-right"
            onClick={event => this.updateAdvertiser(event)}
          ><i className="fa fa-floppy-o" /> Save</Link>
        </div>
        {/* /.box-footer */}
      </form>
    );
  }
}

export default UpdateAdvertiserForm;
