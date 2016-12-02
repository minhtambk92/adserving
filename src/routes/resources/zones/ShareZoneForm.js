/* global $ */

import React, { Component, PropTypes } from 'react';
import Link from '../../../components/Link';

class ShareZoneForm extends Component {

  static propTypes = {
    zoneId: PropTypes.string.isRequired,
    zone: PropTypes.object,
    getZone: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      numberShare: 1,
      arrShare: [1],
    };
  }

  onChangeNumberShare() {
    const number = this.inputZoneNumberShare.value;
    this.setState({ arrShare: [] });
    if (number) {
      this.setState({ numberShare: number });
      const arr = [];
      for (let i = 1; i <= number; i += 1) {
        arr.push([i]);
      }
      this.setState({ arrShare: arr });
    }
  }

  shareZone() {
    for (let i = 0; i < this.state.numberShare; i += 1) {
      const width = $(`#inputZoneShareWidth-${i}`).val();
      const height = $(`#inputZoneShareHeight-${i}`).val();
      const sumHeight = height;
      const sumWidth = width;
      console.log(sumHeight, sumWidth);
    }
  }

  render() {
    return (
      <form className="form-horizontal">
        <div className="box-body">
          <div className="form-group">
            <label
              htmlFor="inputZoneNumberShare" className="col-sm-2 control-label"
            >Choose Number Share</label>
            <div className="col-sm-10">
              <select
                id="inputZoneNumberShare" className="form-control"
                ref={c => {
                  this.inputZoneNumberShare = c;
                }}
                onChange={event => this.onChangeNumberShare(event)}
              >
                <option value="1">No Share</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              {this.state.arrShare.map((index) => (
                <div key={index} className="box box-info">
                  <div className="box-header with-border">
                    <h3 className="box-title">Zone - {index}</h3>
                  </div>
                  {/* /.box-header */}
                  <div className="box-body">
                    <div className="form-group">
                      <label
                        htmlFor={`inputZoneShareWidth-${index}`} className="col-sm-2 control-label"
                      >Width</label>
                      <div className="col-sm-10">
                        <input
                          type="number" className="form-control" id={`inputZoneShareWidth-${index}`}
                          placeholder="1"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor={`inputZoneHeight-${index}`} className="col-sm-2 control-label"
                      >Height</label>
                      <div className="col-sm-10">
                        <input
                          type="number" className="form-control" id={`inputZoneHeight-${index}`}
                          placeholder="1"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* /.box-body */}
        <div className="box-footer">
          <Link
            to="/resource/zone"
            className="btn btn-app pull-right"
          >
            <i className="fa fa-undo" />
            Cancel
          </Link>
          <Link
            to="#"
            className="btn btn-app pull-right"
            onClick={event => this.shareZone(event)}
          ><i className="fa fa-floppy-o" /> Save</Link>
        </div>
        {/* /.box-footer */}
      </form>
    );
  }
}

export default ShareZoneForm;
