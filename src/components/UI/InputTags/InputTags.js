import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './InputTags.css';

class InputTags extends Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    data: PropTypes.string,
  };

  async componentDidMount() {
    await ReactDOM.render(this.renderDOMLibs(), this.portal);
    /* eslint-disable no-undef */
    $(`#${this.props.id}`).tagsinput({
      allowDuplicates: true,
    });
    /* eslint-enable no-undef */
  }

  componentWillReceiveProps(nextProps) {
    /* eslint-disable no-undef */
    $(`#${this.props.id}`).tagsinput('removeAll');
    $(`#${this.props.id}`).tagsinput('add', nextProps.data);
    /* eslint-enable no-undef */
  }

  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(this.portal);
  }

  renderDOMLibs() {
    return (
      <input
        type="text" className="form-control" id={this.props.id}
        placeholder="dantri"
        data-role="tagsinput"
      />
    );
  }

  render() {
    // Open the portal
    return (
      <div
        ref={c => {
          this.portal = c;
        }}
      />
    );
  }
}

export default withStyles(s)(InputTags);
