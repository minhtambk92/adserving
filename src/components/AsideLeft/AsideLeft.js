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
            <img src="/AdminLTE/dist/img/user2-160x160.jpg" className="img-circle" alt="User"/>
          </div>
          <div className="pull-left info">
            <p>Alexander Pierce</p>
            <Link to="#"><i className="fa fa-circle text-success"/> Online</Link>
          </div>
        </div>
        { /* search form */ }
        <form action="#" method="get" className="sidebar-form">
          <div className="input-group">
            <input type="text" name="q" className="form-control" placeholder="Search..."/>
            <span className="input-group-btn">
                <button type="submit" name="search" id="search-btn" className="btn btn-flat">
                  <i className="fa fa-search"/>
                </button>
              </span>
          </div>
        </form>
        { /* /.search form */ }
        { /* sidebar menu: : style can be found in sidebar.less */ }
        <ul className="sidebar-menu">
          <li className="header">MAIN NAVIGATION</li>
          <li className="active treeview">
            <Link to="/">
              <i className="fa fa-dashboard"/> <span>Dashboard</span>
              <span className="pull-right-container">
                  <i className="fa fa-angle-left pull-right"/>
                </span>
            </Link>
            <ul className="treeview-menu">
              <li className="active">
                <Link to="/dashboard"><i className="fa fa-circle-o"/> Dashboard v1</Link>
              </li>
              <li>
                <Link to="/dashboard2"><i className="fa fa-circle-o"/> Dashboard v2</Link>
              </li>
            </ul>
          </li>
          <li className="treeview">
            <Link to="#">
              <i className="fa fa-files-o"/>
              <span>Layout Options</span>
              <span className="pull-right-container">
                  <span className="label label-primary pull-right">4</span>
                </span>
            </Link>
            <ul className="treeview-menu">
              <li>
                <Link to="/pages/layout/top-nav">
                  <i className="fa fa-circle-o"/> Top Navigation</Link>
              </li>
              <li><Link to="/pages/layout/boxed">
                <i className="fa fa-circle-o"/> Boxed</Link>
              </li>
              <li><Link to="/pages/layout/fixed">
                <i className="fa fa-circle-o"/> Fixed</Link>
              </li>
              <li>
                <Link to="/pages/layout/collapsed-sidebar">
                  <i className="fa fa-circle-o"/> Collapsed Sidebar</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/pages/widgets">
              <i className="fa fa-th"/> <span>Widgets</span>
              <span className="pull-right-container">
                  <small className="label pull-right bg-green">new</small>
                </span>
            </Link>
          </li>
          <li className="treeview">
            <Link to="#">
              <i className="fa fa-pie-chart"/>
              <span>Charts</span>
              <span className="pull-right-container">
                  <i className="fa fa-angle-left pull-right"/>
                </span>
            </Link>
            <ul className="treeview-menu">
              <li>
                <Link to="/pages/charts/chartjs">
                  <i className="fa fa-circle-o"/> ChartJS</Link>
              </li>
              <li>
                <Link to="/pages/charts/morris">
                  <i className="fa fa-circle-o"/> Morris</Link>
              </li>
              <li>
                <Link to="/pages/charts/flot">
                  <i className="fa fa-circle-o"/> Flot</Link>
              </li>
              <li>
                <Link to="/pages/charts/inline">
                  <i className="fa fa-circle-o"/> Inline charts</Link>
              </li>
            </ul>
          </li>
          <li className="treeview">
            <Link to="#">
              <i className="fa fa-laptop"/>
              <span>UI Elements</span>
              <span className="pull-right-container">
                  <i className="fa fa-angle-left pull-right"/>
                </span>
            </Link>
            <ul className="treeview-menu">
              <li>
                <Link to="/pages/UI/general">
                  <i className="fa fa-circle-o"/> General</Link></li>
              <li>
                <Link to="/pages/UI/icons">
                  <i className="fa fa-circle-o"/> Icons</Link></li>
              <li>
                <Link to="/pages/UI/buttons">
                  <i className="fa fa-circle-o"/> Buttons</Link></li>
              <li>
                <Link to="/pages/UI/sliders">
                  <i className="fa fa-circle-o"/> Sliders</Link></li>
              <li>
                <Link to="/pages/UI/timeline">
                  <i className="fa fa-circle-o"/> Timeline</Link></li>
              <li>
                <Link to="/pages/UI/modals">
                  <i className="fa fa-circle-o"/> Modals</Link></li>
            </ul>
          </li>
          <li className="treeview">
            <Link to="#">
              <i className="fa fa-edit"/> <span>Forms</span>
              <span className="pull-right-container">
                  <i className="fa fa-angle-left pull-right"/>
                </span>
            </Link>
            <ul className="treeview-menu">
              <li>
                <Link to="/pages/forms/general">
                  <i className="fa fa-circle-o"/> General Elements</Link>
              </li>
              <li>
                <Link to="/pages/forms/advanced">
                  <i className="fa fa-circle-o"/> Advanced Elements</Link>
              </li>
              <li>
                <Link to="/pages/forms/editors">
                  <i className="fa fa-circle-o"/> Editors</Link>
              </li>
            </ul>
          </li>
          <li className="treeview">
            <Link to="#">
              <i className="fa fa-table"/> <span>Tables</span>
              <span className="pull-right-container">
                  <i className="fa fa-angle-left pull-right"/>
                </span>
            </Link>
            <ul className="treeview-menu">
              <li>
                <Link to="/pages/tables/simple">
                  <i className="fa fa-circle-o"/> Simple tables</Link>
              </li>
              <li>
                <Link to="/pages/tables/data">
                  <i className="fa fa-circle-o"/> Data tables</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/pages/calendar">
              <i className="fa fa-calendar"/> <span>Calendar</span>
              <span className="pull-right-container">
                  <small className="label pull-right bg-red">3</small>
                  <small className="label pull-right bg-blue">17</small>
                </span>
            </Link>
          </li>
          <li className="treeview">
            <Link to="/pages/mailbox">
              <i className="fa fa-envelope"/> <span>Mailbox</span>
              <span className="pull-right-container">
                  <i className="fa fa-angle-left pull-right"/>
                </span>
            </Link>
            <ul className="treeview-menu">
              <li className="active">
                <Link to="/pages/mailbox/inbox">Inbox
                  <span className="pull-right-container">
                      <span className="label label-primary pull-right">13</span>
                    </span>
                </Link>
              </li>
              <li><Link to="/pages/mailbox/compose">Compose</Link></li>
              <li><Link to="/pages/mailbox/read">Read</Link></li>
            </ul>
          </li>
          <li className="treeview">
            <Link to="#">
              <i className="fa fa-folder"/> <span>Examples</span>
              <span className="pull-right-container">
                  <i className="fa fa-angle-left pull-right"/>
                </span>
            </Link>
            <ul className="treeview-menu">
              <li>
                <Link to="/pages/examples/invoice">
                  <i className="fa fa-circle-o"/> Invoice</Link></li>
              <li>
                <Link to="/pages/examples/profile">
                  <i className="fa fa-circle-o"/> Profile</Link></li>
              <li>
                <Link to="/pages/examples/login">
                  <i className="fa fa-circle-o"/> Login</Link></li>
              <li>
                <Link to="/pages/examples/register">
                  <i className="fa fa-circle-o"/> Register</Link></li>
              <li>
                <Link to="/pages/examples/lockscreen">
                  <i className="fa fa-circle-o"/> Lockscreen</Link></li>
              <li>
                <Link to="/pages/examples/404">
                  <i className="fa fa-circle-o"/> 404 Error</Link></li>
              <li>
                <Link to="/pages/examples/500">
                  <i className="fa fa-circle-o"/> 500 Error</Link></li>
              <li>
                <Link to="/pages/examples/blank">
                  <i className="fa fa-circle-o"/> Blank Page</Link></li>
              <li>
                <Link to="/pages/examples/pace">
                  <i className="fa fa-circle-o"/> Pace Page</Link></li>
            </ul>
          </li>
          <li className="treeview">
            <Link to="#">
              <i className="fa fa-share"/> <span>Multilevel</span>
              <span className="pull-right-container">
                  <i className="fa fa-angle-left pull-right"/>
                </span>
            </Link>
            <ul className="treeview-menu">
              <li><Link to="#"><i className="fa fa-circle-o"/> Level One</Link></li>
              <li>
                <Link to="#"><i className="fa fa-circle-o"/> Level One
                  <span className="pull-right-container">
                      <i className="fa fa-angle-left pull-right"/>
                    </span>
                </Link>
                <ul className="treeview-menu">
                  <li><Link to="#"><i className="fa fa-circle-o"/> Level Two</Link></li>
                  <li>
                    <Link to="#"><i className="fa fa-circle-o"/> Level Two
                      <span className="pull-right-container">
                          <i className="fa fa-angle-left pull-right"/>
                        </span>
                    </Link>
                    <ul className="treeview-menu">
                      <li><Link to="#"><i className="fa fa-circle-o"/> Level Three</Link></li>
                      <li><Link to="#"><i className="fa fa-circle-o"/> Level Three</Link></li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li><Link to="#"><i className="fa fa-circle-o"/> Level One</Link></li>
            </ul>
          </li>
          <li>
            <a href="/AdminLTE/documentation/index.html">
              <i className="fa fa-book"/> <span>Documentation</span></a></li>
          <li className="header">LABELS</li>
          <li>
            <Link to="#">
              <i className="fa fa-circle-o text-red"/> <span>Important</span></Link></li>
          <li>
            <Link to="#">
              <i className="fa fa-circle-o text-yellow"/> <span>Warning</span></Link></li>
          <li>
            <Link to="#">
              <i className="fa fa-circle-o text-aqua"/> <span>Information</span></Link></li>
        </ul>
      </section>
      { /* /.sidebar */ }
    </aside>
  );
}

export default withStyles(s)(AsideLeft);
