import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { getAsideLeftMenu } from '../../actions/menus';

class ProvideIntl extends Component {

  static propTypes = {
    ...IntlProvider.propTypes,
    getAsideLeftMenu: PropTypes.func,
    children: PropTypes.element.isRequired,
  };

  componentDidMount() {
    this.props.getAsideLeftMenu('main-menu');
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
});

const mapDispatch = {
  getAsideLeftMenu,
};

export default connect(mapState, mapDispatch)(ProvideIntl);
