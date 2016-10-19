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
import { getBanners, createBanner } from '../../actions/banners';
import { getAdvertisers } from '../../actions/advertisers';
import Layout from '../../components/Layout';
import Link from '../../components/Link';
import s from './Banners.css';

const pageTitle = 'Home';
const pageSubTitle = 'Control panel';

class Banners extends Component {
  static propTypes = {
    banners: PropTypes.object,
    getBanners: PropTypes.func,
    createBanner: PropTypes.func,
    getAdvertisers: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      searchText: '',
    };
  }

  componentWillMount() {
    this.props.getBanners();
    this.props.getAdvertisers();
  }

  componentDidMount() {
    /* eslint-disable no-undef */
    // $('.select2').select2();
    // $('#example1').DataTable(); // eslint-disable-line new-cap

    // iCheck for checkbox and radio inputs
    $('input[type="checkbox"].inputChooseBanner').iCheck({
      checkboxClass: 'icheckbox_minimal-blue',
      radioClass: 'iradio_minimal-blue',
    });
    /* eslint-enable no-undef */
  }

  clearInput(event) { // eslint-disable-line no-unused-vars, class-methods-use-this
    document.getElementById('inputBannerName').value = null;
    document.getElementById('inputBannerHTML').value = null;
    document.getElementById('inputBannerWidth').value = null;
    document.getElementById('inputBannerHeight').value = null;
    document.getElementById('inputBannerKeyWord').value = null;
    document.getElementById('inputBannerWeight').value = null;
    document.getElementById('inputBannerDescription').value = null;
  }

  searchFor(event) {
    event.persist();
    this.setState((previousState) => ({
      ...previousState,
      searchText: event.target.value.trim(),
    }));
  }

  createBanner(event) {
    const userId = 'da31ecf7-83ce-4c64-932a-ec165d42e65d';
    const name = document.getElementById('inputBannerName').value;
    const advertiserId = document.getElementById('inputAdvertiser').value;
    const html = document.getElementById('inputBannerHTML').value;
    const width = document.getElementById('inputBannerWidth').value;
    const height = document.getElementById('inputBannerHeight').value;
    const keyword = document.getElementById('inputBannerKeyWord').value;
    const weight = document.getElementById('inputBannerWeight').value;
    const description = document.getElementById('inputBannerDescription').value;
    if (userId && name && html && height && weight && keyword && width && description && advertiserId) {
      this.props.createBanner({
        userId,
        name,
        html,
        width,
        height,
        keyword,
        weight,
        description,
        advertiserId,
      }).then(() => {
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
              {/* BOX: FORM OF CREATE NEW WEB BANNER */}
              <div className="box box-primary collapsed-box">
                <div className="box-header with-border">
                  <h3 className="box-title">Create a new Banner</h3>
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
                        htmlFor="inputBannerName"
                        className="col-sm-2 control-label"
                      >Name</label>
                      <div className="col-sm-10">
                        <input
                          type="text" className="form-control" id="inputBannerName"
                          placeholder="Dan Tri"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="inputAdvertiser"
                             className="col-sm-2 control-label">Advertiser</label>
                      <div className="col-sm-10">
                        <select id="inputAdvertiser" className="form-control">
                          {this.props.advertisers.latest && this.props.advertisers.latest.map(advertiser => (
                            <option key={advertiser.id} value={advertiser.id}
                            >{advertiser.name} </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="form-group">
                      <label
                        htmlFor="inputBannerHTML"
                        className="col-sm-2 control-label"
                      >HTML</label>
                      <div className="col-sm-10">
                        <textarea
                          className="form-control" id="inputBannerHTML"
                          rows="5" placeholder="More info..."
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="inputBannerSlot"
                        className="col-sm-2 control-label"
                      >Width(px)</label>
                      <div className="col-sm-10">
                        <input
                          type="number" className="form-control" id="inputBannerWidth"
                          placeholder="300"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="inputBannerSlot"
                        className="col-sm-2 control-label"
                      >Height(px)</label>
                      <div className="col-sm-10">
                        <input
                          type="number" className="form-control" id="inputBannerHeight"
                          placeholder="300"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="inputBannerSlot"
                        className="col-sm-2 control-label"
                      >KeyWord</label>
                      <div className="col-sm-10">
                        <input
                          type="text" className="form-control" id="inputBannerKeyWord"
                          placeholder="dantri"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="inputBannerWeight"
                        className="col-sm-2 control-label"
                      >Weight</label>
                      <div className="col-sm-10">
                        <input type="number"
                               className="form-control" id="inputBannerWeight" placeholder="1"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="inputBannerDescription"
                        className="col-sm-2 control-label"
                      >Description</label>
                      <div className="col-sm-10">
                        <textarea
                          className="form-control" id="inputBannerDescription"
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
                      onClick={event => this.createBanner(event)}
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
              {/* BOX: LIST OF BannerS */}
              <div className="box box-info">
                <div className="box-header with-border">
                  <h3 className="box-title">List Banner</h3>

                  <div className="box-tools">
                    <div className="input-group input-group-sm" style={{ width: 150 }}>
                      <input
                        type="text" name="inputSearchBanners"
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
                        <th><input type="checkbox" className="inputChooseBanner" /></th>
                        <th>Name</th>
                        <th>Size</th>
                        <th>KeyWord</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      { this.props.banners.latest && this.props.banners.latest.map(banner => {
                        if (this.isIndexOf(banner.name, banner.height, banner.width, banner.keyword, banner.weight, banner.html, banner.description)) {
                          return (
                            <tr key={banner.id}>
                              <th><input type="checkbox" className="inputChooseBanner" /></th>
                              <td><Link to={`/banner/${banner.id}`}>{banner.name}</Link>
                              </td>
                              <td>{banner.width}px - {banner.height}px</td>
                              <td>{banner.keyword}</td>
                              <td>{banner.description}</td>
                            </tr>
                          );
                        }
                        return false;
                      })}
                    </tbody>
                    <tfoot>
                      <tr>
                        <th><input type="checkbox" className="inputChooseBanner" /></th>
                        <th>Name</th>
                        <th>Size</th>
                        <th>KeyWord</th>
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
  banners: state.banners,
  advertisers: state.advertisers,
});

const mapDispatch = {
  getBanners,
  createBanner,
  getAdvertisers,
};

export default withStyles(s)(connect(mapState, mapDispatch)(Banners));

