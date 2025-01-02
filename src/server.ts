import express from 'express';
import cors from 'cors';
import { getDb } from './db/database';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Add these types at the top of the file
type TableName = 'protein' | 'carbohydrates' | 'vegetables';
type Item = {
    id?: number;
    name: string;
    grams: number;
};

// Utility functions
const createResourceHandler = (tableName: TableName) => {
    const singularName = tableName.endsWith('es')
        ? tableName.slice(0, -2)
        : tableName;

    return {
        getAll: async (req: express.Request, res: express.Response) => {
            try {
                const db = await getDb();
                const items = await db.all(`SELECT * FROM ${tableName}`);
                res.json(items);
            } catch (error) {
                res.status(500).json({ error: `Error fetching ${tableName}` });
            }
        },

        create: async (req: express.Request, res: express.Response) => {
            try {
                const db = await getDb();
                const { name, grams }: Item = req.body;

                // Check if item already exists
                const existing = await db.get(
                    `SELECT * FROM ${tableName} WHERE name = ?`,
                    [name]
                );

                if (existing) {
                    return res.status(409).json({
                        error: `A ${singularName} with this name already exists`
                    });
                }

                const result = await db.run(
                    `INSERT INTO ${tableName} (name, grams) VALUES (?, ?)`,
                    [name, grams]
                );

                res.status(201).json({
                    id: result.lastID,
                    message: `${singularName} added successfully`
                });
            } catch (error: unknown) {
                if (error instanceof Error && 'code' in error && error.code === 'SQLITE_CONSTRAINT') {
                    return res.status(409).json({
                        error: `A ${singularName} with this name already exists`
                    });
                }
                res.status(500).json({ error: `Error adding ${singularName}` });
            }
        },

        update: async (req: express.Request, res: express.Response) => {
            try {
                const db = await getDb();
                const { name, grams }: Item = req.body;

                const result = await db.run(
                    `UPDATE ${tableName} SET name = ?, grams = ? WHERE id = ?`,
                    [name, grams, req.params.id]
                );

                if (result.changes) {
                    res.json({ message: `${singularName} updated successfully` });
                } else {
                    res.status(404).json({ error: `${singularName} not found` });
                }
            } catch (error) {
                res.status(500).json({ error: `Error updating ${singularName}` });
            }
        },

        delete: async (req: express.Request, res: express.Response) => {
            try {
                const db = await getDb();
                const result = await db.run(
                    `DELETE FROM ${tableName} WHERE id = ?`,
                    req.params.id
                );

                if (result.changes) {
                    res.json({ message: `${singularName} deleted successfully` });
                } else {
                    res.status(404).json({ error: `${singularName} not found` });
                }
            } catch (error) {
                res.status(500).json({ error: `Error deleting ${singularName}` });
            }
        }
    };
};

// Create handlers for each resource
const proteins = createResourceHandler('protein');
const carbohydrates = createResourceHandler('carbohydrates');
const vegetables = createResourceHandler('vegetables');

// Routes
app.get('/api/proteins', proteins.getAll);
app.post('/api/proteins', proteins.create);
app.put('/api/proteins/:id', proteins.update);
app.delete('/api/proteins/:id', proteins.delete);

app.get('/api/carbohydrates', carbohydrates.getAll);
app.post('/api/carbohydrates', carbohydrates.create);
app.put('/api/carbohydrates/:id', carbohydrates.update);
app.delete('/api/carbohydrates/:id', carbohydrates.delete);

app.get('/api/vegetables', vegetables.getAll);
app.post('/api/vegetables', vegetables.create);
app.put('/api/vegetables/:id', vegetables.update);
app.delete('/api/vegetables/:id', vegetables.delete);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 