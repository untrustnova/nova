export function storageModule({ lifecycle }) {
  lifecycle.onInit = async () => {
    console.log('[storage] init');
  };

  return {
    put(path, file) {
      console.log(`[storage] saving ${path}`, file);
    },
    get(path) {
      console.log(`[storage] reading ${path}`);
      return null;
    },
  };
}
