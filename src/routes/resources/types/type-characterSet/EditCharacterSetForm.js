/* global $ */
/* global jQuery */

import React, { Component, PropTypes } from 'react';
import Link from '../../../../components/Link';

class EditCharacterSetForm extends Component {

  static propTypes = {
    id: PropTypes.string,
    characterSets: PropTypes.object,
    statusUpdateCharacterSet: PropTypes.func,
    page: PropTypes.object,
    characterSet: PropTypes.object,
    updateCharacterSet: PropTypes.func,
    getCharacterSets: PropTypes.func,
    createActivity: PropTypes.func,
    user: PropTypes.object,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.characterSet) {
      this.inputCharacterSetName.value = nextProps.characterSet.name;
      this.inputCharacterSetStatus.value = nextProps.characterSet.status;
      this.inputCharacterSetValue.value = nextProps.characterSet.value;
    }
  }

  clear() { // eslint-disable-line no-unused-vars, class-methods-use-this
    this.inputCharacterSetName.value = null;
    this.inputCharacterSetValue.value = null;
  }

  save() {
    const characterSetObject = jQuery.extend({}, this.props.characterSet);
    const id = this.props.id;
    const name = this.inputCharacterSetName.value;
    const value = this.inputCharacterSetValue.value;
    const status = this.inputCharacterSetStatus.value;
    if (name) {
      this.props.updateCharacterSet({
        id,
        name,
        value,
        status,
      }).then(() => {
        const userId = this.props.user.id;
        const subject = `CharacterSet ${name}`;
        const subjectId = this.props.characterSet.id;
        const action = 'updated';
        const other = JSON.stringify(characterSetObject);
        this.props.createActivity({ action,
          subject,
          subjectId,
          other,
          userId }).then(() => {
            this.props.getCharacterSets();
          });
      });
    }
    this.props.statusUpdateCharacterSet(false);
  }

  removeEditForm() {
    this.props.statusUpdateCharacterSet(false);
  }

  render() {
    return (
      <div
        className="edit-characterSet"
      >
        <div className="box-header with-border">
          <h3
            className="box-title"
          >
            {`Edit: ${this.props.characterSet.name}`}</h3>
          <div className="box-tools pull-right">
            <button
              className="btn btn-box-tool remove-CharacterSet-zone"
              onClick={event => this.removeEditForm(event)}
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
                  ref={(c) => {
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
                  ref={(c) => {
                    this.inputCharacterSetValue = c;
                  }}
                />
              </div>
            </div>

            <div className="form-group">
              <label
                htmlFor="inputEditCharacterSetStatus"
                className="col-sm-2 control-label"
              >Status</label>
              <div className="col-sm-10">
                <select
                  id="inputCharacterSetStatus" className="form-control"
                  ref={(c) => {
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
            onClick={event => this.save(event)}
          ><i className="fa fa-floppy-o" /> Save</Link>
        </div>
      </div>
    );
  }
}

export default EditCharacterSetForm;
