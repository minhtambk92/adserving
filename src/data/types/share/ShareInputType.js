import {
  GraphQLInputObjectType as InputObjectType,
  GraphQLInt as IntType,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Share } from '../../models';

const ShareInputType = new InputObjectType({
  name: 'ShareInputType',
  fields: () => Object.assign(attributeFields(Share, {
    only: ['id', 'name', 'html', 'css', 'outputCss', 'classes', 'description'],
  }), {
    // Additional fields
    width: { type: new NonNull(IntType) },
    height: { type: new NonNull(IntType) },
    weight: { type: new NonNull(IntType) },
    type: { type: new NonNull(StringType) },
  }),
});

export default ShareInputType;
