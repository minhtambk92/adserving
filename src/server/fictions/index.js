/**
 * Created by manhhailua on 12/24/16.
 */

/* eslint-disable quotes */

import chalk from 'chalk';
import {
  Resource,
  Menu,
  Role,
  User,
  UserProfile,
  UserRole,
  Advertiser,
  Campaign,
  Channel,
  OptionChannel,
  Site,
  Placement,
  Zone,
  Banner,
  PlacementBanner,
  Track,
  Share,
  SharePlacement,
  BannerHtmlType,
  BannerType,
  AdsServer,
  ZoneType,
  ZoneSizeType,
  CharacterSet,
  OptionChannelType,
  OptionChannelValue,
  Activity,
  OptionChannelValueProperty,
} from '../../data/models';
import resourcesList from './data/Resource.json';
import menusList from './data/Menu.json';
import rolesList from './data/Role.json';
import usersList from './data/User.json';
import userProfilesList from './data/UserProfile.json';
import userRolesList from './data/UserRole.json';
import advertisersList from './data/Advertiser.json';
import campaignsList from './data/Campaign.json';
import sitesList from './data/Site.json';
import channelsList from './data/Channel.json';
import optionsChannelsList from './data/OptionChannel.json';
import zonesList from './data/Zone.json';
import sharesList from './data/Share.json';
import sharesPlacementsList from './data/SharePlacement.json';
import placementsList from './data/Placement.json';
import placementsBannersList from './data/PlacementBanner.json';
import bannersList from './data/Banner.json';
import tracksList from './data/Track.json';
import bannerHtmlTypeList from './data/BannerHtmlType.json';
import bannerTypeList from './data/BannerType.json';
import adsServerList from './data/AdsServer.json';
import zoneTypeList from './data/ZoneType.json';
import zoneSizeTypeList from './data/ZoneSizeType.json';
import characterSetList from './data/CharacterSet.json';
import optionChannelTypeList from './data/OptionChannelType.json';
import optionChannelValueList from './data/OptionChannelValue.json';
import activitiesList from './data/Activity.json';
import optionChannelValuePropertyList from './data/OptionChannelValueProperty.json';

/* eslint-disable no-console */

// Resources fiction
async function resourcesFiction() {
  console.log(chalk.gray('Check current number of resources...'));
  const resourcesQuantity = await Resource.count();

  if (resourcesQuantity === 0) {
    console.log(chalk.red('No resource found! Do a fiction...'));
    const results = await Resource.bulkCreate(resourcesList);
    console.log(chalk.green(`CREATED: ${results.length} resource(s). => PASSED!`));
  } else {
    console.log(chalk.green(`FOUND: ${resourcesQuantity} resources(s). => PASSED!`));
  }
}

// Menus fiction
async function menusFiction() {
  console.log(chalk.grey('Check current number of menu...'));
  const menusQuantity = await Menu.count();

  if (menusQuantity === 0) {
    console.log(chalk.red('No menu found! Do a fiction...'));
    const results = await Menu.bulkCreate(menusList);
    console.log(chalk.green(`CREATED: ${results.length} menu(s). => PASSED!`));
  } else {
    console.log(chalk.green(`FOUND: ${menusQuantity} menu(s). => PASSED!`));
  }
}

// Roles fiction
async function rolesFiction() {
  console.log(chalk.grey('Check current number of roles...'));
  const rolesQuantity = await Role.count();

  if (rolesQuantity === 0) {
    console.log(chalk.red('No role found! Do a fiction...'));
    const results = await Role.bulkCreate(rolesList);
    console.log(chalk.green(`CREATED: ${results.length} role(s). => PASSED!`));
  } else {
    console.log(chalk.green(`FOUND: ${rolesQuantity} role(s). => PASSED!`));
  }
}

// Users fiction
// Mainly for creating super admin
async function userFiction() {
  console.log(chalk.grey('Check current number of users...'));
  const usersQuantity = await User.count();

  if (usersQuantity === 0) {
    console.log(chalk.red('No user found! Do a fiction...'));
    const results = await User.bulkCreate(usersList);
    await UserProfile.bulkCreate(userProfilesList);
    await UserRole.bulkCreate(userRolesList);
    console.log(chalk.green(`CREATED: ${results.length} user(s). => PASSED!`));
  } else {
    console.log(chalk.green(`FOUND: ${usersQuantity} user(s). => PASSED!`));
  }
}

