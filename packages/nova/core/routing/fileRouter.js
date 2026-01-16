import { readdir } from 'node:fs/promises';
import { join, parse } from 'node:path';
import { pathToFileURL } from 'node:url';

function fileToRouteName(fileName) {
  const { name } = parse(fileName);
  return name === 'index' ? '/' : `/${name}`;
}

export async function loadFileRoutes() {
  const routesDir = join(process.cwd(), 'app', 'routes', 'pages');
  try {
    const files = await readdir(routesDir);
    const routeFiles = files.filter((file) => file.endsWith('.js'));

    const loaded = await Promise.all(
      routeFiles.map(async (file) => {
        const module = await import(pathToFileURL(join(routesDir, file)));
        return {
          method: module.method || 'GET',
          path: module.path || fileToRouteName(file),
          handler: module.default,
        };
      }),
    );

    return loaded;
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }

    throw error;
  }
}
