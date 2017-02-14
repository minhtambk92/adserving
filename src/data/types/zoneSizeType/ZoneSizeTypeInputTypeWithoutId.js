import { GraphQLInputObjectType as InputObjectType } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { ZoneSizeType } from '../../models';

const ZoneSizeTypeInputTypeWithoutId = new InputObjectType({
  name: 'ZoneSizeTypeInputTypeWithoutId',
  fields: () => Object.assign(attributeFields(ZoneSizeType, {
    only: ['name', 'width', 'height', 'status', 'userId'],
  }), {
    // Additional fields
  }),
});

export default ZoneSizeTypeInputTypeWithoutId;
