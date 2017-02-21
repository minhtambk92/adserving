
/* global $ */

import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import { DatePicker, ICheck } from '../../../components/UI';
import Link from '../../../components/Link';

class UpdatePlacementForm extends Component {

  static propTypes = {
    placementId: PropTypes.string.isRequired,
    updatePlacement: PropTypes.func,
    placement: PropTypes.object,
    deletePlacement: PropTypes.func,
    getPlacement: PropTypes.func,
    campaigns: PropTypes.array,
    user: PropTypes.object,
    createActivity: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      isStartNow: false,
      isNotExpiration: false,
      isClickStartNow: false,
      isClickNotExpiration: false,
    };
  }

  componentDidMount() {
    const self = this;

    $('#inputIsPlacementStartNow').on('ifClicked', () => {
      const isStartNow = document.getElementById('inputIsPlacementStartNow').checked;
      self.setState({ isClickStartNow: true });
      if (isStartNow === true) {
        self.setState({ isStartNow: false });
      } else if (isStartNow === false) {
        self.setState({ isStartNow: true });
      }
    });

    $('#inputIsPlacementNotExpiration').on('ifClicked', () => {
      const isEndNow = document.getElementById('inputIsPlacementNotExpiration').checked;
      self.setState({ isClickNotExpiration: true });
      if (isEndNow === true) {
        self.setState({ isNotExpiration: false });
      } else if (isEndNow === false) {
        self.setState({ isNotExpiration: true });
      }
    });
  }

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

    this.setState({ isStartNow: false });
    if (this.inputIsPlacementStartTime) {
      document.getElementById('inputPlacementStartTime').value = moment(new Date(startTime)).format('L');
    }

    if (endTime === null) {
      this.setState({ isNotExpiration: true });
    } else if (endTime !== null) {
      this.setState({ isNotExpiration: false });
      if (this.inputIsPlacementEndTime !== null) {
        document.getElementById('inputPlacementEndTime').value = moment(new Date(endTime)).format('L');
      }
    }


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

  componentDidUpdate() {
    /* eslint-disable no-undef */
    if (this.state.isClickStartNow === true && this.state.isStartNow === true) {
      $('#inputIsPlacementStartNow').iCheck('check');
    } else {
      $('#inputIsPlacementStartNow').iCheck('uncheck');
    }

    if (this.props.placement) {
      if (this.state.isNotExpiration === true) {
        $('#inputIsPlacementNotExpiration').iCheck('check');
      } else if (this.state.isNotExpiration === false) {
        if (this.props.placement.endTime === null && this.state.isClickNotExpiration === false) {
          $('#inputIsPlacementNotExpiration').iCheck('check');
        } else if (this.props.placement.endTime !== null) {
          $('#inputIsPlacementNotExpiration').iCheck('uncheck');
        }
      }
    }
  }

  updatePlacement() {
    const name = this.inputPlacementName.value;
    const width = this.inputPlacementWidth.value;
    const height = this.inputPlacementHeight.value;
    let startTime = null;
    if (this.state.isStartNow === false) {
      startTime = new Date(moment(new Date(document.getElementById('inputPlacementStartTime').value)).format('YYYY-MM-DD 00:00:00'));
    } else if (this.state.isStartNow === true) {
      startTime = new Date(moment().format('YYYY-MM-DD 00:00:00'));
    }

    let endTime = null;
    if (this.state.isNotExpiration === true) {
      endTime = null;
    } else if (this.state.isNotExpiration === false) {
      endTime = new Date(moment(new Date(document.getElementById('inputPlacementEndTime').value)).format('YYYY-MM-DD 23:59:59'));
    }
    const weight = this.inputPlacementWeight.value;
    const description = this.inputPlacementDescription.value;
    const campaignId = this.inputCampaign.value;
    const status = this.inputPlacementStatus.value;
    const placementObject = this.props.placement;
    const placement = { id: this.props.placementId };

    placement.name = name;
    placement.weight = weight;
    placement.width = width;
    placement.height = height;
    placement.status = status;
    placement.startTime = startTime;
    placement.endTime = endTime;

    if (description && description !== this.props.placement.description) {
      placement.description = description;
    }

    if (campaignId && campaignId !== this.props.placement.campaignId) {
      placement.campaignId = campaignId;
    }

    this.props.updatePlacement(placement).then(() => {
      const userId = this.props.user.id;
      const subject = `Placement ${name}`;
      const subjectId = this.props.placementId;
      const action = 'updated';
      const other = JSON.stringify(placementObject);
      this.props.createActivity({ action,
        subject,
        subjectId,
        other,
        userId }).then(() => {
          this.props.getPlacement(this.props.placementId);
        });
    });
  }

  deletePlacement() {
    const placementObject = this.props.placement;
    this.props.deletePlacement(this.props.placementId).then(() => {
      const userId = this.props.user.id;
      const subject = `Placement ${placementObject.name}`;
      const subjectId = this.props.placementId;
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
                ref={c => {
                  this.inputIsPlacementStartTime = c;
                }}
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
                ref={c => {
                  this.inputIsPlacementEndTime = c;
                }}
              />
            </div>
          </div>
          ) : ('')}

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
