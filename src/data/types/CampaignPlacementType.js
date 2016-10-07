/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
import {GraphQLObjectType as ObjectType, GraphQLID as ID, GraphQLNonNull as NonNull,} from 'graphql';

const CampaignPlacementType = new ObjectType({
  name: 'CampaignPlacement',
  fields: {
    id: {type: new NonNull(ID)},
    campaignId: {type: new NonNull(ID)},
    placementId: {type: new NonNull(ID)},


  },
});
export default CampaignPlacementType;
