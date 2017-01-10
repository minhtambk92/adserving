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
  ChannelOptionCategory,
  ChannelOptionBrowser,
  BannerHtmlType,
  BannerType,
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
import channelOptionCategoryList from './data/ChannelOptionCategory.json';
import channelOptionBrowserList from './data/ChannelOptionBrowser.json';
import bannerHtmlTypeList from './data/BannerHtmlType.json';
import bannerTypeList from './data/BannerType.json';

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
  console.log(chalk.grey('Check current number of menus...'));
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

// Channel Option Browser Fiction
async function channelOptionBrowserFiction() {
  console.log(chalk.grey('Check current number of channelOptionBrowsers...'));
  const channelOptionBrowsersQuantity = await ChannelOptionBrowser.count();

  if (channelOptionBrowsersQuantity === 0) {
    console.log(chalk.red('No track found! Do a fiction...'));
    const results = await ChannelOptionBrowser.bulkCreate(channelOptionBrowserList);
    console.log(chalk.green(`CREATED: ${results.length} channelOptionBrowsers(s). => PASSED!`));
  } else {
    console.log(chalk.green(`FOUND: ${channelOptionBrowsersQuantity} channelOptionBrowsers(s). => PASSED!`));
  }
}

// Channel Option Category Fiction
async function channelOptionCategoryFiction() {
  console.log(chalk.grey('Check current number of channelOptionCategories...'));
  const channelOptionCategoriesQuantity = await ChannelOptionCategory.count();

  if (channelOptionCategoriesQuantity === 0) {
    console.log(chalk.red('No track found! Do a fiction...'));
    const results = await ChannelOptionCategory.bulkCreate(channelOptionCategoryList);
    console.log(chalk.green(`CREATED: ${results.length} channelOptionCategory(s). => PASSED!`));
  } else {
    console.log(chalk.green(`FOUND: ${channelOptionCategoriesQuantity} channelOptionCategory(s). => PASSED!`));
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
  await advertiserFiction();
  await campaignFiction();
  await siteFiction();
  await channelFiction();
  await placementFiction();
  await zoneFiction();
  await sharedFiction();
  await bannerFiction();
  await trackFiction();
  await channelOptionBrowserFiction();
  await channelOptionCategoryFiction();
  console.log(chalk.magenta(`DONE: data fictions.`));
}

export default fiction;
