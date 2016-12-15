/* global $ */

import React, { Component, PropTypes } from 'react';
import Link from '../../../components/Link';

class CreateShareForm extends Component {

  static propTypes = {
    index: PropTypes.number,
    id: PropTypes.string,
    getZone: PropTypes.func,
    zoneId: PropTypes.string,
    createShareZone: PropTypes.func,
    setPageZoneActiveTab: PropTypes.func,
    setCurrentShare: PropTypes.func,
    setStatusShareFormCreate: PropTypes.func,
    page: PropTypes.object,
  };


  clear() { // eslint-disable-line no-unused-vars, class-methods-use-this
    $('#inputCreateShareName').val('');
    $('#inputCreateShareCSS').val('');
    $('#inputCreateShareHTML').val('');
    $('#inputCreateShareDescription').val('');
  }

  createShare() {
    const name = $('#inputCreateShareName').val();
    const css = $('#inputCreateShareCSS').val();
    const html = $('#inputCreateShareHTML').val();
    const description = $('#inputCreateShareDescription').val();
    if (name) {
      const zoneId = this.props.zoneId;
      this.props.createShareZone({ name, html, css, description, zoneId }).then(() => {
        this.props.getZone(this.props.zoneId);
      });
    }
    this.props.setStatusShareFormCreate(false);
    this.props.setPageZoneActiveTab('shareZone');
  }

  removeCreateForm() {
    this.props.setStatusShareFormCreate(false);
  }

  render() {
    return (
      <div
        className={`list-zone-shared list-zone-share-${this.props.index}`}
      >
        <div className="box-header with-border">
          <h3
            className="box-title"
          >
            Create New</h3>
          <div className="box-tools pull-right">
            <button
              className="btn btn-box-tool remove-share-zone"
              onClick={event => this.removeCreateForm(event)}
            >
              <i className="fa fa-times" />
            </button>
          </div>
        </div>
        <div className="box-body">
          <div className={`form-horizontal ListShare-${this.props.index}`}>
            <div className="form-group">
              <label
                htmlFor="inputCreateShareName" className="col-sm-2 control-label"
              >Name</label>
              <div className="col-sm-10">
                <input
                  type="text" className="form-control" id="inputCreateShareName"
                  placeholder="Name"
                  ref={c => {
                    this.inputCreateShareName = c;
                  }}
                />
              </div>
            </div>

            <div className="form-group">
              <label
                htmlFor="inputCreateShareHTML" className="col-sm-2 control-label"
              >HTML</label>
              <div className="col-sm-10">
                <textarea
                  className="form-control"
                  rows="3" placeholder="More info..."
                  id="inputCreateShareHTML"
                  ref={c => {
                    this.inputCreateShareHTML = c;
                  }}
                />
              </div>
            </div>

            <div className="form-group">
              <label
                htmlFor="inputCreateShareCSS" className="col-sm-2 control-label"
              >CSS</label>
              <div className="col-sm-10">
                <textarea
                  className="form-control" id="inputCreateShareCSS"
                  rows="3" placeholder="More info..."
                  ref={c => {
                    this.inputCreateShareCSS = c;
                  }}
                />
              </div>
            </div>

            <div className="form-group">
              <label
                htmlFor={`inputShareDescription-${this.props.index}`}
                className="col-sm-2 control-label"
              >Description</label>
              <div className="col-sm-10">
                <textarea
                  className="form-control" id="inputCreateShareDescription"
                  rows="3" placeholder="More info..."
                  ref={c => {
                    this.inputCreateShareDescription = c;
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="box-footer">
          <Link
            to="#"
            className="btn btn-app pull-right"
            onClick={event => this.clear(event)}
          >
            <i className="fa fa-undo" />
            Clear
          </Link>
          <Link
            to="#"
            className="btn btn-app pull-right"
            onClick={event => this.createShare(event)}
          ><i className="fa fa-floppy-o" /> Save</Link>
        </div>
      </div>
    );
  }
}

export default CreateShareForm;
