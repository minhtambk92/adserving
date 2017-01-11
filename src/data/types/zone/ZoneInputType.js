/**
 * Created by Manhhailua on 10/11/16.
 */

import {
  GraphQLInputObjectType as InputObjectType,
} from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Zone } from '../../models';

const ZoneInputType = new InputObjectType({
  name: 'ZoneInputType',
  fields: () => Object.assign(attributeFields(Zone, {
    // Additional options
    only: [
      'id',
      'siteId',
      'name',
      'zoneTypeId',
      'html',
      'css',
      'slot',
      'width',
      'height',
      'sizeText',
      'sizeValue',
      'targetIFrame',
      'isShowBannerAgain',
      'source',
      'isShowCampaignAgain',
      'isShowTextBanner',
      'characterSet',
      'supportThirdParty',
      'isIncludeDescription',
      'status',
      'description',
    ],
    allowNull: true,
  }), {
    // Additional fields
  }),
});

export default ZoneInputType;
