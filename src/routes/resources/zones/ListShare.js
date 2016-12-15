/* global $ */

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import EditShareForm from './EditShareForm';
import CreateShareForm from './CreateShareForm';
import Link from '../../../components/Link';
import { DataTables, ICheck } from '../../../components/UI/';
// import withStyles from 'isomorphic-style-loader/lib/withStyles';

class ListShare extends Component {

  static propTypes = {
    list: PropTypes.array,
    deleteShareZone: PropTypes.func,
    getZone: PropTypes.func,
    zoneId: PropTypes.string,
    updateShareZone: PropTypes.func,
    createShareZone: PropTypes.func,
    removeShare: PropTypes.func,
    setPageZoneActiveTab: PropTypes.func,
    setCurrentShare: PropTypes.func,
    createSharePlacement: PropTypes.func,
    shares: PropTypes.object,
    page: PropTypes.object,
    setStatusShareFormEdit: PropTypes.func,
    setStatusShareFormCreate: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      share: {},
      index: 1,
      numberShare: 1,
      arrShare: [],
      countShare: 0,
      arrCreateShare: [],
    };
  }

  componentDidMount() {
    /* eslint-disable no-undef */
    const self = this;
    // Add New
    $('#createShareZone').click(() => {
      const length = this.state.numberShare;
      const count = length + 1;
      self.setState({ showCreate: false });
      self.setState({ numberShare: count });
      self.setState({ arrShare: self.state.arrShare.concat([count]) });
    });
    // Delete
    $('#shareForm').on('click', '.remove-share-zone', function () {
      $(this).parents('.list-zone-shared').remove();
      self.setState({ showCreate: false });
      self.setState({ showEdit: false });
      // self.props.getBanner(self.props.bannerId);
    });
  }

  onTabClickAddPlacement(event, id) {
    event.persist();
    this.props.setPageZoneActiveTab('addPlacement');
    this.props.setCurrentShare(id).then(() => {
      this.props.getZone(this.props.zoneId);
    });
  }

  duplicateShareZone(data) {
    const name = `Copy of ${data.name}`;
    const css = data.css;
    const html = data.html;
    const description = data.description;
    if (name) {
      const zoneId = this.props.zoneId;
      this.props.createShareZone({ name, html, css, description, zoneId }).then(() => {
        if (this.props.shares && this.props.shares.list) {
          const shareId = this.props.shares.list[0].id;
          const arrPlacement = data.placements;
          for (let i = 0; i < arrPlacement.length; i += 1) {
            const placementId = arrPlacement[i].id;
            this.props.createSharePlacement({ placementId, shareId }).then(() => {
              this.props.setPageZoneActiveTab('shareZone');
              this.props.getZone(this.props.zoneId);
            });
          }
        }
      });
    }
  }

  dataTableOptions() { // eslint-disable-line no-unused-vars, class-methods-use-this
    return [{
      data: 'id',
      orderable: false,
      createdCell: (cell, cellData) => {
        ReactDOM.render(
          <ICheck
            type="checkbox"
            className="inputShare"
            name="inputShare[]"
            value={cellData}
          />,
          cell,
        );
      },
    }, {
      data: 'name',
    }, {
      data: 'description',
    }, {
      data: null,
      orderable: false,
      createdCell: (cell, cellData, rowData) => {
        ReactDOM.render(<Link
          to={`/resource/zone/${this.props.zoneId}`}
          onClick={(event) => this.onTabClickAddPlacement(event, rowData.id)}
        >Add Placement</Link>, cell);
      },
    }, {
      data: null,
      orderable: false,
      createdCell: (cell, cellData, rowData) => {
        ReactDOM.render(<Link
          to="#"
          onClick={() => this.editShareZone(rowData)}
        >Edit</Link>, cell);
      },
    }, {
      data: null,
      orderable: false,
      createdCell: (cell, cellData, rowData) => {
        ReactDOM.render(<Link
          to="#"
          onClick={() => this.deleteShareZone(rowData.id)}
        >Delete</Link>, cell);
      },
    }, {
      data: null,
      orderable: false,
      createdCell: (cell, cellData, rowData) => {
        ReactDOM.render(<Link
          to="#"
          onClick={() => this.duplicateShareZone(rowData)}
        >Duplicate</Link>, cell);
      },
    }];
  }

  deleteShareZone(id) {
    if (id) {
      this.props.deleteShareZone(id).then(() => {
        this.props.removeShare(id);
        this.props.getZone(this.props.zoneId);
      });
    }
  }

  editShareZone(data) {
    this.props.setStatusShareFormEdit(true).then(() => {
      if (this.props.page.statusEdit === true) {
        const length = this.state.numberShare;
        const count = length + 1;
        this.setState({ countShare: count });
        this.setState({ arrShare: [].concat(count) });
        this.setState({ share: data });
      }
    });
  }

  addShare() {
    this.props.setStatusShareFormCreate(true).then(() => {
      if (this.props.page.statusCreate === true) {
        const length = this.state.numberShare;
        const count = length + 1;
        this.setState({ countShare: count });
        this.setState({ arrCreateShare: [].concat(count) });
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
              <h3 className="box-title">List Share of Zone</h3>
            </div>
            {/* /.box-header */}
            <div className="box-body">
              <div className="listShare">
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
                      <th><ICheck type="checkbox" className="inputChooseAllShares" /></th>
                      <th>Name</th>
                      <th>Description</th>
                      <th>&nbsp;</th>
                      <th>&nbsp;</th>
                      <th>&nbsp;</th>
                      <th>&nbsp;</th>
                    </tr>
                  )}
                  tfoot={(
                    <tr>
                      <th><ICheck type="checkbox" className="inputChooseAllShares" /></th>
                      <th>Name</th>
                      <th>Description</th>
                      <th>&nbsp;</th>
                      <th>&nbsp;</th>
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
        <div className="col-sm-12" id="shareForm">
          {this.props.page.statusEdit === true &&
          this.state.arrShare && this.state.arrShare.map((count) => (
            <div className="box" key={count}>
              <div className="editShare">
                <EditShareForm
                  id={this.state.share.id}
                  childZone={this.state.share}
                  index={1}
                  updateShareZone={this.props.updateShareZone}
                  getZone={this.props.getZone}
                  zoneId={this.props.zoneId}
                  setPageZoneActiveTab={this.props.setPageZoneActiveTab}
                  setStatusShareFormEdit={this.props.setStatusShareFormEdit}
                  page={this.props.page}
                />
              </div>
            </div>
          ))}
          {this.props.page.statusCreate === true && this.state.arrCreateShare
          && this.state.arrCreateShare.map((count) => (
            <div className="box" key={count}>
              <div className="shareZoneForm">
                <CreateShareForm
                  id={this.state.share.id}
                  index={1}
                  createShareZone={this.props.createShareZone}
                  getZone={this.props.getZone}
                  zoneId={this.props.zoneId}
                  setPageZoneActiveTab={this.props.setPageZoneActiveTab}
                  setStatusShareFormCreate={this.props.setStatusShareFormCreate}
                  page={this.props.page}
                />
              </div>
            </div>
          ))
          }
          {((this.props.page.statusCreate === false && this.props.page.statusEdit === false) ||
          (this.state.arrCreateShare && this.state.arrCreateShare.length === 0
          && this.props.page.statusEdit === false)) ? (
            <button
              type="button"
              id="createShareZone"
              onClick={(event) => this.addShare(event)}
              className="btn btn-primary"
            >
              Create Share
            </button>
          ) : ('')}
        </div>
      </div>
    );
  }
}

export default ListShare;
