import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

/* global $ */

class DatePicker extends Component {

  static propTypes = {
    options: PropTypes.object,
  };

  async componentDidMount() {
    await ReactDOM.render(this.renderDOMLibs(), this.portal);

    $(this.input).datepicker({
      ...this.props.options,
      autoclose: true,
      todayHighlight: 'TRUE',
      minDate: 0,
    });
  }
  componentWillReceiveProps(nextProps) {
    const dateEnd = new Date();
    dateEnd.setDate(dateEnd.getDate() + 1);
    const dateStart = new Date();
    dateStart.setDate(dateStart.getDate());
    /* eslint-disable no-undef */
    if (nextProps.name === 'start') {
      $(this.input).datepicker({
        startDate: dateStart,
      });
      $(this.input).datepicker('update', new Date());
    } else if (nextProps.name === 'end') {
      $(this.input).datepicker({
        startDate: dateEnd,
      });
      /* eslint-disable no-underscore-dangle */
      $(this.input).datepicker('update', moment().add(1, 'month')._d);
      /* eslint-enable no-underscore-dangle */
    }
    /* eslint-enable no-undef */
  }

  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(this.portal);
  }

  renderDOMLibs() {
    const { ...rest } = this.props;
    return (
      <input
        ref={c => {
          this.input = c;
        }}
        {...rest}
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

export default DatePicker;
