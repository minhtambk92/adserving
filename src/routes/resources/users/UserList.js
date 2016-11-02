/**
 * Created by Manhhailua on 11/2/16.
 */

import React, { Component, PropTypes } from 'react';
import dimensions from 'react-dimensions';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Table, Column, Cell } from 'fixed-data-table';
import s from 'fixed-data-table/dist/fixed-data-table.min.css';
import Link from '../../../components/Link';

class UserList extends Component {

  static propTypes = {
    containerWidth: PropTypes.number,
    users: PropTypes.object,
  };

  componentDidMount() {
    /* eslint-disable no-undef */
    // iCheck for checkbox and radio inputs
    $(
      'input[type="checkbox"].inputChooseAllUsers',
      'input[type="checkbox"].inputChooseUser',
    ).iCheck({
      checkboxClass: 'icheckbox_minimal-blue',
      radioClass: 'iradio_minimal-blue',
    });
    /* eslint-enable no-undef */
  }

  componentDidUpdate() {
    /* eslint-disable no-undef */
    // iCheck for checkbox and radio inputs
    $('input[type="checkbox"].inputChooseUser').iCheck({
      checkboxClass: 'icheckbox_minimal-blue',
      radioClass: 'iradio_minimal-blue',
    });
    /* eslint-enable no-undef */
  }

  renderList() {
    const { containerWidth, users } = this.props;

    if (users) {
      return (
        <Table
          rowsCount={users.list.length}
          rowHeight={50}
          headerHeight={50}
          width={containerWidth}
          height={500}
        >
          <Column
            header={<Cell><input type="checkbox" className="inputChooseAllUsers" /></Cell>}
            cell={props => (
              <Cell {...props}>
                <input
                  type="checkbox"
                  className="inputChooseUser"
                  value={users.list[props.rowIndex].id}
                />
              </Cell>
            )}
            width={(1 / 12) * containerWidth}
          />
          <Column
            header={<Cell>Email</Cell>}
            cell={props => (
              <Cell {...props}>
                <Link
                  to={`/resource/user/${users.list[props.rowIndex].id}`}
                >{users.list[props.rowIndex].email}</Link>
              </Cell>
            )}
            width={(5 / 12) * containerWidth}
          />
          <Column
            header={<Cell>Email confirmed</Cell>}
            cell={props => (
              <Cell {...props}>
                {users.list[props.rowIndex].emailConfirmed ? 'yes' : 'no'}
              </Cell>
            )}
            width={(3 / 12) * containerWidth}
          />
          <Column
            header={<Cell>Status</Cell>}
            cell={props => (
              <Cell {...props}>
                {users.list[props.rowIndex].status}
              </Cell>
            )}
            width={(3 / 12) * containerWidth}
          />
        </Table>
      );
    }

    return false;
  }

  render() {
    return (
      <div className="box box-info">
        <div className="box-header with-border">
          <h3 className="box-title">List of users</h3>

          <div className="box-tools">
            <div className="input-group input-group-sm" style={{ width: 150 }}>
              <input
                type="text" name="inputSearchUsers"
                className="form-control pull-right"
                placeholder="Search..."
              />
              <div className="input-group-btn">
                <button
                  type="submit" className="btn btn-default"
                ><i className="fa fa-search" /></button>
              </div>
            </div>
          </div>
        </div>
        {/* /.box-header */}
        <div className="box-body table-responsive no-padding">
          {this.renderList()}
        </div>
        {/* /.box-body */}
        <div className="box-footer clearfix">
          <ul className="pagination pagination-sm no-margin pull-right">
            <li><a>&laquo;</a></li>
            <li><a>1</a></li>
            <li><a>2</a></li>
            <li><a>3</a></li>
            <li><a>&raquo;</a></li>
          </ul>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(dimensions()(UserList));
