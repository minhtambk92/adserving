/**
 * Created by Manhhailua on 12/15/16.
 */

import React, { Component, PropTypes } from 'react';
import fetch from '../../../core/fetch';

class AdsCode extends Component {

  static propTypes = {
    zone: PropTypes.object.isRequired,
  };

  async generateAdsCode(event) {
    event.persist();

    const resp = await fetch('/core-js', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        templateFileUrl: this.inputCoreJsTemplate.value,
        zoneId: this.props.zone.id,
      }),
      credentials: 'include',
    });

    this.outputAdsCode.value = await resp.text();
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="form-group">
            <label htmlFor="inputCoreJsTemplate">Template file url</label>
            <input
              type="text" id="inputCoreJsTemplate"
              className="form-control" placeholder="http://..."
              defaultValue="http://corejs.codek.org/build/Template.min.js"
              ref={(c) => {
                this.inputCoreJsTemplate = c;
              }}
            />
          </div>

          <div className="form-group">
            <p>Click [Generate code] button to archive the ads display code.</p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={event => this.generateAdsCode(event)}
            >
              Generate code
            </button>
          </div>

          <div className="form-group">
            <label htmlFor="outputAdsCode">Your core here:</label>
            <textarea
              id="outputAdsCode" rows="10"
              className="form-control"
              ref={(c) => {
                this.outputAdsCode = c;
              }}
            />
          </div>
        </div>
      </div>
    );
  }

}

export default AdsCode;
