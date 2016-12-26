/**
 * Created by Manhhailua on 11/9/16.
 */

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { DataTables, ICheck } from '../../../components/UI/';
import CreateChannelOptionBrowserForm from './CreateChannelOptionBrowserForm';

class ChannelOptionBrowserList extends Component {

  static propTypes = {
    list: PropTypes.array.isRequired,
    page: PropTypes.object,
    getChannelOptionBrowsers: PropTypes.func,
    channelOptionBrowsers: PropTypes.object,
    statusBrowserCreate: PropTypes.func,
    statusBrowserEdit: PropTypes.func,
    createChannelOptionBrowser: PropTypes.func,
    deleteChannelOptionBrowser: PropTypes.func,
    updateChannelOptionBrowser: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      browser: {},
      index: 1,
      arrBrowser: [],
      number: 1,
      countBrowser: 0,
      arrCreateBrowser: [],
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
            className="inputChooseChannelOptionBrowser"
            name="inputChooseChannelOptionBrowser[]"
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
      data: 'status',
    }];
  }

  addBrowser() {
    this.props.statusBrowserCreate(true).then(() => {
      if (this.props.page.browserCreate === true) {
        const length = this.state.number;
        const count = length + 1;
        this.setState({ countBrowser: count });
        this.setState({ arrCreateBrowser: [].concat(count) });
      }
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
              <h3 className="box-title">List Browser</h3>
            </div>
            {/* /.box-header */}
            <div className="box-body">
              <div className="listBrowser">
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
                        <ICheck type="checkbox" className="inputChooseAllChannelOptionBrowsers" />
                      </th>
                      <th>Name</th>
                      <th>Value</th>
                      <th>Status</th>
                    </tr>
                  )}
                  tfoot={(
                    <tr>
                      <th>
                        <ICheck type="checkbox" className="inputChooseAllChannelOptionBrowsers" />
                      </th>
                      <th>Name</th>
                      <th>Value</th>
                      <th>Status</th>
                    </tr>
                  )}
                />
              </div>
            </div>
            {/* /.box-body */}
          </div>
        </div>
        <div className="col-sm-12" id="ChannelOption">
          {this.props.page &&
          this.props.page.browserCreate === true && this.state.arrCreateBrowser
          && this.state.arrCreateBrowser.map((count) => (
            <div className="box" key={count}>
              <div className="CreateChannelOptionBrowserForm">
                <CreateChannelOptionBrowserForm
                  id={this.state.browser.id}
                  index={1}
                  createChannelOptionBrowser={this.props.createChannelOptionBrowser}
                  getZone={this.props.getChannelOptionBrowsers}
                  statusBrowserCreate={this.props.statusBrowserCreate}
                  page={this.props.page}
                />
              </div>
            </div>
          ))
          }
          {((this.props.page.browserCreate === false && this.props.page.browserEdit === false) ||
          (this.state.arrCreateBrowser && this.state.arrCreateBrowser.length === 0
          && this.props.page.browserEdit === false)) ? (
            <button
              type="button"
              id="create"
              onClick={(event) => this.addBrowser(event)}
              className="btn btn-primary"
            >
              Create Browser
            </button>
            ) : ('')}
        </div>
      </div>
    );
  }
}

export default ChannelOptionBrowserList;
