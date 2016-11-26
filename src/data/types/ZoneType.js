import { GraphQLObjectType as ObjectType } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Zone } from '../models';
import zoneBelongsToSite from '../queries/zoneBelongsToSite';
import zoneHasManyPlacements from '../queries/zoneHasManyPlacements';

const ZoneType = new ObjectType({
  name: 'ZoneType',
  fields: () => Object.assign(attributeFields(Zone, {
    // Additional options
  }), {
    // Additional fields
    site: zoneBelongsToSite(),
    placements: zoneHasManyPlacements(),
  }),
});

export default ZoneType;
