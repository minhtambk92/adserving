
import {
  GraphQLID as IDType,
} from 'graphql';
import { resolver } from 'graphql-sequelize';
import CharacterSetType from '../types/characterSet/CharacterSetType';
import CharacterSetInputType from '../types/characterSet/CharacterSetInputType';
import CharacterSetInputTypeWithoutId from '../types/characterSet/CharacterSetInputTypeWithoutId';
import { CharacterSet } from '../models';

const characterSets = {
  createdCharacterSet: {
    type: CharacterSetType,
    args: {
      characterSet: { type: CharacterSetInputTypeWithoutId },
    },
    resolve: resolver(CharacterSet, {
      async before(options, args) {
        const opts = options;
        opts.where = options.where || {};
        /* eslint-disable no-shadow */
        await CharacterSet.create(args.characterSet).then(characterSet => {
          /* eslint-enable no-shadow */
          opts.where.id = { $eq: characterSet.id };
        });
        return opts;
      },
    }),
  },
  updatedCharacterSet: {
    type: CharacterSetType,
    args: {
      characterSet: { type: CharacterSetInputType },
    },
    resolve: resolver(CharacterSet, {
      async before(options, args) {
        const opts = options;
        opts.where = options.where || {};
        opts.where.id = { $eq: args.characterSet.id };
        const newCharacterSet = Object.assign({}, args.characterSet);
        delete newCharacterSet.id; // Prevent update id

        await CharacterSet.update(newCharacterSet, {
          where: {
            id: args.characterSet.id,
          },
        });

        return opts;
      },
    }),
  },
  deletedCharacterSet: {
    type: CharacterSetType,
    args: {
      id: { type: IDType },
    },
    resolve: resolver(CharacterSet, {
      before(options, args) {
        const opts = options;
        opts.where = options.where || {};
        opts.where.id = { $eq: args.id };

        return opts;
      },
      after(result, args) {
        CharacterSet.destroy({ where: { id: args.id } });

        return result;
      },
    }),
  },
};

export default characterSets;
