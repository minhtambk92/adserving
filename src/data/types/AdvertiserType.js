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
  GraphQLNonNull as NonNull
} from "graphql";

const AdvertiserType = new ObjectType({
  name: 'Advertiser',
  fields: {
    id: {type: new NonNull(ID)},
    email: {type: StringType},
    name: {type: StringType},
    contact: {type: StringType},
    description: {type: StringType},
    dateLastOnline: {type: DateType},
    status: {type: StringType}
  },
});

export default AdvertiserType;
