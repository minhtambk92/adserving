import {
  GraphQLInputObjectType as InputObjectType,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLBoolean as BooleanType,
} from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Option } from '../../models';

const OptionInputType = new InputObjectType({
  name: 'OptionInputType',
  fields: () => Object.assign(attributeFields(Option, {
    // Additional options
    only: ['id'],
  }), {
    // Additional fields
    name: { type: new NonNull(StringType) },
    value: { type: new NonNull(StringType) },
    autoLoad: { type: new NonNull(BooleanType) },
    status: { type: new NonNull(StringType) },
  }),
});

export default OptionInputType;
