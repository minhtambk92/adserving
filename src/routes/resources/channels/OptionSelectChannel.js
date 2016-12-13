import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
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
  };

  async componentDidMount() {
    await ReactDOM.render(this.renderDOMLibs(), this.portal);
    if (this.props.value && this.props.name && this.props.comparison) {
      this.inputSiteFilter.value = this.props.comparison;
      this.inputTypeFilter.value = this.props.logical;
      const value = this.props.value;
      const arr = value.split(',');
      /* eslint-disable no-undef */
      for (let i = 0; i < arr.length; i += 1) {
        const id = `${this.props.name}${arr[i]}${this.props.index}`;
        $(`#${id}`).iCheck('check');
      }
      /* eslint-enable no-undef */
    }
  }

  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(this.portal);
  }

  deleteOption() { // eslint-disable-line no-unused-vars, class-methods-use-this
    if (this.props.value && this.props.name && this.props.comparison) {
      this.props.deleteOptionChannel(this.props.optionChannelId).then(() => {
        // this.props.getChannel(this.props.channelId);
      });
    }
  }

  renderDOMLibs() {
    const id = `optionChannelCheckBox-${this.props.index}`;
    return (
      <div className="box box-solid box-primary">
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
                    ref={c => {
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
                        ref={c => {
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
                      {this.props.data.map((data) =>
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
    );
  }

  render() {
    // Open the portal
    return (
      <div
        className={`optionChannel-${this.props.index}`}
        id={this.props.id}
        ref={c => {
          this.portal = c;
        }}
      />
    );
  }
}

export default OptionSelectChannel;
