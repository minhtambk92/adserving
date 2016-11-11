import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import { DatePicker } from '../../../components/UI';
import Link from '../../../components/Link';

class CreatePlacementForm extends Component {

  static propTypes = {
    filters: PropTypes.object,
    createPlacement: PropTypes.func,
    campaigns: PropTypes.array,
    campaignId: PropTypes.string,
    getCampaign: PropTypes.func,
    zoneId: PropTypes.string,
    getZone: PropTypes.func,
    bannerId: PropTypes.string,
    getBanner: PropTypes.func,
    placements: PropTypes.array,
    createPlacementBannerZone: PropTypes.func,
    getPlacements: PropTypes.func,
  };
  clearInput(event) { // eslint-disable-line no-unused-vars, class-methods-use-this
    this.inputPlacementName.value = null;
    this.inputPlacementSizeWidth.value = null;
    this.inputPlacementSizeHeight.value = null;
    this.inputPlacementWeight.value = null;
    this.inputPlacementDescription.value = null;
  }

  createPlacement() {
    const name = this.inputPlacementName.value;
    const startTime = new Date(moment(new Date(document.getElementById('inputPlacementStartTime').value)).format('YYYY-MM-DD 00:00:00'));
    const endTime = new Date(moment(new Date(document.getElementById('inputPlacementEndTime').value)).format('YYYY-MM-DD 00:00:00'));
    const sizeWidth = this.inputPlacementSizeWidth.value;
    const sizeHeight = this.inputPlacementSizeHeight.value;
    const weight = this.inputPlacementWeight.value;
    const description = this.inputPlacementDescription.value;
    let campaignId = '';
    if (this.props.campaignId) {
      campaignId = this.props.campaignId;
    } else {
      campaignId = this.inputCampaign.value;
    }
    const status = this.inputPlacementStatus.value;
    if (name && startTime && endTime && sizeHeight && sizeWidth && weight && description) {
      if (moment(startTime).format('x') < moment(endTime).format('x')) {
        this.props.createPlacement({
          name,
          startTime,
          endTime,
          sizeWidth,
          sizeHeight,
          weight,
          description,
          campaignId,
          status,
        }).then(() => {
          this.clearInput();
          if (this.props.campaignId) {
            this.props.getCampaign(this.props.campaignId);
          } else if (this.props.zoneId) {
            const placementId = this.props.placements[0].id;
            const zoneId = this.props.zoneId;
            const bannerId = null;
            this.props.createPlacementBannerZone({ placementId, bannerId, zoneId }).then(() => {
              this.props.getZone(this.props.zoneId);
              this.props.getPlacements();
            });
          } else if (this.props.bannerId) {
            const placementId = this.props.placements[0].id;
            const bannerId = this.props.bannerId;
            const zoneId = null;
            this.props.createPlacementBannerZone({ placementId, bannerId, zoneId }).then(() => {
              this.props.getBanner(this.props.bannerId);
              this.props.getPlacements();
            });
          }
        });
      } else {
        document.getElementById('inputPlacementEndTime').value = null;
      }
    }
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
          <div className="form-group has-feedback">
            <label htmlFor="inputPlacementStartTime" className="col-sm-2 control-label">Start Time:</label>
            <div className=" col-sm-10 date">
              <span className="fa fa-calendar form-control-feedback" />
              <DatePicker
                id="inputPlacementStartTime"
                timeValue="start"
              />
            </div>
          </div>
          <div className="form-group has-feedback">
            <label htmlFor="inputPlacementEndTime" className="col-sm-2 control-label">End Time:</label>
            <div className=" col-sm-10 date">
              <span className="fa fa-calendar form-control-feedback" />
              <DatePicker
                id="inputPlacementEndTime"
                timeValue="end"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="inputPlacementSizeWidth" className="col-sm-2 control-label">Size(Width)</label>
            <div className="col-sm-10">
              <input
                type="number" className="form-control"
                id="inputPlacementSizeWidth"
                placeholder="300"
                ref={c => {
                  this.inputPlacementSizeWidth = c;
                }}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="inputPlacementSizeHeight" className="col-sm-2 control-label">Size(Height)</label>
            <div className="col-sm-10">
              <input
                type="number" className="form-control"
                id="inputPlacementSizeHeight"
                placeholder="300"
                ref={c => {
                  this.inputPlacementSizeHeight = c;
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
