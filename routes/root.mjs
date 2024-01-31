import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();

router.get('^/$|/index(.html)?', (req, res) => {
    const currentDir = path.dirname(fileURLToPath(import.meta.url));
    const indexPath = path.join(currentDir, '..', 'views', 'index.html');
    res.sendFile(indexPath);
});

export default router;
