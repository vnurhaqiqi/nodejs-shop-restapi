const http = require("http");
const app = require("./app");
const config = require("./config");

const port = config.port || 3000
const host = config.host
const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Listening at http://${host}:${port}`);
});