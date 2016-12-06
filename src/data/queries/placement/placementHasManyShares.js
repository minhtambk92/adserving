import {
  GraphQLList as List,
} from 'graphql';
import { defaultListArgs, resolver } from 'graphql-sequelize';
import { Share } from '../../models';
import ShareType from '../../types/share/ShareType';

const placementHasManyShares = () => ({
  type: new List(ShareType),
  args: Object.assign(defaultListArgs(), {
    // Additional params
  }),
  resolve: resolver(Share.sharePlacements, {
    async after(results) {
      const shareIds = results.map(result => result.shareId);
      return await Share.findAll({
        where: {
          id: { $in: shareIds },
        },
        order: [
          ['createdAt', 'DESC'],
        ],
      });
    },
  }),
});

export default placementHasManyShares;
