/**
 * Created by Manhhailua on 11/9/16.
 */

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { DataTables, ICheck } from '../../../../components/UI/';
import CreateBannerHtmlTypeForm from './CreateBannerHtmlTypeForm';
import EditBannerHtmlTypeForm from './EditBannerHtmlTypeForm';
import Link from '../../../../components/Link';

class BannerHtmlTypeList extends Component {

  static propTypes = {
    list: PropTypes.array,
    page: PropTypes.object,
    getBannerHtmlTypes: PropTypes.func,
    bannerHtmlTypes: PropTypes.object,
    statusCreateBannerHtmlType: PropTypes.func,
    statusUpdateBannerHtmlType: PropTypes.func,
    createBannerHtmlType: PropTypes.func,
    deleteBannerHtmlType: PropTypes.func,
    updateBannerHtmlType: PropTypes.func,
    user: PropTypes.object,
    createActivity: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      bannerHtmlType: {},
      arrBannerHtmlType: [],
      arrCreateBannerHtmlType: [],
    };
  }

  componentWillMount() {
    this.props.statusCreateBannerHtmlType(true);
    this.props.statusUpdateBannerHtmlType(false);
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
    },
    {
      data: 'weight',
    }, {
      data: 'status',
    }, {
      data: null,
      orderable: false,
      createdCell: (cell, cellData, rowData) => {
        ReactDOM.render(<Link
          to="#"
          onClick={() => this.editBannerHtmlType(rowData)}
        >Edit</Link>, cell);
      },
    }, {
      data: null,
      orderable: false,
      createdCell: (cell, cellData, rowData) => {
        ReactDOM.render(<Link
          to="#"
          onClick={() => this.deleteBannerHtmlType(rowData)}
        >Delete</Link>, cell);
      },
    }];
  }

  deleteBannerHtmlType(data) {
    const bannerHtmlTypeObject = data;
    this.props.deleteBannerHtmlType(data.id).then(() => {
      const userId = this.props.user.id;
      const subject = `Banner Html Type ${data.name}`;
      const subjectId = data.id;
      const action = 'deleted';
      const other = JSON.stringify(bannerHtmlTypeObject);
      this.props.createActivity({ action,
        subject,
        subjectId,
        other,
        userId }).then(() => {
          this.props.getBannerHtmlTypes();
        });
    });
  }

  editBannerHtmlType(data) {
    this.props.statusUpdateBannerHtmlType(true).then(() => {
      if (this.props.page.statusUpdateBannerHtmlType === true) {
        const count = 1;
        this.setState({ arrBannerHtmlType: [].concat(count) });
        this.setState({ bannerHtmlType: data });
      }
      this.props.statusCreateBannerHtmlType(false);
    });
  }

  addBannerHtmlType() {
    this.props.statusCreateBannerHtmlType(true).then(() => {
      if (this.props.page.statusCreateBannerHtmlType === true) {
        const count = 1;
        this.setState({ arrCreateBannerHtmlType: [].concat(count) });
      }
      this.props.statusUpdateBannerHtmlType(false);
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
              <h3 className="box-title">List Banner HTML Type</h3>
            </div>
            {/* /.box-header */}
            <div className="box-body">
              <div className="listBannerHtmlType">
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
                        <ICheck type="checkbox" className="inputChooseBannerHtmlType" />
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
                        <ICheck type="checkbox" className="inputChooseBannerHtmlType" />
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
          {this.props.page.statusUpdateBannerHtmlType === true &&
          this.state.arrBannerHtmlType && this.state.arrBannerHtmlType.map((count) => (
            <div className="box" key={count}>
              <div className="editTypeBannerHtmlForm">
                <EditBannerHtmlTypeForm
                  id={this.state.bannerHtmlType.id}
                  bannerHtmlType={this.state.bannerHtmlType}
                  updateBannerHtmlType={this.props.updateBannerHtmlType}
                  statusUpdateBannerHtmlType={this.props.statusUpdateBannerHtmlType}
                  getBannerHtmlTypes={this.props.getBannerHtmlTypes}
                  user={this.props.user}
                  page={this.props.page}
                  createActivity={this.props.createActivity}
                />
              </div>
            </div>
          ))}
          {this.props.page &&
          this.props.page.statusCreateBannerHtmlType === true && this.state.arrCreateBannerHtmlType
          && this.state.arrCreateBannerHtmlType.map((count) => (
            <div className="box" key={count}>
              <div className="CreateBannerHtmlTypeForm">
                <CreateBannerHtmlTypeForm
                  id={this.state.bannerHtmlType.id}
                  createBannerHtmlType={this.props.createBannerHtmlType}
                  getBannerHtmlTypes={this.props.getBannerHtmlTypes}
                  statusCreateBannerHtmlType={this.props.statusCreateBannerHtmlType}
                  bannerHtmlTypes={this.props.bannerHtmlTypes}
                  user={this.props.user}
                  page={this.props.page}
                  createActivity={this.props.createActivity}
                />
              </div>
            </div>
          ))
          }
          {((this.props.page.statusCreateBannerHtmlType === false
          && this.props.page.statusUpdateBannerHtmlType === false) ||
          (this.state.arrCreateBannerHtmlType && this.state.arrCreateBannerHtmlType.length === 0
          && this.props.page.statusUpdateBannerHtmlType === false)) ? (
            <button
              type="button"
              id="create"
              onClick={(event) => this.addBannerHtmlType(event)}
              className="btn btn-primary"
            >
                Create Banner Html Type
              </button>
            ) : ('')}
        </div>
      </div>
    );
  }
}

export default BannerHtmlTypeList;
