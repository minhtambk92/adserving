import { GraphQLInputObjectType as InputObjectType } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Option } from '../../models';

const OptionInputTypeWithoutId = new InputObjectType({
  name: 'OptionInputTypeWithoutId',
  fields: () => Object.assign(attributeFields(Option, {
    only: ['name', 'value', 'autoLoad', 'status'],
  }), {
    // Additional fields
  }),
});

export default OptionInputTypeWithoutId;
