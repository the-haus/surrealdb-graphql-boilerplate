import type { Resolvers } from "types/resolvers";

export default <Resolvers>{
    Query: {
        queryTodo: {
            resolve: async (root, args, { db }) => {
                await db.use("namespace", "database");
                const todo = await db.query(/* surreal */ `
                    SELECT * FROM todo;
                `);
                return todo[0].result;
            }
        }
    }
};
