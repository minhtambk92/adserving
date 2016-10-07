import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Layout from '../../../../components/Layout';
import s from './Morris.css';

const pageTitle = 'Morris Charts';
const pageSubTitle = 'Preview sample';

class Morris extends Component {

  componentDidMount() {
    $(function () {
      "use strict";

      // AREA CHART
      var area = new Morris.Area({
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
          { y: '2013 Q2', item1: 8432, item2: 5713 }
        ],
        xkey: 'y',
        ykeys: ['item1', 'item2'],
        labels: ['Item 1', 'Item 2'],
        lineColors: ['#a0d0e0', '#3c8dbc'],
        hideHover: 'auto'
      });

      // LINE CHART
      var line = new Morris.Line({
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
          { y: '2013 Q2', item1: 8432 }
        ],
        xkey: 'y',
        ykeys: ['item1'],
        labels: ['Item 1'],
        lineColors: ['#3c8dbc'],
        hideHover: 'auto'
      });

      // DONUT CHART
      var donut = new Morris.Donut({
        element: 'sales-chart',
        resize: true,
        colors: ["#3c8dbc", "#f56954", "#00a65a"],
        data: [
          { label: "Download Sales", value: 12 },
          { label: "In-Store Sales", value: 30 },
          { label: "Mail-Order Sales", value: 20 }
        ],
        hideHover: 'auto'
      });

      // BAR CHART
      var bar = new Morris.Bar({
        element: 'bar-chart',
        resize: true,
        data: [
          { y: '2006', a: 100, b: 90 },
          { y: '2007', a: 75, b: 65 },
          { y: '2008', a: 50, b: 40 },
          { y: '2009', a: 75, b: 65 },
          { y: '2010', a: 50, b: 40 },
          { y: '2011', a: 75, b: 65 },
          { y: '2012', a: 100, b: 90 }
        ],
        barColors: ['#00a65a', '#f56954'],
        xkey: 'y',
        ykeys: ['a', 'b'],
        labels: ['CPU', 'DISK'],
        hideHover: 'auto'
      });
    });
  }

  render() {
    return (
      <Layout pageTitle={pageTitle} pageSubTitle={pageSubTitle}>
        <div>
          <div className="callout callout-warning">
            <h4>Warning!</h4>
            <p>
              <b>Morris.js</b>
              charts are no longer maintained by its author. We would recommend
              using any of the other charts that come with the template.
            </p>
          </div>
          <div className="row">
            <div className="col-md-6">
              { /* AREA CHART */ }
              <div className="box box-primary">
                <div className="box-header with-border">
                  <h3 className="box-title">
                    Area Chart
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
                <div className="box-body chart-responsive">
                  <div
                    className="chart" id="revenue-chart" style={{
                    height: 300,
                  }}
                  />
                </div>
                { /* /.box-body */ }
              </div>
              { /* /.box */ }
              { /* DONUT CHART */ }
              <div className="box box-danger">
                <div className="box-header with-border">
                  <h3 className="box-title">
                    Donut Chart
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
                <div className="box-body chart-responsive">
                  <div
                    className="chart" id="sales-chart" style={{
                    height: 300,
                    position: 'relative',
                  }}
                  />
                </div>
                { /* /.box-body */ }
              </div>
              { /* /.box */ }
            </div>
            { /* /.col (LEFT) */ }
            <div className="col-md-6">
              { /* LINE CHART */ }
              <div className="box box-info">
                <div className="box-header with-border">
                  <h3 className="box-title">
                    Line Chart
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
                <div className="box-body chart-responsive">
                  <div
                    className="chart" id="line-chart" style={{
                    height: 300,
                  }}
                  />
                </div>
                { /* /.box-body */ }
              </div>
              { /* /.box */ }
              { /* BAR CHART */ }
              <div className="box box-success">
                <div className="box-header with-border">
                  <h3 className="box-title">
                    Bar Chart
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
                <div className="box-body chart-responsive">
                  <div
                    className="chart" id="bar-chart" style={{
                    height: 300,
                  }}
                  />
                </div>
                { /* /.box-body */ }
              </div>
              { /* /.box */ }
            </div>
            { /* /.col (RIGHT) */ }
          </div>
          { /* /.row */ }
        </div>
      </Layout>
    );
  }

}

export default withStyles(s)(Morris);
