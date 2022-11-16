import express from "express";
import { createSchema, createYoga, YogaServerInstance } from "graphql-yoga";
import Surreal from "surrealdb.js";
import { loadFiles } from "@graphql-tools/load-files";
import { loadSchema } from "@graphql-tools/load";

import { Express } from "express-serve-static-core";
import path from "path";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";

class Server {
    private db: Surreal;
    private graphql: YogaServerInstance<any, any> | undefined;
    private express: Express;

    // Bind listener
    private port = process.env.PORT || 8500;
    private rpc = process.env.SURREAL_RPC_URL || "http://localhost:8500/rpc";

    constructor() {
        // Initialize Surreal
        this.db = new Surreal(this.rpc);

        // Initialize Express
        this.express = express();
    }

    private async signinSurreal(): Promise<void> {
        // Initialize db
        await this.db.signin({
            user: process.env.SURREAL_USER || "root",
            pass: process.env.SURREAL_PASS || "root"
        });
    }

    private async createServer() {
        // Initialize graphql
        this.graphql = createYoga({
            graphiql: {
                defaultVariableEditorOpen: false,
                headerEditorEnabled: false,
                title: "Surreal API",
                defaultQuery: "query Query {\n\twelcome\n}"
            },
            logging: false,
            context: async ({ req, res }) => ({
                req,
                res,
                db: this.db
            }),
            schema: createSchema({
                typeDefs: await loadSchema(path.join(__dirname, "graphql/schema.graphql"), {
                    loaders: [new GraphQLFileLoader()]
                }),
                resolvers: await loadFiles(path.join(__dirname, "graphql/resolvers/**/*.js"), {
                    useRequire: true
                })
            })
        });

        // Serve .graphql file to dev
        this.express.use("/graphql", this.graphql);
        this.express.use(`/schema.graphql`, express.static("src/graphql/schema.graphql"));

        // Favicon
        this.express.use("/favicon.ico", express.static(path.join(__dirname, "assets", "favicon.ico")));
    }

    /**
     * Start server
     */
    public async start() {
        // Create Graphql Server
        await this.createServer();

        // Sign into surreal DB
        await this.signinSurreal();

        this.express.listen(this.port, () => {
            console.log(`Running a GraphQL API server at http://localhost:${this.port}/graphql`);
        });
    }
}

export default Server;
