/**
 * Created by Manhhailua on 11/9/16.
 */

import React, { Component, PropTypes } from 'react';

class FilterRolesForm extends Component {

  static propTypes = {
    filters: PropTypes.object.isRequired,
    setRolesFilters: PropTypes.func.isRequired,
  };

  onFilterChange(event, field) {
    event.persist();

    this.props.setRolesFilters({
      [field]: event.target.value,
    });
  }

  render() {
    return (
      <form className="form-horizontal">
        <div className="box-body">
          {/* status */}
          <div className="form-group">
            <label
              htmlFor="inputRolesFilterStatus"
              className="col-sm-2 control-label"
            >Status</label>
            <div className="col-sm-10">
              <select
                id="inputRolesFilterStatus" className="form-control"
                ref={(c) => {
                  this.inputRolesFilterStatus = c;
                }}
                onChange={event => this.onFilterChange(event, 'status')}
                defaultValue={this.props.filters && this.props.filters.status}
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

export default FilterRolesForm;
