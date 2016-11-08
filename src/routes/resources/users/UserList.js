/**
 * Created by Manhhailua on 11/2/16.
 */

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import { InputICheck } from '../../../components/UI/';
import Link from '../../../components/Link';

class UserList extends Component {

  static propTypes = {
    containerWidth: PropTypes.number,
    list: PropTypes.array,
  };

  componentDidMount() {
    /* eslint-disable no-undef */
    $(this.dataTable).dataTable({
      data: this.props.list,
      columns: this.dataTableOptions(),
      destroy: true,
      order: [[4, 'DESC']],
    });
    /* eslint-enable no-undef */

    // Wrapping DOM Libs
    ReactDOM.render(this.renderDOMLibs(), this.portal);
  }

  componentWillReceiveProps(nextProps) {
    /* eslint-disable no-undef */
    $(this.dataTable).dataTable({
      data: nextProps.list,
      columns: this.dataTableOptions(),
      destroy: true,
      order: [[4, 'DESC']],
    });
    /* eslint-enable no-undef */
  }

  dataTableOptions() { // eslint-disable-line no-unused-vars, class-methods-use-this
    return [{
      data: 'id',
      orderable: false,
      createdCell: (cell, cellData) => {
        ReactDOM.render(
          <InputICheck
            className="inputChooseUser"
            name="inputChooseUser[]"
            value={cellData}
          />,
          cell
        );
      },
    }, {
      data: 'email',
      createdCell: (cell, cellData, rowData) => {
        ReactDOM.render(
          <Link
            to={`/resource/user/${rowData.id}`}
          >{cellData}</Link>,
          cell,
        );
      },
    }, {
      data: 'profile.displayName',
    }, {
      data: 'emailConfirmed',
      render: data => (data ? 'yes' : 'no'),
    }, {
      data: 'status',
    }, {
      data: 'createdAt',
      render(data, type) {
        const output = moment(new Date(data));

        // If display or filter data is requested, format the date
        if (type === 'display' || type === 'filter') {
          return output.format('YYYY-MM-DD h:mm:ss A');
        }

        // Convert to timestamp for ordering
        if (type === 'sort') {
          return output.format('x');
        }

        // Otherwise the data type requested (`type`) is type detection or
        // sorting data, for which we want to use the integer, so just return
        // that, unaltered
        return data;
      },
    }];
  }

  renderDOMLibs() {
    return (
      <table
        className="table table-bordered table-striped"
        ref={c => {
          this.dataTable = c;
        }}
      >
        <thead>
          <tr>
            <th><InputICheck className="inputChooseAllUsers" /></th>
            <th>Email</th>
            <th>Name</th>
            <th>Email confirmed</th>
            <th>Status</th>
            <th>Created date</th>
          </tr>
        </thead>
        <tfoot>
          <tr>
            <th><InputICheck className="inputChooseAllUsers" /></th>
            <th>Email</th>
            <th>Name</th>
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
