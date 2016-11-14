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
import Layout from '../../../../components/Layout';
import UpdateChannelForm from '../UpdateChannelForm';
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
  };

  componentWillMount() {
    this.props.getChannel(this.props.channelId);
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
                  <li className="active">
                    <a href="#editChannel" data-toggle="tab">
                      Edit Channel
                    </a>
                  </li>
                  <li>
                    <a href="#addOption" data-toggle="tab">
                      Add Campaign
                    </a>
                  </li>
                </ul>
                <div className="tab-content">
                  <div className="active tab-pane" id="editChannel">
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
                  <div className="tab-pane" id="addOption">
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
                              {/* form start */}
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
  campaigns: state.campaigns,
});

const mapDispatch = {
  getChannel,
  updateChannel,
  deleteChannel,
};

export default withStyles(s)(connect(mapState, mapDispatch)(Channel));
