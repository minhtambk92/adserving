/**
 * Created by Manhhailua on 11/9/16.
 */

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { DataTables, ICheck } from '../../../../components/UI/';
import CreateCharacterSetForm from './CreateCharacterSetForm';
import EditCharacterSetForm from './EditCharacterSetForm';
import Link from '../../../../components/Link';

class CharacterSetList extends Component {

  static propTypes = {
    list: PropTypes.array,
    page: PropTypes.object,
    getCharacterSets: PropTypes.func,
    characterSets: PropTypes.object,
    statusCreateCharacterSet: PropTypes.func,
    statusUpdateCharacterSet: PropTypes.func,
    createCharacterSet: PropTypes.func,
    deleteCharacterSet: PropTypes.func,
    updateCharacterSet: PropTypes.func,
    user: PropTypes.object,
    createActivity: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      characterSet: {},
      arrCharacterSet: [],
      arrCreateCharacterSet: [],
    };
  }

  componentWillMount() {
    this.props.statusCreateCharacterSet(true);
    this.props.statusUpdateCharacterSet(false);
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
      data: 'status',
    }, {
      data: null,
      orderable: false,
      createdCell: (cell, cellData, rowData) => {
        ReactDOM.render(<Link
          to="#"
          onClick={() => this.editCharacterSet(rowData)}
        >Edit</Link>, cell);
      },
    }, {
      data: null,
      orderable: false,
      createdCell: (cell, cellData, rowData) => {
        ReactDOM.render(<Link
          to="#"
          onClick={() => this.deleteCharacterSet(rowData)}
        >Delete</Link>, cell);
      },
    }];
  }

  deleteCharacterSet(data) {
    this.props.deleteCharacterSet(data.id).then(() => {
      const userId = this.props.user.id;
      const subject = `CharacterSet ${data.name}`;
      const subjectId = data.id;
      const action = 'deleted';
      const other = '';
      this.props.createActivity({ action,
        subject,
        subjectId,
        other,
        userId }).then(() => {
          this.props.getCharacterSets();
        });
    });
  }

  editCharacterSet(data) {
    this.props.statusUpdateCharacterSet(true).then(() => {
      if (this.props.page.statusUpdateCharacterSet === true) {
        const count = 1;
        this.setState({ arrCharacterSet: [].concat(count) });
        this.setState({ characterSet: data });
      }
      this.props.statusCreateCharacterSet(false);
    });
  }

  addCharacterSet() {
    this.props.statusCreateCharacterSet(true).then(() => {
      if (this.props.page.statusCreateCharacterSet === true) {
        const count = 1;
        this.setState({ arrCreateCharacterSet: [].concat(count) });
      }
      this.props.statusUpdateCharacterSet(false);
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
              <h3 className="box-title">List CharacterSet</h3>
            </div>
            {/* /.box-header */}
            <div className="box-body">
              <div className="listCharacterSet">
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
                        <ICheck type="checkbox" className="inputChooseCharacterSet" />
                      </th>
                      <th>Name</th>
                      <th>Status</th>
                      <th>&nbsp;</th>
                      <th>&nbsp;</th>
                    </tr>
                  )}
                  tfoot={(
                    <tr>
                      <th>
                        <ICheck type="checkbox" className="inputChooseCharacterSet" />
                      </th>
                      <th>Name</th>
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
          {this.props.page.statusUpdateCharacterSet === true &&
          this.state.arrCharacterSet && this.state.arrCharacterSet.map(count => (
            <div className="box" key={count}>
              <div className="editTypeBannerHtmlForm">
                <EditCharacterSetForm
                  id={this.state.characterSet.id}
                  characterSet={this.state.characterSet}
                  updateCharacterSet={this.props.updateCharacterSet}
                  statusUpdateCharacterSet={this.props.statusUpdateCharacterSet}
                  getCharacterSets={this.props.getCharacterSets}
                  page={this.props.page}
                  user={this.props.user}
                  createActivity={this.props.createActivity}
                />
              </div>
            </div>
          ))}
          {this.props.page &&
          this.props.page.statusCreateCharacterSet === true && this.state.arrCreateCharacterSet
          && this.state.arrCreateCharacterSet.map(count => (
            <div className="box" key={count}>
              <div className="CreateCharacterSetForm">
                <CreateCharacterSetForm
                  id={this.state.characterSet.id}
                  createCharacterSet={this.props.createCharacterSet}
                  getCharacterSets={this.props.getCharacterSets}
                  statusCreateCharacterSet={this.props.statusCreateCharacterSet}
                  page={this.props.page}
                  user={this.props.user}
                  createActivity={this.props.createActivity}
                  characterSets={this.props.characterSets}
                />
              </div>
            </div>
          ))
          }
          {((this.props.page.statusCreateCharacterSet === false
          && this.props.page.statusUpdateCharacterSet === false) ||
          (this.state.arrCreateCharacterSet && this.state.arrCreateCharacterSet.length === 0) ? (
            <button
              type="button"
              id="create"
              onClick={event => this.addCharacterSet(event)}
              className="btn btn-primary"
            >
                Create CharacterSet
              </button>
            ) : (''))}
        </div>
      </div>
    );
  }
}

export default CharacterSetList;
