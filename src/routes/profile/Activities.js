/* global $ */

import React, { Component, PropTypes } from 'react';
import moment from 'moment';

class Activities extends Component {

  static propTypes = {
    activities: PropTypes.array,
  };


  render() {
    return (
      <div className="activities">
        {this.props.activities &&
        this.props.activities.map(activity => (
          <div className="post" key={activity.id}>
            <div className="user-block">
              <img
                className="img-circle img-bordered-sm"
                src={(activity.user &&
                activity.user.profile && activity.user.profile.picture ?
                  activity.user.profile.picture : '/default_avatar.png')}
                alt="avatar"
              />
              <span className="username">
                {activity.user && activity.user.profile &&
                activity.user.profile.displayName}
              </span>
              <span
                className="description"
              >
                { moment(new Date(activity.createdAt)).format('lll')}
              </span>
            </div>
            {/* /.user-block */}
            <p>
              {activity.user && activity.user.profile && activity.user.profile.displayName
              && activity.user.profile.displayName} { activity.action } { activity.subject }
            </p>
          </div>
        ))}
      </div>
    );
  }
}

export default Activities;
