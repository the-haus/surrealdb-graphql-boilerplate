import "dotenv-defaults/config";
import Server from "./api/server";

(async () => {
    const api = new Server();
    await api.start();
})();
