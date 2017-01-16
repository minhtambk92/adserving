import {
  GraphQLObjectType as ObjectType,
} from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Share } from '../../models';
import shareBelongsToZone from '../../queries/share/shareBelongsToZone';
import shareBelongsToManyPlacement from '../../queries/share/shareBelongsToManyPlacements';

const ShareType = new ObjectType({
  name: 'ShareType',
  fields: () => Object.assign(attributeFields(Share, {
    // Additional options
  }), {
    // Additional fields
    zone: shareBelongsToZone(),
    placements: shareBelongsToManyPlacement(),
  }),
});

export default ShareType;
