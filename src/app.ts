import CORS from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import GraphqlHTTP from 'express-graphql';
import RandomString from 'randomstring';

import { Schema } from '@graphql/schema';
import { Create404, ErrorHandler } from './middlewares';
import { Models, TokenTypes, TokenAttributes } from '@database/index';

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

app.get('/token', function(req, res) {
  let randomString = RandomString.generate(150);

  let tokenModelInstance: TokenAttributes = {
    token_type: TokenTypes.Request,
    token: randomString
  };

  Models.Tokens.create(tokenModelInstance);
  res.send(randomString);
});

if(process.env.NODE_ENV === 'testing') {
  app.use('/graphiql', GraphqlHTTP({
    schema: Schema,
    graphiql: true
  }));
}

app.use(Create404);
app.use(ErrorHandler);

export { app as ExpressApp };
export default app;