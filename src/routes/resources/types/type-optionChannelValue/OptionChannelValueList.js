/**
 * Created by Manhhailua on 11/9/16.
 */

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { DataTables, ICheck } from '../../../../components/UI/';
import CreateOptionChannelValueForm from './CreateOptionChannelValueForm';
import EditOptionChannelValueForm from './EditOptionChannelValueForm';
import Link from '../../../../components/Link';

class OptionChannelValueList extends Component {

  static propTypes = {
    list: PropTypes.array,
    page: PropTypes.object,
    getOptionChannelValues: PropTypes.func,
    optionChannelValues: PropTypes.object,
    statusCreateOptionChannelValue: PropTypes.func,
    statusUpdateOptionChannelValue: PropTypes.func,
    createOptionChannelValue: PropTypes.func,
    deleteOptionChannelValue: PropTypes.func,
    updateOptionChannelValue: PropTypes.func,
    optionChannelTypeList: PropTypes.array,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      optionChannelValue: {},
      arrOptionChannelValue: [],
      arrCreateOptionChannelValue: [],
    };
  }

  componentWillMount() {
    this.props.statusCreateOptionChannelValue(true);
    this.props.statusUpdateOptionChannelValue(false);
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
      data: 'optionChannelType.name',
    }, {
      data: 'status',
    }, {
      data: null,
      orderable: false,
      createdCell: (cell, cellData, rowData) => {
        ReactDOM.render(<Link
          to="#"
          onClick={() => this.editOptionChannelValue(rowData)}
        >Edit</Link>, cell);
      },
    }, {
      data: null,
      orderable: false,
      createdCell: (cell, cellData, rowData) => {
        ReactDOM.render(<Link
          to="#"
          onClick={() => this.deleteOptionChannelValue(rowData)}
        >Delete</Link>, cell);
      },
    }];
  }

  deleteOptionChannelValue(data) {
    this.props.deleteOptionChannelValue(data.id).then(() => {
      this.props.getOptionChannelValues();
    });
  }

  editOptionChannelValue(data) {
    this.props.statusUpdateOptionChannelValue(true).then(() => {
      if (this.props.page.statusUpdateOptionChannelValue === true) {
        const count = 1;
        this.setState({ arrOptionChannelValue: [].concat(count) });
        this.setState({ optionChannelValue: data });
      }
      this.props.statusCreateOptionChannelValue(false);
    });
  }

  addOptionChannelValue() {
    this.props.statusCreateOptionChannelValue(true).then(() => {
      if (this.props.page.statusCreateOptionChannelValue === true) {
        const count = 1;
        this.setState({ arrCreateOptionChannelValue: [].concat(count) });
      }
      this.props.statusUpdateOptionChannelValue(false);
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
              <div className="listOptionChannelValue">
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
                        <ICheck type="checkbox" className="inputChooseOptionChannelValue" />
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
                        <ICheck type="checkbox" className="inputChooseOptionChannelValue" />
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
          {this.props.page.statusUpdateOptionChannelValue === true &&
          this.state.arrOptionChannelValue && this.state.arrOptionChannelValue.map((count) => (
            <div className="box" key={count}>
              <div className="editTypeBannerHtmlForm">
                <EditOptionChannelValueForm
                  id={this.state.optionChannelValue.id}
                  optionChannelValue={this.state.optionChannelValue}
                  updateOptionChannelValue={this.props.updateOptionChannelValue}
                  statusUpdateOptionChannelValue={this.props.statusUpdateOptionChannelValue}
                  getOptionChannelValues={this.props.getOptionChannelValues}
                  optionChannelTypeList={this.props.optionChannelTypeList}
                  page={this.props.page}
                />
              </div>
            </div>
          ))}
          {this.props.page &&
          this.props.page.statusCreateOptionChannelValue === true &&
          this.state.arrCreateOptionChannelValue
          && this.state.arrCreateOptionChannelValue.map((count) => (
            <div className="box" key={count}>
              <div className="CreateOptionChannelValueForm">
                <CreateOptionChannelValueForm
                  id={this.state.optionChannelValue.id}
                  createOptionChannelValue={this.props.createOptionChannelValue}
                  getOptionChannelValues={this.props.getOptionChannelValues}
                  statusCreateOptionChannelValue={this.props.statusCreateOptionChannelValue}
                  optionChannelTypeList={this.props.optionChannelTypeList}
                  page={this.props.page}
                />
              </div>
            </div>
          ))
          }
          {((this.props.page.statusCreateOptionChannelValue === false
          && this.props.page.statusUpdateOptionChannelValue === false) ||
          (this.state.arrCreateOptionChannelValue &&
          this.state.arrCreateOptionChannelValue.length === 0
          && this.props.page.statusUpdateOptionChannelValue === false)) ? (
            <button
              type="button"
              id="create"
              onClick={(event) => this.addOptionChannelValue(event)}
              className="btn btn-primary"
            >
                Create Option Channel Value
              </button>
            ) : ('')}
        </div>
      </div>
    );
  }
}

export default OptionChannelValueList;
