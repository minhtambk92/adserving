import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';
import history from '../../core/history';
import {
  getAsideLeftMenu,
  setAsideLeftActiveItems,
} from '../../actions/menus';

class ProvideIntl extends Component {

  static propTypes = {
    ...IntlProvider.propTypes,
    menus: PropTypes.object,
    getAsideLeftMenu: PropTypes.func,
    setAsideLeftActiveItems: PropTypes.func,
    children: PropTypes.element.isRequired,
  };

  componentDidMount() {
    this.props.getAsideLeftMenu('main-menu');
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.menus.asideLeft.items) {
      nextProps.menus.asideLeft.items.map(item => this.checkActiveItem(item));
    }
  }

  checkActiveItem(item, activeItems = []) {
    if (item) {
      const array = activeItems;
      array.unshift(item);

      if (item.url === history.location.pathname) {
        this.setAsideLeftActiveItems(array);
      }

      if (item.childItems && item.childItems.length > 0) {
        item.childItems.map(childItem => {
          if (childItem.parentId !== array[0].id) {
            array.shift();
          }

          return this.checkActiveItem(childItem, array);
        });
      }
    }
  }

  render() {
    const { intl, children } = this.props;

    return (
      <IntlProvider
        {...intl}
        messages={intl.messages[intl.locale]}
      >
        {children}
      </IntlProvider>
    );
  }
}

const mapState = (state) => ({
  intl: state.intl,
  menus: state.menus,
});

const mapDispatch = {
  getAsideLeftMenu,
  setAsideLeftActiveItems,
};

export default connect(mapState, mapDispatch)(ProvideIntl);
