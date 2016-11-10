import React, { Component, PropTypes } from 'react';

class FilterCampaignsForm extends Component {

  static propTypes = {
    filters: PropTypes.object,
    advertisers: PropTypes.array.isRequired,
    setCampaignsFilters: PropTypes.func.isRequired,
  };

  onFilterChange(event, field) {
    event.persist();

    this.props.setCampaignsFilters({
      [field]: event.target.value,
    });
  }

  render() {
    return (
      <form className="form-horizontal">
        <div className="box-body">
          <div className="form-group">
            <label
              htmlFor="inputCampaignsFilterAdvertiser"
              className="col-sm-2 control-label"
            >Advertiser</label>
            <div className="col-sm-10">
              <select
                id="inputCampaignsFilterAdvertiser"
                className="form-control select2"
                style={{ width: '100%' }}
                ref={c => {
                  this.inputCampaignsFilterAdvertiser = c;
                }}
                onChange={event => this.onFilterChange(event, 'advertiserId')}
                defaultValue={this.props.filters &&
                          this.props.filters.advertiserId}
              >
                <option value="null">All sites</option>
                {this.props.advertisers &&
                this.props.advertisers.map(advertiser => (
                  <option
                    key={advertiser.id} value={advertiser.id}
                  >{advertiser.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label
              htmlFor="inputCampaignsFilterStatus"
              className="col-sm-2 control-label"
            >Status</label>
            <div className="col-sm-10">
              <select
                id="inputCampaignsFilterStatus" className="form-control"
                ref={c => {
                  this.inputCampaignsFilterStatus = c;
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
