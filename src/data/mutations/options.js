
import {
  GraphQLID as IDType,
} from 'graphql';
import { resolver } from 'graphql-sequelize';
import OptionType from '../types/option/OptionType';
import OptionInputType from '../types/option/OptionInputType';
import OptionInputTypeWithoutId from '../types/option/OptionInputTypeWithoutId';
import { Option } from '../models';

const options = {
  createdOption: {
    type: OptionType,
    args: {
      option: { type: OptionInputTypeWithoutId },
    },
    resolve: resolver(Option, {
      /* eslint-disable no-shadow */
      async before(options, args) {
        /* eslint-enable no-shadow */
        const opts = options;
        opts.where = options.where || {};
        await Option.create(args.option).then((option) => {
          opts.where.id = { $eq: option.id };
        });
        return opts;
      },
    }),
  },
  updatedOption: {
    type: OptionType,
    args: {
      option: { type: OptionInputType },
    },
    resolve: resolver(Option, {
      /* eslint-disable no-shadow */
      async before(options, args) {
        /* eslint-enable no-shadow */
        const opts = options;
        opts.where = options.where || {};
        opts.where.id = { $eq: args.option.id };
        const newOption = Object.assign({}, args.option);
        delete newOption.id; // Prevent update id

        await Option.update(newOption, {
          where: {
            id: args.option.id,
          },
        });

        return opts;
      },
    }),
  },
  deletedOption: {
    type: OptionType,
    args: {
      id: { type: IDType },
    },
    resolve: resolver(Option, {
      /* eslint-disable no-shadow */
      before(options, args) {
        /* eslint-enable no-shadow */
        const opts = options;
        opts.where = options.where || {};
        opts.where.id = { $eq: args.id };

        return opts;
      },
      after(result, args) {
        Option.destroy({ where: { id: args.id } });

        return result;
      },
    }),
  },
};

export default options;
