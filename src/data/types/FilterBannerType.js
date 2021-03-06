/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLNonNull as NonNull,
} from 'graphql';

const FilterBannerType = new ObjectType({
  name: 'FilterBannerType',
  fields: {
    id: { type: new NonNull(ID) },
    filterId: { type: new NonNull(ID) },
    placementBannerId: { type: new NonNull(ID) },
  },
});

export default FilterBannerType;
