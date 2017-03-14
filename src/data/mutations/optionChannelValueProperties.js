import {
  GraphQLID as IDType,
} from 'graphql';
import { resolver } from 'graphql-sequelize';
import OptionChannelValuePropertyType from '../types/optionChannelValueProperty/OptionChannelValuePropertyType';
import OptionChannelValuePropertyInputType from '../types/optionChannelValueProperty/OptionChannelValuePropertyInputType';
import OptionChannelValuePropertyInputTypeWithoutId from '../types/optionChannelValueProperty/OptionChannelValuePropertyInputTypeWithoutId';
import { OptionChannelValueProperty } from '../models';

const optionChannelValueProperties = {
  createdOptionChannelValueProperty: {
    type: OptionChannelValuePropertyType,
    args: {
      optionChannelValueProperty: { type: OptionChannelValuePropertyInputTypeWithoutId },
    },
    resolve: resolver(OptionChannelValueProperty, {
      async before(options, args) {
        const opts = options;
        opts.where = options.where || {};
        await OptionChannelValueProperty.create(args.optionChannelValueProperty).then((
          optionChannelValueProperty) => {
          opts.where.id = { $eq: optionChannelValueProperty.id };
        });
        return opts;
      },
    }),
  },
  updatedOptionChannelValueProperty: {
    type: OptionChannelValuePropertyType,
    args: {
      optionChannelValueProperty: { type: OptionChannelValuePropertyInputType },
    },
    resolve: resolver(OptionChannelValueProperty, {
      async before(options, args) {
        const opts = options;
        opts.where = options.where || {};
        opts.where.id = { $eq: args.optionChannelValueProperty.id };
        const newOptionChannelValueProperty = Object.assign({}, args.optionChannelValueProperty);
        delete newOptionChannelValueProperty.id; // Prevent update id

        await OptionChannelValueProperty.update(newOptionChannelValueProperty, {
          where: {
            id: args.optionChannelValueProperty.id,
          },
        });

        return opts;
      },
    }),
  },
  deletedOptionChannelValueProperty: {
    type: OptionChannelValuePropertyType,
    args: {
      id: { type: IDType },
    },
    resolve: resolver(OptionChannelValueProperty, {
      before(options, args) {
        const opts = options;
        opts.where = options.where || {};
        opts.where.id = { $eq: args.id };

        return opts;
      },
      after(result, args) {
        OptionChannelValueProperty.destroy({ where: { id: args.id } });

        return result;
      },
    }),
  },
};

export default optionChannelValueProperties;
