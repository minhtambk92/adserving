import React, { Component, PropTypes } from 'react';

class FilterOptionChannelTypesForm extends Component {

  static propTypes = {
    filters: PropTypes.object,
    optionChannelTypeList: PropTypes.array.isRequired,
    setOptionChannelValueFilters: PropTypes.func.isRequired,
    currentOptionChannelTypeId: PropTypes.string,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentOptionChannelTypeId === undefined &&
      nextProps.optionChannelTypeList.length > 0) {
      this.inputOptionChannelTypesFilters.value = nextProps.optionChannelTypeList[0].id;
    }
  }

  onFilterChange(event, field) {
    event.persist();

    this.props.setOptionChannelValueFilters({
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
              htmlFor="inputOptionChannelTypesFilterPlacement"
              className="col-sm-2 control-label"
            >Option Channel Type</label>
            <div className="col-sm-10">
              <select
                id="inputOptionChannelTypesFilters"
                className="form-control select2"
                style={{ width: '100%' }}
                onChange={event => this.onFilterChange(event, 'optionChannelTypeId')}
                ref={(c) => {
                  this.inputOptionChannelTypesFilters = c;
                }}
                defaultValue={this.props.filters &&
                          this.props.filters.optionChannelTypeId}
              >
                <option value="null">All Option Channel Type</option>
                {this.props.optionChannelTypeList &&
                this.props.optionChannelTypeList.map(optionChannelType => (
                  <option
                    key={optionChannelType.id} value={optionChannelType.id}
                  >{optionChannelType.name}</option>
                ))}
              </select>
            </div>
          </div>
          {/* status */}
          <div className="form-group">
            <label
              htmlFor="inputOptionChannelTypesFilterStatus"
              className="col-sm-2 control-label"
            >Status</label>
            <div className="col-sm-10">
              <select
                id="inputOptionChannelTypesFilterStatus" className="form-control"
                ref={(c) => {
                  this.inputOptionChannelTypesFilterStatus = c;
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

export default FilterOptionChannelTypesForm;
