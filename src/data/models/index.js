/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import sequelize from '../sequelize';
import Option from './Option';
import Resource from './Resource';
import ResourcePermission from './ResourcePermission';
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

// Associations
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

User.login = User.hasMany(UserLogin, {
  foreignKey: {
    name: 'userId',
    allowNull: false,
  },
  as: 'logins',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

User.claim = User.hasMany(UserClaim, {
  foreignKey: {
    name: 'userId',
    allowNull: false,
  },
  as: 'claims',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

User.profile = User.hasOne(UserProfile, {
  foreignKey: {
    name: 'userId',
    allowNull: false,
  },
  as: 'profile',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

User.meta = User.hasMany(UserMeta, {
  foreignKey: {
    name: 'userId',
    allowNull: false,
  },
  as: 'meta',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

User.roles = User.belongsToMany(Role, {
  through: {
    model: UserRole,
  },
  foreignKey: 'userId',
  as: 'roles',
});

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

Site.zones = Site.hasMany(Zone, {
  foreignKey: {
    name: 'siteId',
    allowNull: false,
  },
});

Zone.site = Zone.belongsTo(Site, {
  foreignKey: 'siteId',
});

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

Campaign.advertiser = Campaign.belongsTo(Advertiser, {
  foreignKey: 'advertiserId',
});

Campaign.placements = Campaign.hasMany(Placement, {
  foreignKey: 'campaignId',
  as: 'placements',
});

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
};
