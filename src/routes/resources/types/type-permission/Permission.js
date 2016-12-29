/**
 * Created by manhhailua on 12/30/16.
 */

import React, { Component, PropTypes } from 'react';

class Permission extends Component {

  static propTypes = {
    resourceId: PropTypes.string.isRequired,
  };

  render() {
    return (
      <p>Permission Page! {this.props.resourceId}</p>
    );
  }
}

export default Permission;
