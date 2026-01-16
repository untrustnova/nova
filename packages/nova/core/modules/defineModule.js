export function defineModule(name, factory, kernel) {
  const lifecycle = { onInit: null, onReady: null };
  const api = factory({ kernel, lifecycle });

  return {
    name,
    api,
    lifecycle,
  };
}
