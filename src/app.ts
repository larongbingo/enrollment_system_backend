import CORS from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import GraphqlHTTP from 'express-graphql';

import { Schema } from '@graphql/index';
import { Create404, ErrorHandler } from './middlewares';

const app = express();

app.use(CORS());
if(process.env.NODE_ENV !== 'testing') app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', function(req, res) {
  res.send('<h1>Enrollment System Back End</h1>');
});

app.use('/api', GraphqlHTTP({
  schema: Schema,
  graphiql: false
}));

if(process.env.NODE_ENV === 'production') {
  app.use('/graphiql', GraphqlHTTP({
    schema: Schema,
    graphiql: true
  }));
}

app.use(Create404);
app.use(ErrorHandler);

export { app as ExpressApp };
export default app;