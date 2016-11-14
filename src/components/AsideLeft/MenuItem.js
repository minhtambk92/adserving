/**
 * Created by Manhhailua on 11/14/16.
 */

import React, { Component, PropTypes } from 'react';
import Link from '../Link';

class MenuItem extends Component {

  static propTypes = {
    item: PropTypes.object.isRequired,
  };

  render() {
    const { item } = this.props;

    function renderChildItemIcon(childItem) {
      let content = null;

      if (typeof childItem.icon === 'string') {
        content = <span className="fa" dangerouslySetInnerHTML={{ __html: childItem.icon }} />;
      } else {
        content = <i className="fa fa-circle-o" />;
      }

      return content;
    }

    return (
      <li className="treeview">
        <Link to="/">
          <span
            className="fa"
            dangerouslySetInnerHTML={{ __html: item.icon }}
          />&nbsp;<span>{item.name}</span>
          <span className="pull-right-container">
            <i className="fa fa-angle-left pull-right" />
          </span>
        </Link>

        {item.childItems && (
          <ul className="treeview-menu">
            {item.childItems.map(childItem => (
              <li key={childItem.id}>
                <Link to={childItem.url}>
                  {renderChildItemIcon(childItem)}&nbsp;<span>{childItem.name}</span>
                  {childItem.childItems && (
                    <span className="pull-right-container">
                      <i className="fa fa-angle-left pull-right" />
                    </span>
                  )}
                </Link>

                {childItem.childItems && (
                  <ul className="treeview-menu">
                    {childItem.childItems.map(smallItem => (
                      <li key={smallItem.id}>
                        <Link to={smallItem.url}>
                          <i className="fa fa-circle-o" />&nbsp;<span>{smallItem.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        )}
      </li>
    );
  }
}

export default MenuItem;
