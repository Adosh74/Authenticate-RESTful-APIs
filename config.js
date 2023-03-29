import dotenv from 'dotenv';

dotenv.config();

const {
    PORT,
    HOST,
    SERVER_URL,
    MONGODB_URI,
    DATABASE_NAME
} = process.env;

export default {
    port: PORT,
    host: HOST,
    server_uri: SERVER_URL,
    mongodb_uri: MONGODB_URI,
    database_name: DATABASE_NAME,
};