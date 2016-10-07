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
GraphQLBoolean as BooleanType,
  GraphQLNonNull as NonNull
} from "graphql";

const OptionType = new ObjectType({
  name: 'Option',
  fields: {
    id: {type: new NonNull(ID)},
    name: {type: StringType},
    value: {type: StringType},
    autoLoad: {type: BooleanType},

  },
});

export default OptionType;
