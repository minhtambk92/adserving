import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Link from '../Link';
import s from './AsideLeft.css';

function AsideLeft() {
  return (
    <aside className="main-sidebar">
      { /* sidebar: style can be found in sidebar.less */ }
      <section className="sidebar" style={{ height: 'auto' }}>
        { /* Sidebar user panel */ }
        <div className="user-panel">
          <div className="pull-left image">
            <img src="/AdminLTE/dist/img/user2-160x160.jpg" className="img-circle" alt="User" />
          </div>
          <div className="pull-left info">
            <p>Alexander Pierce</p>
            <Link to="#"><i className="fa fa-circle text-success" /> Online</Link>
          </div>
        </div>
        { /* search form */ }
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
        { /* /.search form */ }
        { /* sidebar menu: : style can be found in sidebar.less */ }
        <ul className="sidebar-menu">
          <li className="header">MAIN NAVIGATION</li>
          <li className="treeview active">
            <Link to="/">
              <i className="fa fa-dashboard" /> <span>Dashboard</span>
              <div className="pull-right-container">
                <i className="fa fa-angle-left pull-right" />
              </div>
            </Link>
            <ul className="treeview-menu">
              <li className="active">
                <Link to="/campaigns"><i className="fa fa-circle-o" /> Campaigns</Link>
              </li>
              <li>
                <Link to="/placements"><i className="fa fa-circle-o" /> Placements</Link>
              </li>
              <li>
                <Link to="/banners"><i className="fa fa-circle-o" /> Banners</Link>
              </li>
              <li>
                <Link to="/zones"><i className="fa fa-circle-o" /> Zones</Link>
              </li>
            </ul>
          </li>
        </ul>
      </section>
      { /* /.sidebar */ }
    </aside>
  );
}

export default withStyles(s)(AsideLeft);
