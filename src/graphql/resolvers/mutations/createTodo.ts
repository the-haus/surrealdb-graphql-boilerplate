import { Resolvers } from "../../../types/resolvers";
import { MutationCreateTodoArgs } from "../../../types/schema";

export default <Resolvers>{
    Mutation: {
        createTodo: async (root: any, args: MutationCreateTodoArgs, { db }) => {
            await db.use("namespace", "database");
            return await db.create("todo", {
                title: args.title,
                description: args.description
            });
        }
    }
};
