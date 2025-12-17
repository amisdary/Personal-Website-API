import express, { Request, Response } from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/api/data', (req: Request, res: Response) => {
  const mockData = {
    message: 'Hello from the API!',
    data: [
      { id: 1, name: 'Item 1', description: 'First mock item' },
      { id: 2, name: 'Item 2', description: 'Second mock item' },
      { id: 3, name: 'Item 3', description: 'Third mock item' }
    ],
    timestamp: new Date().toISOString()
  };

  res.json(mockData);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
