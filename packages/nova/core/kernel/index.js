import { createNodeAdapter } from './adapters/node.js';
import { defineModule } from '../modules/defineModule.js';
import { loadRoutes } from '../routing/objectRouter.js';
import { loadFileRoutes } from '../routing/fileRouter.js';

export class NovaKernel {
  constructor(config) {
    this.config = config;
    this.adapter = createNodeAdapter();
    this.modules = new Map();
  }

  registerModule(name, moduleFactory) {
    const moduleInstance = defineModule(name, moduleFactory, this);
    this.modules.set(name, moduleInstance);
    return moduleInstance;
  }

  async boot() {
    for (const module of this.modules.values()) {
      await module.lifecycle.onInit?.(this);
    }

    const routes = await loadRoutes(this);
    const fileRoutes = await loadFileRoutes();
    this.adapter.registerRoutes([...routes, ...fileRoutes]);

    for (const module of this.modules.values()) {
      await module.lifecycle.onReady?.(this);
    }
  }

  async start() {
    await this.boot();
    this.adapter.listen(this.config.server.port, this.config.server.host);
  }
}
