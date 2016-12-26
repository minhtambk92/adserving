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
} from '../../data/models';
import { host } from '../../config';
import resourcesList from './data/resources.json';
import menusList from './data/menus.json';
import rolesList from './data/roles.json';
import usersList from './data/users.json';
import userProfilesList from './data/user-profile.json';
import userRolesList from './data/user-role.json';
import advertisersList from './data/advertisers.json';
import campaignsList from './data/campaigns.json';
import sitesList from './data/sites.json';
import channelsList from './data/channels.json';
import optionsChannelsList from './data/option-channel.json';
import zonesList from './data/zones.json';
import sharesList from './data/shares.json';
import sharesPlacementsList from './data/share-placement.json';
import placementsList from './data/placements.json';
import placementsBannersList from './data/placement-banner.json';
import bannersList from './data/banners.json';
import tracksList from './data/tracks.json';

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

async function fiction() {
  console.log(chalk.grey.dim('Start data fictions!'));
  await resourcesFiction();
  await menusFiction();
  await rolesFiction();
  await userFiction();
  await advertiserFiction();
  await campaignFiction();
  await siteFiction();
  await channelFiction();
  await placementFiction();
  await zoneFiction();
  await sharedFiction();
  await bannerFiction();
  await trackFiction();
  console.log(chalk.magenta(`Your application is now ready at http://${host}/`));
}

export default fiction;
