import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Link from '../../../components/Link';
import { iCheck } from '../../../components/UI/';

class ListZoneOfPlacement extends Component {

  static propTypes = {
    placementId: PropTypes.string.isRequired,
    containerWidth: PropTypes.number,
    list: PropTypes.array,
    removeZoneToPlacement: PropTypes.func,
    getPlacement: PropTypes.func,
    removeZoneInPlacementBannerZone: PropTypes.func,
    getZones: PropTypes.func,
  };
  componentDidMount() {
    /* eslint-disable no-undef */
    if (this.props.list) {
      $(this.dataTable).dataTable({
        data: this.props.list,
        columns: this.dataTableOptions(),
        destroy: true,
        order: [[1, 'DESC']],
      });
    }
    /* eslint-enable no-undef */

    // Wrapping DOM Libs
    ReactDOM.render(this.renderDOMLibs(), this.portal);
  }
  componentWillReceiveProps(nextProps) {
    /* eslint-disable no-undef */
    if (nextProps.list.length > 0) {
      $(this.dataTable).dataTable({
        data: nextProps.list,
        columns: this.dataTableOptions(),
        destroy: true,
        order: [[1, 'DESC']],
      });
    } else if (nextProps.list.length === 0) {
      $(this.dataTable).dataTable({
        data: [],
        destroy: true,
      });
    }
    /* eslint-enable no-undef */
  }

  dataTableOptions() {
    const columns = [{
      data: 'id',
      orderable: false,
      createdCell: (cell, cellData) => {
        ReactDOM.render(
          <iCheck
            className="inputChooseZone"
            name="inputChooseZone[]"
            value={cellData}
          />,
          cell
        );
      },
    }, {
      data: 'name',
      createdCell: (cell, cellData, rowData) => {
        ReactDOM.render(<Link to={`/resource/zone/${rowData.id}`}>{rowData.name}</Link>, cell);
      },
    }, {
      data: 'sizeText',
    }, {
      data: null,
      createdCell: (cell, cellData, rowData) => {
        /* eslint-disable jsx-a11y/no-static-element-interactions */
        ReactDOM.render(<a
          onClick={() => this.removeZoneToPlacement(rowData.id)}
        >
          Remove
        </a>, cell);
        /* eslint-enable jsx-a11y/no-static-element-interactions */
      },
    }];
    return columns;
  }
  removeZoneToPlacement(ZoneId) { // eslint-disable-line no-unused-vars, class-methods-use-this
    const placementId = this.props.placementId;
    const zId = ZoneId;
    if (placementId && zId) {
      this.props.removeZoneInPlacementBannerZone({ placementId, zId }).then(() => {
        this.props.getPlacement(this.props.placementId).then(() => {
          this.props.getZones();
        });
      });
    }
  }
  renderDOMLibs() {
    return (
      <table
        className="table table-bordered table-striped"
        ref={c => {
          this.dataTable = c;
        }}
      >
        <thead>
          <tr>
            <th><iCheck className="inputChooseAllZones" /></th>
            <th>Name</th>
            <th>Size(px)</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tfoot>
          <tr>
            <th><iCheck className="inputChooseAllZones" /></th>
            <th>Name</th>
            <th>Size(px)</th>
            <th>&nbsp;</th>
          </tr>
        </tfoot>
      </table>
    );
  }

  render() {
    // Open the portal
    return (
      <div
        ref={c => {
          this.portal = c;
        }}
      />
    );
  }
}

export default ListZoneOfPlacement;
