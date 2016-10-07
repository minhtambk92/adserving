/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import { FormattedRelative } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Layout from '../../../components/Layout';
import Link from '../../../components/Link';
import s from './Dashboard2.css';

const pageTitle = 'Home 2';
const pageSubTitle = 'Version 2.0';

class Dashboard2 extends Component {

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

      /* ChartJS
       * -------
       * Here we will create a few charts using ChartJS
       */

      //------------------------
      // - MONTHLY SALES CHART -
      //------------------------

      // Get context with jQuery - using jQuery's .get() method.
      const salesChartCanvas = $('#salesChart').get(0).getContext('2d');
      // This will get the first returned node in the jQuery collection.
      const salesChart = new Chart(salesChartCanvas);

      const salesChartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Electronics',
            fillColor: 'rgb(210, 214, 222)',
            strokeColor: 'rgb(210, 214, 222)',
            pointColor: 'rgb(210, 214, 222)',
            pointStrokeColor: '#c1c7d1',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgb(220,220,220)',
            data: [65, 59, 80, 81, 56, 55, 40],
          },
          {
            label: 'Digital Goods',
            fillColor: 'rgba(60,141,188,0.9)',
            strokeColor: 'rgba(60,141,188,0.8)',
            pointColor: '#3b8bba',
            pointStrokeColor: 'rgba(60,141,188,1)',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(60,141,188,1)',
            data: [28, 48, 40, 19, 86, 27, 90],
          },
        ],
      };

      const salesChartOptions = {
        // Boolean - If we should show the scale at all
        showScale: true,
        // Boolean - Whether grid lines are shown across the chart
        scaleShowGridLines: false,
        // String - Colour of the grid lines
        scaleGridLineColor: 'rgba(0,0,0,.05)',
        // Number - Width of the grid lines
        scaleGridLineWidth: 1,
        // Boolean - Whether to show horizontal lines (except X axis)
        scaleShowHorizontalLines: true,
        // Boolean - Whether to show vertical lines (except Y axis)
        scaleShowVerticalLines: true,
        // Boolean - Whether the line is curved between points
        bezierCurve: true,
        // Number - Tension of the bezier curve between points
        bezierCurveTension: 0.3,
        // Boolean - Whether to show a dot for each point
        pointDot: false,
        // Number - Radius of each point dot in pixels
        pointDotRadius: 4,
        // Number - Pixel width of point dot stroke
        pointDotStrokeWidth: 1,
        // Number - amount extra to add to the radius to cater for hit detection
        // outside the drawn point
        pointHitDetectionRadius: 20,
        // Boolean - Whether to show a stroke for datasets
        datasetStroke: true,
        // Number - Pixel width of dataset stroke
        datasetStrokeWidth: 2,
        // Boolean - Whether to fill the dataset with a color
        datasetFill: true,
        // String - A legend template
        legendTemplate: '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].lineColor%>"></span><%=datasets[i].label%></li><%}%></ul>', // eslint-disable-line max-len
        // Boolean - whether to maintain the starting aspect ratio or not when responsive,
        // if set to false, will take up entire container
        maintainAspectRatio: true,
        // Boolean - whether to make the chart responsive to window resizing
        responsive: true,
      };

      // Create the line chart
      salesChart.Line(salesChartData, salesChartOptions); // eslint-disable-line new-cap

      //----------------------------
      // - END MONTHLY SALES CHART -
      //----------------------------

      //--------------
      // - PIE CHART -
      //--------------
      // Get context with jQuery - using jQuery's .get() method.
      const pieChartCanvas = $('#pieChart').get(0).getContext('2d');
      const pieChart = new Chart(pieChartCanvas);
      const PieData = [
        {
          value: 700,
          color: '#f56954',
          highlight: '#f56954',
          label: 'Chrome',
        },
        {
          value: 500,
          color: '#00a65a',
          highlight: '#00a65a',
          label: 'IE',
        },
        {
          value: 400,
          color: '#f39c12',
          highlight: '#f39c12',
          label: 'FireFox',
        },
        {
          value: 600,
          color: '#00c0ef',
          highlight: '#00c0ef',
          label: 'Safari',
        },
        {
          value: 300,
          color: '#3c8dbc',
          highlight: '#3c8dbc',
          label: 'Opera',
        },
        {
          value: 100,
          color: '#d2d6de',
          highlight: '#d2d6de',
          label: 'Navigator',
        },
      ];

      const pieOptions = {
        // Boolean - Whether we should show a stroke on each segment
        segmentShowStroke: true,
        // String - The colour of each segment stroke
        segmentStrokeColor: '#fff',
        // Number - The width of each segment stroke
        segmentStrokeWidth: 1,
        // Number - The percentage of the chart that we cut out of the middle
        percentageInnerCutout: 50, // This is 0 for Pie charts
        // Number - Amount of animation steps
        animationSteps: 100,
        // String - Animation easing effect
        animationEasing: 'easeOutBounce',
        // Boolean - Whether we animate the rotation of the Doughnut
        animateRotate: true,
        // Boolean - Whether we animate scaling the Doughnut from the centre
        animateScale: false,
        // Boolean - whether to make the chart responsive to window resizing
        responsive: true,
        // Boolean - whether to maintain the starting aspect ratio or not when responsive,
        // if set to false, will take up entire container
        maintainAspectRatio: false,
        // String - A legend template
        legendTemplate: '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>', // eslint-disable-line max-len
        // String - A tooltip template
        tooltipTemplate: '<%=value %> <%=label%> users',
      };
      // Create pie or douhnut chart
      // You can switch between pie and douhnut using the method below.
      pieChart.Doughnut(PieData, pieOptions); // eslint-disable-line new-cap
      //------------------
      // - END PIE CHART -
      //------------------

      /* jVector Maps
       * ------------
       * Create a world map with markers
       */
      $('#world-map-markers').vectorMap({
        map: 'world_mill_en',
        normalizeFunction: 'polynomial',
        hoverOpacity: 0.7,
        hoverColor: false,
        backgroundColor: 'transparent',
        regionStyle: {
          initial: {
            fill: 'rgba(210, 214, 222, 1)',
            'fill-opacity': 1,
            stroke: 'none',
            'stroke-width': 0,
            'stroke-opacity': 1,
          },
          hover: {
            'fill-opacity': 0.7,
            cursor: 'pointer',
          },
          selected: {
            fill: 'yellow',
          },
          selectedHover: {},
        },
        markerStyle: {
          initial: {
            fill: '#00a65a',
            stroke: '#111',
          },
        },
        markers: [
          { latLng: [41.90, 12.45], name: 'Vatican City' },
          { latLng: [43.73, 7.41], name: 'Monaco' },
          { latLng: [-0.52, 166.93], name: 'Nauru' },
          { latLng: [-8.51, 179.21], name: 'Tuvalu' },
          { latLng: [43.93, 12.46], name: 'San Marino' },
          { latLng: [47.14, 9.52], name: 'Liechtenstein' },
          { latLng: [7.11, 171.06], name: 'Marshall Islands' },
          { latLng: [17.3, -62.73], name: 'Saint Kitts and Nevis' },
          { latLng: [3.2, 73.22], name: 'Maldives' },
          { latLng: [35.88, 14.5], name: 'Malta' },
          { latLng: [12.05, -61.75], name: 'Grenada' },
          { latLng: [13.16, -61.23], name: 'Saint Vincent and the Grenadines' },
          { latLng: [13.16, -59.55], name: 'Barbados' },
          { latLng: [17.11, -61.85], name: 'Antigua and Barbuda' },
          { latLng: [-4.61, 55.45], name: 'Seychelles' },
          { latLng: [7.35, 134.46], name: 'Palau' },
          { latLng: [42.5, 1.51], name: 'Andorra' },
          { latLng: [14.01, -60.98], name: 'Saint Lucia' },
          { latLng: [6.91, 158.18], name: 'Federated States of Micronesia' },
          { latLng: [1.3, 103.8], name: 'Singapore' },
          { latLng: [1.46, 173.03], name: 'Kiribati' },
          { latLng: [-21.13, -175.2], name: 'Tonga' },
          { latLng: [15.3, -61.38], name: 'Dominica' },
          { latLng: [-20.2, 57.5], name: 'Mauritius' },
          { latLng: [26.02, 50.55], name: 'Bahrain' },
          { latLng: [0.33, 6.73], name: 'São Tomé and Príncipe' },
        ],
      });

      /* SPARKLINE CHARTS
       * ----------------
       * Create a inline charts with spark line
       */

      //------------------
      // - SPARKLINE BAR -
      //------------------
      // $('.sparkbar').each(() => {
      //   const $this = $(this);
      //   $this.sparkline('html', {
      //     type: 'bar',
      //     height: $this.data('height') ? $this.data('height') : '30',
      //     barColor: $this.data('color'),
      //   });
      // });

      //------------------
      // - SPARKLINE PIE -
      //------------------
      // $('.sparkpie').each(() => {
      //   const $this = $(this);
      //   $this.sparkline('html', {
      //     type: 'pie',
      //     height: $this.data('height') ? $this.data('height') : '90',
      //     sliceColors: $this.data('color'),
      //   });
      // });

      //-------------------
      // - SPARKLINE LINE -
      //-------------------
      // $('.sparkline').each(() => {
      //   const $this = $(this);
      //   $this.sparkline('html', {
      //     type: 'line',
      //     height: $this.data('height') ? $this.data('height') : '90',
      //     width: '100%',
      //     lineColor: $this.data('linecolor'),
      //     fillColor: $this.data('fillcolor'),
      //     spotColor: $this.data('spotcolor'),
      //   });
      // });
    });
  }

  render() {
    return (
      <Layout pageTitle={pageTitle} pageSubTitle={pageSubTitle}>
        <div>
          {/* Info boxes */}
          <div className="row">
            <div className="col-md-3 col-sm-6 col-xs-12">
              <div className="info-box">
              <span className="info-box-icon bg-aqua">
                <i className="ion ion-ios-gear-outline"/>
              </span>
                <div className="info-box-content">
                <span className="info-box-text">
                  CPU Traffic
                </span>
                  <span className="info-box-number">90<small>%</small>
                </span>
                </div>
                {/* /.info-box-content */}
              </div>
              {/* /.info-box */}
            </div>
            {/* /.col */}
            <div className="col-md-3 col-sm-6 col-xs-12">
              <div className="info-box">
              <span className="info-box-icon bg-red">
                <i className="fa fa-google-plus"/>
              </span>
                <div className="info-box-content">
                  <span className="info-box-text">Likes</span>
                  <span className="info-box-number">41,410</span>
                </div>
                {/* /.info-box-content */}
              </div>
              {/* /.info-box */}
            </div>
            {/* /.col */}
            {/* fix for small devices only */}
            <div className="clearfix visible-sm-block"/>
            <div className="col-md-3 col-sm-6 col-xs-12">
              <div className="info-box">
              <span className="info-box-icon bg-green">
                <i className="ion ion-ios-cart-outline"/>
              </span>
                <div className="info-box-content">
                  <span className="info-box-text">Sales</span>
                  <span className="info-box-number">760</span>
                </div>
                {/* /.info-box-content */}
              </div>
              {/* /.info-box */}
            </div>
            {/* /.col */}
            <div className="col-md-3 col-sm-6 col-xs-12">
              <div className="info-box">
              <span className="info-box-icon bg-yellow">
                <i className="ion ion-ios-people-outline"/>
              </span>
                <div className="info-box-content">
                <span className="info-box-text">
                  New Members
                </span>
                  <span className="info-box-number">2,000</span>
                </div>
                {/* /.info-box-content */}
              </div>
              {/* /.info-box */}
            </div>
            {/* /.col */}
          </div>
          {/* /.row */}
          <div className="row">
            <div className="col-md-12">
              <div className="box">
                <div className="box-header with-border">
                  <h3 className="box-title">
                    Monthly Recap Report
                  </h3>
                  <div className="box-tools pull-right">
                    <button type="button" className="btn btn-box-tool" data-widget="collapse">
                      <i className="fa fa-minus"/>
                    </button>
                    <div className="btn-group">
                      <button
                        type="button" className="btn btn-box-tool dropdown-toggle"
                        data-toggle="dropdown"
                      >
                        <i className="fa fa-wrench"/>
                      </button>
                      <ul className="dropdown-menu" role="menu">
                        <li>
                          <Link to="#">Action</Link>
                        </li>
                        <li>
                          <Link to="#">
                            Another action
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            Something else here
                          </Link>
                        </li>
                        <li className="divider"/>
                        <li>
                          <Link to="#">
                            Separated link
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <button type="button" className="btn btn-box-tool" data-widget="remove">
                      <i className="fa fa-times"/>
                    </button>
                  </div>
                </div>
                {/* /.box-header */}
                <div className="box-body">
                  <div className="row">
                    <div className="col-md-8">
                      <p className="text-center">
                        <strong>
                          Sales: 1 Jan, 2014 - 30 Jul, 2014
                        </strong>
                      </p>
                      <div className="chart">
                        {/* Sales Chart Canvas */}
                        <canvas
                          id="salesChart" style={{
                          height: 180,
                        }}
                        />
                      </div>
                      {/* /.chart-responsive */}
                    </div>
                    {/* /.col */}
                    <div className="col-md-4">
                      <p className="text-center">
                        <strong>
                          Goal Completion
                        </strong>
                      </p>
                      <div className="progress-group">
                      <span className="progress-text">
                        Add Products to Cart
                      </span>
                        <span className="progress-number">
                        <b>160</b>/200</span>
                        <div className="progress sm">
                          <div
                            className="progress-bar progress-bar-aqua" style={{
                            width: '80%',
                          }}
                          />
                        </div>
                      </div>
                      {/* /.progress-group */}
                      <div className="progress-group">
                      <span className="progress-text">
                        Complete Purchase
                      </span>
                        <span className="progress-number">
                        <b>310</b>/400</span>
                        <div className="progress sm">
                          <div
                            className="progress-bar progress-bar-red" style={{
                            width: '80%',
                          }}
                          />
                        </div>
                      </div>
                      {/* /.progress-group */}
                      <div className="progress-group">
                      <span className="progress-text">
                        Visit Premium Page
                      </span>
                        <span className="progress-number">
                        <b>480</b>/800</span>
                        <div className="progress sm">
                          <div
                            className="progress-bar progress-bar-green" style={{
                            width: '80%',
                          }}
                          />
                        </div>
                      </div>
                      {/* /.progress-group */}
                      <div className="progress-group">
                      <span className="progress-text">
                        Send Inquiries
                      </span>
                        <span className="progress-number">
                        <b>250</b>/500</span>
                        <div className="progress sm">
                          <div
                            className="progress-bar progress-bar-yellow" style={{
                            width: '80%',
                          }}
                          />
                        </div>
                      </div>
                      {/* /.progress-group */}
                    </div>
                    {/* /.col */}
                  </div>
                  {/* /.row */}
                </div>
                {/* ./box-body */}
                <div className="box-footer">
                  <div className="row">
                    <div className="col-sm-3 col-xs-6">
                      <div className="description-block border-right">
                      <span className="description-percentage text-green">
                        <i className="fa fa-caret-up"/>
                        17%
                      </span>
                        <h5 className="description-header">$35,210.43</h5>
                        <span className="description-text">
                        TOTAL REVENUE
                      </span>
                      </div>
                      {/* /.description-block */}
                    </div>
                    {/* /.col */}
                    <div className="col-sm-3 col-xs-6">
                      <div className="description-block border-right">
                      <span className="description-percentage text-yellow">
                        <i className="fa fa-caret-left"/>
                        0%
                      </span>
                        <h5 className="description-header">$10,390.90</h5>
                        <span className="description-text">
                        TOTAL COST
                      </span>
                      </div>
                      {/* /.description-block */}
                    </div>
                    {/* /.col */}
                    <div className="col-sm-3 col-xs-6">
                      <div className="description-block border-right">
                      <span className="description-percentage text-green">
                        <i className="fa fa-caret-up"/>
                        20%
                      </span>
                        <h5 className="description-header">$24,813.53</h5>
                        <span className="description-text">
                        TOTAL PROFIT
                      </span>
                      </div>
                      {/* /.description-block */}
                    </div>
                    {/* /.col */}
                    <div className="col-sm-3 col-xs-6">
                      <div className="description-block">
                      <span className="description-percentage text-red">
                        <i className="fa fa-caret-down"/>
                        18%
                      </span>
                        <h5 className="description-header">1200</h5>
                        <span className="description-text">
                        GOAL COMPLETIONS
                      </span>
                      </div>
                      {/* /.description-block */}
                    </div>
                  </div>
                  {/* /.row */}
                </div>
                {/* /.box-footer */}
              </div>
              {/* /.box */}
            </div>
            {/* /.col */}
          </div>
          {/* /.row */}
          {/* Main row */}
          <div className="row">
            {/* Left col */}
            <div className="col-md-8">
              {/* MAP & BOX PANE */}
              <div className="box box-success">
                <div className="box-header with-border">
                  <h3 className="box-title">
                    Visitors Report
                  </h3>
                  <div className="box-tools pull-right">
                    <button type="button" className="btn btn-box-tool" data-widget="collapse">
                      <i className="fa fa-minus"/>
                    </button>
                    <button type="button" className="btn btn-box-tool" data-widget="remove">
                      <i className="fa fa-times"/>
                    </button>
                  </div>
                </div>
                {/* /.box-header */}
                <div className="box-body no-padding">
                  <div className="row">
                    <div className="col-md-9 col-sm-8">
                      <div className="pad">
                        {/* Map will be created here */}
                        <div id="world-map-markers" style={{ height: 325 }}/>
                      </div>
                    </div>
                    {/* /.col */}
                    <div className="col-md-3 col-sm-4">
                      <div
                        className="pad box-pane-right bg-green" style={{
                        minHeight: 280,
                      }}
                      >
                        <div className="description-block margin-bottom">
                          <div className="sparkbar pad" data-color="#fff">90,70,90,70,75,80,70</div>
                          <h5 className="description-header">8390</h5>
                          <span className="description-text">Visits</span>
                        </div>
                        {/* /.description-block */}
                        <div className="description-block margin-bottom">
                          <div className="sparkbar pad" data-color="#fff">90,50,90,70,61,83,63</div>
                          <h5 className="description-header">30%</h5>
                          <span className="description-text">Referrals</span>
                        </div>
                        {/* /.description-block */}
                        <div className="description-block">
                          <div className="sparkbar pad" data-color="#fff">90,50,90,70,61,83,63</div>
                          <h5 className="description-header">70%</h5>
                          <span className="description-text">Organic</span>
                        </div>
                        {/* /.description-block */}
                      </div>
                    </div>
                    {/* /.col */}
                  </div>
                  {/* /.row */}
                </div>
                {/* /.box-body */}
              </div>
              {/* /.box */}
              <div className="row">
                <div className="col-md-6">
                  {/* DIRECT CHAT */}
                  <div className="box box-warning direct-chat direct-chat-warning">
                    <div className="box-header with-border">
                      <h3 className="box-title">
                        Direct Chat
                      </h3>
                      <div className="box-tools pull-right">
                      <span
                        data-toggle="tooltip" title="3 New Messages"
                        className="badge bg-yellow"
                      >3</span>
                        <button type="button" className="btn btn-box-tool" data-widget="collapse">
                          <i className="fa fa-minus"/>
                        </button>
                        <button
                          type="button" className="btn btn-box-tool" data-toggle="tooltip"
                          title="Contacts" data-widget="chat-pane-toggle"
                        >
                          <i className="fa fa-comments"/>
                        </button>
                        <button type="button" className="btn btn-box-tool" data-widget="remove">
                          <i className="fa fa-times"/>
                        </button>
                      </div>
                    </div>
                    {/* /.box-header */}
                    <div className="box-body">
                      {/* Conversations are loaded here */}
                      <div className="direct-chat-messages">
                        {/* Message. Default to the left */}
                        <div className="direct-chat-msg">
                          <div className="direct-chat-info clearfix">
                          <span className="direct-chat-name pull-left">
                            Alexander Pierce
                          </span>
                            <span className="direct-chat-timestamp pull-right">
                            23 Jan 2:00 pm
                          </span>
                          </div>
                          {/* /.direct-chat-info */}
                          {/* /.direct-chat-img */}
                          <img
                            className="direct-chat-img"
                            src="AdminLTE/dist/img/user1-128x128.jpg"
                            alt="message user"
                          />
                          <div className="direct-chat-text">
                            Is this template really for free? That's unbelievable!
                          </div>
                          {/* /.direct-chat-text */}
                        </div>
                        {/* /.direct-chat-msg */}
                        {/* Message to the right */}
                        <div className="direct-chat-msg right">
                          <div className="direct-chat-info clearfix">
                          <span className="direct-chat-name pull-right">
                            Sarah Bullock
                          </span>
                            <span className="direct-chat-timestamp pull-left">
                            23 Jan 2:05 pm
                          </span>
                          </div>
                          {/* /.direct-chat-info */}
                          <img
                            className="direct-chat-img" src="AdminLTE/dist/img/user3-128x128.jpg"
                            alt="message user"
                          />
                          <div className="direct-chat-text">
                            You better believe it!
                          </div>
                          {/* /.direct-chat-text */}
                        </div>
                        {/* /.direct-chat-msg */}
                        {/* Message. Default to the left */}
                        <div className="direct-chat-msg">
                          <div className="direct-chat-info clearfix">
                          <span className="direct-chat-name pull-left">
                            Alexander Pierce
                          </span>
                            <span className="direct-chat-timestamp pull-right">
                            23 Jan 5:37 pm
                          </span>
                          </div>
                          {/* /.direct-chat-info */}
                          <img
                            className="direct-chat-img" src="AdminLTE/dist/img/user1-128x128.jpg"
                            alt="message user"
                          />
                          <div className="direct-chat-text">
                            Working with AdminLTE on a great new app! Wanna join?
                          </div>
                          {/* /.direct-chat-text */}
                        </div>
                        {/* /.direct-chat-msg */}
                        {/* Message to the right */}
                        <div className="direct-chat-msg right">
                          <div className="direct-chat-info clearfix">
                          <span className="direct-chat-name pull-right">
                            Sarah Bullock
                          </span>
                            <span className="direct-chat-timestamp pull-left">
                            23 Jan 6:10 pm
                          </span>
                          </div>
                          {/* /.direct-chat-info */}
                          <img
                            className="direct-chat-img" src="AdminLTE/dist/img/user3-128x128.jpg"
                            alt="message user"
                          />
                          <div className="direct-chat-text">
                            I would love to.
                          </div>
                          {/* /.direct-chat-text */}
                        </div>
                        {/* /.direct-chat-msg */}
                      </div>
                      {/* /.direct-chat-messages*/}
                      {/* Contacts are loaded here */}
                      <div className="direct-chat-contacts">
                        <ul className="contacts-list">
                          <li>
                            <Link to="#">
                              <img
                                className="contacts-list-img"
                                src="AdminLTE/dist/img/user1-128x128.jpg"
                                alt="User"
                              />
                              <div className="contacts-list-info">
                              <span className="contacts-list-name">
                                Count Dracula
                                <small className="contacts-list-date pull-right">2/28/2015</small>
                              </span>
                                <span className="contacts-list-msg">
                                How have you been? I was...
                              </span>
                              </div>
                              {/* /.contacts-list-info */}
                            </Link>
                          </li>
                          {/* End Contact Item */}
                          <li>
                            <Link to="#">
                              <img
                                className="contacts-list-img"
                                src="AdminLTE/dist/img/user7-128x128.jpg"
                                alt="User"
                              />
                              <div className="contacts-list-info">
                              <span className="contacts-list-name">
                                Sarah Doe
                                <small className="contacts-list-date pull-right">2/23/2015</small>
                              </span>
                                <span className="contacts-list-msg">
                                I will be waiting for...
                              </span>
                              </div>
                              {/* /.contacts-list-info */}
                            </Link>
                          </li>
                          {/* End Contact Item */}
                          <li>
                            <Link to="#">
                              <img
                                className="contacts-list-img"
                                src="AdminLTE/dist/img/user3-128x128.jpg"
                                alt="User"
                              />
                              <div className="contacts-list-info">
                              <span className="contacts-list-name">
                                Nadia Jolie
                                <small className="contacts-list-date pull-right">2/20/2015</small>
                              </span>
                                <span className="contacts-list-msg">
                                I'll call you back at...
                              </span>
                              </div>
                              {/* /.contacts-list-info */}
                            </Link>
                          </li>
                          {/* End Contact Item */}
                          <li>
                            <Link to="#">
                              <img
                                className="contacts-list-img"
                                src="AdminLTE/dist/img/user5-128x128.jpg"
                                alt="User"
                              />
                              <div className="contacts-list-info">
                              <span className="contacts-list-name">
                                Nora S. Vans
                                <small className="contacts-list-date pull-right">2/10/2015</small>
                              </span>
                                <span className="contacts-list-msg">
                                Where is your new...
                              </span>
                              </div>
                              {/* /.contacts-list-info */}
                            </Link>
                          </li>
                          {/* End Contact Item */}
                          <li>
                            <Link to="#">
                              <img
                                className="contacts-list-img"
                                src="AdminLTE/dist/img/user6-128x128.jpg"
                                alt="User"
                              />
                              <div className="contacts-list-info">
                              <span className="contacts-list-name">
                                John K.
                                <small className="contacts-list-date pull-right">1/27/2015</small>
                              </span>
                                <span className="contacts-list-msg">
                                Can I take a look at...
                              </span>
                              </div>
                              {/* /.contacts-list-info */}
                            </Link>
                          </li>
                          {/* End Contact Item */}
                          <li>
                            <Link to="#">
                              <img
                                className="contacts-list-img"
                                src="AdminLTE/dist/img/user8-128x128.jpg"
                                alt="User"
                              />
                              <div className="contacts-list-info">
                              <span className="contacts-list-name">
                                Kenneth M.
                                <small className="contacts-list-date pull-right">1/4/2015</small>
                              </span>
                                <span className="contacts-list-msg">
                                Never mind I found...
                              </span>
                              </div>
                              {/* /.contacts-list-info */}
                            </Link>
                          </li>
                          {/* End Contact Item */}
                        </ul>
                        {/* /.contatcts-list */}
                      </div>
                      {/* /.direct-chat-pane */}
                    </div>
                    {/* /.box-body */}
                    <div className="box-footer">
                      <form action="#" method="post">
                        <div className="input-group">
                          <input
                            type="text" name="message" placeholder="Type Message ..."
                            className="form-control"
                          />
                          <span className="input-group-btn">
                          <button type="button" className="btn btn-warning btn-flat">Send</button>
                        </span>
                        </div>
                      </form>
                    </div>
                    {/* /.box-footer*/}
                  </div>
                  {/* /.direct-chat */}
                </div>
                {/* /.col */}
                <div className="col-md-6">
                  {/* USERS LIST */}
                  <div className="box box-danger">
                    <div className="box-header with-border">
                      <h3 className="box-title">
                        Latest Members
                      </h3>
                      <div className="box-tools pull-right">
                      <span className="label label-danger">
                        8 New Members
                      </span>
                        <button type="button" className="btn btn-box-tool" data-widget="collapse">
                          <i className="fa fa-minus"/>
                        </button>
                        <button type="button" className="btn btn-box-tool" data-widget="remove">
                          <i className="fa fa-times"/>
                        </button>
                      </div>
                    </div>
                    {/* /.box-header */}
                    <div className="box-body no-padding">
                      <ul className="users-list clearfix">
                        <li>
                          <img src="AdminLTE/dist/img/user1-128x128.jpg" alt="User"/>
                          <Link to="#" className="users-list-name">
                            Alexander Pierce
                          </Link>
                          <span className="users-list-date">Today</span>
                        </li>
                        <li>
                          <img src="AdminLTE/dist/img/user8-128x128.jpg" alt="User"/>
                          <Link to="#" className="users-list-name">Norman</Link>
                          <span className="users-list-date">Yesterday</span>
                        </li>
                        <li>
                          <img src="AdminLTE/dist/img/user7-128x128.jpg" alt="User"/>
                          <Link to="#" className="users-list-name">Jane</Link>
                          <span className="users-list-date">
                          12 Jan
                        </span>
                        </li>
                        <li>
                          <img src="AdminLTE/dist/img/user6-128x128.jpg" alt="User"/>
                          <Link to="#" className="users-list-name">John</Link>
                          <span className="users-list-date">
                          12 Jan
                        </span>
                        </li>
                        <li>
                          <img src="AdminLTE/dist/img/user2-160x160.jpg" alt="User"/>
                          <Link to="#" className="users-list-name">Alexander</Link>
                          <span className="users-list-date">
                          13 Jan
                        </span>
                        </li>
                        <li>
                          <img src="AdminLTE/dist/img/user5-128x128.jpg" alt="User"/>
                          <Link to="#" className="users-list-name">Sarah</Link>
                          <span className="users-list-date">
                          14 Jan
                        </span>
                        </li>
                        <li>
                          <img src="AdminLTE/dist/img/user4-128x128.jpg" alt="User"/>
                          <Link to="#" className="users-list-name">Nora</Link>
                          <span className="users-list-date">
                          15 Jan
                        </span>
                        </li>
                        <li>
                          <img src="AdminLTE/dist/img/user3-128x128.jpg" alt="User"/>
                          <Link to="#" className="users-list-name">Nadia</Link>
                          <span className="users-list-date">
                          15 Jan
                        </span>
                        </li>
                      </ul>
                      {/* /.users-list */}
                    </div>
                    {/* /.box-body */}
                    <div className="box-footer text-center">
                      <Link to="#" className="uppercase">
                        View All Users
                      </Link>
                    </div>
                    {/* /.box-footer */}
                  </div>
                  {/* /.box */}
                </div>
                {/* /.col */}
              </div>
              {/* /.row */}
              {/* TABLE: LATEST ORDERS */}
              <div className="box box-info">
                <div className="box-header with-border">
                  <h3 className="box-title">
                    Latest Orders
                  </h3>
                  <div className="box-tools pull-right">
                    <button type="button" className="btn btn-box-tool" data-widget="collapse">
                      <i className="fa fa-minus"/>
                    </button>
                    <button type="button" className="btn btn-box-tool" data-widget="remove">
                      <i className="fa fa-times"/>
                    </button>
                  </div>
                </div>
                {/* /.box-header */}
                <div className="box-body">
                  <div className="table-responsive">
                    <table className="table no-margin">
                      <thead>
                      <tr>
                        <th>
                          Order ID
                        </th>
                        <th>Item</th>
                        <th>Status</th>
                        <th>Popularity</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr>
                        <td>
                          <Link to="pages/examples/invoice.html">OR9842</Link>
                        </td>
                        <td>
                          Call of Duty IV
                        </td>
                        <td>
                          <span className="label label-success">Shipped</span>
                        </td>
                        <td>
                          <div
                            className="sparkbar" data-color="#00a65a"
                            data-height={20}
                          >90,80,90,-70,61,-83,63
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Link to="pages/examples/invoice.html">OR1848</Link>
                        </td>
                        <td>
                          Samsung Smart TV
                        </td>
                        <td>
                          <span className="label label-warning">Pending</span>
                        </td>
                        <td>
                          <div
                            className="sparkbar" data-color="#f39c12" data-height={20}
                          >90,80,-90,70,61,-83,68
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Link to="pages/examples/invoice.html">OR7429</Link>
                        </td>
                        <td>
                          iPhone 6 Plus
                        </td>
                        <td>
                          <span className="label label-danger">Delivered</span>
                        </td>
                        <td>
                          <div
                            className="sparkbar" data-color="#f56954" data-height={20}
                          >90,-80,90,70,-61,83,63
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Link to="pages/examples/invoice.html">OR7429</Link>
                        </td>
                        <td>
                          Samsung Smart TV
                        </td>
                        <td>
                          <span className="label label-info">Processing</span>
                        </td>
                        <td>
                          <div
                            className="sparkbar" data-color="#00c0ef" data-height={20}
                          >90,80,-90,70,-61,83,63
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Link to="pages/examples/invoice.html">OR1848</Link>
                        </td>
                        <td>
                          Samsung Smart TV
                        </td>
                        <td>
                          <span className="label label-warning">Pending</span>
                        </td>
                        <td>
                          <div
                            className="sparkbar" data-color="#f39c12" data-height={20}
                          >90,80,-90,70,61,-83,68
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Link to="pages/examples/invoice.html">OR7429</Link>
                        </td>
                        <td>
                          iPhone 6 Plus
                        </td>
                        <td>
                          <span className="label label-danger">Delivered</span>
                        </td>
                        <td>
                          <div
                            className="sparkbar" data-color="#f56954" data-height={20}
                          >90,-80,90,70,-61,83,63
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Link to="pages/examples/invoice.html">OR9842</Link>
                        </td>
                        <td>
                          Call of Duty IV
                        </td>
                        <td>
                          <span className="label label-success">Shipped</span>
                        </td>
                        <td>
                          <div
                            className="sparkbar" data-color="#00a65a" data-height={20}
                          >90,80,90,-70,61,-83,63
                          </div>
                        </td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                  {/* /.table-responsive */}
                </div>
                {/* /.box-body */}
                <div className="box-footer clearfix">
                  <Link to="#" className="btn btn-sm btn-info btn-flat pull-left">
                    Place New Order
                  </Link>
                  <Link to="#" className="btn btn-sm btn-default btn-flat pull-right">
                    View All Orders
                  </Link>
                </div>
                {/* /.box-footer */}
              </div>
              {/* /.box */}
            </div>
            {/* /.col */}
            <div className="col-md-4">
              {/* Info Boxes Style 2 */}
              <div className="info-box bg-yellow">
              <span className="info-box-icon">
                <i className="ion ion-ios-pricetag-outline"/>
              </span>
                <div className="info-box-content">
                  <span className="info-box-text">Inventory</span>
                  <span className="info-box-number">5,200</span>
                  <div className="progress">
                    <div className="progress-bar" style={{ width: '50%' }}/>
                  </div>
                  <span className="progress-description">
                  50% Increase in 30 Days
                </span>
                </div>
                {/* /.info-box-content */}
              </div>
              {/* /.info-box */}
              <div className="info-box bg-green">
              <span className="info-box-icon">
                <i className="ion ion-ios-heart-outline"/>
              </span>
                <div className="info-box-content">
                  <span className="info-box-text">Mentions</span>
                  <span className="info-box-number">92,050</span>
                  <div className="progress">
                    <div className="progress-bar" style={{ width: '20%' }}/>
                  </div>
                  <span className="progress-description">
                  20% Increase in 30 Days
                </span>
                </div>
                {/* /.info-box-content */}
              </div>
              {/* /.info-box */}
              <div className="info-box bg-red">
              <span className="info-box-icon">
                <i className="ion ion-ios-cloud-download-outline"/>
              </span>
                <div className="info-box-content">
                  <span className="info-box-text">Downloads</span>
                  <span className="info-box-number">114,381</span>
                  <div className="progress">
                    <div className="progress-bar" style={{ width: '70%' }}/>
                  </div>
                  <span className="progress-description">
                  70% Increase in 30 Days
                </span>
                </div>
                {/* /.info-box-content */}
              </div>
              {/* /.info-box */}
              <div className="info-box bg-aqua">
              <span className="info-box-icon">
                <i className="ion-ios-chatbubble-outline"/>
              </span>
                <div className="info-box-content">
                <span className="info-box-text">
                  Direct Messages
                </span>
                  <span className="info-box-number">163,921</span>
                  <div className="progress">
                    <div className="progress-bar" style={{ width: '40%' }}/>
                  </div>
                  <span className="progress-description">
                  40% Increase in 30 Days
                </span>
                </div>
                {/* /.info-box-content */}
              </div>
              {/* /.info-box */}
              <div className="box box-default">
                <div className="box-header with-border">
                  <h3 className="box-title">
                    Browser Usage
                  </h3>
                  <div className="box-tools pull-right">
                    <button type="button" className="btn btn-box-tool" data-widget="collapse">
                      <i className="fa fa-minus"/>
                    </button>
                    <button type="button" className="btn btn-box-tool" data-widget="remove">
                      <i className="fa fa-times"/>
                    </button>
                  </div>
                </div>
                {/* /.box-header */}
                <div className="box-body">
                  <div className="row">
                    <div className="col-md-8">
                      <div className="chart-responsive">
                        <canvas id="pieChart" height={150}/>
                      </div>
                      {/* ./chart-responsive */}
                    </div>
                    {/* /.col */}
                    <div className="col-md-4">
                      <ul className="chart-legend clearfix">
                        <li>
                          <i className="fa fa-circle-o text-red"/>
                          Chrome
                        </li>
                        <li>
                          <i className="fa fa-circle-o text-green"/>
                          IE
                        </li>
                        <li>
                          <i className="fa fa-circle-o text-yellow"/>
                          FireFox
                        </li>
                        <li>
                          <i className="fa fa-circle-o text-aqua"/>
                          Safari
                        </li>
                        <li>
                          <i className="fa fa-circle-o text-light-blue"/>
                          Opera
                        </li>
                        <li>
                          <i className="fa fa-circle-o text-gray"/>
                          Navigator
                        </li>
                      </ul>
                    </div>
                    {/* /.col */}
                  </div>
                  {/* /.row */}
                </div>
                {/* /.box-body */}
                <div className="box-footer no-padding">
                  <ul className="nav nav-pills nav-stacked">
                    <li>
                      <Link to="#">
                        United States of America
                        <span className="pull-right text-red">
                        <i className="fa fa-angle-down"/>
                        12%
                      </span>
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        India
                        <span className="pull-right text-green">
                        <i className="fa fa-angle-up"/>
                        4%
                      </span>
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        China
                        <span className="pull-right text-yellow">
                        <i className="fa fa-angle-left"/>
                        0%
                      </span>
                      </Link>
                    </li>
                  </ul>
                </div>
                {/* /.footer */}
              </div>
              {/* /.box */}
              {/* PRODUCT LIST */}
              <div className="box box-primary">
                <div className="box-header with-border">
                  <h3 className="box-title">
                    Recently Added Products
                  </h3>
                  <div className="box-tools pull-right">
                    <button type="button" className="btn btn-box-tool" data-widget="collapse">
                      <i className="fa fa-minus"/>
                    </button>
                    <button type="button" className="btn btn-box-tool" data-widget="remove">
                      <i className="fa fa-times"/>
                    </button>
                  </div>
                </div>
                {/* /.box-header */}
                <div className="box-body">
                  <ul className="products-list product-list-in-box">
                    <li className="item">
                      <div className="product-img">
                        <img src="AdminLTE/dist/img/default-50x50.gif" alt="Product"/>
                      </div>
                      <div className="product-info">
                        <Link to="#" className="product-title">
                          Samsung TV
                          <span className="label label-warning pull-right">$1800</span>
                        </Link>
                        <span className="product-description">
                        Samsung 32 inch 1080p 60Hz LED Smart HDTV.
                      </span>
                      </div>
                    </li>
                    {/* /.item */}
                    <li className="item">
                      <div className="product-img">
                        <img src="AdminLTE/dist/img/default-50x50.gif" alt="Product"/>
                      </div>
                      <div className="product-info">
                        <Link to="#" className="product-title">
                          Bicycle
                          <span className="label label-info pull-right">$700</span>
                        </Link>
                        <span className="product-description">
                        26 inch Mongoose Dolomite Men's 7-speed, Navy Blue.
                      </span>
                      </div>
                    </li>
                    {/* /.item */}
                    <li className="item">
                      <div className="product-img">
                        <img src="AdminLTE/dist/img/default-50x50.gif" alt="Product"/>
                      </div>
                      <div className="product-info">
                        <Link to="#" className="product-title">
                          Xbox One
                          <span className="label label-danger pull-right">$350</span>
                        </Link>
                        <span className="product-description">
                        Xbox One Console Bundle with Halo Master Chief Collection.
                      </span>
                      </div>
                    </li>
                    {/* /.item */}
                    <li className="item">
                      <div className="product-img">
                        <img src="AdminLTE/dist/img/default-50x50.gif" alt="Product"/>
                      </div>
                      <div className="product-info">
                        <Link to="#" className="product-title">
                          PlayStation 4
                          <span className="label label-success pull-right">$399</span>
                        </Link>
                        <span className="product-description">
                        PlayStation 4 500GB Console (PS4)
                      </span>
                      </div>
                    </li>
                    {/* /.item */}
                  </ul>
                </div>
                {/* /.box-body */}
                <div className="box-footer text-center">
                  <Link to="#" className="uppercase">
                    View All Products
                  </Link>
                </div>
                {/* /.box-footer */}
              </div>
              {/* /.box */}
            </div>
            {/* /.col */}
          </div>
          {/* /.row */}
        </div>
      </Layout>
    );
  }

}

export default withStyles(s)(Dashboard2);
