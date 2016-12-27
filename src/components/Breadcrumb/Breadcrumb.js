/**
 * Created by Manhhailua on 11/16/16.
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Link from '../Link';
import s from './Breadcrumb.css';

class Breadcrumb extends Component {

  static propTypes = {
    menus: PropTypes.object,
  };

  render() {
    return (
      <ol className="breadcrumb">
        <li><Link to="/"><i className="fa fa-dashboard" /></Link></li>
        {this.props.menus.asideLeftActiveItems.map((item, index) => {
          if (index !== this.props.menus.asideLeftActiveItems.length - 1) {
            return <li key={item.id}><Link to={item.url}>{item.name}&nbsp;</Link></li>;
          }
          return <li key={item.id} className="active">{item.name}</li>;
        })}
      </ol>
    );
  }
}

const mapState = (state) => ({
  menus: state.menus,
});

export default withStyles(s)(connect(mapState)(Breadcrumb));
