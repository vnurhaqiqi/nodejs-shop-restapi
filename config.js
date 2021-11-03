const dotenv = require("dotenv");
dotenv.config();

module.exports = {
    port: process.env.PORT,
    database: process.env.MONGOOSE_DB,
    host: process.env.HOST
}