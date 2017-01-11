import React, { Component, PropTypes } from 'react';
import Link from '../../../components/Link';

class UpdateSiteForm extends Component {

  static propTypes = {
    siteId: PropTypes.string.isRequired,
    updateSite: PropTypes.func,
    site: PropTypes.object,
    deleteSite: PropTypes.func,
    getSite: PropTypes.func,
    checkSitesByDomain: PropTypes.func,
    sites: PropTypes.object,
  };

  componentWillReceiveProps(nextProps) {
    const {
      domain,
      name,
      email,
      description,
      status,
    } = nextProps.site && (nextProps.site || {});
    this.inputSiteDomain.value = domain;
    this.inputSiteName.value = name;
    this.inputSiteEmail.value = email;
    this.inputSiteDescription.value = description;
    this.inputSiteStatus.value = status;
  }

  updateSite() {
    const domain = this.inputSiteDomain.value;
    const name = this.inputSiteName.value;
    const email = this.inputSiteEmail.value;
    const description = this.inputSiteDescription.value;
    const status = this.inputSiteStatus.value;
    const site = { id: this.props.siteId };
    site.domain = domain;
    site.name = name;
    site.email = email;

    if (description && description !== this.props.site.description) {
      site.description = description;
    }
    site.status = status;

    // site.status = document.getElementById('inputSiteStatus').value;
    this.props.updateSite(site).then(() => {
      this.props.getSite(this.props.siteId);
    });
  }

  validateDomain(event) { // eslint-disable-line no-unused-vars, class-methods-use-this
    const domain = this.inputSiteDomain.value.trim();
    /* eslint-disable max-len */
    const urlRegex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
    /* eslint-enable max-len */
    if (this.props.sites.editing.domain !== domain) {
      if (urlRegex.test(domain) === true) {
        this.props.checkSitesByDomain(domain).then(() => {
          if (this.props.sites.check && this.props.sites.check.length > 0) {
            this.inputSiteDomain.parentNode.setAttribute('class', 'col-sm-9 has-error');
            this.inputSiteDomainError.innerHTML = ('Domain has been used');
            this.inputSiteDomain.value = '';
            setTimeout(() => {
              this.inputSiteDomain.parentNode.setAttribute('class', 'col-sm-9');
              this.inputSiteDomainError.innerHTML = ('');
            }, 2000);
          } else if (this.props.sites.check && this.props.sites.check.length === 0) {
            this.inputSiteDomain.value = domain;
            this.inputSiteDomain.parentNode.setAttribute('class', 'col-sm-9 has-success');
            setTimeout(() => {
              this.inputSiteDomain.parentNode.setAttribute('class', 'col-sm-9');
              this.inputSiteDomainError.innerHTML = ('');
            }, 2000);
          }
        });
      } else {
        this.inputSiteDomain.parentNode.setAttribute('class', 'col-sm-9 has-error');
        this.inputSiteDomainError.innerHTML = ('Domain fail');
        this.inputSiteDomain.value = '';
        setTimeout(() => {
          this.inputSiteDomain.parentNode.setAttribute('class', 'col-sm-9');
          this.inputSiteDomainError.innerHTML = ('');
        }, 2000);
      }
    }
  }

  deleteSite() {
    this.props.deleteSite(this.props.siteId);
  }

  render() {
    return (
      <form className="form-horizontal">
        <div className="form-group">
          <label
            htmlFor="inputSiteDomain" className="col-sm-3 control-label"
          >Website domain</label>
          <div className="col-sm-9">
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
          <label
            htmlFor="inputSiteName" className="col-sm-3 control-label"
          >
              Name
            </label>
          <div className="col-sm-9">
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
            className="col-sm-3 control-label"
          >Email</label>
          <div className="col-sm-9">
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
            className="col-sm-3 control-label"
          >Description</label>
          <div className="col-sm-9">
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
            className="col-sm-3 control-label"
          >Status</label>
          <div className="col-sm-9">
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
        {/* /.box-body */}
        <div className="clearfix">
          <Link
            to="/resource/site"
            className="btn btn-app pull-right"
          ><i className="fa fa-undo" /> Cancel</Link>
          <Link
            to="/resource/site"
            className="btn btn-app pull-right"
            onClick={event => this.deleteSite(event)}
          ><i className="fa fa-trash-o" /> Delete</Link>
          <Link
            to="#"
            className="btn btn-app pull-right"
            onClick={event => this.updateSite(event)}
          ><i className="fa fa-floppy-o" /> Save</Link>
        </div>
        {/* /.box-footer */}
      </form>
    );
  }
}

export default UpdateSiteForm;
