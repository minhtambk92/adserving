/* global $ */

import React, { Component, PropTypes } from 'react';
import Link from '../../../components/Link';

class EditShareForm extends Component {

  static propTypes = {
    index: PropTypes.number,
    id: PropTypes.string,
    childZone: PropTypes.object,
    getZone: PropTypes.func,
    zoneId: PropTypes.string,
    updateShareZone: PropTypes.func,
    createShareZone: PropTypes.func,
    removeShare: PropTypes.func,
    setPageZoneActiveTab: PropTypes.func,
    setCurrentShare: PropTypes.func,
    setStatusShareFormEdit: PropTypes.func,
    page: PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      index: 1,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.childZone) {
      this.inputEditShareName.value = nextProps.childZone.name;
      this.inputEditShareCSS.value = nextProps.childZone.css;
      this.inputEditShareDescription.value = nextProps.childZone.description;
      this.inputEditShareHTML.value = nextProps.childZone.html;
    }
  }

  save() {
    const i = this.state.index;
    const id = $(`.list-zone-share-${i}`).attr('id');
    const name = $('#inputEditShareName').val();
    const css = $('#inputEditShareCSS').val();
    const html = $('#inputEditShareHTML').val();
    const description = $('#inputEditShareDescription').val();
    if (id) {
      if (name) {
        this.props.updateShareZone({ id, name, html, css, description }).then(() => {
          this.props.getZone(this.props.zoneId).then(() => {
            this.props.setPageZoneActiveTab('shareZone');
            this.props.setStatusShareFormEdit(false);
          });
        });
      }
    }
  }

  removeShareFormEdit() {
    this.props.setStatusShareFormEdit(false);
  }

  render() {
    return (
      <div
        className={`list-zone-shared list-zone-share-${this.props.index}`}
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
                htmlFor={`inputShareDescription-${this.props.index}`}
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
