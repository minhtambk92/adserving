/**
 * Created by Manhhailua on 10/17/16.
 */

import { resolver, defaultListArgs } from 'graphql-sequelize';
import { OptionChannelValue } from '../../models';
import OptionChannelTypeType from '../../types/optionChannelType/OptionChannelTypeType';

const optionChannelValueBelongsToOptionChannelType = () => ({
  type: OptionChannelTypeType,
  args: Object.assign(defaultListArgs(), {
    // Additional params
  }),
  resolve: resolver(OptionChannelValue.optionChannelType, {
    before(options) {
      const opts = options;
      opts.order = options.order || [];
      opts.order.push(['createdAt', 'DESC']);
      return opts;
    },
  }),
});

export default optionChannelValueBelongsToOptionChannelType;
