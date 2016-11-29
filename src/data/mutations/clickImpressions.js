
import {
  GraphQLID as IDType,
} from 'graphql';
import { resolver } from 'graphql-sequelize';
import ClickImpressionType from '../types/clickImpression/ClickImpressionType';
import ClickImpressionInputType from '../types/clickImpression/ClickImpressionInputType';
import ClickImpressionInputTypeWithoutId from '../types/clickImpression/ClickImpressionInputTypeWithoutId';
import { ClickImpression } from '../models';

const clickImpressions = {
  createdClickImpression: {
    type: ClickImpressionType,
    args: {
      clickImpression: { type: ClickImpressionInputTypeWithoutId },
    },
    resolve: resolver(ClickImpression, {
      async before(options, args) {
        const opts = options;
        opts.where = options.where || {};
        await ClickImpression.create(args.clickImpression).then(clickImpression => {
          opts.where.id = { $eq: clickImpression.id };
        });
        return opts;
      },
    }),
  },
  updatedClickImpression: {
    type: ClickImpressionType,
    args: {
      clickImpression: { type: ClickImpressionInputType },
    },
    resolve: resolver(ClickImpression, {
      async before(options, args) {
        const opts = options;
        opts.where = options.where || {};
        opts.where.id = { $eq: args.clickImpression.id };
        const newClickImpression = Object.assign({}, args.clickImpression);
        delete newClickImpression.id; // Prevent update id

        await ClickImpression.update(newClickImpression, {
          where: {
            id: args.clickImpression.id,
          },
        });

        return opts;
      },
    }),
  },
  deletedClickImpression: {
    type: ClickImpressionType,
    args: {
      id: { type: IDType },
    },
    resolve: resolver(ClickImpression, {
      before(options, args) {
        const opts = options;
        opts.where = options.where || {};
        opts.where.id = { $eq: args.id };

        return opts;
      },
      after(result, args) {
        ClickImpression.destroy({ where: { id: args.id } });

        return result;
      },
    }),
  },
};

export default clickImpressions;
