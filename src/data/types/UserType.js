/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import { GraphQLObjectType as ObjectType } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { User } from '../models';

const UserType = new ObjectType({
  name: 'UserType',
  fields: Object.assign(attributeFields(User, {
    // Additional options
    exclude: ['password'],
  }), {
    // Additional fields
  }),
});

export default UserType;
