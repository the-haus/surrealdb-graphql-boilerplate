import Surreal from "surrealdb.js";
import { IncomingMessage, ServerResponse } from "http";

export type SurrealContext = {
    req: IncomingMessage;
    res: ServerResponse;
    db: Surreal;
};
