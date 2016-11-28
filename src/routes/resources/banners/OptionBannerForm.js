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
      isCountView: false,
      isFixIE: false,
      isDefault: false,
      isRelative: false,
      checkIsCountView: false,
      checkIsFixIE: false,
      checkIsDefault: false,
      checkIsRelative: false,
      impressionsBooked: false,
      clicksBooked: false,
      checkImpressionsBooked: false,
      checkClicksBooked: false,
      activationDate: false,
      expirationDate: false,
      checkExpirationDate: false,
      checkActivationDate: false,
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

    // show clicks Booked
    $('#inputBannerIsFixIE').on('ifClicked', () => {
      const isFixIE = document.getElementById('inputBannerIsFixIE').checked;
      self.setState({ checkIsFixIE: true });
      if (isFixIE === true) {
        self.setState({ isFixIE: false });
      } else if (isFixIE === false) {
        self.setState({ isFixIE: true });
      }
    });
    // show clicks Booked
    $('#inputBannerIsCountView').on('ifClicked', () => {
      const isCountView = document.getElementById('inputBannerIsCountView').checked;
      self.setState({ checkIsCountView: true });
      if (isCountView === true) {
        self.setState({ isCountView: false });
      } else if (isCountView === false) {
        self.setState({ isCountView: true });
      }
    });
    // show clicks Booked
    $('#inputBannerIsDefault').on('ifClicked', () => {
      const isDefault = document.getElementById('inputBannerIsDefault').checked;
      self.setState({ checkIsDefault: true });
      if (isDefault === true) {
        self.setState({ isDefault: false });
      } else if (isDefault === false) {
        self.setState({ isDefault: true });
      }
    });
    // show clicks Booked
    $('#inputBannerIsRelative').on('ifClicked', () => {
      const isRelative = document.getElementById('inputBannerIsRelative').checked;
      self.setState({ checkIsRelative: true });
      if (isRelative === true) {
        self.setState({ isRelative: false });
      } else if (isRelative === false) {
        self.setState({ isRelative: true });
      }
    });
    // // show impressions Booked
    $('#inputImpressionsBooked').on('ifClicked', () => {
      const impressionsBooked = document.getElementById('inputImpressionsBooked').checked;
      self.setState({ checkImpressionsBooked: true });
      if (impressionsBooked === true) {
        self.setState({ showImpressionsBooked: true });
        self.setState({ impressionsBooked: false });
      } else if (impressionsBooked === false) {
        self.setState({ showImpressionsBooked: false });
        self.setState({ impressionsBooked: true });
      }
    });

    // show clicks Booked
    $('#inputClicksBooked').on('ifClicked', () => {
      const showClicksBooked = document.getElementById('inputClicksBooked').checked;
      self.setState({ checkClicksBooked: true });
      if (showClicksBooked === true) {
        self.setState({ showClicksBooked: true });
        self.setState({ clicksBooked: false });
      } else if (showClicksBooked === false) {
        self.setState({ showClicksBooked: false });
        self.setState({ clicksBooked: true });
      }
    });
    $('#inputActivationDate').on('ifClicked', () => {
      const activationDate = document.getElementById('inputActivationDate').checked;
      self.setState({ checkActivationDate: true });
      if (activationDate === true) {
        self.setState({ showActivationDate: true });
        self.setState({ activationDate: false });
      } else if (activationDate === false) {
        self.setState({ showActivationDate: false });
        self.setState({ activationDate: true });
      }
    });
    $('#inputExpirationDate').on('ifClicked', () => {
      const showExpirationDate = document.getElementById('inputExpirationDate').checked;
      self.setState({ checkExpirationDate: true });
      if (showExpirationDate === true) {
        self.setState({ showExpirationDate: true });
        self.setState({ expirationDate: false });
      } else if (showExpirationDate === false) {
        self.setState({ showExpirationDate: false });
        self.setState({ expirationDate: true });
      }
    });
    /* eslint-enable no-undef */
  }

  componentWillReceiveProps(nextProps) {
    const {
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
    this.inputBannerAdStore.value = adStore;
    this.inputImpressionsBooked.value = impressionsBooked;
    if (nextProps.banner.clickImpression) {
      const length = nextProps.banner.clickImpression.length;
      this.setState({ countLinkClickImpression: length });
    }
    if (this.state.impressionsBooked === true) {
      this.setState({ showImpressionsBooked: false });
    } else if (this.state.impressionsBooked === false) {
      if (impressionsBooked === true) {
        this.setState({ showImpressionsBooked: false });
      } else if (impressionsBooked === false) {
        this.setState({ showImpressionsBooked: true });
        if (this.inputBannerImpressionsBooked !== undefined) {
          this.inputBannerImpressionsBooked.value = impressionsBookedValue;
        }
      }
    }
    if (this.state.clicksBooked === true) {
      this.setState({ showClicksBooked: false });
    } else if (this.state.clicksBooked === false) {
      if (clicksBooked === true) {
        this.setState({ showClicksBooked: false });
      } else if (clicksBooked === false) {
        this.setState({ showClicksBooked: true });
        if (this.inputBannerClicksBooked !== undefined) {
          this.inputBannerClicksBooked.value = clicksBookedValue;
        }
      }
    }
    if (this.state.activationDate === true) {
      this.setState({ showActivationDate: false });
    } else if (this.state.activationDate === false) {
      if (activationDate === true) {
        this.setState({ showActivationDate: false });
      } else if (activationDate === false) {
        this.setState({ showActivationDate: true });
        if (this.inputBannerActivationDate !== undefined) {
          this.inputBannerActivationDate.value = moment(new Date(activationDateValue)).format('L');
        }
      }
    }
    if (this.state.expirationDate === true) {
      this.setState({ showExpirationDate: false });
    } else if (this.state.expirationDate === false) {
      if (expirationDate === true) {
        this.setState({ showExpirationDate: false });
      } else if (expirationDate === false) {
        this.setState({ showExpirationDate: true });
        if (this.inputBannerExpirationDate !== undefined) {
          document.getElementById('inputBannerExpirationDate').value = moment(new Date(expirationDateValue)).format('L');
        }
      }
    }
  }

  componentDidUpdate() {
    /* eslint-disable no-undef */
    if (this.props.banner) {
      if (this.state.isCountView === true) {
        $('#inputBannerIsCountView').iCheck('check');
      } else if (this.state.isCountView === false) {
        if (this.props.banner.isCountView === true && this.state.checkIsCountView === false) {
          $('#inputBannerIsCountView').iCheck('check');
        } else if (this.props.banner.isCountView === false) {
          $('#inputBannerIsCountView').iCheck('uncheck');
        }
      }

      if (this.state.isFixIE === true) {
        $('#inputBannerIsFixIE').iCheck('check');
      } else if (this.state.isFixIE === false) {
        if (this.props.banner.isFixIE === true && this.state.checkIsFixIE === false) {
          $('#inputBannerIsFixIE').iCheck('check');
        } else if (this.props.banner.isFixIE === false) {
          $('#inputBannerIsFixIE').iCheck('uncheck');
        }
      }

      if (this.state.isDefault === true) {
        $('#inputBannerIsDefault').iCheck('check');
      } else if (this.state.isDefault === false) {
        if (this.props.banner.isDefault === true && this.state.checkIsDefault === false) {
          $('#inputBannerIsDefault').iCheck('check');
        } else if (this.props.banner.isDefault === false) {
          $('#inputBannerIsDefault').iCheck('uncheck');
        }
      }

      if (this.state.isRelative === true) {
        $('#inputBannerIsRelative').iCheck('check');
      } else if (this.state.isRelative === false) {
        if (this.props.banner.isRelative === true && this.state.checkIsRelative === false) {
          $('#inputBannerIsRelative').iCheck('check');
        } else if (this.props.banner.isRelative === false) {
          $('#inputBannerIsRelative').iCheck('uncheck');
        }
      }

      if (this.state.impressionsBooked === true) {
        $('#inputImpressionsBooked').iCheck('check');
      } else if (this.state.impressionsBooked === false) {
        if (this.props.banner.impressionsBooked === true
          && this.state.checkImpressionsBooked === false) {
          $('#inputImpressionsBooked').iCheck('check');
        } else if (this.props.banner.impressionsBooked === false) {
          $('#inputImpressionsBooked').iCheck('uncheck');
        }
      }

      if (this.state.clicksBooked === true) {
        $('#inputClicksBooked').iCheck('check');
      } else if (this.state.clicksBooked === false) {
        if (this.props.banner.clicksBooked === true && this.state.checkClicksBooked === false) {
          $('#inputClicksBooked').iCheck('check');
        } else if (this.props.banner.clicksBooked === false) {
          $('#inputClicksBooked').iCheck('uncheck');
        }
      }

      if (this.state.activationDate === true) {
        $('#inputActivationDate').iCheck('check');
      } else if (this.state.activationDate === false) {
        if (this.props.banner.activationDate === true
          && this.state.checkActivationDate === false) {
          $('#inputActivationDate').iCheck('check');
        } else if (this.props.banner.activationDate === false) {
          $('#inputActivationDate').iCheck('uncheck');
        }
      }

      if (this.state.expirationDate === true) {
        $('#inputExpirationDate').iCheck('check');
      } else if (this.state.expirationDate === false) {
        if (this.props.banner.expirationDate === true && this.state.checkExpirationDate === false) {
          $('#inputExpirationDate').iCheck('check');
        } else if (this.props.banner.expirationDate === false) {
          $('#inputExpirationDate').iCheck('uncheck');
        }
      }
    }
    /* eslint-enable no-undef */
  }

  updateBanner() {
    const isCountView = document.getElementById('inputBannerIsCountView').checked;
    const isFixIE = document.getElementById('inputBannerIsFixIE').checked;
    const isDefault = document.getElementById('inputBannerIsDefault').checked;
    const isRelative = document.getElementById('inputBannerIsRelative').checked;
    const adStore = this.inputBannerAdStore.value;
    const impressionsBooked = document.getElementById('inputImpressionsBooked').checked;
    let impressionsBookedValue = '';
    if (impressionsBooked === true) {
      impressionsBookedValue = 'unlimited';
    } else if (impressionsBooked === false) {
      impressionsBookedValue = this.inputBannerImpressionsBooked.value;
    }
    const clicksBooked = document.getElementById('inputClicksBooked').checked;
    let clicksBookedValue = '';
    if (clicksBooked === true) {
      clicksBookedValue = 'unlimited';
    } else if (clicksBooked === false) {
      if (this.inputBannerClicksBooked !== undefined) {
        clicksBookedValue = this.inputBannerClicksBooked.value;
      }
    }
    const activationDate = document.getElementById('inputActivationDate').checked;
    let activationDateValue = '';
    if (activationDate === false) {
      activationDateValue = new Date(moment(new Date(document.getElementById('inputBannerActivationDate').value)).format('YYYY-MM-DD 00:00:00'));
    } else if (activationDate === true) {
      activationDateValue = new Date(moment().format('YYYY-MM-DD 00:00:00'));
    }
    const expirationDate = document.getElementById('inputExpirationDate').checked;
    let expirationDateValue = new Date();
    if (expirationDate === false) {
      expirationDateValue = new Date(moment(new Date(document.getElementById('inputBannerExpirationDate').value)).format('YYYY-MM-DD 00:00:00'));
    } else if (expirationDate === true) {
      expirationDateValue = new Date(moment(new Date('12-12-2117')).format('YYYY-MM-DD 00:00:00'));
    }
    const banner = { id: this.props.bannerId };
    banner.isCountView = isCountView;
    banner.isFixIE = isFixIE;
    banner.isDefault = isDefault;
    banner.isRelative = isRelative;
    if (adStore && adStore !== this.props.banner.adStore) {
      banner.adStore = adStore;
    }
    banner.impressionsBooked = impressionsBooked;
    banner.clicksBooked = clicksBooked;
    banner.impressionsBookedValue = impressionsBookedValue;
    banner.clicksBookedValue = clicksBookedValue;
    banner.activationDate = activationDate;
    banner.activationDateValue = activationDateValue;
    banner.expirationDate = expirationDate;
    banner.expirationDateValue = expirationDateValue;
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
                      type="checkbox" id="inputBannerIsCountView" className="form-control"
                      ref={c => {
                        this.inputBannerIsCountView = c;
                      }}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label
                    htmlFor="inputBannerIsFixIE"
                    className="col-sm-2 control-label"
                  >Fix IE(User for banner fail in IE)</label>
                  <div className="col-sm-8">
                    <ICheck
                      type="checkbox" id="inputBannerIsFixIE" className="form-control"
                      ref={c => {
                        this.inputBannerIsFixIE = c;
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
                  <div className="col-sm-1">
                    <ICheck
                      type="checkbox" id="inputActivationDate" className="form-control"
                      ref={c => {
                        this.inputActivationDate = c;
                      }}
                    />
                  </div>
                  <div className="col-sm-9">Active Immediately</div>
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
                  <div className="col-sm-1">
                    <ICheck
                      type="checkbox" id="inputExpirationDate" className="form-control"
                      ref={c => {
                        this.inputExpirationDate = c;
                      }}
                    />
                  </div>
                  <div className="col-sm-9">Dont Expire</div>
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
