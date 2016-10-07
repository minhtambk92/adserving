import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Layout from '../../../../components/Layout';
import s from './Flot.css';

const pageTitle = 'Flot Charts';
const pageSubTitle = 'Preview sample';

class Flot extends Component {

  componentDidMount() {
    $(() => {
      /*
       * Flot Interactive Chart
       * -----------------------
       */
      // We use an inline data source in the example, usually data would
      // be fetched from a server
      let data = [];
      let totalPoints = 100; // eslint-disable-line prefer-const

      function getRandomData() {
        if (data.length > 0) {
          data = data.slice(1);
        }

        // Do a random walk
        while (data.length < totalPoints) {
          let prev = data.length > 0 ? data[data.length - 1] : 50;  // eslint-disable-line
                                                                    // prefer-const, max-len
          let y = prev + Math.random() * 10 - 5; // eslint-disable-line no-mixed-operators

          if (y < 0) {
            y = 0;
          } else if (y > 100) {
            y = 100;
          }

          data.push(y);
        }

        // Zip the generated y values with the x values
        let res = []; // eslint-disable-line prefer-const
        for (let i = 0; i < data.length; ++i) {
          res.push([i, data[i]]);
        }

        return res;
      }

      let interactive_plot = $.plot('#interactive', [getRandomData()], { // eslint-disable-line camelcase, max-len, prefer-const
        grid: {
          borderColor: '#f3f3f3',
          borderWidth: 1,
          tickColor: '#f3f3f3',
        },
        series: {
          shadowSize: 0, // Drawing is faster without shadows
          color: '#3c8dbc',
        },
        lines: {
          fill: true, // Converts the line chart to area chart
          color: '#3c8dbc',
        },
        yaxis: {
          min: 0,
          max: 100,
          show: true,
        },
        xaxis: {
          show: true,
        },
      });

      // Fetch data ever x milliseconds
      let updateInterval = 500; // eslint-disable-line prefer-const
      let realtime = 'on'; // If == to on then fetch data every x seconds. else stop fetching
      function update() {
        interactive_plot.setData([getRandomData()]);

        // Since the axes don't change, we don't need to call plot.setupGrid()
        interactive_plot.draw();
        if (realtime === 'on') {
          setTimeout(update, updateInterval);
        }
      }

      // INITIALIZE REALTIME DATA FETCHING
      if (realtime === 'on') {
        update();
      }

      // REALTIME TOGGLE
      $('#realtime .btn').click(() => {
        if ($(this).data('toggle') === 'on') {
          realtime = 'on';
        } else {
          realtime = 'off';
        }
        update();
      });
      /*
       * END INTERACTIVE CHART
       */

      /*
       * LINE CHART
       * ----------
       */
      // LINE randomly generated data
      let sin = []; // eslint-disable-line prefer-const
      let cos = []; // eslint-disable-line prefer-const
      for (let i = 0; i < 14; i += 0.5) {
        sin.push([i, Math.sin(i)]);
        cos.push([i, Math.cos(i)]);
      }
      let line_data1 = { // eslint-disable-line camelcase, prefer-let, prefer-const
        data: sin,
        color: '#3c8dbc',
      };
      let line_data2 = { // eslint-disable-line camelcase, prefer-let, prefer-const
        data: cos,
        color: '#00c0ef',
      };
      $.plot('#line-chart', [
        line_data1, line_data2, // eslint-disable-line camelcase
      ], {
        grid: {
          hoverable: true,
          borderColor: '#f3f3f3',
          borderWidth: 1,
          tickColor: '#f3f3f3',
        },
        series: {
          shadowSize: 0,
          lines: {
            show: true,
          },
          points: {
            show: true,
          },
        },
        lines: {
          fill: false,
          color: ['#3c8dbc', '#f56954'],
        },
        yaxis: {
          show: true,
        },
        xaxis: {
          show: true,
        },
      });

      // Initialize tooltip on hover
      $('<div class="tooltip-inner" id="line-chart-tooltip"></div>').css({
        position: 'absolute',
        display: 'none',
        opacity: 0.8,
      }).appendTo('body');
      $('#line-chart').bind('plothover', (event, pos, item) => {
        if (item) {
          let x = item.datapoint[0].toFixed(2); // eslint-disable-line prefer-const
          let y = item.datapoint[1].toFixed(2); // eslint-disable-line prefer-const

          $('#line-chart-tooltip').html(item.series.label + ' of ' + x + ' = ' + y).css({ // eslint-disable-line prefer-template, max-len
            top: item.pageY + 5,
            left: item.pageX + 5,
          }).fadeIn(200);
        } else {
          $('#line-chart-tooltip').hide();
        }
      });
      /* END LINE CHART */

      /*
       * FULL WIDTH STATIC AREA CHART
       * -----------------
       */
      let areaData = [  // eslint-disable-line prefer-const
        [
          2, 88.0,
        ],
        [
          3, 93.3,
        ],
        [
          4, 102.0,
        ],
        [
          5, 108.5,
        ],
        [
          6, 115.7,
        ],
        [
          7, 115.6,
        ],
        [
          8, 124.6,
        ],
        [
          9, 130.3,
        ],
        [
          10, 134.3,
        ],
        [
          11, 141.4,
        ],
        [
          12, 146.5,
        ],
        [
          13, 151.7,
        ],
        [
          14, 159.9,
        ],
        [
          15, 165.4,
        ],
        [
          16, 167.8,
        ],
        [
          17, 168.7,
        ],
        [
          18, 169.5,
        ],
        [19, 168.0],
      ];

      $.plot('#area-chart', [areaData], {
        grid: {
          borderWidth: 0,
        },
        series: {
          shadowSize: 0, // Drawing is faster without shadows
          color: '#00c0ef',
        },
        lines: {
          fill: true, //Converts the line chart to area chart
        },
        yaxis: {
          show: false,
        },
        xaxis: {
          show: false,
        },
      });

      /* END AREA CHART */

      /*
       * BAR CHART
       * ---------
       */

      let bar_data = { // eslint-disable-line camelcase, prefer-const
        data: [
          ['January', 10],
          ['February', 8],
          ['March', 4],
          ['April', 13],
          ['May', 17],
          ['June', 9],
        ],
        color: '#3c8dbc',
      };

      $.plot('#bar-chart', [bar_data], { // eslint-disable-line camelcase
        grid: {
          borderWidth: 1,
          borderColor: '#f3f3f3',
          tickColor: '#f3f3f3',
        },
        series: {
          bars: {
            show: true,
            barWidth: 0.5,
            align: 'center',
          },
        },
        xaxis: {
          mode: 'categories',
          tickLength: 0,
        },
      });
      /* END BAR CHART */

      /*
       * DONUT CHART
       * -----------
       */

      let donutData = [ // eslint-disable-line prefer-const
        {
          label: 'Series2',
          data: 30,
          color: '#3c8dbc',
        }, {
          label: 'Series3',
          data: 20,
          color: '#0073b7',
        }, {
          label: 'Series4',
          data: 50,
          color: '#00c0ef',
        },
      ];

      $.plot('#donut-chart', donutData, {
        series: {
          pie: {
            show: true,
            radius: 1,
            innerRadius: 0.5,
            label: {
              show: true,
              radius: 2 / 3,
              formatter: labelFormatter, // eslint-disable-line no-use-before-define
              threshold: 0.1,
            },
          },
        },
        legend: {
          show: false,
        },
      });
      /*
       * END DONUT CHART
       */
    });

    /*
     * Custom Label formatter
     * ----------------------
     */
    function labelFormatter(label, series) {
      return '<div style="font-size:13px; text-align:center; padding:2px; color: #fff; font-weight: 600;">'.concat(label).concat('<br>').concat(Math.round(series.percent)).concat('%</div>'); // eslint-disable-line max-len
    }
  }

