/**
 * Created by Quy on 11/15/2016.
 */
import { resolver, defaultListArgs } from 'graphql-sequelize';
import { OptionChannel } from '../../models';
import OptionChannelTypeType from '../../types/optionChannelType/OptionChannelTypeType';

const optionOptionChannelTypeBelongsToOptionChannelType = () => ({
  type: OptionChannelTypeType,
  args: Object.assign(defaultListArgs(), {
    // Additional params
  }),
  resolve: resolver(OptionChannel.optionChannelType, {
    before(options) {
      const opts = options;
      opts.order = options.order || [];
      opts.order.push(['createdAt', 'DESC']);
      return opts;
    },
  }),
});

export default optionOptionChannelTypeBelongsToOptionChannelType;

