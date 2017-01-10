/**
 * Created by Manhhailua on 11/9/16.
 */

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { DataTables, ICheck } from '../../../../components/UI/';
import CreateTypeBannerHtmlForm from './CreateTypeBannerHtmlForm';
import EditTypeBannerHtmlForm from './EditTypeBannerHtmlForm';
import Link from '../../../../components/Link';

class TypeBannerHtmlList extends Component {

  static propTypes = {
    list: PropTypes.array,
    page: PropTypes.object,
    getAllTypeBannerHtml: PropTypes.func,
    allTypeBannerHtml: PropTypes.object,
    statusCreateTypeBannerHtml: PropTypes.func,
    statusUpdateTypeBannerHtml: PropTypes.func,
    createTypeBannerHtml: PropTypes.func,
    deleteTypeBannerHtml: PropTypes.func,
    updateTypeBannerHtml: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      typeBannerHtml: {},
      arrTypeBannerHtml: [],
      arrCreateTypeBannerHtml: [],
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
      data: 'weight',
    }, {
      data: 'status',
    }, {
      data: null,
      orderable: false,
      createdCell: (cell, cellData, rowData) => {
        ReactDOM.render(<Link
          to="#"
          onClick={() => this.editCategory(rowData)}
        >Edit</Link>, cell);
      },
    }, {
      data: null,
      orderable: false,
      createdCell: (cell, cellData, rowData) => {
        ReactDOM.render(<Link
          to="#"
          onClick={() => this.deleteCategory(rowData)}
        >Delete</Link>, cell);
      },
    }];
  }

  deleteCategory(data) {
    this.props.deleteTypeBannerHtml(data.id).then(() => {
      this.props.getAllTypeBannerHtml();
    });
  }

  editCategory(data) {
    this.props.statusUpdateTypeBannerHtml(true).then(() => {
      if (this.props.page.statusUpdateTypeBannerHtml === true) {
        const count = 1;
        this.setState({ arrTypeBannerHtml: [].concat(count) });
        this.setState({ typeBannerHtml: data });
      }
      this.props.statusCreateTypeBannerHtml(false);
    });
  }

  addTypeBannerHtml() {
    this.props.statusCreateTypeBannerHtml(true).then(() => {
      if (this.props.page.statusCreateTypeBannerHtml === true) {
        const count = 1;
        this.setState({ arrCreateTypeBannerHtml: [].concat(count) });
      }
      this.props.statusUpdateTypeBannerHtml(false);
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
              <h3 className="box-title">List Type Banner HTML</h3>
            </div>
            {/* /.box-header */}
            <div className="box-body">
              <div className="listTypeBannerHtml">
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
                        <ICheck type="checkbox" className="inputChooseAllTypeBannerHtml" />
                      </th>
                      <th>Name</th>
                      <th>Weight</th>
                      <th>Status</th>
                      <th>&nbsp;</th>
                      <th>&nbsp;</th>
                    </tr>
                  )}
                  tfoot={(
                    <tr>
                      <th>
                        <ICheck type="checkbox" className="inputChooseAllTypeBannerHtml" />
                      </th>
                      <th>Name</th>
                      <th>Weight</th>
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
          {this.props.page.statusUpdateTypeBannerHtml === true &&
          this.state.arrTypeBannerHtml && this.state.arrTypeBannerHtml.map((count) => (
            <div className="box" key={count}>
              <div className="editTypeBannerHtmlForm">
                <EditTypeBannerHtmlForm
                  id={this.state.typeBannerHtml.id}
                  typeBannerHtml={this.state.typeBannerHtml}
                  updateTypeBannerHtml={this.props.updateTypeBannerHtml}
                  statusUpdateTypeBannerHtml={this.props.statusUpdateTypeBannerHtml}
                  getAllTypeBannerHtml={this.props.getAllTypeBannerHtml}
                  page={this.props.page}
                />
              </div>
            </div>
          ))}
          {this.props.page &&
          this.props.page.statusCreateTypeBannerHtml === true && this.state.arrCreateTypeBannerHtml
          && this.state.arrCreateTypeBannerHtml.map((count) => (
            <div className="box" key={count}>
              <div className="createTypeBannerHtmlForm">
                <CreateTypeBannerHtmlForm
                  id={this.state.typeBannerHtml.id}
                  createTypeBannerHtml={this.props.createTypeBannerHtml}
                  getAllTypeBannerHtml={this.props.getAllTypeBannerHtml}
                  statusCreateTypeBannerHtml={this.props.statusCreateTypeBannerHtml}
                  page={this.props.page}
                />
              </div>
            </div>
          ))
          }
          {((this.props.page.statusCreateTypeBannerHtml === false
          && this.props.page.statusUpdateTypeBannerHtml === false) ||
          (this.state.arrCreateTypeBannerHtml && this.state.arrCreateTypeBannerHtml.length === 0
          && this.props.page.statusUpdateTypeBannerHtml === false)) ? (
            <button
              type="button"
              id="create"
              onClick={(event) => this.addTypeBannerHtml(event)}
              className="btn btn-primary"
            >
                Create Type Banner Html
              </button>
            ) : ('')}
        </div>
      </div>
    );
  }
}

export default TypeBannerHtmlList;
