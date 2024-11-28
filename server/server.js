import 'dotenv/config';
import 'dotenv/config'; 
import pkg from 'jsonwebtoken';

import express from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
import { serve, setup } from 'swagger-ui-express';
import { readFile } from 'fs/promises';
import config from './db/migrate-mongo-config.js';
import clientRoutes from './routes/public/clientRoute.js';
import affiliateRoutes from './routes/internal/affiliateRoute.js';
import agentRoutes from './routes/internal/agentRoute.js';
import authRoutes from './routes/public/authRoute.js';
import insuranceRiskRoute from './routes/internal/insuranceRiskRoute.js';
import insuranceRoute from './routes/internal/insuranceRoute.js';
import contractRoute from './routes/public/contractRoute.js';
import policyRoute from './routes/public/policyRoute.js';
import { OAuth2Client } from 'google-auth-library';
import {User, Client} from './models/userModel.js';
const client = new OAuth2Client();
const { sign, verify } = pkg;

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


app.use('/api/v1/uploads', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
}, express.static('./uploads'));

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/v1/public/clients', clientRoutes);
app.use('/api/v1/public/policies', policyRoute);
app.use('/api/v1/public/contracts', contractRoute);
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

app.get('/api/v1/uploads/:filename', (req, res) => {
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

app.post('/api/v1/google-auth', async (req, res) => {
  const { token, clientId, selectBy } = req.body;

  try {
      const ticket = await client.verifyIdToken({
          idToken: token,
          audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();
      const email = payload['email'];
      const givenName = payload['given_name'];
      const familyName = payload['family_name'];

      console.log("Google Auth Data:", { clientId, selectBy, email });

      let user = await User.findOne({ email });
      console.log(user)
      if (!user) {
          console.log('User not found. Registering new user...');
          user = new User({
              email: email,
              firstName: givenName,
              lastName: familyName,
              role: 'client',
          });
          await user.save();

          const newClient = new Client({
              address: null,
              phoneNumber: null,
              user: user._id
          });
          await newClient.save();
          
      }
      
      const jwtToken = sign(
          {
              id: user._id,
              email: user.email,
              role: user.role,
          },
          process.env.SECRET,
          { expiresIn: '1h' }
      );

      res.status(200).json({
          message: 'Authentication successful',
          token: jwtToken,
      });
  } catch (error) {
      console.error('Google Token Verification Error:', error);
      res.status(401).json({ message: 'Invalid token', error: error.message });
  }
});


