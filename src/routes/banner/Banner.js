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
import { getBanner, updateBanner, deleteBanner } from '../../actions/banners';
import  { getAdvertisers } from '../../actions/advertisers';
import Layout from '../../components/Layout';
import Link from '../../components/Link';
import s from './Banner.css';
// import { defineMessages, FormattedRelative } from 'react-intl';

const pageTitle = 'Banner';

class Banner extends Component {

  static propTypes = {
    bannerId: PropTypes.string.isRequired,
    banners: PropTypes.object,
    getBanner: PropTypes.func,
    updateBanner: PropTypes.func,
    deleteBanner: PropTypes.func,
    getAdvertisers: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);

    // this.state = {
    //   userId: '',
    //   name: '',
    //   html: '',
    //   width: 0,
    //   height: 0,
    //   keyword: '',
    //   weight: 0,
    //   description: '',
    // };
  }

  componentWillMount() {
    this.props.getBanner(this.props.bannerId);
    this.props.getAdvertisers();
  }

  componentDidMount() {
    /* eslint-disable no-undef */
    // $('.select2').select2();
    // $('#example1').DataTable(); // eslint-disable-line new-cap

    // iCheck for checkbox and radio inputs
    $('input[type="checkbox"].inputChooseCampaign').iCheck({
      checkboxClass: 'icheckbox_minimal-blue',
      radioClass: 'iradio_minimal-blue',
    });
  }
  componentWillReceiveProps(nextProps) {
    const {
      userId='da31ecf7-83ce-4c64-932a-ec165d42e65d',
      name,
      html,
      width,
      height,
      keyword,
      weight,
      description,
      advertiserId,
    } = nextProps.banners && (nextProps.banners.current || {});

    document.getElementById('inputBannerName').value = name;
    document.getElementById('inputAdvertiser').value = advertiserId;
    document.getElementById('inputBannerHTML').value = html;
    document.getElementById('inputBannerWidth').value = width;
    document.getElementById('inputBannerHeight').value = height;
    document.getElementById('inputBannerKeyWord').value = keyword;
    document.getElementById('inputBannerWeight').value = weight;
    document.getElementById('inputBannerDescription').value = description;
  }

  onInputChange(event, field) {
    event.persist();

    this.setState(previousState => ({
      ...previousState,
      [field]: event.target.value,
    }));
  }

  updateBanner() {
    const {
      userId,
      name,
      html,
      width,
      height,
      keyword,
      weight,
      description,
      advertiserId,
    } = this.state;
    const banner = { id: this.props.bannerId };

    if (userId && userId !== this.props.banners.current.userId) {
      banner.userId = userId;
    }
    if (name && name !== this.props.banners.current.name) {
      banner.name = name;
    }
    if (html && html !== this.props.banners.current.html) {
      banner.html = html;
    }

    if (width && width !== this.props.banners.current.width) {
      banner.width = width;
    }

    if (height && height !== this.props.banners.current.height) {
      banner.height = height;
    }

    if (keyword && keyword !== this.props.banners.current.keyword) {
      banner.keyword = keyword;
    }
    if (weight && weight !== this.props.banners.current.weight) {
      banner.weight = weight;
    }
    if (description && description !== this.props.banners.current.description) {
      banner.description = description;
    }
    if (advertiserId && advertiserId !== this.props.banners.current.advertiserId) {
      banner.advertiserId = document.getElementById('inputAdvertiser').value;
    }

    this.props.updateBanner(banner);
  }

  deleteBanner() {
    this.props.deleteBanner(this.props.bannerId);
  }

  render() {
    return (
      <Layout
        pageTitle={
          pageTitle
            .concat(': ')
            .concat(this.props.banners.current ? this.props.banners.current.name : '...')
        }
        pageSubTitle=""
      >
        <div>

          <div className="row">
            <section className="col-lg-12">
              {/* BOX: FORM OF CREATE NEW WEBSITE */}
              <div className="box box-primary">
                <div className="box-header with-border">
                  <h3 className="box-title">Change Banner information</h3>
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
                        htmlFor="inputBannerName"
                        className="col-sm-2 control-label"
                      >Name</label>
                      <div className="col-sm-10">
                        <input
                          type="text" className="form-control" id="inputBannerName"
                          placeholder="Banner Top"
                          onChange={event => this.onInputChange(event,'name')} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="inputAdvertiser"
                             className="col-sm-2 control-label">Advertiser</label>
                      <div className="col-sm-10">
                        <select id="inputAdvertiser" className="form-control"
                                onChange={event => this.onInputChange(event, 'advertiserId')}>
                          {this.props.advertisers.latest && this.props.advertisers.latest.map(advertiser => (
                            <option key={advertiser.id}
                                    value={advertiser.id}>{advertiser.name}</option>
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
                          className="form-control" id="inputBannerHTML" onChange={event => this.onInputChange(event, 'html')}
                          rows="5" placeholder="More info..."
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="inputBannerWidth"
                        className="col-sm-2 control-label"
                      >Width(px)</label>
                      <div className="col-sm-10">
                        <input
                          type="number" className="form-control" id="inputBannerWidth"
                          placeholder="300" onChange={event => this.onInputChange(event, 'width')}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="inputBannerHeight"
                        className="col-sm-2 control-label"
                      >Height(px)</label>
                      <div className="col-sm-10">
                        <input
                          type="number" className="form-control" id="inputBannerHeight"
                          placeholder="300" onChange={event => this.onInputChange(event, 'height')}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="inputBannerKeyWord"
                        className="col-sm-2 control-label"
                      >KeyWord</label>
                      <div className="col-sm-10">
                        <input
                          type="text" className="form-control" id="inputBannerKeyWord"
                          placeholder="dantri"
                          onChange={event => this.onInputChange(event, 'keyword')}
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
                               onChange={event => this.onInputChange(event, 'weight')}
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
                          onChange={event => this.onInputChange(event, 'description')}
                        />
                      </div>
                    </div>
                  </div>
                  {/* /.box-body */}
                  <div className="box-footer">
                    {/* eslint-disable jsx-a11y/no-static-element-interactions */}
                    <Link
                      to="/Banners"
                      className={'btn btn-app pull-right '.concat(s.btn)}
                    ><i className="fa fa-undo" /> Cancel</Link>
                    <Link
                      to="/Banners"
                      className={'btn btn-app pull-right '.concat(s.btn)}
                      onClick={event => this.deleteBanner(event)}
                    ><i className="fa fa-trash-o" /> Delete</Link>
                    <a
                      className={'btn btn-app pull-right '.concat(s.btn)}
                      onClick={event => this.updateBanner(event)}
                    ><i className="fa fa-floppy-o" /> Save</a>
                    {/* eslint-enable jsx-a11y/no-static-element-interactions */}
                  </div>
                  {/* /.box-footer */}
                </form>
              </div>
              {/* /.col */}
            </section>
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
  getBanner,
  updateBanner,
  deleteBanner,
  getAdvertisers,
};

export default withStyles(s)(connect(mapState, mapDispatch)(Banner));
