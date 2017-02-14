/* global $ */

import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import Link from '../../components/Link';

class Activities extends Component {

  static propTypes = {
    activities: PropTypes.array,
    users: PropTypes.object,
  };


  render() {
    return (
      <div className="activities">
        {this.props.users && this.props.users.activities &&
        this.props.users.activities.map((activity) => (
          <div className="post" key={activity.id}>
            <div className="user-block">
              <img
                className="img-circle img-bordered-sm"
                src={(this.props.users &&
                this.props.users.profile && this.props.users.profile.picture ?
                  this.props.users.profile.picture : '/default_avatar.png')}
                alt="avatar"
              />
              <span className="username">
                <Link to="#">{this.props.users && this.props.users.profile &&
                this.props.users.profile.displayName && this.props.users.profile.displayName}</Link>
                <Link to="#" className="pull-right btn-box-tool"><i className="fa fa-times" /></Link>
              </span>
              <span
                className="description"
              >
                { moment(new Date(activity.createdAt)).format('lll')}
              </span>
            </div>
            {/* /.user-block */}
            <p>
              {this.props.users && this.props.users.profile && this.props.users.profile.displayName
              && this.props.users.profile.displayName} { activity.action } { activity.subject }
            </p>
          </div>
        ))}
      </div>
    );
  }
}

export default Activities;
