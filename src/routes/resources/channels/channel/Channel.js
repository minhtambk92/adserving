/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* global $ */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
// import { defineMessages, FormattedRelative } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  getChannel,
  updateChannel,
  deleteChannel,
} from '../../../../actions/channels';
import {
  createOptionChannel,
  deleteOptionChannel,
  updateOptionChannel,
} from '../../../../actions/optionChannels';
import { getSites } from '../../../../actions/sites';
import { getOptionChannelTypes } from '../../../../actions/optionChannelTypes';
import { createActivity, getActivitiesBySubjectId } from '../../../../actions/activities';
import Layout from '../../../../components/Layout';
import UpdateChannelForm from '../UpdateChannelForm';
import OptionSelectChannel from '../OptionSelectChannel';
import Activities from '../Activities';
import { setPageChannelActiveTab } from '../../../../actions/pages/channels';
import FilterSiteChannel from '../FilterSiteChannel';
import Link from '../../../../components/Link';
import s from './Channel.css'; // eslint-disable-line css-modules/no-unused-class

const pageTitle = 'Channel';

class Channel extends Component {

  static propTypes = {
    channelId: PropTypes.string.isRequired,
    page: PropTypes.object,
    channels: PropTypes.object,
    updateChannel: PropTypes.func,
    getChannel: PropTypes.func,
    campaigns: PropTypes.object,
    createCampaign: PropTypes.func,
    deleteChannel: PropTypes.func,
    createOptionChannel: PropTypes.func,
    deleteOptionChannel: PropTypes.func,
    sites: PropTypes.object,
    getSites: PropTypes.func,
    updateOptionChannel: PropTypes.func,
    getOptionChannelTypes: PropTypes.func,
    optionChannelTypes: PropTypes.object,
    createActivity: PropTypes.func,
    getActivitiesBySubjectId: PropTypes.func,
    users: PropTypes.object,
    activities: PropTypes.object,
    setPageChannelActiveTab: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      countOptionChannel: 0,
      newFilterSite: [],
      arrVariable: [],
      arrCheckBox: [],
      arrOption: [],
      string: '',
    };
  }

  componentWillMount() {
    this.props.getChannel(this.props.channelId);
    this.props.getSites();
    this.props.getOptionChannelTypes();
  }

  componentDidMount() {
    // Set latest active tab
    $('.channel-edit-box ul li').removeClass('active');
    $(`a[href="#${this.props.page.activeTab}"]`).trigger('click');
  }

  componentWillReceiveProps(nextProps) {
    const {
      options,
    } = nextProps.channels && (nextProps.channels.editing || {});
    if (nextProps.channels.editing.options) {
      const length = options.length;
      this.setState({ countOptionChannel: length });
      this.setState({ arrOption: options });
    }
  }

  componentDidUpdate() {
    /* eslint-disable no-undef */
    $(this.input).iCheck({
      checkboxClass: 'icheckbox_minimal-blue',
      radioClass: 'iradio_minimal-blue',
    });
    const self = this;
    $('.remove-option').click(function handleClick() {
      const id = $(this).parents('.row').attr('id');
      if (id) {
        self.props.deleteOptionChannel(id).then(() => {
          self.props.getChannel(self.props.channelId);
        });
      }
    });
    // Set latest active tab
    $('.channel-edit-box ul li').removeClass('active');
    $(`a[href="#${this.props.page.activeTab}"]`).trigger('click');
    /* eslint-enable no-undef */
  }

  onTabClick(event) {
    event.persist();
    this.props.setPageChannelActiveTab(event.target.getAttribute('data-id'));
    if (event.target.getAttribute('data-id') === 'activity') {
      this.props.getActivitiesBySubjectId(this.props.channelId);
    }
  }

  saveOptions() { // eslint-disable-line no-unused-vars, class-methods-use-this
    /* eslint-disable no-undef */
    const length = this.state.countOptionChannel;
    for (let i = 1; i <= length; i += 1) {
      const id = $(`#optionChannel .optionChannel-${i}`).attr('id');
      if (id) {
        let optionChannelTypeId = null;
        /* eslint-disable object-shorthand */
        const options = _.filter(this.state.arrOption, { id: id });
        if (options[0].optionChannelType) {
          optionChannelTypeId = options[0].optionChannelType.id;
          const channelId = this.props.channelId;
          const optionChannelType = options[0].optionChannelType;
          const logical = $(`#${id} .inputTypeFilter`).val();
          const comparison = $(`#${id} .inputSiteFilter`).val();
          let name = '';
          let value = '';
          if (optionChannelType) {
            if (optionChannelType.isVariable === true) {
              name = $(`#${id} .inputChannelVariableName`).val();
              value = $(`#${id} .inputChannelVariableValue`).val();
            } else if (optionChannelType.isSelectOption === true) {
              // Update Checkbox Option Channel
              const arrSelect = [];
              /* eslint-disable no-loop-func */
              $(`#${id} input[type=checkbox]`).each(function handle() {
                /* eslint-enable no-loop-func */
                const val = (this.checked ? $(this).val() : '');
                if (val !== 'on' && val.trim() !== '') {
                  arrSelect.push(val);
                }
              });
              name = optionChannelType.name;
              value = arrSelect.toString();
            } else if (optionChannelType.isInputLink === true) {
              // Update Site Option channel
              name = optionChannelType.name;
              value = $(`#${id} .inputChannelOptionURL`).val();
            }
            if (comparison && value) {
              this.props.updateOptionChannel({
                id,
                name,
                logical,
                optionChannelTypeId,
                comparison,
                value,
                channelId,
              }).then(() => {
                this.props.getChannel(this.props.channelId);
              });
            }
          }
        }
        /* eslint-enable object-shorthand */
      } else {
        let typeId = $(`.optionChannel-${i} .box`).attr('id');
        if (typeId && typeId !== undefined) {
          typeId = typeId.slice(0, typeId.lastIndexOf('-'));
          if (this.props.optionChannelTypes && this.props.optionChannelTypes.list) {
            const options = _.filter(this.props.optionChannelTypes.list, { id: typeId });
            if (options[0]) {
              const channelId = this.props.channelId;
              const logical = $(`.optionChannel-${i} .inputTypeFilter`).val();
              const comparison = $(`.optionChannel-${i} .inputSiteFilter`).val();
              const optionChannelTypeId = typeId;
              let name = '';
              let value = '';
              if (options[0].isVariable === true) {
                name = $(`.optionChannel-${i} .inputChannelVariableName`).val();
                value = $(`.optionChannel-${i} .inputChannelVariableValue`).val();
              } else if (options[0].isSelectOption === true) {
                // Update Checkbox Option Channel
                const arrSelect = [];
                /* eslint-disable no-loop-func */
                $(`.optionChannel-${i} input[type=checkbox]`).each(function handle() {
                  /* eslint-enable no-loop-func */
                  const val = (this.checked ? $(this).val() : '');
                  if (val !== 'on' && val.trim() !== '') {
                    arrSelect.push(val);
                  }
                });
                name = options[0].name;
                value = arrSelect.toString();
              } else if (options[0].isInputLink === true) {
                // Update Site Option channel
                name = options[0].name;
                value = $(`.optionChannel-${i} .inputChannelOptionURL`).val();
              }
              if (comparison && value) {
                $(`.optionChannel-${i}`).remove();
                this.props.createOptionChannel({
                  name,
                  logical,
                  optionChannelTypeId,
                  comparison,
                  value,
                  channelId,
                }).then(() => {
                  this.props.getChannel(this.props.channelId);
                });
              }
            }
          }
        }
      }
    }
  }

  newOptions() { // eslint-disable-line no-unused-vars, class-methods-use-this
    /* eslint-disable no-undef */
    const value = this.inputChannelOptions.value;
    if (this.props.optionChannelTypes && value) {
      const item = _.filter(this.props.optionChannelTypes.list, { id: value });
      const html = item[0].name;
      const arrOptionChannelValue = item[0].optionChannelValues;
      if (item[0].isInputLink === true) {
        const count = this.state.countOptionChannel + 1;
        this.setState({ countOptionChannel: count });
        this.addNewFilterSite(item[0], html);
      } else if (item[0].isSelectOption === true) {
        const count = this.state.countOptionChannel + 1;
        this.setState({ countOptionChannel: count });
        this.addCheckBoxSite(item[0], arrOptionChannelValue, html);
      } else if (item[0].isVariable === true) {
        this.addVariable(item[0], html);
      }
    }
    /* eslint-enable no-undef */
  }

  addNewFilterSite(type, name) { // eslint-disable-line no-unused-vars, class-methods-use-this
    const count = this.state.countOptionChannel + 1;
    this.setState({ countOptionChannel: count });
    const ob = {};
    ob.type = type;
    ob.name = name;
    ob.count = count;
    this.setState({ newFilterSite: this.state.newFilterSite.concat([ob]) });
  }

  addVariable(type, name) { // eslint-disable-line no-unused-vars, class-methods-use-this
    const count = this.state.countOptionChannel + 1;
    this.setState({ countOptionChannel: count });
    const ob = {};
    ob.name = name;
    ob.type = type;
    ob.count = count;
    this.setState({ arrVariable: this.state.arrVariable.concat([ob]) });
  }

  addCheckBoxSite(type, data, name) { // eslint-disable-line no-unused-vars, class-methods-use-this
    const count = this.state.countOptionChannel + 1;
    this.setState({ countOptionChannel: count });
    const ob = {};
    ob.name = name;
    ob.count = count;
    ob.data = data;
    ob.type = type;
    this.setState({ arrCheckBox: this.state.arrCheckBox.concat([ob]) });
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
              <div className="nav-tabs-custom channel-edit-box">
                <ul className="nav nav-tabs">
                  <li className="active">
                    <a
                      href="#editChannel" data-toggle="tab" data-id="editChannel"
                      onClick={event => this.onTabClick(event)}
                    >Edit Channel</a>
                  </li>
                  <li>
                    <a
                      href="#optionChannel" data-toggle="tab" data-id="optionChannel"
                      onClick={event => this.onTabClick(event)}
                    >Option Channel</a>
                  </li>
                  <li>
                    <a
                      href="#activity" data-toggle="tab"
                      data-id="activity"
                      onClick={event => this.onTabClick(event)}
                    >Activity</a>
                  </li>
                </ul>

                <div className="tab-content">
                  <div className="active tab-pane" id="editChannel">
                    <UpdateChannelForm
                      channel={this.props.channels.editing}
                      updateChannel={this.props.updateChannel}
                      deleteChannel={this.props.deleteChannel}
                      channelId={this.props.channelId}
                      getChannel={this.props.getChannel}
                      sites={this.props.sites.list}
                      createActivity={this.props.createActivity}
                      users={this.props.users && this.props.users.editing}
                    />
                  </div>

                  <div className="tab-pane" id="optionChannel">
                    <div className="form-group">
                      <div className="row">
                        <div className="col-sm-10">
                          <select
                            id="inputChannelOptions" className="form-control"
                            ref={c => {
                              this.inputChannelOptions = c;
                            }}
                          >
                            {this.props.optionChannelTypes &&
                            this.props.optionChannelTypes.list.map((option) =>
                              <option
                                key={option.id}
                                value={option.id}
                              >
                                {option.name}
                              </option>,
                            )}
                          </select>
                        </div>
                        <div className="col-sm-2">
                          <span className="input-group-btn">
                            <button
                              type="button" className="btn btn-primary btn-block"
                              id="addNewOption"
                              onClick={event => this.newOptions(event)}
                            >
                              Add
                            </button>
                          </span>
                        </div>
                      </div>
                    </div>

                    <hr />

                    <div className="siteOption" id="optionChannel">
                      {/* /.Option Channel */}
                      {this.props.channels && this.props.channels.editing &&
                      this.props.channels.editing.options &&
                      this.props.channels.editing.options.map((option, index) => {
                        if (option.optionChannelType) {
                          if (option.optionChannelType.isSelectOption === true) {
                            return (<OptionSelectChannel
                              key={option.id}
                              id={option.id}
                              name={option.optionChannelType.name}
                              index={index + 1}
                              value={option.value}
                              comparison={option.comparison}
                              data={option.optionChannelType.optionChannelValues}
                              logical={option.logical}
                              deleteOptionChannel={this.props.deleteOptionChannel}
                              optionChannelId={option.id}
                            />);
                          } else if (option.optionChannelType.isSelectOption === false) {
                            return (
                              <FilterSiteChannel
                                key={option.id}
                                id={option.id}
                                index={index + 1}
                                type={option.optionChannelType}
                                logical={option.logical}
                                name={option.name}
                                value={option.value}
                                comparison={option.comparison}
                              />
                            );
                          }
                        }
                        return false;
                      })}
                      {this.state.newFilterSite
                      && this.state.newFilterSite.map((ob) => (
                        <FilterSiteChannel
                          key={ob.count}
                          index={ob.count}
                          name={ob.name}
                          typeId={ob.type.id}
                          type={ob.type}
                        />
                      ))}
                      {this.state.arrVariable && this.state.arrVariable.map((ob) => (
                        <FilterSiteChannel
                          key={ob.count}
                          index={ob.count}
                          typeId={ob.type.id}
                          type={ob.type}
                        />
                      ))}
                      {this.state.arrCheckBox && this.state.arrCheckBox.map((ob) => (
                        <OptionSelectChannel
                          key={ob.count}
                          index={ob.count}
                          name={ob.name}
                          data={ob.data}
                          typeId={ob.type.id}
                        />
                      ))}
                      {this.state.string}
                    </div>

                    <hr />

                    <div className="post clearfix">
                      <Link
                        to="/resource/channel"
                        className="btn btn-app pull-right"
                      ><i className="fa fa-undo" /> Cancel</Link>
                      <Link
                        to="#"
                        className="btn btn-app pull-right"
                        onClick={event => this.saveOptions(event)}
                      ><i className="fa fa-floppy-o" /> Save</Link>
                    </div>
                  </div>
                  <div className="tab-pane" id="activity">
                    <div className="row">
                      <section className="col-lg-12">
                        <Activities
                          activities={this.props.activities && this.props.activities.list}
                          updateChannel={this.props.updateChannel}
                          setPageChannelActiveTab={this.props.setPageChannelActiveTab}
                          createActivity={this.props.createActivity}
                          channel={this.props.channels && this.props.channels.editing}
                          users={this.props.users && this.props.users.editing}
                        />
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
  page: state.page.channels,
  channels: state.channels,
  optionChannels: state.optionChannels,
  sites: state.sites,
  optionChannelTypes: state.optionChannelTypes,
  users: state.users,
  activities: state.activities,
});

const mapDispatch = {
  getChannel,
  updateChannel,
  deleteChannel,
  createOptionChannel,
  deleteOptionChannel,
  getSites,
  updateOptionChannel,
  getOptionChannelTypes,
  getActivitiesBySubjectId,
  createActivity,
  setPageChannelActiveTab,
};

export default withStyles(s)(connect(mapState, mapDispatch)(Channel));
