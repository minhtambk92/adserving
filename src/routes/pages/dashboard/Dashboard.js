/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Layout from '../../../components/Layout';
import Link from '../../../components/Link';
import s from './Dashboard.css';

const pageTitle = 'Home';
const pageSubTitle = 'Control panel';

class Dashboard extends Component {

  static propTypes = {
    news: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      contentSnippet: PropTypes.string,
    })).isRequired,
  };

  componentDidMount() {
    $(() => {
      'use strict';

      // Make the dashboard widgets sortable Using jquery UI
      $('.connectedSortable').sortable({
        placeholder: 'sort-highlight',
        connectWith: '.connectedSortable',
        handle: '.box-header, .nav-tabs',
        forcePlaceholderSize: true,
        zIndex: 999999,
      });
      $('.connectedSortable .box-header, .connectedSortable .nav-tabs-custom')
        .css('cursor', 'move');

      // jQuery UI sortable for the todo list
      $('.todo-list').sortable({
        placeholder: 'sort-highlight',
        handle: '.handle',
        forcePlaceholderSize: true,
        zIndex: 999999,
      });

      // bootstrap WYSIHTML5 - text editor
      $('.textarea').wysihtml5();

      $('.daterange').daterangepicker({
        ranges: {
          Today: [moment(), moment()],
          Yesterday: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
          'Last 7 Days': [moment().subtract(6, 'days'), moment()],
          'Last 30 Days': [moment().subtract(29, 'days'), moment()],
          'This Month': [moment().startOf('month'), moment().endOf('month')],
          'Last Month': [moment().subtract(1, 'month').startOf('month'), moment()
            .subtract(1, 'month').endOf('month')],
        },
        startDate: moment().subtract(29, 'days'),
        endDate: moment(),
      }, (start, end) => {
        window.alert( // eslint-disable-line no-alert
          'You chose: '
            .concat(start.format('MMMM D, YYYY'))
            .concat(' - ')
            .concat(end.format('MMMM D, YYYY'))
        );
      });

      // jQueryKnob
      $('.knob').knob();

      // jvectormap data
      let visitorsData = { // eslint-disable-line prefer-const
        US: 398, // USA
        SA: 400, // Saudi Arabia
        CA: 1000, // Canada
        DE: 500, // Germany
        FR: 760, // France
        CN: 300, // China
        AU: 700, // Australia
        BR: 600, // Brazil
        IN: 800, // India
        GB: 320, // Great Britain
        RU: 3000, // Russia
      };

      // World map by jvectormap
      $('#world-map').vectorMap({
        map: 'world_mill_en',
        backgroundColor: 'transparent',
        regionStyle: {
          initial: {
            fill: '#e4e4e4',
            'fill-opacity': 1,
            stroke: 'none',
            'stroke-width': 0,
            'stroke-opacity': 1,
          },
        },
        series: {
          regions: [{
            values: visitorsData,
            scale: ['#92c1dc', '#ebf4f9'],
            normalizeFunction: 'polynomial',
          }],
        },
        onRegionLabelShow(e, el, code) {
          if (typeof visitorsData[code] !== 'undefined') {
            el.html(
              el.html()
                .concat(': ')
                .concat(visitorsData[code])
                .concat(' new visitors')
            );
          }
        },
      });

      // Sparkline charts
      let myvalues = [1000, 1200, 920, 927, 931, 1027, 819, 930, 1021];
      $('#sparkline-1').sparkline(myvalues, {
        type: 'line',
        lineColor: '#92c1dc',
        fillColor: '#ebf4f9',
        height: '50',
        width: '80',
      });
      myvalues = [515, 519, 520, 522, 652, 810, 370, 627, 319, 630, 921];
      $('#sparkline-2').sparkline(myvalues, {
        type: 'line',
        lineColor: '#92c1dc',
        fillColor: '#ebf4f9',
        height: '50',
        width: '80',
      });
      myvalues = [15, 19, 20, 22, 33, 27, 31, 27, 19, 30, 21];
      $('#sparkline-3').sparkline(myvalues, {
        type: 'line',
        lineColor: '#92c1dc',
        fillColor: '#ebf4f9',
        height: '50',
        width: '80',
      });

      // The Calender
      $('#calendar').datepicker();

      // SLIMSCROLL FOR CHAT WIDGET
      // $('#chat-box').slimScroll({
      //   height: '250px',
      // });

      /* Morris.js Charts */
      // Sales chart
      let area = new Morris.Area({ // eslint-disable-line prefer-const
        element: 'revenue-chart',
        resize: true,
        data: [
          { y: '2011 Q1', item1: 2666, item2: 2666 },
          { y: '2011 Q2', item1: 2778, item2: 2294 },
          { y: '2011 Q3', item1: 4912, item2: 1969 },
          { y: '2011 Q4', item1: 3767, item2: 3597 },
          { y: '2012 Q1', item1: 6810, item2: 1914 },
          { y: '2012 Q2', item1: 5670, item2: 4293 },
          { y: '2012 Q3', item1: 4820, item2: 3795 },
          { y: '2012 Q4', item1: 15073, item2: 5967 },
          { y: '2013 Q1', item1: 10687, item2: 4460 },
          { y: '2013 Q2', item1: 8432, item2: 5713 },
        ],
        xkey: 'y',
        ykeys: ['item1', 'item2'],
        labels: ['Item 1', 'Item 2'],
        lineColors: ['#a0d0e0', '#3c8dbc'],
        hideHover: 'auto',
      });

      let line = new Morris.Line({ // eslint-disable-line prefer-const
        element: 'line-chart',
        resize: true,
        data: [
          { y: '2011 Q1', item1: 2666 },
          { y: '2011 Q2', item1: 2778 },
          { y: '2011 Q3', item1: 4912 },
          { y: '2011 Q4', item1: 3767 },
          { y: '2012 Q1', item1: 6810 },
          { y: '2012 Q2', item1: 5670 },
          { y: '2012 Q3', item1: 4820 },
          { y: '2012 Q4', item1: 15073 },
          { y: '2013 Q1', item1: 10687 },
          { y: '2013 Q2', item1: 8432 },
        ],
        xkey: 'y',
        ykeys: ['item1'],
        labels: ['Item 1'],
        lineColors: ['#efefef'],
        lineWidth: 2,
        hideHover: 'auto',
        gridTextColor: '#fff',
        gridStrokeWidth: 0.4,
        pointSize: 4,
        pointStrokeColors: ['#efefef'],
        gridLineColor: '#efefef',
        gridTextFamily: 'Open Sans',
        gridTextSize: 10,
      });

      // Donut Chart
      let donut = new Morris.Donut({ // eslint-disable-line prefer-const
        element: 'sales-chart',
        resize: true,
        colors: ['#3c8dbc', '#f56954', '#00a65a'],
        data: [
          { label: 'Download Sales', value: 12 },
          { label: 'In-Store Sales', value: 30 },
          { label: 'Mail-Order Sales', value: 20 },
        ],
        hideHover: 'auto',
      });

      // Fix for charts under tabs
      $('.box ul.nav a').on('shown.bs.tab', () => {
        area.redraw();
        donut.redraw();
        line.redraw();
      });

      /* The todo list plugin */
      $('.todo-list').todolist({
        onCheck(ele) {
          window.console.log('The element has been checked');
          return ele;
        },
        onUncheck(ele) {
          window.console.log('The element has been unchecked');
          return ele;
        },
      });
    });
  }

  render() {
    return (
      <Layout pageTitle={pageTitle} pageSubTitle={pageSubTitle}>
        <div>
          {/* Small boxes (Stat box) */}
          <div className="row">
            <div className="col-lg-3 col-xs-6">
              {/* small box */}
              <div className="small-box bg-aqua">
                <div className="inner">
                  <h3>150</h3>
                  <p>New Orders</p>
                </div>
                <div className="icon">
                  <i className="ion ion-bag"/>
                </div>
                <Link to="#" className="small-box-footer">
                  More info <i className="fa fa-arrow-circle-right"/>
                </Link>
              </div>
            </div>
            {/* ./col */}
            <div className="col-lg-3 col-xs-6">
              {/* small box */}
              <div className="small-box bg-green">
                <div className="inner">
                  <h3>53<sup style={{ fontSize: 20 }}>%</sup>
                  </h3>
                  <p>Bounce Rate</p>
                </div>
                <div className="icon">
                  <i className="ion ion-stats-bars"/>
                </div>
                <Link to="#" className="small-box-footer">
                  More info <i className="fa fa-arrow-circle-right"/>
                </Link>
              </div>
            </div>
            {/* ./col */}
            <div className="col-lg-3 col-xs-6">
              {/* small box */}
              <div className="small-box bg-yellow">
                <div className="inner">
                  <h3>44</h3>
                  <p>User Registrations</p>
                </div>
                <div className="icon">
                  <i className="ion ion-person-add"/>
                </div>
                <Link to="#" className="small-box-footer">
                  More info <i className="fa fa-arrow-circle-right"/>
                </Link>
              </div>
            </div>
            {/* ./col */}
            <div className="col-lg-3 col-xs-6">
              {/* small box */}
              <div className="small-box bg-red">
                <div className="inner">
                  <h3>65</h3>
                  <p>Unique Visitors</p>
                </div>
                <div className="icon">
                  <i className="ion ion-pie-graph"/>
                </div>
                <Link to="#" className="small-box-footer">
                  More info <i className="fa fa-arrow-circle-right"/>
                </Link>
              </div>
            </div>
            {/* ./col */}
          </div>
          {/* /.row */}
          {/* Main row */}
          <div className="row">
            {/* Left col */}
            <section className="col-lg-7 connectedSortable">
              {/* Custom tabs (Charts with tabs)*/}
              <div className="nav-tabs-custom">
                {/* Tabs within a box */}
                <ul className="nav nav-tabs pull-right">
                  <li className="active">
                    <Link to="#revenue-chart" data-toggle="tab">Area</Link>
                  </li>
                  <li>
                    <Link to="#sales-chart" data-toggle="tab">Donut</Link>
                  </li>
                  <li className="pull-left header">
                    <i className="fa fa-inbox"/>
                    Sales
                  </li>
                </ul>
                <div className="tab-content no-padding">
                  {/* Morris chart - Sales */}
                  <div
                    className="chart tab-pane active" id="revenue-chart" style={{
                    position: 'relative',
                    height: 300,
                  }}
                  />
                  <div
                    className="chart tab-pane" id="sales-chart" style={{
                    position: 'relative',
                    height: 300,
                  }}
                  />
                </div>
              </div>
              {/* /.nav-tabs-custom */}
              {/* Chat box */}
              <div className="box box-success">
                <div className="box-header">
                  <i className="fa fa-comments-o"/>
                  <h3 className="box-title">Chat</h3>
                  <div className="box-tools pull-right" data-toggle="tooltip" title="Status">
                    <div className="btn-group" data-toggle="btn-toggle">
                      <button type="button" className="btn btn-default btn-sm active">
                        <i className="fa fa-square text-green"/>
                      </button>
                      <button type="button" className="btn btn-default btn-sm">
                        <i className="fa fa-square text-red"/>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="box-body chat" id="chat-box">
                  {/* chat item */}
                  <div className="item">
                    <img src="AdminLTE/dist/img/user4-128x128.jpg" alt="user" className="online"/>
                    <p className="message">
                      <Link to="#" className="name">
                        <small className="text-muted pull-right">
                          <i className="fa fa-clock-o"/>
                          2:15
                        </small>
                        Mike Doe
                      </Link>
                      I would like to meet you to discuss the latest news about the arrival
                      of the new theme. They say it is going to be one the best themes on the market
                    </p>
                    <div className="attachment">
                      <h4>Attachments:</h4>
                      <p className="filename">
                        Theme-thumbnail-image.jpg
                      </p>
                      <div className="pull-right">
                        <button
                          type="button" className="btn btn-primary btn-sm btn-flat"
                        >Open
                        </button>
                      </div>
                    </div>
                    {/* /.attachment */}
                  </div>
                  {/* /.item */}
                  {/* chat item */}
                  <div className="item">
                    <img src="AdminLTE/dist/img/user3-128x128.jpg" alt="user" className="offline"/>
                    <p className="message">
                      <Link to="#" className="name">
                        <small className="text-muted pull-right">
                          <i className="fa fa-clock-o"/>
                          5:15
                        </small>
                        Alexander Pierce
                      </Link>
                      I would like to meet you to discuss the latest news about the arrival
                      of the new theme. They say it is going to be one the best themes on the market
                    </p>
                  </div>
                  {/* /.item */}
                  {/* chat item */}
                  <div className="item">
                    <img src="AdminLTE/dist/img/user2-160x160.jpg" alt="user" className="offline"/>
                    <p className="message">
                      <Link to="#" className="name">
                        <small className="text-muted pull-right">
                          <i className="fa fa-clock-o"/>
                          5:30
                        </small>
                        Susan Doe
                      </Link>
                      I would like to meet you to discuss the latest news about the arrival
                      of the new theme. They say it is going to be one the best themes on the market
                    </p>
                  </div>
                  {/* /.item */}
                </div>
                {/* /.chat */}
                <div className="box-footer">
                  <div className="input-group">
                    <input className="form-control" placeholder="Type message..."/>
                    <div className="input-group-btn">
                      <button type="button" className="btn btn-success">
                        <i className="fa fa-plus"/>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* /.box (chat box) */}
              {/* TO DO List */}
              <div className="box box-primary">
                <div className="box-header">
                  <i className="ion ion-clipboard"/>
                  <h3 className="box-title">
                    To Do List
                  </h3>
                  <div className="box-tools pull-right">
                    <ul className="pagination pagination-sm inline">
                      <li>
                        <Link to="#">«</Link>
                      </li>
                      <li>
                        <Link to="#">1</Link>
                      </li>
                      <li>
                        <Link to="#">2</Link>
                      </li>
                      <li>
                        <Link to="#">3</Link>
                      </li>
                      <li>
                        <Link to="#">»</Link>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* /.box-header */}
                <div className="box-body">
                  <ul className="todo-list">
                    <li>
                      {/* drag handle */}
                      <span className="handle">
                      <i className="fa fa-ellipsis-v"/>
                      <i className="fa fa-ellipsis-v"/>
                    </span>
                      {/* checkbox */}
                      <input type="checkbox" defaultValue/> {/* todo text */}
                      <span className="text">
                      Design a nice theme
                    </span>
                      {/* Emphasis label */}
                      <small className="label label-danger">
                        <i className="fa fa-clock-o"/>
                        2 mins
                      </small>
                      {/* General tools such as edit or delete*/}
                      <div className="tools">
                        <i className="fa fa-edit"/>
                        <i className="fa fa-trash-o"/>
                      </div>
                    </li>
                    <li>
                    <span className="handle">
                      <i className="fa fa-ellipsis-v"/>
                      <i className="fa fa-ellipsis-v"/>
                    </span>
                      <input type="checkbox" defaultValue/>
                      <span className="text">Make the theme responsive</span>
                      <small className="label label-info">
                        <i className="fa fa-clock-o"/>4 hours
                      </small>
                      <div className="tools">
                        <i className="fa fa-edit"/>
                        <i className="fa fa-trash-o"/>
                      </div>
                    </li>
                    <li>
                    <span className="handle">
                      <i className="fa fa-ellipsis-v"/>
                      <i className="fa fa-ellipsis-v"/>
                    </span>
                      <input type="checkbox" defaultValue/>
                      <span className="text">Let theme shine like a star</span>
                      <small className="label label-warning">
                        <i className="fa fa-clock-o"/>1 day
                      </small>
                      <div className="tools">
                        <i className="fa fa-edit"/>
                        <i className="fa fa-trash-o"/>
                      </div>
                    </li>
                    <li>
                    <span className="handle">
                      <i className="fa fa-ellipsis-v"/>
                      <i className="fa fa-ellipsis-v"/>
                    </span>
                      <input type="checkbox" defaultValue/>
                      <span className="text">Let theme shine like a star</span>
                      <small className="label label-success">
                        <i className="fa fa-clock-o"/>3 days
                      </small>
                      <div className="tools">
                        <i className="fa fa-edit"/>
                        <i className="fa fa-trash-o"/>
                      </div>
                    </li>
                    <li>
                    <span className="handle">
                      <i className="fa fa-ellipsis-v"/>
                      <i className="fa fa-ellipsis-v"/>
                    </span>
                      <input type="checkbox" defaultValue/>
                      <span className="text">Check your messages and notifications</span>
                      <small className="label label-primary">
                        <i className="fa fa-clock-o"/>1 week
                      </small>
                      <div className="tools">
                        <i className="fa fa-edit"/>
                        <i className="fa fa-trash-o"/>
                      </div>
                    </li>
                    <li>
                    <span className="handle">
                      <i className="fa fa-ellipsis-v"/>
                      <i className="fa fa-ellipsis-v"/>
                    </span>
                      <input type="checkbox" defaultValue/>
                      <span className="text">Let theme shine like a star</span>
                      <small className="label label-default">
                        <i className="fa fa-clock-o"/>1 month
                      </small>
                      <div className="tools">
                        <i className="fa fa-edit"/>
                        <i className="fa fa-trash-o"/>
                      </div>
                    </li>
                  </ul>
                </div>
                {/* /.box-body */}
                <div className="box-footer clearfix no-border">
                  <button type="button" className="btn btn-default pull-right">
                    <i className="fa fa-plus"/>Add item
                  </button>
                </div>
              </div>
              {/* /.box */}
              {/* quick email widget */}
              <div className="box box-info">
                <div className="box-header">
                  <i className="fa fa-envelope"/>
                  <h3 className="box-title">Quick Email</h3>
                  {/* tools box */}
                  <div className="pull-right box-tools">
                    <button
                      type="button" className="btn btn-info btn-sm"
                      data-widget="remove" data-toggle="tooltip" title="Remove"
                    >
                      <i className="fa fa-times"/>
                    </button>
                  </div>
                  {/* /. tools */}
                </div>
                <div className="box-body">
                  <form action="#" method="post">
                    <div className="form-group">
                      <input
                        type="email" className="form-control"
                        name="emailto" placeholder="Email to:"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text" className="form-control"
                        name="subject" placeholder="Subject"
                      />
                    </div>
                    <div>
                    <textarea
                      className="textarea" placeholder="Message" style={{
                      width: '100%',
                      height: 125,
                      fontSize: 14,
                      lineHeight: 18,
                      border: '1px solid #dddddd',
                      padding: 10,
                    }}
                    />
                    </div>
                  </form>
                </div>
                <div className="box-footer clearfix">
                  <button type="button" className="pull-right btn btn-default" id="sendEmail">
                    Send
                    <i className="fa fa-arrow-circle-right"/>
                  </button>
                </div>
              </div>
            </section>
            {/* /.Left col */}
            {/* right col (We are only adding the ID to make the widgets sortable)*/}
            <section className="col-lg-5 connectedSortable">
              {/* Map box */}
              <div className="box box-solid bg-light-blue-gradient">
                <div className="box-header">
                  {/* tools box */}
                  <div className="pull-right box-tools">
                    <button
                      type="button" className="btn btn-primary btn-sm daterange pull-right"
                      data-toggle="tooltip" title="Date range"
                    >
                      <i className="fa fa-calendar"/>
                    </button>
                    <button
                      type="button" className="btn btn-primary btn-sm pull-right"
                      data-widget="collapse" data-toggle="tooltip" title="Collapse"
                      style={{ marginRight: 5 }}
                    >
                      <i className="fa fa-minus"/>
                    </button>
                  </div>
                  {/* /. tools */}
                  <i className="fa fa-map-marker"/>
                  <h3 className="box-title">
                    Visitors
                  </h3>
                </div>
                <div className="box-body">
                  <div id="world-map" style={{ height: 250, width: '100%' }}/>
                </div>
                {/* /.box-body*/}
                <div className="box-footer no-border">
                  <div className="row">
                    <div
                      className="col-xs-4 text-center" style={{
                      borderRight: '1px solid #f4f4f4',
                    }}
                    >
                      <div id="sparkline-1"/>
                      <div className="knob-label">Visitors</div>
                    </div>
                    {/* ./col */}
                    <div
                      className="col-xs-4 text-center" style={{
                      borderRight: '1px solid #f4f4f4',
                    }}
                    >
                      <div id="sparkline-2"/>
                      <div className="knob-label">Online</div>
                    </div>
                    {/* ./col */}
                    <div className="col-xs-4 text-center">
                      <div id="sparkline-3"/>
                      <div className="knob-label">Exists</div>
                    </div>
                    {/* ./col */}
                  </div>
                  {/* /.row */}
                </div>
              </div>
              {/* /.box */}
              {/* solid sales graph */}
              <div className="box box-solid bg-teal-gradient">
                <div className="box-header">
                  <i className="fa fa-th"/>
                  <h3 className="box-title">
                    Sales Graph
                  </h3>
                  <div className="box-tools pull-right">
                    <button type="button" className="btn bg-teal btn-sm" data-widget="collapse">
                      <i className="fa fa-minus"/>
                    </button>
                    <button type="button" className="btn bg-teal btn-sm" data-widget="remove">
                      <i className="fa fa-times"/>
                    </button>
                  </div>
                </div>
                <div className="box-body border-radius-none">
                  <div className="chart" id="line-chart" style={{ height: 250 }}/>
                </div>
                {/* /.box-body */}
                <div className="box-footer no-border">
                  <div className="row">
                    <div
                      className="col-xs-4 text-center" style={{
                      borderRight: '1px solid #f4f4f4',
                    }}
                    >
                      <input
                        type="text" className="knob" data-readonly="true"
                        defaultValue={20} data-width={60} data-height={60}
                        data-fgcolor="#39CCCC"
                      />
                      <div className="knob-label">Mail-Orders</div>
                    </div>
                    {/* ./col */}
                    <div
                      className="col-xs-4 text-center" style={{
                      borderRight: '1px solid #f4f4f4',
                    }}
                    >
                      <input
                        type="text" className="knob" data-readonly="true"
                        defaultValue={50} data-width={60} data-height={60}
                        data-fgcolor="#39CCCC"
                      />
                      <div className="knob-label">Online</div>
                    </div>
                    {/* ./col */}
                    <div className="col-xs-4 text-center">
                      <input
                        type="text" className="knob" data-readonly="true"
                        defaultValue={30} data-width={60} data-height={60}
                        data-fgcolor="#39CCCC"
                      />
                      <div className="knob-label">In-Store</div>
                    </div>
                    {/* ./col */}
                  </div>
                  {/* /.row */}
                </div>
                {/* /.box-footer */}
              </div>
              {/* /.box */}
              {/* Calendar */}
              <div className="box box-solid bg-green-gradient">
                <div className="box-header">
                  <i className="fa fa-calendar"/>
                  <h3 className="box-title">Calendar</h3>
                  {/* tools box */}
                  <div className="pull-right box-tools">
                    {/* button with a dropdown */}
                    <div className="btn-group">
                      <button
                        type="button" className="btn btn-success btn-sm dropdown-toggle"
                        data-toggle="dropdown"
                      >
                        <i className="fa fa-bars"/>
                      </button>
                      <ul className="dropdown-menu pull-right" role="menu">
                        <li>
                          <Link to="#">
                            Add new event
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            Clear events
                          </Link>
                        </li>
                        <li className="divider"/>
                        <li>
                          <Link to="#">
                            View calendar
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <button type="button" className="btn btn-success btn-sm" data-widget="collapse">
                      <i className="fa fa-minus"/>
                    </button>
                    <button type="button" className="btn btn-success btn-sm" data-widget="remove">
                      <i className="fa fa-times"/>
                    </button>
                  </div>
                  {/* /. tools */}
                </div>
                {/* /.box-header */}
                <div className="box-body no-padding">
                  {/* The calendar */}
                  <div id="calendar" style={{ width: '100%' }}/>
                </div>
                {/* /.box-body */}
                <div className="box-footer text-black">
                  <div className="row">
                    <div className="col-sm-6">
                      {/* Progress bars */}
                      <div className="clearfix">
                      <span className="pull-left">
                        Task #1
                      </span>
                        <small className="pull-right">90%</small>
                      </div>
                      <div className="progress xs">
                        <div
                          className="progress-bar progress-bar-green" style={{
                          width: '90%',
                        }}
                        />
                      </div>
                      <div className="clearfix">
                      <span className="pull-left">
                        Task #2
                      </span>
                        <small className="pull-right">70%</small>
                      </div>
                      <div className="progress xs">
                        <div
                          className="progress-bar progress-bar-green" style={{
                          width: '70%',
                        }}
                        />
                      </div>
                    </div>
                    {/* /.col */}
                    <div className="col-sm-6">
                      <div className="clearfix">
                      <span className="pull-left">
                        Task #3
                      </span>
                        <small className="pull-right">60%</small>
                      </div>
                      <div className="progress xs">
                        <div
                          className="progress-bar progress-bar-green" style={{
                          width: '60%',
                        }}
                        />
                      </div>
                      <div className="clearfix">
                      <span className="pull-left">
                        Task #4
                      </span>
                        <small className="pull-right">40%</small>
                      </div>
                      <div className="progress xs">
                        <div
                          className="progress-bar progress-bar-green" style={{
                          width: '40%',
                        }}
                        />
                      </div>
                    </div>
                    {/* /.col */}
                  </div>
                  {/* /.row */}
                </div>
              </div>
              {/* /.box */}
            </section>
            {/* right col */}
          </div>
          {/* /.row (main row) */}
          {/* /.content */}
        </div>
      </Layout>
    );
  }

}

export default withStyles(s)(Dashboard);
