/**
 * Created by Manhhailua on 11/2/16.
 */

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import InputICheck from './InputICheck';
import Link from '../../../components/Link';

const dataTableOptions = {
  columns: [{
    data: 'email',
    render: (data, type, full) => (
      <Link to={`/resource/user/${full.id}`}>${data}</Link>
    ),
  }, {
    data: 'emailConfirmed',
    render: data => (data ? 'yes' : 'no'),
  }, {
    data: 'status',
  }, {
    data: 'createdAt',
  }],
  destroy: true,
  order: [[3, 'DESC']],
};

class UserList extends Component {

  static propTypes = {
    containerWidth: PropTypes.number,
    list: PropTypes.array,
  };

  componentDidMount() {
    /* eslint-disable no-undef */
    $(this.dataTable).dataTable({
      data: this.props.list,
      ...dataTableOptions,
    });
    /* eslint-enable no-undef */

    // Wrapping DOM Libs
    ReactDOM.render(this.renderDOMLibs(), this.portal);
  }

  componentWillReceiveProps(nextProps) {
    /* eslint-disable no-undef */
    $(this.dataTable).dataTable({
      data: nextProps.list,
      ...dataTableOptions,
    });
    /* eslint-enable no-undef */
  }

  componentDidUpdate() {
    /* eslint-disable no-undef */
    // iCheck for checkbox and radio inputs
    // $('input[type="checkbox"].inputChooseUser').iCheck({
    //   checkboxClass: 'icheckbox_minimal-blue',
    //   radioClass: 'iradio_minimal-blue',
    // });
    /* eslint-enable no-undef */
  }

  renderDOMLibs() {
    return (
      <table
        className="table table-hover"
        ref={c => {
          this.dataTable = c;
        }}
      >
        <thead>
          <tr>
            <th>Email</th>
            <th>Email confirmed</th>
            <th>Status</th>
            <th>Created date</th>
          </tr>
        </thead>
        <tfoot>
          <tr>
            <th>Email</th>
            <th>Email confirmed</th>
            <th>Status</th>
            <th>Created date</th>
          </tr>
        </tfoot>
      </table>
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

export default UserList;
