/**
 * Created by Manhhailua on 11/7/16.
 */

import chalk from 'chalk';
import moment from 'moment';
import { genSaltSync, hashSync } from 'bcrypt';
import {
  STATUS_ACTIVE,
  TYPE_MENU,
  TYPE_MENU_HEADER,
  TYPE_MENU_ITEM,
} from '../../constants';
import {
  Resource,
  Menu,
  MenuHeader,
  MenuItem,
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
  ClickImpression,
  Share,
  SharePlacement,
} from '../../data/models';
import { host } from '../../config';

/* eslint-disable no-console */

// Resources fiction
async function resourcesFiction() {
  console.log(chalk.gray('Check current number of resources...'));
  const resourcesQuantity = await Resource.count();

  if (resourcesQuantity === 0) {
    console.log(chalk.red('No resource found! Do a fiction...'));

    // Create basic roles
    const results = await Resource.bulkCreate([{
      uniqueName: 'option',
      modelName: 'Option',
      name: 'Options',
      hasMeta: false,
      description: 'Global application\'s options',
      status: 'active',
    }, {
      uniqueName: 'resource',
      modelName: 'Resource',
      name: 'Resource types',
      hasMeta: false,
      description: 'Application\'s resources types',
      status: 'active',
    }, {
      uniqueName: 'role',
      modelName: 'Role',
      name: 'User roles',
      hasMeta: false,
      description: 'Name for group of user privileges',
      status: 'active',
    }, {
      uniqueName: 'user',
      modelName: 'User',
      name: 'User',
      hasMeta: true,
      description: 'User account',
      status: 'active',
    }, {
      uniqueName: 'claims',
      modelName: 'UserClaim',
      name: 'User\'s claims',
      hasMeta: true,
      description: 'User\'s claims list',
      status: 'active',
    }, {
      uniqueName: 'logins',
      modelName: 'UserLogin',
      name: 'User\'s login information',
      hasMeta: true,
      description: 'User\'s login information',
      status: 'active',
    }, {
      uniqueName: 'profile',
      modelName: 'UserProfile',
      name: 'User\'s profile',
      hasMeta: true,
      description: 'User\'s profile information',
      status: 'active',
    }, {
      uniqueName: 'permission',
      modelName: 'Permission',
      name: 'Resources permissions',
      hasMeta: false,
      description: 'User privileges',
      status: 'active',
    }]);

    console.log(chalk.green(`${results.length} resources created. Passed!`));
  } else {
    console.log(chalk.green(`${resourcesQuantity} resources(s) found. Passed!`));
  }
}

