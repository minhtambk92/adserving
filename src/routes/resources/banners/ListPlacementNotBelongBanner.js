import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Link from '../../../components/Link';
// import withStyles from 'isomorphic-style-loader/lib/withStyles';
// import InputICheck from './InputICheck';
class ListPlacementNotBelongToZone extends Component {
  static propTypes = {
    bannerId: PropTypes.string.isRequired,
    containerWidth: PropTypes.number,
    list: PropTypes.array,
    pushBannerToPlacement: PropTypes.func,
    getBanner: PropTypes.func,
    createPlacementBannerZone: PropTypes.func,
    getPlacements: PropTypes.func,
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
      data: 'name',
      createdCell: (cell, cellData, rowData) => {
        ReactDOM.render(<Link to={`/resource/banner/${rowData.id}`}>{cellData}</Link>, cell);
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
          onClick={() => this.pushBannerToPlacement(rowData.id)}
        >
          Add To Banner
        </a>, cell);
        /* eslint-enable jsx-a11y/no-static-element-interactions */
      },
    }];
    return colums;
  }
  /* eslint-disable max-len */
  pushBannerToPlacement(id) { // eslint-disable-line no-unused-vars, class-methods-use-this
    const bannerId = this.props.bannerId;
    const zoneId = null;
    const placementId = id;
    if (placementId && bannerId) {
      this.props.createPlacementBannerZone({ placementId, bannerId, zoneId }).then(() => {
        this.props.getBanner(this.props.bannerId).then(() => {
          this.props.getPlacements();
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
            <th>Name</th>
            <th>Size</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tfoot>
          <tr>
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

export default ListPlacementNotBelongToZone;