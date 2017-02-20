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

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { getUser, updateProfile } from '../../actions/users';
import { navigate } from '../../actions/route';
import { setStatusUpdateProfileUser, setPageProfileActiveTab } from '../../actions/pages/users';
import SettingProfile from './SettingProfile';
import InformationProfile from './InformationProfile';
import Activities from './Activities';
import Link from '../../components/Link';
import s from './Profile.css'; // eslint-disable-line css-modules/no-unused-class

class Profile extends Component {

  static propTypes = {
    user: PropTypes.object,
    navigate: PropTypes.func,
    getUser: PropTypes.func,
    users: PropTypes.object,
    updateProfile: PropTypes.func,
    setStatusUpdateProfileUser: PropTypes.func,
    page: PropTypes.object,
    setPageProfileActiveTab: PropTypes.func,
  };

  componentWillMount() {
    this.props.getUser(this.props.user.id);
  }

  componentDidMount() {
    // Set latest active tab
    $('.profile-box ul li').removeClass('active');
    $(`a[href="#${this.props.page.activeTab}"]`).trigger('click');
  }

  componentDidUpdate() {
    // Set latest active tab
    if (this.props.page.activeTab !== undefined && this.props.page.activeTab !== null) {
      $('.profile-box ul li').removeClass('active');
      $(`a[href="#${this.props.page.activeTab}"]`).trigger('click');
    }
  }

  onTabClick(event) {
    event.persist();
    this.props.setPageProfileActiveTab(event.target.getAttribute('data-id'));
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-3">
            <InformationProfile
              user={this.props.users && this.props.users.editing}
              setStatusUpdateProfileUser={this.props.setStatusUpdateProfileUser}
              page={this.props.page}
              updateProfile={this.props.updateProfile}
              getUser={this.props.getUser}
              id={this.props.user && this.props.user.id}
              setPageProfileActiveTab={this.props.setPageProfileActiveTab}
            />
          </div>
          {/* /.col */}
          <div className="col-md-9 profile-box">
            <div className="nav-tabs-custom">
              <ul className="nav nav-tabs">
                <li className="active">
                  <a
                    href="#settings"
                    data-toggle="tab"
                    data-id="settings"
                    onClick={event => this.onTabClick(event)}
                  >
                  Settings
                  </a>
                </li>
                <li><a
                  href="#activity" data-toggle="tab" data-id="activity"
                  onClick={event => this.onTabClick(event)}
                >Activity</a></li>
                <li><a
                  href="#timeline" data-toggle="tab" data-id="timeline"
                  onClick={event => this.onTabClick(event)}
                >Timeline</a></li>
              </ul>
              <div className="tab-content">
                {/* /.tab-pane setting */}
                <div className="active tab-pane" id="settings">
                  <SettingProfile
                    user={this.props.users && this.props.users.editing}
                    updateProfile={this.props.updateProfile}
                    getUser={this.props.getUser}
                    id={this.props.user && this.props.user.id}
                    setStatusUpdateProfileUser={this.props.setStatusUpdateProfileUser}
                    page={this.props.page}
                    setPageProfileActiveTab={this.props.setPageProfileActiveTab}
                  />
                </div>
                {/* /.tab-pane activity */}
                <div className="tab-pane" id="activity">
                  {/* Post */}
                  <Activities
                    users={this.props.users && this.props.users.editing}
                  />
                  {/* /.post */}
                </div>
                {/* /.tab-pane  timeline */}
                <div className="tab-pane" id="timeline">
                  {/* The timeline */}
                  <ul className="timeline timeline-inverse">
                    {/* timeline time label */}
                    <li className="time-label">
                      <span className="bg-red">
                        10 Feb. 2014
                      </span>
                    </li>
                    {/* /.timeline-label */}
                    {/* timeline item */}
                    <li>
                      <i className="fa fa-envelope bg-blue" />
                      <div className="timeline-item">
                        <span className="time"><i className="fa fa-clock-o" /> 12:05</span>
                        <h3 className="timeline-header"><Link to="#">Support Team</Link> sent you an email</h3>
                        <div className="timeline-body">
                          Etsy doostang zoodles disqus groupon greplin oooj voxy zoodles,
                          weebly ning heekya handango imeem plugg dopplr jibjab, movity
                          jajah plickers sifteo edmodo ifttt zimbra. Babblely odeo kaboodle
                          quora plaxo ideeli hulu weebly balihoo...
                        </div>
                        <div className="timeline-footer">
                          <a className="btn btn-primary btn-xs">Read more</a>
                          <a className="btn btn-danger btn-xs">Delete</a>
                        </div>
                      </div>
                    </li>
                    {/* END timeline item */}
                    {/* timeline item */}
                    <li>
                      <i className="fa fa-user bg-aqua" />
                      <div className="timeline-item">
                        <span className="time"><i className="fa fa-clock-o" /> 5 mins ago</span>
                        <h3 className="timeline-header no-border"><Link to="#">Sarah Young</Link> accepted your friend request
                        </h3>
                      </div>
                    </li>
                    {/* END timeline item */}
                    {/* timeline item */}
                    <li>
                      <i className="fa fa-comments bg-yellow" />
                      <div className="timeline-item">
                        <span className="time"><i className="fa fa-clock-o" /> 27 mins ago</span>
                        <h3 className="timeline-header"><Link to="#">Jay White</Link> commented on your post</h3>
                        <div className="timeline-body">
                          Take me to your leader!
                          Switzerland is small and neutral!
                          We are more like Germany, ambitious and misunderstood!
                        </div>
                        <div className="timeline-footer">
                          <a className="btn btn-warning btn-flat btn-xs">View comment</a>
                        </div>
                      </div>
                    </li>
                    {/* END timeline item */}
                    {/* timeline time label */}
                    <li className="time-label">
                      <span className="bg-green">
                        3 Jan. 2014
                      </span>
                    </li>
                    {/* /.timeline-label */}
                    {/* timeline item */}
                    <li>
                      <i className="fa fa-camera bg-purple" />
                      <div className="timeline-item">
                        <span className="time"><i className="fa fa-clock-o" /> 2 days ago</span>
                        <h3 className="timeline-header"><Link to="#">Mina Lee</Link> uploaded new photos</h3>
                        <div className="timeline-body">
                          <img src="http://placehold.it/150x100" alt="..." className="margin" />
                          <img src="http://placehold.it/150x100" alt="..." className="margin" />
                          <img src="http://placehold.it/150x100" alt="..." className="margin" />
                          <img src="http://placehold.it/150x100" alt="..." className="margin" />
                        </div>
                      </div>
                    </li>
                    {/* END timeline item */}
                    <li>
                      <i className="fa fa-clock-o bg-gray" />
                    </li>
                  </ul>
                </div>
              </div>
              {/* /.tab-content */}
            </div>
            {/* /.nav-tabs-custom */}
          </div>
          {/* /.col */}
        </div>
      </div>
    );
  }

}

const mapState = state => ({
  user: state.user,
  users: state.users,
  page: state.page.users,
});

const mapDispatch = {
  navigate,
  getUser,
  updateProfile,
  setStatusUpdateProfileUser,
  setPageProfileActiveTab,
};

export default withStyles(s)(connect(mapState, mapDispatch)(Profile));
