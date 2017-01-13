import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import { DatePicker, ICheck } from '../../../components/UI';
import TrackForm from './TrackForm';
import Link from '../../../components/Link';

class OptionBannerForm extends Component {

  static propTypes = {
    bannerId: PropTypes.string.isRequired,
    updateBanner: PropTypes.func,
    banner: PropTypes.object,
    getBanner: PropTypes.func,
    channels: PropTypes.array,
    createTrack: PropTypes.func,
    deleteTrack: PropTypes.func,
    updateTrack: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      showActivationDate: false,
      showExpirationDate: false,
      showImpressionsBooked: false,
      showClicksBooked: false,
      countLinkTrack: 0,
      string: '',
      arrTrack: [],
      isCountView: false,
      isFixIE: false,
      isDefault: false,
      isRelative: false,
      checkIsCountView: false,
      checkIsFixIE: false,
      checkIsDefault: false,
      checkIsRelative: false,
      isImpressionsBooked: false,
      isClicksBooked: false,
      checkImpressionsBooked: false,
      checkClicksBooked: false,
      isActivationDate: false,
      isExpirationDate: false,
      checkExpirationDate: false,
      checkActivationDate: false,
    };
  }

  componentDidMount() {
    /* eslint-disable no-undef */
    const self = this;
    // Add New
    $('#addNewLink').click(() => {
      const length = this.state.countLinkTrack;
      const count = length + 1;
      self.setState({ countLinkTrack: count });
      self.setState({ arrTrack: self.state.arrTrack.concat([count]) });
    });

    // Delete
    $('#optionBanner').on('click', '.closeClickImpression', function handleClick() {
      const id = $(this).parents('.track').attr('id');
      if (id) {
        self.props.deleteTrack(id).then(() => {
          self.props.getBanner(self.props.bannerId);
          $(this).parents('.track').css('display', 'none');
        });
      } else {
        $(this).parents('.track').css('display', 'none');
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
    $('#inputIsImpressionsBooked').on('ifClicked', () => {
      const isImpressionsBooked = document.getElementById('inputIsImpressionsBooked').checked;
      self.setState({ checkImpressionsBooked: true });
      if (isImpressionsBooked === true) {
        self.setState({ showImpressionsBooked: true });
        self.setState({ isImpressionsBooked: false });
      } else if (isImpressionsBooked === false) {
        self.setState({ showImpressionsBooked: false });
        self.setState({ isImpressionsBooked: true });
      }
    });

    // show clicks Booked
    $('#inputIsClicksBooked').on('ifClicked', () => {
      const showClicksBooked = document.getElementById('inputIsClicksBooked').checked;
      self.setState({ checkClicksBooked: true });
      if (showClicksBooked === true) {
        self.setState({ showClicksBooked: true });
        self.setState({ isClicksBooked: false });
      } else if (showClicksBooked === false) {
        self.setState({ showClicksBooked: false });
        self.setState({ isClicksBooked: true });
      }
    });
    $('#inputIsActivationDate').on('ifClicked', () => {
      const isActivationDate = document.getElementById('inputIsActivationDate').checked;
      self.setState({ checkActivationDate: true });
      if (isActivationDate === true) {
        self.setState({ showActivationDate: true });
        self.setState({ isActivationDate: false });
      } else if (isActivationDate === false) {
        self.setState({ showActivationDate: false });
        self.setState({ isActivationDate: true });
      }
    });
    $('#inputIsExpirationDate').on('ifClicked', () => {
      const showExpirationDate = document.getElementById('inputIsExpirationDate').checked;
      self.setState({ checkExpirationDate: true });
      if (showExpirationDate === true) {
        self.setState({ showExpirationDate: true });
        self.setState({ isExpirationDate: false });
      } else if (showExpirationDate === false) {
        self.setState({ showExpirationDate: false });
        self.setState({ isExpirationDate: true });
      }
    });
    /* eslint-enable no-undef */
  }

  componentWillReceiveProps(nextProps) {
    const {
      isImpressionsBooked,
      isClicksBooked,
      isActivationDate,
      isExpirationDate,
      adStore,
      impressionsBooked,
      clicksBooked,
      activationDate,
      expirationDate,
    } = nextProps.banner && (nextProps.banner || {});
    this.inputBannerAdStore.value = adStore;
    this.inputIsImpressionsBooked.value = isImpressionsBooked;
    if (nextProps.banner.tracks) {
      const length = nextProps.banner.tracks.length;
      this.setState({ countLinkTrack: length });
    }
    if (this.state.isImpressionsBooked === true) {
      this.setState({ showImpressionsBooked: false });
    } else if (this.state.isImpressionsBooked === false) {
      if (isImpressionsBooked === true) {
        this.setState({ showImpressionsBooked: false });
      } else if (isImpressionsBooked === false) {
        this.setState({ showImpressionsBooked: true });
        if (this.inputBannerImpressionsBooked !== undefined) {
          this.inputBannerImpressionsBooked.value = impressionsBooked;
        }
      }
    }
    if (this.state.isClicksBooked === true) {
      this.setState({ showClicksBooked: false });
    } else if (this.state.isClicksBooked === false) {
      if (isClicksBooked === true) {
        this.setState({ showClicksBooked: false });
      } else if (isClicksBooked === false) {
        this.setState({ showClicksBooked: true });
        if (this.inputBannerClicksBooked !== undefined) {
          this.inputBannerClicksBooked.value = clicksBooked;
        }
      }
    }
    if (this.state.isActivationDate === true) {
      this.setState({ showActivationDate: false });
    } else if (this.state.isActivationDate === false) {
      if (isActivationDate === true) {
        this.setState({ showActivationDate: false });
      } else if (isActivationDate === false) {
        this.setState({ showActivationDate: true });
        if (this.inputBannerActivationDate !== undefined) {
          document.getElementById('inputBannerActivationDate').value = moment(new Date(activationDate)).format('L');
        }
      }
    }
    if (this.state.isExpirationDate === true) {
      this.setState({ showExpirationDate: false });
    } else if (this.state.isExpirationDate === false) {
      if (isExpirationDate === true) {
        this.setState({ showExpirationDate: false });
      } else if (isExpirationDate === false) {
        this.setState({ showExpirationDate: true });
        if (this.inputBannerExpirationDate !== undefined) {
          document.getElementById('inputBannerExpirationDate').value = moment(new Date(expirationDate)).format('L');
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

      if (this.state.isImpressionsBooked === true) {
        $('#inputIsImpressionsBooked').iCheck('check');
      } else if (this.state.isImpressionsBooked === false) {
        if (this.props.banner.isImpressionsBooked === true
          && this.state.checkImpressionsBooked === false) {
          $('#inputIsImpressionsBooked').iCheck('check');
        } else if (this.props.banner.isImpressionsBooked === false) {
          $('#inputIsImpressionsBooked').iCheck('uncheck');
        }
      }

      if (this.state.isClicksBooked === true) {
        $('#inputIsClicksBooked').iCheck('check');
      } else if (this.state.isClicksBooked === false) {
        if (this.props.banner.isClicksBooked === true && this.state.checkClicksBooked === false) {
          $('#inputIsClicksBooked').iCheck('check');
        } else if (this.props.banner.isClicksBooked === false) {
          $('#inputIsClicksBooked').iCheck('uncheck');
        }
      }

      if (this.state.isActivationDate === true) {
        $('#inputIsActivationDate').iCheck('check');
      } else if (this.state.isActivationDate === false) {
        if (this.props.banner.isActivationDate === true
          && this.state.checkActivationDate === false) {
          $('#inputIsActivationDate').iCheck('check');
        } else if (this.props.banner.isActivationDate === false) {
          $('#inputIsActivationDate').iCheck('uncheck');
        }
      }

      if (this.state.isExpirationDate === true) {
        $('#inputIsExpirationDate').iCheck('check');
      } else if (this.state.isExpirationDate === false) {
        if (this.props.banner.isExpirationDate === true &&
          this.state.checkExpirationDate === false) {
          $('#inputIsExpirationDate').iCheck('check');
        } else if (this.props.banner.isExpirationDate === false) {
          $('#inputIsExpirationDate').iCheck('uncheck');
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
    const isImpressionsBooked = document.getElementById('inputIsImpressionsBooked').checked;
    let impressionsBooked = '';
    if (isImpressionsBooked === true) {
      impressionsBooked = -1;
    } else if (isImpressionsBooked === false) {
      impressionsBooked = this.inputBannerImpressionsBooked.value;
    }
    const isClicksBooked = document.getElementById('inputIsClicksBooked').checked;
    let clicksBooked = '';
    if (isClicksBooked === true) {
      clicksBooked = -1;
    } else if (isClicksBooked === false) {
      if (this.inputBannerClicksBooked !== undefined) {
        clicksBooked = this.inputBannerClicksBooked.value;
      }
    }
    const isActivationDate = document.getElementById('inputIsActivationDate').checked;
    let activationDate = '';
    if (isActivationDate === false) {
      activationDate = new Date(moment(new Date(document.getElementById('inputBannerActivationDate').value)).format('YYYY-MM-DD 00:00:00'));
    } else if (isActivationDate === true) {
      if (this.props.banner.isActivationDate === true) {
        activationDate = this.props.banner.activationDate;
      } else {
        activationDate = new Date();
      }
    }
    const isExpirationDate = document.getElementById('inputIsExpirationDate').checked;
    let expirationDate = new Date();
    if (isExpirationDate === false) {
      expirationDate = new Date(moment(new Date(document.getElementById('inputBannerExpirationDate').value)).format('YYYY-MM-DD 23:59:59'));
    } else if (isExpirationDate === true) {
      expirationDate = new Date(moment(new Date('12-12-2117')).format('YYYY-MM-DD 23:59:59'));
    }
    const banner = { id: this.props.bannerId };
    banner.isCountView = isCountView;
    banner.isFixIE = isFixIE;
    banner.isDefault = isDefault;
    banner.isRelative = isRelative;
    if (adStore && adStore !== this.props.banner.adStore) {
      banner.adStore = adStore;
    }
    banner.isImpressionsBooked = isImpressionsBooked;
    banner.isClicksBooked = isClicksBooked;
    banner.impressionsBooked = impressionsBooked;
    banner.clicksBooked = clicksBooked;
    banner.isActivationDate = isActivationDate;
    banner.activationDate = activationDate;
    banner.isExpirationDate = isExpirationDate;
    banner.expirationDate = expirationDate;
    banner.status = this.props.banner.status;
    banner.adsServerId = this.props.banner.adsServerId;
    banner.isIFrame = this.props.banner.isIFrame;
    banner.weight = this.props.banner.weight;
    banner.bannerTypeId = this.props.banner.bannerType.id;
    banner.bannerHtmlTypeId = this.props.banner.bannerHtmlTypeId;
    if (moment(new Date(activationDate)).format('x') < moment(new Date(expirationDate)).format('x')) {
      this.props.updateBanner(banner).then(() => {
        this.props.getBanner(this.props.bannerId);
      });
      this.addLinkClickAndImpression();
    }
  }

  addLinkClickAndImpression() { // eslint-disable-line no-unused-vars, class-methods-use-this
    /* eslint-disable no-undef */
    /* eslint-disable no-loop-func */
    const length = this.state.countLinkTrack;
    for (let i = 1; i <= length; i += 1) {
      const id = $('#link-click-impression').find(`.clickImpression-${i}`).attr('id');
      if (id) {
        const impressionUrl = $(`#${id} #inputLinkImpression-${i}`).val();
        const clickUrl = $(`#${id} #inputLinkClick-${i}`).val();
        if (impressionUrl && clickUrl) {
          this.props.updateTrack({ id, clickUrl, impressionUrl }).then(() => {
            this.props.getBanner(this.props.bannerId);
          });
        }
      } else {
        const impressionUrl = $(`#link-click-impression .clickImpression-${i} #inputLinkImpression-${i}`).val();
        const clickUrl = $(`#link-click-impression .clickImpression-${i} #inputLinkClick-${i}`).val();
        if (impressionUrl && clickUrl) {
          const bannerId = this.props.bannerId;
          this.props.createTrack({ clickUrl, impressionUrl, bannerId }).then(() => {
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
                <div className="col-sm-8 checkbox">
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
                <div className="col-sm-8 checkbox">
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
                <div className="col-sm-8 checkbox">
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
                <div className="col-sm-8 checkbox">
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
                  htmlFor="inputIsImpressionsBooked"
                  className="col-sm-2 control-label"
                >Impressions Booked</label>
                <div className="col-sm-1 checkbox">
                  <ICheck
                    type="checkbox" id="inputIsImpressionsBooked" className="form-control"
                    ref={c => {
                      this.inputIsImpressionsBooked = c;
                    }}
                  />
                </div>
                <div className="col-sm-9 checkbox">
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
                  htmlFor="inputIsClicksBooked"
                  className="col-sm-2 control-label"
                >Clicks Booked</label>
                <div className="col-sm-1 checkbox">
                  <ICheck
                    type="checkbox" id="inputIsClicksBooked" className="form-control"
                    ref={c => {
                      this.inputIsClicksBooked = c;
                    }}
                  />
                </div>
                <div className="col-sm-9 checkbox">Unlimited</div>
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
                  htmlFor="inputIsActivationDate"
                  className="col-sm-2 control-label"
                >Activation Date</label>
                <div className="col-sm-1 checkbox">
                  <ICheck
                    type="checkbox" id="inputIsActivationDate" className="form-control"
                    ref={c => {
                      this.inputIsActivationDate = c;
                    }}
                  />
                </div>
                <div className="col-sm-9 checkbox">Active Immediately</div>
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
                  htmlFor="inputIsExpirationDate"
                  className="col-sm-2 control-label"
                >Expiration Date</label>
                <div className="col-sm-1 checkbox">
                  <ICheck
                    type="checkbox" id="inputIsExpirationDate" className="form-control"
                    ref={c => {
                      this.inputIsExpirationDate = c;
                    }}
                  />
                </div>
                <div className="col-sm-9 checkbox">Dont Expire</div>
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

              <div className="col-sm-12" id="link-click-impression">
                {this.props.banner && this.props.banner.tracks &&
                this.props.banner.tracks.map((track, index) => (
                  <TrackForm
                    key={track.id}
                    id={track.id}
                    index={index + 1}
                    clickUrl={track.clickUrl}
                    impressionUrl={track.impressionUrl}
                  />
                ))}
                {this.state.arrTrack && this.state.arrTrack.map((count) => (
                  <TrackForm
                    key={count}
                    index={count}
                  />
                ))}
                {this.state.string}
              </div>

              <div className="clearfix">
                <button
                  type="button"
                  id="addNewLink"
                  className="btn btn-primary"
                >Add Tracking URL</button>
              </div>
            </form>
          </div>
        </div>

        <hr />

        <div className="clearfix">
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

export default OptionBannerForm;
