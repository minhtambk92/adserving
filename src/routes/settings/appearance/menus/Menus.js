/**
 * Created by Manhhailua on 11/11/16.
 */

import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Layout from '../../../components/Layout';
import s from './Menus.css';

const pageTitle = 'Menus Management';
const pageSubTitle = 'Control panel';

class Menus extends Component {

  componentDidMount() {
    //
  }

  render() {
    return (
      <Layout pageTitle={pageTitle} pageSubTitle={pageSubTitle}>
        <div>

          <p>Menus manager</p>

        </div>
      </Layout>
    );
  }
}

export default withStyles(s)(Menus);
