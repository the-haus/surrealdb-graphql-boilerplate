import type { Resolvers } from "../../../types/resolvers";

export default <Resolvers>{
    Query: {
        welcome: {
            resolve: () => {
                return "Welcome to Surreal Typescript Boilerplate";
            }
        }
    }
};
