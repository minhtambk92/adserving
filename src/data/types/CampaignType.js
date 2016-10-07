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
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
} from 'graphql';

const CampaignType = new ObjectType({
  name: 'Campaign',
  fields: {
    id: { type: new NonNull(ID) },
    advertiserId: { type: new NonNull(ID) },
    userId: { type: new NonNull(ID) },
    name: { type: StringType },
    activeTime: { type: DateType },
    expireTime: { type: DateType },
    views: { type: IntType },
    clicks: { type: IntType },
    weight: { type: StringType },
    targetImpression: { type: IntType },
    targetClick: { type: IntType },
    targetConversion: { type: IntType },
    revenue: { Type: IntType },
    revenueType: { Type: IntType },
    status: { type: StringType },
    hostedViews: { type: IntType },
    hostedClick: { type: IntType },
    viewWindow: { type: IntType },
    clickWindow: { type: IntType },
    setMaxCpm: { type: IntType },
    setPerDayCpm: { type: IntType },

  },
});

export default CampaignType;
