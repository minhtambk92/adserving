/**
 * Created by QuyND  on 12/29/16.
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// import { defineMessages, FormattedRelative } from 'react-intl';
import style from 'react-dropzone-component/styles/filepicker.css';
import dropZoneStyle from 'dropzone/dist/min/dropzone.min.css';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Layout from '../../../../components/Layout';
import { getUsers, updateProfile } from '../../../../actions/users/users';
import { setStatusUpdateProfile } from '../../../../actions/pages/resources';
import { createActivity } from '../../../../actions/activity/activities';
import ProfileList from './ProfileList';
import s from './Profile.css'; // eslint-disable-line css-modules/no-unused-class

const pageTitle = 'Profile';
class Profile extends Component {

  static propTypes = {
    resourceId: PropTypes.string.isRequired,
    page: PropTypes.object,
    resources: PropTypes.object,
    getUsers: PropTypes.func,
    users: PropTypes.object,
    setStatusUpdateProfile: PropTypes.func,
    updateProfile: PropTypes.func,
    createActivity: PropTypes.func,
    activities: PropTypes.object,
    user: PropTypes.object,
  };

  componentWillMount() {
    this.props.getUsers();
  }

  render() {
    return (
      <Layout
        pageTitle={pageTitle}
        pageSubTitle=""
      >
        <div>
          <ProfileList
            list={this.props.users && this.props.users.list}
            page={this.props.page}
            getUsers={this.props.getUsers}
            updateProfile={this.props.updateProfile}
            setStatusUpdateProfile={this.props.setStatusUpdateProfile}
            user={this.props.user}
            createActivity={this.props.createActivity}
          />
        </div>
      </Layout>
    );
  }
}
const mapState = state => ({
  resources: state.resources,
  users: state.users,
  page: state.page.resources,
  activities: state.activities,
  user: state.user,
});

const mapDispatch = {
  getUsers,
  setStatusUpdateProfile,
  updateProfile,
  createActivity,
};
export default withStyles(s, style, dropZoneStyle)(connect(mapState, mapDispatch)(Profile));
