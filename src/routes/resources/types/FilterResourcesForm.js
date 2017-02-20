/**
 * Created by Manhhailua on 11/9/16.
 */

import React, { Component, PropTypes } from 'react';

class FilterResourcesForm extends Component {

  static propTypes = {
    filters: PropTypes.object.isRequired,
    setResourcesFilters: PropTypes.func.isRequired,
  };

  onFilterChange(event, field) {
    event.persist();

    this.props.setResourcesFilters({
      [field]: event.target.value,
    });
  }

  render() {
    return (
      <form className="form-horizontal">
        <div className="box-body">
          <div className="form-group">
            <label
              htmlFor="inputResourcesFilterHasMeta"
              className="col-sm-2 control-label"
            >Have meta value</label>
            <div className="col-sm-10">
              <select
                id="inputResourcesFilterHasMeta"
                className="form-control"
                ref={(c) => {
                  this.inputResourcesFilterHasMeta = c;
                }}
                onChange={event => this.onFilterChange(event, 'hasMeta')}
                defaultValue={
                  this.props.filters && this.props.filters.emailConfirmed
                }
              >
                <option value="null">All types</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label
              htmlFor="inputResourcesFilterStatus"
              className="col-sm-2 control-label"
            >Status</label>
            <div className="col-sm-10">
              <select
                id="inputResourcesFilterStatus" className="form-control"
                ref={(c) => {
                  this.inputResourcesFilterStatus = c;
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

export default FilterResourcesForm;
