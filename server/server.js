import 'dotenv/config';

import express from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
import { serve, setup } from 'swagger-ui-express';
import { readFile } from 'fs/promises';
import config from './db/migrate-mongo-config.js';
import userRoutes from './routes/public/clientRoute.js';
import affiliateRoutes from './routes/internal/affiliateRoute.js';
import agentRoutes from './routes/internal/agentRoute.js';
import authRoutes from './routes/public/authRoute.js';
import insuranceRiskRoute from './routes/internal/insuranceRiskRoute.js';
import insuranceRoute from './routes/internal/insuranceRoute.js';

const swaggerDocument = JSON.parse(
  await readFile(
    new URL('./swagger.json', import.meta.url)
  )
);
const app = express();
const port = process.env.PORT || 8080;

const corsOptions = {
  origin: ["http://localhost:5173"],
  credentials: true,
};

connect(
  config.mongodb.url,
  {
    ...config.mongodb.options,
    dbName: config.mongodb.databaseName,
  }
).then(() => console.log("MongoDB connected")).catch(err => console.log(err));

app.use('/uploads', express.static('./uploads'));
app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/v1/public/users', userRoutes);
app.use('/api/v1/internal/insurance-risks', insuranceRiskRoute);
app.use('/api/v1/internal/insurance-objects', insuranceRoute);
app.use('/api/v1/public/auth', authRoutes);
app.use('/api/v1/internal/affiliates', affiliateRoutes);
app.use('/api/v1/internal/agents', agentRoutes);
app.use('/api-docs', serve, setup(swaggerDocument));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

app.get('/api/uploads/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = path.join('./uploads', filename);

  res.sendFile(filePath, (err) => {
      if (err) {
          res.status(404).json({ message: 'File not found' });
      }
  });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});