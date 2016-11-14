import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { getAsideLeftMenu } from '../../actions/menus';
import MenuItem from './MenuItem';
import s from './AsideLeft.css';

class AsideLeft extends Component {

  static propTypes = {
    menus: PropTypes.object,
    getAsideLeftMenu: PropTypes.func,
  };

  componentDidMount() {
    this.props.getAsideLeftMenu('main-menu');
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
                return (
                  <li key={item.id} className="header">{item.name}</li>
                );
              }

              return <MenuItem key={item.id} item={item} />;
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
};

export default withStyles(s)(connect(mapState, mapDispatch)(AsideLeft));
