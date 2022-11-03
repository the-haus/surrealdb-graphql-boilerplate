
# 🍽️ Surrealdb - GraphQL - Typescript
-  ⚙️ Surreal RPC Client [Surreal.js](https://github.com/surrealdb/surrealdb.js#surrealdbjs)
-  🔥 Type checking  [TypeScript](https://www.typescriptlang.org/)
-  📏  Linter with  [ESLint](https://eslint.org/)
-  💖  Code Formatter with  [Prettier](https://prettier.io/)
-  🖱️  One click Surreal Database deployment [Docker Composer](https://docs.docker.com/compose/)
-  💯  Bundler [TSUP](https://github.com/egoist/tsup#%EF%B8%8F-install)
- 🤖  GraphQL Code Generator [GraphQL Codegen](https://www.the-guild.dev/graphql/codegen#live-demo)
- ☕  Minimal setup for maximal freedom

## ⚙️ Installation

### Getting started

Run the following command on your local environment:
```shell
yarn install
```

#### Live reload
```shell
yarn watch
```

#### Commands - package.json
```
yarn build
yarn start
yarn lint
yarn generate
```
#### Setup environment variables - .env
```env
PORT=8500  
NODE_ENV=development  
SURREAL_RPC_URL=http://localhost:8000/rpc  
SURREAL_USER=root  
SURREAL_PASS=root
```


## 💻 Preview
|❌ [Client](https://github.com/the-haus/surrealdb-nextjs-boilerplate) - NextJS - Typescript -  [Docs](https://github.com/the-haus/surrealdb-nextjs-boilerplate) ![GraphQL API](https://puu.sh/JqErT/00bfe4847c.gif) |✅  Server - GraphQL - Typescript - [Docs](#%EF%B8%8F-surrealdb---graphql---typescript) ![GraphQL API](https://puu.sh/JqEsq/7c552ac177.gif) |
|--|--|
| *Please make sure to install the NextJS Boilerplate* | *Currently viewing* |


## GraphQL Yoga - [Docs](https://github.com/dotansimha/graphql-yoga#graphql-yoga)

Fully-featured GraphQL Server with focus on easy setup, performance & great developer experience

    File: schema.graphql

```graphql
scalar JSON
scalar JSONObject

type Query {
    welcome: String!
    queryTodo: [Todo]
}
type Mutation {
    createTodo(title: String!, description: String!): Todo
    removeTodo(id: ID!): Boolean
}
type Todo {
    id: ID!,
    title: String
    description: String
}
```

-  [GraphQL over HTTP spec compliant](https://github.com/graphql/graphql-over-http)
-  TypeScript
-  File upload with  [GraphQL Multipart Request spec](https://github.com/jaydenseric/graphql-multipart-request-spec)
-  Realtime capabilities
- Integrated [GraphQL Tools](https://graphql-tools.com/) for advanced schema usages
- Works with all GraphQL clients [Apollo](https://www.apollographql.com/docs/react/)


## TSUP Bundler - [Docs](https://github.com/egoist/tsup#%EF%B8%8F-install)
Our current build tools for the web are 10-100x slower than they could be:

![ESBuild benchmark results](https://puu.sh/JqEpa/58719aabfe.png)

Bundle your TypeScript library with no config, powered by [esbuild](https://github.com/evanw/esbuild).
Anything that's supported by Node.js natively, namely `.js`, `.json`, `.mjs`. And TypeScript `.ts`, `.tsx`.

    File: package.json

```json
{
  "scripts": {
    "watch": "tsup --watch --onSuccess \"node dist/index.js\"",
    "build": "tsup",
    "start": "node dist/index.js",
    "lint": "eslint -c .eslintrc",
    "generate": "graphql-codegen && npx eslint --fix src/types/**/*.d.ts",
    "prewatch": "yarn generate"
  }
}
```

## GraphQL Codegen - [Docs](https://www.graphql-yoga.com/docs)

This package enables a specific workflow for developing a GraphQL server, where the GraphQL schema is the first thing you design, and acts as the contract between your frontend and backend.

    File: codegen.ts
```js
import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
    schema: "src/graphql/schema.graphql",
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
```
### Docker Composer
    File: docker-compose.yml
```yaml
version: '3.8'
services:
  graphql:
    build:
      context: .
      dockerfile: docker/node/Dockerfile
    container_name: surreal-api
    ports:
      - "8500:8500"
    depends_on:
      - surreal-db
  surreal-db:
    image: surrealdb/surrealdb:latest
    container_name: surreal-db
    ports:
      - "8000:8000"
    command:
      - start
      - --log=debug
      - --user=root
      - --pass=root
      - tikv://pd0:2379
    depends_on:
      - tikv0
      - pd0
    restart: always
  pd0:
    container_name: surrealdb-pd0
    image: pingcap/pd:latest
    ports:
      - "2379"
    volumes:
      - surreal-data:/data
      - surreal-logs:/logs
    command:
      - --name=pd0
      - --client-urls=http://0.0.0.0:2379
      - --peer-urls=http://0.0.0.0:2380
      - --advertise-client-urls=http://pd0:2379
      - --advertise-peer-urls=http://pd0:2380
      - --initial-cluster=pd0=http://pd0:2380
      - --data-dir=/data/pd0
      - --log-file=/logs/pd0.log
    restart: on-failure
  tikv0:
    container_name: surrealdb-tikv0
    image: pingcap/tikv:latest
    volumes:
      - surreal-data:/data
      - surreal-logs:/logs
    command:
      - --addr=0.0.0.0:20160
      - --advertise-addr=tikv0:20160
      - --data-dir=/data/tikv0
      - --pd=pd0:2379
      - --log-file=/logs/tikv0.log
    depends_on:
      - "pd0"
    restart: on-failure
volumes:
  surreal-data:
  surreal-logs:
  ```
