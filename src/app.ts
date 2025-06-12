import express from 'express';
import cors from 'cors';
import { corsOptions } from './config/cors';
import { json } from 'express';
import { HandleErrors } from './common/middleware/handle.errors';

const app = express();

app.use(cors(corsOptions));
app.use(json());

app.get('/', (_, res) => res.send('Banking API'));
app.use(HandleErrors);

export default app;
