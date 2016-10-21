/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// import { defineMessages, FormattedRelative } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { getPlacement, updatePlacement, deletePlacement } from '../../../actions/placements';
import Layout from '../../../components/Layout';
import Link from '../../../components/Link';
import s from './Placement.css';

const pageTitle = 'Placement';

class Placement extends Component {

  static propTypes = {
    placementId: PropTypes.string.isRequired,
    placements: PropTypes.object,
    getPlacement: PropTypes.func,
    updatePlacement: PropTypes.func,
    deletePlacement: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      userId: '',
      name: '',
      startTime: Date.now(),
      endTime: Date.now(),
      size: '',
      weight: 1,
      description: '',
    };
  }

  componentWillMount() {
    this.props.getPlacement(this.props.placementId);
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
    dateEnd.setDate(dateEnd.getDate());
    $('#inputPlacementEndTime').datepicker({
      autoclose: true,
      todayHighlight: 'TRUE',
      startDate: dateEnd,
      defaultDate: new Date(),
    });
    /* eslint-enable no-undef */
  }

  componentWillReceiveProps(nextProps) {
    const {
      userId = 'da31ecf7-83ce-4c64-932a-ec165d42e65d',
      name,
      startTime,
      endTime,
      size,
      weight,
      description,
    } = nextProps.placements && (nextProps.placements.current || {});

    document.getElementById('inputPlacementName').value = name;
    document.getElementById('inputPlacementStartTime').value = moment(new Date(startTime)).format('L');
    document.getElementById('inputPlacementEndTime').value = moment(new Date(endTime)).format('L');
    document.getElementById('inputPlacementSize').value = size;
    document.getElementById('inputPlacementWeight').value = weight;
    document.getElementById('inputPlacementDescription').value = description;
  }

  onInputChange(event, field) {
    event.persist();

    this.setState(previousState => ({
      ...previousState,
      [field]: event.target.value,
    }));
  }

  updatePlacement() {
    const {
      userId,
      name,
      startTime,
      endTime,
      size,
      weight,
      description,
    } = this.state;
    const placement = { id: this.props.placementId };

    if (name && name !== this.props.placements.current.name) {
      placement.name = name;
    }

    if (userId && userId !== this.props.placements.current.userId) {
      placement.userId = userId;
    }
    if (startTime && startTime !== this.props.placements.current.startTime) {
      placement.startTime = new Date(document.getElementById('inputPlacementStartTime').value);
    }

    if (endTime && endTime !== this.props.placements.current.endTime) {
      placement.endTime = new Date(document.getElementById('inputPlacementEndTime').value);
    }
    if (size && size !== this.props.placements.current.size) {
      placement.size = size;
    }
    if (weight && weight !== this.props.placements.current.weight) {
      placement.weight = weight;
    }

    if (description && description !== this.props.placements.current.description) {
      placement.description = description;
    }
    if (moment(new Date(document.getElementById('inputPlacementStartTime').value)).format('x') < moment(new Date(document.getElementById('inputPlacementEndTime').value))) {
      this.props.updatePlacement(Placement);
    } else {
      document.getElementById('inputPlacementEndTime').value = null;
      document.getElementById('inputPlacementEndTime').focus();
    }

    // if (placement.startTime < placement.endTime) {
    //   this.props.updatePlacement(placement);
    // } else {
    //   document.getElementById('inputPlacementEndTime').value = null;
    // }
  }

  deletePlacement() {
    this.props.deletePlacement(this.props.placementId);
  }

  render() {
    return (
      <Layout
        pageTitle={
          pageTitle
            .concat(': ')
            .concat(this.props.placements.current ? this.props.placements.current.name : '...')
        }
        pageSubTitle=""
      >
        <div>

          <div className="row">
            <section className="col-lg-12">
              {/* BOX: FORM OF CREATE NEW WEBSITE */}
              <div className="box box-primary">
                <div className="box-header with-border">
                  <h3 className="box-title">Change Placement information</h3>
                  <div className="box-tools pull-right">
                    <button type="button" className="btn btn-box-tool" data-widget="collapse">
                      <i className="fa fa-minus" />
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
                          onChange={event => this.onInputChange(event, 'name')}
                        />
                      </div>
                    </div>
                    <div className="form-group has-feedback">
                      <label htmlFor="inputPlacementStartTime" className="col-sm-2 control-label">
                        Start Time:</label>
                      <div className=" col-sm-10 date">
                        <span className="fa fa-calendar form-control-feedback" />
                        <input type="text" className="form-control pull-right"
                               id="inputPlacementStartTime"
                               onChange={event => this.onInputChange(event, 'startTime')} />
                      </div>
                    </div>
                    <div className="form-group has-feedback">
                      <label htmlFor="inputPlacementEndTime" className="col-sm-2 control-label">
                        End Time:</label>
                      <div className=" col-sm-10 date">
                        <span className="fa fa-calendar form-control-feedback" />
                        <input type="text" className="form-control pull-right"
                               id="inputPlacementEndTime"
                               onChange={event => this.onInputChange(event, 'endTime')} />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="inputPlacementSize" className="col-sm-2 control-label">
                        Size</label>
                      <div className="col-sm-10">
                        <input
                          type="text" className="form-control" id="inputPlacementSize"
                          placeholder="300x250"
                          onChange={event => this.onInputChange(event, 'size')}
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
                          type="number" className="form-control" id="inputPlacementWeight"
                          placeholder="1" onChange={event => this.onInputChange(event, 'weight')}
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
                          onChange={event => this.onInputChange(event, 'description')}
                        />
                      </div>
                    </div>
                  </div>
                  {/* /.box-body */}
                  <div className="box-footer">
                    {/* eslint-disable jsx-a11y/no-static-element-interactions */}
                    <Link
                      to="/resource/placement"
                      className={'btn btn-app pull-right '.concat(s.btn)}
                    ><i className="fa fa-undo" /> Cancel</Link>
                    <Link
                      to="/resource/placement"
                      className={'btn btn-app pull-right '.concat(s.btn)}
                      onClick={event => this.deletePlacement(event)}
                    ><i className="fa fa-trash-o" /> Delete</Link>
                    <a
                      className={'btn btn-app pull-right '.concat(s.btn)}
                      onClick={event => this.updatePlacement(event)}
                    ><i className="fa fa-floppy-o" /> Save</a>
                    {/* eslint-enable jsx-a11y/no-static-element-interactions */}
                  </div>
                  {/* /.box-footer */}
                </form>
              </div>
              {/* /.col */}
            </section>
          </div>

        </div>
      </Layout>
    );
  }

}

const mapState = (state) => ({
  placements: state.placements,
});

const mapDispatch = {
  getPlacement,
  updatePlacement,
  deletePlacement,
};

export default withStyles(s)(connect(mapState, mapDispatch)(Placement));
