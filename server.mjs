import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import corsOptions from './config/corsOptions.mjs';
import { logger } from './app/middleware/logEvents.mjs';
import errorHandler from './app/middleware/errorHandler.mjs';

import './loadEnvironment.mjs';
import './config/connMongo.mjs';

const app = express();
const PORT = process.env.PORT || 3500;

// Custom middleware logger
app.use(logger);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// Built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// Built-in middleware for JSON
app.use(express.json());

// Serve static files
app.use('/', express.static(path.join(new URL('.', import.meta.url).pathname, '/public')));

// Routes
import rootRouter from './routes/root.mjs';

app.use('/', rootRouter);

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(path.dirname(fileURLToPath(import.meta.url)), 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
