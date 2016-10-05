import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Layout from '../../../../components/Layout';
import s from './TopNav.css';

class TopNav extends Component {

  static propTypes = {
    // Wrap all props to one parent props
    content: PropTypes.shape({
      // Document title
      title: PropTypes.string.isRequired,
      // Page title
      pageTitle: PropTypes.string.isRequired,
      // Page subtitle
      pageSubTitle: PropTypes.string,
    }).isRequired,
  };

  render() {
    return (
      <Layout childrenProps={this.props} isTopNav>
        <div>
          <div className="callout callout-info">
            <h4>Tip!</h4>
            <p>Add the layout-top-nav class to the body tag to get this layout. This feature can
              also be used with a sidebar! So use this class if you want to remove the custom
              dropdown menus from the navbar and use regular links instead.</p>
          </div>
          <div className="callout callout-danger">
            <h4>Warning!</h4>
            <p>The construction of this layout differs from the normal one. In other words, the HTML
              markup of the navbar and the content will slightly differ than that of the normal
              layout.</p>
          </div>
          <div className="box box-default">
            <div className="box-header with-border">
              <h3 className="box-title">Blank Box</h3>
            </div>
            <div className="box-body">
              The great content goes here
            </div>
            {/* /.box-body */}
          </div>
          {/* /.box */}
        </div>
      </Layout>
    );
  }

}

export default withStyles(s)(TopNav);
