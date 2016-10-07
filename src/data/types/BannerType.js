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
  GraphQLInt as IntType,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';

const BannerType = new ObjectType({
  name: 'Banner',
  fields: {
    id: {type: new NonNull(ID)},
    contentType: {type: StringType},
    name: {type: StringType},
    fileUrl: {type: StringType},
    urlClick: {type: StringType},
    htmlTemplate: {type: StringType},
    width: {type: IntType},
    height: {type: IntType},
    weidth: {type: StringType},
    location: {type: StringType},
    urlTarget: {type: StringType},
    description: {type: StringType},
    keyword: {type: StringType},
    typeBanner: {type: IntType},
    startTime: {type: DateType},
    endTime: {type: DateType},
    activationTime: {type: IntType},
    expirationTime: {type: IntType},
    bannerViews: {type: IntType},
    bannerClicks: {type: IntType},
    isCountViews: {type: IntType},
    isDefault: {type: IntType},
    status: {type: StringType},
  },
});

export default BannerType;

