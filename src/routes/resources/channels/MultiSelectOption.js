
/* global $ */

import React, { Component, PropTypes } from 'react';

class MultiSelectOption extends Component {

  static propTypes = {
    option: PropTypes.object,
    id: PropTypes.string,
    name: PropTypes.string,
    data: PropTypes.array,
    value: PropTypes.array,
    index: PropTypes.number,
    typeId: PropTypes.string,
    createActivity: PropTypes.func,
    user: PropTypes.object,
    deleteOptionChannel: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      arrSelect: [],
    };
  }

  componentDidMount() {
    $('.inputMultiSelectOption').select2();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.id &&
      nextProps.data && nextProps.option && nextProps.name) {
      this.inputSiteFilter.value = nextProps.option.comparison;
      this.inputTypeFilter.value = nextProps.option.logical;
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
            <h3 className="box-title">{this.props.name ? this.props.name : ('Multiple Select')}</h3>
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
                    {/* option Channel Type */}
                    <div className="form-group">
                      <label
                        htmlFor="inputMultiSelectOption"
                        className="col-sm-3 control-label"
                      >Multiple Select</label>
                      <div className="col-sm-9">
                        <select
                          className="form-control inputMultiSelectOption"
                          style={{ width: '100%' }}
                          data-placeholder="Multiple Option"
                          defaultValue={this.props.value}
                          multiple
                          ref={(c) => {
                            this.inputMultiSelectOption = c;
                          }}
                        >
                          <optgroup>
                            {this.props.data &&
                            this.props.data.map(option => (
                              <option
                                key={option.id} value={option.value}
                              >{option.name}</option>
                            ))}
                          </optgroup>
                        </select>
                      </div>
                    </div>
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

export default MultiSelectOption;
