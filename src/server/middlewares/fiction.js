/**
 * Created by Manhhailua on 11/7/16.
 */

/* eslint-disable quotes */

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
  Track,
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
      contact: '0988333888',
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
      endTime: new Date(moment(new Date('12-12-2017')).format('YYYY-MM-DD 23:59:59')),
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
    // Create an OptionChannel
    await OptionChannel.create({
      logical: 'and',
      name: 'Site - pageUrl',
      type: 'pageUrl',
      comparison: '==',
      value: 'http://www.bongdaso.com',
      status: STATUS_ACTIVE,
      channelId: channel.id,
    });
    // Create an OptionChannel
    await OptionChannel.create({
      logical: 'and',
      name: 'Site - referingPage',
      type: 'referingPage',
      comparison: '!=',
      value: 'http://www.dantri.com.vn',
      status: STATUS_ACTIVE,
      channelId: channel.id,
    });
    // Create an OptionChannel
    await OptionChannel.create({
      logical: 'or',
      type: 'variable',
      comparison: '==',
      value: 'http://www.bongdaso.com',
      name: 'bongda',
      status: STATUS_ACTIVE,
      channelId: channel.id,
    });
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
      name: 'Placement 468x90',
      startTime: new Date(moment().format('YYYY-MM-DD 00:00:00')),
      endTime: new Date(moment(new Date('12-12-2017')).format('YYYY-MM-DD 23:59:59')),
      width: 468,
      height: 90,
      status: STATUS_ACTIVE,
      weight: 100,
      description: 'placement of Rong Bay',
      campaignId: campaign.id,
    });

    await Placement.create({
      name: 'Placement2 468x90',
      startTime: new Date(moment().format('YYYY-MM-DD 00:00:00')),
      endTime: new Date(moment(new Date('12-12-2017')).format('YYYY-MM-DD 23:59:59')),
      width: 468,
      height: 90,
      status: STATUS_ACTIVE,
      weight: 80,
      description: 'placement of Rong Bay 2',
      campaignId: campaign.id,
    });

    await Placement.create({
      name: 'Placement 980x250',
      startTime: new Date(moment().format('YYYY-MM-DD 00:00:00')),
      endTime: new Date(moment(new Date('12-12-2017')).format('YYYY-MM-DD 23:59:59')),
      width: 980,
      height: 250,
      status: STATUS_ACTIVE,
      weight: 20,
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
      width: 980,
      height: 250,
      sizeText: 'Customer (300 x 600)',
      sizeValue: 'custom',
      slot: 3,
      type: 'type-1',
      html: 'html',
      css: 'css',
      status: STATUS_ACTIVE,
      weight: 100,
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
      width: 980,
      height: 250,
      weight: 30,
      description: 'Share 980x250',
      zoneId: zone.id,
    });

    // Create an Share
    await Share.create({
      name: 'Share 2',
      html: '<div class="hello"></div>',
      css: 'css',
      width: 468,
      height: 90,
      weight: 70,
      description: 'share 468x90',
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
    const share1 = await Share.findOne({ where: { name: 'Share 1' } });

    const share2 = await Share.findOne({ where: { name: 'Share 2' } });
    // Get id of Share
    const placement1 = await Placement.findOne({ where: { name: 'Placement 980x250' } });

    const placement2 = await Placement.findOne({ where: { name: 'Placement 468x90' } });

    const placement3 = await Placement.findOne({ where: { name: 'Placement2 468x90' } });

    // Create an Share
    const sharePlacement = await SharePlacement.create({
      shareId: share1.id,
      placementId: placement1.id,
    });

    await SharePlacement.create({
      shareId: share2.id,
      placementId: placement2.id,
    });

    await SharePlacement.create({
      shareId: share2.id,
      placementId: placement3.id,
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
      weight: 100,
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
    // Create Banner HTML 2
    await Banner.create({
      name: 'Banner 468x90',
      html: `<script>(function(){var admid='abc';function admGetUrlCk(){return '';} var __admLink='http://dantri.com.vn/'; var doc=document,url=__admLink,ua=navigator.userAgent+'';var videourl='http://adi.admicro.vn/adt/banners/nam2015/22/VietnamAirlines/2350416/091216/468x90.html';var imageurl='http://adi.admicro.vn/adt/banners/nam2015/22/VietnamAirlines/2350416/091216/vnethang12.jpg';var imgwidth=468;var imgheight=90;var html='<div style="position:relative;">'; if(ua.indexOf('Android')!=-1 || ua.indexOf('iPad')!=-1 || ua.indexOf('iPhone')!=-1){html+=('<img src="'+imageurl+'" border="0" /><a href="'+url+'" target="_blank" style="position:absolute; top:0; left:0; width:'+imgwidth+'px; height:'+imgheight+'px; display:block;z-index:9999;"><span></span></a>')}else{html+=('<iframe src="'+videourl+'?url='+(encodeURIComponent(url))+'&admid='+admid+'" width="'+imgwidth+'" frameborder="0" scrolling="no" height="'+imgheight+'" ></iframe>')}html+='</div>';doc.write(html);})();</script>`,
      status: STATUS_ACTIVE,
      width: 468,
      height: 90,
      keyword: 'iPhone, Android, iPad',
      imageUrl: '',
      url: '',
      target: '_blank',
      adServer: 'adtech',
      bannerHTMLType: '9',
      isIFrame: true,
      type: 'html',
      weight: 100,
      description: 'Banner 468x90',
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

    // Create Banner HTML 2
    await Banner.create({
      name: 'Banner 468x90 Rong Bay',
      html: `<script>(function(){ var admid='def';function admGetUrlCk(){return '';} var __admLink='http://dantri.com.vn/';  var doc=document,url=admGetUrlCk()+encodeURIComponent(__admLink),ua=navigator.userAgent+'';var videourl='http://adi.admicro.vn/adt/banners/nam2015/4043/min_html5/2016_12_11/1481443555550/dragonbay/dragonbay_468_90_left.html';var imageurl='http://adi.admicro.vn/adt/banners/nam2015/4043/min_html5/2016_12_11/1481443555550/dragonbay/Images/dragonbay.png';var imgwidth=468;var imgheight=90;var html='<div style="position:relative;">'; if(ua.indexOf('Android')!=-1 || ua.indexOf('iPad')!=-1 || ua.indexOf('iPhone')!=-1){html+=('<img src="' + imageurl + '" border="0" /><a href="' + url + '" target="_blank" style="position:absolute; top:0; left:0; width:' + imgwidth + 'px; height:' + imgheight + 'px; display:block;z-index:9999;"><span></span></a>')}else{html+=('<iframe src="' + videourl + '?url=' + (encodeURIComponent(url)) + '&admid=' + admid + '" width="' + imgwidth + '" frameborder="0" scrolling="no" height="' + imgheight + '" ></iframe>')}html+='</div>';doc.write(html);})();</script>`,
      status: STATUS_ACTIVE,
      width: 468,
      height: 90,
      keyword: 'iPhone, Android, iPad',
      imageUrl: '',
      url: '',
      target: '_blank',
      adServer: 'adtech',
      bannerHTMLType: '9',
      isIFrame: true,
      type: 'html',
      weight: 100,
      description: 'Banner 468x90',
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

    // Create Banner HTML 3
    await Banner.create({
      name: 'Banner 1160x90',
      html: `<script>(function(){var admid='abc';function admGetUrlCk(){return '';} var __admLink='http://dantri.com.vn/'; var doc=document,url=__admLink,ua=navigator.userAgent+'';var videourl='http://adi.admicro.vn/adt/cpc/cpm7k/html/upload/2016/10/ariston_1160x90/1160x90.html';var imageurl='http://adi.admicro.vn/adt/cpc/cpm7k/html/upload/2016/10/ariston_1160x90/1160x250.png';var imgwidth=980;var imgheight=90;var html='<div style="position:relative;">'; if(ua.indexOf('Android')!=-1 || ua.indexOf('iPad')!=-1 || ua.indexOf('iPhone')!=-1){html+=('<img src="'+imageurl+'" border="0" /><a href="'+url+'" target="_blank" style="position:absolute; top:0; left:0; width:'+imgwidth+'px; height:'+imgheight+'px; display:block;z-index:9999;"><span></span></a>')}else{html+=('<iframe src="'+videourl+'?url='+(encodeURIComponent(url))+'&admid='+admid+'" width="'+imgwidth+'" frameborder="0" scrolling="no" height="'+imgheight+'" ></iframe>')}html+='</div>';doc.write(html);})();</script>`,
      status: STATUS_ACTIVE,
      width: 1160,
      height: 90,
      keyword: 'iPhone, Android, iPad',
      imageUrl: '',
      url: '',
      target: '_blank',
      adServer: 'adtech',
      bannerHTMLType: '9',
      isIFrame: true,
      type: 'html',
      weight: 100,
      description: 'Banner 1160x90',
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
      weight: 10,
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
    const placement1 = await Placement.findOne({ where: { name: 'Placement 980x250' } });

    const placement2 = await Placement.findOne({ where: { name: 'Placement 468x90' } });

    const placement3 = await Placement.findOne({ where: { name: 'Placement2 468x90' } });

    // Get Id of Banner
    const banner1 = await Banner.findOne({ where: { name: 'Banner Top' } });

    const banner2 = await Banner.findOne({ where: { name: 'Banner 468x90' } });

    const banner3 = await Banner.findOne({ where: { name: 'Banner 468x90 Rong Bay' } });
    // Create an Zone
    await PlacementBanner.create({
      placementId: placement1.id,
      bannerId: banner1.id,
    });

    await PlacementBanner.create({
      placementId: placement2.id,
      bannerId: banner2.id,
    });

    await PlacementBanner.create({
      placementId: placement3.id,
      bannerId: banner3.id,
    });

    console.log(chalk.green('placementBanner is created. Passed!'));
  } else {
    console.log(chalk.green(`${placementBannersQuantity} placementBanner(s) found. Passed!`));
  }
}

// track Fiction
async function trackFiction() {
  console.log(chalk.grey('Check current number of tracks...'));
  const tracksQuantity = await Track.count();

  if (tracksQuantity === 0) {
    console.log(chalk.red('No track found! Do a fiction...'));
    // Get id of Banner
    const banner = await Banner.findOne({ where: { name: 'Banner Top' } });
    // Create an track
    await Track.create({
      clickUrl: 'https://github.com/sequelize/sequelize/issues/4423',
      impressionUrl: 'http://rsk.quynd.com/resource/banner/40e285a8-2b38-491e-a032-011e117b4d22',
      bannerId: banner.id,
    });

    console.log(chalk.green('track is created. Passed!'));
  } else {
    console.log(chalk.green(`${tracksQuantity} track(s) found. Passed!`));
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
  await trackFiction();
  console.log(chalk.magenta(`Your application is now ready at http://${host}/`));
}

export default fiction;
