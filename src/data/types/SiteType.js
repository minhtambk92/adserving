/**
 * Created by Manhhailua on 10/8/16.
 */

import {
  GraphQLObjectType as ObjectType,
} from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Site } from '../models';
import siteHasManyZones from '../queries/siteHasManyZones';

const SiteType = new ObjectType({
  name: 'Site',
  fields: () => Object.assign(attributeFields(Site, {
    // Additional options
  }), {
    zones: siteHasManyZones(),
  }),
});

export default SiteType;
