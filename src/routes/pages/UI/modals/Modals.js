import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Layout from '../../../../components/Layout';
import Link from '../../../../components/Link';
import s from './Modals.css';

const pageTitle = 'Modals';
const pageSubTitle = 'new';

class Modals extends Component {

  render() {
    return (
      <Layout pageTitle={pageTitle} pageSubTitle={pageSubTitle}>
        <div>
          <div className="callout callout-info">
            <h4>Reminder!</h4>
            Instructions for how to use modals are available on the
            <Link to="http://getbootstrap.com/javascript/#modals">
              Bootstrap documentation
            </Link>
          </div>
          <div className="example-modal">
            <div className="modal">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">×</span>
                    </button>
                    <h4 className="modal-title">
                      Default Modal
                    </h4>
                  </div>
                  <div className="modal-body">
                    <p>
                      One fine body…
                    </p>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-default pull-left"
                            data-dismiss="modal">Close
                    </button>
                    <button type="button" className="btn btn-primary">
                      Save changes
                    </button>
                  </div>
                </div>
                { /* /.modal-content */ }
              </div>
              { /* /.modal-dialog */ }
            </div>
            { /* /.modal */ }
          </div>
          { /* /.example-modal */ }
          <div className="example-modal">
            <div className="modal modal-primary">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">×</span>
                    </button>
                    <h4 className="modal-title">
                      Primary Modal
                    </h4>
                  </div>
                  <div className="modal-body">
                    <p>
                      One fine body…
                    </p>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-outline pull-left"
                            data-dismiss="modal">Close
                    </button>
                    <button type="button" className="btn btn-outline">
                      Save changes
                    </button>
                  </div>
                </div>
                { /* /.modal-content */ }
              </div>
              { /* /.modal-dialog */ }
            </div>
            { /* /.modal */ }
          </div>
          { /* /.example-modal */ }
          <div className="example-modal">
            <div className="modal modal-info">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">×</span>
                    </button>
                    <h4 className="modal-title">
                      Info Modal
                    </h4>
                  </div>
                  <div className="modal-body">
                    <p>
                      One fine body…
                    </p>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-outline pull-left"
                            data-dismiss="modal">Close
                    </button>
                    <button type="button" className="btn btn-outline">
                      Save changes
                    </button>
                  </div>
                </div>
                { /* /.modal-content */ }
              </div>
              { /* /.modal-dialog */ }
            </div>
            { /* /.modal */ }
          </div>
          { /* /.example-modal */ }
          <div className="example-modal">
            <div className="modal modal-warning">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">×</span>
                    </button>
                    <h4 className="modal-title">
                      Warning Modal
                    </h4>
                  </div>
                  <div className="modal-body">
                    <p>
                      One fine body…
                    </p>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-outline pull-left"
                            data-dismiss="modal">Close
                    </button>
                    <button type="button" className="btn btn-outline">
                      Save changes
                    </button>
                  </div>
                </div>
                { /* /.modal-content */ }
              </div>
              { /* /.modal-dialog */ }
            </div>
            { /* /.modal */ }
          </div>
          { /* /.example-modal */ }
          <div className="example-modal">
            <div className="modal modal-success">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">×</span>
                    </button>
                    <h4 className="modal-title">
                      Success Modal
                    </h4>
                  </div>
                  <div className="modal-body">
                    <p>
                      One fine body…
                    </p>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-outline pull-left"
                            data-dismiss="modal">Close
                    </button>
                    <button type="button" className="btn btn-outline">
                      Save changes
                    </button>
                  </div>
                </div>
                { /* /.modal-content */ }
              </div>
              { /* /.modal-dialog */ }
            </div>
            { /* /.modal */ }
          </div>
          { /* /.example-modal */ }
          <div className="example-modal">
            <div className="modal modal-danger">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">×</span>
                    </button>
                    <h4 className="modal-title">
                      Danger Modal
                    </h4>
                  </div>
                  <div className="modal-body">
                    <p>
                      One fine body…
                    </p>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-outline pull-left"
                            data-dismiss="modal">Close
                    </button>
                    <button type="button" className="btn btn-outline">
                      Save changes
                    </button>
                  </div>
                </div>
                { /* /.modal-content */ }
              </div>
              { /* /.modal-dialog */ }
            </div>
            { /* /.modal */ }
          </div>
          { /* /.example-modal */ }
        </div>
      </Layout>
    );
  }

}

export default withStyles(s)(Modals);
