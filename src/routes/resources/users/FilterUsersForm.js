/**
 * Created by Manhhailua on 11/9/16.
 */

import React, { Component, PropTypes } from 'react';

class FilterUsersForm extends Component {

  static propTypes = {
    filters: PropTypes.object,
    roles: PropTypes.array.isRequired,
    setUsersFilters: PropTypes.func.isRequired,
  };

  onFilterChange(event, field) {
    event.persist();

    this.props.setUsersFilters({
      [field]: event.target.value,
    });
  }

  render() {
    return (
      <form className="form-horizontal">
        <div className="box-body">
          {/* role */}
          <div className="form-group">
            <label
              htmlFor="inputUsersFilterRole"
              className="col-sm-2 control-label"
            >Role</label>
            <div className="col-sm-10">
              <select
                id="inputUsersFilterRole"
                className="form-control select2"
                style={{ width: '100%' }}
                ref={c => {
                  this.inputUsersFilterRole = c;
                }}
                onChange={event => this.onFilterChange(event, 'roleUniqueName')}
                defaultValue={this.props.filters.roleUniqueName}
              >
                <option value="null">All roles</option>
                {this.props.roles && this.props.roles.map(role => (
                  <option
                    key={role.id} value={role.uniqueName}
                  >{role.name}</option>
                ))}
              </select>
            </div>
          </div>
          {/* emailConfirmed */}
          <div className="form-group">
            <label
              htmlFor="inputUsersFilterEmailConfirmed"
              className="col-sm-2 control-label"
            >Email confirmed</label>
            <div className="col-sm-10">
              <select
                id="inputUsersFilterEmailConfirmed"
                className="form-control"
                ref={c => {
                  this.inputUsersFilterEmailConfirmed = c;
                }}
                onChange={event => this.onFilterChange(event, 'emailConfirmed')}
                defaultValue={this.props.filters.emailConfirmed}
              >
                <option value="null">All types</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
          </div>
          {/* status */}
          <div className="form-group">
            <label
              htmlFor="inputUsersFilterStatus"
              className="col-sm-2 control-label"
            >Status</label>
            <div className="col-sm-10">
              <select
                id="inputUsersFilterStatus" className="form-control"
                ref={c => {
                  this.inputUsersFilterStatus = c;
                }}
                onChange={event => this.onFilterChange(event, 'status')}
                defaultValue={this.props.filters.status}
              >
                <option value="null">All states</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>
        {/* /.box-body */}
      </form>
    );
  }
}

export default FilterUsersForm;
