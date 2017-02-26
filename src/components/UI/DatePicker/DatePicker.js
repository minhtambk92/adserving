/**
 * Created by Manhhailua on 11/2/16.
 */

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

/* global $ */

class DatePicker extends Component {

  static propTypes = {
    options: PropTypes.object,
    name: PropTypes.string,
  };

  async componentDidMount() {
    await ReactDOM.render(this.renderDOMLibs(), this.portal);

    const dateStart = new Date();
    dateStart.setDate(dateStart.getDate());
    $(this.input).datepicker({
      ...this.props.options,
      autoclose: true,
      setDate: dateStart,
      todayHighlight: 'TRUE',
      minDate: 0,
    });
  }

  componentWillReceiveProps(nextProps) {
    const dateEnd = new Date();
    const dateStart = new Date();

    dateStart.setDate(dateStart.getDate());
    dateEnd.setDate(dateEnd.getDate() + 1);

    if (nextProps.name === 'start') {
      $(this.input).datepicker({
        startDate: dateStart,
        autoclose: true,
        setDate: dateStart,
        todayHighlight: 'TRUE',
        minDate: 0,
      });
    } else if (nextProps.name === 'end') {
      $(this.input).datepicker({
        startDate: dateEnd,
        autoclose: true,
        setDate: dateEnd,
        todayHighlight: 'TRUE',
        minDate: 0,
      });

      /* eslint-disable no-underscore-dangle */
      // $(this.input).datepicker('update', moment().add(1, 'month')._d);
      /* eslint-enable no-underscore-dangle */
    }
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

export default DatePicker;
