/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component } from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Link from '../../components/Link';
import s from './Home.css';

const messages = defineMessages({
  titleNewAdvertisers: {
    id: 'home.title.newAdvertisers',
    defaultMessage: 'New Advertisers',
    message: 'New Advertisers',
    description: '',
  },
  titleNewCampaigns: {
    id: 'home.title.newCampaigns',
    defaultMessage: 'New Campaigns',
    message: 'New Campaigns',
    description: '',
  },
  titleNewSites: {
    id: 'home.title.newSites',
    defaultMessage: 'New Sites',
    message: 'New Sites',
    description: '',
  },
  titleNewBanners: {
    id: 'home.title.newBanners',
    defaultMessage: 'New Banners',
    message: 'New Banners',
    description: '',
  },
  textMoreInfo: {
    id: 'home.text.moreInfo',
    defaultMessage: 'More info',
    message: 'More info',
    description: '',
  },
});

class Home extends Component {

  render() {
    return (
      <div className="row">
        <div className="col-lg-3 col-xs-6">
          {/* small box */}
          <div className="small-box bg-aqua">
            <div className="inner">
              <h3>150</h3>
              <p><FormattedMessage {...messages.titleNewAdvertisers} /></p>
            </div>
            <div className="icon">
              <i className="ion ion-briefcase" />
            </div>
            <Link to="#" className="small-box-footer">
              <FormattedMessage
                {...messages.textMoreInfo}
              /> <i className="fa fa-arrow-circle-right" />
            </Link>
          </div>
        </div>
        {/* ./col */}

        <div className="col-lg-3 col-xs-6">
          {/* small box */}
          <div className="small-box bg-green">
            <div className="inner">
              <h3>53<sup style={{ fontSize: 20 }}>%</sup>
              </h3>
              <p><FormattedMessage {...messages.titleNewCampaigns} /></p>
            </div>
            <div className="icon">
              <i className="ion ion-speakerphone" />
            </div>
            <Link to="#" className="small-box-footer">
              <FormattedMessage
                {...messages.textMoreInfo}
              /> <i className="fa fa-arrow-circle-right" />
            </Link>
          </div>
        </div>
        {/* ./col */}

        <div className="col-lg-3 col-xs-6">
          {/* small box */}
          <div className="small-box bg-yellow">
            <div className="inner">
              <h3>44</h3>
              <p><FormattedMessage {...messages.titleNewSites} /></p>
            </div>
            <div className="icon">
              <i className="ion ion-android-globe" />
            </div>
            <Link to="#" className="small-box-footer">
              <FormattedMessage
                {...messages.textMoreInfo}
              /> <i className="fa fa-arrow-circle-right" />
            </Link>
          </div>
        </div>
        {/* ./col */}

        <div className="col-lg-3 col-xs-6">
          {/* small box */}
          <div className="small-box bg-red">
            <div className="inner">
              <h3>65</h3>
              <p><FormattedMessage {...messages.titleNewBanners} /></p>
            </div>
            <div className="icon">
              <i className="ion ion-ribbon-b" />
            </div>
            <Link to="#" className="small-box-footer">
              <FormattedMessage
                {...messages.textMoreInfo}
              /> <i className="fa fa-arrow-circle-right" />
            </Link>
          </div>
        </div>
        {/* ./col */}
      </div>
    );
  }

}

export default withStyles(s)(Home);
