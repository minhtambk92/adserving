/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// import { defineMessages, FormattedRelative } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  getChannel,
  updateChannel,
  deleteChannel,
} from '../../../../actions/channels';
import { createOptionChannel, deleteOptionChannel } from '../../../../actions/optionChannels';
import Layout from '../../../../components/Layout';
import UpdateChannelForm from '../UpdateChannelForm';
import SelectOptionChannel from '../OptionSelectChannel';
import Link from '../../../../components/Link';
import s from './Channel.css';

const pageTitle = 'Channel';

class Channel extends Component {

  static propTypes = {
    channelId: PropTypes.string.isRequired,
    channels: PropTypes.object,
    updateChannel: PropTypes.func,
    getChannel: PropTypes.func,
    campaigns: PropTypes.object,
    createCampaign: PropTypes.func,
    deleteChannel: PropTypes.func,
    createOptionChannel: PropTypes.func,
    deleteOptionChannel: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      category: [{ id: 'category-1', name: 'KINH TẾ', value: 'kinh-te' }, {
        id: 'category-2',
        name: 'VĂN HÓA',
        value: 'van-hoa',
      }, { id: 'category-3', name: 'GIA ĐÌNH', value: 'gia-dinh' }],
      browser: [{ id: 'browser-1', name: 'Firefox', value: 'Firefox' }, {
        id: 'browser-2', name: 'Chrome', value: 'Chrome',
      }, {
        id: 'browser-3', name: 'Safari', value: 'Safari',
      }, {
        id: 'browser-4', name: 'Opera', value: 'Opera',
      }, {
        id: 'browser-5', name: 'IE', value: 'IE',
      }, {
        id: 'browser-6', name: 'Netscape', value: 'Netscape',
      }],
      options: [{ id: 'option-1', name: 'Category', value: 'category' },
        { id: 'option-2', name: 'Browser', value: 'browser' },
        { id: 'option-3', name: 'Domain', value: 'domain' },
        { id: 'option-4', name: 'Address', value: 'Ip' },
        { id: 'option-5', name: 'Language', value: 'language' },
        { id: 'option-6', name: 'Operating system', value: 'OS' },
        { id: 'option-7', name: 'Area', value: 'AreaCode' },
        { id: 'option-8', name: 'City', value: 'city' },
        { id: 'option-9', name: 'Country', value: 'Country' },
        { id: 'option-10', name: 'Latitude/Longitude', value: 'Latlong' },
        { id: 'option-11', name: 'Geo - ISP/Organisation', value: 'Organisation' },
        { id: 'option-12', name: 'Postal Code', value: 'PostalCode' },
        { id: 'option-13', name: 'Site - PageURL', value: 'PageUrl' },
        { id: 'option-14', name: 'Site-Source', value: 'Site' },
        { id: 'option-15', name: 'Variable', value: 'Variable' },
      ],
      chooseOption: [],
      showCategory: false,
      showBrowser: false,
    };
  }

  componentWillMount() {
    this.props.getChannel(this.props.channelId);
  }

  componentDidUpdate() {
    /* eslint-disable no-undef */
    const self = this;
    $('.remove-option').click(function () {
      const type = $(this).parents('.row').attr('id');
      if (type === 'category') {
        self.setState({
          showCategory: false,
        });
        self.props.getChannel(self.props.channelId);
      } else if (type === 'browser') {
        self.setState({
          showBrowser: false,
        });
        self.props.getChannel(self.props.channelId);
      }
    });
    /* eslint-enable no-undef */
  }

  addOptions() { // eslint-disable-line no-unused-vars, class-methods-use-this
    /* eslint-disable no-undef */
    const currentOption = ['category', 'browser'];
    // Create new option
    for (let i = 0; i < currentOption.length; i += 1) {
      const arrCategory = [];
      const id = currentOption[i];
      /* eslint-disable no-loop-func */
      $(`#${id} input[type=checkbox]`).each(function () {
        /* eslint-enable no-loop-func */
        const val = (this.checked ? $(this).val() : '');
        if (val !== 'on' && val.trim() !== '') {
          arrCategory.push(val);
        }
      });
      const comparison = $(`#${id} .inputTypeFilter`).val();
      const type = $(`#${id} .box-title`).html();
      const value = arrCategory.toString();
      const logical = 'and';
      const channelId = this.props.channelId;
      if (type && comparison && value) {
        this.enabledOption(type);
        this.props.createOptionChannel({ logical, type, comparison, value, channelId }).then(() => {
          this.props.getChannel(this.props.channelId);
        });
      }
    }
    /* eslint-enable no-undef */
  }
  disabledOption(type) { // eslint-disable-line no-unused-vars, class-methods-use-this
    if (type === 'category') {
      this.setState({
        showCategory: true,
      });
    } else if (type === 'browser') {
      this.setState({
        showBrowser: true,
      });
    }
  }
  enabledOption(type) { // eslint-disable-line no-unused-vars, class-methods-use-this
    if (type === 'category') {
      this.setState({
        showCategory: false,
      });
    } else if (type === 'browser') {
      this.setState({
        showBrowser: false,
      });
    }
  }
  saveOptions() { // eslint-disable-line no-unused-vars, class-methods-use-this
    /* eslint-disable no-undef */
    const currentOption = ['category', 'browser'];
    // Create new option
    for (let i = 0; i < currentOption.length; i += 1) {
      const arrCategory = [];
      const id = currentOption[i];
      /* eslint-disable no-loop-func */
      $(`#${id} input[type=checkbox]`).each(function () {
        /* eslint-enable no-loop-func */
        const val = (this.checked ? $(this).val() : '');
        if (val !== 'on' && val.trim() !== '') {
          arrCategory.push(val);
        }
      });
      const comparison = $(`#${id} .inputTypeFilter`).val();
      const type = $(`#${id} .box-title`).html();
      const value = arrCategory.toString();
      const logical = 'and';
      const channelId = this.props.channelId;
      if (type && comparison && value) {
        this.enabledOption(type);
        this.props.createOptionChannel({ logical, type, comparison, value, channelId }).then(() => {
          this.props.getChannel(this.props.channelId);
        });
      }
    }
    // Delete option past
    if (this.props.channels.editing && this.props.channels.editing.options.length > 0) {
      const arrOption = this.props.channels.editing.options;
      for (let j = 0; j < arrOption.length; j += 1) {
        this.props.deleteOptionChannel(arrOption[j].id);
      }
    }
  }

  newOptions() { // eslint-disable-line no-unused-vars, class-methods-use-this
    const value = this.inputChannelOptions.value;
    if (this.props.channels.editing.options.length > 0) {
      const options = this.props.channels.editing.options;
      for (let i = 0; i < options.length; i += 1) {
        if (value !== options[i].type) {
          this.disabledOption(value);
        }
      }
    } else if (this.props.channels.editing.options.length === 0) {
      this.disabledOption(value);
    }
  }

  render() {
    return (
      <Layout
        pageTitle={
          pageTitle
            .concat(': ')
            .concat(this.props.channels.editing ? this.props.channels.editing.name : '...')
        }
        pageSubTitle=""
      >
        <div>
          <div className="row">
            <section className="col-lg-12">
              <div className="nav-tabs-custom">
                <ul className="nav nav-tabs">
                  <li>
                    <a href="#editChannel" data-toggle="tab">
                      Edit Channel
                    </a>
                  </li>
                  <li className="active">
                    <a href="#addOption" data-toggle="tab">
                      Option Channel
                    </a>
                  </li>
                </ul>
                <div className="tab-content">
                  <div className="tab-pane" id="editChannel">
                    <div className="row">
                      <section className="col-lg-12">
                        {/* BOX: FORM OF CREATE NEW WEBSITE */}
                        <div className="box box-info">
                          <div className="box-header with-border">
                            <h3 className="box-title">Change Channel information</h3>
                            <div className="box-tools pull-right">
                              <button
                                type="button" className="btn btn-box-tool"
                                data-widget="collapse"
                              ><i className="fa fa-minus" /></button>
                            </div>
                          </div>
                          {/* /.box-header */}
                          {/* form start */}
                          <UpdateChannelForm
                            channel={this.props.channels && this.props.channels.editing}
                            updateChannel={this.props.updateChannel}
                            deleteChannel={this.props.deleteChannel}
                            channelId={this.props.channelId}
                            getChannel={this.props.getChannel}
                          />
                        </div>
                        {/* /.col */}
                      </section>
                    </div>
                  </div>
                  <div className="active tab-pane" id="addOption">
                    <div className="row">
                      <section className="col-lg-12">
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="box box-info">
                              <div className="box-header with-border">
                                <h3 className="box-title">Add Option</h3>
                                <div className="box-tools pull-right">
                                  <button
                                    type="button" className="btn btn-box-tool"
                                    data-widget="collapse"
                                  ><i className="fa fa-minus" /></button>
                                </div>
                              </div>
                              {/* /.box-header */}
                              <div className="box-body" id="optionChannel">
                                <div className="row">
                                  <div className="col-lg-12">
                                    <div className="col-lg-6 no-padding">
                                      <div className="box box-solid box-default">
                                        <div className="box-body">
                                          <div className="form-group">
                                            <div className="col-sm-10 no-padding">
                                              <select
                                                id="inputChannelOptions" className="form-control"
                                                ref={c => {
                                                  this.inputChannelOptions = c;
                                                }}
                                              >
                                                {this.state.options.map((option) =>
                                                  <option
                                                    key={option.value}
                                                    value={option.value}
                                                  >
                                                    {option.name}
                                                  </option>,
                                                )}
                                              </select>
                                            </div>
                                            <div className="col-sm-2">
                                              <span className="input-group-btn">
                                                <button
                                                  type="button" className="btn btn-primary btn-flat"
                                                  id="addNewOption"
                                                  onClick={event => this.newOptions(event)}
                                                >
                                                  Add
                                                </button>
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                {/* /.Option NEW */}
                                {this.state.showCategory === true ? (
                                  <SelectOptionChannel
                                    id="category"
                                    name="category"
                                    data={this.state.category}
                                  />
                                ) : ('')}
                                {this.state.showBrowser === true ? (
                                  <SelectOptionChannel
                                    id="browser"
                                    name="browser"
                                    data={this.state.browser}
                                  />
                                ) : ('') }
                                {/* /.Option Channel */}
                                {this.props.channels && this.props.channels.editing &&
                                this.props.channels.editing.options &&
                                this.props.channels.editing.options.map((option) => {
                                  if (option.type === 'category') {
                                    return (<SelectOptionChannel
                                      key={option.id}
                                      id={option.type}
                                      name={option.type}
                                      value={option.value}
                                      comparison={option.comparison}
                                      data={this.state.category}
                                      deleteOptionChannel={this.props.deleteOptionChannel}
                                      optionChannelId={option.id}
                                    />);
                                  } else if (option.type === 'browser') {
                                    return (<SelectOptionChannel
                                      id={option.type}
                                      key={option.id}
                                      name={option.type}
                                      value={option.value}
                                      comparison={option.comparison}
                                      data={this.state.browser}
                                      optionChannelId={option.id}
                                      deleteOptionChannel={this.props.deleteOptionChannel}
                                    />);
                                  }
                                  return false;
                                },
                                )}
                              </div>
                              <div className="box-footer">
                                <Link
                                  to="/resource/Channel"
                                  className="btn btn-app pull-right"
                                ><i className="fa fa-undo" /> Cancel</Link>
                                {this.props.channels && this.props.channels.editing &&
                                this.props.channels.editing.options &&
                                this.props.channels.editing.options.length === 0 ?
                                  (<Link
                                    to="#"
                                    className="btn btn-app pull-right"
                                    onClick={event => this.addOptions(event)}
                                  ><i className="fa fa-floppy-o" /> Add Options</Link>)
                                  : (
                                    <Link
                                      to="#"
                                      className="btn btn-app pull-right"
                                      onClick={event => this.saveOptions(event)}
                                    ><i className="fa fa-floppy-o" /> Save Options</Link>
                                )
                                }
                              </div>
                            </div>
                          </div>
                        </div>
                      </section>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </Layout>
    );
  }

}

const mapState = (state) => ({
  channels: state.channels,
  optionChannels: state.optionChannels,
});

const mapDispatch = {
  getChannel,
  updateChannel,
  deleteChannel,
  createOptionChannel,
  deleteOptionChannel,
};

export default withStyles(s)(connect(mapState, mapDispatch)(Channel));
