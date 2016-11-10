import React, { Component, PropTypes } from 'react';

class FilterCampaignsForm extends Component {

  static propTypes = {
    filters: PropTypes.object,
    placements: PropTypes.array.isRequired,
    setBannersFilters: PropTypes.func.isRequired,
  };

  onFilterChange(event, field) {
    event.persist();

    this.props.setBannersFilters({
      [field]: event.target.value,
    });
  }

  render() {
    return (
      <form className="form-horizontal">
        <div className="box-body">
          {/* placement */}
          <div className="form-group">
            <label
              htmlFor="inputBannersFilterPlacement"
              className="col-sm-2 control-label"
            >Placement</label>
            <div className="col-sm-10">
              <select
                id="inputBannersFilterPlacement"
                className="form-control select2"
                style={{ width: '100%' }}
                ref={c => {
                  this.inputBannersFilterPlacement = c;
                }}
                onChange={event => this.onFilterChange(event, 'placementId')}
                defaultValue={this.props.filters &&
                          this.props.filters.placementId}
              >
                <option value="null">All placements</option>
                {this.props.placements &&
                this.props.placements.map(placement => (
                  <option
                    key={placement.id} value={placement.id}
                  >{placement.name}</option>
                ))}
              </select>
            </div>
          </div>
          {/* status */}
          <div className="form-group">
            <label
              htmlFor="inputBannersFilterStatus"
              className="col-sm-2 control-label"
            >Status</label>
            <div className="col-sm-10">
              <select
                id="inputBannersFilterStatus" className="form-control"
                ref={c => {
                  this.inputBannersFilterStatus = c;
                }}
                onChange={event => this.onFilterChange(event, 'status')}
                defaultValue={this.props.filters &&
                          this.props.filters.status}
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

export default FilterCampaignsForm;
