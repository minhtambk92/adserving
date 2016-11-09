/**
 * Created by Manhhailua on 11/2/16.
 */

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import { DataTables, ICheck } from '../../../components/UI/';
import Link from '../../../components/Link';

class UserList extends Component {

  static propTypes = {
    list: PropTypes.array.isRequired,
  };

  dataTableOptions() { // eslint-disable-line class-methods-use-this
    return [{
      data: 'id',
      orderable: false,
      createdCell: (cell, cellData) => {
        ReactDOM.render(
          <ICheck
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
      data: 'profile.name',
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

  render() {
    // Open the portal
    return (
      <DataTables
        className="table table-bordered table-striped"
        data={this.props.list}
        options={{
          columns: this.dataTableOptions(),
          destroy: true,
          order: [[4, 'DESC']],
        }}
        thead={(
          <tr>
            <th>
              <ICheck className="inputChooseAllUsers" />
            </th>
            <th>Email</th>
            <th>Name</th>
            <th>Email confirmed</th>
            <th>Status</th>
            <th>Created date</th>
          </tr>
        )}
        tfoot={(
          <tr>
            <th>
              <ICheck className="inputChooseAllUsers" />
            </th>
            <th>Email</th>
            <th>Name</th>
            <th>Email confirmed</th>
            <th>Status</th>
            <th>Created date</th>
          </tr>
        )}
      />
    );
  }
}

export default UserList;
