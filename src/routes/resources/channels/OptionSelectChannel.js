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
  };

  async componentDidMount() {
    await ReactDOM.render(this.renderDOMLibs(), this.portal);
    if (this.props.value && this.props.name && this.props.comparison) {
      this.inputTypeFilter.value = this.props.comparison;
      const value = this.props.value;
      const arr = value.split(',');
      /* eslint-disable no-undef */
      for (let i = 0; i < arr.length; i += 1) {
        const id = `${this.props.name}${arr[i]}`;
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
    return (
      <div className="col-lg-12">
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
            <div className="col-lg-4">
              <div className="box-body">
                <div className="form-group">
                  <div className="col-sm-12">
                    <select
                      className="form-control inputTypeFilter"
                      ref={c => {
                        this.inputTypeFilter = c;
                      }}
                    >
                      <option value="==">Is any of</option>
                      <option value="!=">Is not any of</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="box-body">
                <div className="row">
                  {this.props.data.map((data) =>
                    <div className="col-sm-3" key={data.id}>
                      <label
                        htmlFor="inputChannelOptions"
                        className="control-label"
                      >
                        <ICheck
                          type="checkbox"
                          id={this.props.name + data.value}
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
            </div>
          </div>
          {/* /.box-body */}
        </div>
      </div>
    );
  }

  render() {
    // Open the portal
    return (
      <div
        className="row"
        id={this.props.id}
        ref={c => {
          this.portal = c;
        }}
      />
    );
  }
}

export default OptionSelectChannel;
