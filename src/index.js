import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import https from 'https';

import configuration from './config';

const app = express();

// CONFIG ------------------
const config = configuration(app);

// MIDDLEWARE -----------------

app.use(bodyParser.json({
  limit: process.env.APP_BODY_LIMIT || config.bodyLimit,
}));

app.use(bodyParser.urlencoded({
  extended: false,
}));

// In other environment, we are in charge of managing HTTPS connections

const httpsOptions = {
  key: fs.readFileSync(`${__dirname}/../key.pem`),
  cert: fs.readFileSync(`${__dirname}/../cert.pem`),
};

const server = https.createServer(httpsOptions, app).listen(process.env.PORT || config.port, () => {
  const listeningPort = process.env.PORT || config.port;
  const message = `Server listening on port ${listeningPort}`;
  console.log(message);
});

export { app, server };
