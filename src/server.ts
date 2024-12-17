import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import path from 'path';

const app: Express = express();
const port: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 