/* global $ */

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { DataTables, ICheck } from '../../../../components/UI/';
import CreateOptionChannelValuePropertyForm from './CreateOptionChannelValuePropertyForm';
import EditOptionChannelValuePropertyForm from './EditOptionChannelValuePropertyForm';
import Link from '../../../../components/Link';

class OptionChannelValuePropertyList extends Component {

  static propTypes = {
    list: PropTypes.array,
    page: PropTypes.object,
    getOptionChannelValueProperties: PropTypes.func,
    optionChannelValueProperties: PropTypes.object,
    statusCreateOptionChannelValueProperty: PropTypes.func,
    statusUpdateOptionChannelValueProperty: PropTypes.func,
    createOptionChannelValueProperty: PropTypes.func,
    deleteOptionChannelValueProperty: PropTypes.func,
    updateOptionChannelValueProperty: PropTypes.func,
    optionChannelValueList: PropTypes.array,
    user: PropTypes.object,
    createActivity: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      optionChannelValueProperty: {},
      arrOptionChannelValueProperty: [],
      arrCreateOptionChannelValueProperty: [],
      currentOptionChannelValueId: '',
    };
  }

  componentWillMount() {
    this.props.statusCreateOptionChannelValueProperty(true);
    this.props.statusUpdateOptionChannelValueProperty(false);
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
      data: 'optionChannelValue.name',
    }, {
      data: 'status',
    }, {
      data: null,
      orderable: false,
      createdCell: (cell, cellData, rowData) => {
        ReactDOM.render(<Link
          to="#"
          onClick={() => this.editOptionChannelValueProperty(rowData)}
        >Edit</Link>, cell);
      },
    }, {
      data: null,
      orderable: false,
      createdCell: (cell, cellData, rowData) => {
        ReactDOM.render(<Link
          to="#"
          onClick={() => this.deleteOptionChannelValueProperty(rowData)}
        >Delete</Link>, cell);
      },
    }];
  }

  deleteOptionChannelValueProperty(data) {
    this.props.deleteOptionChannelValueProperty(data.id).then(() => {
      const userId = this.props.user.id;
      const subject = `Option Channel Value Property ${data.name}`;
      const subjectId = data.id;
      const action = 'deleted';
      const other = '';
      this.props.createActivity({ action,
        subject,
        subjectId,
        other,
        userId }).then(() => {
          this.props.getOptionChannelValueProperties();
        });
    });
  }

  editOptionChannelValueProperty(data) {
    this.props.statusUpdateOptionChannelValueProperty(true).then(() => {
      if (this.props.page.statusUpdateOptionChannelValueProperty === true) {
        const count = 1;
        this.setState({ arrOptionChannelValueProperty: [].concat(count) });
        this.setState({ optionChannelValueProperty: data });
      }
      this.props.statusCreateOptionChannelValueProperty(false);
    });
  }

  addOptionChannelValueProperty() {
    this.props.statusCreateOptionChannelValueProperty(true).then(() => {
      if (this.props.page.statusCreateOptionChannelValueProperty === true) {
        const count = 1;
        this.setState({ arrCreateOptionChannelValueProperty: [].concat(count) });
      }
      this.props.statusUpdateOptionChannelValueProperty(false);
    });
    const currentId = $('#inputOptionChannelValuesFilters').val();
    if (currentId !== null && currentId !== '') {
      this.setState({ currentOptionChannelValueId: currentId });
    }
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
              <h3 className="box-title">List Option Channel Value</h3>
            </div>
            {/* /.box-header */}
            <div className="box-body">
              <div className="listOptionChannelValueProperty">
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
                        <ICheck type="checkbox" className="inputChooseOptionChannelValueProperty" />
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
                        <ICheck type="checkbox" className="inputChooseOptionChannelValueProperty" />
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
          {this.props.page.statusUpdateOptionChannelValueProperty === true &&
          this.state.arrOptionChannelValueProperty &&
          this.state.arrOptionChannelValueProperty.map(count => (
            <div className="box" key={count}>
              <div className="editTypeBannerHtmlForm">
                <EditOptionChannelValuePropertyForm
                  id={this.state.optionChannelValueProperty.id}
                  optionChannelValueProperty={this.state.optionChannelValueProperty}
                  updateOptionChannelValueProperty={this.props.updateOptionChannelValueProperty}
                  statusUpdateOptionChannelValueProperty={
                    this.props.statusUpdateOptionChannelValueProperty}
                  getOptionChannelValueProperties={this.props.getOptionChannelValueProperties}
                  optionChannelValueList={this.props.optionChannelValueList}
                  page={this.props.page}
                  user={this.props.user}
                  createActivity={this.props.createActivity}
                />
              </div>
            </div>
          ))}
          {this.props.page &&
          this.props.page.statusCreateOptionChannelValueProperty === true &&
          this.state.arrCreateOptionChannelValueProperty
          && this.state.arrCreateOptionChannelValueProperty.map(count => (
            <div className="box" key={count}>
              <div className="CreateOptionChannelValuePropertyForm">
                <CreateOptionChannelValuePropertyForm
                  id={this.state.optionChannelValueProperty.id}
                  createOptionChannelValueProperty={this.props.createOptionChannelValueProperty}
                  getOptionChannelValueProperties={this.props.getOptionChannelValueProperties}
                  currentOptionChannelValueId={this.state.currentOptionChannelValueId}
                  statusCreateOptionChannelValueProperty={
                    this.props.statusCreateOptionChannelValueProperty}
                  optionChannelValueList={this.props.optionChannelValueList}
                  optionChannelValueProperties={this.props.optionChannelValueProperties}
                  page={this.props.page}
                  user={this.props.user}
                  createActivity={this.props.createActivity}
                />
              </div>
            </div>
          ))
          }
          {((this.props.page.statusCreateOptionChannelValueProperty === false
          && this.props.page.statusUpdateOptionChannelValueProperty === false) ||
          (this.state.arrCreateOptionChannelValueProperty &&
          this.state.arrCreateOptionChannelValueProperty.length === 0
          && this.props.page.statusUpdateOptionChannelValueProperty === false)) ? (
            <button
              type="button"
              id="create"
              onClick={event => this.addOptionChannelValueProperty(event)}
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

export default OptionChannelValuePropertyList;
