import React, { Component, PropTypes } from 'react';

class FilterZonesForm extends Component {

  static propTypes = {
    filters: PropTypes.object,
    sites: PropTypes.array.isRequired,
    setZonesFilters: PropTypes.func.isRequired,
    zoneTypes: PropTypes.array,
  };

  onFilterChange(event, field) {
    event.persist();

    this.props.setZonesFilters({
      [field]: event.target.value,
    });
  }

  render() {
    return (
      <form className="form-horizontal">
        <div className="box-body">
          <div className="form-group">
            <label
              htmlFor="inputZonesFilterSite"
              className="col-sm-2 control-label"
            >Website</label>
            <div className="col-sm-10">
              <select
                id="inputZonesFilterSite"
                className="form-control select2"
                style={{ width: '100%' }}
                ref={(c) => {
                  this.inputZonesFilterSite = c;
                }}
                onChange={event => this.onFilterChange(event, 'siteId')}
                defaultValue={this.props.filters && this.props.filters.siteId}
              >
                <option value="null">All sites</option>
                {this.props.sites && this.props.sites.map(site => (
                  <option
                    key={site.id} value={site.id}
                  >{site.name} | {site.domain}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label
              htmlFor="inputZonesFilterType"
              className="col-sm-2 control-label"
            >Type</label>
            <div className="col-sm-10">
              <select
                id="inputZonesFilterType"
                className="form-control"
                ref={(c) => {
                  this.inputZonesFilterType = c;
                }}
                onChange={event => this.onFilterChange(event, 'zoneTypeId')}
                defaultValue={this.props.filters && this.props.filters.zoneTypeId}
              >
                <option value="null">All types</option>
                {this.props.zoneTypes && this.props.zoneTypes.map(zoneType => (
                  <option
                    key={zoneType.id} value={zoneType.id}
                  >{zoneType.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label
              htmlFor="inputZonesFilterStatus"
              className="col-sm-2 control-label"
            >Status</label>
            <div className="col-sm-10">
              <select
                id="inputZonesFilterStatus" className="form-control"
                ref={(c) => {
                  this.inputZonesFilterStatus = c;
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

export default FilterZonesForm;