// BannerHtmlType fiction
async function bannerHtmlTypeFiction() {
  console.log(chalk.grey('Check current number of all Type Banner html...'));
  const allBannerHtmlTypeQuantity = await BannerHtmlType.count();

  if (allBannerHtmlTypeQuantity === 0) {
    console.log(chalk.red('No user found! Do a fiction...'));
    const results = await BannerHtmlType.bulkCreate(bannerHtmlTypeList);
    console.log(chalk.green(`CREATED: ${results.length} all Type Banner html => PASSED!`));
  } else {
    console.log(chalk.green(`FOUND: ${allBannerHtmlTypeQuantity} all Type Banner html. => PASSED!`));
  }
}

// BannerType fiction
async function bannerTypeFiction() {
  console.log(chalk.grey('Check current number of Banner Type...'));
  const bannerTypeQuantity = await BannerType.count();

  if (bannerTypeQuantity === 0) {
    console.log(chalk.red('No user found! Do a fiction...'));
    const results = await BannerType.bulkCreate(bannerTypeList);
    console.log(chalk.green(`CREATED: ${results.length} all Type Banner => PASSED!`));
  } else {
    console.log(chalk.green(`FOUND: ${bannerTypeQuantity} all Type Banner => PASSED!`));
  }
}

// AdsServer fiction
async function adsServerFiction() {
  console.log(chalk.grey('Check current number of adsServer...'));
  const adsServerQuantity = await AdsServer.count();

  if (adsServerQuantity === 0) {
    console.log(chalk.red('No user found! Do a fiction...'));
    const results = await AdsServer.bulkCreate(adsServerList);
    console.log(chalk.green(`CREATED: ${results.length} all adsServer => PASSED!`));
  } else {
    console.log(chalk.green(`FOUND: ${adsServerQuantity} all adsServer => PASSED!`));
  }
}

// zoneType fiction
async function zoneTypeFiction() {
  console.log(chalk.grey('Check current number of zone type...'));
  const zoneTypeQuantity = await ZoneType.count();

  if (zoneTypeQuantity === 0) {
    console.log(chalk.red('No user found! Do a fiction...'));
    const results = await ZoneType.bulkCreate(zoneTypeList);
    console.log(chalk.green(`CREATED: ${results.length} all zoneType => PASSED!`));
  } else {
    console.log(chalk.green(`FOUND: ${zoneTypeQuantity} all zoneType => PASSED!`));
  }
}

// zoneType fiction
async function zoneSizeTypeFiction() {
  console.log(chalk.grey('Check current number of zone size type...'));
  const zoneSizeTypeQuantity = await ZoneSizeType.count();

  if (zoneSizeTypeQuantity === 0) {
    console.log(chalk.red('No user found! Do a fiction...'));
    const results = await ZoneSizeType.bulkCreate(zoneSizeTypeList);
    console.log(chalk.green(`CREATED: ${results.length} all zoneSizeType => PASSED!`));
  } else {
    console.log(chalk.green(`FOUND: ${zoneSizeTypeQuantity} all zoneSizeType => PASSED!`));
  }
}

// Advertisers fiction
async function advertiserFiction() {
  console.log(chalk.grey('Check current number of advertisers...'));
  const advertisersQuantity = await Advertiser.count();

  if (advertisersQuantity === 0) {
    console.log(chalk.red('No advertiser found! Do a fiction...'));
    const results = await Advertiser.bulkCreate(advertisersList);
    console.log(chalk.green(`CREATED: ${results.length} advertiser(s). => PASSED!`));
  } else {
    console.log(chalk.green(`FOUND: ${advertisersQuantity} advertiser(s). => PASSED!`));
  }
}

