/**
 * Created by  on 12/29/16.
 */

import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Profile.css';

class Profile extends Component {

  static propTypes = {
    resourceId: PropTypes.string.isRequired,
  };

  render() {
    return (
      <p>Option Page! {this.props.resourceId}</p>
    );
  }
}

export default withStyles(s)(Profile);
