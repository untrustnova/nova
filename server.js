import 'dotenv/config';
import config from './nova.config.js';
import { NovaKernel } from 'nova/kernel';
import { storageModule, cacheModule, logsModule } from 'nova/modules';

const kernel = new NovaKernel(config);

kernel.registerModule('storage', storageModule);
kernel.registerModule('cache', cacheModule);
kernel.registerModule('logs', logsModule);

kernel.start();
