/* global $ */

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import ShareForm from './ShareForm';
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
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      share: {},
      showEdit: false,
      index: 1,
      numberShare: 1,
      arrShare: [],
      showCreate: false,
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
    this.setState({ share: data });
    this.setState({ showEdit: true });
  }

  save() {
    const i = this.state.index;
    const id = $(`.list-zone-share-${i}`).attr('id');
    const name = $(`#inputShareName-${i}`).val();
    const css = $(`#inputShareCSS-${i}`).val();
    const html = $(`#inputShareHTML-${i}`).val();
    const description = $(`#inputShareDescription-${i}`).val();
    if (id) {
      if (name) {
        this.props.updateShareZone({ id, name, html, css, description }).then(() => {
          this.props.getZone(this.props.zoneId).then(() => {
            this.setState({ share: {} });
            this.setState({ showEdit: false });
            this.props.setPageZoneActiveTab('shareZone');
          });
        });
      }
    }
  }

  addShare() {
    this.setState({ showCreate: true });
  }

  createShare() {
    const i = this.state.index;
    const id = $(`.list-zone-share-${i}`).attr('id');
    const name = $(`#inputShareName-${i}`).val();
    const css = $(`#inputShareCSS-${i}`).val();
    const html = $(`#inputShareHTML-${i}`).val();
    const description = $(`#inputShareDescription-${i}`).val();
    if (!id) {
      if (name) {
        const zoneId = this.props.zoneId;
        this.props.createShareZone({ name, html, css, description, zoneId }).then(() => {
          this.props.getZone(this.props.zoneId);
        });
        $(`.list-zone-share-${i}`).remove();
      }
    }
    this.props.setPageZoneActiveTab('shareZone');
    this.setState({ showCreate: false });
  }

  clear() {
    const i = this.state.index;
    $(`#inputShareName-${i}`).val('');
    $(`#inputShareCSS-${i}`).val('');
    $(`#inputShareHTML-${i}`).val('');
    $(`#inputShareDescription-${i}`).val('');
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
        <div className="col-sm-6">
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
                    </tr>
                  )}
                />
              </div>
            </div>
            {/* /.box-body */}
          </div>
        </div>
        <div className="col-sm-6" id="shareForm">
          {this.state.showEdit === true ? (
            <div className="box">
              <div className="editShare">
                <ShareForm
                  id={this.state.share.id}
                  childZone={this.state.share}
                  index={1}
                />
                <div className="clearfix">
                  <Link
                    to="#"
                    className="btn btn-app pull-right"
                    onClick={event => this.save(event)}
                  ><i className="fa fa-floppy-o" /> Save</Link>
                </div>
              </div>
            </div>
          ) : ''}
          {this.state.showCreate === true && this.state.showEdit === false &&
          <div className="box">
            <div className="shareZoneForm">
              <ShareForm
                index={1}
                key={1}
              />
              <div className="clearfix">
                <Link
                  to="#"
                  className="btn btn-app pull-right"
                  onClick={event => this.clear(event)}
                >
                  <i className="fa fa-undo" />
                  Clear
                </Link>
                <Link
                  to="#"
                  className="btn btn-app pull-right"
                  onClick={event => this.createShare(event)}
                ><i className="fa fa-floppy-o" /> Save</Link>
              </div>
            </div>
          </div>
          }
          {this.state.showCreate === false && this.state.showEdit === false ? (
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
