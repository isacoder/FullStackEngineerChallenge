import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import routeEmployee from './routes/employee';
import routePerformanceReview  from './routes/performance_review';
import routeReaction from './routes/reaction';

const app = express();
const port = 8000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/employee', routeEmployee);
app.use('/performance_review/', routePerformanceReview);
app.use('/reaction', routeReaction);
app.get('/', (req, res) => res.send('Appraisal API Ready'));

app.listen(port, () => console.log(`Appraisal API listening at ${port}`));
