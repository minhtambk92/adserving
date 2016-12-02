import {
  GraphQLInputObjectType as InputObjectType,
} from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { ShareZone } from '../../models';

const ShareZoneInputTypeWithoutId = new InputObjectType({
  name: 'ShareZoneInputTypeWithoutId',
  fields: () => Object.assign(attributeFields(ShareZone, {
    only: ['name', 'width', 'height', 'description', 'zoneId'],
  }), {
    // Additional fields
  }),
});

export default ShareZoneInputTypeWithoutId;
