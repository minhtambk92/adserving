import {
  GraphQLObjectType as ObjectType,
} from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { ShareZone } from '../../models';
import shareZoneBelongsToZone from '../../queries/shareZone/shareZoneBelongsToZone';

const ShareZoneType = new ObjectType({
  name: 'ShareZoneType',
  fields: () => Object.assign(attributeFields(ShareZone, {
    // Additional options
  }), {
    // Additional fields
    zone: shareZoneBelongsToZone(),
  }),
});

export default ShareZoneType;
