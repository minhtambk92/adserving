import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Link from '../../../components/Link';
import { iCheck } from '../../../components/UI/';
class ListZoneNotBelongPlacement extends Component {
  static propTypes = {
    placementId: PropTypes.string.isRequired,
    containerWidth: PropTypes.number,
    list: PropTypes.array,
    pushZoneToPlacement: PropTypes.func,
    getPlacement: PropTypes.func,
    createPlacementBannerZone: PropTypes.func,
    getZones: PropTypes.func,
  };
  componentDidMount() {
    /* eslint-disable no-undef */
    $(this.dataTable).dataTable({
      data: this.props.list,
      columns: this.dataTableOptions(),
      destroy: true,
      order: [[1, 'DESC']],
    });
    /* eslint-enable no-undef */

    // Wrapping DOM Libs
    ReactDOM.render(this.renderDOMLibs(), this.portal);
  }
  componentWillReceiveProps(nextProps) {
    /* eslint-disable no-undef */
    $(this.dataTable).dataTable({
      data: nextProps.list,
      columns: this.dataTableOptions(),
      destroy: true,
      order: [[1, 'DESC']],
    });
    /* eslint-enable no-undef */
  }

  componentDidUpdate() {
  }
  dataTableOptions() {
    const colums = [{
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
        ReactDOM.render(<Link to={`/resource/zone/${rowData.id}`}>{cellData}</Link>, cell);
      },
    }, {
      data: 'sizeText',
    }, {
      data: null,
      createdCell: (cell, cellData, rowData) => {
        /* eslint-disable jsx-a11y/no-static-element-interactions */
        ReactDOM.render(<a
          onClick={() => this.pushZoneToPlacement(rowData.id)}
        >
          Add To Placement
        </a>, cell);
        /* eslint-enable jsx-a11y/no-static-element-interactions */
      },
    }];
    return colums;
  }
  /* eslint-disable max-len */
  pushZoneToPlacement(id) { // eslint-disable-line no-unused-vars, class-methods-use-this
    const placementId = this.props.placementId;
    const bannerId = null;
    const zoneId = id;
    if (placementId && zoneId) {
      this.props.createPlacementBannerZone({ placementId, bannerId, zoneId }).then(() => {
        this.props.getPlacement(this.props.placementId).then(() => {
          this.props.getZones();
        });
      });
    }
  }
  /* eslint-enable max-len */
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
            <th>Size</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tfoot>
          <tr>
            <th><iCheck className="inputChooseAllZones" /></th>
            <th>Name</th>
            <th>Size</th>
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

export default ListZoneNotBelongPlacement;
