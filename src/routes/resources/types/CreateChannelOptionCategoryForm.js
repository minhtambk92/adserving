/* global $ */

import React, { Component, PropTypes } from 'react';
import Link from '../../../components/Link';

class CreateChannelOptionCategoryForm extends Component {

  static propTypes = {
    index: PropTypes.number,
    id: PropTypes.string,
    channelOptionCategories: PropTypes.object,
    statusCategoryCreate: PropTypes.func,
    page: PropTypes.object,
    createChannelOptionCategory: PropTypes.func,
  };

  convertToSlug(Text) { // eslint-disable-line no-unused-vars, class-methods-use-this
    let str;
    str = Text.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    const from = 'ăắãàáäâẽèéëêếềìịíïîõòóöôộùúüûñç·/_,:;';
    const to = 'aaaaaaaeeeeeeeiiiiioooooouuuunc------';
    for (let i = 0, l = from.length; i < l; i += 1) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
      .replace(/\s+/g, '-') // collapse whitespace and replace by -
      .replace(/-+/g, '-'); // collapse dashes

    return str;
  }

  clear() { // eslint-disable-line no-unused-vars, class-methods-use-this
    $('#inputCreateChannelOptionCategoryName').val('');
  }

  createChannelOptionCategory() {
    const name = $('#inputCreateChannelOptionCategoryName').val();
    const value = this.convertToSlug(name);
    const status = $('#inputCreateChannelOptionCategoryStatus').val();
    if (name) {
      this.props.createChannelOptionCategory({
        name,
        value,
        status,
      });
    }
    this.props.statusCategoryCreate(false);
    // this.props.setPageZoneActiveTab('ChannelOptionCategoryZone');
  }

  removeCreateForm() {
    this.props.statusCategoryCreate(false);
  }

  render() {
    return (
      <div
        className={`list-zone-ChannelOptionCategory list-zone-ChannelOptionCategory-${this.props.index}`}
      >
        <div className="box-header with-border">
          <h3
            className="box-title"
          >
            Add New</h3>
          <div className="box-tools pull-right">
            <button
              className="btn btn-box-tool remove-ChannelOptionCategory-zone"
              onClick={event => this.removeCreateForm(event)}
            >
              <i className="fa fa-times" />
            </button>
          </div>
        </div>
        <div className="box-body">
          <div className={`form-horizontal ListChannelOptionCategory-${this.props.index}`}>
            <div className="form-group">
              <label
                htmlFor="inputCreateChannelOptionCategoryName" className="col-sm-2 control-label"
              >Name</label>
              <div className="col-sm-10">
                <input
                  type="text" className="form-control" id="inputCreateChannelOptionCategoryName"
                  placeholder="Name"
                  ref={c => {
                    this.inputCreateChannelOptionCategoryName = c;
                  }}
                />
              </div>
            </div>
            <div className="form-group">
              <label
                htmlFor="inputCreateChannelOptionCategoryStatus"
                className="col-sm-2 control-label"
              >Status</label>
              <div className="col-sm-10">
                <select
                  id="inputCreateChannelOptionCategoryStatus" className="form-control"
                  ref={c => {
                    this.inputCreateChannelOptionCategoryStatus = c;
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
            onClick={event => this.createChannelOptionCategory(event)}
          ><i className="fa fa-floppy-o" /> Save</Link>
        </div>
      </div>
    );
  }
}

export default CreateChannelOptionCategoryForm;
