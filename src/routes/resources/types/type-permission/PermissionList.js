import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { DataTables, ICheck } from '../../../../components/UI/';
import CreatePermissionForm from './CreatePermissionForm';
import EditPermissionForm from './EditPermissionForm';
import Link from '../../../../components/Link';

class PermissionList extends Component {

  static propTypes = {
    list: PropTypes.array.isRequired,
    getPermissions: PropTypes.func,
    createPermission: PropTypes.func,
    updatePermission: PropTypes.func,
    deletePermission: PropTypes.func,
    page: PropTypes.object,
    setStatusCreatePermission: PropTypes.func,
    setStatusUpdatePermission: PropTypes.func,
    permissions: PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      permission: {},
      arrPermission: [],
      arrCreatePermission: [],
    };
  }

  componentWillMount() {
    this.props.setStatusCreatePermission(true);
    this.props.setStatusUpdatePermission(false);
  }

  dataTablePermissions() { // eslint-disable-line class-methods-use-this
    return [{
      data: 'id',
      orderable: false,
      createdCell: (cell, cellData) => {
        ReactDOM.render(
          <ICheck
            type="checkbox"
            className="inputChoosePermission"
            name="inputChoosePermission[]"
            value={cellData}
          />,
          cell,
        );
      },
    }, {
      data: 'name',
    }, {
      data: 'status',
    }, {
      data: null,
      orderable: false,
      createdCell: (cell, cellData, rowData) => {
        ReactDOM.render(<Link
          to="#"
          onClick={() => this.editPermission(rowData)}
        >Edit</Link>, cell);
      },
    }, {
      data: null,
      orderable: false,
      createdCell: (cell, cellData, rowData) => {
        ReactDOM.render(<Link
          to="#"
          onClick={() => this.deletePermission(rowData)}
        >Delete</Link>, cell);
      },
    }];
  }

  addPermission() {
    this.props.setStatusCreatePermission(true).then(() => {
      if (this.props.page.statusCreatePermission === true) {
        const count = 1;
        this.setState({ arrCreatePermission: [].concat(count) });
      }
      this.props.setStatusUpdatePermission(false);
    });
  }

  deletePermission(data) {
    this.props.deletePermission(data.id).then(() => {
      this.props.getPermissions();
    });
  }

  editPermission(data) {
    this.props.setStatusUpdatePermission(true).then(() => {
      if (this.props.page.statusUpdatePermission === true) {
        const count = 1;
        this.setState({ arrPermission: [].concat(count) });
        this.setState({ permission: data });
      }
      this.props.setStatusCreatePermission(false);
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
              <h3 className="box-title">List Permission</h3>
            </div>
            {/* /.box-header */}
            <div className="box-body">
              <div className="listPermission">
                <DataTables
                  className="table table-bordered table-striped"
                  data={data}
                  options={{
                    columns: this.dataTablePermissions(),
                    destroy: true,
                    order: [[1, 'DESC']],
                  }}
                  thead={(
                    <tr>
                      <th>
                        <ICheck type="checkbox" className="inputChooseAllPermissions" />
                      </th>
                      <th>Name</th>
                      <th>Status</th>
                      <th>&nbsp;</th>
                      <th>&nbsp;</th>
                    </tr>
                  )}
                  tfoot={(
                    <tr>
                      <th>
                        <ICheck type="checkbox" className="inputChooseAllPermissions" />
                      </th>
                      <th>Name</th>
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
        <div className="col-sm-12" id="ChannelPermission">
          {this.props.page.statusUpdatePermission === true &&
          this.state.arrPermission && this.state.arrPermission.map(count => (
            <div className="box" key={count}>
              <div className="editPermission">
                <EditPermissionForm
                  id={this.state.permission.id}
                  permission={this.state.permission}
                  updatePermission={this.props.updatePermission}
                  setStatusUpdatePermission={this.props.setStatusUpdatePermission}
                  getPermissions={this.props.getPermissions}
                  page={this.props.page}
                />
              </div>
            </div>
          ))}
          {this.props.page &&
          this.props.page.statusCreatePermission === true && this.state.arrCreatePermission
          && this.state.arrCreatePermission.map(count => (
            <div className="box" key={count}>
              <div className="createPermission">
                <CreatePermissionForm
                  id={this.state.permission.id}
                  createPermission={this.props.createPermission}
                  getPermissions={this.props.getPermissions}
                  setStatusCreatePermission={this.props.setStatusCreatePermission}
                  page={this.props.page}
                  permissions={this.props.permissions}
                />
              </div>
            </div>
          ))
          }
          {((this.props.page.statusCreatePermission === false &&
          this.props.page.statusUpdatePermission === false) ||
          (this.state.arrCreatePermission && this.state.arrCreatePermission.length === 0
          && this.props.page.statusUpdatePermission === false)) ? (
            <button
              type="button"
              id="create"
              onClick={event => this.addPermission(event)}
              className="btn btn-primary"
            >
                Create Permission
            </button>
            ) : ('')}
        </div>
      </div>
    );
  }
}

export default PermissionList;