// Campaigns fiction
async function campaignFiction() {
  console.log(chalk.grey('Check current number of advertisers...'));
  const campaignsQuantity = await Campaign.count();

  if (campaignsQuantity === 0) {
    console.log(chalk.red('No advertiser found! Do a fiction...'));
    const results = await Campaign.bulkCreate(campaignsList);
    console.log(chalk.green(`CREATED: ${results.length} campaign(s). => PASSED!`));
  } else {
    console.log(chalk.green(`FOUND: ${campaignsQuantity} campaign(s). => PASSED!`));
  }
}

// Sites fiction
async function siteFiction() {
  console.log(chalk.grey('Check current number of sites...'));
  const sitesQuantity = await Site.count();

  if (sitesQuantity === 0) {
    console.log(chalk.red('No site found! Do a fiction...'));
    const results = await Site.bulkCreate(sitesList);
    console.log(chalk.green(`CREATED: ${results.length} site(s). => PASSED!`));
  } else {
    console.log(chalk.green(`FOUND: ${sitesQuantity} site(s). => PASSED!`));
  }
}

// Channels fiction
async function channelFiction() {
  console.log(chalk.grey('Check current number of channels...'));
  const channelsQuantity = await Channel.count();

  if (channelsQuantity === 0) {
    console.log(chalk.red('No channel found! Do a fiction...'));
    const results = await Channel.bulkCreate(channelsList);
    await OptionChannel.bulkCreate(optionsChannelsList);
    console.log(chalk.green(`CREATED: ${results.length} channel(s). => PASSED!`));
  } else {
    console.log(chalk.green(`FOUND: ${channelsQuantity} channel(s). => PASSED!`));
  }
}

// OptionChannelType fiction
async function optionChannelTypeFiction() {
  console.log(chalk.grey('Check current number of option Channel Type...'));
  const optionChannelTypesQuantity = await OptionChannelType.count();

  if (optionChannelTypesQuantity === 0) {
    console.log(chalk.red('No channel found! Do a fiction...'));
    const results = await OptionChannelType.bulkCreate(optionChannelTypeList);
    console.log(chalk.green(`CREATED: ${results.length} option channel Type(s). => PASSED!`));
  } else {
    console.log(chalk.green(`FOUND: ${optionChannelTypesQuantity} option channel Type(s). => PASSED!`));
  }
}

// Option Channel Value fiction
async function optionChannelValueFiction() {
  console.log(chalk.grey('Check current number of option Channel Type...'));
  const optionChannelValuesQuantity = await OptionChannelValue.count();

  if (optionChannelValuesQuantity === 0) {
    console.log(chalk.red('No channel found! Do a fiction...'));
    const results = await OptionChannelValue.bulkCreate(optionChannelValueList);
    console.log(chalk.green(`CREATED: ${results.length} option channel value(s). => PASSED!`));
  } else {
    console.log(chalk.green(`FOUND: ${optionChannelValuesQuantity} option channel Value(s). => PASSED!`));
  }
}

// Option Channel Value Property fiction
async function optionChannelValuePropertyFiction() {
  console.log(chalk.grey('Check current number of option Channel Value Property...'));
  const optionChannelValuePropertiesQuantity = await OptionChannelValueProperty.count();

  if (optionChannelValuePropertiesQuantity === 0) {
    console.log(chalk.red('No channel found! Do a fiction...'));
    const results = await OptionChannelValueProperty.bulkCreate(optionChannelValuePropertyList);
    console.log(chalk.green(`CREATED: ${results.length} option channel value(s). => PASSED!`));
  } else {
    console.log(chalk.green(`FOUND: ${optionChannelValuePropertiesQuantity} option channel Value(s). => PASSED!`));
  }
}

// Character Set fiction
async function characterSetFiction() {
  console.log(chalk.grey('Check current number of character set...'));
  const characterSetsQuantity = await CharacterSet.count();

  if (characterSetsQuantity === 0) {
    console.log(chalk.red('No channel found! Do a fiction...'));
    const results = await CharacterSet.bulkCreate(characterSetList);
    console.log(chalk.green(`CREATED: ${results.length} characterSet(s). => PASSED!`));
  } else {
    console.log(chalk.green(`FOUND: ${characterSetsQuantity} characterSet(s). => PASSED!`));
  }
}

