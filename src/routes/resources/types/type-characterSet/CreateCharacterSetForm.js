/* global $ */

import React, { Component, PropTypes } from 'react';
import Link from '../../../../components/Link';

class CreateCharacterSetForm extends Component {

  static propTypes = {
    id: PropTypes.string,
    characterSets: PropTypes.object,
    statusCreateCharacterSet: PropTypes.func,
    page: PropTypes.object,
    createCharacterSet: PropTypes.func,
    user: PropTypes.object,
    createActivity: PropTypes.func,
  };


  clear() { // eslint-disable-line no-unused-vars, class-methods-use-this
    this.inputCharacterSetName.value = null;
    document.getElementById('inputCharacterSetIsUpload').checked = false;
  }

  createCharacterSet() {
    const name = this.inputCharacterSetName.value;
    const value = this.inputCharacterSetValue.value;
    const status = this.inputCharacterSetStatus.value;
    const userId = this.props.user.id;
    if (name) {
      this.props.createCharacterSet({
        name,
        value,
        status,
        userId,
      }).then(() => {
        if (this.props.characterSets && this.props.characterSets.list.length > 0) {
          /* eslint-disable no-shadow */
          const userId = this.props.user.id;
          const subject = `CharacterSet ${name}`;
          const subjectId = this.props.characterSets.list[0].id;
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
    this.props.statusCreateCharacterSet(false);
  }

  removeCreateForm() {
    this.props.statusCreateCharacterSet(false);
  }

  render() {
    return (
      <div
        className="CreateCharacterSet"
      >
        <div className="box-header with-border">
          <h3
            className="box-title"
          >
            Add New</h3>
          <div className="box-tools pull-right">
            <button
              className="btn btn-box-tool removeTypeBannerHtml"
              onClick={event => this.removeCreateForm(event)}
            >
              <i className="fa fa-times" />
            </button>
          </div>
        </div>
        <div className="box-body">
          <div className="form-horizontal">
            <div className="form-group">
              <label
                htmlFor="inputCharacterSetName" className="col-sm-2 control-label"
              >Name</label>
              <div className="col-sm-10">
                <input
                  type="text" className="form-control" id="inputCharacterSetName"
                  placeholder="Name"
                  ref={c => {
                    this.inputCharacterSetName = c;
                  }}
                />
              </div>
            </div>
            <div className="form-group">
              <label
                htmlFor="inputCharacterSetValue" className="col-sm-2 control-label"
              >Value</label>
              <div className="col-sm-10">
                <input
                  type="text" className="form-control" id="inputCharacterSetValue"
                  placeholder="Value"
                  ref={c => {
                    this.inputCharacterSetValue = c;
                  }}
                />
              </div>
            </div>

            <div className="form-group">
              <label
                htmlFor="inputCharacterSetStatus"
                className="col-sm-2 control-label"
              >Status</label>
              <div className="col-sm-10">
                <select
                  id="inputCharacterSetStatus" className="form-control"
                  ref={c => {
                    this.inputCharacterSetStatus = c;
                  }}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
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
            onClick={event => this.createCharacterSet(event)}
          ><i className="fa fa-floppy-o" /> Save</Link>
        </div>
      </div>
    );
  }
}

export default CreateCharacterSetForm;
