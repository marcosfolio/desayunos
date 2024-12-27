import express from 'express';
import cors from 'cors';
import { getDb } from './db/database';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Add this new endpoint
app.get('/api/proteins', async (req, res) => {
    try {
        const db = await getDb();
        const proteins = await db.all('SELECT * FROM protein');
        res.json(proteins);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching proteins' });
    }
});

// Admin endpoints for managing proteins
app.post('/api/proteins', async (req, res) => {
    try {
        const db = await getDb();
        const { name, grams } = req.body;

        const result = await db.run(
            'INSERT INTO protein (name, grams) VALUES (?, ?)',
            [name, grams]
        );

        res.status(201).json({
            id: result.lastID,
            message: 'Protein added successfully'
        });
    } catch (error) {
        res.status(500).json({ error: 'Error adding protein' });
    }
});

app.put('/api/proteins/:id', async (req, res) => {
    try {
        const db = await getDb();
        const { name, grams } = req.body;

        const result = await db.run(
            'UPDATE protein SET name = ?, grams = ? WHERE id = ?',
            [name, grams, req.params.id]
        );

        if (result.changes) {
            res.json({ message: 'Protein updated successfully' });
        } else {
            res.status(404).json({ error: 'Protein not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error updating protein' });
    }
});

app.delete('/api/proteins/:id', async (req, res) => {
    try {
        const db = await getDb();
        const result = await db.run(
            'DELETE FROM protein WHERE id = ?',
            req.params.id
        );

        if (result.changes) {
            res.json({ message: 'Protein deleted successfully' });
        } else {
            res.status(404).json({ error: 'Protein not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error deleting protein' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 