/**
 * Created by Manhhailua on 10/8/16.
 */

import {
  GraphQLObjectType as ObjectType,
} from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Site } from '../../models';
import siteHasManyZones from '../../queries/site/siteHasManyZones';
import siteHasManyChanels from '../../queries/site/siteHasManyChannels';

const SiteType = new ObjectType({
  name: 'SiteType',
  fields: () => Object.assign(attributeFields(Site, {
    // Additional options
  }), {
    // Additional fields
    zones: siteHasManyZones(),
    channels: siteHasManyChanels(),
  }),
});

export default SiteType;
