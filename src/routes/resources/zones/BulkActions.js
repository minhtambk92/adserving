/**
 * Created by manhhailua on 1/9/17.
 */

import React, { Component } from 'react';
import fetch from '../../../core/fetch';

class BulkActions extends Component {

  async regenerateAdsCode(event) {
    event.persist();

    const resp = await fetch('/bulk-core-js', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        templateFileUrl: this.inputCoreJsTemplate.value,
      }),
      credentials: 'include',
    });

    const data = await resp.text();
    console.log(data);
  }

  render() {
    return (
      <div>

        {/* Input core js template file */}
        <div className="form-group">
          <label htmlFor="inputCoreJsTemplate">Template file url</label>
          <input
            type="text" id="inputCoreJsTemplate"
            className="form-control" placeholder="http://..."
            defaultValue="http://corejs.manhhailua.com/build/Template.min.js"
            ref={c => {
              this.inputCoreJsTemplate = c;
            }}
          />
        </div>

        {/* Bulk regenerate all ads code: zones' invocation code */}
        <div className="form-group has-warning">
          <p>Click [Regenerate code] button to regenerate all ads display code from zones data.</p>
          <p className="help-block">Be aware: this action will replace all old ads file by the new
           ones. Be sure you already had back up versions.</p>

          <button
            type="button"
            className="btn btn-primary"
            onClick={event => this.regenerateAdsCode(event)}
          >
            Regenerate code
          </button>
        </div>

        {/* Progress bar of streaming writing all zone display ads code */}
        <div className="form-group">
          <div className="progress active">
            <div
              className="progress-bar progress-bar-success progress-bar-striped"
              role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="20"
              style={{ width: '20%' }}
            >
              <span className="sr-only">20% Complete</span>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default BulkActions;
