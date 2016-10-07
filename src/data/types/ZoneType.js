/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';

const ZoneType = new ObjectType({
  name: 'Zone',
  fields: {
    id: { type: new NonNull(ID) },
    userId: { type: new NonNull(ID) },
    name: { type: StringType },
    description: { type: StringType },
    type: { type: StringType },
    html: { type: StringType },
    css: { type: StringType },
    slot: { type: StringType },
  },
});
export default ZoneType;
