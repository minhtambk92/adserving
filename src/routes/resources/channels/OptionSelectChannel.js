
/* global $ */

import React, { Component, PropTypes } from 'react';
import { ICheck } from '../../../components/UI/';

class OptionSelectChannel extends Component {

  static propTypes = {
    options: PropTypes.object,
    data: PropTypes.array,
    id: PropTypes.string,
    name: PropTypes.string,
    comparison: PropTypes.string,
    value: PropTypes.string,
    optionChannelId: PropTypes.string,
    deleteOptionChannel: PropTypes.func,
    logical: PropTypes.string,
    index: PropTypes.number,
    typeId: PropTypes.string,
    createActivity: PropTypes.func,
    user: PropTypes.object,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.id &&
      nextProps.data && nextProps.value && nextProps.name && nextProps.comparison) {
      this.inputSiteFilter.value = nextProps.comparison;
      this.inputTypeFilter.value = nextProps.logical;
      const value = nextProps.value;
      const arr = value.split(',');
      if (nextProps.data.length > 0) {
        // for (let i = 0; i < nextProps.data.length; i += 1) {
        //   const id = `${nextProps.id}${nextProps.data[i].value}${nextProps.index}`;
        //   $(`#${id}`).iCheck('uncheck');
        // }
        for (let i = 0; i < arr.length; i += 1) {
          const id = `${nextProps.id}${arr[i]}${nextProps.index}`;
          $(`#${id}`).iCheck('check');
        }
      }
    }
  }

  deleteOption() { // eslint-disable-line no-unused-vars, class-methods-use-this
    if (this.props.value && this.props.name && this.props.comparison) {
      this.props.deleteOptionChannel(this.props.optionChannelId).then(() => {
        const userId = this.props.user.id;
        const subject = `Option Channel ${this.props.name}`;
        const subjectId = this.props.optionChannelId;
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
    const id = `optionChannelCheckBox-${this.props.index}`;
    return (
      <div
        className={`optionChannel-${this.props.index}`}
        id={this.props.id}
      >
        <div className="box box-solid box-primary" id={(this.props.typeId !== undefined) ? `${this.props.typeId}-${this.props.index}` : ('')}>
          <div className="box-header">
            <h3 className="box-title">{this.props.name}</h3>
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
                      <label htmlFor="inputChannelOption" className="col-sm-3 control-label">Comparison</label>
                      <div className="col-sm-9">
                        <select
                          className="form-control inputSiteFilter"
                          ref={(c) => {
                            this.inputSiteFilter = c;
                          }}
                        >
                          <option value="==">Is any of</option>
                          <option value="!=">Is not any of</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="col-lg-3">&nbsp;</div>
                      <div className="col-lg-9 optionVariable" id={id}>
                        {this.props.data && this.props.data.map(data =>
                          <div className="col-sm-3" key={data.id}>
                            <label
                              htmlFor="inputChannelOptions"
                              className="control-label"
                            >
                              <ICheck
                                type="checkbox"
                                id={this.props.name + data.value + this.props.index}
                                className="inputOption"
                                value={data.value}
                              />
                              {data.name}
                            </label>
                          </div>,
                        )
                        }
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

export default OptionSelectChannel;
