import React, { Component, PropTypes } from 'react';

class CreateSiteForm extends Component {

  static propTypes = {
    filters: PropTypes.object,
    createSite: PropTypes.func,
    checkSitesByDomain: PropTypes.func,
    sites: PropTypes.object,
  };

  clearInput() {
    this.inputSiteDomain.value = null;
    this.inputSiteName.value = null;
    this.inputSiteEmail.value = null;
    this.inputSiteDescription.value = null;
  }

  createSite() { // eslint-disable-line no-unused-vars
    const domain = this.inputSiteDomain.value;
    const name = this.inputSiteName.value;
    const email = this.inputSiteEmail.value;
    const description = this.inputSiteDescription.value;
    const status = this.inputSiteStatus.value;

    if (domain && name && email && description && status) {
      this.props.createSite({ domain, name, email, description, status });
      this.clearInput();
    }
  }
  validateDomain(event) { // eslint-disable-line no-unused-vars, class-methods-use-this
    const domain = this.inputSiteDomain.value;
    /* eslint-disable max-len */
    const urlRegex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
    /* eslint-enable max-len */
    if (urlRegex.test(domain) === true) {
      this.props.checkSitesByDomain(domain).then(() => {
        if (this.props.sites.check && this.props.sites.check.length > 0) {
          this.inputSiteDomain.parentNode.setAttribute('class', 'col-sm-10 has-error');
          this.inputSiteDomainError.innerHTML = ('Domain has been used');
          this.inputSiteDomain.value = '';
          setTimeout(() => {
            this.inputSiteDomain.parentNode.setAttribute('class', 'col-sm-10');
            this.inputSiteDomainError.innerHTML = ('');
          }, 2000);
        } else if (this.props.sites.check && this.props.sites.check.length === 0) {
          this.inputSiteDomain.parentNode.setAttribute('class', 'col-sm-10 has-success');
          setTimeout(() => {
            this.inputSiteDomain.parentNode.setAttribute('class', 'col-sm-10');
            this.inputSiteDomainError.innerHTML = ('');
          }, 2000);
        }
      });
    } else {
      this.inputSiteDomain.parentNode.setAttribute('class', 'col-sm-10 has-error');
      this.inputSiteDomainError.innerHTML = ('Domain fail');
      this.inputSiteDomain.value = '';
      setTimeout(() => {
        this.inputSiteDomain.parentNode.setAttribute('class', 'col-sm-10');
        this.inputSiteDomainError.innerHTML = ('');
      }, 2000);
    }
  }

  render() {
    return (
      <form className="form-horizontal">
        <div className="box-body">
          <div className="form-group">
            <label
              htmlFor="inputSiteDomain" className="col-sm-2 control-label"
            >Website domain</label>
            <div className="col-sm-10">
              <input
                type="text" className="form-control" id="inputSiteDomain"
                placeholder="http://dantri.com.vn"
                onBlur={event => this.validateDomain(event)}
                ref={c => {
                  this.inputSiteDomain = c;
                }}
              />
              <span // eslint-disable-line react/self-closing-comp
                id="inputSiteDomainErr"
                className="help-block"
                ref={c => {
                  this.inputSiteDomainError = c;
                }}
              >
                        </span>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="inputSiteName" className="col-sm-2 control-label">Name</label>
            <div className="col-sm-10">
              <input
                type="text" className="form-control" id="inputSiteName"
                placeholder="Dan Tri"
                ref={c => {
                  this.inputSiteName = c;
                }}
              />
            </div>
          </div>
          <div className="form-group">
            <label
              htmlFor="inputSiteEmail"
              className="col-sm-2 control-label"
            >Email</label>
            <div className="col-sm-10">
              <input
                type="text" className="form-control" id="inputSiteEmail"
                placeholder="contact@dantri.com.vn"
                ref={c => {
                  this.inputSiteEmail = c;
                }}
              />
            </div>
          </div>
          <div className="form-group">
            <label
              htmlFor="inputSiteDescription"
              className="col-sm-2 control-label"
            >Description</label>
            <div className="col-sm-10">
              <textarea
                className="form-control" id="inputSiteDescription"
                rows="5" placeholder="More info..."
                ref={c => {
                  this.inputSiteDescription = c;
                }}
              />
            </div>
          </div>
          <div className="form-group">
            <label
              htmlFor="inputSiteStatus"
              className="col-sm-2 control-label"
            >Status</label>
            <div className="col-sm-10">
              <select
                id="inputSiteStatus" className="form-control"
                ref={c => {
                  this.inputSiteStatus = c;
                }}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>
        {/* /.box-body */}
        <div className="box-footer">
          {/* eslint-disable jsx-a11y/no-static-element-interactions */}
          <a
            className="btn btn-app pull-right"
            onClick={event => this.clearInput(event)}
          ><i className="fa fa-eraser" /> Clear</a>
          <a
            className="btn btn-app pull-right"
            onClick={event => this.createSite(event)}
          ><i className="fa fa-check" /> Confirm</a>
          {/* eslint-enable jsx-a11y/no-static-element-interactions */}
        </div>
        {/* /.box-footer */}
      </form>
    );
  }
}

export default CreateSiteForm;
