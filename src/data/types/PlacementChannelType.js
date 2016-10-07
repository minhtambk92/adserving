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
  GraphQLNonNull as NonNull,
} from 'graphql';

const PlacementChannelType = new ObjectType({
  name: 'PlacementChannel',
  fields: {
    id: { type: new NonNull(ID) },
    placementId: { type: new NonNull(ID) },
    zoneId: { type: new NonNull(ID) },


  },
});
export default PlacementChannelType;
