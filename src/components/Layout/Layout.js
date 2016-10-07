/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Layout.css';
import Header from '../Header';
import AsideLeft from '../AsideLeft';
import Content from '../Content';
import AsideRight from '../AsideRight';
import Footer from '../Footer';

class Layout extends Component {

  static propTypes = {
    children: PropTypes.element.isRequired,
    pageTitle: PropTypes.string,
    pageSubTitle: PropTypes.string,
    bodyClasses: PropTypes.string,
    isBoxed: PropTypes.bool,
    isCollapsedSidebar: PropTypes.bool,
    isFixed: PropTypes.bool,
    isTopNav: PropTypes.bool,
    isFullWidth: PropTypes.bool,
  };

  componentDidMount() {
    const BODY_CLASSES = 'hold-transition skin-blue sidebar-mini';
    let classes = BODY_CLASSES;
    const {
      isBoxed,
      isCollapsedSidebar,
      isFixed,
      isTopNav,
      bodyClasses,
    } = this.props;

    if (isBoxed) {
      classes += ' layout-boxed';
    } else if (isCollapsedSidebar) {
      classes += ' sidebar-collapse';
    } else if (isFixed) {
      classes += ' fixed';
    } else if (isTopNav) {
      classes += ' layout-top-nav';
    }

    if (typeof bodyClasses === 'string' && bodyClasses !== BODY_CLASSES) {
      document.body.className = bodyClasses;
    } else {
      document.body.className = classes;
    }
  }

  renderInnerPage() {
    return (
      <div className="wrapper">
        <Header />
        <AsideLeft />
        <Content pageTitle={this.props.pageTitle} pageSubTitle={this.props.pageSubTitle}>
          {React.Children.only(this.props.children)}
        </Content>
        <AsideRight />
        <div className="control-sidebar-bg" />
        <Footer />
      </div>
    );
  }

  // Render page without Asides and with TopNav
  renderTopNavPage() {
    return (
      <div className="wrapper">
        <Header useNavigation />
        <Content pageTitle={this.props.pageTitle} pageSubTitle={this.props.pageSubTitle}>
          {React.Children.only(this.props.children)}
        </Content>
        <Footer />
      </div>
    );
  }

  // Render without components
  renderFullWidthPage() {
    return React.Children.only(this.props.children);
  }

  render() {
    const { isTopNav, isFullWidth } = this.props;

    if (this.props.pageTitle && !isFullWidth) {
      if (isTopNav) {
        return this.renderTopNavPage();
      }
      return this.renderInnerPage();
    }

    return this.renderFullWidthPage();
  }
}

export default withStyles(s)(Layout);
