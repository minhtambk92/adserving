/**
 * Created by Manhhailua on 11/16/16.
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import MenuItem from './MenuItem';
import { setAsideLeftActiveItems } from '../../actions/menus';
import s from './AsideLeft.css';

class AsideLeft extends Component {

  static propTypes = {
    menus: PropTypes.object,
    setAsideLeftActiveItems: PropTypes.func,
  };

  render() {
    const { menus } = this.props;

    return (
      <aside className="main-sidebar">
        {/* sidebar: style can be found in sidebar.less */}
        <section className="sidebar" style={{ height: 'auto' }}>
          {/* sidebar menu: : style can be found in sidebar.less */}
          <ul className="sidebar-menu">
            {menus.asideLeft.items && menus.asideLeft.items.map((item) => {
              if (item.type === 'header') {
                return <li key={item.id} className="header">{item.name}</li>;
              }
              return (
                <MenuItem
                  key={item.id} item={item}
                  setAsideLeftActiveItems={this.props.setAsideLeftActiveItems}
                  activeIds={this.props.menus.asideLeftActiveItems.map(activeItem => activeItem.id)}
                />
              );
            })}
          </ul>
        </section>
        {/* /.sidebar */}
      </aside>
    );
  }
}

const mapState = state => ({
  menus: state.menus,
});

const mapDispatch = {
  setAsideLeftActiveItems,
};

export default withStyles(s)(connect(mapState, mapDispatch)(AsideLeft));
