
/* global $ */

import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import { DatePicker, ICheck } from '../../../components/UI';
import Link from '../../../components/Link';

class UpdateCampaignForm extends Component {

  static propTypes = {
    campaignId: PropTypes.string.isRequired,
    updateCampaign: PropTypes.func,
    campaign: PropTypes.object,
    deleteCampaign: PropTypes.func,
    advertisers: PropTypes.array,
    getCampaign: PropTypes.func,
    createActivity: PropTypes.func,
    setPageCampaignActiveTab: PropTypes.func,
    user: PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      showCPM: false,
      isStartNow: false,
      isEndNow: false,
      isClickStartNow: false,
      isClickEndNow: false,
    };
  }

  componentDidMount() {
    const self = this;

    $('#inputIsCampaignStartNow').on('ifClicked', () => {
      const isStartNow = document.getElementById('inputIsCampaignStartNow').checked;
      self.setState({ isClickStartNow: true });
      if (isStartNow === true) {
        self.setState({ isStartNow: false });
      } else if (isStartNow === false) {
        self.setState({ isStartNow: true });
      }
    });

    $('#inputIsCampaignEndNow').on('ifClicked', () => {
      const isEndNow = document.getElementById('inputIsCampaignEndNow').checked;
      self.setState({ isClickEndNow: true });
      if (isEndNow === true) {
        self.setState({ isEndNow: false });
      } else if (isEndNow === false) {
        self.setState({ isEndNow: true });
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    const {
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
    } = nextProps.campaign && (nextProps.campaign || {});

    this.inputCampaignName.value = name;
    this.inputAdvertiser.value = advertiserId;
    this.setState({ isStartNow: false });
    if (this.inputIsCampaignStartTime) {
      document.getElementById('inputCampaignStartTime').value = moment(new Date(startTime)).format('L');
    }

    if (endTime === null) {
      this.setState({ isEndNow: true });
    } else if (endTime !== null) {
      this.setState({ isEndNow: false });
      if (this.inputIsCampaignEndTime !== null) {
        document.getElementById('inputCampaignEndTime').value = moment(new Date(endTime)).format('L');
      }
    }

    if (views) {
      this.inputCampaignViews.value = views;
    }
    if (viewPerSession) {
      this.inputCampaignViewPerSession.value = viewPerSession;
    }
    if (weight) {
      this.inputCampaignWeight.value = weight;
    }
    if (timeResetViewCount) {
      this.inputCampaignTimeResetViewCount.value = timeResetViewCount;
    }
    this.inputCampaignRevenueType.value = revenueType;
    if (revenueType === 'cpm') {
      this.setState({ showCPM: true });
      if (this.state.showCPM === true) {
        this.inputCampaignExpireValueCPM.value = expireValueCPM;
        this.inputCampaignMaxCPMPerDay.value = maxCPMPerDay;
      }
    }
    this.inputCampaignDescription.value = description;
    this.inputCampaignStatus.value = status;
  }

  componentDidUpdate() {
    /* eslint-disable no-undef */
    if (this.state.isClickStartNow === true && this.state.isStartNow === true) {
      $('#inputIsCampaignStartNow').iCheck('check');
    } else {
      $('#inputIsCampaignStartNow').iCheck('uncheck');
    }

    if (this.props.campaign) {
      if (this.state.isEndNow === true) {
        $('#inputIsCampaignEndNow').iCheck('check');
      } else if (this.state.isEndNow === false) {
        if (this.props.campaign.endTime === null && this.state.isClickEndNow === false) {
          $('#inputIsCampaignEndNow').iCheck('check');
        } else if (this.props.campaign.endTime !== null) {
          $('#inputIsCampaignEndNow').iCheck('uncheck');
        }
      }
    }
  }

  changeRevenueType() { // eslint-disable-line no-unused-vars, class-methods-use-this
    const revenueType = this.inputCampaignRevenueType.value;
    if (revenueType === 'cpm') {
      this.setState({ showCPM: true });
    } else {
      this.setState({ showCPM: false });
    }
  }

  updateCampaign() {
    const advertiserId = this.inputAdvertiser.value;
    const name = this.inputCampaignName.value;
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
    const views = this.inputCampaignViews.value;
    const viewPerSession = this.inputCampaignViewPerSession.value;
    const timeResetViewCount = this.inputCampaignTimeResetViewCount.value;
    const weight = this.inputCampaignWeight.value;
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
    const description = this.inputCampaignDescription.value;
    const status = this.inputCampaignStatus.value;
    const campaignObject = this.props.campaign;
    const campaign = { id: this.props.campaignId };

    if (name && name !== this.props.campaign.name) {
      campaign.name = name;
    }
    if (advertiserId &&
      advertiserId !== this.props.campaign.advertiserId) {
      campaign.advertiserId = advertiserId;
    }
    campaign.startTime = startTime;
    campaign.endTime = endTime;
    if (views && views !== this.props.campaign.views) {
      campaign.views = views;
    }
    if (viewPerSession &&
      viewPerSession !== this.props.campaign.viewPerSession) {
      campaign.viewPerSession = viewPerSession;
    }
    if (timeResetViewCount &&
      timeResetViewCount !== this.props.campaign.timeResetViewCount) {
      campaign.timeResetViewCount = timeResetViewCount;
    }
    if (weight && weight !== this.props.campaign.weight) {
      campaign.weight = weight;
    }

    if (revenueType && revenueType !== this.props.campaign.revenueType) {
      campaign.revenueType = revenueType;
    }
    campaign.expireValueCPM = expireValueCPM;
    campaign.maxCPMPerDay = maxCPMPerDay;

    if (description &&
      description !== this.props.campaign.description) {
      campaign.description = description;
    }

    campaign.status = status;
    this.props.updateCampaign(campaign).then(() => {
      const userId = this.props.user.id;
      const subject = `Campaign ${name}`;
      const subjectId = this.props.campaign.id;
      const action = 'updated';
      const other = JSON.stringify(campaignObject);
      this.props.createActivity({ action,
        subject,
        subjectId,
        other,
        userId }).then(() => {
          this.props.getCampaign(this.props.campaignId).then(() => {
            this.props.setPageCampaignActiveTab('editCampaign');
          });
        });
    });
  }

  deleteCampaign() {
    const campaignObject = this.props.campaign;
    this.props.deleteCampaign(this.props.campaignId).then(() => {
      const userId = this.props.user.id;
      const subject = `Campaign ${campaignObject.name}`;
      const subjectId = this.props.campaign.id;
      const action = 'deleted';
      const other = '';
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
            htmlFor="inputCampaignName" className="col-sm-3 control-label"
          >Name</label>
          <div className="col-sm-9">
            <input
              type="text" className="form-control" id="inputCampaignName"
              placeholder="Admicro"
              ref={(c) => {
                this.inputCampaignName = c;
              }}
            />
          </div>
        </div>
        <div className="form-group">
          <label
            htmlFor="inputAdvertiser" className="col-sm-3 control-label"
          >Advertiser</label>
          <div className="col-sm-9">
            <select
              id="inputAdvertiser" className="form-control"
              ref={(c) => {
                this.inputAdvertiser = c;
              }}
            >
              {this.props.advertisers &&
              this.props.advertisers.map(advertiser => (
                <option key={advertiser.id} value={advertiser.id}>
                  {advertiser.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* /Start Time */}
        <div className="form-group">
          <label
            htmlFor="inputIsCampaignStartNow"
            className="col-sm-3 control-label"
          >Start Time</label>
          <div className="col-sm-1 checkbox">
            <ICheck
              type="checkbox" id="inputIsCampaignStartNow" className="form-control"
              ref={(c) => {
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
                ref={(c) => {
                  this.inputIsCampaignStartTime = c;
                }}
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
              ref={(c) => {
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
                ref={(c) => {
                  this.inputIsCampaignEndTime = c;
                }}
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
              ref={(c) => {
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
                  defaultValue={this.props.campaign.expireValueCPM}
                  placeholder="1000"
                  ref={(c) => {
                    this.inputCampaignExpireValueCPM = c;
                  }}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-3">&nbsp;</div>
              <label htmlFor="inputCampaignMaxCPMPerDay" className="col-sm-3 control-label">Max CPM
                per Day</label>
              <div className="col-sm-6">
                <input
                  type="number" className="form-control" id="inputCampaignMaxCPMPerDay"
                  defaultValue={this.props.campaign.maxCPMPerDay}
                  placeholder="1000"
                  ref={(c) => {
                    this.inputCampaignMaxCPMPerDay = c;
                  }}
                />
              </div>
            </div>
          </div>) : ('')}
        <div className="form-group">
          <label
            htmlFor="inputCampaignViews" className="col-sm-3 control-label"
          >Total Views</label>
          <div className="col-sm-9">
            <input
              type="number" className="form-control" id="inputCampaignViews"
              placeholder="1000"
              ref={(c) => {
                this.inputCampaignViews = c;
              }}
            />
          </div>
        </div>
        <div className="form-group">
          <label
            htmlFor="inputCampaignViewPerSession"
            className="col-sm-3 control-label"
          >Views/Session</label>
          <div className="col-sm-9">
            <input
              type="number" className="form-control" id="inputCampaignViewPerSession"
              placeholder="10"
              ref={(c) => {
                this.inputCampaignViewPerSession = c;
              }}
            />
          </div>
        </div>
        <div className="form-group">
          <label
            htmlFor="inputCampaignTimeResetViewCount"
            className="col-sm-3 control-label"
          >Time reset view(h)</label>
          <div className="col-sm-9">
            <input
              type="number" className="form-control"
              id="inputCampaignTimeResetViewCount"
              placeholder="24"
              ref={(c) => {
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
              ref={(c) => {
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
              ref={(c) => {
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
              className="form-control" id="inputCampaignDescription" rows="5"
              placeholder="More info..."
              ref={(c) => {
                this.inputCampaignDescription = c;
              }}
            />
          </div>
        </div>
        {/* /.box-body */}
        <div className="clearfix">
          {/* eslint-disable jsx-a11y/no-static-element-interactions */}
          <Link
            to="/resource/campaign"
            className="btn btn-app pull-right"
          ><i className="fa fa-undo" />Cancel</Link>
          <Link
            to="/resource/campaign"
            className="btn btn-app pull-right"
            onClick={event => this.deleteCampaign(event)}
          ><i className="fa fa-trash-o" /> Delete</Link>
          <Link
            to="#"
            className="btn btn-app pull-right"
            onClick={event => this.updateCampaign(event)}
          ><i className="fa fa-floppy-o" /> Save</Link>
          {/* eslint-enable jsx-a11y/no-static-element-interactions */}
        </div>
        {/* /.box-footer */}
      </form>
    );
  }
}

export default UpdateCampaignForm;
