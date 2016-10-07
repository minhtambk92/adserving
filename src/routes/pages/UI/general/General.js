import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Layout from '../../../../components/Layout';
import Link from '../../../../components/Link';
import s from './General.css';

const pageTitle = 'General UI';
const pageSubTitle = 'Preview of UI elements';

class General extends Component {

  render() {
    return (
      <Layout pageTitle={pageTitle} pageSubTitle={pageSubTitle}>
        <div>
          { /* COLOR PALETTE */ }
          <div className={'box box-default '.concat(s['color-palette-box'])}>
            <div className="box-header with-border">
              <h3 className="box-title">
                <i className="fa fa-tag"/>
                Color Palette
              </h3>
            </div>
            <div className="box-body">
              <div className="row">
                <div className="col-sm-4 col-md-2">
                  <h4 className="text-center">Primary</h4>
                  <div className={s['color-palette-set']}>
                    <div className={'bg-light-blue disabled '.concat(s['color-palette'])}>
                      <span>Disabled</span>
                    </div>
                    <div className={'bg-light-blue '.concat(s['color-palette'])}>
                      <span>#3c8dbc</span>
                    </div>
                    <div className={'bg-light-blue-active '.concat(s['color-palette'])}>
                      <span>Active</span>
                    </div>
                  </div>
                </div>
                { /* /.col */ }
                <div className="col-sm-4 col-md-2">
                  <h4 className="text-center">Info</h4>
                  <div className={s['color-palette-set']}>
                    <div className={'bg-aqua disabled '.concat(s['color-palette'])}>
                      <span>Disabled</span>
                    </div>
                    <div className={'bg-aqua '.concat(s['color-palette'])}>
                      <span>#00c0ef</span>
                    </div>
                    <div className={'bg-aqua-active '.concat(s['color-palette'])}>
                      <span>Active</span>
                    </div>
                  </div>
                </div>
                { /* /.col */ }
                <div className="col-sm-4 col-md-2">
                  <h4 className="text-center">Success</h4>
                  <div className={s['color-palette-set']}>
                    <div className={'bg-green disabled '.concat(s['color-palette'])}>
                      <span>Disabled</span>
                    </div>
                    <div className={'bg-green '.concat(s['color-palette'])}>
                      <span>#00a65a</span>
                    </div>
                    <div className={'bg-green-active '.concat(s['color-palette'])}>
                      <span>Active</span>
                    </div>
                  </div>
                </div>
                { /* /.col */ }
                <div className="col-sm-4 col-md-2">
                  <h4 className="text-center">Warning</h4>
                  <div className={s['color-palette-set']}>
                    <div className={'bg-yellow disabled '.concat(s['color-palette'])}>
                      <span>Disabled</span>
                    </div>
                    <div className={'bg-yellow '.concat(s['color-palette'])}>
                      <span>#f39c12</span>
                    </div>
                    <div className={'bg-yellow-active '.concat(s['color-palette'])}>
                      <span>Active</span>
                    </div>
                  </div>
                </div>
                { /* /.col */ }
                <div className="col-sm-4 col-md-2">
                  <h4 className="text-center">Danger</h4>
                  <div className={s['color-palette-set']}>
                    <div className={'bg-red disabled '.concat(s['color-palette'])}>
                      <span>Disabled</span>
                    </div>
                    <div className={'bg-red '.concat(s['color-palette'])}>
                      <span>#f56954</span>
                    </div>
                    <div className={'bg-red-active '.concat(s['color-palette'])}>
                      <span>Active</span>
                    </div>
                  </div>
                </div>
                { /* /.col */ }
                <div className="col-sm-4 col-md-2">
                  <h4 className="text-center">Gray</h4>
                  <div className={s['color-palette-set']}>
                    <div className={'bg-gray disabled '.concat(s['color-palette'])}>
                      <span>Disabled</span>
                    </div>
                    <div className={'bg-gray '.concat(s['color-palette'])}>
                      <span>#d2d6de</span>
                    </div>
                    <div className={'bg-gray-active '.concat(s['color-palette'])}>
                      <span>Active</span>
                    </div>
                  </div>
                </div>
                { /* /.col */ }
              </div>
              { /* /.row */ }
              <div className="row">
                <div className="col-sm-4 col-md-2">
                  <h4 className="text-center">Navy</h4>
                  <div className={s['color-palette-set']}>
                    <div className={'bg-navy disabled '.concat(s['color-palette'])}>
                      <span>Disabled</span>
                    </div>
                    <div className={'bg-navy '.concat(s['color-palette'])}>
                      <span>#001F3F</span>
                    </div>
                    <div className={'bg-navy-active '.concat(s['color-palette'])}>
                      <span>Active</span>
                    </div>
                  </div>
                </div>
                { /* /.col */ }
                <div className="col-sm-4 col-md-2">
                  <h4 className="text-center">Teal</h4>
                  <div className={s['color-palette-set']}>
                    <div className={'bg-teal disabled '.concat(s['color-palette'])}>
                      <span>Disabled</span>
                    </div>
                    <div className={'bg-teal '.concat(s['color-palette'])}>
                      <span>#39CCCC</span>
                    </div>
                    <div className={'bg-teal-active '.concat(s['color-palette'])}>
                      <span>Active</span>
                    </div>
                  </div>
                </div>
                { /* /.col */ }
                <div className="col-sm-4 col-md-2">
                  <h4 className="text-center">Purple</h4>
                  <div className={s['color-palette-set']}>
                    <div className={'bg-purple disabled '.concat(s['color-palette'])}>
                      <span>Disabled</span>
                    </div>
                    <div className={'bg-purple '.concat(s['color-palette'])}>
                      <span>#605ca8</span>
                    </div>
                    <div className={'bg-purple-active '.concat(s['color-palette'])}>
                      <span>Active</span>
                    </div>
                  </div>
                </div>
                { /* /.col */ }
                <div className="col-sm-4 col-md-2">
                  <h4 className="text-center">Orange</h4>
                  <div className={s['color-palette-set']}>
                    <div className={'bg-orange disabled '.concat(s['color-palette'])}>
                      <span>Disabled</span>
                    </div>
                    <div className={'bg-orange '.concat(s['color-palette'])}>
                      <span>#ff851b</span>
                    </div>
                    <div className={'bg-orange-active '.concat(s['color-palette'])}>
                      <span>Active</span>
                    </div>
                  </div>
                </div>
                { /* /.col */ }
                <div className="col-sm-4 col-md-2">
                  <h4 className="text-center">Maroon</h4>
                  <div className={s['color-palette-set']}>
                    <div className={'bg-maroon disabled '.concat(s['color-palette'])}>
                      <span>Disabled</span>
                    </div>
                    <div className={'bg-maroon '.concat(s['color-palette'])}>
                      <span>#D81B60</span>
                    </div>
                    <div className={'bg-maroon-active '.concat(s['color-palette'])}>
                      <span>Active</span>
                    </div>
                  </div>
                </div>
                { /* /.col */ }
                <div className="col-sm-4 col-md-2">
                  <h4 className="text-center">Black</h4>
                  <div className={s['color-palette-set']}>
                    <div className={'bg-black disabled '.concat(s['color-palette'])}>
                      <span>Disabled</span>
                    </div>
                    <div className={'bg-black '.concat(s['color-palette'])}>
                      <span>#111111</span>
                    </div>
                    <div className={'bg-black-active '.concat(s['color-palette'])}>
                      <span>Active</span>
                    </div>
                  </div>
                </div>
                { /* /.col */ }
              </div>
              { /* /.row */ }
            </div>
            { /* /.box-body */ }
          </div>
          { /* /.box */ }
          { /* START ALERTS AND CALLOUTS */ }
          <h2 className="page-header">
            Alerts and Callouts
          </h2>
          <div className="row">
            <div className="col-md-6">
              <div className="box box-default">
                <div className="box-header with-border">
                  <i className="fa fa-warning"/>
                  <h3 className="box-title">Alerts</h3>
                </div>
                { /* /.box-header */ }
                <div className="box-body">
                  <div className="alert alert-danger alert-dismissible">
                    <button type="button" className="close" data-dismiss="alert" aria-hidden="true">
                      ×
                    </button>
                    <h4>
                      <i className="icon fa fa-ban"/>
                      Alert!
                    </h4>
                    Danger alert preview. This alert is dismissable. A wonderful serenity has taken
                    possession of my entire soul, like these sweet mornings of spring which I enjoy
                    with my whole heart.
                  </div>
                  <div className="alert alert-info alert-dismissible">
                    <button type="button" className="close" data-dismiss="alert" aria-hidden="true">
                      ×
                    </button>
                    <h4>
                      <i className="icon fa fa-info"/>
                      Alert!
                    </h4>
                    Info alert preview. This alert is dismissable.
                  </div>
                  <div className="alert alert-warning alert-dismissible">
                    <button type="button" className="close" data-dismiss="alert" aria-hidden="true">
                      ×
                    </button>
                    <h4>
                      <i className="icon fa fa-warning"/>
                      Alert!
                    </h4>
                    Warning alert preview. This alert is dismissable.
                  </div>
                  <div className="alert alert-success alert-dismissible">
                    <button type="button" className="close" data-dismiss="alert" aria-hidden="true">
                      ×
                    </button>
                    <h4>
                      <i className="icon fa fa-check"/>
                      Alert!
                    </h4>
                    Success alert preview. This alert is dismissable.
                  </div>
                </div>
                { /* /.box-body */ }
              </div>
              { /* /.box */ }
            </div>
            { /* /.col */ }
            <div className="col-md-6">
              <div className="box box-default">
                <div className="box-header with-border">
                  <i className="fa fa-bullhorn"/>
                  <h3 className="box-title">Callouts</h3>
                </div>
                { /* /.box-header */ }
                <div className="box-body">
                  <div className="callout callout-danger">
                    <h4>
                      I am a danger callout!
                    </h4>
                    <p>
                      There is a problem that we need to fix. A wonderful serenity has taken
                      possession of my entire soul, like these sweet mornings of spring which I
                      enjoy with my whole heart.
                    </p>
                  </div>
                  <div className="callout callout-info">
                    <h4>
                      I am an info callout!
                    </h4>
                    <p>
                      Follow the steps to continue to payment.
                    </p>
                  </div>
                  <div className="callout callout-warning">
                    <h4>
                      I am a warning callout!
                    </h4>
                    <p>
                      This is a yellow callout.
                    </p>
                  </div>
                  <div className="callout callout-success">
                    <h4>
                      I am a success callout!
                    </h4>
                    <p>
                      This is a green callout.
                    </p>
                  </div>
                </div>
                { /* /.box-body */ }
              </div>
              { /* /.box */ }
            </div>
            { /* /.col */ }
          </div>
          { /* /.row */ }
          { /* END ALERTS AND CALLOUTS */ }
          { /* START CUSTOM TABS */ }
          <h2 className="page-header">
            AdminLTE Custom Tabs
          </h2>
          <div className="row">
            <div className="col-md-6">
              { /* Custom Tabs */ }
              <div className="nav-tabs-custom">
                <ul className="nav nav-tabs">
                  <li className="active">
                    <Link to="#tab_1" data-toggle="tab">
                      Tab 1
                    </Link>
                  </li>
                  <li>
                    <Link to="#tab_2" data-toggle="tab">
                      Tab 2
                    </Link>
                  </li>
                  <li>
                    <Link to="#tab_3" data-toggle="tab">
                      Tab 3
                    </Link>
                  </li>
                  <li className="dropdown">
                    <Link className="dropdown-toggle" data-toggle="dropdown" to="#">
                      Dropdown
                      <span className="caret"/>
                    </Link>
                    <ul className="dropdown-menu">
                      <li role="presentation">
                        <Link role="menuitem" tabIndex={-1} to="#">Action</Link>
                      </li>
                      <li role="presentation">
                        <Link role="menuitem" tabIndex={-1} to="#">
                          Another action
                        </Link>
                      </li>
                      <li role="presentation">
                        <Link role="menuitem" tabIndex={-1} to="#">
                          Something else here
                        </Link>
                      </li>
                      <li role="presentation" className="divider"/>
                      <li role="presentation">
                        <Link role="menuitem" tabIndex={-1} to="#">
                          Separated link
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="pull-right">
                    <Link to="#" className="text-muted">
                      <i className="fa fa-gear"/>
                    </Link>
                  </li>
                </ul>
                <div className="tab-content">
                  <div className="tab-pane active" id="tab_1">
                    <b>
                      How to use:
                    </b>
                    <p>
                      Exactly like the original bootstrap tabs except you should use the custom
                      wrapper
                      <code>.nav-tabs-custom</code>
                      to achieve this style.
                    </p>
                    A wonderful serenity has taken possession of my entire soul, like these sweet
                    mornings of spring which I enjoy with my whole heart. I am alone, and feel the
                    charm of existence in this spot, which was created for the bliss of souls like
                    mine. I am so happy, my dear friend, so absorbed in the exquisite sense of mere
                    tranquil existence, that I neglect my talents. I should be incapable of drawing
                    a single stroke at the present moment; and yet I feel that I never was a greater
                    artist than now.
                  </div>
                  { /* /.tab-pane */ }
                  <div className="tab-pane" id="tab_2">
                    The European languages are members of the same family. Their separate existence
                    is a myth. For science, music, sport, etc, Europe uses the same vocabulary. The
                    languages only differ in their grammar, their pronunciation and their most
                    common words. Everyone realizes why a new common language would be desirable:
                    one could refuse to pay expensive translators. To achieve this, it would be
                    necessary to have uniform grammar, pronunciation and more common words. If
                    several languages coalesce, the grammar of the resulting language is more simple
                    and regular than that of the individual languages.
                  </div>
                  { /* /.tab-pane */ }
                  <div className="tab-pane" id="tab_3">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                    Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                    unknown printer took a galley of type and scrambled it to make a type specimen
                    book. It has survived not only five centuries, but also the leap into electronic
                    typesetting, remaining essentially unchanged. It was popularised in the 1960s
                    with the release of Letraset sheets containing Lorem Ipsum passages, and more
                    recently with desktop publishing software like Aldus PageMaker including
                    versions of Lorem Ipsum.
                  </div>
                  { /* /.tab-pane */ }
                </div>
                { /* /.tab-content */ }
              </div>
              { /* nav-tabs-custom */ }
            </div>
            { /* /.col */ }
            <div className="col-md-6">
              { /* Custom Tabs (Pulled to the right) */ }
              <div className="nav-tabs-custom">
                <ul className="nav nav-tabs pull-right">
                  <li className="active">
                    <Link to="#tab_1-1" data-toggle="tab">
                      Tab 1
                    </Link>
                  </li>
                  <li>
                    <Link to="#tab_2-2" data-toggle="tab">
                      Tab 2
                    </Link>
                  </li>
                  <li>
                    <Link to="#tab_3-2" data-toggle="tab">
                      Tab 3
                    </Link>
                  </li>
                  <li className="dropdown">
                    <Link className="dropdown-toggle" data-toggle="dropdown" to="#">
                      Dropdown
                      <span className="caret"/>
                    </Link>
                    <ul className="dropdown-menu">
                      <li role="presentation">
                        <Link role="menuitem" tabIndex={-1} to="#">Action</Link>
                      </li>
                      <li role="presentation">
                        <Link role="menuitem" tabIndex={-1} to="#">
                          Another action
                        </Link>
                      </li>
                      <li role="presentation">
                        <Link role="menuitem" tabIndex={-1} to="#">
                          Something else here
                        </Link>
                      </li>
                      <li role="presentation" className="divider"/>
                      <li role="presentation">
                        <Link role="menuitem" tabIndex={-1} to="#">
                          Separated link
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="pull-left header">
                    <i className="fa fa-th"/>
                    Custom Tabs
                  </li>
                </ul>
                <div className="tab-content">
                  <div className="tab-pane active" id="tab_1-1">
                    <b>
                      How to use:
                    </b>
                    <p>
                      Exactly like the original bootstrap tabs except you should use the custom
                      wrapper
                      <code>.nav-tabs-custom</code>
                      to achieve this style.
                    </p>
                    A wonderful serenity has taken possession of my entire soul, like these sweet
                    mornings of spring which I enjoy with my whole heart. I am alone, and feel the
                    charm of existence in this spot, which was created for the bliss of souls like
                    mine. I am so happy, my dear friend, so absorbed in the exquisite sense of mere
                    tranquil existence, that I neglect my talents. I should be incapable of drawing
                    a single stroke at the present moment; and yet I feel that I never was a greater
                    artist than now.
                  </div>
                  { /* /.tab-pane */ }
                  <div className="tab-pane" id="tab_2-2">
                    The European languages are members of the same family. Their separate existence
                    is a myth. For science, music, sport, etc, Europe uses the same vocabulary. The
                    languages only differ in their grammar, their pronunciation and their most
                    common words. Everyone realizes why a new common language would be desirable:
                    one could refuse to pay expensive translators. To achieve this, it would be
                    necessary to have uniform grammar, pronunciation and more common words. If
                    several languages coalesce, the grammar of the resulting language is more simple
                    and regular than that of the individual languages.
                  </div>
                  { /* /.tab-pane */ }
                  <div className="tab-pane" id="tab_3-2">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                    Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                    unknown printer took a galley of type and scrambled it to make a type specimen
                    book. It has survived not only five centuries, but also the leap into electronic
                    typesetting, remaining essentially unchanged. It was popularised in the 1960s
                    with the release of Letraset sheets containing Lorem Ipsum passages, and more
                    recently with desktop publishing software like Aldus PageMaker including
                    versions of Lorem Ipsum.
                  </div>
                  { /* /.tab-pane */ }
                </div>
                { /* /.tab-content */ }
              </div>
              { /* nav-tabs-custom */ }
            </div>
            { /* /.col */ }
          </div>
          { /* /.row */ }
          { /* END CUSTOM TABS */ }
          { /* START PROGRESS BARS */ }
          <h2 className="page-header">
            Progress Bars
          </h2>
          <div className="row">
            <div className="col-md-6">
              <div className="box box-solid">
                <div className="box-header with-border">
                  <h3 className="box-title">
                    Progress Bars Different Sizes
                  </h3>
                </div>
                { /* /.box-header */ }
                <div className="box-body">
                  <p>
                    <code>.progress</code>
                  </p>
                  <div className="progress">
                    <div className="progress-bar progress-bar-primary progress-bar-striped"
                         role="progressbar" aria-valuenow={40} aria-valuemin={0} aria-valuemax={100}
                         style={{
                           width: '40%'
                         }}>
                    <span className="sr-only">
                      40% Complete (success)
                    </span>
                    </div>
                  </div>
                  <p>
                    Class:
                    <code>.sm</code>
                  </p>
                  <div className="progress progress-sm active">
                    <div className="progress-bar progress-bar-success progress-bar-striped"
                         role="progressbar" aria-valuenow={20} aria-valuemin={0} aria-valuemax={100}
                         style={{
                           width: '20%'
                         }}>
                    <span className="sr-only">
                      20% Complete
                    </span>
                    </div>
                  </div>
                  <p>
                    Class:
                    <code>.xs</code>
                  </p>
                  <div className="progress progress-xs">
                    <div className="progress-bar progress-bar-warning progress-bar-striped"
                         role="progressbar" aria-valuenow={60} aria-valuemin={0} aria-valuemax={100}
                         style={{
                           width: '60%'
                         }}>
                    <span className="sr-only">
                      60% Complete (warning)
                    </span>
                    </div>
                  </div>
                  <p>
                    Class:
                    <code>.xxs</code>
                  </p>
                  <div className="progress progress-xxs">
                    <div className="progress-bar progress-bar-danger progress-bar-striped"
                         role="progressbar" aria-valuenow={60} aria-valuemin={0} aria-valuemax={100}
                         style={{
                           width: '60%'
                         }}>
                    <span className="sr-only">
                      60% Complete (warning)
                    </span>
                    </div>
                  </div>
                </div>
                { /* /.box-body */ }
              </div>
              { /* /.box */ }
            </div>
            { /* /.col (left) */ }
            <div className="col-md-6">
              <div className="box box-solid">
                <div className="box-header with-border">
                  <h3 className="box-title">
                    Progress bars
                  </h3>
                </div>
                { /* /.box-header */ }
                <div className="box-body">
                  <div className="progress">
                    <div className="progress-bar progress-bar-green" role="progressbar"
                         aria-valuenow={40} aria-valuemin={0} aria-valuemax={100} style={{
                      width: '40%'
                    }}>
                    <span className="sr-only">
                      40% Complete (success)
                    </span>
                    </div>
                  </div>
                  <div className="progress">
                    <div className="progress-bar progress-bar-aqua" role="progressbar"
                         aria-valuenow={20} aria-valuemin={0} aria-valuemax={100} style={{
                      width: '20%'
                    }}>
                    <span className="sr-only">
                      20% Complete
                    </span>
                    </div>
                  </div>
                  <div className="progress">
                    <div className="progress-bar progress-bar-yellow" role="progressbar"
                         aria-valuenow={60} aria-valuemin={0} aria-valuemax={100} style={{
                      width: '60%'
                    }}>
                    <span className="sr-only">
                      60% Complete (warning)
                    </span>
                    </div>
                  </div>
                  <div className="progress">
                    <div className="progress-bar progress-bar-red" role="progressbar"
                         aria-valuenow={80} aria-valuemin={0} aria-valuemax={100} style={{
                      width: '80%'
                    }}>
                    <span className="sr-only">
                      80% Complete
                    </span>
                    </div>
                  </div>
                </div>
                { /* /.box-body */ }
              </div>
              { /* /.box */ }
            </div>
            { /* /.col (right) */ }
          </div>
          { /* /.row */ }
          <div className="row">
            <div className="col-md-6">
              <div className="box box-solid">
                <div className="box-header with-border">
                  <h3 className="box-title">
                    Vertical Progress Bars Different Sizes
                  </h3>
                </div>
                { /* /.box-header */ }
                <div className="box-body text-center">
                  <p>
                    By adding the class
                    <code>.vertical</code>
                    and
                    <code>.progress-sm</code>,
                    <code>.progress-xs</code>
                    or
                    <code>.progress-xxs</code>
                    we achieve:
                  </p>
                  <div className="progress vertical active">
                    <div className="progress-bar progress-bar-primary progress-bar-striped"
                         role="progressbar" aria-valuenow={40} aria-valuemin={0} aria-valuemax={100}
                         style={{
                           height: '40%'
                         }}>
                      <span className="sr-only">40%</span>
                    </div>
                  </div>
                  <div className="progress vertical progress-sm">
                    <div className="progress-bar progress-bar-success" role="progressbar"
                         aria-valuenow={20} aria-valuemin={0} aria-valuemax={100} style={{
                      height: '100%'
                    }}>
                      <span className="sr-only">100%</span>
                    </div>
                  </div>
                  <div className="progress vertical progress-xs">
                    <div className="progress-bar progress-bar-warning progress-bar-striped"
                         role="progressbar" aria-valuenow={60} aria-valuemin={0} aria-valuemax={100}
                         style={{
                           height: '60%'
                         }}>
                      <span className="sr-only">60%</span>
                    </div>
                  </div>
                  <div className="progress vertical progress-xxs">
                    <div className="progress-bar progress-bar-info progress-bar-striped"
                         role="progressbar" aria-valuenow={60} aria-valuemin={0} aria-valuemax={100}
                         style={{
                           height: '60%'
                         }}>
                      <span className="sr-only">60%</span>
                    </div>
                  </div>
                </div>
                { /* /.box-body */ }
              </div>
              { /* /.box */ }
            </div>
            { /* /.col (left) */ }
            <div className="col-md-6">
              <div className="box box-solid">
                <div className="box-header with-border">
                  <h3 className="box-title">
                    Vertical Progress bars
                  </h3>
                </div>
                { /* /.box-header */ }
                <div className="box-body text-center">
                  <p>
                    By adding the class
                    <code>.vertical</code>
                    we achieve:
                  </p>
                  <div className="progress vertical">
                    <div className="progress-bar progress-bar-green" role="progressbar"
                         aria-valuenow={40} aria-valuemin={0} aria-valuemax={100} style={{
                      height: '40%'
                    }}>
                      <span className="sr-only">40%</span>
                    </div>
                  </div>
                  <div className="progress vertical">
                    <div className="progress-bar progress-bar-aqua" role="progressbar"
                         aria-valuenow={20} aria-valuemin={0} aria-valuemax={100} style={{
                      height: '20%'
                    }}>
                      <span className="sr-only">20%</span>
                    </div>
                  </div>
                  <div className="progress vertical">
                    <div className="progress-bar progress-bar-yellow" role="progressbar"
                         aria-valuenow={60} aria-valuemin={0} aria-valuemax={100} style={{
                      height: '60%'
                    }}>
                      <span className="sr-only">60%</span>
                    </div>
                  </div>
                  <div className="progress vertical">
                    <div className="progress-bar progress-bar-red" role="progressbar"
                         aria-valuenow={80} aria-valuemin={0} aria-valuemax={100} style={{
                      height: '80%'
                    }}>
                      <span className="sr-only">80%</span>
                    </div>
                  </div>
                </div>
                { /* /.box-body */ }
              </div>
              { /* /.box */ }
            </div>
            { /* /.col (right) */ }
          </div>
          { /* /.row */ }
          { /* END PROGRESS BARS */ }
          { /* START ACCORDION & CAROUSEL*/ }
          <h2 className="page-header">
            Bootstrap Accordion & Carousel
          </h2>
          <div className="row">
            <div className="col-md-6">
              <div className="box box-solid">
                <div className="box-header with-border">
                  <h3 className="box-title">
                    Collapsible Accordion
                  </h3>
                </div>
                { /* /.box-header */ }
                <div className="box-body">
                  <div className="box-group" id="accordion">
                    { /* we are adding the .panel class so bootstrap.js collapse plugin detects it */ }
                    <div className="panel box box-primary">
                      <div className="box-header with-border">
                        <h4 className="box-title">
                          <Link data-toggle="collapse" data-parent="#accordion" to="#collapseOne">
                            Collapsible Group Item #1
                          </Link>
                        </h4>
                      </div>
                      <div id="collapseOne" className="panel-collapse collapse in">
                        <div className="box-body">
                          Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry
                          richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard
                          dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf
                          moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla
                          assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore
                          wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur
                          butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim
                          aesthetic synth nesciunt you probably haven't heard of them accusamus
                          labore sustainable VHS.
                        </div>
                      </div>
                    </div>
                    <div className="panel box box-danger">
                      <div className="box-header with-border">
                        <h4 className="box-title">
                          <Link data-toggle="collapse" data-parent="#accordion" to="#collapseTwo">
                            Collapsible Group Danger
                          </Link>
                        </h4>
                      </div>
                      <div id="collapseTwo" className="panel-collapse collapse">
                        <div className="box-body">
                          Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry
                          richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard
                          dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf
                          moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla
                          assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore
                          wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur
                          butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim
                          aesthetic synth nesciunt you probably haven't heard of them accusamus
                          labore sustainable VHS.
                        </div>
                      </div>
                    </div>
                    <div className="panel box box-success">
                      <div className="box-header with-border">
                        <h4 className="box-title">
                          <Link data-toggle="collapse" data-parent="#accordion" to="#collapseThree">
                            Collapsible Group Success
                          </Link>
                        </h4>
                      </div>
                      <div id="collapseThree" className="panel-collapse collapse">
                        <div className="box-body">
                          Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry
                          richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard
                          dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf
                          moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla
                          assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore
                          wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur
                          butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim
                          aesthetic synth nesciunt you probably haven't heard of them accusamus
                          labore sustainable VHS.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                { /* /.box-body */ }
              </div>
              { /* /.box */ }
            </div>
            { /* /.col */ }
            <div className="col-md-6">
              <div className="box box-solid">
                <div className="box-header with-border">
                  <h3 className="box-title">Carousel</h3>
                </div>
                { /* /.box-header */ }
                <div className="box-body">
                  <div id="carousel-example-generic" className="carousel slide"
                       data-ride="carousel">
                    <ol className="carousel-indicators">
                      <li data-target="#carousel-example-generic" data-slide-to={0}
                          className="active"/>
                      <li data-target="#carousel-example-generic" data-slide-to={1} className/>
                      <li data-target="#carousel-example-generic" data-slide-to={2} className/>
                    </ol>
                    <div className="carousel-inner">
                      <div className="item active">
                        <img src="http://placehold.it/900x500/39CCCC/ffffff&text=I+Love+Bootstrap"
                             alt="First slide"/>
                        <div className="carousel-caption">
                          First Slide
                        </div>
                      </div>
                      <div className="item">
                        <img src="http://placehold.it/900x500/3c8dbc/ffffff&text=I+Love+Bootstrap"
                             alt="Second slide"/>
                        <div className="carousel-caption">
                          Second Slide
                        </div>
                      </div>
                      <div className="item">
                        <img src="http://placehold.it/900x500/f39c12/ffffff&text=I+Love+Bootstrap"
                             alt="Third slide"/>
                        <div className="carousel-caption">
                          Third Slide
                        </div>
                      </div>
                    </div>
                    <Link className="left carousel-control" to="#carousel-example-generic"
                          data-slide="prev">
                      <span className="fa fa-angle-left"/>
                    </Link>
                    <Link className="right carousel-control" to="#carousel-example-generic"
                          data-slide="next">
                      <span className="fa fa-angle-right"/>
                    </Link>
                  </div>
                </div>
                { /* /.box-body */ }
              </div>
              { /* /.box */ }
            </div>
            { /* /.col */ }
          </div>
          { /* /.row */ }
          { /* END ACCORDION & CAROUSEL*/ }
          { /* START TYPOGRAPHY */ }
          <h2 className="page-header">Typography</h2>
          <div className="row">
            <div className="col-md-6">
              <div className="box box-solid">
                <div className="box-header with-border">
                  <i className="fa fa-text-width"/>
                  <h3 className="box-title">Headlines</h3>
                </div>
                { /* /.box-header */ }
                <div className="box-body">
                  <h1>
                    h1. Bootstrap heading
                  </h1>
                  <h2>
                    h2. Bootstrap heading
                  </h2>
                  <h3>
                    h3. Bootstrap heading
                  </h3>
                  <h4>
                    h4. Bootstrap heading
                  </h4>
                  <h5>
                    h5. Bootstrap heading
                  </h5>
                  <h6>
                    h6. Bootstrap heading
                  </h6>
                </div>
                { /* /.box-body */ }
              </div>
              { /* /.box */ }
            </div>
            { /* ./col */ }
            <div className="col-md-6">
              <div className="box box-solid">
                <div className="box-header with-border">
                  <i className="fa fa-text-width"/>
                  <h3 className="box-title">
                    Text Emphasis
                  </h3>
                </div>
                { /* /.box-header */ }
                <div className="box-body">
                  <p className="lead">
                    Lead to emphasize importance
                  </p>
                  <p className="text-green">
                    Text green to emphasize success
                  </p>
                  <p className="text-aqua">
                    Text aqua to emphasize info
                  </p>
                  <p className="text-light-blue">
                    Text light blue to emphasize info (2)
                  </p>
                  <p className="text-red">
                    Text red to emphasize danger
                  </p>
                  <p className="text-yellow">
                    Text yellow to emphasize warning
                  </p>
                  <p className="text-muted">
                    Text muted to emphasize general
                  </p>
                </div>
                { /* /.box-body */ }
              </div>
              { /* /.box */ }
            </div>
            { /* ./col */ }
          </div>
          { /* /.row */ }
          <div className="row">
            <div className="col-md-6">
              <div className="box box-solid">
                <div className="box-header with-border">
                  <i className="fa fa-text-width"/>
                  <h3 className="box-title">
                    Block Quotes
                  </h3>
                </div>
                { /* /.box-header */ }
                <div className="box-body">
                  <blockquote>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat
                      a ante.
                    </p>
                    <small>
                      Someone famous in
                      <cite title="Source Title">
                        Source Title
                      </cite>
                    </small>
                  </blockquote>
                </div>
                { /* /.box-body */ }
              </div>
              { /* /.box */ }
            </div>
            { /* ./col */ }
            <div className="col-md-6">
              <div className="box box-solid">
                <div className="box-header with-border">
                  <i className="fa fa-text-width"/>
                  <h3 className="box-title">
                    Block Quotes Pulled Right
                  </h3>
                </div>
                { /* /.box-header */ }
                <div className="box-body clearfix">
                  <blockquote className="pull-right">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat
                      a ante.
                    </p>
                    <small>
                      Someone famous in
                      <cite title="Source Title">
                        Source Title
                      </cite>
                    </small>
                  </blockquote>
                </div>
                { /* /.box-body */ }
              </div>
              { /* /.box */ }
            </div>
            { /* ./col */ }
          </div>
          { /* /.row */ }
          <div className="row">
            <div className="col-md-4">
              <div className="box box-solid">
                <div className="box-header with-border">
                  <i className="fa fa-text-width"/>
                  <h3 className="box-title">
                    Unordered List
                  </h3>
                </div>
                { /* /.box-header */ }
                <div className="box-body">
                  <ul>
                    <li>
                      Lorem ipsum dolor sit amet
                    </li>
                    <li>
                      Consectetur adipiscing elit
                    </li>
                    <li>
                      Integer molestie lorem at massa
                    </li>
                    <li>
                      Facilisis in pretium nisl aliquet
                    </li>
                    <li>
                      Nulla volutpat aliquam velit
                      <ul>
                        <li>
                          Phasellus iaculis neque
                        </li>
                        <li>
                          Purus sodales ultricies
                        </li>
                        <li>
                          Vestibulum laoreet porttitor sem
                        </li>
                        <li>
                          Ac tristique libero volutpat at
                        </li>
                      </ul>
                    </li>
                    <li>
                      Faucibus porta lacus fringilla vel
                    </li>
                    <li>
                      Aenean sit amet erat nunc
                    </li>
                    <li>
                      Eget porttitor lorem
                    </li>
                  </ul>
                </div>
                { /* /.box-body */ }
              </div>
              { /* /.box */ }
            </div>
            { /* ./col */ }
            <div className="col-md-4">
              <div className="box box-solid">
                <div className="box-header with-border">
                  <i className="fa fa-text-width"/>
                  <h3 className="box-title">
                    Ordered Lists
                  </h3>
                </div>
                { /* /.box-header */ }
                <div className="box-body">
                  <ol>
                    <li>
                      Lorem ipsum dolor sit amet
                    </li>
                    <li>
                      Consectetur adipiscing elit
                    </li>
                    <li>
                      Integer molestie lorem at massa
                    </li>
                    <li>
                      Facilisis in pretium nisl aliquet
                    </li>
                    <li>
                      Nulla volutpat aliquam velit
                      <ol>
                        <li>
                          Phasellus iaculis neque
                        </li>
                        <li>
                          Purus sodales ultricies
                        </li>
                        <li>
                          Vestibulum laoreet porttitor sem
                        </li>
                        <li>
                          Ac tristique libero volutpat at
                        </li>
                      </ol>
                    </li>
                    <li>
                      Faucibus porta lacus fringilla vel
                    </li>
                    <li>
                      Aenean sit amet erat nunc
                    </li>
                    <li>
                      Eget porttitor lorem
                    </li>
                  </ol>
                </div>
                { /* /.box-body */ }
              </div>
              { /* /.box */ }
            </div>
            { /* ./col */ }
            <div className="col-md-4">
              <div className="box box-solid">
                <div className="box-header with-border">
                  <i className="fa fa-text-width"/>
                  <h3 className="box-title">
                    Unstyled List
                  </h3>
                </div>
                { /* /.box-header */ }
                <div className="box-body">
                  <ul className="list-unstyled">
                    <li>
                      Lorem ipsum dolor sit amet
                    </li>
                    <li>
                      Consectetur adipiscing elit
                    </li>
                    <li>
                      Integer molestie lorem at massa
                    </li>
                    <li>
                      Facilisis in pretium nisl aliquet
                    </li>
                    <li>
                      Nulla volutpat aliquam velit
                      <ul>
                        <li>
                          Phasellus iaculis neque
                        </li>
                        <li>
                          Purus sodales ultricies
                        </li>
                        <li>
                          Vestibulum laoreet porttitor sem
                        </li>
                        <li>
                          Ac tristique libero volutpat at
                        </li>
                      </ul>
                    </li>
                    <li>
                      Faucibus porta lacus fringilla vel
                    </li>
                    <li>
                      Aenean sit amet erat nunc
                    </li>
                    <li>
                      Eget porttitor lorem
                    </li>
                  </ul>
                </div>
                { /* /.box-body */ }
              </div>
              { /* /.box */ }
            </div>
            { /* ./col */ }
          </div>
          { /* /.row */ }
          <div className="row">
            <div className="col-md-6">
              <div className="box box-solid">
                <div className="box-header with-border">
                  <i className="fa fa-text-width"/>
                  <h3 className="box-title">Description</h3>
                </div>
                { /* /.box-header */ }
                <div className="box-body">
                  <dl>
                    <dt>
                      Description lists
                    </dt>
                    <dd>
                      A description list is perfect for defining terms.
                    </dd>
                    <dt>Euismod</dt>
                    <dd>
                      Vestibulum id ligula porta felis euismod semper eget lacinia odio sem nec
                      elit.
                    </dd>
                    <dd>
                      Donec id elit non mi porta gravida at eget metus.
                    </dd>
                    <dt>
                      Malesuada porta
                    </dt>
                    <dd>
                      Etiam porta sem malesuada magna mollis euismod.
                    </dd>
                  </dl>
                </div>
                { /* /.box-body */ }
              </div>
              { /* /.box */ }
            </div>
            { /* ./col */ }
            <div className="col-md-6">
              <div className="box box-solid">
                <div className="box-header with-border">
                  <i className="fa fa-text-width"/>
                  <h3 className="box-title">
                    Description Horizontal
                  </h3>
                </div>
                { /* /.box-header */ }
                <div className="box-body">
                  <dl className="dl-horizontal">
                    <dt>
                      Description lists
                    </dt>
                    <dd>
                      A description list is perfect for defining terms.
                    </dd>
                    <dt>Euismod</dt>
                    <dd>
                      Vestibulum id ligula porta felis euismod semper eget lacinia odio sem nec
                      elit.
                    </dd>
                    <dd>
                      Donec id elit non mi porta gravida at eget metus.
                    </dd>
                    <dt>
                      Malesuada porta
                    </dt>
                    <dd>
                      Etiam porta sem malesuada magna mollis euismod.
                    </dd>
                    <dt>
                      Felis euismod semper eget lacinia
                    </dt>
                    <dd>Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut
                      fermentum massa justo sit amet risus.
                    </dd>
                  </dl>
                </div>
                { /* /.box-body */ }
              </div>
              { /* /.box */ }
            </div>
            { /* ./col */ }
          </div>
          { /* /.row */ }
          { /* END TYPOGRAPHY */ }
        </div>
      </Layout>
    );
  }

}

export default withStyles(s)(General);
