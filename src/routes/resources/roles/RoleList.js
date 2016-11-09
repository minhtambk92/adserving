/**
 * Created by Manhhailua on 11/9/16.
 */

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import { DataTables, ICheck } from '../../../components/UI/';
import Link from '../../../components/Link';

class RoleList extends Component {

  static propTypes = {
    list: PropTypes.array.isRequired,
    setUsersFilters: PropTypes.func.isRequired,
  };

  addUserToThisRole(roleId) {
    this.props.setUsersFilters({ roleId });
  }

  dataTableOptions() { // eslint-disable-line class-methods-use-this
    return [{
      data: 'id',
      orderable: false,
      createdCell: (cell, cellData) => {
        ReactDOM.render(
          <ICheck
            className="inputChooseRole"
            name="inputChooseRole[]"
            value={cellData}
          />,
          cell
        );
      },
    }, {
      data: 'uniqueName',
      createdCell: (cell, cellData, rowData) => {
        ReactDOM.render(
          <Link
            to={`/resource/role/${rowData.id}`}
          >{cellData}</Link>,
          cell,
        );
      },
    }, {
      data: 'name',
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
    }, {
      createdCell: (cell, cellData, rowData) => {
        ReactDOM.render(
          <Link
            to="/resource/user"
            onClick={event => this.addUserToThisRole(rowData.id, event)}
          >Add New User</Link>,
          cell,
        );
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
          order: [[3, 'DESC']],
        }}
        thead={(
          <tr>
            <th>
              <ICheck className="inputChooseAllRoles" />
            </th>
            <th>Unique name</th>
            <th>Name</th>
            <th>Created date</th>
            <th>&nbsp;</th>
          </tr>
        )}
        tfoot={(
          <tr>
            <th>
              <ICheck className="inputChooseAllRoles" />
            </th>
            <th>Unique name</th>
            <th>Name</th>
            <th>Created date</th>
            <th>&nbsp;</th>
          </tr>
        )}
      />
    );
  }
}

export default RoleList;
