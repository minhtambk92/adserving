/* global $ */

import React, { Component, PropTypes } from 'react';
import { InputTags } from '../../../components/UI';
import Link from '../../../components/Link';

class EditShareForm extends Component {

  static propTypes = {
    index: PropTypes.number,
    id: PropTypes.string,
    childZone: PropTypes.object,
    getZone: PropTypes.func,
    zoneId: PropTypes.string,
    updateShare: PropTypes.func,
    setPageZoneActiveTab: PropTypes.func,
    setStatusShareFormEdit: PropTypes.func,
    page: PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      keyWord: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.childZone) {
      this.inputEditShareName.value = nextProps.childZone.name;
      this.inputEditShareCSS.value = nextProps.childZone.css;
      this.inputEditShareDescription.value = nextProps.childZone.description;
      this.inputEditShareHTML.value = nextProps.childZone.html;
      this.inputEditShareOutPutCSS.value = nextProps.childZone.outputCss;
      this.inputEditShareHeight.value = nextProps.childZone.height;
      this.inputEditShareWeight.value = nextProps.childZone.weight;
      this.inputEditShareWidth.value = nextProps.childZone.width;
      this.inputEditShareType.value = nextProps.childZone.type;
      this.state.keyWord = nextProps.childZone.classes;
    }
  }

  save() {
    const id = $('.list-zone-share-edit').attr('id');
    const name = this.inputEditShareName.value;
    const css = this.inputEditShareCSS.value;
    const outputCss = '';
    const html = this.inputEditShareHTML.value;
    const width = this.inputEditShareWidth.value;
    const height = this.inputEditShareHeight.value;
    const weight = this.inputEditShareWeight.value;
    const classes = document.getElementById('inputCreateShareClasses').value;
    const type = this.inputEditShareType.value;
    const description = this.inputEditShareDescription.value;

    if (id && name) {
      this.props.updateShare({
        id,
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
      }).then(() => {
        this.props.getZone(this.props.zoneId).then(() => {
          this.props.setPageZoneActiveTab('shareZone');
          this.props.setStatusShareFormEdit(false);
        });
      });
    }
  }

  removeShareFormEdit() {
    this.props.setStatusShareFormEdit(false);
  }

  render() {
    return (
      <div
        className="list-zone-shared list-zone-share-edit"
        id={this.props.id}
      >
        <div className="box-header with-border">
          <h3
            className="box-title"
          >
            {`Edit: ${this.props.childZone.name}`}</h3>
          <div className="box-tools pull-right">
            <button
              className="btn btn-box-tool remove-share-zone"
              onClick={event => this.removeShareFormEdit(event)}
            >
              <i className="fa fa-times" />
            </button>
          </div>
        </div>
        <div className="box-body">
          <div className={`form-horizontal ListShare-${this.props.index}`}>
            <div className="form-group">
              <label
                htmlFor="inputEditShareName" className="col-sm-2 control-label"
              >Name</label>
              <div className="col-sm-10">
                <input
                  type="text" className="form-control" id="inputEditShareName"
                  placeholder="Name"
                  ref={c => {
                    this.inputEditShareName = c;
                  }}
                />
              </div>
            </div>

            <div className="form-group">
              <label
                htmlFor="inputEditShareHTML" className="col-sm-2 control-label"
              >HTML</label>
              <div className="col-sm-10">
                <textarea
                  className="form-control"
                  rows="3" placeholder="More info..."
                  id="inputEditShareHTML"
                  ref={c => {
                    this.inputEditShareHTML = c;
                  }}
                />
              </div>
            </div>

            <div className="form-group">
              <label
                htmlFor="inputEditShareCSS" className="col-sm-2 control-label"
              >CSS</label>
              <div className="col-sm-10">
                <textarea
                  className="form-control" id="inputEditShareCSS"
                  rows="3" placeholder="More info..."
                  ref={c => {
                    this.inputEditShareCSS = c;
                  }}
                />
              </div>
            </div>
            <div className="form-group">
              <label
                htmlFor="inputEditShareOutPutCSS" className="col-sm-2 control-label"
              >Output CSS</label>
              <div className="col-sm-10">
                <textarea
                  className="form-control" id="inputEditShareOutPutCSS"
                  rows="3" placeholder="More info..."
                  readOnly
                  ref={c => {
                    this.inputEditShareOutPutCSS = c;
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
                  data={this.state.keyWord}
                />
              </div>
            </div>

            <div className="form-group">
              <label
                htmlFor="inputEditShareWidth" className="col-sm-2 control-label"
              >Width(px)</label>
              <div className="col-sm-10">
                <input
                  type="number" className="form-control" id="inputEditShareWidth"
                  placeholder="300"
                  ref={c => {
                    this.inputEditShareWidth = c;
                  }}
                />
              </div>
            </div>

            <div className="form-group">
              <label
                htmlFor="inputEditShareHeight" className="col-sm-2 control-label"
              >Height(px)</label>
              <div className="col-sm-10">
                <input
                  type="number" className="form-control" id="inputEditShareHeight"
                  placeholder="Height"
                  ref={c => {
                    this.inputEditShareHeight = c;
                  }}
                />
              </div>
            </div>

            <div className="form-group">
              <label
                htmlFor="inputEditShareWeight" className="col-sm-2 control-label"
              >Weight</label>
              <div className="col-sm-10">
                <input
                  type="number" className="form-control" id="inputEditShareWeight"
                  placeholder="Name"
                  ref={c => {
                    this.inputEditShareWeight = c;
                  }}
                />
              </div>
            </div>

            <div className="form-group">
              <label
                htmlFor="inputEditShareType"
                className="col-sm-2 control-label"
              >Status</label>
              <div className="col-sm-10">
                <select
                  id="inputEditShareType" className="form-control"
                  ref={c => {
                    this.inputEditShareType = c;
                  }}
                >
                  <option value="single">Single</option>
                  <option value="multiple">Multiple</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label
                htmlFor="inputEditShareDescription"
                className="col-sm-2 control-label"
              >Description</label>
              <div className="col-sm-10">
                <textarea
                  className="form-control" id="inputEditShareDescription"
                  rows="3" placeholder="More info..."
                  ref={c => {
                    this.inputEditShareDescription = c;
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
            onClick={event => this.save(event)}
          ><i className="fa fa-floppy-o" /> Save</Link>
        </div>
      </div>
    );
  }
}

export default EditShareForm;
