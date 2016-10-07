import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Layout from '../../../../components/Layout';
import Link from '../../../../components/Link';
import s from './AdvancedElements.css';

const pageTitle = 'Advanced Form Elements';
const pageSubTitle = 'Preview';

class AdvancedElements extends Component {

  componentDidMount() {
    $(function () {
      //Initialize Select2 Elements
      $(".select2").select2();

      //Datemask dd/mm/yyyy
      $("#datemask").inputmask("dd/mm/yyyy", {
        "placeholder": "dd/mm/yyyy"
      });
      //Datemask2 mm/dd/yyyy
      $("#datemask2").inputmask("mm/dd/yyyy", {
        "placeholder": "mm/dd/yyyy"
      });
      //Money Euro
      $("[data-mask]").inputmask();

      //Date range picker
      $('#reservation').daterangepicker();
      //Date range picker with time picker
      $('#reservationtime').daterangepicker({
        timePicker: true,
        timePickerIncrement: 30,
        format: 'MM/DD/YYYY h:mm A'
      });
      //Date range as a button
      $('#daterange-btn').daterangepicker(
        {
          ranges: {
            'Today': [moment(), moment()],
            'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            'Last 7 Days': [moment().subtract(6, 'days'), moment()],
            'Last 30 Days': [moment().subtract(29, 'days'), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
            'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
          },
          startDate: moment().subtract(29, 'days'),
          endDate: moment()
        },
        function (start, end) {
          $('#daterange-btn span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
        }
      );

      //Date picker
      $('#datepicker').datepicker({
        autoclose: true
      });

      //iCheck for checkbox and radio inputs
      $('input[type="checkbox"].minimal, input[type="radio"].minimal').iCheck({
        checkboxClass: 'icheckbox_minimal-blue',
        radioClass: 'iradio_minimal-blue'
      });
      //Red color scheme for iCheck
      $('input[type="checkbox"].minimal-red, input[type="radio"].minimal-red').iCheck({
        checkboxClass: 'icheckbox_minimal-red',
        radioClass: 'iradio_minimal-red'
      });
      //Flat red color scheme for iCheck
      $('input[type="checkbox"].flat-red, input[type="radio"].flat-red').iCheck({
        checkboxClass: 'icheckbox_flat-green',
        radioClass: 'iradio_flat-green'
      });

      //Colorpicker
      $(".my-colorpicker1").colorpicker();
      //color picker with addon
      $(".my-colorpicker2").colorpicker();

      //Timepicker
      $(".timepicker").timepicker({
        showInputs: false
      });
    });
  }

  render() {
    return (
      <Layout pageTitle={pageTitle} pageSubTitle={pageSubTitle}>
        <div>
          {/* SELECT2 EXAMPLE */}
          <div className="box box-default">
            <div className="box-header with-border">
              <h3 className="box-title">Select2</h3>
              <div className="box-tools pull-right">
                <button type="button" className="btn btn-box-tool" data-widget="collapse"><i
                  className="fa fa-minus"/></button>
                <button type="button" className="btn btn-box-tool" data-widget="remove"><i
                  className="fa fa-remove"/></button>
              </div>
            </div>
            {/* /.box-header */}
            <div className="box-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Minimal</label>
                    <select className="form-control select2" style={{ width: '100%' }}
                            defaultValue="Alabama">
                      <option>Alabama</option>
                      <option>Alaska</option>
                      <option>California</option>
                      <option>Delaware</option>
                      <option>Tennessee</option>
                      <option>Texas</option>
                      <option>Washington</option>
                    </select>
                  </div>
                  {/* /.form-group */}
                  <div className="form-group">
                    <label>Disabled</label>
                    <select className="form-control select2" disabled="disabled"
                            style={{ width: '100%' }} defaultValue="Alabama">
                      <option>Alabama</option>
                      <option>Alaska</option>
                      <option>California</option>
                      <option>Delaware</option>
                      <option>Tennessee</option>
                      <option>Texas</option>
                      <option>Washington</option>
                    </select>
                  </div>
                  {/* /.form-group */}
                </div>
                {/* /.col */}
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Multiple</label>
                    <select className="form-control select2" multiple="multiple"
                            data-placeholder="Select a State" style={{ width: '100%' }}>
                      <option>Alabama</option>
                      <option>Alaska</option>
                      <option>California</option>
                      <option>Delaware</option>
                      <option>Tennessee</option>
                      <option>Texas</option>
                      <option>Washington</option>
                    </select>
                  </div>
                  {/* /.form-group */}
                  <div className="form-group">
                    <label>Disabled Result</label>
                    <select className="form-control select2" style={{ width: '100%' }}
                            defaultValue="Alabama">
                      <option>Alabama</option>
                      <option>Alaska</option>
                      <option disabled="disabled">California (disabled)</option>
                      <option>Delaware</option>
                      <option>Tennessee</option>
                      <option>Texas</option>
                      <option>Washington</option>
                    </select>
                  </div>
                  {/* /.form-group */}
                </div>
                {/* /.col */}
              </div>
              {/* /.row */}
            </div>
            {/* /.box-body */}
            <div className="box-footer">
              Visit <Link to="https://select2.github.io/">Select2 documentation</Link> for more
              examples and information about
              the plugin.
            </div>
          </div>
          {/* /.box */}
          <div className="row">
            <div className="col-md-6">
              <div className="box box-danger">
                <div className="box-header">
                  <h3 className="box-title">Input masks</h3>
                </div>
                <div className="box-body">
                  {/* Date dd/mm/yyyy */}
                  <div className="form-group">
                    <label>Date masks:</label>
                    <div className="input-group">
                      <div className="input-group-addon">
                        <i className="fa fa-calendar"/>
                      </div>
                      <input type="text" className="form-control"
                             data-inputmask="'alias': 'dd/mm/yyyy'" data-mask/>
                    </div>
                    {/* /.input group */}
                  </div>
                  {/* /.form group */}
                  {/* Date mm/dd/yyyy */}
                  <div className="form-group">
                    <div className="input-group">
                      <div className="input-group-addon">
                        <i className="fa fa-calendar"/>
                      </div>
                      <input type="text" className="form-control"
                             data-inputmask="'alias': 'mm/dd/yyyy'" data-mask/>
                    </div>
                    {/* /.input group */}
                  </div>
                  {/* /.form group */}
                  {/* phone mask */}
                  <div className="form-group">
                    <label>US phone mask:</label>
                    <div className="input-group">
                      <div className="input-group-addon">
                        <i className="fa fa-phone"/>
                      </div>
                      <input type="text" className="form-control"
                             data-inputmask="&quot;mask&quot;: &quot;(999) 999-9999&quot;"
                             data-mask/>
                    </div>
                    {/* /.input group */}
                  </div>
                  {/* /.form group */}
                  {/* phone mask */}
                  <div className="form-group">
                    <label>Intl US phone mask:</label>
                    <div className="input-group">
                      <div className="input-group-addon">
                        <i className="fa fa-phone"/>
                      </div>
                      <input type="text" className="form-control"
                             data-inputmask="'mask': ['999-999-9999 [x99999]', '+099 99 99 9999[9]-9999']"
                             data-mask/>
                    </div>
                    {/* /.input group */}
                  </div>
                  {/* /.form group */}
                  {/* IP mask */}
                  <div className="form-group">
                    <label>IP mask:</label>
                    <div className="input-group">
                      <div className="input-group-addon">
                        <i className="fa fa-laptop"/>
                      </div>
                      <input type="text" className="form-control" data-inputmask="'alias': 'ip'"
                             data-mask/>
                    </div>
                    {/* /.input group */}
                  </div>
                  {/* /.form group */}
                </div>
                {/* /.box-body */}
              </div>
              {/* /.box */}
              <div className="box box-info">
                <div className="box-header">
                  <h3 className="box-title">Color &amp; Time Picker</h3>
                </div>
                <div className="box-body">
                  {/* Color Picker */}
                  <div className="form-group">
                    <label>Color picker:</label>
                    <input type="text" className="form-control my-colorpicker1"/>
                  </div>
                  {/* /.form group */}
                  {/* Color Picker */}
                  <div className="form-group">
                    <label>Color picker with addon:</label>
                    <div className="input-group my-colorpicker2">
                      <input type="text" className="form-control"/>
                      <div className="input-group-addon">
                        <i />
                      </div>
                    </div>
                    {/* /.input group */}
                  </div>
                  {/* /.form group */}
                  {/* time Picker */}
                  <div className="bootstrap-timepicker">
                    <div className="form-group">
                      <label>Time picker:</label>
                      <div className="input-group">
                        <input type="text" className="form-control timepicker"/>
                        <div className="input-group-addon">
                          <i className="fa fa-clock-o"/>
                        </div>
                      </div>
                      {/* /.input group */}
                    </div>
                    {/* /.form group */}
                  </div>
                </div>
                {/* /.box-body */}
              </div>
              {/* /.box */}
            </div>
            {/* /.col (left) */}
            <div className="col-md-6">
              <div className="box box-primary">
                <div className="box-header">
                  <h3 className="box-title">Date picker</h3>
                </div>
                <div className="box-body">
                  {/* Date */}
                  <div className="form-group">
                    <label>Date:</label>
                    <div className="input-group date">
                      <div className="input-group-addon">
                        <i className="fa fa-calendar"/>
                      </div>
                      <input type="text" className="form-control pull-right" id="datepicker"/>
                    </div>
                    {/* /.input group */}
                  </div>
                  {/* /.form group */}
                  {/* Date range */}
                  <div className="form-group">
                    <label>Date range:</label>
                    <div className="input-group">
                      <div className="input-group-addon">
                        <i className="fa fa-calendar"/>
                      </div>
                      <input type="text" className="form-control pull-right" id="reservation"/>
                    </div>
                    {/* /.input group */}
                  </div>
                  {/* /.form group */}
                  {/* Date and time range */}
                  <div className="form-group">
                    <label>Date and time range:</label>
                    <div className="input-group">
                      <div className="input-group-addon">
                        <i className="fa fa-clock-o"/>
                      </div>
                      <input type="text" className="form-control pull-right" id="reservationtime"/>
                    </div>
                    {/* /.input group */}
                  </div>
                  {/* /.form group */}
                  {/* Date and time range */}
                  <div className="form-group">
                    <label>Date range button:</label>
                    <div className="input-group">
                      <button type="button" className="btn btn-default pull-right"
                              id="daterange-btn">
                      <span>
                        <i className="fa fa-calendar"/> Date range picker
                      </span>
                        <i className="fa fa-caret-down"/>
                      </button>
                    </div>
                  </div>
                  {/* /.form group */}
                </div>
                {/* /.box-body */}
              </div>
              {/* /.box */}
              {/* iCheck */}
              <div className="box box-success">
                <div className="box-header">
                  <h3 className="box-title">iCheck - Checkbox &amp; Radio Inputs</h3>
                </div>
                <div className="box-body">
                  {/* Minimal style */}
                  {/* checkbox */}
                  <div className="form-group">
                    <label>
                      <input type="checkbox" className="minimal" defaultChecked/>
                    </label>
                    <label>
                      <input type="checkbox" className="minimal"/>
                    </label>
                    <label>
                      <input type="checkbox" className="minimal" disabled/>
                      Minimal skin checkbox
                    </label>
                  </div>
                  {/* radio */}
                  <div className="form-group">
                    <label>
                      <input type="radio" name="r1" className="minimal" defaultChecked/>
                    </label>
                    <label>
                      <input type="radio" name="r1" className="minimal"/>
                    </label>
                    <label>
                      <input type="radio" name="r1" className="minimal" disabled/>
                      Minimal skin radio
                    </label>
                  </div>
                  {/* Minimal red style */}
                  {/* checkbox */}
                  <div className="form-group">
                    <label>
                      <input type="checkbox" className="minimal-red" defaultChecked/>
                    </label>
                    <label>
                      <input type="checkbox" className="minimal-red"/>
                    </label>
                    <label>
                      <input type="checkbox" className="minimal-red" disabled/>
                      Minimal red skin checkbox
                    </label>
                  </div>
                  {/* radio */}
                  <div className="form-group">
                    <label>
                      <input type="radio" name="r2" className="minimal-red" defaultChecked/>
                    </label>
                    <label>
                      <input type="radio" name="r2" className="minimal-red"/>
                    </label>
                    <label>
                      <input type="radio" name="r2" className="minimal-red" disabled/>
                      Minimal red skin radio
                    </label>
                  </div>
                  {/* Minimal red style */}
                  {/* checkbox */}
                  <div className="form-group">
                    <label>
                      <input type="checkbox" className="flat-red" defaultChecked/>
                    </label>
                    <label>
                      <input type="checkbox" className="flat-red"/>
                    </label>
                    <label>
                      <input type="checkbox" className="flat-red" disabled/>
                      Flat green skin checkbox
                    </label>
                  </div>
                  {/* radio */}
                  <div className="form-group">
                    <label>
                      <input type="radio" name="r3" className="flat-red" defaultChecked/>
                    </label>
                    <label>
                      <input type="radio" name="r3" className="flat-red"/>
                    </label>
                    <label>
                      <input type="radio" name="r3" className="flat-red" disabled/>
                      Flat green skin radio
                    </label>
                  </div>
                </div>
                {/* /.box-body */}
                <div className="box-footer">
                  Many more skins available. <Link
                  to="http://fronteed.com/iCheck/">Documentation</Link>
                </div>
              </div>
              {/* /.box */}
            </div>
            {/* /.col (right) */}
          </div>
          {/* /.row */}
        </div>
      </Layout>
    );
  }

}

export default withStyles(s)(AdvancedElements);
