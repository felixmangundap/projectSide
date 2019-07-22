import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';

import indexRouter from './routes/index';
import usersRouter from './routes/users';
import projectsRouter from './routes/projects';
import testAPIRouter from './routes/testAPI';

mongoose.connect('mongodb+srv://felixmangundap:690503Ftc@projectside-odmhw.mongodb.net/projectSide?retryWrites=true&w=majority', { useNewUrlParser: true });

const db = mongoose.connection;
db.once('open', () => console.log('Connected to the Database'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/projects', projectsRouter);
app.use('/testAPI', testAPIRouter);

module.exports = app;
