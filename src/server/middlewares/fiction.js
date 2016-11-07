/**
 * Created by Manhhailua on 11/7/16.
 */

import { genSaltSync, hashSync } from 'bcrypt';
import {
  STATUS_ACTIVE,
} from '../../constants';
import {
  Role,
  User,
  UserProfile,
  UserRole,
} from '../../data/models';
import { host } from '../../config';

/* eslint-disable no-console */

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
      const admin = await Role.findOne({ uniqueName: 'admin' });

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
  await rolesFiction();
  await userFiction();
  console.log(`Your application is now ready at http://${host}/`);
}

/* eslint-enable no-console */

export default fiction;
