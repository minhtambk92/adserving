import {
  GraphQLInputObjectType as InputObjectType,
} from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Share } from '../../models';

const ShareInputType = new InputObjectType({
  name: 'ShareInputType',
  fields: () => Object.assign(attributeFields(Share, {
    only: ['id', 'name', 'html', 'css', 'description'],
  }), {
    // Additional fields
  }),
});

export default ShareInputType;
