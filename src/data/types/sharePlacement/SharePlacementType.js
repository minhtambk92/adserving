import {
  GraphQLObjectType as ObjectType,
} from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { SharePlacement } from '../../models';

const SharePlacementType = new ObjectType({
  name: 'SharePlacementType',
  fields: () => Object.assign(attributeFields(SharePlacement, {
    // Additional options
  }), {
    // Additional fields
  }),
});

export default SharePlacementType;
