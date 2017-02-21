/**
 * Created by Manhhailua on 10/11/16.
 */

import {
  GraphQLID as IDType,
} from 'graphql';
import { resolver } from 'graphql-sequelize';
import ResourceType from '../types/resource/ResourceType';
import ResourceInputType from '../types/resource/ResourceInputType';
import ResourceInputTypeWithoutId from '../types/resource/ResourceInputTypeWithoutId';
import { Resource } from '../models';

const resources = {
  createdResource: {
    type: ResourceType,
    args: {
      resource: { type: ResourceInputTypeWithoutId },
    },
    resolve: resolver(Resource, {
      async before(options, args) {
        const opts = options;
        opts.where = options.where || {};
        await Resource.create(args.resource).then((resource) => {
          opts.where.id = { $eq: resource.id };
        });
        return opts;
      },
    }),
  },
  updatedResource: {
    type: ResourceType,
    args: {
      resource: { type: ResourceInputType },
    },
    resolve: resolver(Resource, {
      async before(options, args) {
        const opts = options;
        opts.where = options.where || {};
        opts.where.id = { $eq: args.resource.id };

        const newResource = Object.assign({}, args.resource);
        delete newResource.id; // Prevent update id

        await Resource.update(newResource, {
          where: {
            id: args.resource.id,
          },
        });

        return opts;
      },
    }),
  },
  deletedResource: {
    type: ResourceType,
    args: {
      id: { type: IDType },
    },
    resolve: resolver(Resource, {
      before(options, args) {
        const opts = options;
        opts.where = options.where || {};
        opts.where.id = { $eq: args.id };

        return opts;
      },
      after(result, args) {
        Resource.destroy({ where: { id: args.id } });

        return result;
      },
    }),
  },
};

export default resources;
