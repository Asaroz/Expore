import mongoose from 'mongoose';

export default async function connect() {

    const user = process.env.DB_USER;
    const pass = process.env.DB_PASS;
    const host = process.env.DB_HOST;
    const db = process.env.DB_NAME;
    
    const connectionString = `mongodb+srv://${user}:${pass}@${host}/${db}?retryWrites=true&w=majority`;

    mongoose.connection.on('error', err => console.log('ERROR:', err));
    mongoose.connection.on('connecting', () => console.log(">> Connecting"));
    mongoose.connection.on('connected', () => console.log(">> Connected"));
    mongoose.connection.on('disconnecting', () => console.log(">> Disconnecting"));
    mongoose.connection.on('disconnected', () => console.log(">> Disconnected"));

    await mongoose.connect(connectionString);
}