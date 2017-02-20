/**
 * Created by manhhailua on 1/9/17.
 */

/* global io */

import React, { Component } from 'react';
import { host } from '../../../config';
import fetch from '../../../core/fetch';

class BulkActions extends Component {

  constructor() {
    super();

    this.state = {
      isNowExporting: false,
      completePercentage: 0,
      zoneQuantity: 0,
    };
  }

  componentDidMount() {
    const socket = io(`//${host}`);

    socket.on('start-bulk-export-zone-data', (data) => {
      this.setState({ isNowExporting: true });
      this.setState({ zoneQuantity: data.zoneQuantity });
    });

    socket.on('run-bulk-export-zone-data', (data) => {
      this.setState({ completePercentage: (data.index * 100) / this.state.zoneQuantity });
    });

    socket.on('done-bulk-export-zone-data', () => {
      const timeout = setTimeout(() => {
        this.setState({ isNowExporting: false });
        this.setState({ completePercentage: 0 });
        this.setState({ zoneQuantity: 0 });
        clearTimeout(timeout);
      }, 1000);
    });
  }

  regenerateAdsCode(event) {
    event.persist();

    fetch('/bulk-core-js', {
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
            defaultValue="http://corejs.codek.org/build/Template.min.js"
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
        {this.state.isNowExporting && (
          <div className="form-group">
            <div className="progress active">
              <div
                className="progress-bar progress-bar-success progress-bar-striped"
                role="progressbar" aria-valuemin="0" aria-valuemax="100"
                aria-valuenow={this.state.completePercentage}
                style={{ width: `${this.state.completePercentage}%` }}
              >
                {this.state.completePercentage}%
              </div>
            </div>
          </div>
        )}

      </div>
    );
  }
}

export default BulkActions;
