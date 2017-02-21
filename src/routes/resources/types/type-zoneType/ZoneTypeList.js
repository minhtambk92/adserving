/**
 * Created by Manhhailua on 11/9/16.
 */

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { DataTables, ICheck } from '../../../../components/UI/';
import CreateZoneTypeForm from './CreateZoneTypeForm';
import EditZoneTypeForm from './EditZoneTypeForm';
import Link from '../../../../components/Link';

class ZoneTypeList extends Component {

  static propTypes = {
    list: PropTypes.array,
    page: PropTypes.object,
    getZoneTypes: PropTypes.func,
    zoneTypes: PropTypes.object,
    statusCreateZoneType: PropTypes.func,
    statusUpdateZoneType: PropTypes.func,
    createZoneType: PropTypes.func,
    deleteZoneType: PropTypes.func,
    updateZoneType: PropTypes.func,
    user: PropTypes.object,
    createActivity: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      zoneType: {},
      arrZoneType: [],
      arrCreateZoneType: [],
    };
  }

  componentWillMount() {
    this.props.statusCreateZoneType(true);
    this.props.statusUpdateZoneType(false);
  }

  dataTableOptions() { // eslint-disable-line class-methods-use-this
    return [{
      data: 'id',
      orderable: false,
      createdCell: (cell, cellData) => {
        ReactDOM.render(
          <ICheck
            type="checkbox"
            className="inputChooseTypeBannerHtml"
            name="inputChooseTypeBannerHtml[]"
            value={cellData}
          />,
          cell,
        );
      },
    }, {
      data: null,
      render: (data, type, row) => {
        let value = '';
        if (row.userId !== null) {
          value = `Custom - ${row.name}`;
        } else if (row.userId === null) {
          value = row.name;
        }
        return value;
      },
    }, {
      data: 'isSize',
    }, {
      data: 'status',
    }, {
      data: null,
      orderable: false,
      createdCell: (cell, cellData, rowData) => {
        ReactDOM.render(<Link
          to="#"
          onClick={() => this.editZoneType(rowData)}
        >Edit</Link>, cell);
      },
    }, {
      data: null,
      orderable: false,
      createdCell: (cell, cellData, rowData) => {
        ReactDOM.render(<Link
          to="#"
          onClick={() => this.deleteZoneType(rowData)}
        >Delete</Link>, cell);
      },
    }];
  }

  deleteZoneType(data) {
    const zoneTypeObject = data;
    this.props.deleteZoneType(data.id).then(() => {
      const userId = this.props.user.id;
      const subject = `Zone Type ${data.name}`;
      const subjectId = data.id;
      const action = 'deleted';
      const other = JSON.stringify(zoneTypeObject);
      this.props.createActivity({ action,
        subject,
        subjectId,
        other,
        userId }).then(() => {
          this.props.getZoneTypes();
        });
    });
  }

  editZoneType(data) {
    this.props.statusUpdateZoneType(true).then(() => {
      if (this.props.page.statusUpdateZoneType === true) {
        const count = 1;
        this.setState({ arrZoneType: [].concat(count) });
        this.setState({ zoneType: data });
      }
      this.props.statusCreateZoneType(false);
    });
  }

  addZoneType() {
    this.props.statusCreateZoneType(true).then(() => {
      if (this.props.page.statusCreateZoneType === true) {
        const count = 1;
        this.setState({ arrCreateZoneType: [].concat(count) });
      }
      this.props.statusUpdateZoneType(false);
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
              <h3 className="box-title">List Zone Type</h3>
            </div>
            {/* /.box-header */}
            <div className="box-body">
              <div className="listZoneType">
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
                        <ICheck type="checkbox" className="inputChooseZoneType" />
                      </th>
                      <th>Name</th>
                      <th>IsSize</th>
                      <th>Status</th>
                      <th>&nbsp;</th>
                      <th>&nbsp;</th>
                    </tr>
                  )}
                  tfoot={(
                    <tr>
                      <th>
                        <ICheck type="checkbox" className="inputChooseZoneType" />
                      </th>
                      <th>Name</th>
                      <th>isSize</th>
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
        <div className="col-sm-12">
          {this.props.page.statusUpdateZoneType === true &&
          this.state.arrZoneType && this.state.arrZoneType.map(count => (
            <div className="box" key={count}>
              <div className="editTypeBannerHtmlForm">
                <EditZoneTypeForm
                  id={this.state.zoneType.id}
                  zoneType={this.state.zoneType}
                  updateZoneType={this.props.updateZoneType}
                  statusUpdateZoneType={this.props.statusUpdateZoneType}
                  getZoneTypes={this.props.getZoneTypes}
                  page={this.props.page}
                  user={this.props.user}
                  createActivity={this.props.createActivity}
                />
              </div>
            </div>
          ))}
          {this.props.page &&
          this.props.page.statusCreateZoneType === true && this.state.arrCreateZoneType
          && this.state.arrCreateZoneType.map(count => (
            <div className="box" key={count}>
              <div className="CreateZoneTypeForm">
                <CreateZoneTypeForm
                  id={this.state.zoneType.id}
                  createZoneType={this.props.createZoneType}
                  getZoneTypes={this.props.getZoneTypes}
                  statusCreateZoneType={this.props.statusCreateZoneType}
                  page={this.props.page}
                  user={this.props.user}
                  zoneTypes={this.props.zoneTypes}
                  createActivity={this.props.createActivity}
                />
              </div>
            </div>
          ))
          }
          {((this.props.page.statusCreateZoneType === false
          && this.props.page.statusUpdateZoneType === false) ||
          (this.state.arrCreateZoneType && this.state.arrCreateZoneType.length === 0
          && this.props.page.statusUpdateZoneType === false)) ? (
            <button
              type="button"
              id="create"
              onClick={event => this.addZoneType(event)}
              className="btn btn-primary"
            >
                Create Zone Type
              </button>
            ) : ('')}
        </div>
      </div>
    );
  }
}

export default ZoneTypeList;
