import { Resolvers } from "../../../types/resolvers";
import { MutationRemoveTodoArgs } from "../../../types/schema";

export default <Resolvers>{
    Mutation: {
        removeTodo: async (root: any, args: MutationRemoveTodoArgs, { db }) => {
            await db.use("namespace", "database");

            return !!(await db.delete(args.id));
        }
    }
};
