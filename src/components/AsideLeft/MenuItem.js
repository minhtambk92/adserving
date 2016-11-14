/**
 * Created by Manhhailua on 11/14/16.
 */

import React, { Component, PropTypes } from 'react';
import history from '../../core/history';
import Link from '../Link';

class MenuItem extends Component {

  static propTypes = {
    item: PropTypes.object.isRequired,
  };

  renderChildItemIcon(childItem) { // eslint-disable-line class-methods-use-this
    if (typeof childItem.icon === 'string') {
      return <span className="fa" dangerouslySetInnerHTML={{ __html: childItem.icon }} />;
    }

    return <i className="fa fa-circle-o" />;
  }

  renderChildItem(childItem, className = 'treeview') {
    return (
      <li className={className} key={childItem.id}>
        <Link to={childItem.url}>
          {this.renderChildItemIcon(childItem)}&nbsp;<span>{childItem.name}</span>
          {childItem.childItems && childItem.childItems.length > 0 && (
            <span className="pull-right-container">
              <i className="fa fa-angle-left pull-right" />
            </span>
          )}
        </Link>

        {childItem.childItems && childItem.childItems.length > 0 && (
          <ul className="treeview-menu">
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
