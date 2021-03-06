/**
 * Created by Manhhailua on 11/14/16.
 */

import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import Link from '../Link';

class MenuItem extends Component {

  static propTypes = {
    item: PropTypes.object.isRequired,
    activeIds: PropTypes.array.isRequired,
    setAsideLeftActiveItems: PropTypes.func,
  };

  isActive(id) {
    return this.props.activeIds.indexOf(id) > -1;
  }

  clickMenuItem(event, url) { // eslint-disable-line no-unused-vars
    if (url && url !== '#') {
      this.props.setAsideLeftActiveItems(url);
    }
  }

  renderChildItemIcon(childItem) { // eslint-disable-line class-methods-use-this
    if (typeof childItem.icon === 'string') {
      // eslint-disable-next-line react/no-danger
      return <i className="fa" dangerouslySetInnerHTML={{ __html: childItem.icon }} />;
    }

    return <i className="fa fa-circle-o" />;
  }

  renderChildItem(childItem, className = 'treeview') {
    return (
      <li className={cx(className, this.isActive(childItem.id) && 'active')} key={childItem.id}>
        <Link
          to={childItem.url}
          onClick={event => this.clickMenuItem(event, childItem.url)}
        >
          {this.renderChildItemIcon(childItem)}&nbsp;<span>{childItem.name}</span>
          {childItem.childItems && childItem.childItems.length > 0 && (
            <span className="pull-right-container">
              <i className="fa fa-angle-left pull-right" />
            </span>
          )}
        </Link>

        {childItem.childItems && childItem.childItems.length > 0 && (
          <ul className={cx('treeview-menu', this.isActive(childItem.id) && 'menu-open')}>
            {childItem.childItems.map(smallItem => this.renderChildItem(smallItem, null))}
          </ul>
        )}
      </li>
    );
  }

  render() {
    return this.renderChildItem(this.props.item);
  }
}

export default MenuItem;
