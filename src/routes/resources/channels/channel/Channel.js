/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
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
    user: PropTypes.object,
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
      createOptionSelect: false,
      createVariable: false,
      createLink: false,
    };
  }

  componentWillMount() {
    this.props.getChannel(this.props.channelId);
    this.props.getSites();
    this.props.getOptionChannelTypes();
    this.props.getActivitiesBySubjectId(this.props.channelId);
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
      const idOp = $(this).parents('.row').attr('id');
      if (idOp) {
        const options = _.filter(self.props.channels.editing.options, { id: idOp });
        self.props.deleteOptionChannel(idOp).then(() => {
          const userId = self.props.user.id;
          const subject = `Option Channel ${options[0].name}`;
          const subjectId = idOp;
          const action = 'deleted';
          const other = '';
          self.props.createActivity({
            action,
            subject,
            subjectId,
            other,
            userId,
          });
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
        /* eslint-disable object-shorthand */
        const options = _.filter(this.state.arrOption, { id: id });
        if (options[0].optionChannelType) {
          const oChannel = { id: id };
          const optionChannelType = options[0].optionChannelType;
          oChannel.logical = $(`#${id} .inputTypeFilter`).val();
          oChannel.comparison = $(`#${id} .inputSiteFilter`).val();
          oChannel.channelId = this.props.channelId;
          if (optionChannelType) {
            if (optionChannelType.isVariable === true) {
              oChannel.name = $(`#${id} .inputChannelVariableName`).val();
              oChannel.value = $(`#${id} .inputChannelVariableValue`).val();
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
              oChannel.name = optionChannelType.name;
              oChannel.value = arrSelect.toString();
            } else if (optionChannelType.isInputLink === true) {
              // Update Site Option channel
              oChannel.name = optionChannelType.name;
              oChannel.value = $(`#${id} .inputChannelOptionURL`).val();
            }
            const op = _.filter(this.state.arrOption, { id: id });
            const checkName = (JSON.stringify(oChannel.name) === JSON.stringify(op[0].name));
            const checkLogical = (JSON.stringify(oChannel.logical) ===
            JSON.stringify(op[0].logical));
            const checkComparison = (JSON.stringify(oChannel.comparison) ===
            JSON.stringify(op[0].comparison));
            const checkValue = (JSON.stringify(oChannel.value) === JSON.stringify(op[0].value));
            if (checkName === false ||
              checkComparison === false || checkLogical === false || checkValue === false) {
              this.props.updateOptionChannel(oChannel).then(() => {
                const userId = this.props.user.id;
                const subject = `Option Channel ${oChannel.name}`;
                const subjectId = id;
                const action = 'updated';
                const other = JSON.stringify(op[0]);
                this.props.getChannel(this.props.channelId);
                this.props.createActivity({
                  action,
                  subject,
                  subjectId,
                  other,
                  userId,
                }).then(() => {
                  this.props.getChannel(this.props.channelId);
                });
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
            if (options && options.length > 0 && options[0]) {
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
                this.props.createOptionChannel({
                  name,
                  logical,
                  optionChannelTypeId,
                  comparison,
                  value,
                  channelId,
                }).then(() => {
                  this.props.getChannel(this.props.channelId).then(() => {
                    const userId = this.props.user.id;
                    const subject = `Option Channel ${name}`;
                    const subjectId = this.props.channels.editing.options[0].id;
                    const action = 'created';
                    const other = '';
                    this.props.createActivity({
                      action,
                      subject,
                      subjectId,
                      other,
                      userId,
                    });
                    this.setState({ createLink: false });
                    this.setState({ createOptionSelect: false });
                    this.setState({ createVariable: false });
                    this.setState({ newFilterSite: [] });
                    this.setState({ arrVariable: [] });
                    this.setState({ arrCheckBox: [] });
                  });
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
      if (item && item.length > 0 && item[0]) {
        const html = item[0].name;
        const arrOptionChannelValue = item[0].optionChannelValues;
        if (item[0].isInputLink === true) {
          const count = this.state.countOptionChannel + 1;
          this.setState({ createLink: true });
          this.setState({ countOptionChannel: count });
          this.addNewFilterSite(item[0], html);
        } else if (item[0].isSelectOption === true) {
          this.setState({ createOptionSelect: true });
          const count = this.state.countOptionChannel + 1;
          this.setState({ countOptionChannel: count });
          this.addCheckBoxSite(item[0], arrOptionChannelValue, html);
        } else if (item[0].isVariable === true) {
          this.setState({ createVariable: true });
          this.addVariable(item[0], html);
        }
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
                      user={this.props.user}
                    />
                  </div>

                  <div className="tab-pane" id="optionChannel">
                    <div className="form-group">
                      <div className="row">
                        <div className="col-sm-10">
                          <select
                            id="inputChannelOptions" className="form-control"
                            ref={(c) => {
                              this.inputChannelOptions = c;
                            }}
                          >
                            {
                              this.props.optionChannelTypes &&
                              this.props.optionChannelTypes.list.map(option =>
                                (
                                  <option
                                    key={option.id}
                                    value={option.id}
                                  >
                                    {option.name}
                                  </option>
                                ),
                              )
                            }
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
                              createActivity={this.props.createActivity}
                              user={this.props.user}
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
                                createActivity={this.props.createActivity}
                                deleteOptionChannel={this.props.deleteOptionChannel}
                                optionChannelId={option.id}
                                user={this.props.user}
                              />
                            );
                          }
                        }
                        return false;
                      })}
                      {this.state.newFilterSite
                      && this.state.newFilterSite.map(ob => (
                        <FilterSiteChannel
                          key={ob.count}
                          index={ob.count}
                          name={ob.name}
                          typeId={ob.type.id}
                          type={ob.type}
                        />
                      ))}
                      {this.state.arrVariable && this.state.arrVariable.map(ob => (
                        <FilterSiteChannel
                          key={ob.count}
                          index={ob.count}
                          typeId={ob.type.id}
                          type={ob.type}
                        />
                      ))}
                      {this.state.arrCheckBox && this.state.arrCheckBox.map(ob => (
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
                          activities={this.props.activities && this.props.activities.list &&
                          this.props.activities.list}
                          updateChannel={this.props.updateChannel}
                          setPageChannelActiveTab={this.props.setPageChannelActiveTab}
                          createActivity={this.props.createActivity}
                          channel={this.props.channels && this.props.channels.editing}
                          user={this.props.user}
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

const mapState = state => ({
  page: state.page.channels,
  channels: state.channels,
  optionChannels: state.optionChannels,
  sites: state.sites,
  optionChannelTypes: state.optionChannelTypes,
  user: state.user,
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
