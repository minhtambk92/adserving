import { GraphQLInputObjectType as InputObjectType } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { ZoneSizeType } from '../../models';

const ZoneSizeTypeInputType = new InputObjectType({
  name: 'ZoneSizeTypeInputType',
  fields: () => Object.assign(attributeFields(ZoneSizeType, {
    // Additional options
    only: ['id', 'name', 'width', 'height', 'status'],
  }), {
    // Additional fields
  }),
});

export default ZoneSizeTypeInputType;
