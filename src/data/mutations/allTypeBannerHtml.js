
import {
  GraphQLID as IDType,
} from 'graphql';
import { resolver } from 'graphql-sequelize';
import TypeBannerHtmlType from '../types/typeBannerHtml/TypeBannerHtmlType';
import TypeBannerHtmlInputType from '../types/typeBannerHtml/TypeBannerHtmlInputType';
import TypeBannerHtmlInputTypeWithoutId from '../types/typeBannerHtml/TypeBannerHtmlInputTypeWithoutId';
import { TypeBannerHtml } from '../models';

const typeAllBannerHtml = {
  createdTypeBannerHtml: {
    type: TypeBannerHtmlType,
    args: {
      typeBannerHtml: { type: TypeBannerHtmlInputTypeWithoutId },
    },
    resolve: resolver(TypeBannerHtml, {
      async before(options, args) {
        const opts = options;
        opts.where = options.where || {};
        /* eslint-disable no-shadow */
        await TypeBannerHtml.create(args.typeBannerHtml).then(typeBannerHtml => {
          /* eslint-enable no-shadow */
          opts.where.id = { $eq: typeBannerHtml.id };
        });
        return opts;
      },
    }),
  },
  updatedTypeBannerHtml: {
    type: TypeBannerHtmlType,
    args: {
      typeBannerHtml: { type: TypeBannerHtmlInputType },
    },
    resolve: resolver(TypeBannerHtml, {
      async before(options, args) {
        const opts = options;
        opts.where = options.where || {};
        opts.where.id = { $eq: args.typeBannerHtml.id };
        const newTypeBannerHtml = Object.assign({}, args.typeBannerHtml);
        delete newTypeBannerHtml.id; // Prevent update id

        await TypeBannerHtml.update(newTypeBannerHtml, {
          where: {
            id: args.typeBannerHtml.id,
          },
        });

        return opts;
      },
    }),
  },
  deletedTypeBannerHtml: {
    type: TypeBannerHtmlType,
    args: {
      id: { type: IDType },
    },
    resolve: resolver(TypeBannerHtml, {
      before(options, args) {
        const opts = options;
        opts.where = options.where || {};
        opts.where.id = { $eq: args.id };

        return opts;
      },
      after(result, args) {
        TypeBannerHtml.destroy({ where: { id: args.id } });

        return result;
      },
    }),
  },
};

export default typeAllBannerHtml;
