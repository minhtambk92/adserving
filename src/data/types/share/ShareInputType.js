import {
  GraphQLInputObjectType as InputObjectType,
  GraphQLInt as IntType,
} from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Share } from '../../models';

const ShareInputType = new InputObjectType({
  name: 'ShareInputType',
  fields: () => Object.assign(attributeFields(Share, {
    only: ['id', 'name', 'html', 'css', 'weight', 'description'],
  }), {
    // Additional fields
    width: { type: IntType },
    height: { type: IntType },
  }),
});

export default ShareInputType;
