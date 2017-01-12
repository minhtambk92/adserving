/**
 * Created by Manhhailua on 11/9/16.
 */

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { DataTables, ICheck } from '../../../../components/UI/';
import CreateZoneSizeTypeForm from './CreateZoneSizeTypeForm';
import EditZoneSizeTypeForm from './EditZoneSizeTypeForm';
import Link from '../../../../components/Link';

class ZoneSizeTypeList extends Component {

  static propTypes = {
    list: PropTypes.array,
    page: PropTypes.object,
    getZoneSizeTypes: PropTypes.func,
    zoneSizeTypes: PropTypes.object,
    statusCreateZoneSizeType: PropTypes.func,
    statusUpdateZoneSizeType: PropTypes.func,
    createZoneSizeType: PropTypes.func,
    deleteZoneSizeType: PropTypes.func,
    updateZoneSizeType: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      zoneSizeType: {},
      arrZoneSizeType: [],
      arrCreateZoneSizeType: [],
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
            className="inputChooseTypeBannerHtml"
            name="inputChooseTypeBannerHtml[]"
            value={cellData}
          />,
          cell,
        );
      },
    }, {
      data: 'name',
    }, {
      data: null,
      render: (data, type, row) => `${row.width} x ${row.height}`,
    }, {
      data: 'status',
    }, {
      data: null,
      orderable: false,
      createdCell: (cell, cellData, rowData) => {
        ReactDOM.render(<Link
          to="#"
          onClick={() => this.editZoneSizeType(rowData)}
        >Edit</Link>, cell);
      },
    }, {
      data: null,
      orderable: false,
      createdCell: (cell, cellData, rowData) => {
        ReactDOM.render(<Link
          to="#"
          onClick={() => this.deleteZoneSizeType(rowData)}
        >Delete</Link>, cell);
      },
    }];
  }

  deleteZoneSizeType(data) {
    this.props.deleteZoneSizeType(data.id).then(() => {
      this.props.getZoneSizeTypes();
    });
  }

  editZoneSizeType(data) {
    this.props.statusUpdateZoneSizeType(true).then(() => {
      if (this.props.page.statusUpdateZoneSizeType === true) {
        const count = 1;
        this.setState({ arrZoneSizeType: [].concat(count) });
        this.setState({ zoneSizeType: data });
      }
      this.props.statusCreateZoneSizeType(false);
    });
  }

  addZoneSizeType() {
    this.props.statusCreateZoneSizeType(true).then(() => {
      if (this.props.page.statusCreateZoneSizeType === true) {
        const count = 1;
        this.setState({ arrCreateZoneSizeType: [].concat(count) });
      }
      this.props.statusUpdateZoneSizeType(false);
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
              <div className="listZoneSizeType">
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
                        <ICheck type="checkbox" className="inputChooseZoneSizeType" />
                      </th>
                      <th>Name</th>
                      <th>Size</th>
                      <th>Status</th>
                      <th>&nbsp;</th>
                      <th>&nbsp;</th>
                    </tr>
                  )}
                  tfoot={(
                    <tr>
                      <th>
                        <ICheck type="checkbox" className="inputChooseZoneSizeType" />
                      </th>
                      <th>Name</th>
                      <th>Size</th>
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
          {this.props.page.statusUpdateZoneSizeType === true &&
          this.state.arrZoneSizeType && this.state.arrZoneSizeType.map((count) => (
            <div className="box" key={count}>
              <div className="editTypeBannerHtmlForm">
                <EditZoneSizeTypeForm
                  id={this.state.zoneSizeType.id}
                  zoneSizeType={this.state.zoneSizeType}
                  updateZoneSizeType={this.props.updateZoneSizeType}
                  statusUpdateZoneSizeType={this.props.statusUpdateZoneSizeType}
                  getZoneSizeTypes={this.props.getZoneSizeTypes}
                  page={this.props.page}
                />
              </div>
            </div>
          ))}
          {this.props.page &&
          this.props.page.statusCreateZoneSizeType === true && this.state.arrCreateZoneSizeType
          && this.state.arrCreateZoneSizeType.map((count) => (
            <div className="box" key={count}>
              <div className="CreateZoneSizeTypeForm">
                <CreateZoneSizeTypeForm
                  id={this.state.zoneSizeType.id}
                  createZoneSizeType={this.props.createZoneSizeType}
                  getZoneSizeTypes={this.props.getZoneSizeTypes}
                  statusCreateZoneSizeType={this.props.statusCreateZoneSizeType}
                  page={this.props.page}
                />
              </div>
            </div>
          ))
          }
          {((this.props.page.statusCreateZoneSizeType === false
          && this.props.page.statusUpdateZoneSizeType === false) ||
          (this.state.arrCreateZoneSizeType && this.state.arrCreateZoneSizeType.length === 0
          && this.props.page.statusUpdateZoneSizeType === false)) ? (
            <button
              type="button"
              id="create"
              onClick={(event) => this.addZoneSizeType(event)}
              className="btn btn-primary"
            >
                Create Zone Size Type
              </button>
            ) : ('')}
        </div>
      </div>
    );
  }
}

export default ZoneSizeTypeList;
