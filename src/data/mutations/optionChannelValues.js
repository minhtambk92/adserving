
import {
  GraphQLID as IDType,
} from 'graphql';
import { resolver } from 'graphql-sequelize';
import OptionChannelValueType from '../types/optionChannelValue/OptionChannelValueType';
import OptionChannelValueInputType from '../types/optionChannelValue/OptionChannelValueInputType';
import OptionChannelValueInputTypeWithoutId from '../types/optionChannelValue/OptionChannelValueInputTypeWithoutId';
import { OptionChannelValue } from '../models';

const optionChannelValues = {
  createdOptionChannelValue: {
    type: OptionChannelValueType,
    args: {
      optionChannelValue: { type: OptionChannelValueInputTypeWithoutId },
    },
    resolve: resolver(OptionChannelValue, {
      async before(options, args) {
        const opts = options;
        opts.where = options.where || {};
        await OptionChannelValue.create(args.optionChannelValue).then((optionChannelValue) => {
          opts.where.id = { $eq: optionChannelValue.id };
        });
        return opts;
      },
    }),
  },
  updatedOptionChannelValue: {
    type: OptionChannelValueType,
    args: {
      optionChannelValue: { type: OptionChannelValueInputType },
    },
    resolve: resolver(OptionChannelValue, {
      async before(options, args) {
        const opts = options;
        opts.where = options.where || {};
        opts.where.id = { $eq: args.optionChannelValue.id };
        const newOptionChannelValue = Object.assign({}, args.optionChannelValue);
        delete newOptionChannelValue.id; // Prevent update id

        await OptionChannelValue.update(newOptionChannelValue, {
          where: {
            id: args.optionChannelValue.id,
          },
        });

        return opts;
      },
    }),
  },
  deletedOptionChannelValue: {
    type: OptionChannelValueType,
    args: {
      id: { type: IDType },
    },
    resolve: resolver(OptionChannelValue, {
      before(options, args) {
        const opts = options;
        opts.where = options.where || {};
        opts.where.id = { $eq: args.id };

        return opts;
      },
      after(result, args) {
        OptionChannelValue.destroy({ where: { id: args.id } });

        return result;
      },
    }),
  },
};

export default optionChannelValues;
