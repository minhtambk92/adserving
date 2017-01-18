/* global $ */

import React, { Component, PropTypes } from 'react';
import { ICheck } from '../../../components/UI';
import Link from '../../../components/Link';

class SettingZoneForm extends Component {

  static propTypes = {
    zoneId: PropTypes.string.isRequired,
    updateZone: PropTypes.func,
    zone: PropTypes.object,
    getZone: PropTypes.func,
    setPageZoneActiveTab: PropTypes.func,
    characterSetList: PropTypes.array,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      checkTypeZone: true,
    };
  }

  componentWillReceiveProps(nextProps) {
    const {
      targetIFrame,
      source,
      characterSetId,
      supportThirdParty,
    } = nextProps.zone && (nextProps.zone || {});
    this.inputZoneThirdParty.value = supportThirdParty;
    this.inputZoneCharacterSet.value = characterSetId;
    this.inputZoneSource.value = source;
    this.inputZoneTargetIFrame.value = targetIFrame;
  }

  componentDidUpdate() {
    if (this.props.zone) {
      if (this.props.zone.isShowBannerAgain === true) {
        $('#inputZoneShowBannerAgain').iCheck('check');
      } else if (this.props.zone.isShowBannerAgain === false) {
        $('#inputZoneShowBannerAgain').iCheck('uncheck');
      }
      if (this.props.zone.isShowCampaignAgain === true) {
        $('#inputZoneShowCampaignAgain').iCheck('check');
      } else if (this.props.zone.isShowCampaignAgain === false) {
        $('#inputZoneShowCampaignAgain').iCheck('uncheck');
      }
      if (this.props.zone.isShowTextBanner === true) {
        $('#inputZoneShowTextBanner').iCheck('check');
      } else if (this.props.zone.isShowTextBanner === false) {
        $('#inputZoneShowTextBanner').iCheck('uncheck');
      }
      if (this.props.zone.isIncludeDescription === true) {
        $('#inputZoneIncludeDescription').iCheck('check');
      } else if (this.props.zone.isIncludeDescription === false) {
        $('#inputZoneIncludeDescription').iCheck('uncheck');
      }
    }
  }

  updateZone() {
    const zone = { id: this.props.zoneId };
    zone.targetIFrame = this.inputZoneTargetIFrame.value;
    zone.isIncludeDescription = document.getElementById('inputZoneIncludeDescription').checked;
    zone.isShowBannerAgain = document.getElementById('inputZoneShowBannerAgain').checked;
    zone.isShowTextBanner = document.getElementById('inputZoneShowTextBanner').checked;
    zone.isShowCampaignAgain = document.getElementById('inputZoneShowCampaignAgain').checked;
    zone.source = this.inputZoneSource.value;
    zone.supportThirdParty = this.inputZoneThirdParty.value;
    zone.characterSetId = this.inputZoneCharacterSet.value;

    this.props.updateZone(zone).then(() => {
      this.props.getZone(this.props.zoneId);
      this.props.setPageZoneActiveTab('settingZone');
    });
  }

  render() {
    return (
      <form className="form-horizontal">
        <div className="form-group">
          <label
            htmlFor="inputZoneShowBannerAgain"
            className="col-sm-2 control-label"
          >Show the banner again on the same page</label>
          <div className="col-sm-10 checkbox">
            <ICheck
              type="checkbox" id="inputZoneShowBannerAgain" className="form-control"
              ref={c => {
                this.inputZoneShowBannerAgain = c;
              }}
            />
          </div>
        </div>

        <div className="form-group">
          <label
            htmlFor="inputZoneTargetIFrame"
            className="col-sm-2 control-label"
          >Target IFrame</label>
          <div className="col-sm-10">
            <select
              id="inputZoneTargetIFrame"
              className="form-control"
              ref={c => {
                this.inputZoneTargetIFrame = c;
              }}
            >
              <option value="0">Default</option>
              <option value="_blank">New window</option>
              <option value="_top">Same window</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label
            htmlFor="inputZoneSource"
            className="col-sm-2 control-label"
          >Source</label>
          <div className="col-sm-10">
            <input
              type="text" className="form-control" id="inputZoneSource"
              placeholder="Dan Tri"
              ref={c => {
                this.inputZoneSource = c;
              }}
            />
          </div>
        </div>
        <div className="form-group">
          <label
            htmlFor="inputZoneShowTextBanner"
            className="col-sm-2 control-label"
          >Show text below banner</label>
          <div className="col-sm-10 checkbox">
            <ICheck
              type="checkbox" id="inputZoneShowTextBanner" className="form-control"
              ref={c => {
                this.inputZoneShowTextBanner = c;
              }}
            />
          </div>
        </div>
        <div className="form-group">
          <label
            htmlFor="inputZoneShowCampaignAgain"
            className="col-sm-2 control-label"
          >Show a banner from the same campaign again on the same page</label>
          <div className="col-sm-10 checkbox">
            <ICheck
              type="checkbox" id="inputZoneShowCampaignAgain" className="form-control"
              ref={c => {
                this.inputZoneShowCampaignAgain = c;
              }}
            />
          </div>
        </div>
        <div className="form-group">
          <label
            htmlFor="inputZoneThirdParty"
            className="col-sm-2 control-label"
          >Support ThirdParty Tracking</label>
          <div className="col-sm-10">
            <select
              id="inputZoneThirdParty"
              className="form-control"
              ref={c => {
                this.inputZoneThirdParty = c;
              }}
            >
              <option value="0">No</option>
              <option value="generic">Generic</option>
              <option value="doubleclick">Rich Media - Doubleclick</option>
              <option value="max">Rich Media - OpenX</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label
            htmlFor="inputZoneCharacterSet"
            className="col-sm-2 control-label"
          >Character Set</label>
          <div className="col-sm-10">
            <select
              id="inputZoneCharacterSet"
              className="form-control"
              ref={c => {
                this.inputZoneCharacterSet = c;
              }}
            >
              <option value="null">None</option>
              {this.props.characterSetList && this.props.characterSetList.map(characterSet => (
                <option
                  key={characterSet.id} value={characterSet.id}
                >{characterSet.name} </option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-group">
          <label
            htmlFor="isShowTextBanner"
            className="col-sm-2 control-label"
          >Include Description</label>
          <div className="col-sm-10 checkbox">
            <ICheck
              type="checkbox" id="inputZoneIncludeDescription" className="form-control"
              ref={c => {
                this.inputZoneIncludeDescription = c;
              }}
            />
          </div>
        </div>

        <hr />

        <div className="clearfix">
          <Link
            to="/resource/zone"
            className="btn btn-app pull-right"
          ><i className="fa fa-undo" /> Cancel</Link>
          <Link
            to="#"
            className="btn btn-app pull-right"
            onClick={event => this.updateZone(event)}
          ><i className="fa fa-floppy-o" /> Save</Link>
        </div>
      </form>
    );
  }
}

export default SettingZoneForm;
