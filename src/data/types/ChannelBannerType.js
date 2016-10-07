/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
import {GraphQLObjectType as ObjectType, GraphQLID as ID, GraphQLNonNull as NonNull,} from 'graphql';

const ChannelBannerType = new ObjectType({
  name: 'ChannelBannerType',
  fields: {
    id: {type: new NonNull(ID)},
    channelId: {type: new NonNull(ID)},
    bannerId: {type: new NonNull(ID)},


  },
});
export default ChannelBannerType;
