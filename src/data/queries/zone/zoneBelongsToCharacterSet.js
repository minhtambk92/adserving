/**
 * Created by Manhhailua on 10/17/16.
 */

import { resolver, defaultListArgs } from 'graphql-sequelize';
import { Zone } from '../../models';
import CharacterSetType from '../../types/characterSet/CharacterSetType';

const zoneBelongsToCharacterSet = () => ({
  type: CharacterSetType,
  args: Object.assign(defaultListArgs(), {
    // Additional params
  }),
  resolve: resolver(Zone.characterSet, {
    before(options) {
      const opts = options;
      opts.order = options.order || [];
      opts.order.push(['createdAt', 'DESC']);
      return opts;
    },
  }),
});

export default zoneBelongsToCharacterSet;
