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
import { createOptionChannel, deleteOptionChannel, updateOptionChannel } from '../../../../actions/optionChannels';
import { getSites } from '../../../../actions/sites';
import Layout from '../../../../components/Layout';
import UpdateChannelForm from '../UpdateChannelForm';
import SelectOptionChannel from '../OptionSelectChannel';
import FilterSiteChannel from '../FilterSiteChannel';
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
    sites: PropTypes.object,
    getSites: PropTypes.func,
    updateOptionChannel: PropTypes.func,
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
      options: [
        { id: 'option-1', name: 'Site - PageURL', value: 'pageUrl' },
        { id: 'option-2', name: 'Site - Referring Page', value: 'referingPage' },
        { id: 'option-3', name: 'Site - Variable', value: 'variable' },
        { id: 'option-4', name: 'Category', value: 'category' },
        { id: 'option-5', name: 'Browser', value: 'browser' },
      ],
      countOptionChannel: 0,
      string: '',
    };
  }

  componentWillMount() {
    this.props.getChannel(this.props.channelId);
    this.props.getSites();
  }

  componentWillReceiveProps(nextProps) {
    const {
      options,
    } = nextProps.channels && (nextProps.channels.editing || {});
    if (nextProps.channels.editing.options) {
      const length = options.length;
      this.setState({ countOptionChannel: length });
    }
  }

  componentDidUpdate() {
    /* eslint-disable no-undef */
    $(this.input).iCheck({
      checkboxClass: 'icheckbox_minimal-blue',
      radioClass: 'iradio_minimal-blue',
    });
    const self = this;
    $('.remove-option').click(function () {
      const length = self.state.countOptionChannel;
      const count = length - 1;
      self.setState({ countOptionChannel: count });
      const id = $(this).parents('.row').attr('id');
      if (id) {
        if (id !== 'browser' && id !== 'category') {
          self.props.deleteOptionChannel(id).then(() => {
            self.props.getChannel(self.props.channelId);
          });
        }
      }
    });
    /* eslint-enable no-undef */
  }

  saveOptions() { // eslint-disable-line no-unused-vars, class-methods-use-this
    /* eslint-disable no-undef */
    const length = this.state.countOptionChannel;
    for (let i = 1; i <= length; i += 1) {
      const id = $(`#optionChannel .optionChannel-${i}`).attr('id');
      if (id) {
        if (id === 'category' || id === 'browser') {
          const arrCategory = [];
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
            /* eslint-disable max-len */
            this.props.updateOptionChannel({ id, logical, type, comparison, value, channelId }).then(() => {
              /* eslint-enable max-len */
              this.props.getChannel(this.props.channelId);
            });
          }
        } else if (id !== 'category' && id !== 'browser') {
          const idVariable = $(`#${id} .optionVariable`).attr('id');
          const idV = `variable-${i}`;
          if (idVariable === idV) {
            const comparison = $(`#${id} .inputSiteFilter`).val();
            const type = $(`#${id} .box-title`).html();
            const name = $(`#${id} .inputChannelVariableName`).val();
            const value = $(`#${id} .inputChannelVariableValue`).val();
            const logical = $(`#${id} .inputTypeFilter`).val();
            const channelId = this.props.channelId;
            if (type && comparison && value) {
              /* eslint-disable max-len */
              this.props.updateOptionChannel({ id, name, logical, type, comparison, value, channelId }).then(() => {
                /* eslint-enable max-len */
                this.props.getChannel(this.props.channelId);
              });
            }
          } else {
            const comparison = $(`#${id} .inputSiteFilter`).val();
            const type = $(`#${id} .box-title`).html();
            const name = `${type}`;
            const value = $(`#${id} .inputChannelOptionURL`).val();
            const logical = $(`#${id} .inputTypeFilter`).val();
            const channelId = this.props.channelId;
            if (type && comparison && value) {
              /* eslint-disable max-len */
              this.props.updateOptionChannel({ id, name, logical, type, comparison, value, channelId }).then(() => {
                /* eslint-enable max-len */
                this.props.getChannel(this.props.channelId);
              });
            }
          }
        }
      } else {
        const idVariable = $(`.optionChannel-${i} .optionVariable`).attr('id');
        const idV = `variable-${i}`;
        if (idVariable === idV) {
          const comparison = $(`.optionChannel-${i} .inputSiteFilter`).val();
          const type = $(`.optionChannel-${i} .box-title`).html();
          const name = $(`.optionChannel-${i} .inputChannelVariableName`).val();
          const value = $(`.optionChannel-${i} .inputChannelVariableValue`).val();
          const logical = $(`.optionChannel-${i} .inputTypeFilter`).val();
          const channelId = this.props.channelId;
          if (type && comparison && value) {
            $(`.optionChannel-${i}`).remove();
            /* eslint-disable max-len */
            this.props.createOptionChannel({ name, logical, type, comparison, value, channelId }).then(() => {
              /* eslint-enable max-len */
              this.props.getChannel(this.props.channelId);
            });
          }
        } else {
          const comparison = $(`.optionChannel-${i} .inputSiteFilter`).val();
          const type = $(`.optionChannel-${i} .box-title`).html();
          const name = `${type}`;
          const value = $(`.optionChannel-${i} .inputChannelOptionURL`).val();
          const logical = $(`.optionChannel-${i} .inputTypeFilter`).val();
          const channelId = this.props.channelId;
          if (type && comparison && value) {
            $(`.optionChannel-${i}`).remove();
            /* eslint-disable max-len */
            this.props.createOptionChannel({ name, logical, type, comparison, value, channelId }).then(() => {
              /* eslint-enable max-len */
              this.props.getChannel(this.props.channelId);
            });
          }
        }
      }
    }
  }

  newOptions() { // eslint-disable-line no-unused-vars, class-methods-use-this
    /* eslint-disable no-undef */
    const value = this.inputChannelOptions.value;
    const html = $(`#inputChannelOptions option[value=${value}]`).text();
    if (value === 'category' || value === 'browser') {
      const count = this.state.countOptionChannel + 1;
      this.setState({ countOptionChannel: count });
      if (value === 'category') {
        this.addCheckBoxSite(this.state.category, value);
      } else {
        this.addCheckBoxSite(this.state.browser, value);
      }
    }
    if (value === 'variable') {
      this.addVariable(value);
    } else {
      const count = this.state.countOptionChannel + 1;
      this.setState({ countOptionChannel: count });
      this.addNewFilterSite(value, html);
    }
    /* eslint-enable no-undef */
  }

  addNewFilterSite(type, name) { // eslint-disable-line no-unused-vars, class-methods-use-this
    const count = this.state.countOptionChannel + 1;
    this.setState({ countOptionChannel: count });
    let html = '';
    html += `<div class="row optionChannel-${count}">`;
    html += '<div class="col-lg-12">';
    html += '<div class="box box-solid box-primary">';
    html += `<div class="box-header"><h3 class="box-title">${name}</h3>`;
    html += '<div class="box-tools pull-right">';
    html += '<button class="btn btn-box-tool remove-option" data-widget="remove"> <i class="fa fa-times" /> </button>';
    html += '</div></div>';
    html += '<div class="box-body"><div class="col-lg-2"> <div class="box-body"> <div class="form-group"> <div class="col-sm-12">';
    html += '<select class="form-control inputTypeFilter"><option value="and">AND</option> <option value="or">OR</option> </select>';
    html += '</div> </div> </div> </div>';
    html += '<div class="col-lg-8"><div class="box-body"> <div class="row"> <form class="form-horizontal">';
    html += '<div class="form-group">';
    html += `<label class="col-sm-3 control-label">${name}</label>`;
    html += '<div class="col-sm-9"><select class="form-control inputSiteFilter" >';
    html += '<option value="==">is equal to</option> <option value="!=">is different from</option> <option value="=~">Contains</option> <option value="!~">Does not contain</option> <option value="=x">Regex match</option> <option value="!x">Regex does not match</option>';
    html += '</select> </div> </div>';
    html += '<div class="form-group">';
    html += '<label class="col-sm-3 control-label" >&nbsp;</label>';
    html += '<div class="col-sm-9"> <input type="text" class="form-control inputChannelOptionURL" placeholder="http://www.google.com" /> </div>';
    html += '</div> </form> </div> </div> </div> </div></div> </div></div>';
    $('#optionChannel').append(html);
  }

  addVariable(name) { // eslint-disable-line no-unused-vars, class-methods-use-this
    const count = this.state.countOptionChannel + 1;
    this.setState({ countOptionChannel: count });
    let html = '';
    html += `<div class="row optionChannel-${count}">`;
    html += '<div class="col-lg-12">';
    html += '<div class="box box-solid box-primary">';
    html += `<div class="box-header"><h3 class="box-title">${name}</h3>`;
    html += '<div class="box-tools pull-right">';
    html += '<button class="btn btn-box-tool remove-option" data-widget="remove"> <i class="fa fa-times" /> </button>';
    html += '</div></div>';
    html += '<div class="box-body"><div class="col-lg-2"> <div class="box-body"> <div class="form-group"> <div class="col-sm-12">';
    html += '<select class="form-control inputTypeFilter"><option value="and">AND</option> <option value="or">OR</option> </select>';
    html += '</div> </div> </div> </div>';
    html += '<div class="col-lg-8"><div class="box-body"> <div class="row"> <form class="form-horizontal">';
    html += '<div class="form-group">';
    html += '<label class="col-sm-3 control-label">&nbsp;</label>';
    html += '<div class="col-sm-9"><select class="form-control inputSiteFilter" >';
    html += '<option value="==">is equal to</option> <option value="!=">is different from</option> <option value="=~">Contains</option> <option value="!~">Does not contain</option> <option value="=x">Regex match</option> <option value="!x">Regex does not match</option>';
    html += '</select> </div> </div>';
    html += `<div class="optionVariable" id="variable-${count}">`;
    html += '<div class="form-group">';
    html += '<label class="col-sm-3 control-label" >Name</label>';
    html += '<div class="col-sm-9"> <input type="text" class="form-control inputChannelVariableName" placeholder="http://www.google.com" /> </div>';
    html += '</div>';
    html += '<div class="form-group">';
    html += '<label class="col-sm-3 control-label" >value</label>';
    html += '<div class="col-sm-9"> <input type="text" class="form-control inputChannelVariableValue" placeholder="http://www.google.com" /> </div>';
    html += '</div>';
    html += '</div>';
    html += '</form> </div> </div> </div> </div></div> </div></div>';
    $('#optionChannel').append(html);
  }

  addCheckBoxSite(data, name) { // eslint-disable-line no-unused-vars, class-methods-use-this
    const count = this.state.countOptionChannel + 1;
    this.setState({ countOptionChannel: count });
    let html = '';
    html += `<div class="row optionChannel-${count}">`;
    html += '<div class="col-lg-12">';
    html += '<div class="box box-solid box-primary">';
    html += '<div class="box-header">';
    html += `<h3 class="box-title">${name}</h3>`;
    html += '<div class="box-tools pull-right">';
    html += '<button class="btn btn-box-tool remove-option" data-widget="remove"> <i class="fa fa-times" /> </button>';
    html += '</div></div>';
    html += '<div class="box-body">';
    html += '<div class="col-lg-2"> <div class="box-body"> <div class="form-group"> <div class="col-sm-12">';
    html += '<select class="form-control inputTypeFilter" > <option value="and">AND</option> <option value="and">OR</option> </select>';
    html += '</div> </div> </div> </div>';
    html += '<div class="col-lg-8">';
    html += '<div class="box-body">';
    html += '<div class="row">';
    html += '<form class="form-horizontal">';
    html += '<div class="form-group">';
    html += '<label for="inputChannelOption" class="col-sm-3 control-label">Comparison</label>';
    html += '<div class="col-sm-9"><select class="form-control inputSiteFilter">';
    html += '<option value="==">Is any of</option><option value="!=">Is not any of</option>';
    html += '</select> </div> </div>';
    html += '<div class="form-group">';
    html += '<div class="col-lg-3">&nbsp;</div>';
    for (let i = 0; i < data.length; i += 1) {
      html += '<div class="col-sm-3">';
      html += '<label class="control-label" >';
      html += `<input type="checkbox" value=${data[i].value} class="inputOption" />${data[i].name}`;
      html += '</label></div>';
    }
    html += '</div></div></form></div> </div> </div> </div> </div></div>';
    $('#optionChannel').append(html);
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
                            sites={this.props.sites && this.props.sites.list}
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
                              <div className="box-body">
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
                                <div className="siteOption" id="optionChannel">
                                  {/* /.Option Channel */}
                                  {this.props.channels && this.props.channels.editing &&
                                  this.props.channels.editing.options &&
                                  this.props.channels.editing.options.map((option, index) => {
                                    if (option.type === 'category') {
                                      return (<SelectOptionChannel
                                        key={option.id}
                                        id={option.type}
                                        name={option.type}
                                        index={index + 1}
                                        value={option.value}
                                        comparison={option.comparison}
                                        data={this.state.category}
                                        logical={option.logical}
                                        deleteOptionChannel={this.props.deleteOptionChannel}
                                        optionChannelId={option.id}
                                      />);
                                    } else if (option.type === 'browser') {
                                      return (<SelectOptionChannel
                                        id={option.type}
                                        key={option.id}
                                        name={option.type}
                                        index={index + 1}
                                        value={option.value}
                                        comparison={option.comparison}
                                        data={this.state.browser}
                                        logical={option.logical}
                                        optionChannelId={option.id}
                                        deleteOptionChannel={this.props.deleteOptionChannel}
                                      />);
                                    } else if (option.type === 'variable') {
                                      return (
                                        <FilterSiteChannel
                                          key={option.id}
                                          id={option.id}
                                          index={index + 1}
                                          type={option.type}
                                          logical={option.logical}
                                          name={option.name}
                                          value={option.value}
                                          comparison={option.comparison}
                                        />
                                      );
                                    } else if (option.type !== 'browser' && option.type !== 'category' && option.type !== 'variable') {
                                      return (
                                        <FilterSiteChannel
                                          key={option.id}
                                          id={option.id}
                                          index={index + 1}
                                          logical={option.logical}
                                          name={option.name}
                                          value={option.value}
                                          comparison={option.comparison}
                                        />
                                      );
                                    }
                                    return false;
                                  },
                                  )}
                                  {this.state.string}
                                </div>
                              </div>
                              <div className="box-footer">
                                <Link
                                  to="/resource/Channel"
                                  className="btn btn-app pull-right"
                                ><i className="fa fa-undo" /> Cancel</Link>
                                <Link
                                  to="#"
                                  className="btn btn-app pull-right"
                                  onClick={event => this.saveOptions(event)}
                                ><i className="fa fa-floppy-o" /> Save Options</Link>
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
  sites: state.sites,
});

const mapDispatch = {
  getChannel,
  updateChannel,
  deleteChannel,
  createOptionChannel,
  deleteOptionChannel,
  getSites,
  updateOptionChannel,
};

export default withStyles(s)(connect(mapState, mapDispatch)(Channel));
