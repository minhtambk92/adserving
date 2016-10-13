/**
 * Created by Manhhailua on 10/8/16.
 */

import { GraphQLObjectType as ObjectType } from 'graphql';

import me from './me';
import content from './content';
import news from './news';
import intl from './intl';
import campaigns from './campaigns';
import placements from './placements';
import banners from './banners';
import options from './options';
import permissions from './permissions';
import roles from './roles';
import advertisers from './advertisers';
import sites from './sites';
import zones from './zones';
import channels from './channels';
import filters from './filters';

const queries = new ObjectType({
  name: 'Query',
  fields: {
    options,
    me,
    roles,
    permissions,
    content,
    news,
    intl,
    campaigns,
    placements,
    banners,
    advertisers,
    sites,
    zones,
    channels,
    filters,
  },
});

export default queries;