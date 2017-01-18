import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { DataTables, ICheck } from '../../../../components/UI/';
import CreateOptionForm from './CreateOptionForm';
import EditOptionForm from './EditOptionForm';
import Link from '../../../../components/Link';

class OptionList extends Component {

  static propTypes = {
    list: PropTypes.array.isRequired,
    getOptions: PropTypes.func,
    createOption: PropTypes.func,
    updateOption: PropTypes.func,
    deleteOption: PropTypes.func,
    page: PropTypes.object,
    setStatusCreateOption: PropTypes.func,
    setStatusUpdateOption: PropTypes.func,
    options: PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      option: {},
      arrOption: [],
      arrCreateOption: [],
    };
  }

  componentWillMount() {
    this.props.setStatusCreateOption(true);
    this.props.setStatusUpdateOption(false);
  }

  dataTableOptions() { // eslint-disable-line class-methods-use-this
    return [{
      data: 'id',
      orderable: false,
      createdCell: (cell, cellData) => {
        ReactDOM.render(
          <ICheck
            type="checkbox"
            className="inputChooseOption"
            name="inputChooseOption[]"
            value={cellData}
          />,
          cell,
        );
      },
    }, {
      data: 'name',
    }, {
      data: 'value',
      render: data => (data ? 'yes' : 'no'),
    }, {
      data: 'autoLoad',
    }, {
      data: 'status',
    }, {
      data: null,
      orderable: false,
      createdCell: (cell, cellData, rowData) => {
        ReactDOM.render(<Link
          to="#"
          onClick={() => this.editOption(rowData)}
        >Edit</Link>, cell);
      },
    }, {
      data: null,
      orderable: false,
      createdCell: (cell, cellData, rowData) => {
        ReactDOM.render(<Link
          to="#"
          onClick={() => this.deleteOption(rowData)}
        >Delete</Link>, cell);
      },
    }];
  }

  addOption() {
    this.props.setStatusCreateOption(true).then(() => {
      if (this.props.page.statusCreateOption === true) {
        const count = 1;
        this.setState({ arrCreateOption: [].concat(count) });
      }
      this.props.setStatusUpdateOption(false);
    });
  }

  deleteOption(data) {
    this.props.deleteOption(data.id).then(() => {
      this.props.getOptions();
    });
  }

  editOption(data) {
    this.props.setStatusUpdateOption(true).then(() => {
      if (this.props.page.statusUpdateOption === true) {
        const count = 1;
        this.setState({ arrOption: [].concat(count) });
        this.setState({ option: data });
      }
      this.props.setStatusCreateOption(false);
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
              <h3 className="box-title">List Option</h3>
            </div>
            {/* /.box-header */}
            <div className="box-body">
              <div className="listOption">
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
                        <ICheck type="checkbox" className="inputChooseAllOptions" />
                      </th>
                      <th>Name</th>
                      <th>Value</th>
                      <th>AutoLoad</th>
                      <th>Status</th>
                      <th>&nbsp;</th>
                      <th>&nbsp;</th>
                    </tr>
                  )}
                  tfoot={(
                    <tr>
                      <th>
                        <ICheck type="checkbox" className="inputChooseAllOptions" />
                      </th>
                      <th>Name</th>
                      <th>Value</th>
                      <th>AutoLoad</th>
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
          {this.props.page.statusUpdateOption === true &&
          this.state.arrOption && this.state.arrOption.map((count) => (
            <div className="box" key={count}>
              <div className="editOption">
                <EditOptionForm
                  id={this.state.option.id}
                  option={this.state.option}
                  updateOption={this.props.updateOption}
                  setStatusUpdateOption={this.props.setStatusUpdateOption}
                  getOptions={this.props.getOptions}
                  page={this.props.page}
                />
              </div>
            </div>
          ))}
          {this.props.page &&
          this.props.page.statusCreateOption === true && this.state.arrCreateOption
          && this.state.arrCreateOption.map((count) => (
            <div className="box" key={count}>
              <div className="createOption">
                <CreateOptionForm
                  id={this.state.option.id}
                  createOption={this.props.createOption}
                  getOptions={this.props.getOptions}
                  setStatusCreateOption={this.props.setStatusCreateOption}
                  page={this.props.page}
                  options={this.props.options}
                />
              </div>
            </div>
          ))
          }
          {((this.props.page.statusCreateOption === false &&
          this.props.page.statusUpdateOption === false) ||
          (this.state.arrCreateOption && this.state.arrCreateOption.length === 0
          && this.props.page.statusUpdateOption === false)) ? (
            <button
              type="button"
              id="create"
              onClick={(event) => this.addOption(event)}
              className="btn btn-primary"
            >
                Create Option
            </button>
            ) : ('')}
        </div>
      </div>
    );
  }
}

export default OptionList;
