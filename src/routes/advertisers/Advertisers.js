/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { getAdvertisers, createAdvertiser } from '../../actions/advertisers';
import Layout from '../../components/Layout';
import Link from '../../components/Link';
import s from './Advertisers.css';

const pageTitle = 'Home';
const pageSubTitle = 'Control panel';

class Advertisers extends Component {
  static propTypes = {
    advertisers: PropTypes.object,
    getAdvertisers: PropTypes.func,
    createAdvertiser: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      searchText: '',
    };
  }

  componentWillMount() {
    this.props.getAdvertisers();
  }

  componentDidMount() {
    /* eslint-disable no-undef */
    // $('.select2').select2();
    // $('#example1').DataTable(); // eslint-disable-line new-cap

    // iCheck for checkbox and radio inputs
    $('input[type="checkbox"].inputChooseadvertiser').iCheck({
      checkboxClass: 'icheckbox_minimal-blue',
      radioClass: 'iradio_minimal-blue',
    });
    /* eslint-enable no-undef */
  }

  clearInput(event) { // eslint-disable-line no-unused-vars, class-methods-use-this
    document.getElementById('inputAdvertiserContact').value = null;
    document.getElementById('inputAdvertiserName').value = null;
    document.getElementById('inputAdvertiserEmail').value = null;
    document.getElementById('inputAdvertiserDescription').value = null;
  }

  searchFor(event) {
    event.persist();
    this.setState((previousState) => ({
      ...previousState,
      searchText: event.target.value.trim(),
    }));
  }

  createAdvertiser(event) { // eslint-disable-line no-unused-vars
    const contact = document.getElementById('inputAdvertiserContact').value;
    const name = document.getElementById('inputAdvertiserName').value;
    const email = document.getElementById('inputAdvertiserEmail').value;
    const description = document.getElementById('inputAdvertiserDescription').value;

    if (contact && name && email && description) {
      this.props.createAdvertiser({ email, name, contact, description }).then(() => {
        this.clearInput();
      });
    }
  }

  isIndexOf(...args) {
    for (let i = 0; i < args.length; i += 1) {
      if (args[i].toLowerCase().indexOf(this.state.searchText.toLowerCase()) !== -1) {
        return true;
      }
    }
    return false;
  }

  render() {
    return (
      <Layout pageTitle={pageTitle} pageSubTitle={pageSubTitle}>
        <div>

          <div className="row">
            <section className="col-lg-12">
              {/* BOX: FORM OF CREATE NEW WEB ADVERTISER */}
              <div className="box box-primary collapsed-box">
                <div className="box-header with-border">
                  <h3 className="box-title">Create a new advertiser</h3>
                  <div className="box-tools pull-right">
                    <button type="button" className="btn btn-box-tool" data-widget="collapse">
                      <i className="fa fa-plus" />
                    </button>
                  </div>
                </div>
                {/* /.box-header */}
                {/* form start */}
                <form className="form-horizontal">
                  <div className="box-body">
                    <div className="form-group">
                      <label
                        htmlFor="inputAdvertiserName" className="col-sm-2 control-label"
                      >Name</label>
                      <div className="col-sm-10">
                        <input
                          type="text" className="form-control" id="inputAdvertiserName"
                          placeholder="Admicro"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="inputAdvertiserContact" className="col-sm-2 control-label">Contact</label>
                      <div className="col-sm-10">
                        <input
                          type="text" className="form-control" id="inputAdvertiserContact"
                          placeholder="0987654321"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="inputAdvertiserEmail"
                        className="col-sm-2 control-label"
                      >Email</label>
                      <div className="col-sm-10">
                        <input
                          type="text" className="form-control" id="inputAdvertiserEmail"
                          placeholder="contact@dantri.com.vn"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label
                        htmlFor="inputAdvertiserDescription"
                        className="col-sm-2 control-label"
                      >Description</label>
                      <div className="col-sm-10">
                        <textarea
                          className="form-control" id="inputAdvertiserDescription"
                          rows="5" placeholder="More info..."
                        />
                      </div>
                    </div>
                  </div>
                  {/* /.box-body */}
                  <div className="box-footer">
                    {/* eslint-disable jsx-a11y/no-static-element-interactions */}
                    <a
                      className={'btn btn-app pull-right '.concat(s.btn)}
                      onClick={event => this.clearInput(event)}
                    ><i className="fa fa-eraser" /> Clear</a>
                    <a
                      className={'btn btn-app pull-right '.concat(s.btn)}
                      onClick={event => this.createAdvertiser(event)}
                    ><i className="fa fa-check" /> Confirm</a>
                    {/* eslint-enable jsx-a11y/no-static-element-interactions */}
                  </div>
                  {/* /.box-footer */}
                </form>
              </div>
              {/* /.col */}
            </section>
          </div>

          <div className="row">
            <section className="col-lg-12">
              {/* BOX: LIST OF ADVERTISERS */}
              <div className="box box-info">
                <div className="box-header with-border">
                  <h3 className="box-title">List Advertiser</h3>

                  <div className="box-tools">
                    <div className="input-group input-group-sm" style={{ width: 150 }}>
                      <input
                        type="text" name="inputSearchAdvertisers"
                        className="form-control pull-right"
                        placeholder="Search..." onChange={event => this.searchFor(event)}
                      />
                      <div className="input-group-btn">
                        <button
                          type="submit" className="btn btn-default"
                        ><i className="fa fa-search" /></button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /.box-header */}
                <div className="box-body table-responsive no-padding">
                  <table id="example1" className="table table-hover">
                    <thead>
                      <tr>
                        <th><input type="checkbox" className="inputChooseAdvertiser" /></th>
                        <th>Name</th>
                        <th>Contact</th>
                        <th>Email</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      { this.props.advertisers.latest && this.props.advertisers.latest.map(advertiser => {
                        if (this.isIndexOf(advertiser.email, advertiser.contact, advertiser.name, advertiser.description)) {
                          return (
                            <tr key={advertiser.id}>
                              <td><input type="checkbox" className="inputChooseAdvertiser" /></td>
                              <td><Link to={`/advertiser/${advertiser.id}`}>{advertiser.name}</Link>
                              </td>
                              <td>{advertiser.contact}</td>
                              <td>{advertiser.email}</td>
                              <td>{advertiser.description}</td>
                            </tr>
                          );
                        }
                        return false;
                      })}
                    </tbody>
                    <tfoot>
                      <tr>
                        <th><input type="checkbox" className="inputChooseAdvertiser" /></th>
                        <th>Name</th>
                        <th>Contact</th>
                        <th>Email</th>
                        <th>Description</th>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                {/* /.box-body */}
                <div className="box-footer clearfix">
                  <ul className="pagination pagination-sm no-margin pull-right">
                    <li><a>&laquo;</a></li>
                    <li><a>1</a></li>
                    <li><a>2</a></li>
                    <li><a>3</a></li>
                    <li><a>&raquo;</a></li>
                  </ul>
                </div>
              </div>
              {/* /.box */}
            </section>
            {/* /.col */}
          </div>

        </div>
      </Layout>
    );
  }

}

const mapState = (state) => ({
  advertisers: state.advertisers,
});

const mapDispatch = {
  getAdvertisers,
  createAdvertiser,
};

export default withStyles(s)(connect(mapState, mapDispatch)(Advertisers));

