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
import 'fine-uploader/fine-uploader/fine-uploader-new.min.css';
import qq from 'fine-uploader/lib/traditional';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { getBanners, createBanner, getBannersFilters, setBannersFilters } from '../../../actions/banners';
import { getPlacements } from '../../../actions/placements';
import Layout from '../../../components/Layout';
import Link from '../../../components/Link';
import s from './Banners.css';

const pageTitle = 'Home';
const pageSubTitle = 'Control panel';
class Banners extends Component {
  static propTypes = {
    getBannersFilters: PropTypes.func,
    setBannersFilters: PropTypes.func,
    banners: PropTypes.object,
    getBanners: PropTypes.func,
    createBanner: PropTypes.func,
    placements: PropTypes.object,
    getPlacements: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      searchText: '',
    };
  }

  componentWillMount() {
    this.props.getBannersFilters();
    this.props.getBanners();
    this.props.getPlacements();
  }

  componentDidMount() {
    /* eslint-disable no-undef */
    // iCheck for checkbox and radio inputs
    $('input[type="checkbox"].inputChooseBanner').iCheck({
      checkboxClass: 'icheckbox_minimal-blue',
      radioClass: 'iradio_minimal-blue',
    });
    /* eslint-enable no-undef */
    const options = {
        element: document.getElementById('fine-uploader'),
        retry: {
          enableAuto: true,
        },
        callbacks: {
          onAllComplete: function (succeeded, failed) {
            console.log(succeeded.length + 'uploads completed!' + failed.length + 'failed');
          },
        },
      },
      uploader = new qq.FineUploader(options);
    uploader.addExtraDropZone(document);
  }
  componentDidUpdate() {
    /* eslint-disable no-undef */
    $('input[type="checkbox"].inputChooseBanner').iCheck({
      checkboxClass: 'icheckbox_minimal-blue',
      radioClass: 'iradio_minimal-blue',
    });
    /* eslint-enable no-undef */
  }
  async onFilterChange(event, field) {
    event.persist();

    await this.props.setBannersFilters({
      [field]: event.target.value,
    });
  }
  isFiltered(banner) {
    const { placementId, status } = this.props.banners.filters;

    const notMatchPlacement = (
      placementId !== undefined &&
      typeof banner.pbzBanner === 'object' &&
      JSON.stringify(banner.pbzBanner).indexOf(placementId) === -1
    );

    const notMatchStatus = (
      status !== undefined && status !== banner.status
    );

    return !(notMatchPlacement || notMatchStatus);
  }
  clearInput(event) { // eslint-disable-line no-unused-vars, class-methods-use-this
    this.inputBannerName.value = null;
    this.inputBannerHTML.value = null;
    this.inputBannerWidth.value = null;
    this.inputBannerHeight.value = null;
    this.inputBannerKeyWord.value = null;
    this.inputBannerWeight.value = null;
    this.inputBannerDescription.value = null;
  }

  createBanner(event) { // eslint-disable-line no-unused-vars, class-methods-use-this
    const name = this.inputBannerName.value;
    const html = this.inputBannerHTML.value;
    const width = this.inputBannerWidth.value;
    const height = this.inputBannerHeight.value;
    const keyword = this.inputBannerKeyWord.value;
    const weight = this.inputBannerWeight.value;
    const description = this.inputBannerDescription.value;
    const type = this.inputBannerType.value;
    const target = this.inputBannerTarget.value;
    const status = this.inputBannerStatus.value;
    if (name && html && height && weight && keyword && width && description && type) {
      this.props.createBanner({
        name,
        html,
        width,
        height,
        keyword,
        weight,
        description,
        type,
        target,
        status,
      }).then(() => {
        this.clearInput();
      });
    }
  }

  render() {
    return (
      <Layout pageTitle={pageTitle} pageSubTitle={pageSubTitle}>
        <div>
          <div className="row">
            <section className="col-lg-12">
              {/* BOX: FILTER */}
              <div className="box box-default">
                <div className="box-header with-border">
                  <h3 className="box-title">Filter by:</h3>
                  <div className="box-tools pull-right">
                    <button type="button" className="btn btn-box-tool" data-widget="collapse">
                      <i className="fa fa-minus" />
                    </button>
                  </div>
                </div>
                {/* /.box-header */}
                {/* form start */}
                <form className="form-horizontal">
                  <div className="box-body">
                    <div className="form-group">
                      <label
                        htmlFor="inputBannersFilterPlacement"
                        className="col-sm-2 control-label"
                      >Placement</label>
                      <div className="col-sm-10">
                        <select
                          id="inputBannersFilterPlacement"
                          className="form-control select2"
                          style={{ width: '100%' }}
                          ref={c => {
                            this.inputBannersFilterPlacement = c;
                          }}
                          onChange={event => this.onFilterChange(event, 'placementId')}
                          defaultValue={this.props.banners.filters &&
                          this.props.banners.filters.placementId}
                        >
                          <option value="null">All placements</option>
                          {this.props.placements.list &&
                          this.props.placements.list.map(placement => (
                            <option
                              key={placement.id} value={placement.id}
                            >{placement.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="inputBannersFilterStatus"
                        className="col-sm-2 control-label"
                      >Status</label>
                      <div className="col-sm-10">
                        <select
                          id="inputBannersFilterStatus" className="form-control"
                          ref={c => {
                            this.inputBannersFilterStatus = c;
                          }}
                          onChange={event => this.onFilterChange(event, 'status')}
                          defaultValue={this.props.banners.filters &&
                          this.props.banners.filters.status}
                        >
                          <option value="null">All states</option>
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  {/* /.box-body */}
                </form>
              </div>
              {/* /.col */}
            </section>
          </div>

          <div className="row">
            <section className="col-lg-12">
              {/* BOX: FORM OF CREATE NEW WEB BANNER */}
              <div className="box box-info collapsed-box">
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
                      <div id="fine-uploader">Upload</div>
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="inputBannerType"
                        className="col-sm-2 control-label"
                      >Type</label>
                      <div className="col-sm-10">
                        <select
                          id="inputBannerType" className="form-control"
                          ref={c => {
                            this.inputBannerType = c;
                          }}
                        >
                          <option value="html">Banner HTML</option>
                          <option value="img">Banner Upload</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="inputBannerName"
                        className="col-sm-2 control-label"
                      >Name</label>
                      <div className="col-sm-10">
                        <input
                          type="text" className="form-control" id="inputBannerName"
                          placeholder="Dan Tri"
                          ref={c => {
                            this.inputBannerName = c;
                          }}
                        />
                      </div>
                    </div>
                    { this.inputBannerType === 'html' ?
                      <div className="form-group">
                        <label
                          htmlFor="inputBannerHTML"
                          className="col-sm-2 control-label"
                        >HTML</label>
                        <div className="col-sm-10">
                          <textarea
                            className="form-control" id="inputBannerHTML"
                            rows="5" placeholder="More info..."
                            ref={c => {
                              this.inputBannerHTML = c;
                            }}
                          />
                        </div>
                      </div> :
                        <div className="form-group">
                          <label
                            htmlFor="inputBannerTarget"
                            className="col-sm-2 control-label"
                          >Target</label>
                          <div className="col-sm-10">
                            <input
                              type="text" className="form-control" id="inputBannerTarget"
                              placeholder="http://kenh14.vn"
                              ref={c => {
                                this.inputBannerTarget = c;
                              }}
                            />
                          </div>
                        </div>
                    }
                    <div className="form-group">
                      <label
                        htmlFor="inputBannerSlot"
                        className="col-sm-2 control-label"
                      >Width(px)</label>
                      <div className="col-sm-10">
                        <input
                          type="number" className="form-control" id="inputBannerWidth"
                          placeholder="300"
                          ref={c => {
                            this.inputBannerWidth = c;
                          }}
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
                          ref={c => {
                            this.inputBannerHeight = c;
                          }}
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
                          ref={c => {
                            this.inputBannerKeyWord = c;
                          }}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="inputBannerWeight"
                        className="col-sm-2 control-label"
                      >Weight</label>
                      <div className="col-sm-10">
                        <input
                          type="number" className="form-control"
                          id="inputBannerWeight" placeholder="1"
                          ref={c => {
                            this.inputBannerWeight = c;
                          }}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="inputBannerStatus"
                        className="col-sm-2 control-label"
                      >Status</label>
                      <div className="col-sm-10">
                        <select
                          id="inputBannerStatus" className="form-control"
                          ref={c => {
                            this.inputBannerStatus = c;
                          }}
                        >
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </select>
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
                          ref={c => {
                            this.inputBannerDescription = c;
                          }}
                        />
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
                        placeholder="Search..."
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
                      { this.props.banners.list && this.props.banners.list.map(banner => {
                        if (!this.isFiltered(banner)) {
                          return false;
                        }
                        return (
                          <tr key={banner.id}>
                            <th><input type="checkbox" className="inputChooseBanner" /></th>
                            <td><Link to={`/resource/banner/${banner.id}`}>{banner.name}</Link>
                            </td>
                            <td>{banner.width}px - {banner.height}px</td>
                            <td>{banner.keyword}</td>
                            <td>{banner.description}</td>
                            <td>
                              <Link to={`/resource/banner/${banner.id}`}>Add Placement</Link>
                            </td>
                          </tr>
                        );
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
  placements: state.placements,
});

const mapDispatch = {
  getBanners,
  createBanner,
  getBannersFilters,
  setBannersFilters,
  getPlacements,
};

export default withStyles(s)(connect(mapState, mapDispatch)(Banners));

