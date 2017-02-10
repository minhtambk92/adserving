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
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { logUserIn, getUser, updateProfile } from '../../actions/users';
import { navigate } from '../../actions/route';
import SettingProfile from './SettingProfile';
import InformationProfile from './InformationProfile';
import Link from '../../components/Link';
import s from './Profile.css'; // eslint-disable-line css-modules/no-unused-class

class Profile extends Component {

  static propTypes = {
    user: PropTypes.object,
    logUserIn: PropTypes.func,
    navigate: PropTypes.func,
    getUser: PropTypes.func,
    users: PropTypes.object,
    updateProfile: PropTypes.func,
  };

  componentWillMount() {
    this.props.getUser(this.props.user.id);
  }
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-3">
            <InformationProfile
              user={this.props.users && this.props.users.editing}
            />
          </div>
          {/* /.col */}
          <div className="col-md-9">
            <div className="nav-tabs-custom">
              <ul className="nav nav-tabs">
                <li className="active"><a href="#settings" data-toggle="tab">Settings</a></li>
                <li><a href="#activity" data-toggle="tab">Activity</a></li>
                <li><a href="#timeline" data-toggle="tab">Timeline</a></li>
              </ul>
              <div className="tab-content">
                {/* /.tab-pane setting */}
                <div className="active tab-pane" id="settings">
                  <SettingProfile
                    user={this.props.users && this.props.users.editing}
                    updateProfile={this.props.updateProfile}
                    getUser={this.props.getUser}
                    id={this.props.user && this.props.user.id}
                  />
                </div>
                {/* /.tab-pane activity */}
                <div className="tab-pane" id="activity">
                  {/* Post */}
                  <div className="post">
                    <div className="user-block">
                      <img
                        className="img-circle img-bordered-sm"
                        src="/default_avatar.png" alt="avatar"
                      />
                      <span className="username">
                        <Link to="#">Jonathan Burke Jr.</Link>
                        <Link to="#" className="pull-right btn-box-tool"><i className="fa fa-times" /></Link>
                      </span>
                      <span className="description">Shared publicly - 7:30 PM today</span>
                    </div>
                    {/* /.user-block */}
                    <p>
                      Lorem ipsum represents a long-held tradition for designers,
                      typographers and the like. Some people hate it and argue for
                      its demise, but others ignore the hate as they create awesome
                      tools to help create filler text for everyone from bacon lovers
                      to Charlie Sheen fans.
                    </p>
                    <ul className="list-inline">
                      <li><Link to="#" className="link-black text-sm"><i className="fa fa-share margin-r-5" /> Share</Link></li>
                      <li><Link to="#" className="link-black text-sm"><i className="fa fa-thumbs-o-up margin-r-5" /> Like</Link>
                      </li>
                      <li className="pull-right">
                        <Link to="#" className="link-black text-sm"><i className="fa fa-comments-o margin-r-5" /> Comments
                          (5)</Link></li>
                    </ul>
                    <input className="form-control input-sm" type="text" placeholder="Type a comment" />
                  </div>
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

const mapState = (state) => ({
  user: state.user,
  users: state.users,
});

const mapDispatch = {
  logUserIn,
  navigate,
  getUser,
  updateProfile,
};

export default withStyles(s)(connect(mapState, mapDispatch)(Profile));
