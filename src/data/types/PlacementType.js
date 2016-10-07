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
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
} from 'graphql';

const PlacementType = new ObjectType({
  name: 'Placement',
  fields: {
    id: { type: new NonNull(ID) },
    name: { type: StringType },
    campaignName: { type: StringType },
    description: { type: StringType },
    size: { type: StringType },
    weight: { type: StringType },
    location: { type: StringType },
    startTime: { type: IntType },
    endTime: { type: IntType },


  },
});

export default PlacementType;
