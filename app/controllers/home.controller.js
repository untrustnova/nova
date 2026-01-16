export class HomeController {
  async index({ res }) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Welcome to Nova.js', status: 'ok' }));
  }
}
