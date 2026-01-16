import http from 'node:http';

export function createNodeAdapter() {
  return {
    registerRoutes(routes) {
      this.routes = routes;
    },
    listen(port, host) {
      const server = http.createServer(async (req, res) => {
        const match = this.routes.find(
          (route) => route.method === req.method && route.path === req.url,
        );

        if (!match) {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Not Found' }));
          return;
        }

        await match.handler({ req, res });
      });

      server.listen(port, host, () => {
        console.log(`[nova] running at http://${host}:${port}`);
      });
    },
  };
}
