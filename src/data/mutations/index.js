/**
 * Created by Manhhailua on 10/8/16.
 */

import { GraphQLObjectType as ObjectType } from 'graphql';
import resources from './resources';
import roles from './roles';
import users from './users';
import sites from './sites';
import advertisers from './advertisers';
import campaigns from './campaigns';
import placements from './placements';
import placementBanners from './placementBanners';
import zones from './zones';
import banners from './banners';
import channels from './channels';
import optionChannels from './optionChannels';
import tracks from './tracks';
import shares from './shares';
import sharePlacements from './sharePlacements';

const mutations = new ObjectType({
  name: 'Mutation',
  fields: {
    ...resources,
    ...roles,
    ...users,
    ...sites,
    ...advertisers,
    ...placementBanners,
    ...campaigns,
    ...placements,
    ...banners,
    ...zones,
    ...channels,
    ...optionChannels,
    ...tracks,
    ...shares,
    ...sharePlacements,
  },
});

export default mutations;

