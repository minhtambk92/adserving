
/* global $ */

import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import { DatePicker, ICheck } from '../../../components/UI';
import Link from '../../../components/Link';

class CreatePlacementForm extends Component {

  static propTypes = {
    filters: PropTypes.object,
    createPlacement: PropTypes.func,
    campaigns: PropTypes.array,
    campaignId: PropTypes.string,
    getCampaign: PropTypes.func,
    bannerId: PropTypes.string,
    getBanner: PropTypes.func,
    placements: PropTypes.array,
    getPlacements: PropTypes.func,
    updateBanner: PropTypes.func,
    banner: PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      isStartNow: true,
      isNotExpiration: true,
    };
  }

  componentDidMount() {
    $('#inputIsPlacementStartNow').iCheck('check');
    $('#inputIsPlacementNotExpiration').iCheck('check');

    const self = this;

    $('#inputIsPlacementStartNow').on('ifClicked', () => {
      const isStartNow = document.getElementById('inputIsPlacementStartNow').checked;
      if (isStartNow === true) {
        self.setState({ isStartNow: false });
      } else if (isStartNow === false) {
        self.setState({ isStartNow: true });
      }
    });

    $('#inputIsPlacementNotExpiration').on('ifClicked', () => {
      const isEndNow = document.getElementById('inputIsPlacementNotExpiration').checked;
      if (isEndNow === true) {
        self.setState({ isNotExpiration: false });
      } else if (isEndNow === false) {
        self.setState({ isNotExpiration: true });
      }
    });
  }

  clearInput(event) { // eslint-disable-line no-unused-vars
    this.inputPlacementName.value = null;
    this.inputPlacementWidth.value = null;
    this.inputPlacementHeight.value = null;
    this.inputPlacementWeight.value = null;
    this.inputPlacementDescription.value = null;
  }

  createPlacement() {
    const name = this.inputPlacementName.value;

    let startTime = null;
    if (this.state.isStartNow === false) {
      startTime = new Date(moment(new Date(document.getElementById('inputCampaignStartTime').value)).format('YYYY-MM-DD 00:00:00'));
    } else if (this.state.isStartNow === true) {
      startTime = new Date(moment().format('YYYY-MM-DD 00:00:00'));
    }
    let endTime = null;
    if (this.state.isNotExpiration === true) {
      endTime = null;
    } else if (this.state.isNotExpiration === false) {
      endTime = new Date(moment(new Date(document.getElementById('inputCampaignEndTime').value)).format('YYYY-MM-DD 23:59:59'));
    }
    const width = this.inputPlacementWidth.value;
    const height = this.inputPlacementHeight.value;
    const weight = this.inputPlacementWeight.value;
    const description = this.inputPlacementDescription.value;
    let campaignId = '';
    if (this.props.campaignId) {
      campaignId = this.props.campaignId;
    } else {
      campaignId = this.inputCampaign.value;
    }
    const status = this.inputPlacementStatus.value;
    this.props.createPlacement({
      name,
      startTime,
      endTime,
      width,
      height,
      weight,
      description,
      campaignId,
      status,
    }).then(() => {
      this.clearInput();
      if (this.props.campaignId) {
        this.props.getCampaign(this.props.campaignId);
      } else if (this.props.bannerId && this.props.banner) {
        if (this.props.placements) {
          const placement = this.props.banner.placements;
          placement.push(this.props.placements[0]);
          const banner = this.props.banner;
          banner.placements = JSON.stringify(placement.map(p => ({
            id: p.id,
            name: p.name,
            width: p.width,
            height: p.height,
            startTime: p.startTime,
            endTime: p.endTime,
            weight: p.weight,
            description: p.description,
            campaignId: p.campaignId,
            status: p.status,
            isDeleted: false,
          })));
          let bannerTypeId = null;
          if (this.props.banner.bannerType) {
            bannerTypeId = this.props.banner.bannerType.id;
          } else if (this.props.banner.bannerTypeId) {
            bannerTypeId = this.props.banner.bannerTypeId;
          }
          banner.bannerTypeId = bannerTypeId;
          this.props.updateBanner(banner).then(() => {
            this.props.getBanner(this.props.bannerId);
          });
        }
      }
    });
  }

  render() {
    return (
      <form className="form-horizontal">
        <div className="box-body">
          <div className="form-group">
            <label
              htmlFor="inputPlacementName" className="col-sm-2 control-label"
            >Name</label>
            <div className="col-sm-10">
              <input
                type="text" className="form-control" id="inputPlacementName"
                placeholder="Admicro"
                ref={c => {
                  this.inputPlacementName = c;
                }}
              />
            </div>
          </div>
          { this.props.campaignId ? ('') : (
            <div className="form-group has-feedback">
              <label htmlFor="inputCampaign" className="col-sm-2 control-label">Campaign</label>
              <div className="col-sm-10">
                <select
                  id="inputCampaign" className="form-control"
                  ref={c => {
                    this.inputCampaign = c;
                  }}
                >
                  {this.props.campaigns
                  && this.props.campaigns.map(campaign => (
                    <option key={campaign.id} value={campaign.id}>{campaign.name}</option>
                  ))}
                </select>
              </div>
            </div>
          ) }

          {/* /Start Time */}
          <div className="form-group">
            <label
              htmlFor="inputIsPlacementStartNow"
              className="col-sm-3 control-label"
            >Start Time</label>
            <div className="col-sm-1 checkbox">
              <ICheck
                type="checkbox" id="inputIsPlacementStartNow" className="form-control"
                ref={c => {
                  this.inputIsPlacementStartNow = c;
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
                htmlFor="inputPlacementStartTime" className="col-sm-3 control-label"
              >
                  &nbsp;
              </label>
              <div className="col-sm-2">Set specific date</div>
              <div className=" col-sm-7 date">
                <span className="fa fa-calendar form-control-feedback" />
                {/* /DatePicker */}
                <DatePicker
                  id="inputPlacementStartTime"
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
              htmlFor="inputIsPlacementNotExpiration"
              className="col-sm-3 control-label"
            >End Time</label>
            <div className="col-sm-1 checkbox">
              <ICheck
                type="checkbox" id="inputIsPlacementNotExpiration" className="form-control"
                ref={c => {
                  this.inputIsPlacementNotExpiration = c;
                }}
              />
            </div>
            <div className="col-sm-8 checkbox">
              Dont expire
            </div>
          </div>
          {this.state.isNotExpiration === false ? (
            <div className="form-group has-feedback">
              <label
                htmlFor="inputPlacementEndTime"
                className="col-sm-3 control-label"
              >
                  &nbsp;
              </label>
              <div className="col-sm-2">Set specific date</div>
              <div className=" col-sm-7 date">
                <span className="fa fa-calendar form-control-feedback" />
                {/* /DatePicker */}
                <DatePicker
                  id="inputPlacementEndTime"
                  type="text"
                  className="form-control pull-right"
                  name="end"
                />
              </div>
            </div>
            ) : ('')}

          <div className="form-group">
            <label
              htmlFor="inputPlacementWidth"
              className="col-sm-2 control-label"
            >Size(Width)</label>
            <div className="col-sm-10">
              <input
                type="number" className="form-control"
                id="inputPlacementWidth"
                placeholder="300"
                ref={c => {
                  this.inputPlacementWidth = c;
                }}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="inputPlacementHeight" className="col-sm-2 control-label">Size(Height)</label>
            <div className="col-sm-10">
              <input
                type="number" className="form-control"
                id="inputPlacementHeight"
                placeholder="300"
                ref={c => {
                  this.inputPlacementHeight = c;
                }}
              />
            </div>
          </div>
          <div className="form-group">
            <label
              htmlFor="inputPlacementWeight"
              className="col-sm-2 control-label"
            >Weight</label>
            <div className="col-sm-10">
              <input
                type="number" className="form-control" id="inputPlacementWeight"
                placeholder="1"
                ref={c => {
                  this.inputPlacementWeight = c;
                }}
              />
            </div>
          </div>
          <div className="form-group">
            <label
              htmlFor="inputPlacementStatus"
              className="col-sm-2 control-label"
            >Status</label>
            <div className="col-sm-10">
              <select
                id="inputPlacementStatus" className="form-control"
                ref={c => {
                  this.inputPlacementStatus = c;
                }}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label
              htmlFor="inputPlacementDescription"
              className="col-sm-2 control-label"
            >Description</label>
            <div className="col-sm-10">
              <textarea
                className="form-control" id="inputPlacementDescription"
                rows="5" placeholder="More info..."
                ref={c => {
                  this.inputPlacementDescription = c;
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
            onClick={event => this.createPlacement(event)}
          ><i className="fa fa-check" /> Confirm</Link>
        </div>
        {/* /.box-footer */}
      </form>
    );
  }
}

export default CreatePlacementForm;
