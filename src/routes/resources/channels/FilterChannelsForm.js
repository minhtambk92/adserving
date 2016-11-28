import React, { Component, PropTypes } from 'react';

class FilterChannelsForm extends Component {

  static propTypes = {
    filters: PropTypes.object,
    sites: PropTypes.array.isRequired,
    setChannelsFilters: PropTypes.func,
  };

  onFilterChange(event, field) {
    event.persist();

    this.props.setChannelsFilters({
      [field]: event.target.value,
    });
  }

  render() {
    return (
      <form className="form-horizontal">
        <div className="box-body">
          <div className="form-group">
            <label
              htmlFor="inputChannelsFilterSite"
              className="col-sm-2 control-label"
            >Site</label>
            <div className="col-sm-10">
              <select
                id="inputChannelsFilterSite"
                className="form-control select2"
                style={{ width: '100%' }}
                ref={c => {
                  this.inputChannelsFilterSite = c;
                }}
                onChange={event => this.onFilterChange(event, 'siteId')}
                defaultValue={this.props.filters &&
                this.props.filters.siteId}
              >
                <option value="null">All sites</option>
                {this.props.sites &&
                this.props.sites.map(site => (
                  <option
                    key={site.id} value={site.id}
                  >{site.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label
              htmlFor="inputChannelsFilterStatus"
              className="col-sm-2 control-label"
            >Status</label>
            <div className="col-sm-10">
              <select
                id="inputChannelsFilterStatus" className="form-control"
                ref={c => {
                  this.inputChannelsFilterStatus = c;
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

export default FilterChannelsForm;
