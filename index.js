import express from 'express';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path, {dirname} from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

dotenv.config();

// Routes here

// Serve static files from frontend
app.use(express.static(path.join(__dirname, 'client/build')));

// GET wildcard for any request that doesn't match one above
app.post('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on ${port}`));