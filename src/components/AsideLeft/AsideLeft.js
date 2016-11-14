import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { getAsideLeftMenu } from '../../actions/menus';
import Link from '../Link';
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

            <li className="header">MAIN NAVIGATION</li>
            <li className="treeview">
              <Link to="/">
                <i className="fa fa-line-chart" /> <span>Report</span>
                <span className="pull-right-container">
                  <i className="fa fa-angle-left pull-right" />
                </span>
              </Link>
              <ul className="treeview-menu">
                <li>
                  <Link to="/campaigns"><i className="fa fa-circle-o" /> System</Link>
                </li>
              </ul>
            </li>
            <li className="treeview active">
              <Link to="/">
                <i className="fa fa-briefcase" /> <span>Inventory</span>
                <span className="pull-right-container">
                  <i className="fa fa-angle-left pull-right" />
                </span>
              </Link>
              <ul className="treeview-menu">
                <li className="active">
                  <Link to="/resource/advertiser"><i className="fa fa-circle-o" />
                    Advertisers</Link>
                </li>
                <li>
                  <Link to="/resource/campaign"><i className="fa fa-circle-o" /> Campaigns</Link>
                </li>
                <li>
                  <Link to="/resource/banner"><i className="fa fa-circle-o" /> Banners</Link>
                </li>
                <li>
                  <Link to="/resource/placement"><i className="fa fa-circle-o" /> Placements</Link>
                </li>
                <li>
                  <Link to="/resource/site"><i className="fa fa-circle-o" /> Sites</Link>
                </li>
                <li>
                  <Link to="/resource/zone"><i className="fa fa-circle-o" /> Zones</Link>
                </li>
              </ul>
            </li>

            <li className="header">CONFIGURATION</li>
            <li className="treeview">
              <Link to="/">
                <i className="fa fa-gears" /> <span>Settings</span>
                <span className="pull-right-container">
                  <i className="fa fa-angle-left pull-right" />
                </span>
              </Link>
              <ul className="treeview-menu">
                <li>
                  <Link to="/setting/appearance">
                    <i className="fa fa-desktop" /> <span>Appearance</span>
                    <span className="pull-right-container">
                      <i className="fa fa-angle-left pull-right" />
                    </span>
                  </Link>
                  <ul className="treeview-menu">
                    <li>
                      <Link to="/setting/appearance/menus">
                        <i className="fa fa-bars" /> <span>Menus</span>
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li className="treeview">
              <Link to="/resource/user">
                <i className="fa fa-user" /> <span>Users</span>
                <span className="pull-right-container">
                  <i className="fa fa-angle-left pull-right" />
                </span>
              </Link>
              <ul className="treeview-menu">
                <li>
                  <Link to="/profile"><i className="fa fa-info-circle" /> Your Profile</Link>
                </li>
                <li>
                  <Link to="/resource/user"><i className="fa fa-users" /> All Users</Link>
                </li>
                <li>
                  <Link to="/resource/role"><i className="fa fa-flag" /> Roles</Link>
                </li>
              </ul>
            </li>
            <li className="treeview">
              <Link to="/users">
                <i className="fa fa-industry" /> <span>Resources</span>
                <span className="pull-right-container">
                  <i className="fa fa-angle-left pull-right" />
                </span>
              </Link>
              <ul className="treeview-menu">
                <li>
                  <Link to="/resource/type"><i className="fa fa-circle-o" /> Types</Link>
                </li>
              </ul>
            </li>
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
