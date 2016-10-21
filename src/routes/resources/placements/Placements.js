/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { getPlacements, createPlacement } from '../../../actions/placements';
import Layout from '../../../components/Layout';
import Link from '../../../components/Link';
import s from './Placements.css';

const pageTitle = 'Placements';
const pageSubTitle = 'Control panel';

class Placements extends Component {
  static propTypes = {
    placements: PropTypes.object,
    getPlacements: PropTypes.func,
    createPlacement: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      searchText: '',
    };
  }

  componentWillMount() {
    this.props.getPlacements();
  }

  componentDidMount() {
    /* eslint-disable no-undef */
    // $('.select2').select2();
    // $('#example1').DataTable(); // eslint-disable-line new-cap

    // iCheck for checkbox and radio inputs
    $('input[type="checkbox"].inputChoosePlacement').iCheck({
      checkboxClass: 'icheckbox_minimal-blue',
      radioClass: 'iradio_minimal-blue',
    });

    const dateStart = new Date();
    dateStart.setDate(dateStart.getDate());

    $('#inputPlacementStartTime').datepicker({
      autoclose: true,
      todayHighlight: 'TRUE',
      startDate: dateStart,
      defaultDate: new Date(),
    });

    const dateEnd = new Date();
    dateEnd.setDate(dateEnd.getDate() + 1);
    $('#inputPlacementEndTime').datepicker({
      autoclose: true,
      todayHighlight: 'TRUE',
      startDate: dateEnd,
      defaultDate: new Date(),
    });
    /* eslint-enable no-undef */
  }

  searchFor(event) {
    event.persist();
    this.setState((previousState) => ({
      ...previousState,
      searchText: event.target.value.trim(),
    }));
  }

  clearInput(event) { // eslint-disable-line no-unused-vars, class-methods-use-this
    document.getElementById('inputPlacementName').value = null;
    document.getElementById('inputPlacementStartTime').value = null;
    document.getElementById('inputPlacementEndTime').value = null;
    document.getElementById('inputPlacementSize').value = null;
    document.getElementById('inputPlacementWeight').value = null;
    document.getElementById('inputPlacementDescription').value = null;
  }

  isIndexOf(...args) {
    for (let i = 0; i < args.length; i += 1) {
      if (args[i].toLowerCase().indexOf(this.state.searchText.toLowerCase()) !== -1) {
        return true;
      }
    }
    return false;
  }

  createPlacement() {
    const name = document.getElementById('inputPlacementName').value;
    const userId = 'da31ecf7-83ce-4c64-932a-ec165d42e65d';
    const startTime = new Date(moment(new Date(document.getElementById('inputPlacementStartTime').value)).format('YYYY-MM-DD 00:00:00'));
    const endTime = new Date(moment(new Date(document.getElementById('inputPlacementEndTime').value)).format('YYYY-MM-DD 00:00:00'));
    const size = document.getElementById('inputPlacementSize').value;
    const weight = document.getElementById('inputPlacementWeight').value;
    const description = document.getElementById('inputPlacementDescription').value;
    if (userId && name && startTime && endTime && size && weight && description) {
      if (endTime > startTime) {
        this.props.createPlacement({
          userId,
          name,
          startTime,
          endTime,
          size,
          weight,
          description,
        }).then(() => {
          this.clearInput();
        });
      } else {
        document.getElementById('inputPlacementEndTime').value = null;
      }
    }
  }

  render() {
    return (
      <Layout pageTitle={pageTitle} pageSubTitle={pageSubTitle}>
        <div>

          <div className="row">
            <section className="col-lg-12">
              {/* BOX: FORM OF CREATE NEW PlacementS */}
              <div className="box box-primary collapsed-box">
                <div className="box-header with-border">
                  <h3 className="box-title">Create a new Placements</h3>
                  <div className="box-tools pull-right">
                    <button type="button" className="btn btn-box-tool" data-widget="collapse">
                      <i className="fa fa-plus" />
                    </button>
                  </div>
                </div>
                {/* /.box-header */}
                {/* form start */}
                <form className="form-horizontal">
                  <div className="box-body">
                    <div className="form-group">
                      <label
                        htmlFor="inputPlacementName" className="col-sm-2 control-label"
                      >Name</label>
                      <div className="col-sm-10">
                        <input
                          type="text" className="form-control" id="inputPlacementName"
                          placeholder="Admicro"
                        />
                      </div>
                    </div>
                    <div className="form-group has-feedback">
                      <label htmlFor="inputPlacementStartTime" className="col-sm-2 control-label">Start Time:</label>
                      <div className=" col-sm-10 date">
                        <span className="fa fa-calendar form-control-feedback" />
                        <input type="text" className="form-control pull-right" id="inputPlacementStartTime" />
                      </div>
                    </div>
                    <div className="form-group has-feedback">
                      <label htmlFor="inputPlacementEndTime" className="col-sm-2 control-label">End Time:</label>
                      <div className=" col-sm-10 date">
                        <span className="fa fa-calendar form-control-feedback" />
                        <input type="text" className="form-control pull-right" id="inputPlacementEndTime" />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="inputPlacementSize" className="col-sm-2 control-label">Size</label>
                      <div className="col-sm-10">
                        <input
                          type="text" className="form-control"
                          id="inputPlacementSize"
                          placeholder="24"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="inputPlacementWeight"
                        className="col-sm-2 control-label"
                      >Weight</label>
                      <div className="col-sm-10">
                        <input
                          type="text" className="form-control" id="inputPlacementWeight"
                          placeholder="1"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label
                        htmlFor="inputPlacementDescription"
                        className="col-sm-2 control-label"
                      >Description</label>
                      <div className="col-sm-10">
                        <textarea
                          className="form-control" id="inputPlacementDescription"
                          rows="5" placeholder="More info..."
                        />
                      </div>
                    </div>
                  </div>
                  {/* /.box-body */}
                  <div className="box-footer">
                    {/* eslint-disable jsx-a11y/no-static-element-interactions */}
                    <a
                      className={'btn btn-app pull-right '.concat(s.btn)}
                    ><i className="fa fa-eraser" /> Clear</a>
                    <a
                      className={'btn btn-app pull-right '.concat(s.btn)}
                      onClick={event => this.createPlacement(event)}
                    ><i className="fa fa-check" /> Confirm</a>
                    {/* eslint-enable jsx-a11y/no-static-element-interactions */}
                  </div>
                  {/* /.box-footer */}
                </form>
              </div>
              {/* /.col */}
            </section>
          </div>

          {/* Main row */}
          <div className="row">
            <section className="col-lg-12">
              {/* BOX: LIST OF Placements */}
              <div className="box box-info">
                <div className="box-header with-border">
                  <h3 className="box-title">List Placement</h3>

                  <div className="box-tools">
                    <div className="input-group input-group-sm" style={{ width: 150 }}>
                      <input
                        type="text" name="inputSearchPlacements"
                        className="form-control pull-right"
                        placeholder="Search..." onChange={event => this.searchFor(event)}
                      />
                      <div className="input-group-btn">
                        <button
                          type="submit" className="btn btn-default"
                        ><i className="fa fa-search" /></button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /.box-header */}
                <div className="box-body table-responsive no-padding">
                  <table id="example1" className="table table-hover">
                    <thead>
                      <tr>
                        <th><input type="checkbox" className="inputChoosePlacement" /></th>
                        <th>Name</th>
                        <th>Size</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Weight</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      { this.props.placements.latest &&
                      this.props.placements.latest.map(placement => {
                        if (this.isIndexOf(placement.name, placement.startTime,
                            placement.endTime, placement.size,
                            placement.description, placement.weight)) {
                          return (
                            <tr key={placement.id}>
                              <th><input type="checkbox" className="inputChoosePlacement" /></th>
                              <th><Link to={`/resource/placement/${placement.id}`}>{placement.name}</Link>
                              </th>
                              <td>{placement.size}</td>
                              <td>{moment(new Date(placement.startTime)).format('L')}</td>
                              <td>{moment(new Date(placement.endTime)).format('L')}</td>
                              <td>{placement.weight}</td>
                              <td>{placement.description}</td>
                            </tr>
                          );
                        }
                        return false;
                      })}
                    </tbody>
                    <tfoot>
                      <tr>
                        <th><input type="checkbox" className="inputChoosePlacement" /></th>
                        <th>Name</th>
                        <th>Size</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Weight</th>
                        <th>Description</th>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                {/* /.box-body */}
                <div className="box-footer clearfix">
                  <ul className="pagination pagination-sm no-margin pull-right">
                    <li><a>&laquo;</a></li>
                    <li><a>1</a></li>
                    <li><a>2</a></li>
                    <li><a>3</a></li>
                    <li><a>&raquo;</a></li>
                  </ul>
                </div>
              </div>
              {/* /.box */}
            </section>
            {/* /.col */}
          </div>
          {/* /.row (main row) */}
        </div>
      </Layout>
    );
  }

}
const mapState = (state) => ({
  placements: state.placements,
});

const mapDispatch = {
  getPlacements,
  createPlacement,
};

export default withStyles(s)(connect(mapState, mapDispatch)(Placements));