// Menus fiction
async function menusFiction() {
  console.log(chalk.grey('Check current number of menus...'));
  const menusQuantity = await Menu.count();

  if (menusQuantity === 0) {
    console.log(chalk.red('No menu found! Do a fiction...'));

    // Create main menu
    const menu = await Menu.create({
      url: '#',
      uniqueName: 'main-menu',
      name: 'Main menu',
      type: TYPE_MENU,
    });

    if (menu) {
      await Menu.create({
        url: '#',
        name: 'Main Navigation',
        parentId: menu.id,
        order: 0,
        type: TYPE_MENU_HEADER,
      });

      const reports = await Menu.create({
        url: '#',
        name: 'Report',
        icon: '<i class="fa fa-line-chart"></i>',
        parentId: menu.id,
        order: 1,
        type: TYPE_MENU_ITEM,
      });

      if (reports) {
        await Menu.create({
          url: '/report/system',
          name: 'System',
          icon: '<i class="fa fa-circle-o"></i>',
          parentId: reports.id,
          order: 0,
          type: TYPE_MENU_ITEM,
        });
      }

      const agency = await Menu.create({
        url: '#',
        name: 'Agency',
        icon: '<i class="fa fa-id-card-o"></i>',
        parentId: menu.id,
        order: 2,
        type: TYPE_MENU_ITEM,
      });

      if (agency) {
        await Menu.bulkCreate([{
          url: '/resource/advertiser',
          name: 'Advertisers',
          icon: '<i class="fa fa-circle-o"></i>',
          parentId: agency.id,
          order: 0,
          type: TYPE_MENU_ITEM,
        }, {
          url: '/resource/campaign',
          name: 'Campaigns',
          icon: '<i class="fa fa-circle-o"></i>',
          parentId: agency.id,
          order: 1,
          type: TYPE_MENU_ITEM,
        }, {
          url: '/resource/banner',
          name: 'Banners',
          icon: '<i class="fa fa-circle-o"></i>',
          parentId: agency.id,
          order: 2,
          type: TYPE_MENU_ITEM,
        }]);
      }

      const publisher = await Menu.create({
        url: '#',
        name: 'Publisher',
        icon: '<i class="fa fa-briefcase"></i>',
        parentId: menu.id,
        order: 3,
        type: TYPE_MENU_ITEM,
      });

      if (publisher) {
        await Menu.bulkCreate([{
          url: '/resource/site',
          name: 'Sites',
          icon: '<i class="fa fa-circle-o"></i>',
          parentId: publisher.id,
          order: 0,
          type: TYPE_MENU_ITEM,
        }, {
          url: '/resource/zone',
          name: 'Zones',
          icon: '<i class="fa fa-circle-o"></i>',
          parentId: publisher.id,
          order: 1,
          type: TYPE_MENU_ITEM,
        }, {
          url: '/resource/placement',
          name: 'Placements',
          icon: '<i class="fa fa-circle-o"></i>',
          parentId: publisher.id,
          order: 2,
          type: TYPE_MENU_ITEM,
        }, {
          url: '/resource/channel',
          name: 'Target Channels',
          icon: '<i class="fa fa-circle-o"></i>',
          parentId: publisher.id,
          order: 3,
          type: TYPE_MENU_ITEM,
        }]);
      }

      await Menu.create({
        url: '#',
        name: 'Configuration',
        parentId: menu.id,
        order: 4,
        type: TYPE_MENU_HEADER,
      });

      const settings = await Menu.create({
        url: '#',
        name: 'Settings',
        icon: '<i class="fa fa-gears"></i>',
        parentId: menu.id,
        order: 5,
        type: TYPE_MENU_ITEM,
      });

      if (settings) {
        const appearance = await Menu.create({
          url: '/setting/appearance',
          name: 'Appearance',
          icon: '<i class="fa fa-desktop"></i>',
          parentId: settings.id,
          order: 0,
          type: TYPE_MENU_ITEM,
        });

        if (appearance) {
          await Menu.create({
            url: '/setting/appearance/menus',
            name: 'Menus',
            icon: '<i class="fa fa-bars"></i>',
            parentId: appearance.id,
            order: 0,
            type: TYPE_MENU_ITEM,
          });
        }
      }

      const users = await Menu.create({
        url: '#',
        name: 'Users',
        icon: '<i class="fa fa-user"></i>',
        parentId: menu.id,
        order: 6,
        type: TYPE_MENU_ITEM,
      });

      if (users) {
        await Menu.bulkCreate([{
          url: '/resource/user',
          name: 'All Users',
          icon: '<i class="fa fa-users"></i>',
          parentId: users.id,
          order: 1,
          type: TYPE_MENU_ITEM,
        }, {
          url: '/resource/role',
          name: 'Roles',
          icon: '<i class="fa fa-flag"></i>',
          parentId: users.id,
          order: 2,
          type: TYPE_MENU_ITEM,
        }]);
      }

      const resources = await Menu.create({
        url: '#',
        name: 'Resources',
        icon: '<i class="fa fa-industry"></i>',
        parentId: menu.id,
        order: 7,
        type: TYPE_MENU_ITEM,
      });

      if (resources) {
        await Menu.create({
          url: '/resource/type',
          name: 'Types',
          icon: '<i class="fa fa-circle-o"></i>',
          parentId: resources.id,
          order: 0,
          type: TYPE_MENU_ITEM,
        });
      }
    }

    console.log(chalk.green('Main menu is created! Passed!'));
  } else {
    console.log(chalk.green(`${menusQuantity} menu(s) found. Passed!`));
  }

  console.log(chalk.grey('Check current number of menu headers...'));
  const menuHeadersQuantity = await MenuHeader.count();
  console.log(chalk.green(`${menuHeadersQuantity} menu header(s) found. Passed!`));

  console.log(chalk.grey('Check current number of menu items...'));
  const menuItemsQuantity = await MenuItem.count();
  console.log(chalk.green(`${menuItemsQuantity} menu items(s) found. Passed!`));
}

