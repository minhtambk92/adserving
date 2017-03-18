import {
  GraphQLList as List,
} from 'graphql';
import { resolver, defaultListArgs } from 'graphql-sequelize';
import ShareType from '../../types/share/ShareType';
import { Share } from '../../models';

const shares = {
  type: new List(ShareType),
  args: Object.assign(defaultListArgs(), {
    // Additional params
  }),
  resolve: resolver(Share, {
    before(options, args, res) {
      const opts = options;
      if (res.body !== undefined) {
        opts.where = res.body.variables;
      }
      opts.order = options.order || [];
      opts.order.push(['createdAt', 'DESC']);
      return opts;
    },
  }),
};

export default shares;
