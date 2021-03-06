/**
 * Created by Manhhailua on 10/11/16.
 */

import {
  GraphQLID as IDType,
} from 'graphql';
import { resolver } from 'graphql-sequelize';
import SiteType from '../types/site/SiteType';
import SiteInputType from '../types/site/SiteInputType';
import SiteInputTypeWithoutId from '../types/site/SiteInputTypeWithoutId';
import { Site } from '../models';

const sites = {
  createdSite: {
    type: SiteType,
    args: {
      site: { type: SiteInputTypeWithoutId },
    },
    resolve: resolver(Site, {
      async before(options, args) {
        const opts = options;
        opts.where = options.where || {};
        await Site.create(args.site).then((site) => {
          opts.where.id = { $eq: site.id };
        });
        return opts;
      },
    }),
  },
  updatedSite: {
    type: SiteType,
    args: {
      site: { type: SiteInputType },
    },
    resolve: resolver(Site, {
      async before(options, args) {
        const opts = options;
        opts.where = options.where || {};
        opts.where.id = { $eq: args.site.id };

        const newSite = Object.assign({}, args.site);
        delete newSite.id; // Prevent update id

        await Site.update(newSite, {
          where: {
            id: args.site.id,
          },
        });

        return opts;
      },
    }),
  },
  deletedSite: {
    type: SiteType,
    args: {
      id: { type: IDType },
    },
    resolve: resolver(Site, {
      before(options, args) {
        const opts = options;
        opts.where = options.where || {};
        opts.where.id = { $eq: args.id };

        return opts;
      },
      after(result, args) {
        Site.destroy({ where: { id: args.id } });

        return result;
      },
    }),
  },
};

export default sites;
