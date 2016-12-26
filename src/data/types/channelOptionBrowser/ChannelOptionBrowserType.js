/**
 * Created by Manhhailua on 10/8/16.
 */

import {
  GraphQLObjectType as ObjectType,
} from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { ChannelOptionBrowser } from '../../models';

const ChannelOptionBrowserType = new ObjectType({
  name: 'ChannelOptionBrowserType',
  fields: () => Object.assign(attributeFields(ChannelOptionBrowser, {
    // Additional options
  }), {
    // Additional fields
  }),
});

export default ChannelOptionBrowserType;
