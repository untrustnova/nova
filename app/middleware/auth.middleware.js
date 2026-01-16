export async function authMiddleware({ req, res }, next) {
  const token = req.headers.authorization;
  if (!token) {
    res.writeHead(401, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Unauthorized' }));
    return;
  }

  await next();
}
