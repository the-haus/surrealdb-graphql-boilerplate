import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
    schema: "src/graphql/schema.graphql",
    hooks: { afterOneFileWrite: ["eslint --fix"] },
    generates: {
        "./src/types/schema.d.ts": {
            plugins: ["typescript"]
        },
        "./src/types/resolvers.d.ts": {
            config: {
                contextType: "context#SurrealContext"
            },
            plugins: ["typescript-resolvers"]
        }
    }
};
export default config;
