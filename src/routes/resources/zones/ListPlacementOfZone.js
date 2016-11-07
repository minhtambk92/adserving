import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Link from '../../../components/Link';
import InputICheck from './../../../components/UI/InputICheck';
class ListPlacementOfZone extends Component {

  static propTypes = {
    zoneId: PropTypes.string.isRequired,
    containerWidth: PropTypes.number,
    list: PropTypes.array,
    getPlacements: PropTypes.func,
    removeZoneInPlacementBannerZone: PropTypes.func,
    getZone: PropTypes.func,
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

  componentDidUpdate() {
  }
  dataTableOptions() {
    const columns = [{
      data: 'id',
      orderable: false,
      createdCell: (cell, cellData) => {
        ReactDOM.render(
          <InputICheck
            className="inputChoosePlacement"
            name="inputChoosePlacement[]"
            value={cellData}
          />,
          cell
        );
      },
    }, {
      data: 'name',
      createdCell: (cell, cellData, rowData) => {
        ReactDOM.render(<Link to={`/resource/placement/${rowData.id}`}>{rowData.name}</Link>, cell);
      },
    }, {
      data: null,
      render: (data, type, row) => {
        const size = `${row.sizeWidth}px x ${row.sizeHeight}px`;
        return size;
      },
    }, {
      data: null,
      createdCell: (cell, cellData, rowData) => {
        /* eslint-disable jsx-a11y/no-static-element-interactions */
        ReactDOM.render(<a
          onClick={() => this.removePlacement(rowData.id)}
        >
          Remove
        </a>, cell);
        /* eslint-enable jsx-a11y/no-static-element-interactions */
      },
    }];
    return columns;
  }
  removePlacement(id) { // eslint-disable-line no-unused-vars, class-methods-use-this
    const zId = this.props.zoneId;
    const placementId = id;
    if (placementId && zId) {
      this.props.removeZoneInPlacementBannerZone({ placementId, zId }).then(() => {
        this.props.getZone(this.props.zoneId).then(() => {
          this.props.getPlacements();
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
            <th><InputICheck className="inputChooseAllPlacements" /></th>
            <th>Name</th>
            <th>Size(px)</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tfoot>
          <tr>
            <th><InputICheck className="inputChooseAllPlacements" /></th>
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

export default ListPlacementOfZone;
