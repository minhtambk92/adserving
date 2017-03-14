/**
 * Created by Quy on 11/15/2016.
 */
import { GraphQLList as List } from 'graphql';
import { resolver, defaultListArgs } from 'graphql-sequelize';
import { OptionChannelValue } from '../../models';
import OptionChannelValuePropertyType from '../../types/optionChannelValueProperty/OptionChannelValuePropertyType';

const optionChannelValueHasManyOptionChannelValueProperties = () => ({
  type: new List(OptionChannelValuePropertyType),
  args: Object.assign(defaultListArgs(), {
    // Additional params
  }),
  resolve: resolver(OptionChannelValue.optionChannelValueProperties, {
    before(options) {
      const opts = options;
      opts.order = options.order || [];
      opts.order.push(['createdAt', 'DESC']);
      return opts;
    },
  }),
});

export default optionChannelValueHasManyOptionChannelValueProperties;
