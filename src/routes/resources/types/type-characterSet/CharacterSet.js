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
// import { defineMessages, FormattedRelative } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Layout from '../../../../components/Layout';
import {
  getCharacterSets,
  createCharacterSet,
  deleteCharacterSet,
  updateCharacterSet,
} from '../../../../actions/characterSets';
import {
  setStatusCreateCharacterSet,
  setStatusUpdateCharacterSet,
} from '../../../../actions/pages/resources';
import CharacterSetList from './CharacterSetList';
import s from './CharacterSet.css';

const pageTitle = 'CharacterSet';

class CharacterSet extends Component {

  static propTypes = {
    resourceId: PropTypes.string.isRequired,
    page: PropTypes.object,
    resources: PropTypes.object,
    getCharacterSets: PropTypes.func,
    characterSets: PropTypes.object,
    setStatusCreateCharacterSet: PropTypes.func,
    setStatusUpdateCharacterSet: PropTypes.func,
    createCharacterSet: PropTypes.func,
    deleteCharacterSet: PropTypes.func,
    updateCharacterSet: PropTypes.func,
    user: PropTypes.object,
  };

  componentWillMount() {
    this.props.getCharacterSets();
  }

  render() {
    return (
      <Layout
        pageTitle={pageTitle}
        pageSubTitle=""
      >
        <div>
          <CharacterSetList
            list={this.props.characterSets && this.props.characterSets.list}
            statusCreateCharacterSet={this.props.setStatusCreateCharacterSet}
            statusUpdateCharacterSet={this.props.setStatusUpdateCharacterSet}
            getCharacterSets={this.props.getCharacterSets}
            characterSets={this.props.characterSets}
            createCharacterSet={this.props.createCharacterSet}
            deleteCharacterSet={this.props.deleteCharacterSet}
            updateCharacterSet={this.props.updateCharacterSet}
            page={this.props.page}
            user={this.props.user}
          />
        </div>
      </Layout>
    );
  }

}

const mapState = (state) => ({
  resources: state.resources,
  characterSets: state.characterSets,
  page: state.page.resources,
  user: state.user,
});

const mapDispatch = {
  getCharacterSets,
  setStatusCreateCharacterSet,
  setStatusUpdateCharacterSet,
  createCharacterSet,
  deleteCharacterSet,
  updateCharacterSet,
};

export default withStyles(s)(connect(mapState, mapDispatch)(CharacterSet));
