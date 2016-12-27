import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';
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

  constructor(props, context) {
    super(props, context);

    this.state = {
      setAsideLeftActiveItems: false,
    };
  }

  componentDidMount() {
    this.props.getAsideLeftMenu('main-menu');
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.menus.asideLeft.items && !this.state.setAsideLeftActiveItems) {
      this.setState({ setAsideLeftActiveItems: true });
      this.props.setAsideLeftActiveItems(nextProps.menus.asideLeft.items);
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
