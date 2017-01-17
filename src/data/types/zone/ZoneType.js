import { GraphQLObjectType as ObjectType } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Zone } from '../../models';
import zoneBelongsToSite from '../../queries/zone/zoneBelongsToSite';
import zoneHasManyShares from '../../queries/zone/zoneHasManyShares';
import zoneBelongsToZoneType from '../../queries/zone/zoneBelongsToZoneType';
import zoneBelongsToZoneSizeType from '../../queries/zone/zoneBelongsToZoneSizeType';

const ZoneType = new ObjectType({
  name: 'ZoneType',
  fields: () => Object.assign(attributeFields(Zone, {
    // Additional options
  }), {
    // Additional fields
    site: zoneBelongsToSite(),
    shares: zoneHasManyShares(),
    zoneType: zoneBelongsToZoneType(),
    zoneSizeType: zoneBelongsToZoneSizeType(),
  }),
});

export default ZoneType;
