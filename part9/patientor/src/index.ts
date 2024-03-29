import express from "express";
import cors from 'cors'

import diagnosesRouter from './routes/diagnoses'
import patientsRouter from './routes/patients';

const app = express();
app.use(express.json(),cors());

app.get('/api/ping', (_req, res) => {
  res.send('pong')
})

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`server is running on the port: ${PORT}`);
})

