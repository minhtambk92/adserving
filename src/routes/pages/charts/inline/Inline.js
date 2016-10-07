import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Layout from '../../../../components/Layout';
import s from './Inline.css';

const pageTitle = 'Inline Charts';
const pageSubTitle = 'Preview sample';

class Inline extends Component {

  componentDidMount() {
    $(() => {
      /* jQueryKnob */

      $(".knob").knob({
        /*change : function (value) {
         //console.log("change : " + value);
         },
         release : function (value) {
         console.log("release : " + value);
         },
         cancel : function () {
         console.log("cancel : " + this.value);
         },*/
        draw: function () {

          // "tron" case
          if (this.$.data('skin') == 'tron') {

            var a = this.angle(this.cv), // Angle
              sa = this.startAngle, // Previous start angle
              sat = this.startAngle, // Start angle
              ea, // Previous end angle
              eat = sat + a, // End angle
              r = true;

            this.g.lineWidth = this.lineWidth;

            this.o.cursor && (sat = eat - 0.3) && (eat = eat + 0.3);

            if (this.o.displayPrevious) {
              ea = this.startAngle + this.angle(this.value);
              this.o.cursor && (sa = ea - 0.3) && (ea = ea + 0.3);
              this.g.beginPath();
              this.g.strokeStyle = this.previousColor;
              this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, sa, ea, false);
              this.g.stroke();
            }

            this.g.beginPath();
            this.g.strokeStyle = r
              ? this.o.fgColor
              : this.fgColor;
            this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, sat, eat, false);
            this.g.stroke();

            this.g.lineWidth = 2;
            this.g.beginPath();
            this.g.strokeStyle = this.o.fgColor;
            this.g.arc(this.xy, this.xy, this.radius - this.lineWidth + 1 + this.lineWidth * 2 / 3, 0, 2 * Math.PI, false);
            this.g.stroke();

            return false;
          }
        }
      });
      /* END JQUERY KNOB */

      //INITIALIZE SPARKLINE CHARTS
      $(".sparkline").each(function () {
        var $this = $(this);
        $this.sparkline('html', $this.data());
      });

      /* SPARKLINE DOCUMENTATION EXAMPLES http://omnipotent.net/jquery.sparkline/#s-about */
      drawDocSparklines();
      drawMouseSpeedDemo();

    });
    function drawDocSparklines() {

      // Bar + line composite charts
      $('#compositebar').sparkline('html', {
        type: 'bar',
        barColor: '#aaf'
      });
      $('#compositebar').sparkline([
        4,
        1,
        5,
        7,
        9,
        9,
        8,
        7,
        6,
        6,
        4,
        7,
        8,
        4,
        3,
        2,
        2,
        5,
        6,
        7
      ], {
        composite: true,
        fillColor: false,
        lineColor: 'red'
      });

      // Line charts taking their values from the tag
      $('.sparkline-1').sparkline();

      // Larger line charts for the docs
      $('.largeline').sparkline('html', {
        type: 'line',
        height: '2.5em',
        width: '4em'
      });

      // Customized line chart
      $('#linecustom').sparkline('html', {
        height: '1.5em',
        width: '8em',
        lineColor: '#f00',
        fillColor: '#ffa',
        minSpotColor: false,
        maxSpotColor: false,
        spotColor: '#77f',
        spotRadius: 3
      });

      // Bar charts using inline values
      $('.sparkbar').sparkline('html', {
        type: 'bar'
      });

      $('.barformat').sparkline([
        1, 3, 5, 3, 8
      ], {
        type: 'bar',
        tooltipFormat: '{{value:levels}} - {{value}}',
        tooltipValueLookups: {
          levels: $.range_map({
            ':2': 'Low',
            '3:6': 'Medium',
            '7:': 'High'
          })
        }
      });

      // Tri-state charts using inline values
      $('.sparktristate').sparkline('html', {
        type: 'tristate'
      });
      $('.sparktristatecols').sparkline('html', {
        type: 'tristate',
        colorMap: {
          '-2': '#fa7',
          '2': '#44f'
        }
      });

      // Composite line charts, the second using values supplied via javascript
      $('#compositeline').sparkline('html', {
        fillColor: false,
        changeRangeMin: 0,
        chartRangeMax: 10
      });
      $('#compositeline').sparkline([
        4,
        1,
        5,
        7,
        9,
        9,
        8,
        7,
        6,
        6,
        4,
        7,
        8,
        4,
        3,
        2,
        2,
        5,
        6,
        7
      ], {
        composite: true,
        fillColor: false,
        lineColor: 'red',
        changeRangeMin: 0,
        chartRangeMax: 10
      });

      // Line charts with normal range marker
      $('#normalline').sparkline('html', {
        fillColor: false,
        normalRangeMin: -1,
        normalRangeMax: 8
      });
      $('#normalExample').sparkline('html', {
        fillColor: false,
        normalRangeMin: 80,
        normalRangeMax: 95,
        normalRangeColor: '#4f4'
      });

      // Discrete charts
      $('.discrete1').sparkline('html', {
        type: 'discrete',
        lineColor: 'blue',
        xwidth: 18
      });
      $('#discrete2').sparkline('html', {
        type: 'discrete',
        lineColor: 'blue',
        thresholdColor: 'red',
        thresholdValue: 4
      });

      // Bullet charts
      $('.sparkbullet').sparkline('html', {
        type: 'bullet'
      });

      // Pie charts
      $('.sparkpie').sparkline('html', {
        type: 'pie',
        height: '1.0em'
      });

      // Box plots
      $('.sparkboxplot').sparkline('html', {
        type: 'box'
      });
      $('.sparkboxplotraw').sparkline([
        1,
        3,
        5,
        8,
        10,
        15,
        18
      ], {
        type: 'box',
        raw: true,
        showOutliers: true,
        target: 6
      });

      // Box plot with specific field order
      $('.boxfieldorder').sparkline('html', {
        type: 'box',
        tooltipFormatFieldlist: [
          'med', 'lq', 'uq'
        ],
        tooltipFormatFieldlistKey: 'field'
      });

      // click event demo sparkline
      $('.clickdemo').sparkline();
      $('.clickdemo').bind('sparklineClick', function (ev) {
        var sparkline = ev.sparklines[0],
          region = sparkline.getCurrentRegionFields();
        value = region.y;
        alert("Clicked on x=" + region.x + " y=" + region.y);
      });

      // mouseover event demo sparkline
      $('.mouseoverdemo').sparkline();
      $('.mouseoverdemo').bind('sparklineRegionChange', function (ev) {
        var sparkline = ev.sparklines[0],
          region = sparkline.getCurrentRegionFields();
        value = region.y;
        $('.mouseoverregion').text("x=" + region.x + " y=" + region.y);
      }).bind('mouseleave', function () {
        $('.mouseoverregion').text('');
      });
    }

    /**
     ** Draw the little mouse speed animated graph
     ** This just attaches a handler to the mousemove event to see
     ** (roughly) how far the mouse has moved
     ** and then updates the display a couple of times a second via
     ** setTimeout()
     **/
    function drawMouseSpeedDemo() {
      var mrefreshinterval = 500; // update display every 500ms
      var lastmousex = -1;
      var lastmousey = -1;
      var lastmousetime;
      var mousetravel = 0;
      var mpoints = [];
      var mpoints_max = 30;
      $('html').mousemove(function (e) {
        var mousex = e.pageX;
        var mousey = e.pageY;
        if (lastmousex > -1) {
          mousetravel += Math.max(Math.abs(mousex - lastmousex), Math.abs(mousey - lastmousey));
        }
        lastmousex = mousex;
        lastmousey = mousey;
      });
      var mdraw = function () {
        var md = new Date();
        var timenow = md.getTime();
        if (lastmousetime && lastmousetime != timenow) {
          var pps = Math.round(mousetravel / (timenow - lastmousetime) * 1000);
          mpoints.push(pps);
          if (mpoints.length > mpoints_max)
            mpoints.splice(0, 1);
          mousetravel = 0;
          $('#mousespeed').sparkline(mpoints, {
            width: mpoints.length * 2,
            tooltipSuffix: ' pixels per second'
          });
        }
        lastmousetime = timenow;
        setTimeout(mdraw, mrefreshinterval);
      };
      // We could use setInterval instead, but I prefer to do it this way
      setTimeout(mdraw, mrefreshinterval);
    }
  }

  render() {
    return (
      <Layout pageTitle={pageTitle} pageSubTitle={pageSubTitle}>
        <div>
          { /* row */ }
          <div className="row">
            <div className="col-xs-12">
              { /* jQuery Knob */ }
              <div className="box box-solid">
                <div className="box-header">
                  <i className="fa fa-bar-chart-o"/>
                  <h3 className="box-title">
                    jQuery Knob
                  </h3>
                  <div className="box-tools pull-right">
                    <button type="button" className="btn btn-default btn-sm" data-widget="collapse">
                      <i className="fa fa-minus"/>
                    </button>
                    <button type="button" className="btn btn-default btn-sm" data-widget="remove">
                      <i className="fa fa-times"/>
                    </button>
                  </div>
                </div>
                { /* /.box-header */ }
                <div className="box-body">
                  <div className="row">
                    <div className="col-xs-6 col-md-3 text-center">
                      <input type="text" className="knob" defaultValue={30} data-width={90}
                             data-height={90} data-fgcolor="#3c8dbc"/>
                      <div className="knob-label">
                        New Visitors
                      </div>
                    </div>
                    { /* ./col */ }
                    <div className="col-xs-6 col-md-3 text-center">
                      <input type="text" className="knob" defaultValue={70} data-width={90}
                             data-height={90} data-fgcolor="#f56954"/>
                      <div className="knob-label">
                        Bounce Rate
                      </div>
                    </div>
                    { /* ./col */ }
                    <div className="col-xs-6 col-md-3 text-center">
                      <input type="text" className="knob" defaultValue={-80} data-min={-150}
                             data-max={150} data-width={90} data-height={90}
                             data-fgcolor="#00a65a"/>
                      <div className="knob-label">
                        Server Load
                      </div>
                    </div>
                    { /* ./col */ }
                    <div className="col-xs-6 col-md-3 text-center">
                      <input type="text" className="knob" defaultValue={40} data-width={90}
                             data-height={90} data-fgcolor="#00c0ef"/>
                      <div className="knob-label">
                        Disk Space
                      </div>
                    </div>
                    { /* ./col */ }
                  </div>
                  { /* /.row */ }
                  <div className="row">
                    <div className="col-xs-6 text-center">
                      <input type="text" className="knob" defaultValue={90} data-width={90}
                             data-height={90} data-fgcolor="#932ab6"/>
                      <div className="knob-label">Bandwidth</div>
                    </div>
                    { /* ./col */ }
                    <div className="col-xs-6 text-center">
                      <input type="text" className="knob" defaultValue={50} data-width={90}
                             data-height={90} data-fgcolor="#39CCCC"/>
                      <div className="knob-label">CPU</div>
                    </div>
                    { /* ./col */ }
                  </div>
                  { /* /.row */ }
                </div>
                { /* /.box-body */ }
              </div>
              { /* /.box */ }
            </div>
            { /* /.col */ }
          </div>
          { /* /.row */ }
          <div className="row">
            <div className="col-xs-12">
              <div className="box box-solid">
                <div className="box-header">
                  <i className="fa fa-bar-chart-o"/>
                  <h3 className="box-title">
                    jQuery Knob Different Sizes
                  </h3>
                  <div className="box-tools pull-right">
                    <button type="button" className="btn btn-default btn-sm" data-widget="collapse">
                      <i className="fa fa-minus"/>
                    </button>
                    <button type="button" className="btn btn-default btn-sm" data-widget="remove">
                      <i className="fa fa-times"/>
                    </button>
                  </div>
                </div>
                { /* /.box-header */ }
                <div className="box-body">
                  <div className="row">
                    <div className="col-xs-6 col-md-3 text-center">
                      <input type="text" className="knob" defaultValue={30} data-width={90}
                             data-height={90} data-fgcolor="#3c8dbc" data-readonly="true"/>
                      <div className="knob-label">data-width="90"</div>
                    </div>
                    { /* ./col */ }
                    <div className="col-xs-6 col-md-3 text-center">
                      <input type="text" className="knob" defaultValue={30} data-width={120}
                             data-height={120} data-fgcolor="#f56954"/>
                      <div className="knob-label">data-width="120"</div>
                    </div>
                    { /* ./col */ }
                    <div className="col-xs-6 col-md-3 text-center">
                      <input type="text" className="knob" defaultValue={30} data-thickness="0.1"
                             data-width={90} data-height={90} data-fgcolor="#00a65a"/>
                      <div className="knob-label">data-thickness="0.1"</div>
                    </div>
                    { /* ./col */ }
                    <div className="col-xs-6 col-md-3 text-center">
                      <input type="text" className="knob" data-thickness="0.2" data-anglearc={250}
                             data-angleoffset={-125} defaultValue={30} data-width={120}
                             data-height={120} data-fgcolor="#00c0ef"/>
                      <div className="knob-label">data-angleArc="250"</div>
                    </div>
                    { /* ./col */ }
                  </div>
                  { /* /.row */ }
                </div>
                { /* /.box-body */ }
              </div>
              { /* /.box */ }
            </div>
            { /* /.col */ }
          </div>
          { /* /.row */ }
          <div className="row">
            <div className="col-xs-12">
              <div className="box box-solid">
                <div className="box-header">
                  <i className="fa fa-bar-chart-o"/>
                  <h3 className="box-title">
                    jQuery Knob Tron Style
                  </h3>
                  <div className="box-tools pull-right">
                    <button type="button" className="btn btn-default btn-sm" data-widget="collapse">
                      <i className="fa fa-minus"/>
                    </button>
                    <button type="button" className="btn btn-default btn-sm" data-widget="remove">
                      <i className="fa fa-times"/>
                    </button>
                  </div>
                </div>
                { /* /.box-header */ }
                <div className="box-body">
                  <div className="row">
                    <div className="col-xs-6 col-md-3 text-center">
                      <input type="text" className="knob" defaultValue={80} data-skin="tron"
                             data-thickness="0.2" data-width={90} data-height={90}
                             data-fgcolor="#3c8dbc" data-readonly="true"/>
                      <div className="knob-label">data-width="90"</div>
                    </div>
                    { /* ./col */ }
                    <div className="col-xs-6 col-md-3 text-center">
                      <input type="text" className="knob" defaultValue={60} data-skin="tron"
                             data-thickness="0.2" data-width={120} data-height={120}
                             data-fgcolor="#f56954"/>
                      <div className="knob-label">data-width="120"</div>
                    </div>
                    { /* ./col */ }
                    <div className="col-xs-6 col-md-3 text-center">
                      <input type="text" className="knob" defaultValue={10} data-skin="tron"
                             data-thickness="0.1" data-width={90} data-height={90}
                             data-fgcolor="#00a65a"/>
                      <div className="knob-label">data-thickness="0.1"</div>
                    </div>
                    { /* ./col */ }
                    <div className="col-xs-6 col-md-3 text-center">
                      <input type="text" className="knob" defaultValue={100} data-skin="tron"
                             data-thickness="0.2" data-anglearc={250} data-angleoffset={-125}
                             data-width={120} data-height={120} data-fgcolor="#00c0ef"/>
                      <div className="knob-label">data-angleArc="250"</div>
                    </div>
                    { /* ./col */ }
                  </div>
                  { /* /.row */ }
                </div>
                { /* /.box-body */ }
              </div>
              { /* /.box */ }
            </div>
            { /* /.col */ }
          </div>
          { /* /.row */ }
          { /* callout */ }
          <div className="callout callout-info">
            <h4>
              The following was created using data tags
            </h4>
            <p>
              The following three inline (sparkline) chart have been initialized to read and
              interpret data tags
            </p>
          </div>
          { /* /.callout */ }
          <div className="row">
            <div className="col-md-4">
              <div className="box box-solid">
                <div className="box-header">
                  <h3 className="box-title text-danger">
                    Sparkline Pie
                  </h3>
                  <div className="box-tools pull-right">
                    <button type="button" className="btn btn-default btn-sm">
                      <i className="fa fa-refresh"/>
                    </button>
                  </div>
                </div>
                { /* /.box-header */ }
                <div className="box-body text-center">
                  <div className="sparkline" data-type="pie" data-offset={90} data-width="100px"
                       data-height="100px">
                    6,4,8
                  </div>
                </div>
                { /* /.box-body */ }
              </div>
              { /* /.box */ }
            </div>
            { /* /.col */ }
            <div className="col-md-4">
              <div className="box box-solid">
                <div className="box-header">
                  <h3 className="box-title text-blue">
                    Sparkline line
                  </h3>
                  <div className="box-tools pull-right">
                    <button type="button" className="btn btn-default btn-sm">
                      <i className="fa fa-refresh"/>
                    </button>
                  </div>
                </div>
                { /* /.box-header */ }
                <div className="box-body text-center">
                  <div className="sparkline" data-type="line" data-spot-radius={3}
                       data-highlight-spot-color="#f39c12" data-highlight-line-color="#222"
                       data-min-spot-color="#f56954" data-max-spot-color="#00a65a"
                       data-spot-color="#39CCCC" data-offset={90} data-width="100%"
                       data-height="100px" data-line-width={2} data-line-color="#39CCCC"
                       data-fill-color="rgba(57, 204, 204, 0.08)">
                    6,4,7,8,4,3,2,2,5,6,7,4,1,5,7,9,9,8,7,6
                  </div>
                </div>
                { /* /.box-body */ }
              </div>
              { /* /.box */ }
            </div>
            { /* /.col */ }
            <div className="col-md-4">
              <div className="box box-solid">
                <div className="box-header">
                  <h3 className="box-title text-warning">
                    Sparkline Bar
                  </h3>
                  <div className="box-tools pull-right">
                    <button type="button" className="btn btn-default btn-sm">
                      <i className="fa fa-refresh"/>
                    </button>
                  </div>
                </div>
                { /* /.box-header */ }
                <div className="box-body text-center">
                  <div className="sparkline" data-type="bar" data-width="97%" data-height="100px"
                       data-bar-width={14} data-bar-spacing={7} data-bar-color="#f39c12">
                    6,4,8, 9, 10, 5, 13, 18, 21, 7, 9
                  </div>
                </div>
                { /* /.box-body */ }
              </div>
              { /* /.box */ }
            </div>
            { /* /.col */ }
          </div>
          { /* /.row */ }
          <div className="row">
            <div className="col-xs-12">
              <div className="box box-solid">
                <div className="box-header">
                  <h3 className="box-title">
                    Sparkline examples
                  </h3>
                  <div className="box-tools pull-right">
                    <button type="button" className="btn btn-default btn-sm" data-widget="collapse">
                      <i className="fa fa-minus"/>
                    </button>
                    <button type="button" className="btn btn-default btn-sm" data-widget="remove">
                      <i className="fa fa-times"/>
                    </button>
                  </div>
                </div>
                { /* /.box-header */ }
                <div id="myBody" className="box-body">
                  <div className="row">
                    <div className="col-sm-6">
                      <p>
                        Mouse speed
                        <span id="mousespeed">Loading..</span>
                      </p>
                      <p>
                        Inline
                        <span className="sparkline-1">10,8,9,3,5,8,5</span>
                        line graphs
                        <span
                          className="sparkline-1">8,4,0,0,0,0,1,4,4,10,10,10,10,0,0,0,4,6,5,9,10</span>
                      </p>
                      <p>
                        Bar charts
                        <span className="sparkbar">10,8,9,3,5,8,5</span>
                        negative values:
                        <span className="sparkbar">-3,1,2,0,3,-1</span>
                        stacked:
                        <span className="sparkbar">0:2,2:4,4:2,4:1</span>
                      </p>
                      <p>
                        Composite inline
                        <span
                          id="compositeline">8,4,0,0,0,0,1,4,4,10,10,10,10,0,0,0,4,6,5,9,10</span>
                      </p>
                      <p>
                        Inline with normal range
                        <span id="normalline">8,4,0,0,0,0,1,4,4,10,10,10,10,0,0,0,4,6,5,9,10</span>
                      </p>
                      <p>
                        Composite bar
                        <span id="compositebar">4,6,7,7,4,3,2,1,4</span>
                      </p>
                      <p>
                        Discrete
                        <span className="discrete1">4,6,7,7,4,3,2,1,4,4,5,6,7,6,6,2,4,5</span>
                        <br/>
                        Discrete with threshold
                        <span id="discrete2">4,6,7,7,4,3,2,1,4</span>
                      </p>
                      <p>
                        Bullet charts<br/>
                        <span className="sparkbullet">10,12,12,9,7</span>
                        <br/>
                        <span className="sparkbullet">14,12,12,9,7</span>
                        <br/>
                        <span className="sparkbullet">10,12,14,9,7</span>
                        <br/>
                      </p>
                    </div>
                    { /* /.col */ }
                    <div className="col-sm-6">
                      <p>
                        Customize size and colours
                        <span id="linecustom">10,8,9,3,5,8,5,7</span>
                      </p>
                      <p>
                        Tristate charts
                        <span className="sparktristate">1,1,0,1,-1,-1,1,-1,0,0,1,1</span>
                        <br/>
                        (think games won, lost or drawn)
                      </p>
                      <p>
                        Tristate chart using a colour map:
                        <span className="sparktristatecols">1,2,0,2,-1,-2,1,-2,0,0,1,1</span>
                      </p>
                      <p>
                        Box Plot:
                        <span
                          className="sparkboxplot">4,27,34,52,54,59,61,68,78,82,85,87,91,93,100</span>
                        <br/>
                        Pre-computed box plot
                        <span className="sparkboxplotraw">Loading..</span>
                      </p>
                      <p>
                        Pie charts
                        <span className="sparkpie">1,1,2</span>
                        <span className="sparkpie">1,5</span>
                        <span className="sparkpie">20,50,80</span>
                      </p>
                    </div>
                    { /* /.col */ }
                  </div>
                  { /* /.row */ }
                </div>
                { /* /.box-body */ }
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

export default withStyles(s)(Inline);
