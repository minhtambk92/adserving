/**
 * Created by Manhhailua on 11/7/16.
 */

import chalk from 'chalk';
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

      const inventory = await Menu.create({
        url: '#',
        name: 'Inventory',
        icon: '<i class="fa fa-briefcase"></i>',
        parentId: menu.id,
        order: 2,
        type: TYPE_MENU_ITEM,
      });

      if (inventory) {
        await Menu.bulkCreate([{
          url: '/resource/advertiser',
          name: 'Advertisers',
          icon: '<i class="fa fa-circle-o"></i>',
          parentId: inventory.id,
          order: 0,
          type: TYPE_MENU_ITEM,
        }, {
          url: '/resource/campaign',
          name: 'Campaigns',
          icon: '<i class="fa fa-circle-o"></i>',
          parentId: inventory.id,
          order: 1,
          type: TYPE_MENU_ITEM,
        }, {
          url: '/resource/banner',
          name: 'Banners',
          icon: '<i class="fa fa-circle-o"></i>',
          parentId: inventory.id,
          order: 2,
          type: TYPE_MENU_ITEM,
        }, {
          url: '/resource/placement',
          name: 'Placements',
          icon: '<i class="fa fa-circle-o"></i>',
          parentId: inventory.id,
          order: 3,
          type: TYPE_MENU_ITEM,
        }, {
          url: '/resource/site',
          name: 'Sites',
          icon: '<i class="fa fa-circle-o"></i>',
          parentId: inventory.id,
          order: 4,
          type: TYPE_MENU_ITEM,
        }, {
          url: '/resource/zone',
          name: 'Zones',
          icon: '<i class="fa fa-circle-o"></i>',
          parentId: inventory.id,
          order: 5,
          type: TYPE_MENU_ITEM,
        }]);
      }

      await Menu.create({
        url: '#',
        name: 'Configuration',
        parentId: menu.id,
        order: 3,
        type: TYPE_MENU_HEADER,
      });

      const settings = await Menu.create({
        url: '#',
        name: 'Settings',
        icon: '<i class="fa fa-gears"></i>',
        parentId: menu.id,
        order: 4,
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
        order: 5,
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
        order: 6,
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

async function fiction() {
  console.log(chalk.grey.dim('Start data fictions!'));
  await resourcesFiction();
  await menusFiction();
  await rolesFiction();
  await userFiction();
  console.log(chalk.magenta(`Your application is now ready at http://${host}/`));
}

export default fiction;
