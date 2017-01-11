/**
 * Created by Manhhailua on 11/9/16.
 */

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { DataTables, ICheck } from '../../../../components/UI/';
import CreateAdsServerForm from './CreateAdsServerForm';
import EditAdsServerForm from './EditAdsServerForm';
import Link from '../../../../components/Link';

class AdsServerList extends Component {

  static propTypes = {
    list: PropTypes.array,
    page: PropTypes.object,
    getAdsServers: PropTypes.func,
    adsServers: PropTypes.object,
    statusCreateAdsServer: PropTypes.func,
    statusUpdateAdsServer: PropTypes.func,
    createAdsServer: PropTypes.func,
    deleteAdsServer: PropTypes.func,
    updateAdsServer: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      adsServer: {},
      arrAdsServer: [],
      arrCreateAdsServer: [],
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
            className="inputChooseAdsServer"
            name="inputChooseAdsServer[]"
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
          onClick={() => this.editAdsServer(rowData)}
        >Edit</Link>, cell);
      },
    }, {
      data: null,
      orderable: false,
      createdCell: (cell, cellData, rowData) => {
        ReactDOM.render(<Link
          to="#"
          onClick={() => this.deleteAdsServer(rowData)}
        >Delete</Link>, cell);
      },
    }];
  }

  deleteAdsServer(data) {
    this.props.deleteAdsServer(data.id).then(() => {
      this.props.getAdsServers();
    });
  }

  editAdsServer(data) {
    this.props.statusUpdateAdsServer(true).then(() => {
      if (this.props.page.statusUpdateAdsServer === true) {
        const count = 1;
        this.setState({ arrAdsServer: [].concat(count) });
        this.setState({ adsServer: data });
      }
      this.props.statusCreateAdsServer(false);
    });
  }

  addAdsServer() {
    this.props.statusCreateAdsServer(true).then(() => {
      if (this.props.page.statusCreateAdsServer === true) {
        const count = 1;
        this.setState({ arrCreateAdsServer: [].concat(count) });
      }
      this.props.statusUpdateAdsServer(false);
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
              <h3 className="box-title">List Ads Server</h3>
            </div>
            {/* /.box-header */}
            <div className="box-body">
              <div className="listAdsServer">
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
                        <ICheck type="checkbox" className="inputChooseAdsServer" />
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
                        <ICheck type="checkbox" className="inputChooseAdsServer" />
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
        <div className="col-sm-12">
          {this.props.page.statusUpdateAdsServer === true &&
          this.state.arrAdsServer && this.state.arrAdsServer.map((count) => (
            <div className="box" key={count}>
              <div className="editAdsServerForm">
                <EditAdsServerForm
                  id={this.state.adsServer.id}
                  adsServer={this.state.adsServer}
                  updateAdsServer={this.props.updateAdsServer}
                  statusUpdateAdsServer={this.props.statusUpdateAdsServer}
                  getAdsServers={this.props.getAdsServers}
                  page={this.props.page}
                />
              </div>
            </div>
          ))}
          {this.props.page &&
          this.props.page.statusCreateAdsServer === true && this.state.arrCreateAdsServer
          && this.state.arrCreateAdsServer.map((count) => (
            <div className="box" key={count}>
              <div className="createAdsServerForm">
                <CreateAdsServerForm
                  id={this.state.adsServer.id}
                  createAdsServer={this.props.createAdsServer}
                  getAdsServers={this.props.getAdsServers}
                  statusCreateAdsServer={this.props.statusCreateAdsServer}
                  page={this.props.page}
                />
              </div>
            </div>
          ))
          }
          {((this.props.page.statusCreateAdsServer === false
          && this.props.page.statusUpdateAdsServer === false) ||
          (this.state.arrCreateAdsServer && this.state.arrCreateAdsServer.length === 0
          && this.props.page.statusUpdateAdsServer === false)) ? (
            <button
              type="button"
              id="create"
              onClick={(event) => this.addAdsServer(event)}
              className="btn btn-primary"
            >
                Create Ads Server
              </button>
            ) : ('')}
        </div>
      </div>
    );
  }
}

export default AdsServerList;
