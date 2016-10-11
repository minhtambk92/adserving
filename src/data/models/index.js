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
import User from './User';
import UserLogin from './UserLogin';
import UserClaim from './UserClaim';
import UserProfile from './UserProfile';
import UserMeta from './UserMeta';
import UserRole from './UserRole';
import Role from './Role';
import Permission from './Permission';
import Campaign from './Campaign';
import CampaignPlacement from './CampaignPlacement';
import Placement from './Placement';
import PlacementBannerZone from './PlacementBannerZone';
import Banner from './Banner';
import Advertiser from './Advertiser';
import Site from './Site';
import Zone from './Zone';
import Channel from './Channel';
import Filter from './Filter';

// Associations
User.login = User.hasMany(UserLogin, {
  foreignKey: 'userId',
  as: 'logins',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

User.claim = User.hasMany(UserClaim, {
  foreignKey: 'userId',
  as: 'claims',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

User.profile = User.hasOne(UserProfile, {
  foreignKey: 'userId',
  as: 'profile',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

User.meta = User.hasMany(UserMeta, {
  foreignKey: 'userId',
  as: 'meta',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

User.roles = User.belongsToMany(Role, {
  through: {
    model: UserRole,
  },
  foreignKey: 'userId',
});

User.sites = User.hasMany(Site, {
  foreignKey: 'userId',
  as: 'sites',
});

Role.users = Role.belongsToMany(User, {
  through: {
    model: UserRole,
  },
  foreignKey: 'roleId',
});

Campaign.placements = Campaign.belongsToMany(Placement, {
  through: {
    model: CampaignPlacement,
  },
  foreignKey: 'campaignId',
});

Placement.campaigns = Placement.belongsToMany(Campaign, {
  through: {
    model: CampaignPlacement,
  },
  foreignKey: 'placementId',
});

Placement.banners = Placement.belongsToMany(Banner, {
  through: {
    model: PlacementBannerZone,
  },
  foreignKey: 'placementId',
});

// Placement.zones = Placement.belongsToMany(Zone, {
//   through: {
//     model: PlacementBannerZone,
//   },
//   foreignKey: 'placementId',
// });

Banner.placements = Banner.belongsToMany(Placement, {
  through: {
    model: PlacementBannerZone,
  },
  foreignKey: 'bannerId',
});

Zone.placements = Zone.hasMany(PlacementBannerZone, {
  foreignKey: 'zoneId',
});

// Zone.banners = Zone.belongsToMany(Banner, {
//   through: {
//     model: PlacementBannerZone,
//   },
//   foreignKey: 'zoneId',
// });
// End of associations

function sync(...args) {
  return sequelize.sync(...args);
}

export default { sync };
export {
  Option,
  User,
  Role,
  Permission,
  Campaign,
  Placement,
  Banner,
  Advertiser,
  Site,
  Zone,
  Channel,
  Filter,
};