// Roles fiction
async function rolesFiction() {
  console.log(chalk.grey('Check current number of roles...'));
  const rolesQuantity = await Role.count();

  if (rolesQuantity === 0) {
    console.log(chalk.red('No role found! Do a fiction...'));

    // Create basic roles
    const results = await Role.bulkCreate([
      { uniqueName: 'admin', name: 'Administrator' },
      { uniqueName: 'user', name: 'User' },
      { uniqueName: 'publisher', name: 'Publisher' },
    ]);

    console.log(chalk.green(`${results.length} roles created. Passed!`));
  } else {
    console.log(chalk.green(`${rolesQuantity} role(s) found. Passed!`));
  }
}

// Users fiction
// Mainly for creating super admin
async function userFiction() {
  console.log(chalk.grey('Check current number of users...'));
  const usersQuantity = await User.count();

  if (usersQuantity === 0) {
    console.log(chalk.red('No user found! Do a fiction...'));

    // Get role:admin
    const admin = await Role.findOne({ where: { uniqueName: 'admin' } });

    // Create an admin account
    const user = await User.create({
      email: 'admin@admicro.vn',
      emailConfirmed: 1,
      status: STATUS_ACTIVE,
      password: hashSync('admin', genSaltSync()),
      profile: {
        displayName: 'Admin',
      },
    }, {
      include: [
        { model: UserProfile, as: 'profile' },
      ],
    });

    await UserRole.create({
      userId: user.id,
      roleId: admin.id,
      status: STATUS_ACTIVE,
    });

    console.log(chalk.green(`Super ${user.profile.displayName} is created. Passed!`));
  } else {
    console.log(chalk.green(`${usersQuantity} user(s) found. Passed!`));
  }
}

// Advertisers fiction
async function advertiserFiction() {
  console.log(chalk.grey('Check current number of advertisers...'));
  const advertisersQuantity = await Advertiser.count();

  if (advertisersQuantity === 0) {
    console.log(chalk.red('No advertiser found! Do a fiction...'));

    // Create an admin account
    const advertiser = await Advertiser.create({
      email: 'contact@admicro.vn',
      name: 'Admicro',
      status: STATUS_ACTIVE,
      contact: '0988333777',
      description: 'Đơn vị quảng cáo admicro',
      isEmailReport: false,
      isEmailStatus: false,
      reportInterval: 7,
    });

    console.log(chalk.green(`${advertiser.name} is created. Passed!`));
  } else {
    console.log(chalk.green(`${advertisersQuantity} advertiser(s) found. Passed!`));
  }
}

// Campaigns fiction
async function campaignFiction() {
  console.log(chalk.grey('Check current number of advertisers...'));
  const campaignsQuantity = await Campaign.count();

  if (campaignsQuantity === 0) {
    console.log(chalk.red('No advertiser found! Do a fiction...'));
    // Get id of Advertiser
    const advertiser = await Advertiser.findOne({ where: { email: 'contact@admicro.vn' } });
    // Create an admin account
    const campaign = await Campaign.create({
      name: 'Campaign',
      startTime: new Date(moment().format('YYYY-MM-DD 00:00:00')),
      endTime: new Date(moment(new Date('12-12-2017')).format('YYYY-MM-DD 00:00:00')),
      views: 200000,
      viewPerSession: 20,
      timeResetViewCount: 24,
      weight: 1,
      revenueType: 'cpm',
      expireValueCPM: 2345,
      maxCPMPerDay: 2908,
      status: STATUS_ACTIVE,
      description: 'Campaign của Admicro',
      advertiserId: advertiser.id,
    });

    console.log(chalk.green(`Super ${campaign.name} is created. Passed!`));
  } else {
    console.log(chalk.green(`${campaignsQuantity} campaign(s) found. Passed!`));
  }
}

