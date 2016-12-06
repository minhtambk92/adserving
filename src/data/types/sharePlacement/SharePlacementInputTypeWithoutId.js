import {
  GraphQLInputObjectType as InputObjectType,
} from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { SharePlacement } from '../../models';

const SharePlacementInputTypeWithoutId = new InputObjectType({
  name: 'SharePlacementInputTypeWithoutId',
  fields: () => Object.assign(attributeFields(SharePlacement, {
    only: ['placementId', 'shareId'],
  }), {
    // Additional fields
  }),
});

export default SharePlacementInputTypeWithoutId;
