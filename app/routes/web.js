import { route } from 'nova/routing';
import { HomeController } from '../controllers/home.controller.js';

const controller = new HomeController();

export default () =>
  route()
    .get('/', controller.index.bind(controller))
    .get('/status', async ({ res }) => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ status: 'ready' }));
    })
    .toArray();
