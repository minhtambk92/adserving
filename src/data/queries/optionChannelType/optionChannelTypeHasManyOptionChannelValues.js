/**
 * Created by Quy on 11/15/2016.
 */
import { GraphQLList as List } from 'graphql';
import { resolver, defaultListArgs } from 'graphql-sequelize';
import { OptionChannelType } from '../../models';
import OptionChannelValueType from '../../types/optionChannelValue/OptionChannelValueType';

const optionChannelTypeHasManyOptionChannelValues = () => ({
  type: new List(OptionChannelValueType),
  args: Object.assign(defaultListArgs(), {
    // Additional params
  }),
  resolve: resolver(OptionChannelType.optionChannelvalues, {
    before(options) {
      const opts = options;
      opts.order = options.order || [];
      opts.order.push(['createdAt', 'DESC']);
      return opts;
    },
  }),
});

export default optionChannelTypeHasManyOptionChannelValues;
