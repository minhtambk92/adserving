
/* global $ */

import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import { DatePicker, ICheck } from '../../../components/UI';
import Link from '../../../components/Link';

class CreateCampaignForm extends Component {

  static propTypes = {
    filters: PropTypes.object,
    createCampaign: PropTypes.func,
    advertisers: PropTypes.array,
    advertiserId: PropTypes.string,
    getAdvertiser: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      showCPM: false,
      isStartNow: true,
      isEndNow: true,
    };
  }

  componentDidMount() {
    $('#inputIsCampaignStartNow').iCheck('check');
    $('#inputIsCampaignEndNow').iCheck('check');

    const self = this;

    $('#inputIsCampaignStartNow').on('ifClicked', () => {
      const isStartNow = document.getElementById('inputIsCampaignStartNow').checked;
      if (isStartNow === true) {
        self.setState({ isStartNow: false });
      } else if (isStartNow === false) {
        self.setState({ isStartNow: true });
      }
    });

    $('#inputIsCampaignEndNow').on('ifClicked', () => {
      const isEndNow = document.getElementById('inputIsCampaignEndNow').checked;
      if (isEndNow === true) {
        self.setState({ isEndNow: false });
      } else if (isEndNow === false) {
        self.setState({ isEndNow: true });
      }
    });
  }

  clearInput(event) { // eslint-disable-line no-unused-vars, class-methods-use-this
    this.inputCampaignName.value = null;
    this.inputCampaignViews.value = null;
    this.inputCampaignViewPerSession.value = null;
    this.inputCampaignTimeResetViewCount.value = null;
    this.inputCampaignWeight.value = null;
    this.inputCampaignDescription.value = null;
  }

  changeRevenueType() { // eslint-disable-line no-unused-vars, class-methods-use-this
    const revenueType = this.inputCampaignRevenueType.value;
    if (revenueType === 'cpm') {
      this.setState({ showCPM: true });
    } else {
      this.setState({ showCPM: false });
    }
  }

  createCampaign() {
    const name = this.inputCampaignName.value;
    let advertiserId = '';
    if (this.props.advertiserId) {
      advertiserId = this.props.advertiserId;
    } else {
      advertiserId = this.inputAdvertiser.value;
    }
    const views = this.inputCampaignViews.value;
    const viewPerSession = this.inputCampaignViewPerSession.value;
    const timeResetViewCount = this.inputCampaignTimeResetViewCount.value;
    const weight = this.inputCampaignWeight.value;
    const description = this.inputCampaignDescription.value;
    const status = this.inputCampaignStatus.value;
    const revenueType = this.inputCampaignRevenueType.value;
    let expireValueCPM = 0;
    let maxCPMPerDay = 0;
    if (this.state.showCPM === true && revenueType === 'cpm') {
      expireValueCPM = this.inputCampaignExpireValueCPM.value;
      maxCPMPerDay = this.inputCampaignMaxCPMPerDay.value;
    } else if (this.state.showCPM === false) {
      expireValueCPM = 0;
      maxCPMPerDay = 0;
    }

    let startTime = null;
    if (this.state.isStartNow === false) {
      startTime = new Date(moment(new Date(document.getElementById('inputCampaignStartTime').value)).format('YYYY-MM-DD 00:00:00'));
    } else if (this.state.isStartNow === true) {
      startTime = new Date(moment().format('YYYY-MM-DD 00:00:00'));
    }

    let endTime = null;
    if (this.state.isEndNow === true) {
      endTime = null;
    } else if (this.state.isEndNow === false) {
      endTime = new Date(moment(new Date(document.getElementById('inputCampaignEndTime').value)).format('YYYY-MM-DD 23:59:59'));
    }

    this.props.createCampaign({
      advertiserId,
      name,
      startTime,
      endTime,
      views,
      viewPerSession,
      timeResetViewCount,
      weight,
      revenueType,
      expireValueCPM,
      maxCPMPerDay,
      description,
      status,
    }).then(() => {
      this.clearInput();
      this.setState({ showCPM: false });
      if (this.props.advertiserId) {
        this.props.getAdvertiser(this.props.advertiserId);
      }
    });
  }

  render() {
    return (
      <form className="form-horizontal">
        <div className="box-body">
          <div className="form-group">
            <label
              htmlFor="inputCampaignName" className="col-sm-3 control-label"
            >Name</label>
            <div className="col-sm-9">
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
              <label htmlFor="inputAdvertiser" className="col-sm-3 control-label">Advertiser</label>
              <div className="col-sm-9">
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

          {/* /Start Time */}
          <div className="form-group">
            <label
              htmlFor="inputIsCampaignStartNow"
              className="col-sm-3 control-label"
            >Start Time</label>
            <div className="col-sm-1 checkbox">
              <ICheck
                type="checkbox" id="inputIsCampaignStartNow" className="form-control"
                ref={c => {
                  this.inputIsCampaignStartNow = c;
                }}
              />
            </div>
            <div className="col-sm-8 checkbox">
              Start Immediately
            </div>
          </div>
          {this.state.isStartNow === false ? (
            <div className="form-group has-feedback">
              <label
                htmlFor="inputCampaignStartTime" className="col-sm-3 control-label"
              >
                &nbsp;
              </label>
              <div className="col-sm-2">Set specific date</div>
              <div className=" col-sm-7 date">
                <span className="fa fa-calendar form-control-feedback" />
                {/* /DatePicker */}
                <DatePicker
                  id="inputCampaignStartTime"
                  type="text"
                  className="form-control pull-right"
                  name="start"
                />
              </div>
            </div>
          ) : ('')}

          {/* /End Time */}
          <div className="form-group">
            <label
              htmlFor="inputIsCampaignStartNow"
              className="col-sm-3 control-label"
            >End Time</label>
            <div className="col-sm-1 checkbox">
              <ICheck
                type="checkbox" id="inputIsCampaignEndNow" className="form-control"
                ref={c => {
                  this.inputIsCampaignEndNow = c;
                }}
              />
            </div>
            <div className="col-sm-8 checkbox">
              Dont expire
            </div>
          </div>
          {this.state.isEndNow === false ? (
            <div className="form-group has-feedback">
              <label
                htmlFor="inputCampaignEndTime"
                className="col-sm-3 control-label"
              >
                &nbsp;
              </label>
              <div className="col-sm-2">Set specific date</div>
              <div className=" col-sm-7 date">
                <span className="fa fa-calendar form-control-feedback" />
                {/* /DatePicker */}
                <DatePicker
                  id="inputCampaignEndTime"
                  type="text"
                  className="form-control pull-right"
                  name="end"
                />
              </div>
            </div>
          ) : ('')}
          <div className="form-group">
            <label
              htmlFor="inputCampaignRevenueType"
              className="col-sm-3 control-label"
            >Revenue Information</label>
            <div className="col-sm-9">
              <select
                id="inputCampaignRevenueType" className="form-control"
                onChange={event => this.changeRevenueType(event)}
                ref={c => {
                  this.inputCampaignRevenueType = c;
                }}
              >
                <option value="cpd">CPD</option>
                <option value="cpm">CPM</option>
                <option value="cpc">CPC</option>
                <option value="cpa">CPA</option>
                <option value="tenancy">Tenancy</option>
              </select>
            </div>
          </div>
          {/* /.SHOW CPM */}
          {this.state.showCPM === true ? (
            <div className="typeCPM">
              <div className="form-group">
                <div className="col-sm-3">&nbsp;</div>
                <label htmlFor="inputCampaignMaxCPMPerDay" className="col-sm-3 control-label">Expire
                  Value CPM</label>
                <div className="col-sm-6">
                  <input
                    type="number" className="form-control" id="inputCampaignExpireValueCPM"
                    placeholder="1000"
                    ref={c => {
                      this.inputCampaignExpireValueCPM = c;
                    }}
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="col-sm-3">&nbsp;</div>
                <label htmlFor="inputCampaignMaxCPMPerDay" className="col-sm-3 control-label">Max
                  CPM per Day</label>
                <div className="col-sm-6">
                  <input
                    type="number" className="form-control" id="inputCampaignMaxCPMPerDay"
                    placeholder="1000"
                    ref={c => {
                      this.inputCampaignMaxCPMPerDay = c;
                    }}
                  />
                </div>
              </div>
            </div>) : ('')}
          <div className="form-group">
            <label
              htmlFor="inputCampaignViews"
              className="col-sm-3 control-label"
            >Total Views</label>
            <div className="col-sm-9">
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
            <label htmlFor="inputCampaignViewPerSession" className="col-sm-3 control-label">Views/Session</label>
            <div className="col-sm-9">
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
            <label htmlFor="inputCampaignTimeResetViewCount" className="col-sm-3 control-label">Time
              reset view(h)</label>
            <div className="col-sm-9">
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
              className="col-sm-3 control-label"
            >Weight</label>
            <div className="col-sm-9">
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
              className="col-sm-3 control-label"
            >Status</label>
            <div className="col-sm-9">
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
              className="col-sm-3 control-label"
            >Description</label>
            <div className="col-sm-9">
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
          <Link
            to="#"
            className="btn btn-app pull-right"
            onClick={() => this.clearInput()}
          ><i className="fa fa-eraser" /> Clear</Link>
          <Link
            to="#"
            className="btn btn-app pull-right"
            onClick={event => this.createCampaign(event)}
          ><i className="fa fa-check" /> Confirm</Link>
        </div>
        {/* /.box-footer */}
      </form>
    );
  }
}

export default CreateCampaignForm;
