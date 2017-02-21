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
    deleteShare: PropTypes.func,
    getZone: PropTypes.func,
    zoneId: PropTypes.string,
    createShare: PropTypes.func,
    setPageZoneActiveTab: PropTypes.func,
    setCurrentShare: PropTypes.func,
    shares: PropTypes.object,
    page: PropTypes.object,
    setStatusShareFormEdit: PropTypes.func,
    setStatusShareFormCreate: PropTypes.func,
    updateShare: PropTypes.func,
    user: PropTypes.object,
    createActivity: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      share: {},
      arrShare: [],
      arrCreateShare: [],
    };
  }
  componentWillMount() {
    this.props.setStatusShareFormCreate(true);
    this.props.setStatusShareFormEdit(false);
  }

  onTabClickAddPlacement(event, id) {
    event.persist();
    this.props.setPageZoneActiveTab('addPlacement');
    this.props.setCurrentShare(id).then(() => {
      this.props.getZone(this.props.zoneId);
    });
  }

  duplicateShare(data) {
    const name = `Copy of ${data.name}`;
    const css = data.css;
    const outputCss = '';
    const html = data.html;
    const width = data.width;
    const height = data.height;
    const weight = data.weight;
    const classes = data.classes;
    const type = data.type;
    const description = data.description;
    if (name) {
      const zoneId = this.props.zoneId;
      this.props.createShare({
        name,
        html,
        css,
        outputCss,
        width,
        height,
        weight,
        classes,
        type,
        description,
        zoneId,
      }).then(() => {
        if (this.props.list && this.props.list.length > 0) {
          const userId = this.props.user.id;
          const subject = `Share ${data.name}`;
          const subjectId = this.props.list[0].id;
          const action = 'duplicated';
          const other = JSON.stringify(data);
          this.props.createActivity({ action,
            subject,
            subjectId,
            other,
            userId });
        }
        if (this.props.shares && this.props.shares.list[0]) {
          const share = this.props.shares.list[0];
          if (data.placements.length > 0) {
            const placement = data.placements;
            share.placements = JSON.stringify(placement.map(p => ({
              id: p.id,
              name: p.name,
              startTime: p.startTime,
              endTime: p.endTime,
              width: p.width,
              height: p.height,
              weight: p.weight,
              description: p.description,
              campaignId: p.campaignId,
              status: p.status,
              isDeleted: false,
            })));
            delete share.zoneId;
            this.props.updateShare(share).then(() => {
              this.props.getZone(this.props.zoneId).then(() => {
                this.props.setPageZoneActiveTab('shareZone');
              });
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
      data: 'weight',
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
          onClick={() => this.editShare(rowData)}
        >Edit</Link>, cell);
      },
    }, {
      data: null,
      orderable: false,
      createdCell: (cell, cellData, rowData) => {
        ReactDOM.render(<Link
          to="#"
          onClick={() => this.deleteShare(rowData)}
        >Delete</Link>, cell);
      },
    }, {
      data: null,
      orderable: false,
      createdCell: (cell, cellData, rowData) => {
        ReactDOM.render(<Link
          to="#"
          onClick={() => this.duplicateShare(rowData)}
        >Duplicate</Link>, cell);
      },
    }];
  }

  deleteShare(data) {
    if (data.id) {
      const shareObject = data;
      this.props.deleteShare(data.id).then(() => {
        const userId = this.props.user.id;
        const subject = `Share ${data.name}`;
        const subjectId = data.id;
        const action = 'deleted';
        const other = JSON.stringify(shareObject);
        this.props.createActivity({ action,
          subject,
          subjectId,
          other,
          userId }).then(() => {
            this.props.getZone(this.props.zoneId);
          });
      });
    }
  }

  editShare(data) {
    this.props.setStatusShareFormEdit(true).then(() => {
      if (this.props.page.statusEdit === true) {
        const count = 1;
        this.setState({ arrShare: [].concat(count) });
        this.setState({ share: data });
      }
    });
    this.props.setStatusShareFormCreate(false);
  }

  addShare() {
    this.props.setStatusShareFormCreate(true).then(() => {
      if (this.props.page.statusCreate === true) {
        const count = 1;
        this.setState({ arrCreateShare: [].concat(count) });
      }
    });
    this.props.setStatusShareFormEdit(false);
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
                      <th>Weight</th>
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
                      <th>Weight</th>
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
          {
            this.props.page.statusEdit === true &&
            this.state.arrShare && this.state.arrShare.map((count) => (
              <div className="box" key={count}>
                <div className="editShare">
                  <EditShareForm
                    id={this.state.share.id}
                    childZone={this.state.share}
                    updateShare={this.props.updateShare}
                    getZone={this.props.getZone}
                    zoneId={this.props.zoneId}
                    setPageZoneActiveTab={this.props.setPageZoneActiveTab}
                    setStatusShareFormEdit={this.props.setStatusShareFormEdit}
                    list={this.props.list}
                    page={this.props.page}
                    user={this.props.user}
                    createActivity={this.props.createActivity}
                  />
                </div>
              </div>
            ))
          }
          {
            this.props.page.statusCreate === true &&
            this.state.arrCreateShare && this.state.arrCreateShare.map((count) => (
              <div className="box" key={count}>
                <div className="ShareForm">
                  <CreateShareForm
                    id={this.state.share.id}
                    createShare={this.props.createShare}
                    getZone={this.props.getZone}
                    zoneId={this.props.zoneId}
                    setPageZoneActiveTab={this.props.setPageZoneActiveTab}
                    setStatusShareFormCreate={this.props.setStatusShareFormCreate}
                    list={this.props.list}
                    page={this.props.page}
                    user={this.props.user}
                    createActivity={this.props.createActivity}
                  />
                </div>
              </div>
            ))
          }
          {
            ((this.props.page.statusCreate === false && this.props.page.statusEdit === false) ||
            (this.state.arrCreateShare && this.state.arrCreateShare.length === 0 &&
            this.props.page.statusEdit === false)) ?
              (
                <button
                  type="button"
                  id="createShare"
                  onClick={(event) => this.addShare(event)}
                  className="btn btn-primary"
                >
                  Create Share
                </button>
              ) : ('')
          }
        </div>
      </div>
    );
  }
}

export default ListShare;
