import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import { DatePicker } from '../../../components/UI';

class CreateCampaignForm extends Component {

  static propTypes = {
    filters: PropTypes.object,
    createCampaign: PropTypes.func,
    advertisers: PropTypes.array,
    advertiserId: PropTypes.string,
    getAdvertiser: PropTypes.func,
  };

  clearInput(event) { // eslint-disable-line no-unused-vars, class-methods-use-this
    this.inputCampaignName.value = null;
    this.inputCampaignViews.value = null;
    this.inputCampaignViewPerSession.value = null;
    this.inputCampaignTimeResetViewCount.value = null;
    this.inputCampaignWeight.value = null;
    this.inputCampaignDescription.value = null;
  }

  createCampaign() {
    const name = this.inputCampaignName.value;
    let advertiserId = '';
    if (this.props.advertiserId) {
      advertiserId = this.props.advertiserId;
    } else {
      advertiserId = this.inputAdvertiser.value;
    }
    const startTime = new Date(moment(new Date(document.getElementById('inputCampaignStartTime').value)).format('YYYY-MM-DD 00:00:00'));
    const endTime = new Date(moment(new Date(document.getElementById('inputCampaignEndTime').value)).format('YYYY-MM-DD 00:00:00'));
    const views = this.inputCampaignViews.value;
    const viewPerSession = this.inputCampaignViewPerSession.value;
    const timeResetViewCount = this.inputCampaignTimeResetViewCount.value;
    const weight = this.inputCampaignWeight.value;
    const description = this.inputCampaignDescription.value;
    const status = this.inputCampaignStatus.value;
    if (name && advertiserId && startTime && endTime && views && viewPerSession
      && timeResetViewCount && weight && description) {
      if (moment(startTime).format('x') < moment(endTime).format('x')) {
        this.props.createCampaign({
          advertiserId,
          name,
          startTime,
          endTime,
          views,
          viewPerSession,
          timeResetViewCount,
          weight,
          description,
          status,
        }).then(() => {
          this.clearInput();
          if (this.props.advertiserId) {
            this.props.getAdvertiser(this.props.advertiserId);
          }
        });
      } else {
        document.getElementById('inputCampaignEndTime').value = null;
        document.getElementById('inputCampaignEndTime').focus();
      }
    }
  }

  render() {
    return (
      <form className="form-horizontal">
        <div className="box-body">
          <div className="form-group">
            <label
              htmlFor="inputCampaignName" className="col-sm-2 control-label"
            >Name</label>
            <div className="col-sm-10">
              <input
                type="text" className="form-control" id="inputCampaignName"
                placeholder="Admicro"
                ref={c => {
                  this.inputCampaignName = c;
                }}
              />
            </div>
          </div>
          { this.props.advertiserId ? ('') : (
            <div className="form-group">
              <label htmlFor="inputAdvertiser" className="col-sm-2 control-label">Advertiser</label>
              <div className="col-sm-10">
                <select
                  id="inputAdvertiser" className="form-control"
                  ref={c => {
                    this.inputAdvertiser = c;
                  }}
                >
                  {this.props.advertisers
                  && this.props.advertisers.map(advertiser => (
                    <option
                      key={advertiser.id} value={advertiser.id}
                    >
                      {advertiser.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
          <div className="form-group has-feedback">
            <label
              htmlFor="inputCampaignStartTime" className="col-sm-2 control-label"
            >
              Start Time
            </label>
            <div className=" col-sm-10 date">
              <span className="fa fa-calendar form-control-feedback" />
              <DatePicker
                id="inputCampaignStartTime"
                timeValue="start"
              />
            </div>
          </div>
          <div className="form-group has-feedback">
            <label
              htmlFor="inputCampaignEndTime"
              className="col-sm-2 control-label"
            >
              End Time
            </label>
            <div className=" col-sm-10 date">
              <span className="fa fa-calendar form-control-feedback" />
              <DatePicker
                id="inputCampaignEndTime"
                timeValue="end"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="inputCampaignViews" className="col-sm-2 control-label">Total Views</label>
            <div className="col-sm-10">
              <input
                type="number" className="form-control" id="inputCampaignViews"
                placeholder="1000"
                ref={c => {
                  this.inputCampaignViews = c;
                }}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="inputCampaignViewPerSession" className="col-sm-2 control-label">Views/Session</label>
            <div className="col-sm-10">
              <input
                type="number" className="form-control" id="inputCampaignViewPerSession"
                placeholder="10"
                ref={c => {
                  this.inputCampaignViewPerSession = c;
                }}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="inputCampaignTimeResetViewCount" className="col-sm-2 control-label">Time reset view(h)</label>
            <div className="col-sm-10">
              <input
                type="number" className="form-control"
                id="inputCampaignTimeResetViewCount"
                placeholder="24"
                ref={c => {
                  this.inputCampaignTimeResetViewCount = c;
                }}
              />
            </div>
          </div>
          <div className="form-group">
            <label
              htmlFor="inputCampaignWeight"
              className="col-sm-2 control-label"
            >Weight</label>
            <div className="col-sm-10">
              <input
                type="number" className="form-control" id="inputCampaignWeight"
                placeholder="1"
                ref={c => {
                  this.inputCampaignWeight = c;
                }}
              />
            </div>
          </div>
          <div className="form-group">
            <label
              htmlFor="inputCampaignStatus"
              className="col-sm-2 control-label"
            >Status</label>
            <div className="col-sm-10">
              <select
                id="inputCampaignStatus" className="form-control"
                ref={c => {
                  this.inputCampaignStatus = c;
                }}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label
              htmlFor="inputCampaignDescription"
              className="col-sm-2 control-label"
            >Description</label>
            <div className="col-sm-10">
              <textarea
                className="form-control" id="inputCampaignDescription"
                rows="5" placeholder="More info..."
                ref={c => {
                  this.inputCampaignDescription = c;
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
          ><i className="fa fa-eraser" /> Clear</a>
          <a
            className="btn btn-app pull-right"
            onClick={event => this.createCampaign(event)}
          ><i className="fa fa-check" /> Confirm</a>
          {/* eslint-enable jsx-a11y/no-static-element-interactions */}
        </div>
        {/* /.box-footer */}
      </form>
    );
  }
}

export default CreateCampaignForm;
