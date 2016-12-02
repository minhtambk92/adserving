import {
  GraphQLInputObjectType as InputObjectType,
} from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { ShareZone } from '../../models';

const ShareZoneInputType = new InputObjectType({
  name: 'ShareZoneInputType',
  fields: () => Object.assign(attributeFields(ShareZone, {
    only: ['id', 'name', 'height', 'width', 'description', 'zoneId'],
  }), {
    // Additional fields
  }),
});

export default ShareZoneInputType;
