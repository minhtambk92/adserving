import React, { Component, PropTypes } from 'react';
import Link from '../../../components/Link';

class UpdateResourceForm extends Component {

  static propTypes = {
    updateResource: PropTypes.func.isRequired,
    resourceId: PropTypes.string.isRequired,
    resources: PropTypes.object,
    getResource: PropTypes.func,
    deleteResource: PropTypes.func,
    resource: PropTypes.object,
  };

  componentWillReceiveProps(nextProps) {
    const {
      uniqueName,
      modelName,
      name,
      hasMeta,
      description,
      status,
    } = nextProps.resource;

    this.inputResourceUniqueName.value = uniqueName;
    this.inputResourceModelName.value = modelName;
    this.inputResourceName.value = name;
    this.inputResourceHasMeta.value = hasMeta;
    this.inputResourceDescription.value = description;
    this.inputResourceStatus.value = status;
  }

  clearInput() {
    this.inputResourceUniqueName.value = null;
    this.inputResourceName.value = null;
  }

  updateResource() {
    const uniqueName = this.inputResourceUniqueName.value;
    const modelName = this.inputResourceModelName.value;
    const name = this.inputResourceName.value;
    const hasMeta = this.inputResourceHasMeta.value;
    const description = this.inputResourceDescription.value;
    const status = this.inputResourceStatus.value;

    const resource = { id: this.props.resourceId };

    if (modelName && modelName !== this.props.resource.modelName) {
      resource.modelName = modelName;
    }

    if (uniqueName && uniqueName !== this.props.resource.uniqueName) {
      resource.uniqueName = uniqueName;
    }

    if (name && name !== this.props.resource.name) {
      resource.name = name;
    }

    if (hasMeta && hasMeta !== this.props.resource.hasMeta) {
      resource.hasMeta = hasMeta;
    }

    if (description && description !== this.props.resource.description) {
      resource.description = description;
    }

    if (status && status !== this.props.resource.status) {
      resource.status = status;
    }

    this.props.updateResource(resource);
  }

  deleteResource() {
    this.props.deleteResource(this.props.resourceId);
  }

  render() {
    return (
      <div className="box">
        <div className="box-body">
          <form className="form-horizontal">
            {/* uniqueName */}
            <div className="form-group">
              <label
                htmlFor="inputResourceUniqueName" className="col-sm-2 control-label"
              >Unique name</label>
              <div className="col-sm-10">
                <input
                  type="text" className="form-control" id="inputResourceUniqueName"
                  placeholder="admin"
                  ref={(c) => {
                    this.inputResourceUniqueName = c;
                  }}
                />
              </div>
            </div>
            {/* modelName */}
            <div className="form-group">
              <label
                htmlFor="inputResourceModelName" className="col-sm-2 control-label"
              >Model name</label>
              <div className="col-sm-10">
                <input
                  type="text" className="form-control" id="inputResourceModelName"
                  placeholder="admin"
                  ref={(c) => {
                    this.inputResourceModelName = c;
                  }}
                />
              </div>
            </div>
            {/* name */}
            <div className="form-group">
              <label
                htmlFor="inputResourceName" className="col-sm-2 control-label"
              >Name</label>
              <div className="col-sm-10">
                <input
                  type="text" className="form-control" id="inputResourceName"
                  placeholder="Administrator"
                  ref={(c) => {
                    this.inputResourceName = c;
                  }}
                />
              </div>
            </div>
            {/* hasMeta */}
            <div className="form-group">
              <label
                htmlFor="inputResourceHasMeta"
                className="col-sm-2 control-label"
              >Has meta value</label>
              <div className="col-sm-10">
                <select
                  id="inputResourceHasMeta"
                  className="form-control"
                  ref={(c) => {
                    this.inputResourceHasMeta = c;
                  }}
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
            </div>
            {/* description */}
            <div className="form-group">
              <label
                htmlFor="inputResourceDescription" className="col-sm-2 control-label"
              >Description</label>
              <div className="col-sm-10">
                <textarea
                  className="form-control" id="inputResourceDescription"
                  placeholder="Resource description..."
                  ref={(c) => {
                    this.inputResourceDescription = c;
                  }}
                />
              </div>
            </div>
            {/* status */}
            <div className="form-group">
              <label
                htmlFor="inputResourceStatus"
                className="col-sm-2 control-label"
              >Status</label>
              <div className="col-sm-10">
                <select
                  id="inputResourceStatus"
                  className="form-control"
                  ref={(c) => {
                    this.inputResourceStatus = c;
                  }}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </form>
        </div>
        {/* /.box-body */}
        <div className="box-footer">
          <Link
            to="/resource/type"
            className="btn btn-app pull-right"
          ><i className="fa fa-undo" /> Cancel</Link>
          <Link
            to="/resource/type"
            className="btn btn-app pull-right"
            onClick={event => this.deleteResource(event)}
          ><i className="fa fa-trash-o" /> Delete</Link>
          <Link
            to="#"
            className="btn btn-app pull-right"
            onClick={event => this.updateResource(event)}
          ><i className="fa fa-floppy-o" /> Save</Link>
        </div>
        {/* /.box-footer */}
      </div>

    );
  }
}

export default UpdateResourceForm;
