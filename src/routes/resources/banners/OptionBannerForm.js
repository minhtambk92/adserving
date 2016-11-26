import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import { DatePicker, ICheck } from '../../../components/UI';
import Link from '../../../components/Link';

class UpdateBannerForm extends Component {

  static propTypes = {
    bannerId: PropTypes.string.isRequired,
    updateBanner: PropTypes.func,
    banner: PropTypes.object,
    getBanner: PropTypes.func,
    channels: PropTypes.array,
    createClickImpression: PropTypes.func,
    deleteClickImpression: PropTypes.func,
    updateClickImpression: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      showActivationDate: false,
      showExpirationDate: false,
      showImpressionsBooked: false,
      showClicksBooked: false,
      countLinkClickImpression: 0,
      string: '',
      arrClickImpression: [],
    };
  }

  componentDidMount() {
    /* eslint-disable no-undef */
    const self = this;
    // Add New
    $('#addNewLink').click(() => {
      const length = this.state.countLinkClickImpression;
      const count = length + 1;
      self.setState({ countLinkClickImpression: count });
      self.setState({ arrClickImpression: self.state.arrClickImpression.concat([count]) });
    });

    // Delete
    $('#optionBanner').on('click', '.closeClickImpression', function () {
      const id = $(this).parent().attr('id');
      if (id) {
        self.props.deleteClickImpression(id).then(() => {
          self.props.getBanner(self.props.bannerId);
          $(this).parent().css('display', 'none');
        });
      } else {
        $(this).parent().css('display', 'none');
      }
      // self.props.getBanner(self.props.bannerId);
    });

    // // show impressions Booked
    $('#inputImpressionsBooked').on('ifClicked', () => {
      const impressionsBooked = document.getElementById('inputImpressionsBooked').checked;
      if (impressionsBooked === true) {
        self.setState({ showImpressionsBooked: true });
      } else if (impressionsBooked === false) {
        self.setState({ showImpressionsBooked: false });
      }
    });

    // show clicks Booked
    $('#inputClicksBooked').on('ifClicked', () => {
      const showClicksBooked = document.getElementById('inputClicksBooked').checked;
      if (showClicksBooked === true) {
        self.setState({ showClicksBooked: true });
      } else if (showClicksBooked === false) {
        self.setState({ showClicksBooked: false });
      }
    });
    /* eslint-enable no-undef */
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
    if (nextProps.banner.clickImpression) {
      const length = nextProps.banner.clickImpression.length;
      this.setState({ countLinkClickImpression: length });
    }
    if (impressionsBooked === true) {
      this.setState({ showImpressionsBooked: false });
    } else if (impressionsBooked === false) {
      this.setState({ showImpressionsBooked: true });
      if (this.inputBannerImpressionsBooked !== undefined) {
        this.inputBannerImpressionsBooked.value = impressionsBookedValue;
      }
    }
    if (clicksBooked === true) {
      this.setState({ showClicksBooked: false });
    } else if (clicksBooked === false) {
      this.setState({ showClicksBooked: true });
      if (this.inputBannerClicksBooked !== undefined) {
        this.inputBannerClicksBooked.value = clicksBookedValue;
      }
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

  componentDidUpdate() {
    /* eslint-disable no-undef */
    if (this.props.banner) {
      if (this.props.banner.countView === true) {
        $('#inputBannerCountView').iCheck('check');
      } else {
        $('#inputBannerCountView').iCheck('uncheck');
      }
      if (this.props.banner.fixIE === true) {
        $('#inputBannerFixIE').iCheck('check');
      } else {
        $('#inputBannerFixIE').iCheck('uncheck');
      }
      if (this.props.banner.isDefault === true) {
        $('#inputBannerIsDefault').iCheck('check');
      } else {
        $('#inputBannerIsDefault').iCheck('uncheck');
      }
      if (this.props.banner.isRelative === true) {
        $('#inputBannerIsRelative').iCheck('check');
      } else {
        $('#inputBannerIsRelative').iCheck('uncheck');
      }
      // if (this.props.banner.impressionsBooked === true) {
      //   $('#inputImpressionsBooked').iCheck('check');
      // } else {
      //   $('#inputImpressionsBooked').iCheck('uncheck');
      // }
      // if (this.props.banner.clicksBooked === true) {
      //   $('#inputClicksBooked').iCheck('check');
      // } else {
      //   $('#inputClicksBooked').iCheck('uncheck');
      // }
    }
    /* eslint-enable no-undef */
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

  updateBanner() {
    const countView = document.getElementById('inputBannerCountView').checked;
    const fixIE = document.getElementById('inputBannerFixIE').checked;
    const isDefault = document.getElementById('inputBannerIsDefault').checked;
    const isRelative = document.getElementById('inputBannerIsRelative').checked;
    const adStore = this.inputBannerAdStore.value;
    const impressionsBooked = document.getElementById('inputImpressionsBooked').checked;
    let impressionsBookedValue = '';
    if (impressionsBooked === true) {
      this.setState({ showImpressionsBooked: true });
      impressionsBookedValue = this.inputBannerImpressionsBooked.value;
    } else if (impressionsBooked === false) {
      impressionsBookedValue = 'unlimited';
    }
    const clicksBooked = document.getElementById('inputClicksBooked').checked;
    let clicksBookedValue = '';
    if (clicksBooked === true) {
      this.setState({ showClicksBooked: true });
      clicksBookedValue = this.inputBannerClicksBooked.value;
    } else if (clicksBooked === false) {
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
    banner.countView = countView;
    banner.fixIE = fixIE;
    banner.isDefault = isDefault;
    banner.isRelative = isRelative;
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
    });
    this.addLinkClickAndImpression();
  }

  addLinkClickAndImpression() { // eslint-disable-line no-unused-vars, class-methods-use-this
    /* eslint-disable no-undef */
    /* eslint-disable no-loop-func */
    const length = this.state.countLinkClickImpression;
    for (let i = 1; i <= length; i += 1) {
      const id = $('#link-click-impression').find(`.clickImpression-${i}`).attr('id');
      if (id) {
        const impressionUrl = $(`#${id} #inputLinkImpression-${i}`).val();
        const clickUrl = $(`#${id} #inputLinkClick-${i}`).val();
        if (impressionUrl && clickUrl) {
          this.props.updateClickImpression({ id, clickUrl, impressionUrl }).then(() => {
            this.props.getBanner(this.props.bannerId);
          });
        }
      } else {
        const impressionUrl = $(`#link-click-impression .clickImpression-${i} #inputLinkImpression-${i}`).val();
        const clickUrl = $(`#link-click-impression .clickImpression-${i} #inputLinkClick-${i}`).val();
        if (impressionUrl && clickUrl) {
          const bannerId = this.props.bannerId;
          this.props.createClickImpression({ clickUrl, impressionUrl, bannerId }).then(() => {
            this.props.getBanner(this.props.bannerId);
          });
          $(`#link-click-impression .clickImpression-${i}`).remove();
        }
      }
    }
    /* eslint-enable no-undef */
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
                    htmlFor="inputBannerIsIFrame"
                    className="col-sm-2 control-label"
                  >Count View Banner</label>
                  <div className="col-sm-8">
                    <ICheck
                      type="checkbox" id="inputBannerCountView" className="form-control"
                      ref={c => {
                        this.inputBannerCountView = c;
                      }}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label
                    htmlFor="inputBannerFixIE"
                    className="col-sm-2 control-label"
                  >Fix IE(User for banner fail in IE)</label>
                  <div className="col-sm-8">
                    <ICheck
                      type="checkbox" id="inputBannerFixIE" className="form-control"
                      ref={c => {
                        this.inputBannerFixIE = c;
                      }}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label
                    htmlFor="inputBannerIsDefault"
                    className="col-sm-2 control-label"
                  >Is Default(Banner default)</label>
                  <div className="col-sm-8">
                    <ICheck
                      type="checkbox" id="inputBannerIsDefault" className="form-control"
                      ref={c => {
                        this.inputBannerIsDefault = c;
                      }}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label
                    htmlFor="inputBannerIsRelative"
                    className="col-sm-2 control-label"
                  >Relative()</label>
                  <div className="col-sm-8">
                    <ICheck
                      type="checkbox" id="inputBannerIsRelative" className="form-control"
                      ref={c => {
                        this.inputBannerIsRelative = c;
                      }}
                    />
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
                  <div className="col-sm-1">
                    <ICheck
                      type="checkbox" id="inputImpressionsBooked" className="form-control"
                      ref={c => {
                        this.inputImpressionsBooked = c;
                      }}
                    />
                  </div>
                  <div className="col-sm-9">
                    Unlimited
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
                  <div className="col-sm-1">
                    <ICheck
                      type="checkbox" id="inputClicksBooked" className="form-control"
                      ref={c => {
                        this.inputClicksBooked = c;
                      }}
                    />
                  </div>
                  <div className="col-sm-9">Unlimited</div>
                </div>
                {this.state.showClicksBooked === true ? (
                  <div className="form-group">
                    <label
                      htmlFor="inputBannerClicksBooked"
                      className="col-sm-2 control-label"
                    >&nbsp;</label>
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
                <div className="form-group">
                  <div
                    id="addNewLink"
                    className="col-sm-6"
                  > Add Link Click and Impressions
                  </div>
                </div>
                <div className="col-sm-12" id="link-click-impression">
                  { this.props.banner && this.props.banner.clickImpression
                  && this.props.banner.clickImpression.map((clickImpression, index) => (
                    <div
                      key={clickImpression.id} id={clickImpression.id}
                      className={`clickImpression-${index + 1}`}
                    >
                      <button
                        type="button" className="close closeClickImpression" aria-hidden="true"
                      >×
                      </button>
                      <div className="form-group">
                        <label
                          htmlFor="inputLinkClick"
                          className="col-sm-2 control-label"
                        >Link Click</label>
                        <div className="col-sm-8">
                          <input
                            type="text" className="form-control"
                            id={`inputLinkClick-${index + 1}`} placeholder="1000"
                            defaultValue={clickImpression.clickUrl}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label
                          htmlFor="inputLinkImpression"
                          className="col-sm-2 control-label"
                        >Link Impression</label>
                        <div className="col-sm-8">
                          <input
                            type="text" className="form-control"
                            id={`inputLinkImpression-${index + 1}`} placeholder="1000"
                            defaultValue={clickImpression.impressionUrl}
                          />
                        </div>
                      </div>
                    </div>))}
                  {this.state.arrClickImpression && this.state.arrClickImpression.map((count) => (
                    <div key={`clickImpression-${count}`} className={`clickImpression-${count}`}>
                      <button type="button" className="close closeClickImpression" aria-hidden="true">×</button>
                      <div className="form-group">
                        <label htmlFor="inputLinkClick" className="col-sm-2 control-label">Link Click</label>
                        <div className="col-sm-8">
                          <input type="text" className="form-control" id={`inputLinkClick-${count}`} placeholder="1000" />
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="inputLinkImpression" className="col-sm-2 control-label">Link Impression</label>
                        <div className="col-sm-8">
                          <input
                            type="text" className="form-control" id={`inputLinkImpression-${count}`}
                            placeholder="1000"
                          /></div>
                      </div>
                    </div>
                  ))}
                  {this.state.string}
                </div>
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
