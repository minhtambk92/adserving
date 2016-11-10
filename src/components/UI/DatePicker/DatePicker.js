import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

class DatePicker extends Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    timeValue: PropTypes.string.isRequired,
  };

  async componentDidMount() {
    await ReactDOM.render(this.renderDOMLibs(), this.portal);

    /* eslint-disable no-undef */
    const dateEnd = new Date();
    dateEnd.setDate(dateEnd.getDate() + 1);
    const dateStart = new Date();
    dateStart.setDate(dateStart.getDate());
    /* eslint-disable no-undef */
    if (this.props.timeValue === 'start') {
      $(this.input).datepicker({
        autoclose: true,
        todayHighlight: 'TRUE',
        minDate: 0,
        startDate: dateStart,
      });
    } else if (this.props.timeValue === 'end') {
      $(this.input).datepicker({
        autoclose: true,
        todayHighlight: 'TRUE',
        minDate: 0,
        startDate: dateEnd,
      });
    }
    /* eslint-enable no-undef */
  }

  componentDidUpdate() {
    /* eslint-disable no-undef */
    if (this.props.timeValue === 'start') {
      $(this.input).datepicker('update', new Date());
    } else if (this.props.timeValue === 'end') {
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
    return (
      <input
        type="text" className="form-control pull-right"
        id={this.props.id}
        ref={c => {
          this.input = c;
        }}
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
