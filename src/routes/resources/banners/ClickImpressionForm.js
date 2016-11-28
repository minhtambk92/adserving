import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

class ClickImpressionForm extends Component {

  static propTypes = {
    id: PropTypes.string,
    index: PropTypes.number,
    clickUrl: PropTypes.string,
    impressionUrl: PropTypes.string,
  };

  async componentDidMount() {
    await ReactDOM.render(this.renderDOMLibs(), this.portal);
  }

  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(this.portal);
  }

  renderDOMLibs() {
    return (
      <div className="click-impression">
        <button
          type="button" className="close closeClickImpression" aria-hidden="true"
        >×
        </button>
        <div className="form-group">
          <label
            htmlFor="inputLinkClick"
            className="col-sm-2 control-label"
          >Link Click</label>
          <div className="col-sm-8">
            <input
              type="text" className="form-control"
              id={`inputLinkClick-${this.props.index}`} placeholder="1000"
              defaultValue={this.props.clickUrl}
            />
          </div>
        </div>
        <div className="form-group">
          <label
            htmlFor="inputLinkImpression"
            className="col-sm-2 control-label"
          >Link Impression</label>
          <div className="col-sm-8">
            <input
              type="text" className="form-control"
              id={`inputLinkImpression-${this.props.index}`} placeholder="1000"
              defaultValue={this.props.impressionUrl}
            />
          </div>
        </div>
      </div>
    );
  }

  render() {
    // Open the portal
    const className = `clickImpression-${this.props.index}`;
    return (
      <div
        className={className}
        id={this.props.id}
        ref={c => {
          this.portal = c;
        }}
      />
    );
  }
}

export default ClickImpressionForm;
