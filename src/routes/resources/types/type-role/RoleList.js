import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { DataTables, ICheck } from '../../../../components/UI/';
import CreateRoleForm from './CreateRoleForm';
import EditRoleForm from './EditRoleForm';
import Link from '../../../../components/Link';

class RoleList extends Component {

  static propTypes = {
    list: PropTypes.array.isRequired,
    getRoles: PropTypes.func,
    createRole: PropTypes.func,
    updateRole: PropTypes.func,
    deleteRole: PropTypes.func,
    page: PropTypes.object,
    setStatusCreateRole: PropTypes.func,
    setStatusUpdateRole: PropTypes.func,
    roles: PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      role: {},
      arrRole: [],
      number: 1,
      countRole: 0,
      arrCreateRole: [],
    };
  }

  dataTableOptions() { // eslint-disable-line class-methods-use-this
    return [{
      data: 'id',
      orderable: false,
      createdCell: (cell, cellData) => {
        ReactDOM.render(
          <ICheck
            type="checkbox"
            className="inputChooseAllRole"
            name="inputChooseAllRole[]"
            value={cellData}
          />,
          cell,
        );
      },
    }, {
      data: 'uniqueName',
      createdCell: (cell, cellData, rowData) => {
        ReactDOM.render(
          <Link
            to={`/resource/type/${rowData.id}`}
          >{cellData}</Link>,
          cell,
        );
      },
    }, {
      data: 'name',
    }, {
      data: null,
      orderable: false,
      createdCell: (cell, cellData, rowData) => {
        ReactDOM.render(<Link
          to="#"
          onClick={() => this.editRole(rowData)}
        >Edit</Link>, cell);
      },
    }, {
      data: null,
      orderable: false,
      createdCell: (cell, cellData, rowData) => {
        ReactDOM.render(<Link
          to="#"
          onClick={() => this.deleteRole(rowData)}
        >Delete</Link>, cell);
      },
    }];
  }

  deleteRole(data) {
    this.props.deleteRole(data.id).then(() => {
      this.props.getRoles();
    });
  }

  editRole(data) {
    this.props.setStatusUpdateRole(true).then(() => {
      if (this.props.page.statusUpdateRole === true) {
        const length = this.state.number;
        const count = length + 1;
        this.setState({ countRole: count });
        this.setState({ arrRole: [].concat(count) });
        this.setState({ role: data });
      }
      this.props.setStatusCreateRole(false);
    });
  }

  addRole() {
    this.props.setStatusCreateRole(true).then(() => {
      if (this.props.page.statusCreateRole === true) {
        const length = this.state.number;
        const count = length + 1;
        this.setState({ countRole: count });
        this.setState({ arrCreateRole: [].concat(count) });
      }
      this.props.setStatusUpdateRole(false);
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
              <h3 className="box-title">List Role</h3>
            </div>
            {/* /.box-header */}
            <div className="box-body">
              <div className="listRole">
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
                        <ICheck type="checkbox" className="inputChooseAllRole" />
                      </th>
                      <th>UniqueName</th>
                      <th>Name</th>
                      <th>&nbsp;</th>
                      <th>&nbsp;</th>
                    </tr>
                  )}
                  tfoot={(
                    <tr>
                      <th>
                        <ICheck type="checkbox" className="inputChooseAllRole" />
                      </th>
                      <th>UniqueName</th>
                      <th>Name</th>
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
          {this.props.page.statusUpdateRole === true &&
          this.state.arrRole && this.state.arrRole.map((count) => (
            <div className="box" key={count}>
              <div className="editRole">
                <EditRoleForm
                  id={this.state.role.id}
                  role={this.state.role}
                  updateRole={this.props.updateRole}
                  setStatusUpdateRole={this.props.setStatusUpdateRole}
                  getRoles={this.props.getRoles}
                  page={this.props.page}
                />
              </div>
            </div>
          ))}
          {this.props.page &&
          this.props.page.statusCreateRole === true && this.state.arrCreateRole
          && this.state.arrCreateRole.map((count) => (
            <div className="box" key={count}>
              <div className="createRole">
                <CreateRoleForm
                  id={this.state.role.id}
                  createRole={this.props.createRole}
                  getRoles={this.props.getRoles}
                  setStatusCreateRole={this.props.setStatusCreateRole}
                  page={this.props.page}
                  roles={this.props.roles}
                />
              </div>
            </div>
          ))
          }
          {((this.props.page.statusCreateRole === false &&
          this.props.page.statusUpdateRole === false) ||
          (this.state.arrCreateRole && this.state.arrCreateRole.length === 0
          && this.props.page.statusUpdateRole === false)) ? (
            <button
              type="button"
              id="create"
              onClick={(event) => this.addRole(event)}
              className="btn btn-primary"
            >
                Create Role
              </button>
            ) : ('')}
        </div>
      </div>
    );
  }
}

export default RoleList;
