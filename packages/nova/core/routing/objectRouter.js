import { pathToFileURL } from 'node:url';
import { join } from 'node:path';

export async function loadRoutes(kernel) {
  const routesFile = join(process.cwd(), 'app', 'routes', 'web.js');
  const module = await import(pathToFileURL(routesFile));
  return module.default(kernel);
}
