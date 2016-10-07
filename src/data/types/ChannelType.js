/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
var DateType = require('graphql-date');
import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';

const ChannelType = new ObjectType({
  name: 'Channel',
  fields: {
    id: { type: new NonNull(ID) },
    userId: { type: new NonNull(ID) },
    name: { type: StringType },
    description: { type: StringType },
    status: { type: StringType },
    compiledLimitation: { type: StringType },
    updated: { type: DateType },
    aclsUpdated: { type: DateType },

  },
});

export default ChannelType;
