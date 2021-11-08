import express from 'express';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path, {dirname} from 'path';
import { wildcardEndpoint, globalErrorHandler } from './controllers/fallbackController.js';
import connect from './database.js';
import userRouter from './routes/userRouter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
dotenv.config();
app.use(express.json());

connect();

// Routes here

// Last route - login/register
app.use('/', userRouter);

// Serve static files from frontend
app.use(express.static(path.join(__dirname, 'client/build')));

// GET wildcard for any request that doesn't match one above
app.post('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

// Wildcard endpoint, runs for everything that is not GET, except errors!
app.use(wildcardEndpoint);

// This middleware handles all uncaught errors
app.use(globalErrorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on ${port}`));