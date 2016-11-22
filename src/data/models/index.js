/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import {
  TYPE_MENU_HEADER,
  TYPE_MENU_ITEM,
} from '../../constants';
import sequelize from '../sequelize';
import Option from './Option';
import Resource from './Resource';
import ResourcePermission from './ResourcePermission';
import MenuModel from './Menu';
import User from './User';
import UserLogin from './UserLogin';
import UserClaim from './UserClaim';
import UserProfile from './UserProfile';
import UserMeta from './UserMeta';
import UserRole from './UserRole';
import Role from './Role';
import Permission from './Permission';
import Campaign from './Campaign';
import Placement from './Placement';
import Banner from './Banner';
import Advertiser from './Advertiser';
import Site from './Site';
import Zone from './Zone';
import Channel from './Channel';
import Filter from './Filter';
import PlacementBannerZone from './PlacementBannerZone';
import OptionChannel from './OptionChannel';
import ClickImpression from './ClickImpression';

const Menu = MenuModel.scope('menus');
const MenuHeader = MenuModel.scope('headers');
const MenuItem = MenuModel.scope('items');

// Permissions for each resource type
Resource.permissions = Resource.hasMany(ResourcePermission, {
  foreignKey: {
    name: 'resourceEntityId',
    allowNull: false,
  },
  as: 'permissions',
  scope: {
    resource: 'Resource',
  },
  constraints: false,
});

// A menu has many headers
Menu.headers = Menu.hasMany(MenuModel, {
  foreignKey: {
    name: 'parentId',
    allowNull: false,
  },
  scope: {
    type: TYPE_MENU_HEADER,
  },
  as: 'headers',
  constraints: false,
});

// A menu has many items
Menu.items = Menu.hasMany(MenuModel, {
  foreignKey: {
    name: 'parentId',
    allowNull: false,
  },
  scope: {
    type: {
      $in: [TYPE_MENU_HEADER, TYPE_MENU_ITEM],
    },
  },
  as: 'items',
  constraints: false,
});

// A menu item can contains many child items
MenuItem.childItems = MenuItem.hasMany(MenuItem, {
  foreignKey: {
    name: 'parentId',
    allowNull: false,
  },
  as: 'childItems',
  constraints: false,
});

// Role is a set of permission granted to a user
Role.permissions = Role.hasMany(ResourcePermission, {
  foreignKey: {
    name: 'authorizedId',
    allowNull: false,
  },
  as: 'permissions',
  scope: {
    authorizedFor: 'Role',
  },
  constraints: false,
});

// Each user can have specific permission which not depend on role or resource types permissions
User.permissions = User.hasMany(ResourcePermission, {
  foreignKey: {
    name: 'authorizedId',
    allowNull: false,
  },
  as: 'permissions',
  scope: {
    authorizedFor: 'User',
  },
  constraints: false,
});

// Each user can have many login type
User.login = User.hasMany(UserLogin, {
  foreignKey: {
    name: 'userId',
    allowNull: false,
  },
  as: 'logins',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

// Each user can link his account to many other third party account (social networks)
User.claim = User.hasMany(UserClaim, {
  foreignKey: {
    name: 'userId',
    allowNull: false,
  },
  as: 'claims',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

// Each user can only have one profile information
User.profile = User.hasOne(UserProfile, {
  foreignKey: {
    name: 'userId',
    allowNull: false,
  },
  as: 'profile',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

// Each user can have many meta data
User.meta = User.hasMany(UserMeta, {
  foreignKey: {
    name: 'userId',
    allowNull: false,
  },
  as: 'meta',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

// Each user can use many role
User.roles = User.belongsToMany(Role, {
  through: {
    model: UserRole,
  },
  foreignKey: 'userId',
  as: 'roles',
});

// Each role can be set to many users
Role.users = Role.belongsToMany(User, {
  through: {
    model: UserRole,
  },
  foreignKey: 'roleId',
  as: 'users',
});

PlacementBannerZone.placement = PlacementBannerZone.belongsTo(Placement, {
  foreignKey: 'placementId',
});

PlacementBannerZone.banner = PlacementBannerZone.belongsTo(Banner, {
  foreignKey: 'bannerId',
});

PlacementBannerZone.zone = PlacementBannerZone.belongsTo(Zone, {
  foreignKey: 'zoneId',
});

Placement.placementBannerZones = Placement.hasMany(PlacementBannerZone, {
  foreignKey: 'placementId',
});

Banner.placementBannerZones = Banner.hasMany(PlacementBannerZone, {
  foreignKey: 'bannerId',
});

Zone.placementBannerZones = Zone.hasMany(PlacementBannerZone, {
  foreignKey: 'zoneId',
});

// Each site has many zones
Site.zones = Site.hasMany(Zone, {
  foreignKey: {
    name: 'siteId',
    allowNull: false,
  },
});

// Each zone can only belong to one site
Zone.site = Zone.belongsTo(Site, {
  foreignKey: 'siteId',
});

// Each banner has many clickImpression
Banner.clickImpressions = Banner.hasMany(ClickImpression, {
  foreignKey: {
    name: 'bannerId',
    allowNull: false,
  },
});

// Each clickImpression can only belong to one Banner
ClickImpression.banner = ClickImpression.belongsTo(Banner, {
  foreignKey: 'bannerId',
});

// Each Channel can make many banners
Channel.banners = Channel.hasMany(Banner, {
  foreignKey: {
    name: 'channelId',
    allowNull: false,
  },
});
Banner.channel = Banner.belongsTo(Channel, {
  foreignKey: 'channelId',
});

// Each advertiser can make many campaigns
Channel.sites = Channel.hasMany(Site, {
  foreignKey: {
    name: 'channelId',
    allowNull: false,
  },
});
Site.channel = Site.belongsTo(Channel, {
  foreignKey: 'channelId',
});

Channel.optionChannels = Channel.hasMany(OptionChannel, {
  foreignKey: {
    name: 'channelId',
    allowNull: false,
  },
});
OptionChannel.channel = OptionChannel.belongsTo(Channel, {
  foreignKey: 'channelId',
});

Advertiser.campaigns = Advertiser.hasMany(Campaign, {
  foreignKey: 'advertiserId',
});

// Each campaign only belong to one advertiser
Campaign.advertiser = Campaign.belongsTo(Advertiser, {
  foreignKey: 'advertiserId',
});

// Each campaign can use many placements of ads
Campaign.placements = Campaign.hasMany(Placement, {
  foreignKey: 'campaignId',
  as: 'placements',
});

// Each placement can only belong to one campaign
Placement.campaign = Placement.belongsTo(Campaign, {
  foreignKey: 'campaignId',
  as: 'campaign',
});

function sync(...args) {
  return sequelize.sync(...args);
}

export default { sync };
export {
  Option,
  Resource,
  MenuHeader,
  Menu,
  MenuItem,
  Role,
  User,
  UserLogin,
  UserClaim,
  UserProfile,
  UserRole,
  Permission,
  Campaign,
  Placement,
  Banner,
  Advertiser,
  Site,
  Zone,
  Channel,
  Filter,
  PlacementBannerZone,
  OptionChannel,
  ClickImpression,
};
