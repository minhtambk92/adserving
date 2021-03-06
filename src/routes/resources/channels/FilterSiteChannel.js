import React, { Component, PropTypes } from 'react';

class FilterSiteChannel extends Component {

  static propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.object,
    index: PropTypes.number,
    typeId: PropTypes.string,
    createActivity: PropTypes.func,
    user: PropTypes.object,
    option: PropTypes.object,
    deleteOptionChannel: PropTypes.func,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.type && nextProps.option && nextProps.option.logical &&
      nextProps.option.comparison) {
      this.inputTypeFilter.value = nextProps.option.logical;
      this.inputSiteFilter.value = nextProps.option.comparison;
    }
  }

  deleteOption() { // eslint-disable-line no-unused-vars, class-methods-use-this
    if (this.props.option && this.props.option.value && this.props.name &&
      this.props.option.comparison) {
      this.props.deleteOptionChannel(this.props.id).then(() => {
        const userId = this.props.user.id;
        const subject = `Option Channel ${this.props.name}`;
        const subjectId = this.props.id;
        const action = 'deleted';
        const other = '';
        this.props.createActivity({ action,
          subject,
          subjectId,
          other,
          userId });
      });
    }
  }

  render() {
    // Open the portal
    return (
      <div
        className={`optionChannel-${this.props.index}`}
        id={this.props.id}
      >
        <div className="box box-solid box-primary" id={`${this.props.typeId}-${this.props.index}`}>
          <div className="box-header">
            {
              this.props.type && this.props.type.isVariable === true ?
                (
                  <h3 className="box-title">Variable</h3>
                ) : (
                  <h3 className="box-title">{this.props.name}</h3>
                )
            }
            <div className="box-tools pull-right">
              <button
                className="btn btn-box-tool remove-option"
                data-widget="remove"
                onClick={event => this.deleteOption(event)}
              >
                <i
                  className="fa fa-times"
                />
              </button>
            </div>
          </div>
          {/* /.box-header */}
          <div className="box-body">
            <div className="col-lg-2">
              <div className="box-body">
                <div className="form-group">
                  <div className="col-sm-12">
                    <select
                      className="form-control inputTypeFilter"
                      ref={(c) => {
                        this.inputTypeFilter = c;
                      }}
                    >
                      <option value="and">AND</option>
                      <option value="or">OR</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="box-body">
                <div className="row">
                  <form className="form-horizontal">
                    <div className="form-group">
                      <label
                        htmlFor="inputChannelOption"
                        className="col-sm-3 control-label"
                      >&nbsp;</label>
                      <div className="col-sm-9">
                        <select
                          className="form-control inputSiteFilter"
                          ref={(c) => {
                            this.inputSiteFilter = c;
                          }}
                        >
                          <option value="==">is equal to</option>
                          <option value="!=">is different from</option>
                          <option value="=~">Contains</option>
                          <option value="!~">Does not contain</option>
                          <option value="=x">Regex match</option>
                          <option value="!x">Regex does not match</option>
                        </select>
                      </div>
                    </div>
                    {
                      this.props.type && this.props.type.isVariable === true ?
                        (
                          <div className="optionVariable" id={`variable-${this.props.index}`}>
                            <div className="form-group">
                              <label
                                htmlFor="inputChannelOptionURL" className="col-sm-3 control-label"
                              >Name</label>
                              <div className="col-sm-9">
                                <input
                                  type="text" className="form-control inputChannelVariableName"
                                  placeholder="http://www.google.com"
                                  defaultValue={this.props.name}
                                />
                              </div>
                            </div>
                            <div className="form-group">
                              <label
                                htmlFor="inputChannelOptionURL" className="col-sm-3 control-label"
                              >Value</label>
                              <div className="col-sm-9">
                                <input
                                  type="text" className="form-control inputChannelVariableValue"
                                  placeholder="http://www.google.com"
                                  defaultValue={this.props.option && this.props.option.value}
                                />
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="form-group">
                            <label
                              htmlFor="inputChannelOptionURL" className="col-sm-3 control-label"
                            >URL</label>
                            <div className="col-sm-9">
                              <input
                                type="text" className="form-control inputChannelOptionURL"
                                placeholder="http://www.google.com"
                                defaultValue={this.props.option && this.props.option.value}
                              />
                            </div>
                          </div>
                        )
                    }
                  </form>
                </div>
              </div>
            </div>
          </div>
          {/* /.box-body */}
        </div>
      </div>
    );
  }
}

export default FilterSiteChannel;