// Sites fiction
async function siteFiction() {
  console.log(chalk.grey('Check current number of sites...'));
  const sitesQuantity = await Site.count();

  if (sitesQuantity === 0) {
    console.log(chalk.red('No site found! Do a fiction...'));
    // Create an OptionChannel
    const site = await Site.create({
      domain: 'http://bongdaso.com',
      name: 'Bong Da So',
      email: 'contact@bongdaso.com',
      status: STATUS_ACTIVE,
      description: 'Đơn vị đối tác của admicro',
    });

    console.log(chalk.green(`${site.name} is created. Passed!`));
  } else {
    console.log(chalk.green(`${sitesQuantity} site(s) found. Passed!`));
  }
}

// Channels fiction
async function channelFiction() {
  console.log(chalk.grey('Check current number of channels...'));
  const channelsQuantity = await Channel.count();

  if (channelsQuantity === 0) {
    console.log(chalk.red('No channel found! Do a fiction...'));
    // Get id of Site
    const site = await Site.findOne({ where: { domain: 'http://bongdaso.com' } });
    // Create an Channel
    const channel = await Channel.create({
      name: 'Channel',
      status: STATUS_ACTIVE,
      description: 'Channel của Admicro',
      siteId: site.id,
    });

    console.log(chalk.green(`Super ${channel.name} is created. Passed!`));
  } else {
    console.log(chalk.green(`${channelsQuantity} channel(s) found. Passed!`));
  }
}

// OptionChannels fiction
async function optionChannelFiction() {
  console.log(chalk.grey('Check current number of optionChannels...'));
  const optionChannelsQuantity = await OptionChannel.count();

  if (optionChannelsQuantity === 0) {
    console.log(chalk.red('No optionChannel found! Do a fiction...'));
    // Get id of Channel
    const channel = await Channel.findOne({ where: { name: 'Channel' } });
    // Create an OptionChannel
    const optionChannel = await OptionChannel.create({
      logical: 'and',
      type: 'category',
      comparison: '==',
      value: 'kinh-te,van-hoa',
      status: STATUS_ACTIVE,
      channelId: channel.id,
    });
    // // Create an OptionChannel
    // await OptionChannel.create({
    //   logical: 'and',
    //   name: 'Site - pageUrl',
    //   type: 'pageUrl',
    //   comparison: '==',
    //   value: 'http://www.bongdaso.com',
    //   status: STATUS_ACTIVE,
    //   channelId: channel.id,
    // });
    // // Create an OptionChannel
    // await OptionChannel.create({
    //   logical: 'and',
    //   name: 'Site - referingPage',
    //   type: 'referingPage',
    //   comparison: '!=',
    //   value: 'http://www.dantri.com.vn',
    //   status: STATUS_ACTIVE,
    //   channelId: channel.id,
    // });
    // // Create an OptionChannel
    // const optionChannel = await OptionChannel.create({
    //   logical: 'or',
    //   type: 'variable',
    //   comparison: '==',
    //   value: 'http://www.bongdaso.com',
    //   name: 'bongda',
    //   status: STATUS_ACTIVE,
    //   channelId: channel.id,
    // });
    console.log(chalk.green(`${optionChannel.name} is created. Passed!`));
  } else {
    console.log(chalk.green(`${optionChannelsQuantity} optionChannel(s) found. Passed!`));
  }
}

// Placements fiction
async function placementFiction() {
  console.log(chalk.grey('Check current number of placements...'));
  const placementsQuantity = await Placement.count();

  if (placementsQuantity === 0) {
    console.log(chalk.red('No placement found! Do a fiction...'));
    // Get id of Campaign
    const campaign = await Campaign.findOne({ where: { name: 'Campaign' } });
    // Create an OptionChannel
    const placement = await Placement.create({
      name: 'Placement',
      startTime: new Date(moment().format('YYYY-MM-DD 00:00:00')),
      endTime: new Date(moment(new Date('12-12-2017')).format('YYYY-MM-DD 00:00:00')),
      sizeWidth: 300,
      sizeHeight: 300,
      status: STATUS_ACTIVE,
      weight: 1,
      description: 'placement of Bong Da So',
      campaignId: campaign.id,
    });

    console.log(chalk.green(`${placement.name} is created. Passed!`));
  } else {
    console.log(chalk.green(`${placementsQuantity} placement(s) found. Passed!`));
  }
}

