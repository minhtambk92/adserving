import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import { DatePicker } from '../../../components/UI';
import Link from '../../../components/Link';

class UpdateBannerForm extends Component {

  static propTypes = {
    bannerId: PropTypes.string.isRequired,
    updateBanner: PropTypes.func,
    banner: PropTypes.object,
    getBanner: PropTypes.func,
    channels: PropTypes.array,
  };
  constructor(props, context) {
    super(props, context);

    this.state = {
      showActivationDate: false,
      showExpirationDate: false,
      showImpressionsBooked: false,
      showClicksBooked: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    const {
      countView,
      fixIE,
      isDefault,
      isRelative,
      impressionsBooked,
      clicksBooked,
      activationDate,
      expirationDate,
      adStore,
      impressionsBookedValue,
      clicksBookedValue,
      activationDateValue,
      expirationDateValue,
    } = nextProps.banner && (nextProps.banner || {});
    this.inputBannerCountView.value = countView;
    this.inputBannerFixIE.value = fixIE;
    this.inputBannerIsDefault.value = isDefault;
    this.inputBannerIsRelative.value = isRelative;
    this.inputBannerAdStore.value = adStore;
    this.inputImpressionsBooked.value = impressionsBooked;
    if (impressionsBooked === '1') {
      this.setState({ showImpressionsBooked: true });
      if (this.inputBannerImpressionsBooked !== undefined) {
        this.inputBannerImpressionsBooked.value = impressionsBookedValue;
      }
    } else if (impressionsBooked === '0') {
      this.setState({ showImpressionsBooked: false });
    }
    this.inputClicksBooked.value = clicksBooked;
    if (clicksBooked === '1') {
      this.setState({ showClicksBooked: true });
      if (this.inputBannerClicksBooked !== undefined) {
        this.inputBannerClicksBooked.value = clicksBookedValue;
      }
    } else if (clicksBooked === '0') {
      this.setState({ showClicksBooked: false });
    }
    this.inputActivationDate.value = activationDate;
    if (activationDate === '1') {
      if (this.inputBannerActivationDate) {
        document.getElementById('inputBannerActivationDate').value = moment(new Date(activationDateValue)).format('L');
      }
      // this.inputBannerActivationDate.value = activationDateValue;
      this.setState({ showActivationDate: true });
    } else if (activationDate === '0') {
      this.setState({ showActivationDate: false });
    }
    this.inputExpirationDate.value = expirationDate;
    if (expirationDate === '1') {
      this.setState({ showExpirationDate: true });
      if (this.inputBannerExpirationDate) {
        document.getElementById('inputBannerExpirationDate').value = moment(new Date(expirationDateValue)).format('L');
      }
    } else if (expirationDate === '0') {
      this.setState({ showExpirationDate: false });
    }
  }
  chooseExpirationDate() { // eslint-disable-line no-unused-vars, class-methods-use-this
    const expirationDate = this.inputExpirationDate.value;
    if (expirationDate === '1') {
      this.setState({ showExpirationDate: true });
    } else if (expirationDate === '0') {
      this.setState({ showExpirationDate: false });
    }
  }

  chooseActivationDate() { // eslint-disable-line no-unused-vars, class-methods-use-this
    const activationDate = this.inputActivationDate.value;
    if (activationDate === '1') {
      this.setState({ showActivationDate: true });
    } else if (activationDate === '0') {
      this.setState({ showActivationDate: false });
    }
  }

  chooseImpressionsBooked() { // eslint-disable-line no-unused-vars, class-methods-use-this
    const impressionsBooked = this.inputImpressionsBooked.value;
    if (impressionsBooked === '1') {
      this.setState({ showImpressionsBooked: true });
    } else if (impressionsBooked === '0') {
      this.setState({ showImpressionsBooked: false });
    }
  }

  chooseClicksBooked() { // eslint-disable-line no-unused-vars, class-methods-use-this
    const clicksBooked = this.inputClicksBooked.value;
    if (clicksBooked === '1') {
      this.setState({ showClicksBooked: true });
    } else if (clicksBooked === '0') {
      this.setState({ showClicksBooked: false });
    }
  }
  updateBanner() {
    const countView = this.inputBannerCountView.value;
    const fixIE = this.inputBannerFixIE.value;
    const isDefault = this.inputBannerIsDefault.value;
    const isRelative = this.inputBannerIsRelative.value;
    const adStore = this.inputBannerAdStore.value;
    const impressionsBooked = this.inputImpressionsBooked.value;
    let impressionsBookedValue = '';
    if (impressionsBooked === '1') {
      this.setState({ showImpressionsBooked: true });
      impressionsBookedValue = this.inputBannerImpressionsBooked.value;
    } else if (impressionsBooked === '0') {
      impressionsBookedValue = 'unlimited';
    }
    const clicksBooked = this.inputClicksBooked.value;
    let clicksBookedValue = '';
    if (clicksBooked === '1') {
      this.setState({ showClicksBooked: true });
      clicksBookedValue = this.inputBannerClicksBooked.value;
    } else if (clicksBooked === '0') {
      clicksBookedValue = 'unlimited';
    }
    const activationDate = this.inputActivationDate.value;
    let activationDateValue = 0;
    if (activationDate === '1') {
      activationDateValue = new Date(moment(new Date(document.getElementById('inputBannerActivationDate').value)).format('YYYY-MM-DD 00:00:00'));
    } else if (activationDate === '0') {
      activationDateValue = new Date(moment().format('YYYY-MM-DD 00:00:00'));
    }
    const expirationDate = this.inputExpirationDate.value;
    let expirationDateValue = new Date();
    if (expirationDate === '1') {
      expirationDateValue = new Date(moment(new Date(document.getElementById('inputBannerExpirationDate').value)).format('YYYY-MM-DD 00:00:00'));
    } else if (expirationDate === '0') {
      expirationDateValue = new Date(moment(new Date('12-12-2117')).format('YYYY-MM-DD 00:00:00'));
    }
    const banner = { id: this.props.bannerId };
    if (countView && countView !== this.props.banner.countView) {
      banner.countView = countView;
    }
    if (fixIE && fixIE !== this.props.banner.fixIE) {
      banner.fixIE = fixIE;
    }
    if (isDefault && isDefault !== this.props.banner.isDefault) {
      banner.isDefault = isDefault;
    }
    if (isRelative && isRelative !== this.props.banner.isRelative) {
      banner.isRelative = isRelative;
    }
    if (adStore && adStore !== this.props.banner.adStore) {
      banner.adStore = adStore;
    }
    if (impressionsBookedValue &&
      impressionsBookedValue !== this.props.banner.impressionsBookedValue) {
      banner.impressionsBookedValue = impressionsBookedValue;
    }
    if (impressionsBooked && impressionsBooked !== this.props.banner.impressionsBooked) {
      banner.impressionsBooked = impressionsBooked;
    }
    if (clicksBooked && clicksBooked !== this.props.banner.clicksBooked) {
      banner.clicksBooked = clicksBooked;
    }
    if (clicksBookedValue && clicksBookedValue !== this.props.banner.clicksBookedValue) {
      banner.clicksBookedValue = clicksBookedValue;
    }
    if (activationDate && activationDate !== this.props.banner.activationDate) {
      banner.activationDate = activationDate;
    }
    if (activationDateValue && activationDateValue !== this.props.banner.activationDateValue) {
      banner.activationDateValue = activationDateValue;
    }
    if (expirationDate && expirationDate !== this.props.banner.expirationDate) {
      banner.expirationDate = expirationDate;
    }
    if (expirationDateValue && expirationDateValue !== this.props.banner.expirationDateValue) {
      banner.expirationDateValue = expirationDateValue;
    }
    this.props.updateBanner(banner).then(() => {
      this.props.getBanner(this.props.bannerId);
    });
  }

  render() {
    return (
      <div>
        <div className="box-body">
          {/* /Setting Detail */}
          <div className="box box-default">
            <div className="box-header with-border">
              <h3 className="box-title">Setting</h3>
              <div className="box-tools pull-right">
                <button
                  type="button" className="btn btn-box-tool"
                  data-widget="collapse"
                >
                  <i className="fa fa-minus" />
                </button>
              </div>
            </div>
            <div className="box-body">
              <form className="form-horizontal">
                <div className="form-group">
                  <label
                    htmlFor="inputBannerUserIFrame"
                    className="col-sm-2 control-label"
                  >Count View Banner</label>
                  <div className="col-sm-8">
                    <select
                      id="inputBannerCountView" className="form-control"
                      ref={c => {
                        this.inputBannerCountView = c;
                      }}
                    >
                      <option value="0">NO</option>
                      <option value="1">YES</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label
                    htmlFor="inputBannerFixIE"
                    className="col-sm-2 control-label"
                  >Fix IE(User for banner fail in IE)</label>
                  <div className="col-sm-8">
                    <select
                      id="inputBannerFixIE" className="form-control"
                      ref={c => {
                        this.inputBannerFixIE = c;
                      }}
                    >
                      <option value="0">NO</option>
                      <option value="1">YES</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label
                    htmlFor="inputBannerIsDefault"
                    className="col-sm-2 control-label"
                  >Is Default(Banner default)</label>
                  <div className="col-sm-8">
                    <select
                      id="inputBannerIsDefault" className="form-control"
                      ref={c => {
                        this.inputBannerIsDefault = c;
                      }}
                    >
                      <option value="0">NO</option>
                      <option value="1">YES</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label
                    htmlFor="inputBannerIsRelative"
                    className="col-sm-2 control-label"
                  >Relative()</label>
                  <div className="col-sm-8">
                    <select
                      id="inputBannerIsRelative" className="form-control"
                      placeholder="Marking the banner will appear on one page"
                      ref={c => {
                        this.inputBannerIsRelative = c;
                      }}
                    >
                      <option value="0">NO</option>
                      <option value="1">YES</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label
                    htmlFor="inputBannerAdStore"
                    className="col-sm-2 control-label"
                  >URL Ad-Store</label>
                  <div className="col-sm-8">
                    <input
                      type="text" className="form-control"
                      id="inputBannerAdStore" placeholder="1"
                      defaultValue="rd[timestamp]&rtu=-1"
                      ref={c => {
                        this.inputBannerAdStore = c;
                      }}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
          {/* /Inventory Detail */}
          <div className="box box-default">
            <div className="box-header with-border">
              <h3 className="box-title">Inventory Detail</h3>
              <div className="box-tools pull-right">
                <button
                  type="button" className="btn btn-box-tool"
                  data-widget="collapse"
                >
                  <i className="fa fa-minus" />
                </button>
              </div>
            </div>
            <div className="box-body">
              <form className="form-horizontal">
                {/* /Impressions Booked */}
                <div className="form-group">
                  <label
                    htmlFor="inputImpressionsBooked"
                    className="col-sm-2 control-label"
                  >Impressions Booked</label>
                  <div className="col-sm-8">
                    <select
                      id="inputImpressionsBooked" className="form-control"
                      ref={c => {
                        this.inputImpressionsBooked = c;
                      }}
                      onChange={event => this.chooseImpressionsBooked(event)}
                    >
                      <option value="0">Unlimited</option>
                      <option value="1">Input Impressions Booked</option>
                    </select>
                  </div>
                </div>
                { this.state.showImpressionsBooked === true ? (
                  <div className="form-group">
                    <label
                      htmlFor="inputBannerImpressionsBooked"
                      className="col-sm-2 control-label"
                    >&nbsp;</label>
                    <div className="col-sm-8">
                      <input
                        type="number" className="form-control"
                        id="inputBannerImpressionsBooked" placeholder="1000"
                        ref={c => {
                          this.inputBannerImpressionsBooked = c;
                        }}
                      />
                    </div>
                  </div>
              ) : ('') }
                {/* /Click Booked */}
                <div className="form-group">
                  <label
                    htmlFor="inputClicksBooked"
                    className="col-sm-2 control-label"
                  >Clicks Booked</label>
                  <div className="col-sm-8">
                    <select
                      id="inputClicksBooked" className="form-control"
                      ref={c => {
                        this.inputClicksBooked = c;
                      }}
                      onChange={event => this.chooseClicksBooked(event)}
                    >
                      <option value="0">Unlimited</option>
                      <option value="1">Input Clicks Booked</option>
                    </select>
                  </div>
                </div>
                {this.state.showClicksBooked === true ? (
                  <div className="form-group">
                    <label
                      htmlFor="inputBannerClicksBooked"
                      className="col-sm-2 control-label"
                    >Clicks Booked</label>
                    <div className="col-sm-8">
                      <input
                        type="text" className="form-control"
                        id="inputBannerClicksBooked" placeholder="1000"
                        ref={c => {
                          this.inputBannerClicksBooked = c;
                        }}
                      />
                    </div>
                  </div>
              ) : ('')}
              </form>
            </div>
          </div>
          {/* /Contract Detail */}
          <div className="box box-default">
            <div className="box-header with-border">
              <h3 className="box-title">Contract Detail</h3>
              <div className="box-tools pull-right">
                <button
                  type="button" className="btn btn-box-tool"
                  data-widget="collapse"
                >
                  <i
                    className="fa fa-minus"
                  />
                </button>
              </div>
            </div>
            <div className="box-body">
              <form className="form-horizontal">
                <div className="form-group">
                  <label
                    htmlFor="inputActivationDate"
                    className="col-sm-2 control-label"
                  >Activation Date</label>
                  <div className="col-sm-8">
                    <select
                      id="inputActivationDate" className="form-control"
                      ref={c => {
                        this.inputActivationDate = c;
                      }}
                      onChange={event => this.chooseActivationDate(event)}
                    >
                      <option value="0">Active Immediately</option>
                      <option value="1">Choose Date</option>
                    </select>
                  </div>
                </div>
                { this.state.showActivationDate === true ? (
                  <div className="form-group has-feedback">
                    <label
                      htmlFor="inputBannerActivationDate"
                      className="col-sm-2 control-label"
                    >
                    &nbsp;
                    </label>
                    <div className=" col-sm-8 date">
                      <span className="fa fa-calendar form-control-feedback" />
                      {/* /DatePicker */}
                      <DatePicker
                        id="inputBannerActivationDate"
                        type="text"
                        className="form-control pull-right"
                        name="start"
                        ref={c => {
                          this.inputBannerActivationDate = c;
                        }}
                      />
                    </div>
                  </div>) : ('')}
                <div className="form-group">
                  <label
                    htmlFor="inputExpirationDate"
                    className="col-sm-2 control-label"
                  >Expiration Date</label>
                  <div className="col-sm-8">
                    <select
                      id="inputExpirationDate" className="form-control"
                      onChange={event => this.chooseExpirationDate(event)}
                      ref={c => {
                        this.inputExpirationDate = c;
                      }}
                    >
                      <option value="0">Dont Expire</option>
                      <option value="1">Choose Date</option>
                    </select>
                  </div>
                </div>
                {this.state.showExpirationDate === true ? (
                  <div className="form-group has-feedback">
                    <label
                      htmlFor="inputBannerExpirationDate"
                      className="col-sm-2 control-label"
                    >
                    &nbsp;
                    </label>
                    <div className=" col-sm-8 date">
                      <span className="fa fa-calendar form-control-feedback" />
                      {/* /DatePicker */}
                      <DatePicker
                        id="inputBannerExpirationDate"
                        type="text"
                        className="form-control pull-right"
                        name="end"
                        ref={c => {
                          this.inputBannerExpirationDate = c;
                        }}
                      />
                    </div>
                  </div>
              ) : ('')}
              </form>
            </div>
          </div>
        </div>
        <div className="box-footer">
          <Link
            to="/resource/banner"
            className="btn btn-app pull-right"
          ><i className="fa fa-undo" /> Cancel</Link>
          <Link
            to="#"
            className="btn btn-app pull-right"
            onClick={event => this.updateBanner(event)}
          ><i className="fa fa-floppy-o" /> Save</Link>
        </div>
      </div>
    );
  }
}

export default UpdateBannerForm;
