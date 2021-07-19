import { objectType, extendType, nonNull, stringArg, } from 'nexus';

export const Author = objectType({
    name: 'Author',
    definition(t) {
        t.string('id')
        t.string('name')
        t.string('description')
    },
});
export const AuthorQuery = extendType({
    type: 'Query',
    definition(t) {
        t.nonNull.list.field('authors', {
            type: 'Author',
            resolve(_root, _args, ctx) {
                return ctx.db.author.findMany()
            },
        });
    },
});
export const AuthorMutation = extendType({
    type: 'Mutation',
    definition(t) {
        t.nonNull.field('createAuthor', {
            type: 'Author',
            args: {
                name: nonNull(stringArg()),
                description: nonNull(stringArg())
            },
            resolve(_root, args, ctx) {
                const author = {
                    name: args.name,
                    description: args.description
                };
                return ctx.db.author.create({ data: author });
            }
        });
    }
});