// Zones fiction
async function zoneFiction() {
  console.log(chalk.grey('Check current number of zones...'));
  const zonesQuantity = await Zone.count();

  if (zonesQuantity === 0) {
    console.log(chalk.red('No zone found! Do a fiction...'));
    const results = await Zone.bulkCreate(zonesList);
    console.log(chalk.green(`CREATED: ${results.length} zone(s). => PASSED!`));
  } else {
    console.log(chalk.green(`FOUND: ${zonesQuantity} zone(s). => PASSED!`));
  }
}

// Placements fiction
async function placementFiction() {
  console.log(chalk.grey('Check current number of placements...'));
  const placementsQuantity = await Placement.count();

  if (placementsQuantity === 0) {
    console.log(chalk.red('No placement found! Do a fiction...'));
    const results = await Placement.bulkCreate(placementsList);
    console.log(chalk.green(`CREATED: ${results.length} placement(s). => PASSED!`));
  } else {
    console.log(chalk.green(`FOUND: ${placementsQuantity} placement(s). => PASSED!`));
  }
}

// Zones' Shares fiction
async function sharedFiction() {
  console.log(chalk.grey('Check current number of share Zone...'));
  const shareQuantity = await Share.count();

  if (shareQuantity === 0) {
    console.log(chalk.red('No share zone found! Do a fiction...'));
    const results = await Share.bulkCreate(sharesList);
    await SharePlacement.bulkCreate(sharesPlacementsList);
    console.log(chalk.green(`CREATED: ${results.length} share(s). => PASSED!`));
  } else {
    console.log(chalk.green(`FOUND: ${shareQuantity} share(s). => PASSED!`));
  }
}

// Banners fiction
async function bannerFiction() {
  console.log(chalk.grey('Check current number of banners...'));
  const bannersQuantity = await Banner.count();

  if (bannersQuantity === 0) {
    console.log(chalk.red('No banner found! Do a fiction...'));
    const results = await Banner.bulkCreate(bannersList);
    await PlacementBanner.bulkCreate(placementsBannersList);
    console.log(chalk.green(`CREATE: ${results.length} banner(s). => PASSED!`));
  } else {
    console.log(chalk.green(`FOUND: ${bannersQuantity} banner(s). => PASSED!`));
  }
}

// Tracks Fiction
async function trackFiction() {
  console.log(chalk.grey('Check current number of tracks...'));
  const tracksQuantity = await Track.count();

  if (tracksQuantity === 0) {
    console.log(chalk.red('No track found! Do a fiction...'));
    const results = await Track.bulkCreate(tracksList);
    console.log(chalk.green(`CREATED: ${results.length} track(s). => PASSED!`));
  } else {
    console.log(chalk.green(`FOUND: ${tracksQuantity} track(s). => PASSED!`));
  }
}

// Activity fiction
async function activityFiction() {
  console.log(chalk.grey('Check current number of user activities...'));
  const activitiesQuantity = await Activity.count();

  if (activitiesQuantity === 0) {
    console.log(chalk.red('No user found! Do a fiction...'));
    const results = await Activity.bulkCreate(activitiesList);
    console.log(chalk.green(`CREATED: ${results.length} user activities. => PASSED!`));
  } else {
    console.log(chalk.green(`FOUND: ${activitiesQuantity} user activities. => PASSED!`));
  }
}


async function fiction() {
  console.log(chalk.grey.dim('START: data fictions.'));
  await resourcesFiction();
  await menusFiction();
  await rolesFiction();
  await userFiction();
  await bannerHtmlTypeFiction();
  await bannerTypeFiction();
  await adsServerFiction();
  await zoneTypeFiction();
  await optionChannelTypeFiction();
  await optionChannelValueFiction();
  await optionChannelValuePropertyFiction();
  await zoneSizeTypeFiction();
  await advertiserFiction();
  await campaignFiction();
  await siteFiction();
  await channelFiction();
  await placementFiction();
  await characterSetFiction();
  await zoneFiction();
  await sharedFiction();
  await bannerFiction();
  await trackFiction();
  await activityFiction();
  console.log(chalk.magenta(`DONE: data fictions.`));
}

export default fiction;
