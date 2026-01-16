export function logsModule({ lifecycle }) {
  lifecycle.onReady = async () => {
    console.log('[logs] ready');
  };

  return {
    info(message, meta) {
      console.log('[info]', message, meta || {});
    },
    error(message, meta) {
      console.error('[error]', message, meta || {});
    },
  };
}
