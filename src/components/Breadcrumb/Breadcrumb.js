/**
 * Created by Manhhailua on 11/16/16.
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import history from '../../core/history';
import Link from '../Link';
import s from './Breadcrumb.css';

class Breadcrumb extends Component {

  static propTypes = {
    menus: PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      activeItems: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.menus.asideLeft.items) {
      nextProps.menus.asideLeft.items.map(item => this.checkActiveItem(item));
    }
  }

  checkActiveItem(item, activeItems = []) {
    if (item) {
      const array = activeItems;
      array.unshift(item);

      if (item.url === history.location.pathname) {
        this.setState({ activeItems: Object.assign([], array) });
      }

      if (item.childItems && item.childItems.length > 0) {
        item.childItems.map(childItem => {
          if (childItem.parentId !== array[0].id) {
            array.shift();
          }

          return this.checkActiveItem(childItem, array);
        });
      }
    }
  }

  render() {
    return (
      <ol className="breadcrumb">
        <li><Link to="/"><i className="fa fa-dashboard" /></Link></li>
        {this.state.activeItems.reverse().map((item, index) => {
          if (index !== this.state.activeItems.length - 1) {
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
