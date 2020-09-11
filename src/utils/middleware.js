import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';

export default (app) => {
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.static('public'));
};
