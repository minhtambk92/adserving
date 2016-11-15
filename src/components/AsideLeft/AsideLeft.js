import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import history from '../../core/history';
import {
  getAsideLeftMenu,
  setActiveItems,
} from '../../actions/menus';
import MenuItem from './MenuItem';
import s from './AsideLeft.css';

class AsideLeft extends Component {

  static propTypes = {
    menus: PropTypes.object,
    getAsideLeftMenu: PropTypes.func,
    setActiveItems: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      activeItems: [],
    };
  }

  componentDidMount() {
    this.props.getAsideLeftMenu('main-menu');
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
    const { menus } = this.props;

    return (
      <aside className="main-sidebar">
        {/* sidebar: style can be found in sidebar.less */}
        <section className="sidebar" style={{ height: 'auto' }}>
          {/* search form */}
          <form action="#" method="get" className="sidebar-form">
            <div className="input-group">
              <input type="text" name="q" className="form-control" placeholder="Search..." />
              <div className="input-group-btn">
                <button type="submit" name="search" id="search-btn" className="btn btn-flat">
                  <i className="fa fa-search" />
                </button>
              </div>
            </div>
          </form>
          {/* /.search form */}
          {/* sidebar menu: : style can be found in sidebar.less */}
          <ul className="sidebar-menu">
            {menus.asideLeft.items && menus.asideLeft.items.map(item => {
              if (item.type === 'header') {
                return <li key={item.id} className="header">{item.name}</li>;
              }
              return (
                <MenuItem
                  key={item.id} item={item}
                  activeIds={this.state.activeItems.map(activeItem => activeItem.id)}
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

const mapState = (state) => ({
  menus: state.menus,
});

const mapDispatch = {
  getAsideLeftMenu,
  setActiveItems,
};

export default withStyles(s)(connect(mapState, mapDispatch)(AsideLeft));
