import {
  GraphQLInputObjectType as InputObjectType,
} from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { SharePlacement } from '../../models';

const SharePlacementInputType = new InputObjectType({
  name: 'SharePlacementInputType',
  fields: () => Object.assign(attributeFields(SharePlacement, {
    only: ['id', 'placementId', 'shareId'],
  }), {
    // Additional fields
  }),
});

export default SharePlacementInputType;
