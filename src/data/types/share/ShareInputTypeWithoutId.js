import {
  GraphQLInputObjectType as InputObjectType,
} from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Share } from '../../models';

const ShareInputTypeWithoutId = new InputObjectType({
  name: 'ShareInputTypeWithoutId',
  fields: () => Object.assign(attributeFields(Share, {
    only: ['name', 'html', 'css', 'outputCss', 'width', 'height', 'weight', 'classes', 'type', 'description', 'zoneId'],
  }), {
    // Additional fields
  }),
});

export default ShareInputTypeWithoutId;
