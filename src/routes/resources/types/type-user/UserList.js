import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { DataTables, ICheck } from '../../../../components/UI/';
import CreateUserForm from './CreateUserForm';
import EditUserForm from './EditUserForm';
// import EditUserForm from './EditUserForm';
import Link from '../../../../components/Link';

class UserList extends Component {

  static propTypes = {
    list: PropTypes.array.isRequired,
    roleList: PropTypes.array.isRequired,
    getUsers: PropTypes.func,
    createUser: PropTypes.func,
    updateUser: PropTypes.func,
    deleteUser: PropTypes.func,
    page: PropTypes.object,
    setStatusCreateUser: PropTypes.func,
    setStatusUpdateUser: PropTypes.func,
    users: PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      user: {},
      arrUser: [],
      number: 1,
      countUser: 0,
      arrCreateUser: [],
    };
  }z

  dataTableOptions() { // eslint-disable-line class-methods-use-this
    return [{
      data: 'id',
      orderable: false,
      createdCell: (cell, cellData) => {
        ReactDOM.render(
          <ICheck
            type="checkbox"
            className="inputChooseUser"
            name="inputChooseUser[]"
            value={cellData}
          />,
          cell,
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
      data: null,
      orderable: false,
      createdCell: (cell, cellData, rowData) => {
        ReactDOM.render(<Link
          to="#"
          onClick={() => this.editUser(rowData)}
        >Edit</Link>, cell);
      },
    }, {
      data: null,
      orderable: false,
      createdCell: (cell, cellData, rowData) => {
        ReactDOM.render(<Link
          to="#"
          onClick={() => this.deleteUser(rowData)}
        >Delete</Link>, cell);
      },
    }];
  }

  addUser() {
    this.props.setStatusCreateUser(true).then(() => {
      if (this.props.page.statusCreateUser === true) {
        const length = this.state.number;
        const count = length + 1;
        this.setState({ countUser: count });
        this.setState({ arrCreateUser: [].concat(count) });
      }
    });
  }

  deleteUser(data) {
    this.props.deleteUser(data.id).then(() => {
      this.props.getUsers();
    });
  }

  editUser(data) {
    this.props.setStatusUpdateUser(true).then(() => {
      if (this.props.page.statusUpdateUser === true) {
        const length = this.state.number;
        const count = length + 1;
        this.setState({ countUser: count });
        this.setState({ arrUser: [].concat(count) });
        this.setState({ user: data });
      }
    });
  }

  render() {
    // Open the portal
    let data = [];
    if (this.props.list) {
      if (this.props.list.length === 0) {
        data = [];
      } else {
        data = this.props.list;
      }
    }
    return (
      <div className="row">
        <div className="col-sm-12">
          <div className="box">
            <div className="box-header">
              <h3 className="box-title">List User</h3>
            </div>
            {/* /.box-header */}
            <div className="box-body">
              <div className="listUser">
                <DataTables
                  className="table table-bordered table-striped"
                  data={data}
                  options={{
                    columns: this.dataTableOptions(),
                    destroy: true,
                    order: [[1, 'DESC']],
                  }}
                  thead={(
                    <tr>
                      <th>
                        <ICheck type="checkbox" className="inputChooseAllUsers" />
                      </th>
                      <th>Email</th>
                      <th>Name</th>
                      <th>Email confirmed</th>
                      <th>Status</th>
                      <th>&nbsp;</th>
                      <th>&nbsp;</th>
                    </tr>
                  )}
                  tfoot={(
                    <tr>
                      <th>
                        <ICheck type="checkbox" className="inputChooseAllUsers" />
                      </th>
                      <th>Email</th>
                      <th>Name</th>
                      <th>Email confirmed</th>
                      <th>Status</th>
                      <th>&nbsp;</th>
                      <th>&nbsp;</th>
                    </tr>
                  )}
                />
              </div>
            </div>
            {/* /.box-body */}
          </div>
        </div>
        <div className="col-sm-12" id="ChannelOption">
          {this.props.page.statusUpdateUser === true &&
          this.state.arrUser && this.state.arrUser.map((count) => (
            <div className="box" key={count}>
              <div className="editUser">
                <EditUserForm
                  id={this.state.user.id}
                  user={this.state.user}
                  updateUser={this.props.updateUser}
                  setStatusUpdateUser={this.props.setStatusUpdateUser}
                  getUsers={this.props.getUsers}
                  roleList={this.props.roleList}
                  page={this.props.page}
                />
              </div>
            </div>
          ))}
          {this.props.page &&
          this.props.page.statusCreateUser === true && this.state.arrCreateUser
          && this.state.arrCreateUser.map((count) => (
            <div className="box" key={count}>
              <div className="createUser">
                <CreateUserForm
                  id={this.state.user.id}
                  createUser={this.props.createUser}
                  getUsers={this.props.getUsers}
                  setStatusCreateUser={this.props.setStatusCreateUser}
                  page={this.props.page}
                  roleList={this.props.roleList}
                  users={this.props.users}
                />
              </div>
            </div>
          ))
          }
          {((this.props.page.statusCreateUser === false &&
          this.props.page.statusUpdateUser === false) ||
          (this.state.arrCreateUser && this.state.arrCreateUser.length === 0
          && this.props.page.statusUpdateUser === false)) ? (
            <button
              type="button"
              id="create"
              onClick={(event) => this.addUser(event)}
              className="btn btn-primary"
            >
                Create User
              </button>
            ) : ('')}
        </div>
      </div>
    );
  }
}

export default UserList;
