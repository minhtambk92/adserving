import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Layout from '../../../../components/Layout';
import s from './Sliders.css';

const pageTitle = 'Sliders';
const pageSubTitle = 'range sliders';

class Sliders extends Component {

  componentDidMount() {
    $(function () { // eslint-disable-line func-names, prefer-arrow-callback
      /* BOOTSTRAP SLIDER */
      $('.slider').bootstrapSlider();

      /* ION SLIDER */
      $('#range_1').ionRangeSlider({
        min: 0,
        max: 5000,
        from: 1000,
        to: 4000,
        type: 'double',
        step: 1,
        prefix: '$',
        prettify: false,
        hasGrid: true,
      });

      $('#range_2').ionRangeSlider({
        type: 'double',
      });

      $('#range_5').ionRangeSlider({
        min: 0,
        max: 10,
        type: 'single',
        step: 0.1,
        postfix: ' mm',
        prettify: false,
        hasGrid: true,
      });

      $('#range_6').ionRangeSlider({
        min: -50,
        max: 50,
        from: 0,
        type: 'single',
        step: 1,
        postfix: '°',
        prettify: false,
        hasGrid: true,
      });

      $('#range_4').ionRangeSlider({
        type: 'single',
        step: 100,
        postfix: ' light years',
        from: 55000,
        hideMinMax: true,
        hideFromTo: false,
      });

      $('#range_3').ionRangeSlider({
        type: 'double',
        postfix: ' miles',
        step: 10000,
        from: 25000000,
        to: 35000000,
        onChange(obj) {
          let t = '';
          for (let prop in obj) { // eslint-disable-line
            t += prop + ": " + obj[prop] + "\r\n"; // eslint-disable-line
          }
          $('#result').html(t);
        },
        onLoad(obj) { // eslint-disable-line no-unused-vars
          //
        },
      });
    });
  }

  render() {
    return (
      <Layout pageTitle={pageTitle} pageSubTitle={pageSubTitle}>
        <div>
          <div className="row">
            <div className="col-xs-12">
              <div className="box box-primary">
                <div className="box-header">
                  <h3 className="box-title">
                    Ion Slider
                  </h3>
                </div>
                { /* /.box-header */ }
                <div className="box-body">
                  <div className="row margin">
                    <div className="col-sm-6">
                      <input id="range_1" type="text" name="range_1" defaultValue/>
                    </div>
                    <div className="col-sm-6">
                      <input
                        id="range_2" type="text" name="range_2" defaultValue="1000;100000"
                        data-type="double" data-step={500} data-postfix=" €" data-from={30000}
                        data-to={90000} data-hasgrid="true"
                      />
                    </div>
                  </div>
                  <div className="row margin">
                    <div className="col-sm-6">
                      <input id="range_5" type="text" name="range_5" defaultValue/>
                    </div>
                    <div className="col-sm-6">
                      <input id="range_6" type="text" name="range_6" defaultValue/>
                    </div>
                  </div>
                  <div className="row margin">
                    <div className="col-sm-12">
                      <input id="range_4" type="text" name="range_4" defaultValue="10000;100000"/>
                    </div>
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
              <div className="box box-primary">
                <div className="box-header">
                  <h3 className="box-title">
                    Bootstrap Slider
                  </h3>
                </div>
                { /* /.box-header */ }
                <div className="box-body">
                  <div className="row margin">
                    <div className="col-sm-6">
                      <input
                        type="text" defaultValue className="slider form-control"
                        data-slider-min={-200} data-slider-max={200} data-slider-step={5}
                        data-slider-value="[-100,100]" data-slider-orientation="horizontal"
                        data-slider-selection="before" data-slider-tooltip="show"
                        data-slider-id="red"
                      />
                      <p>data-slider-id="red"</p>
                      <input
                        type="text" defaultValue className="slider form-control"
                        data-slider-min={-200} data-slider-max={200} data-slider-step={5}
                        data-slider-value="[-100,100]" data-slider-orientation="horizontal"
                        data-slider-selection="before" data-slider-tooltip="show"
                        data-slider-id="blue"
                      />
                      <p>data-slider-id="blue"</p>
                      <input
                        type="text" defaultValue className="slider form-control"
                        data-slider-min={-200} data-slider-max={200} data-slider-step={5}
                        data-slider-value="[-100,100]" data-slider-orientation="horizontal"
                        data-slider-selection="before" data-slider-tooltip="show"
                        data-slider-id="green"
                      />
                      <p>data-slider-id="green"</p>
                      <input
                        type="text" defaultValue className="slider form-control"
                        data-slider-min={-200} data-slider-max={200} data-slider-step={5}
                        data-slider-value="[-100,100]" data-slider-orientation="horizontal"
                        data-slider-selection="before" data-slider-tooltip="show"
                        data-slider-id="yellow"
                      />
                      <p>data-slider-id="yellow"</p>
                      <input
                        type="text" defaultValue className="slider form-control"
                        data-slider-min={-200} data-slider-max={200} data-slider-step={5}
                        data-slider-value="[-100,100]" data-slider-orientation="horizontal"
                        data-slider-selection="before" data-slider-tooltip="show"
                        data-slider-id="aqua"
                      />
                      <p>data-slider-id="aqua"</p>
                      <input
                        type="text" defaultValue className="slider form-control"
                        data-slider-min={-200} data-slider-max={200} data-slider-step={5}
                        data-slider-value="[-100,100]" data-slider-orientation="horizontal"
                        data-slider-selection="before" data-slider-tooltip="show"
                        data-slider-id="purple"
                      />
                      <p style={{ marginTop: 10 }}>data-slider-id="purple"</p>
                    </div>
                    <div className="col-sm-6 text-center">
                      <input
                        type="text" defaultValue className="slider form-control"
                        data-slider-min={-200} data-slider-max={200} data-slider-step={5}
                        data-slider-value="[-100,100]" data-slider-orientation="vertical"
                        data-slider-selection="before" data-slider-tooltip="show"
                        data-slider-id="red"
                      />
                      <input
                        type="text" defaultValue className="slider form-control"
                        data-slider-min={-200} data-slider-max={200} data-slider-step={5}
                        data-slider-value="[-100,100]" data-slider-orientation="vertical"
                        data-slider-selection="before" data-slider-tooltip="show"
                        data-slider-id="blue"
                      />
                      <input
                        type="text" defaultValue className="slider form-control"
                        data-slider-min={-200} data-slider-max={200} data-slider-step={5}
                        data-slider-value="[-100,100]" data-slider-orientation="vertical"
                        data-slider-selection="before" data-slider-tooltip="show"
                        data-slider-id="green"
                      />
                      <input
                        type="text" defaultValue className="slider form-control"
                        data-slider-min={-200} data-slider-max={200} data-slider-step={5}
                        data-slider-value="[-100,100]" data-slider-orientation="vertical"
                        data-slider-selection="before" data-slider-tooltip="show"
                        data-slider-id="yellow"
                      />
                      <input
                        type="text" defaultValue className="slider form-control"
                        data-slider-min={-200} data-slider-max={200} data-slider-step={5}
                        data-slider-value="[-100,100]" data-slider-orientation="vertical"
                        data-slider-selection="before" data-slider-tooltip="show"
                        data-slider-id="aqua"
                      />
                      <input
                        type="text" defaultValue className="slider form-control"
                        data-slider-min={-200} data-slider-max={200} data-slider-step={5}
                        data-slider-value="[-100,100]" data-slider-orientation="vertical"
                        data-slider-selection="before" data-slider-tooltip="show"
                        data-slider-id="purple"
                      />
                    </div>
                  </div>
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

export default withStyles(s)(Sliders);
