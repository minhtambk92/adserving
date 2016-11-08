import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Link from '../../../components/Link';
import { InputICheck } from '../../../components/UI/';

class ListZoneOfSite extends Component {

  static propTypes = {
    containerWidth: PropTypes.number,
    list: PropTypes.array,
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
  dataTableOptions() { // eslint-disable-line no-unused-vars, class-methods-use-this
    const columns = [{
      data: 'id',
      orderable: false,
      createdCell: (cell, cellData) => {
        ReactDOM.render(
          <InputICheck
            className="inputChooseSite"
            name="inputChooseSite[]"
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
        ReactDOM.render(<Link to={`/resource/zone/${rowData.id}`}>Add Placement</Link>, cell);
        /* eslint-enable jsx-a11y/no-static-element-interactions */
      },
    }];
    return columns;
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
            <th><InputICheck className="inputChooseAllSites" /></th>
            <th>Name</th>
            <th>Size(px)</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tfoot>
          <tr>
            <th><InputICheck className="inputChooseAllSites" /></th>
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

export default ListZoneOfSite;
