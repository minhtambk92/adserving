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
// Associations
// User.login = User.hasMany(UserLogin, {
//   foreignKey: 'userId',
//   as: 'logins',
//   onUpdate: 'cascade',//   onDelete: 'cascade',
// });
//
// User.claim = User.hasMany(UserClaim, {
//   foreignKey: 'userId',
//   as: 'claims',
//   onUpdate: 'cascade',
//   onDelete: 'cascade',
// });
//
// User.profile = User.hasOne(UserProfile, {
//   foreignKey: 'userId',
//   as: 'profile',
//   onUpdate: 'cascade',
//   onDelete: 'cascade',
// });
//
// User.meta = User.hasMany(UserMeta, {
//   foreignKey: 'userId',
//   as: 'meta',
//   onUpdate: 'cascade',
//   onDelete: 'cascade',
// });
//
// User.sites = User.hasMany(Site, {
//   foreignKey: 'userId',
// });
//
// User.zones = User.hasMany(Zone, {
//   foreignKey: 'userId',
// });
//
// User.roles = User.belongsToMany(Role, {
//   through: {
//     model: UserRole,
//   },
//   foreignKey: 'userId',
// });
//
// Role.users = Role.belongsToMany(User, {
//   through: {
//     model: UserRole,
//   },
//   foreignKey: 'roleId',
// });

PlacementBannerZone.placement = PlacementBannerZone.belongsTo(Placement, {
  foreignKey: 'placementId',
});
PlacementBannerZone.banner = PlacementBannerZone.belongsTo(Banner, {
  foreignKey: 'bannerId',
});
PlacementBannerZone.zone = PlacementBannerZone.belongsTo(Zone, {
  foreignKey: 'zoneId',
});
Placement.placementbannerzones = Placement.hasMany(PlacementBannerZone, {
  foreignKey: 'placementId',
});
Banner.placementbannerzones = Banner.hasMany(PlacementBannerZone, {
  foreignKey: 'bannerId',
});
Zone.placementbannerzones = Zone.hasMany(PlacementBannerZone, {
  foreignKey: 'zoneId',
});


Site.zones = Site.hasMany(Zone, {
  foreignKey: 'siteId',
});

Zone.site = Zone.belongsTo(Site, {
  foreignKey: 'siteId',
});


Advertiser.campaigns = Advertiser.hasMany(Campaign, {
  foreignKey: 'advertiserId',
  as: 'campaigns',
});
Campaign.advertiser = Campaign.belongsTo(Advertiser, {
  foreignKey: 'advertiserId',
  as: 'advertiser',
});


Advertiser.banners = Advertiser.hasMany(Banner, {
  foreignKey: 'advertiserId',
  as: 'banners',
});
Banner.advertiser = Banner.belongsTo(Advertiser, {
  foreignKey: 'advertiserId',
  as: 'advertiser',
});

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
  PlacementBannerZone,
};
