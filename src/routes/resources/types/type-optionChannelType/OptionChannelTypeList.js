/**
 * Created by Manhhailua on 11/9/16.
 */

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { DataTables, ICheck } from '../../../../components/UI/';
import CreateOptionChannelTypeForm from './CreateOptionChannelTypeForm';
import EditOptionChannelTypeForm from './EditOptionChannelTypeForm';
import Link from '../../../../components/Link';

class OptionChannelTypeList extends Component {

  static propTypes = {
    list: PropTypes.array,
    page: PropTypes.object,
    getOptionChannelTypes: PropTypes.func,
    optionChannelTypes: PropTypes.object,
    statusCreateOptionChannelType: PropTypes.func,
    statusUpdateOptionChannelType: PropTypes.func,
    createOptionChannelType: PropTypes.func,
    deleteOptionChannelType: PropTypes.func,
    updateOptionChannelType: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      optionChannelType: {},
      arrOptionChannelType: [],
      arrCreateOptionChannelType: [],
    };
  }

  componentWillMount() {
    this.props.statusCreateOptionChannelType(true);
    this.props.statusUpdateOptionChannelType(false);
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
      render: (data, type, row) => {
        let typeOption = '';
        if (row.isInputLink === true) {
          typeOption = 'InputLink';
        } else if (row.isSelectOption === true) {
          typeOption = 'Select Option';
        } else if (row.isVariable === true) {
          typeOption = 'Variable';
        }
        return typeOption;
      },
    }, {
      data: 'status',
    }, {
      data: null,
      orderable: false,
      createdCell: (cell, cellData, rowData) => {
        ReactDOM.render(<Link
          to="#"
          onClick={() => this.editOptionChannelType(rowData)}
        >Edit</Link>, cell);
      },
    }, {
      data: null,
      orderable: false,
      createdCell: (cell, cellData, rowData) => {
        ReactDOM.render(<Link
          to="#"
          onClick={() => this.deleteOptionChannelType(rowData)}
        >Delete</Link>, cell);
      },
    }];
  }

  deleteOptionChannelType(data) {
    this.props.deleteOptionChannelType(data.id).then(() => {
      this.props.getOptionChannelTypes();
    });
  }

  editOptionChannelType(data) {
    this.props.statusUpdateOptionChannelType(true).then(() => {
      if (this.props.page.statusUpdateOptionChannelType === true) {
        const count = 1;
        this.setState({ arrOptionChannelType: [].concat(count) });
        this.setState({ optionChannelType: data });
      }
      this.props.statusCreateOptionChannelType(false);
    });
  }

  addOptionChannelType() {
    this.props.statusCreateOptionChannelType(true).then(() => {
      if (this.props.page.statusCreateOptionChannelType === true) {
        const count = 1;
        this.setState({ arrCreateOptionChannelType: [].concat(count) });
      }
      this.props.statusUpdateOptionChannelType(false);
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
              <h3 className="box-title">List Option Channel Type</h3>
            </div>
            {/* /.box-header */}
            <div className="box-body">
              <div className="listOptionChannelType">
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
                        <ICheck type="checkbox" className="inputChooseOptionChannelType" />
                      </th>
                      <th>Name</th>
                      <th>Type</th>
                      <th>Status</th>
                      <th>&nbsp;</th>
                      <th>&nbsp;</th>
                    </tr>
                  )}
                  tfoot={(
                    <tr>
                      <th>
                        <ICheck type="checkbox" className="inputChooseOptionChannelType" />
                      </th>
                      <th>Name</th>
                      <th>Type</th>
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
          {this.props.page.statusUpdateOptionChannelType === true &&
          this.state.arrOptionChannelType && this.state.arrOptionChannelType.map((count) => (
            <div className="box" key={count}>
              <div className="editTypeBannerHtmlForm">
                <EditOptionChannelTypeForm
                  id={this.state.optionChannelType.id}
                  optionChannelType={this.state.optionChannelType}
                  updateOptionChannelType={this.props.updateOptionChannelType}
                  statusUpdateOptionChannelType={this.props.statusUpdateOptionChannelType}
                  getOptionChannelTypes={this.props.getOptionChannelTypes}
                  page={this.props.page}
                />
              </div>
            </div>
          ))}
          {this.props.page &&
          this.props.page.statusCreateOptionChannelType === true &&
          this.state.arrCreateOptionChannelType
          && this.state.arrCreateOptionChannelType.map((count) => (
            <div className="box" key={count}>
              <div className="CreateOptionChannelTypeForm">
                <CreateOptionChannelTypeForm
                  id={this.state.optionChannelType.id}
                  createOptionChannelType={this.props.createOptionChannelType}
                  getOptionChannelTypes={this.props.getOptionChannelTypes}
                  statusCreateOptionChannelType={this.props.statusCreateOptionChannelType}
                  page={this.props.page}
                />
              </div>
            </div>
          ))
          }
          {((this.props.page.statusCreateOptionChannelType === false
          && this.props.page.statusUpdateOptionChannelType === false) ||
          (this.state.arrCreateOptionChannelType &&
          this.state.arrCreateOptionChannelType.length === 0
          && this.props.page.statusUpdateOptionChannelType === false)) ? (
            <button
              type="button"
              id="create"
              onClick={(event) => this.addOptionChannelType(event)}
              className="btn btn-primary"
            >
                Create Option Channel Type
              </button>
            ) : ('')}
        </div>
      </div>
    );
  }
}

export default OptionChannelTypeList;