// Zones fiction
async function zoneFiction() {
  console.log(chalk.grey('Check current number of zones...'));
  const zonesQuantity = await Zone.count();

  if (zonesQuantity === 0) {
    console.log(chalk.red('No zone found! Do a fiction...'));
    // Get id of Site
    const site = await Site.findOne({ where: { domain: 'http://bongdaso.com' } });
    // Create an Zone
    const zone = await Zone.create({
      name: 'Zone Top',
      width: 300,
      height: 600,
      sizeText: 'Customer (300 x 600)',
      sizeValue: 'custom',
      slot: 3,
      type: 'type-1',
      html: 'html',
      css: 'css',
      status: STATUS_ACTIVE,
      weight: 1,
      delivery: 3,
      targetIFrame: '0',
      isShowBannerAgain: true,
      source: '',
      isShowCampaignAgain: true,
      isShowTextBanner: false,
      characterSet: 'autoDetect',
      supportThirdParty: '0',
      isIncludeDescription: true,
      description: 'Zone Top of Bong Da So',
      siteId: site.id,
    });

    console.log(chalk.green(`${zone.name} is created. Passed!`));
  } else {
    console.log(chalk.green(`${zonesQuantity} zone(s) found. Passed!`));
  }
}

// SharedZone
async function sharedFiction() {
  console.log(chalk.grey('Check current number of share Zone...'));
  const shareQuantity = await Share.count();

  if (shareQuantity === 0) {
    console.log(chalk.red('No share zone found! Do a fiction...'));
    // Get id of Zone
    const zone = await Zone.findOne({ where: { name: 'Zone Top' } });
    // Create an Share
    const share = await Share.create({
      name: 'Share 1',
      html: '<div class="hello"></div>',
      css: 'css',
      description: 'Zone 300x300',
      zoneId: zone.id,
    });

    console.log(chalk.green(`Super ${share.name} is created. Passed!`));
  } else {
    console.log(chalk.green(`${shareQuantity} share Zone(s) found. Passed!`));
  }
}

// SharedPlacement
async function sharedPlacementFiction() {
  console.log(chalk.grey('Check current number of share Zone...'));
  const sharePlacementQuantity = await SharePlacement.count();

  if (sharePlacementQuantity === 0) {
    console.log(chalk.red('No share zone found! Do a fiction...'));
    // Get id of Share
    const share = await Share.findOne({ where: { name: 'Share 1' } });
    // Get id of Share
    const placement = await Placement.findOne({ where: { name: 'Placement' } });
    // Create an Share
    const sharePlacement = await SharePlacement.create({
      shareId: share.id,
      placementId: placement.id,
    });

    console.log(chalk.green(`Super ${sharePlacement.id} is created. Passed!`));
  } else {
    console.log(chalk.green(`${sharePlacementQuantity} share Placement(s) found. Passed!`));
  }
}

