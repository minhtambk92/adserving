/**
 * Created by Manhhailua on 10/17/16.
 */

import { resolver, defaultListArgs } from 'graphql-sequelize';
import { OptionChannelValueProperty } from '../../models';
import OptionChannelValueType from '../../types/optionChannelValue/OptionChannelValueType';

const optionChannelValuePropertyBelongsToOptionChannelValue = () => ({
  type: OptionChannelValueType,
  args: Object.assign(defaultListArgs(), {
    // Additional params
  }),
  resolve: resolver(OptionChannelValueProperty.optionChannelValue, {
    before(options) {
      const opts = options;
      opts.order = options.order || [];
      opts.order.push(['createdAt', 'DESC']);
      return opts;
    },
  }),
});

export default optionChannelValuePropertyBelongsToOptionChannelValue;
