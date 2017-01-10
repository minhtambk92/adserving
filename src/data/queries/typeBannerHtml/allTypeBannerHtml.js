/**
 * Created by Manhhailua on 10/8/16.
 */

import {
  GraphQLList as List,
} from 'graphql';
import { resolver, defaultListArgs } from 'graphql-sequelize';
import TypeBannerHtmlType from '../../types/typeBannerHtml/TypeBannerHtmlType';
import { TypeBannerHtml } from '../../models';

const allTypeBannerHtml = {
  type: new List(TypeBannerHtmlType),
  args: Object.assign(defaultListArgs(), {
    // Additional params
  }),
  resolve: resolver(TypeBannerHtml, {
    before(options) {
      const opts = options;
      opts.order = options.order || [];
      opts.order.push(['createdAt', 'DESC']);
      return opts;
    },
  }),
};

export default allTypeBannerHtml;
