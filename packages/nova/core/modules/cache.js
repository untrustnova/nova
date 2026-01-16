export function cacheModule({ lifecycle }) {
  lifecycle.onInit = async () => {
    console.log('[cache] init');
  };

  const store = new Map();

  return {
    get(key) {
      return store.get(key);
    },
    set(key, value) {
      store.set(key, value);
    },
  };
}
