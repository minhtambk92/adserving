/* global $ */

import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import { InputTags } from '../../../components/UI';
import Link from '../../../components/Link';

class CreateShareForm extends Component {

  static propTypes = {
    index: PropTypes.number,
    id: PropTypes.string,
    getZone: PropTypes.func,
    zoneId: PropTypes.string,
    createShare: PropTypes.func,
    setPageZoneActiveTab: PropTypes.func,
    setStatusShareFormCreate: PropTypes.func,
    page: PropTypes.object,
    list: PropTypes.array,
    user: PropTypes.object,
    createActivity: PropTypes.func,
  };

  clear() { // eslint-disable-line no-unused-vars, class-methods-use-this
    this.inputCreateShareName.value = null;
    this.inputCreateShareCSS.value = null;
    this.inputCreateShareHTML.value = null;
    this.inputCreateShareHeight.value = null;
    this.inputCreateShareDescription.value = null;
    this.inputCreateShareWeight.value = null;
    this.inputCreateShareWidth.value = null;
  }

  createShare() {
    const arr = this.props.list;
    _.sumBy(arr, o => o.weight); // ➜ 20
    const sumWeight = _.sumBy(arr, 'weight');// ➜ 20
    const name = this.inputCreateShareName.value;
    const css = this.inputCreateShareCSS.value;
    const outputCss = '';
    const html = this.inputCreateShareHTML.value;
    const width = this.inputCreateShareWidth.value;
    const height = this.inputCreateShareHeight.value;
    const weight = this.inputCreateShareWeight.value;
    const classes = document.getElementById('inputCreateShareClasses').value;
    const type = this.inputCreateShareType.value;
    const description = this.inputCreateShareDescription.value;
    /* eslint-disable radix */
    const newWeight = sumWeight + parseInt(weight);
    if (newWeight <= 100) {
      const zoneId = this.props.zoneId;
      this.props.createShare({
        name,
        html,
        css,
        outputCss,
        width,
        height,
        weight,
        classes,
        type,
        description,
        zoneId,
      }).then(() => {
        if (this.props.list && this.props.list.length > 0) {
          const userId = this.props.user.id;
          const subject = `Share ${name}`;
          const subjectId = this.props.list[0].id;
          const action = 'created';
          const other = '';
          this.props.createActivity({ action,
            subject,
            subjectId,
            other,
            userId });
        }
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
            Add New</h3>
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
                  ref={(c) => {
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
                  ref={(c) => {
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
                  ref={(c) => {
                    this.inputCreateShareCSS = c;
                  }}
                />
              </div>
            </div>

            <div className="form-group">
              <label
                htmlFor="inputCreateShareClasses"
                className="col-sm-2 control-label"
              >Custom Class</label>
              <div className="col-sm-10">
                {/* /.InputTas */}
                <InputTags
                  type="text"
                  id="inputCreateShareClasses"
                  className="form-control"
                  placeholder="dantri"
                />
              </div>
            </div>

            <div className="form-group">
              <label
                htmlFor="inputCreateShareWidth" className="col-sm-2 control-label"
              >Width(px)</label>
              <div className="col-sm-10">
                <input
                  type="number" className="form-control" id="inputCreateShareWidth"
                  placeholder="300"
                  ref={(c) => {
                    this.inputCreateShareWidth = c;
                  }}
                />
              </div>
            </div>

            <div className="form-group">
              <label
                htmlFor="inputCreateShareHeight" className="col-sm-2 control-label"
              >Height(px)</label>
              <div className="col-sm-10">
                <input
                  type="number" className="form-control" id="inputCreateShareHeight"
                  placeholder="300"
                  ref={(c) => {
                    this.inputCreateShareHeight = c;
                  }}
                />
              </div>
            </div>

            <div className="form-group">
              <label
                htmlFor="inputCreateShareWeight" className="col-sm-2 control-label"
              >Weight</label>
              <div className="col-sm-10">
                <input
                  type="number" className="form-control" id="inputCreateShareWeight"
                  placeholder="100"
                  ref={(c) => {
                    this.inputCreateShareWeight = c;
                  }}
                />
              </div>
            </div>

            <div className="form-group">
              <label
                htmlFor="inputCreateShareType"
                className="col-sm-2 control-label"
              >Status</label>
              <div className="col-sm-10">
                <select
                  id="inputCreateShareType" className="form-control"
                  ref={(c) => {
                    this.inputCreateShareType = c;
                  }}
                >
                  <option value="single">Single</option>
                  <option value="multiple">Multiple</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label
                htmlFor="inputCreateShareDescription"
                className="col-sm-2 control-label"
              >Description</label>
              <div className="col-sm-10">
                <textarea
                  className="form-control" id="inputCreateShareDescription"
                  rows="3" placeholder="More info..."
                  ref={(c) => {
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
