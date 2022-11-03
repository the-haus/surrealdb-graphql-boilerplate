import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["src/index.ts", "src/graphql/schema.graphql", "src/graphql/resolvers/**/*.ts"],
    splitting: true,
    sourcemap: true,
    clean: true,
    loader: {
        ".graphql": "copy",
        ".ico": "copy"
    }
});
