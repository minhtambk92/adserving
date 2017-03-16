import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './InputTags.css'; // eslint-disable-line css-modules/no-unused-class

class InputTags extends Component {

  static propTypes = {
    options: PropTypes.object,
    data: PropTypes.string,
  };

  async componentDidMount() {
    await ReactDOM.render(this.renderDOMLibs(), this.portal);
    /* eslint-disable no-undef */
    $(this.input).tagsinput({
      allowDuplicates: true,
      ...this.props.options,
    });
    /* eslint-enable no-undef */
  }

  componentWillReceiveProps(nextProps) {
    /* eslint-disable no-undef */
    $(this.input).tagsinput('removeAll');
    $(this.input).tagsinput('add', nextProps.data);
    /* eslint-enable no-undef */
  }

  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(this.portal);
  }

  renderDOMLibs() {
    const { ...rest } = this.props;
    return (
      <input
        ref={(c) => {
          this.input = c;
        }}
        data-role="tagsinput"
        {...rest}
      />
    );
  }

  render() {
    // Open the portal
    return (
      <div
        ref={(c) => {
          this.portal = c;
        }}
      />
    );
  }
}

export default withStyles(s)(InputTags);
