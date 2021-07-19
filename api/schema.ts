// api/schema.ts
import { makeSchema } from 'nexus'
import { join } from 'path'
import * as types from './graphql'
export const schema = makeSchema({
  types,
  outputs: {
    typegen: join(__dirname, '..', 'nexus-typegen.ts'),
    schema: join(__dirname, '..', 'schema.graphql'),
  },
  contextType: {                                    // 1
    module: join(__dirname, "./context.ts"),        // 2
    export: "Context",                              // 3
  },
})