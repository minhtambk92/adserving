import {
  GraphQLInputObjectType as InputObjectType,
  GraphQLInt as IntType,
  GraphQLString as StringType,
} from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Share } from '../../models';

const ShareInputType = new InputObjectType({
  name: 'ShareInputType',
  fields: () => Object.assign(attributeFields(Share, {
    only: ['id', 'name', 'html', 'css', 'weight', 'classes', 'description'],
  }), {
    // Additional fields
    width: { type: IntType },
    height: { type: IntType },
    type: { type: StringType },
  }),
});

export default ShareInputType;
