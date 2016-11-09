/**
 * Created by Manhhailua on 11/7/16.
 */

import { genSaltSync, hashSync } from 'bcrypt';
import {
  STATUS_ACTIVE,
} from '../../constants';
import {
  Resource,
  Role,
  User,
  UserProfile,
  UserRole,
} from '../../data/models';
import { host } from '../../config';

/* eslint-disable no-console */

// Resources fiction
async function resourcesFiction() {
  console.log('Check current number of resources...');
  await Resource.count().then(async(quantity) => {
    if (quantity === 0) {
      console.log('No resource found! Do a fiction...');

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

      console.log(`${results.length} resources created. Passed!`);
    } else {
      console.log(`${quantity} resources(s) found. Passed!`);
    }
  });
}

// Roles fiction
async function rolesFiction() {
  console.log('Check current number of roles...');
  await Role.count().then(async(quantity) => {
    if (quantity === 0) {
      console.log('No role found! Do a fiction...');

      // Create basic roles
      const results = await Role.bulkCreate([
        { uniqueName: 'admin', name: 'Administrator' },
        { uniqueName: 'user', name: 'User' },
        { uniqueName: 'publisher', name: 'Publisher' },
      ]);

      console.log(`${results.length} roles created. Passed!`);
    } else {
      console.log(`${quantity} role(s) found. Passed!`);
    }
  });
}

// Users fiction
// Mainly for creating super admin
async function userFiction() {
  console.log('Check current number of users...');
  await User.count().then(async(quantity) => {
    if (quantity === 0) {
      console.log('No user found! Do a fiction...');

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

      console.log(`Super ${user.profile.displayName} is created. Passed!`);
    } else {
      console.log(`${quantity} user(s) found. Passed!`);
    }
  });
}

async function fiction() {
  console.log('Start data fictions!');
  await resourcesFiction();
  await rolesFiction();
  await userFiction();
  console.log(`Your application is now ready at http://${host}/`);
}

/* eslint-enable no-console */

export default fiction;
