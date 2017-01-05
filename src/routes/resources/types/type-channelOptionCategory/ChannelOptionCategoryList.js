/**
 * Created by Manhhailua on 11/9/16.
 */

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { DataTables, ICheck } from '../../../../components/UI/';
import CreateChannelOptionCategoryForm from './CreateChannelOptionCategoryForm';
import EditChannelOptionCategoryForm from './EditChannelOptionCategoryForm';
import Link from '../../../../components/Link';

class ChannelOptionCategoryList extends Component {

  static propTypes = {
    list: PropTypes.array.isRequired,
    page: PropTypes.object,
    getChannelOptionCategories: PropTypes.func,
    channelOptionCategories: PropTypes.object,
    statusCategoryCreate: PropTypes.func,
    statusCategoryEdit: PropTypes.func,
    createChannelOptionCategory: PropTypes.func,
    deleteChannelOptionCategory: PropTypes.func,
    updateChannelOptionCategory: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      category: {},
      arrCategory: [],
      number: 1,
      countCategory: 0,
      arrCreateCategory: [],
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
            className="inputChooseChannelOptionCategory"
            name="inputChooseChannelOptionCategory[]"
            value={cellData}
          />,
          cell,
        );
      },
    }, {
      data: 'name',
    }, {
      data: 'value',
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
    this.props.deleteChannelOptionCategory(data.id).then(() => {
      this.props.getChannelOptionCategories();
    });
  }

  editCategory(data) {
    this.props.statusCategoryEdit(true).then(() => {
      if (this.props.page.categoryEdit === true) {
        const length = this.state.number;
        const count = length + 1;
        this.setState({ countCategory: count });
        this.setState({ arrCategory: [].concat(count) });
        this.setState({ category: data });
      }
      this.props.statusCategoryCreate(false);
    });
  }

  addCategory() {
    this.props.statusCategoryCreate(true).then(() => {
      if (this.props.page.categoryCreate === true) {
        const length = this.state.number;
        const count = length + 1;
        this.setState({ countCategory: count });
        this.setState({ arrCreateCategory: [].concat(count) });
      }
      this.props.statusCategoryEdit(false);
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
              <h3 className="box-title">List Category</h3>
            </div>
            {/* /.box-header */}
            <div className="box-body">
              <div className="listCategory">
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
                        <ICheck type="checkbox" className="inputChooseAllChannelOptionCategory" />
                      </th>
                      <th>Name</th>
                      <th>Value</th>
                      <th>Status</th>
                      <th>&nbsp;</th>
                      <th>&nbsp;</th>
                    </tr>
                  )}
                  tfoot={(
                    <tr>
                      <th>
                        <ICheck type="checkbox" className="inputChooseAllChannelOptionCategory" />
                      </th>
                      <th>Name</th>
                      <th>Value</th>
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
          {this.props.page.categoryEdit === true &&
          this.state.arrCategory && this.state.arrCategory.map((count) => (
            <div className="box" key={count}>
              <div className="editChannelOptionCategoryForm">
                <EditChannelOptionCategoryForm
                  id={this.state.category.id}
                  category={this.state.category}
                  updateChannelOptionCategory={this.props.updateChannelOptionCategory}
                  statusCategoryEdit={this.props.statusCategoryEdit}
                  getChannelOptionCategories={this.props.getChannelOptionCategories}
                  page={this.props.page}
                />
              </div>
            </div>
          ))}
          {this.props.page &&
          this.props.page.categoryCreate === true && this.state.arrCreateCategory
          && this.state.arrCreateCategory.map((count) => (
            <div className="box" key={count}>
              <div className="createChannelOptionCategoryForm">
                <CreateChannelOptionCategoryForm
                  id={this.state.category.id}
                  createChannelOptionCategory={this.props.createChannelOptionCategory}
                  getChannelOptionCategories={this.props.getChannelOptionCategories}
                  statusCategoryCreate={this.props.statusCategoryCreate}
                  page={this.props.page}
                />
              </div>
            </div>
          ))
          }
          {((this.props.page.categoryCreate === false && this.props.page.categoryEdit === false) ||
          (this.state.arrCreateCategory && this.state.arrCreateCategory.length === 0
          && this.props.page.categoryEdit === false)) ? (
            <button
              type="button"
              id="create"
              onClick={(event) => this.addCategory(event)}
              className="btn btn-primary"
            >
                Create Category
              </button>
            ) : ('')}
        </div>
      </div>
    );
  }
}

export default ChannelOptionCategoryList;
