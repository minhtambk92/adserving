import React, { Component, PropTypes } from 'react';

class ListShareForm extends Component {

  static propTypes = {
    index: PropTypes.number,
    id: PropTypes.string,
    childZone: PropTypes.object,
  };

  render() {
    return (
      <div
        className={`list-zone-shared list-zone-share-${this.props.index}`}
        id={this.props.id}
      >
        <div className="box-header with-border">
          <h3
            className="box-title"
          >
            {this.props.childZone ? (`Edit: ${this.props.childZone.name}`) : ('Add New')}</h3>
          <div className="box-tools pull-right">
            <button
              className="btn btn-box-tool remove-share-zone"
              data-widget="remove"
            >
              <i className="fa fa-times" />
            </button>
          </div>
        </div>
        <div className={`form-horizontal ListShare-${this.props.index}`}>
          <div className="form-group">
            <label
              htmlFor={`inputShareName-${this.props.index}`} className="col-sm-2 control-label"
            >Name</label>
            <div className="col-sm-10">
              <input
                type="text" className="form-control" id={`inputShareName-${this.props.index}`}
                defaultValue={this.props.childZone ? this.props.childZone.name : ''}
                placeholder="Name"
              />
            </div>
          </div>

          <div className="form-group">
            <label
              htmlFor={`inputShareHTML-${this.props.index}`} className="col-sm-2 control-label"
            >HTML</label>
            <div className="col-sm-10">
              <textarea
                className="form-control"
                rows="3" placeholder="More info..."
                id={`inputShareHTML-${this.props.index}`}
                defaultValue={this.props.childZone ? this.props.childZone.html : ''}
              />
            </div>
          </div>

          <div className="form-group">
            <label
              htmlFor={`inputShareCSS-${this.props.index}`} className="col-sm-2 control-label"
            >CSS</label>
            <div className="col-sm-10">
              <textarea
                className="form-control" id={`inputShareCSS-${this.props.index}`}
                rows="3" placeholder="More info..."
                defaultValue={this.props.childZone ? this.props.childZone.css : ''}
              />
            </div>
          </div>

          <div className="form-group">
            <label
              htmlFor={`inputShareDescription-${this.props.index}`}
              className="col-sm-2 control-label"
            >Description</label>
            <div className="col-sm-10">
              <textarea
                className="form-control" id={`inputShareDescription-${this.props.index}`}
                rows="3" placeholder="More info..."
                defaultValue={this.props.childZone ? this.props.childZone.description : ''}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ListShareForm;
