/* global $ */

import React, { Component, PropTypes } from 'react';
import Link from '../../../../components/Link';

class EditChannelOptionCategoryForm extends Component {

  static propTypes = {
    id: PropTypes.string,
    channelOptionCategories: PropTypes.object,
    statusCategoryEdit: PropTypes.func,
    page: PropTypes.object,
    category: PropTypes.object,
    updateChannelOptionCategory: PropTypes.func,
    getChannelOptionCategories: PropTypes.func,
    convertToSlug: PropTypes.func,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.category) {
      this.inputChannelOptionCategoryName.value = nextProps.category.name;
      this.inputChannelOptionCategoryStatus.value = nextProps.category.status;
    }
  }

  convertToSlug(Text) { // eslint-disable-line no-unused-vars, class-methods-use-this
    let str;
    str = Text.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    const from = 'aàáạãảăằắẵặẳâậầấẫẩeèéẽẹẻiíìịĩỉoọòóõỏôốồộỗổơớờỡợởêệềếễểủúùụũưửừứựữëïöüũûñç·/_,:;';
    const to = 'aaaaaaaaaaaaaaaaaaeeeeeeiiiiiiooooooooooooooooooeeeeeeuuuuuuuuuuueiouunc------';
    for (let i = 0, l = from.length; i < l; i += 1) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
      .replace(/\s+/g, '-') // collapse whitespace and replace by -
      .replace(/-+/g, '-'); // collapse dashes

    return str;
  }

  clear() { // eslint-disable-line no-unused-vars, class-methods-use-this
    this.inputChannelOptionCategoryName.value = null;
  }

  save() {
    const id = this.props.id;
    const name = this.inputChannelOptionCategoryName.value;
    const value = this.convertToSlug(name);
    const status = this.inputChannelOptionCategoryStatus.value;
    if (name) {
      this.props.updateChannelOptionCategory({
        id,
        name,
        value,
        status,
      }).then(() => {
        this.props.getChannelOptionCategories();
      });
    }
    this.props.statusCategoryEdit(false);
    // this.props.setPageZoneActiveTab('ChannelOptionCategoryZone');
  }

  removeEditForm() {
    this.props.statusCategoryEdit(false);
  }

  render() {
    return (
      <div
        className="edit-ChannelOptionCategory"
      >
        <div className="box-header with-border">
          <h3
            className="box-title"
          >
            {`Edit: ${this.props.category.name}`}</h3>
          <div className="box-tools pull-right">
            <button
              className="btn btn-box-tool remove-ChannelOptionCategory-zone"
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
                htmlFor="inputChannelOptionCategoryName" className="col-sm-2 control-label"
              >Name</label>
              <div className="col-sm-10">
                <input
                  type="text" className="form-control" id="inputChannelOptionCategoryName"
                  placeholder="Name"
                  ref={c => {
                    this.inputChannelOptionCategoryName = c;
                  }}
                />
              </div>
            </div>
            <div className="form-group">
              <label
                htmlFor="inputEditChannelOptionCategoryStatus"
                className="col-sm-2 control-label"
              >Status</label>
              <div className="col-sm-10">
                <select
                  id="inputChannelOptionCategoryStatus" className="form-control"
                  ref={c => {
                    this.inputChannelOptionCategoryStatus = c;
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

export default EditChannelOptionCategoryForm;
