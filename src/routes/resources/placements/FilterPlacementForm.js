import React, { Component, PropTypes } from 'react';

class FilterPlacementsForm extends Component {

  static propTypes = {
    filters: PropTypes.object,
    campaigns: PropTypes.array.isRequired,
    setPlacementsFilters: PropTypes.func.isRequired,
  };

  onFilterChange(event, field) {
    event.persist();

    this.props.setPlacementsFilters({
      [field]: event.target.value,
    });
  }

  render() {
    return (
      <form className="form-horizontal">
        <div className="box-body">
          <div className="form-group">
            <label
              htmlFor="inputPlacementsFilterCampaign"
              className="col-sm-2 control-label"
            >Campaign</label>
            <div className="col-sm-10">
              <select
                id="inputPlacementsFilterCampaign"
                className="form-control select2"
                style={{ width: '100%' }}
                ref={c => {
                  this.inputPlacementsFilterCampaign = c;
                }}
                onChange={event => this.onFilterChange(event, 'campaignId')}
                defaultValue={this.props.filters &&
                          this.props.filters.campaignId}
              >
                <option value="null">All campaigns</option>
                {this.props.campaigns &&
                this.props.campaigns.map(campaign => (
                  <option
                    key={campaign.id} value={campaign.id}
                  >{campaign.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label
              htmlFor="inputPlacementsFilterStatus"
              className="col-sm-2 control-label"
            >Status</label>
            <div className="col-sm-10">
              <select
                id="inputPlacementsFilterStatus" className="form-control"
                ref={c => {
                  this.inputPlacementsFilterStatus = c;
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

export default FilterPlacementsForm;
