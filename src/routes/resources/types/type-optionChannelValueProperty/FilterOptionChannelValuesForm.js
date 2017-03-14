import React, { Component, PropTypes } from 'react';

class FilterOptionChannelValuesForm extends Component {

  static propTypes = {
    filters: PropTypes.object,
    optionChannelValueList: PropTypes.array.isRequired,
    setOptionChannelValuePropertyFilters: PropTypes.func.isRequired,
    currentOptionChannelValueId: PropTypes.string,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentOptionChannelValueId === undefined &&
      nextProps.optionChannelValueList.length > 0) {
      this.inputOptionChannelValuesFilters.value = nextProps.optionChannelValueList[0].id;
    }
  }

  onFilterChange(event, field) {
    event.persist();

    this.props.setOptionChannelValuePropertyFilters({
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
              htmlFor="inputOptionChannelValuesFilterPlacement"
              className="col-sm-2 control-label"
            >Option Channel Value</label>
            <div className="col-sm-10">
              <select
                id="inputOptionChannelValuesFilters"
                className="form-control select2"
                style={{ width: '100%' }}
                onChange={event => this.onFilterChange(event, 'optionChannelValueId')}
                ref={(c) => {
                  this.inputOptionChannelValuesFilters = c;
                }}
                defaultValue={this.props.filters &&
                this.props.filters.optionChannelValueId}
              >
                {this.props.optionChannelValueList &&
                this.props.optionChannelValueList.map(optionChannelValue => (
                  <option
                    key={optionChannelValue.id} value={optionChannelValue.id}
                  >{optionChannelValue.name}</option>
                ))}
              </select>
            </div>
          </div>
          {/* status */}
          <div className="form-group">
            <label
              htmlFor="inputOptionChannelValuesFilterStatus"
              className="col-sm-2 control-label"
            >Status</label>
            <div className="col-sm-10">
              <select
                id="inputOptionChannelValuesFilterStatus" className="form-control"
                ref={(c) => {
                  this.inputOptionChannelValuesFilterStatus = c;
                }}
                onChange={event => this.onFilterChange(event, 'status')}
                defaultValue={this.props.filters &&
                this.props.filters.status}
              >
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

export default FilterOptionChannelValuesForm;