  render() {
    return (
      <Layout pageTitle={pageTitle} pageSubTitle={pageSubTitle}>
        <div>
          <div className="row">
            <div className="col-xs-12">
              { /* interactive chart */ }
              <div className="box box-primary">
                <div className="box-header with-border">
                  <i className="fa fa-bar-chart-o"/>
                  <h3 className="box-title">
                    Interactive Area Chart
                  </h3>
                  <div className="box-tools pull-right">
                    Real time
                    <div className="btn-group" id="realtime" data-toggle="btn-toggle">
                      <button
                        type="button" className="btn btn-default btn-xs active"
                        data-toggle="on"
                      >On
                      </button>
                      <button
                        type="button" className="btn btn-default btn-xs"
                        data-toggle="off"
                      >Off
                      </button>
                    </div>
                  </div>
                </div>
                <div className="box-body">
                  <div id="interactive" style={{ height: 300 }}/>
                </div>
                { /* /.box-body*/ }
              </div>
              { /* /.box */ }
            </div>
            { /* /.col */ }
          </div>
          { /* /.row */ }
          <div className="row">
            <div className="col-md-6">
              { /* Line chart */ }
              <div className="box box-primary">
                <div className="box-header with-border">
                  <i className="fa fa-bar-chart-o"/>
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
                <div className="box-body">
                  <div id="line-chart" style={{ height: 300 }}/>
                </div>
                { /* /.box-body*/ }
              </div>
              { /* /.box */ }
              { /* Area chart */ }
              <div className="box box-primary">
                <div className="box-header with-border">
                  <i className="fa fa-bar-chart-o"/>
                  <h3 className="box-title">
                    Full Width Area Chart
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
                <div className="box-body">
                  <div
                    id="area-chart" style={{ height: 338 }}
                    className="full-width-chart"
                  />
                </div>
                { /* /.box-body*/ }
              </div>
              { /* /.box */ }
            </div>
            { /* /.col */ }
            <div className="col-md-6">
              { /* Bar chart */ }
              <div className="box box-primary">
                <div className="box-header with-border">
                  <i className="fa fa-bar-chart-o"/>
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
                <div className="box-body">
                  <div id="bar-chart" style={{ height: 300 }}/>
                </div>
                { /* /.box-body*/ }
              </div>
              { /* /.box */ }
              { /* Donut chart */ }
              <div className="box box-primary">
                <div className="box-header with-border">
                  <i className="fa fa-bar-chart-o"/>
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
                <div className="box-body">
                  <div id="donut-chart" style={{ height: 300 }}/>
                </div>
                { /* /.box-body*/ }
              </div>
              { /* /.box */ }
            </div>
            { /* /.col */ }
          </div>
          { /* /.row */ }
        </div>
      </Layout>
    );
  }

}

export default withStyles(s)(Flot);
