import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import { DatePicker } from '../../../components/UI';
import Link from '../../../components/Link';

class UpdateCampaignForm extends Component {

  static propTypes = {
    campaignId: PropTypes.string.isRequired,
    updateCampaign: PropTypes.func,
    campaign: PropTypes.object,
    deleteCampaign: PropTypes.func,
    advertisers: PropTypes.array,
    getCampaign: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      showCPM: false,
    };
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
    document.getElementById('inputCampaignStartTime').value = moment(new Date(startTime)).format('L');
    document.getElementById('inputCampaignEndTime').value = moment(new Date(endTime)).format('L');
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
    const startTime = document.getElementById('inputCampaignStartTime').value;
    const endTime = document.getElementById('inputCampaignEndTime').value;
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
    const campaign = { id: this.props.campaignId };

    if (name && name !== this.props.campaign.name) {
      campaign.name = name;
    }
    if (advertiserId &&
      advertiserId !== this.props.campaign.advertiserId) {
      campaign.advertiserId = advertiserId;
    }
    if (startTime && startTime !== this.props.campaign.startTime) {
      campaign.startTime = startTime;
    }

    if (endTime && endTime !== this.props.campaign.endTime) {
      campaign.endTime = endTime;
    }
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

    if (moment(new Date(startTime)).format('x') < moment(new Date(endTime)).format('x')) {
      this.props.updateCampaign(campaign).then(() => {
        this.props.getCampaign(this.props.campaignId);
      });
    } else {
      document.getElementById('inputCampaignEndTime').value = null;
      document.getElementById('inputCampaignEndTime').focus();
    }
  }

  deleteCampaign() {
    this.props.deleteCampaign(this.props.campaignId);
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
              ref={c => {
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
              ref={c => {
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
        <div className="form-group has-feedback">
          <label
            htmlFor="inputCampaignStartTime" className="col-sm-3 control-label"
          >Start Time:</label>
          <div className=" col-sm-9 date">
            <span className="fa fa-calendar form-control-feedback" />
            {/* /.box-body */}
            <DatePicker
              id="inputCampaignStartTime"
              type="text"
              className="form-control pull-right"
              name="start"
            />
          </div>
        </div>
        <div className="form-group has-feedback">
          <label
            htmlFor="inputCampaignEndTime" className="col-sm-3 control-label"
          >End Time:</label>
          <div className=" col-sm-9 date">
            <span className="fa fa-calendar form-control-feedback" />
            {/* /.box-body */}
            <DatePicker
              id="inputCampaignEndTime"
              type="text"
              className="form-control pull-right"
              name="end"
            />
          </div>
        </div>
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
              <label htmlFor="inputCampaignMaxCPMPerDay" className="col-sm-3 control-label">Expire Value CPM</label>
              <div className="col-sm-6">
                <input
                  type="number" className="form-control" id="inputCampaignExpireValueCPM"
                  defaultValue={this.props.campaign.expireValueCPM}
                  placeholder="1000"
                  ref={c => {
                    this.inputCampaignExpireValueCPM = c;
                  }}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-3">&nbsp;</div>
              <label htmlFor="inputCampaignMaxCPMPerDay" className="col-sm-3 control-label">Max CPM per Day</label>
              <div className="col-sm-6">
                <input
                  type="number" className="form-control" id="inputCampaignMaxCPMPerDay"
                  defaultValue={this.props.campaign.maxCPMPerDay}
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
            htmlFor="inputCampaignViews" className="col-sm-3 control-label"
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
          <label
            htmlFor="inputCampaignViewPerSession"
            className="col-sm-3 control-label"
          >Views/Session</label>
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
          <label
            htmlFor="inputCampaignTimeResetViewCount"
            className="col-sm-3 control-label"
          >Time reset view(h)</label>
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
              className="form-control" id="inputCampaignDescription" rows="5"
              placeholder="More info..."
              ref={c => {
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
