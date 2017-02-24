import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { DataTables, ICheck } from '../../../../components/UI/';
import EditProfileForm from './EditProfileForm';
import Link from '../../../../components/Link';

class ProfileList extends Component {

  static propTypes = {
    list: PropTypes.array.isRequired,
    getUsers: PropTypes.func,
    page: PropTypes.object,
    updateProfile: PropTypes.func,
    setStatusUpdateProfile: PropTypes.func,
    user: PropTypes.object,
    createActivity: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      profile: {},
      arrProfile: [],
      id: '',
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
            className="inputChooseProfile"
            name="inputChooseProfile[]"
            value={cellData}
          />,
          cell,
        );
      },
    }, {
      data: 'profile.displayName',
    }, {
      data: 'profile.gender',
    }, {
      data: 'profile.location',
    }, {
      data: 'profile.website',
    }, {
      data: null,
      orderable: false,
      createdCell: (cell, cellData, rowData) => {
        ReactDOM.render(<Link
          to="#"
          onClick={() => this.editProfile(rowData)}
        >Edit</Link>, cell);
      },
    }];
  }

  editProfile(data) {
    this.props.setStatusUpdateProfile(true).then(() => {
      if (this.props.page.statusUpdateProfile === true) {
        const count = 1;
        const detail = data.profile;
        const userId = data.id;
        this.setState({ id: userId });
        this.setState({ arrProfile: [].concat(count) });
        this.setState({ profile: detail });
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
              <h3 className="box-title">List Profile</h3>
            </div>
            {/* /.box-header */}
            <div className="box-body">
              <div className="listProfile">
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
                        <ICheck type="checkbox" className="inputChooseAllProfiles" />
                      </th>
                      <th>Name</th>
                      <th>Gender</th>
                      <th>Location</th>
                      <th>Website</th>
                      <th>&nbsp;</th>
                    </tr>
                  )}
                  tfoot={(
                    <tr>
                      <th>
                        <ICheck type="checkbox" className="inputChooseAllProfiles" />
                      </th>
                      <th>Name</th>
                      <th>Gender</th>
                      <th>Location</th>
                      <th>Website</th>
                      <th>&nbsp;</th>
                    </tr>
                  )}
                />
              </div>
            </div>
            {/* /.box-body */}
          </div>
        </div>
        <div className="col-sm-12" id="profile">
          {this.props.page.statusUpdateProfile === true &&
          this.state.arrProfile && this.state.arrProfile.map(count => (
            <div className="box" key={count}>
              <div className="editProfile">
                <EditProfileForm
                  id={this.state.id}
                  profile={this.state.profile}
                  updateProfile={this.props.updateProfile}
                  setStatusUpdateProfile={this.props.setStatusUpdateProfile}
                  getUsers={this.props.getUsers}
                  page={this.props.page}
                  user={this.props.user}
                  createActivity={this.props.createActivity}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default ProfileList;
