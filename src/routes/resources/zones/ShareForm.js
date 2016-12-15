/* global $ */

import React, { Component, PropTypes } from 'react';
import Link from '../../../components/Link';

class ShareForm extends Component {

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
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      index: 1,
    };
  }

  save() {
    const i = this.state.index;
    const id = $(`.list-zone-share-${i}`).attr('id');
    const name = $(`#inputShareName-${i}`).val();
    const css = $(`#inputShareCSS-${i}`).val();
    const html = $(`#inputShareHTML-${i}`).val();
    const description = $(`#inputShareDescription-${i}`).val();
    if (id) {
      if (name) {
        this.props.updateShareZone({ id, name, html, css, description }).then(() => {
          this.props.getZone(this.props.zoneId).then(() => {
            this.setState({ share: {} });
            this.setState({ showEdit: false });
            this.props.setPageZoneActiveTab('shareZone');
          });
        });
      }
    }
  }
  clear() {
    const i = this.state.index;
    $(`#inputShareName-${i}`).val('');
    $(`#inputShareCSS-${i}`).val('');
    $(`#inputShareHTML-${i}`).val('');
    $(`#inputShareDescription-${i}`).val('');
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
            {this.props.childZone ? (`Edit: ${this.props.childZone.name}`) : ('Add New')}</h3>
          <div className="box-tools pull-right">
            <button
              className="btn btn-box-tool remove-share-zone"
              data-widget="remove"
            >
              <i className="fa fa-times" />
            </button>
          </div>
        </div>
        <div className="box-body">
          <div className={`form-horizontal ListShare-${this.props.index}`}>
            <div className="form-group">
              <label
                htmlFor={`inputShareName-${this.props.index}`} className="col-sm-2 control-label"
              >Name</label>
              <div className="col-sm-10">
                <input
                  type="text" className="form-control" id={`inputShareName-${this.props.index}`}
                  defaultValue={this.props.childZone ? this.props.childZone.name : ''}
                  placeholder="Name"
                />
              </div>
            </div>

            <div className="form-group">
              <label
                htmlFor={`inputShareHTML-${this.props.index}`} className="col-sm-2 control-label"
              >HTML</label>
              <div className="col-sm-10">
                <textarea
                  className="form-control"
                  rows="3" placeholder="More info..."
                  id={`inputShareHTML-${this.props.index}`}
                  defaultValue={this.props.childZone ? this.props.childZone.html : ''}
                />
              </div>
            </div>

            <div className="form-group">
              <label
                htmlFor={`inputShareCSS-${this.props.index}`} className="col-sm-2 control-label"
              >CSS</label>
              <div className="col-sm-10">
                <textarea
                  className="form-control" id={`inputShareCSS-${this.props.index}`}
                  rows="3" placeholder="More info..."
                  defaultValue={this.props.childZone ? this.props.childZone.css : ''}
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
                  className="form-control" id={`inputShareDescription-${this.props.index}`}
                  rows="3" placeholder="More info..."
                  defaultValue={this.props.childZone ? this.props.childZone.description : ''}
                />
              </div>
            </div>
          </div>
        </div>
        {this.props.childZone ? (
          <div className="box-footer">
            <Link
              to="#"
              className="btn btn-app pull-right"
              onClick={event => this.save(event)}
            ><i className="fa fa-floppy-o" /> Save</Link>
          </div>
        ) : (
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
        )}
      </div>
    );
  }
}

export default ShareForm;
