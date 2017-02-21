/* global $ */

import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import Link from '../../../components/Link';

class Activities extends Component {

  static propTypes = {
    activities: PropTypes.array,
    updateSite: PropTypes.func,
    setPageSiteActiveTab: PropTypes.func,
    createActivity: PropTypes.func,
    user: PropTypes.object,
    site: PropTypes.object,
  };

  revertEventUpdated(activity) { // eslint-disable-line no-unused-vars, class-methods-use-this
    const siteObject = this.props.site;
    if (activity.other) {
      const site = JSON.parse(activity.other);
      this.props.updateSite(site).then(() => {
        const userId = this.props.user.id;
        const subject = `Site ${this.props.site.name}`;
        const subjectId = this.props.site.id;
        const action = 'revert';
        const other = JSON.stringify(siteObject);
        this.props.createActivity({ action,
          subject,
          subjectId,
          other,
          userId }).then(() => {
            this.props.setPageSiteActiveTab('editSite');
          });
      });
    }
  }


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
                <Link to="#">{activity.user && activity.user.profile &&
                activity.user.profile.displayName && activity.user.profile.displayName}</Link>
                {
                  (activity.action === 'updated' || activity.action === 'revert') ? (
                    <Link
                      to="#"
                      className="pull-right btn-box-tool"
                      onClick={() => this.revertEventUpdated(activity)}
                    >
                      <i className="fa fa-mail-forward" />
                    </Link>
                    ) : ('')
                }
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
