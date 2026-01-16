export default async ({ res }) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello from file-based route');
};
