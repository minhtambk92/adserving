/**
 * Created by Manhhailua on 11/9/16.
 */

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { DataTables, ICheck } from '../../../../components/UI/';
import CreateBannerTypeForm from './CreateBannerTypeForm';
import EditTypeBannerHtmlForm from './EditBannerTypeForm';
import Link from '../../../../components/Link';

class BannerTypeList extends Component {

  static propTypes = {
    list: PropTypes.array,
    page: PropTypes.object,
    getBannerTypes: PropTypes.func,
    bannerTypes: PropTypes.object,
    statusCreateBannerType: PropTypes.func,
    statusUpdateBannerType: PropTypes.func,
    createBannerType: PropTypes.func,
    deleteBannerType: PropTypes.func,
    updateBannerType: PropTypes.func,
    user: PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      bannerType: {},
      arrBannerType: [],
      arrCreateBannerType: [],
    };
  }

  componentWillMount() {
    this.props.statusCreateBannerType(true);
    this.props.statusUpdateBannerType(false);
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
      data: 'status',
    }, {
      data: null,
      orderable: false,
      createdCell: (cell, cellData, rowData) => {
        ReactDOM.render(<Link
          to="#"
          onClick={() => this.editBannerType(rowData)}
        >Edit</Link>, cell);
      },
    }, {
      data: null,
      orderable: false,
      createdCell: (cell, cellData, rowData) => {
        ReactDOM.render(<Link
          to="#"
          onClick={() => this.deleteBannerType(rowData)}
        >Delete</Link>, cell);
      },
    }];
  }

  deleteBannerType(data) {
    this.props.deleteBannerType(data.id).then(() => {
      this.props.getBannerTypes();
    });
  }

  editBannerType(data) {
    this.props.statusUpdateBannerType(true).then(() => {
      if (this.props.page.statusUpdateBannerType === true) {
        const count = 1;
        this.setState({ arrBannerType: [].concat(count) });
        this.setState({ bannerType: data });
      }
      this.props.statusCreateBannerType(false);
    });
  }

  addBannerType() {
    this.props.statusCreateBannerType(true).then(() => {
      if (this.props.page.statusCreateBannerType === true) {
        const count = 1;
        this.setState({ arrCreateBannerType: [].concat(count) });
      }
      this.props.statusUpdateBannerType(false);
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
              <h3 className="box-title">List Banner Type</h3>
            </div>
            {/* /.box-header */}
            <div className="box-body">
              <div className="listBannerType">
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
                        <ICheck type="checkbox" className="inputChooseBannerType" />
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
                        <ICheck type="checkbox" className="inputChooseBannerType" />
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
        <div className="col-sm-12">
          {this.props.page.statusUpdateBannerType === true &&
          this.state.arrBannerType && this.state.arrBannerType.map((count) => (
            <div className="box" key={count}>
              <div className="editTypeBannerHtmlForm">
                <EditTypeBannerHtmlForm
                  id={this.state.bannerType.id}
                  bannerType={this.state.bannerType}
                  updateBannerType={this.props.updateBannerType}
                  statusUpdateBannerType={this.props.statusUpdateBannerType}
                  getBannerTypes={this.props.getBannerTypes}
                  user={this.props.user}
                  page={this.props.page}
                />
              </div>
            </div>
          ))}
          {this.props.page &&
          this.props.page.statusCreateBannerType === true && this.state.arrCreateBannerType
          && this.state.arrCreateBannerType.map((count) => (
            <div className="box" key={count}>
              <div className="CreateBannerTypeForm">
                <CreateBannerTypeForm
                  id={this.state.bannerType.id}
                  createBannerType={this.props.createBannerType}
                  getBannerTypes={this.props.getBannerTypes}
                  statusCreateBannerType={this.props.statusCreateBannerType}
                  user={this.props.user}
                  page={this.props.page}
                />
              </div>
            </div>
          ))
          }
          {((this.props.page.statusCreateBannerType === false
          && this.props.page.statusUpdateBannerType === false) ||
          (this.state.arrCreateBannerType && this.state.arrCreateBannerType.length === 0
          && this.props.page.statusUpdateBannerType === false)) ? (
            <button
              type="button"
              id="create"
              onClick={(event) => this.addBannerType(event)}
              className="btn btn-primary"
            >
                Create Banner Type
              </button>
            ) : ('')}
        </div>
      </div>
    );
  }
}

export default BannerTypeList;
