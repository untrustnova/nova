export function route() {
  const routes = [];

  const builder = {
    get(path, handler) {
      routes.push({ method: 'GET', path, handler });
      return builder;
    },
    post(path, handler) {
      routes.push({ method: 'POST', path, handler });
      return builder;
    },
    toArray() {
      return routes;
    },
  };

  return builder;
}
