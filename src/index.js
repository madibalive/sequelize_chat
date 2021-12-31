import i18n from 'i18n';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cookieSession from 'cookie-session';
import socketio from 'socket.io';
import welcome from './routes/welcome';
import conversationRoute from './routes/converationRoute';
import authRouter from './routes/authRoutes';
import { ioMiddleware } from './middlewares/io';
var cors = require('cors');

dotenv.config();
i18n.configure({
  locales: ['fr', 'en'],
  defaultLocale: 'en',
  queryParameter: 'lang',
  directory: path.join(__dirname, 'services/localesServices/locales')
});

const app = express();

app.use(i18n.init);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());

app.use(
  cookieSession({
    secret: process.env.cookieSession,
    cookie: { maxAge: 100000 },
    resave: false,
    saveUninitialized: false
  })
);

app.use('/public', express.static(path.join(__dirname, '../public')));
app.use(cors());

const port = process.env.PORT || 3800;

export const server = app.listen(port, () => process.stdout.write(`Server is running on http://localhost:${port}/api`));

const io = socketio(server);

io.on('connect', socket => {
  // console.log('socket connnect ///' + socket.id); // ojIckSD2jqNzOqIrAGzL
  // socket.emit('message', { data: 'me' });
  // console.log('socket emit done');
});

io.use(async (socket, next) => {
  ioMiddleware(socket);
  next();
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use('/', welcome);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/conversations', conversationRoute);

app.use((req, res) => res.status(404).send({ status: 404, error: res.__('Route %s not found', req.url) }));

app.use((err, req, res) => res.status(500).send({ status: 500, error: res.__('server error') }));

export default app;
