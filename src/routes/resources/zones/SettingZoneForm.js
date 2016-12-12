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
      characterSet,
      supportThirdParty,
    } = nextProps.zone && (nextProps.zone || {});
    this.inputZoneThirdParty.value = supportThirdParty;
    this.inputZoneCharacterSet.value = characterSet;
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
    zone.characterSet = this.inputZoneCharacterSet.value;

    this.props.updateZone(zone).then(() => {
      this.props.getZone(this.props.zoneId);
    });
  }

  render() {
    return (
      <form className="form-horizontal">
        <div className="box-body">
          <div className="form-group">
            <label
              htmlFor="inputZoneShowBannerAgain"
              className="col-sm-2 control-label"
            >Show the banner again on the same page</label>
            <div className="col-sm-10">
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
            <div className="col-sm-10">
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
            <div className="col-sm-10">
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
                <option value="0">None</option>
                <option value="autoDetect">Auto-detect</option>
                <option value="ISO-8859-6">Arabic (ISO-8859-6)</option>
                <option value="Windows-1256">Arabic (Windows-1256)</option>
                <option value="ISO-8859-4">Baltic (ISO-8859-4)</option>
                <option value="Windows-1257">Baltic (Windows-1257)</option>
                <option value="ISO-8859-2">Central European (ISO-8859-2)</option>
                <option value="Windows-1250">Central European (Windows-1250)</option>
                <option value="GB18030">Chinese Simplified (GB18030)</option>
                <option value="GB2312">Chinese Simplified (GB2312)</option>
                <option value="HZ">Chinese Simplified (HZ)</option>
                <option value="Big5">Chinese Traditional (Big5)</option>
                <option value="ISO-8859-5">Cyrillic (ISO-8859-5)</option>
                <option value="KOI8-R">Cyrillic (KOI8-R)</option>
                <option value="Windows-1251">Cyrillic (Windows-1251)</option>
                <option value="ISO-8859-13">Estonian (ISO-8859-13)</option>
                <option value="ISO-8859-7">Greek (ISO-8859-7)</option>
                <option value="Windows-1253">Greek (Windows-1253)</option>
                <option value="ISO-8859-8-l">Hebrew (ISO Logical: ISO-8859-8-l)</option>
                <option value="ISO-8859-8">Hebrew (ISO:Visual: ISO-8859-8)</option>
                <option value="Windows-1255">Hebrew (Windows-1255)</option>
                <option value="EUC-JP">Japanese (EUC-JP)</option>
                <option value="Shift-JIS">Japanese (Shift-JIS)</option>
                <option value="EUC-KR">Korean (EUC-KR)</option>
                <option value="ISO-8859-15">Latin 9 (ISO-8859-15)</option>
                <option value="TIS-620">Thai (TIS-620)</option>
                <option value="ISO-8859-9">Turkish (ISO-8859-9)</option>
                <option value="Windows-1254">Turkish (Windows-1254)</option>
                <option value="UTF-8">Unicode (UTF-8)</option>
                <option value="Windows-1258">Vietnamese (Windows-1258)</option>
                <option value="ISO-8859-1">Western European (ISO-8859-1)</option>
                <option value="Windows-1252">Western European (Windows-1252)</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label
              htmlFor="isShowTextBanner"
              className="col-sm-2 control-label"
            >Include Description</label>
            <div className="col-sm-10">
              <ICheck
                type="checkbox" id="inputZoneIncludeDescription" className="form-control"
                ref={c => {
                  this.inputZoneIncludeDescription = c;
                }}
              />
            </div>
          </div>
        </div>
        {/* /.box-body */}
        <div className="box-footer">
          <Link
            to="/resource/zone"
            className="btn btn-app pull-right"
          >
            <i className="fa fa-undo" />
            Cancel
          </Link>
          <Link
            to="#"
            className="btn btn-app pull-right"
            onClick={event => this.updateZone(event)}
          ><i className="fa fa-floppy-o" /> Save</Link>
        </div>
        {/* /.box-footer */}
      </form>
    );
  }
}

export default SettingZoneForm;
