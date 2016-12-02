import { GraphQLObjectType as ObjectType } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Zone } from '../../models';
import zoneBelongsToSite from '../../queries/zone/zoneBelongsToSite';
import zoneHasManyPlacements from '../../queries/zone/zoneHasManyPlacements';
import zoneHasManyShareZones from '../../queries/zone/zoneHasManyShareZones';

const ZoneType = new ObjectType({
  name: 'ZoneType',
  fields: () => Object.assign(attributeFields(Zone, {
    // Additional options
  }), {
    // Additional fields
    site: zoneBelongsToSite(),
    placements: zoneHasManyPlacements(),
    shareZones: zoneHasManyShareZones(),
  }),
});

export default ZoneType;
