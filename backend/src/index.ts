import 'dotenv/config';
import 'reflect-metadata';
import { config } from './config/config';
import { createControllers } from './config/container';
import { createApp } from './app';

const app = createApp(createControllers());

app.listen(config.port, () => {
  console.log(`Server listening on port ${config.port}`);
});
