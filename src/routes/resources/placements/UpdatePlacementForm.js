import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import { DatePicker } from '../../../components/UI';
import Link from '../../../components/Link';

class UpdatePlacementForm extends Component {

  static propTypes = {
    placementId: PropTypes.string.isRequired,
    updatePlacement: PropTypes.func,
    placement: PropTypes.object,
    deletePlacement: PropTypes.func,
    getPlacement: PropTypes.func,
    campaigns: PropTypes.array,
    removePlacement: PropTypes.func,
    removePlacementInSharePlacement: PropTypes.func,
  };

  componentWillReceiveProps(nextProps) {
    const {
      name,
      startTime,
      endTime,
      width,
      height,
      weight,
      description,
      campaignId,
      status,
    } = nextProps.placement && (nextProps.placement || {});

    this.inputPlacementName.value = name;
    document.getElementById('inputPlacementStartTime').value = moment(new Date(startTime)).format('L');
    document.getElementById('inputPlacementEndTime').value = moment(new Date(endTime)).format('L');
    if (width) {
      this.inputPlacementWidth.value = width;
    }
    if (height) {
      this.inputPlacementHeight.value = height;
    }
    if (weight) {
      this.inputPlacementWeight.value = weight;
    }
    this.inputPlacementDescription.value = description;
    this.inputCampaign.value = campaignId;
    this.inputPlacementStatus.value = status;
  }

  updatePlacement() {
    const name = this.inputPlacementName.value;
    const width = this.inputPlacementWidth.value;
    const height = this.inputPlacementHeight.value;
    const startTime = document.getElementById('inputPlacementStartTime').value;
    const endTime = document.getElementById('inputPlacementEndTime').value;
    const weight = this.inputPlacementWeight.value;
    const description = this.inputPlacementDescription.value;
    const campaignId = this.inputCampaign.value;
    const status = this.inputPlacementStatus.value;
    const placement = { id: this.props.placementId };

    if (name && name !== this.props.placement.name) {
      placement.name = name;
    }

    if (startTime && startTime !== this.props.placement.startTime) {
      placement.startTime = startTime;
    }

    if (endTime && endTime !== this.props.placement.endTime) {
      placement.endTime = endTime;
    }

    if (weight && weight !== this.props.placement.weight) {
      placement.weight = weight;
    }

    if (description && description !== this.props.placement.description) {
      placement.description = description;
    }

    if (width && width !== this.props.placement.width) {
      placement.width = width;
    }

    if (height && height !== this.props.placement.height) {
      placement.height = height;
    }

    if (campaignId && campaignId !== this.props.placement.campaignId) {
      placement.campaignId = campaignId;
    }

    if (status && status !== this.props.placement.status) {
      placement.status = status;
    }

    if (moment(new Date(startTime)).format('x') < moment(new Date(endTime)).format('x')) {
      this.props.updatePlacement(placement).then(() => {
        this.props.getPlacement(this.props.placementId);
      });
    } else {
      document.getElementById('inputPlacementEndTime').value = null;
      document.getElementById('inputPlacementEndTime').focus();
    }
  }

  deletePlacement() {
    this.props.deletePlacement(this.props.placementId);
    this.props.removePlacement(this.props.placementId);
    this.props.removePlacementInSharePlacement(this.props.placementId);
  }

  render() {
    return (
      <form className="form-horizontal">
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

        <div className="form-group">
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
                <option
                  key={campaign.id} value={campaign.id}
                >
                  {campaign.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group has-feedback">
          <label
            htmlFor="inputPlacementStartTime" className="col-sm-2 control-label"
          >
            Start Time:
          </label>
          <div className=" col-sm-10 date">
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

        <div className="form-group has-feedback">
          <label
            htmlFor="inputPlacementEndTime" className="col-sm-2 control-label"
          >
            End Time:
          </label>
          <div className=" col-sm-10 date">
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

        <div className="form-group">
          <label htmlFor="inputPlacementWidth" className="col-sm-2 control-label">
            Size (Width)
          </label>
          <div className="col-sm-10">
            <input
              type="number" className="form-control" id="inputPlacementWidth"
              placeholder="300"
              ref={c => {
                this.inputPlacementWidth = c;
              }}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="inputPlacementHeight" className="col-sm-2 control-label">
            Size (Height)
          </label>
          <div className="col-sm-10">
            <input
              type="number" className="form-control" id="inputPlacementHeight"
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

        <hr />

        <div className="clearfix">
          <Link
            to="/resource/placement"
            className="btn btn-app pull-right"
          ><i className="fa fa-undo" /> Cancel</Link>
          <Link
            to="/resource/placement"
            className="btn btn-app pull-right"
            onClick={event => this.deletePlacement(event)}
          ><i className="fa fa-trash-o" /> Delete</Link>
          <Link
            to="#"
            className="btn btn-app pull-right"
            onClick={event => this.updatePlacement(event)}
          ><i className="fa fa-floppy-o" /> Save</Link>
        </div>
        {/* /.box-footer */}
      </form>
    );
  }
}

export default UpdatePlacementForm;
