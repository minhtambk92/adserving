/**
 * Created by Manhhailua on 10/8/16.
 */

import {
  GraphQLList as List,
  GraphQLString as StringType,
} from 'graphql';
import { resolver, defaultListArgs } from 'graphql-sequelize';
import PermissionType from '../types/PermissionType';
import { Permission } from '../models';

const permissions = {
  type: new List(PermissionType),
  args: Object.assign(defaultListArgs(), {
    // additional params
  }),
  resolve: resolver(Permission),
};

export default permissions;
