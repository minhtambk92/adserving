
import {
  GraphQLID as IDType,
} from 'graphql';
import { resolver } from 'graphql-sequelize';
import OptionChannelTypeType from '../types/optionChannelType/OptionChannelTypeType';
import OptionChannelTypeInputType from '../types/optionChannelType/OptionChannelTypeInputType';
import OptionChannelTypeInputTypeWithoutId from '../types/optionChannelType/OptionChannelTypeInputTypeWithoutId';
import { OptionChannelType } from '../models';

const optionChannelTypes = {
  createdOptionChannelType: {
    type: OptionChannelTypeType,
    args: {
      optionChannelType: { type: OptionChannelTypeInputTypeWithoutId },
    },
    resolve: resolver(OptionChannelType, {
      async before(options, args) {
        const opts = options;
        opts.where = options.where || {};
        await OptionChannelType.create(args.optionChannelType).then(optionChannelType => {
          opts.where.id = { $eq: optionChannelType.id };
        });
        return opts;
      },
    }),
  },
  updatedOptionChannelType: {
    type: OptionChannelTypeType,
    args: {
      optionChannelType: { type: OptionChannelTypeInputType },
    },
    resolve: resolver(OptionChannelType, {
      async before(options, args) {
        const opts = options;
        opts.where = options.where || {};
        opts.where.id = { $eq: args.optionChannelType.id };
        const newOptionChannelType = Object.assign({}, args.optionChannelType);
        delete newOptionChannelType.id; // Prevent update id

        await OptionChannelType.update(newOptionChannelType, {
          where: {
            id: args.optionChannelType.id,
          },
        });

        return opts;
      },
    }),
  },
  deletedOptionChannelType: {
    type: OptionChannelTypeType,
    args: {
      id: { type: IDType },
    },
    resolve: resolver(OptionChannelType, {
      before(options, args) {
        const opts = options;
        opts.where = options.where || {};
        opts.where.id = { $eq: args.id };

        return opts;
      },
      after(result, args) {
        OptionChannelType.destroy({ where: { id: args.id } });

        return result;
      },
    }),
  },
};

export default optionChannelTypes;
