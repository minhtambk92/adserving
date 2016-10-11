/**
 * Created by Manhhailua on 10/8/16.
 */

import {
  GraphQLObjectType as ObjectType,
} from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Channel } from '../models';

const ChannelType = new ObjectType({
  name: 'Channel',
  fields: Object.assign(attributeFields(Channel, {
    // Additional options
  }), {
    // Additional fields
  }),
});

export default ChannelType;
