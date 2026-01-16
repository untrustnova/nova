export function defineConfig(config) {
  return config;
}

export function react() {
  return {
    name: 'nova-react',
    setup(viteConfig) {
      return {
        ...viteConfig,
        plugins: [...(viteConfig.plugins || []), 'react'],
      };
    },
  };
}

export function tailwindcss() {
  return {
    name: 'nova-tailwind',
    setup(viteConfig) {
      return {
        ...viteConfig,
        css: {
          postcss: {
            plugins: ['tailwindcss', 'autoprefixer'],
          },
        },
      };
    },
  };
}
