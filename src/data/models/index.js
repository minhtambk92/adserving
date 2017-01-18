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
import ChannelOptionBrowser from './ChannelOptionBrowser';
import ChannelOptionCategory from './ChannelOptionCategory';
import Filter from './Filter';
import PlacementBanner from './PlacementBanner';
import OptionChannel from './OptionChannel';
import Track from './Track';
import Share from './Share';
import SharePlacement from './SharePlacement';
import BannerHtmlType from './BannerHtmlType';
import BannerType from './BannerType';
import AdsServer from './AdsServer';
import ZoneType from './ZoneType';
import ZoneSizeType from './ZoneSizeType';
import CharacterSet from './CharacterSet';

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


// Each banner can be set to many placement
Banner.placements = Banner.belongsToMany(Placement, {
  through: {
    model: PlacementBanner,
  },
  foreignKey: 'bannerId',
  as: 'placements',
});

// Each user can placement many banner
Placement.banners = Placement.belongsToMany(Banner, {
  through: {
    model: PlacementBanner,
  },
  foreignKey: 'placementId',
  as: 'banners',
});

Share.placements = Share.belongsToMany(Placement, {
  through: {
    model: SharePlacement,
  },
  foreignKey: 'shareId',
  as: 'placements',
});

// Each user can placement many shares
Placement.shares = Placement.belongsToMany(Share, {
  through: {
    model: SharePlacement,
  },
  foreignKey: 'placementId',
  as: 'shares',
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

// Each banner has many Track
Banner.tracks = Banner.hasMany(Track, {
  foreignKey: {
    name: 'bannerId',
    allowNull: false,
  },
});

// Each Track can only belong to one Banner
Track.banner = Track.belongsTo(Banner, {
  foreignKey: 'bannerId',
});

// Each BannerHtmlType can make many banners
BannerHtmlType.banners = BannerHtmlType.hasMany(Banner, {
  foreignKey: {
    name: 'bannerHtmlTypeId',
  },
});

Banner.bannerHtmlType = Banner.belongsTo(BannerHtmlType, {
  foreignKey: 'bannerHtmlTypeId',
});

// Each Banner Type can make many banners
BannerType.banners = BannerType.hasMany(Banner, {
  foreignKey: {
    name: 'bannerTypeId',
  },
});
Banner.bannerType = Banner.belongsTo(BannerType, {
  foreignKey: 'bannerTypeId',
});

// Each Ads Server can make many banners
AdsServer.banners = AdsServer.hasMany(Banner, {
  foreignKey: {
    name: 'adsServerId',
  },
});
Banner.adsServer = Banner.belongsTo(AdsServer, {
  foreignKey: 'adsServerId',
});

// Each Channel can make many banners
Channel.banners = Channel.hasMany(Banner, {
  foreignKey: {
    name: 'channelId',
  },
});
Banner.channel = Banner.belongsTo(Channel, {
  foreignKey: 'channelId',
});

// Each Site can make many channels
Site.channels = Site.hasMany(Channel, {
  foreignKey: {
    name: 'siteId',
    allowNull: false,
  },
});
Channel.site = Channel.belongsTo(Site, {
  foreignKey: 'siteId',
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

// Each zone can use many share of ads
Zone.shares = Zone.hasMany(Share, {
  foreignKey: 'zoneId',
  as: 'shares',
});

// Each share zone can only belong to one zone
Share.zone = Share.belongsTo(Zone, {
  foreignKey: 'zoneId',
  as: 'zone',
});

ZoneType.zones = ZoneType.hasMany(Zone, {
  foreignKey: 'zoneTypeId',
});
Zone.zoneType = Zone.belongsTo(ZoneType, {
  foreignKey: 'zoneTypeId',
});

ZoneSizeType.zones = ZoneSizeType.hasMany(Zone, {
  foreignKey: 'zoneSizeTypeId',
});

Zone.zoneSizeType = Zone.belongsTo(ZoneSizeType, {
  foreignKey: 'zoneSizeTypeId',
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
  ChannelOptionBrowser,
  ChannelOptionCategory,
  Filter,
  PlacementBanner,
  OptionChannel,
  Track,
  Share,
  SharePlacement,
  BannerHtmlType,
  BannerType,
  AdsServer,
  ZoneType,
  ZoneSizeType,
  CharacterSet,
};