// Banners fiction
async function bannerFiction() {
  console.log(chalk.grey('Check current number of banners...'));
  const bannersQuantity = await Banner.count();

  if (bannersQuantity === 0) {
    console.log(chalk.red('No banner found! Do a fiction...'));
    // Get id of Channel
    const channel = await Channel.findOne({ where: { name: 'Channel' } });
    // Create an Banner HTML
    const banner = await Banner.create({
      name: 'Banner Top',
      html: '<script src="https://bs.serving-sys.com/BurstingPipe/adServer.bs?cn=rsb&c=28&pli=18292301&PluID=0&w=980&h=250&ord=[timestamp]&ucm=true&ncu=$$%%TTD_CLK_ESC%%$$"></script> <noscript> <a href="%%TTD_CLK_ESC%%https%3A//bs.serving-sys.com/BurstingPipe/adServer.bs%3Fcn%3Dbrd%26FlightID%3D18292301%26Page%3D%26PluID%3D0%26Pos%3D1596347057" target="_blank"><img src="https://bs.serving-sys.com/BurstingPipe/adServer.bs?cn=bsr&FlightID=18292301&Page=&PluID=0&Pos=1596347057" border=0 width=980 height=250></a> </noscript>',
      status: STATUS_ACTIVE,
      width: 980,
      height: 250,
      keyword: 'dantri',
      imageUrl: '',
      url: '',
      target: '_blank',
      adServer: 'adtech',
      bannerHTMLType: '9',
      isIFrame: true,
      type: 'html',
      weight: 1,
      description: 'Banner Top of Bong Da So',
      isCountView: false,
      isFixIE: false,
      isDefault: false,
      isRelative: false,
      isImpressionsBooked: true,
      isClicksBooked: true,
      isActivationDate: true,
      isExpirationDate: true,
      adStore: '',
      impressionsBooked: -1,
      clicksBooked: -1,
      activationDate: new Date(moment().format('YYYY-MM-DD 00:00:00')),
      expirationDate: new Date(moment(new Date('12-12-2117')).format('YYYY-MM-DD 00:00:00')),
      channelId: channel.id,
    });
    // Create Banner Image
    await Banner.create({
      name: 'Banner Image',
      html: '',
      status: STATUS_ACTIVE,
      width: 300,
      height: 250,
      keyword: 'duhoc',
      imageUrl: 'http://static.manhhailua.com/uploads/1.jp-1479979108671.jpeg',
      url: 'http://kenh14.vn',
      target: '_blank',
      adServer: '',
      bannerHTMLType: '',
      isIFrame: true,
      type: 'img',
      weight: 1,
      description: 'Banner Image',
      isCountView: false,
      isFixIE: false,
      isDefault: false,
      isRelative: false,
      isImpressionsBooked: true,
      isClicksBooked: true,
      isActivationDate: true,
      isExpirationDate: true,
      adStore: '',
      impressionsBooked: -1,
      clicksBooked: -1,
      activationDate: new Date(moment().format('YYYY-MM-DD 00:00:00')),
      expirationDate: new Date(moment(new Date('12-12-2117')).format('YYYY-MM-DD 00:00:00')),
      channelId: channel.id,
    });
    console.log(chalk.green(`${banner.name} is created. Passed!`));
  } else {
    console.log(chalk.green(`${bannersQuantity} zone(s) found. Passed!`));
  }
}

// PlacementBanners Fiction
async function placementBannerFiction() {
  console.log(chalk.grey('Check current number of placementBanners...'));
  const placementBannersQuantity = await PlacementBanner.count();

  if (placementBannersQuantity === 0) {
    console.log(chalk.red('No placementBanner found! Do a fiction...'));
    // Get id of Placement
    const placement = await Placement.findOne({ where: { name: 'Placement' } });
    // Get Id of Banner
    const banner = await Banner.findOne({ where: { name: 'Banner Top' } });
    // Create an Zone
    await PlacementBanner.create({
      placementId: placement.id,
      bannerId: banner.id,
    });

    console.log(chalk.green('placementBanner is created. Passed!'));
  } else {
    console.log(chalk.green(`${placementBannersQuantity} placementBanner(s) found. Passed!`));
  }
}

// ClickImpression Fiction
async function clickImpressionFiction() {
  console.log(chalk.grey('Check current number of clickImpressions...'));
  const clickImpressionsQuantity = await ClickImpression.count();

  if (clickImpressionsQuantity === 0) {
    console.log(chalk.red('No ClickImpression found! Do a fiction...'));
    // Get id of Banner
    const banner = await Banner.findOne({ where: { name: 'Banner Top' } });
    // Create an ClickImpression
    await ClickImpression.create({
      clickUrl: 'https://github.com/sequelize/sequelize/issues/4423',
      impressionUrl: 'http://rsk.quynd.com/resource/banner/40e285a8-2b38-491e-a032-011e117b4d22',
      bannerId: banner.id,
    });

    console.log(chalk.green('ClickImpression is created. Passed!'));
  } else {
    console.log(chalk.green(`${clickImpressionsQuantity} clickImpression(s) found. Passed!`));
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
  await optionChannelFiction();
  await placementFiction();
  await zoneFiction();
  await sharedFiction();
  await bannerFiction();
  await sharedPlacementFiction();
  await placementBannerFiction();
  await clickImpressionFiction();
  console.log(chalk.magenta(`Your application is now ready at http://${host}/`));
}

export default fiction;
