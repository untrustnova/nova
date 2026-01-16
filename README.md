# 🚀 Nova.js - Modern Full-Stack JavaScript Framework

<div align="center">

**Clean. Elegant. Powerful.**

A modern full-stack JavaScript framework combining React frontend with a robust Node.js backend, inspired by Laravel and Next.js philosophies but with a unique approach.

![Version](https://img.shields.io/badge/version-0.1.0-blue)
![Node.js](https://img.shields.io/badge/node-%3E%3D18.0.0-green)
![License](https://img.shields.io/badge/license-MIT-blue)

[Documentation](./docs) • [Examples](./examples) • [Community](#community)

</div>

---

## 📋 Table of Contents

- [Features](#features)
- [Quick Start](#quick-start)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Core Concepts](#core-concepts)
- [Configuration](#configuration)
- [CLI Commands](#cli-commands)
- [Examples](#examples)
- [Supported Libraries](#supported-libraries--integrations)
- [Contributing](#contributing)

---

## ✨ Features

- **Hybrid Routing** - Object-based (simple) & File-based (automatic) routing systems
- **Clean Code** - Application code stays clean; framework complexity hidden in core
- **Full-Stack Ready** - React + Vite frontend with Node.js backend in one framework
- **Modular Architecture** - Built-in modules for Storage, Cache, and Logs with extensibility
- **Database Agnostic** - Easy switching between SQL (PostgreSQL, MySQL, SQLite) and NoSQL (MongoDB)
- **Kernel Adapters** - Flexible runtime adapters (Node.js, Bun, Deno ready)
- **Type-Safe ORM** - Drizzle ORM integration with zero-config setup
- **Docker Ready** - Production-ready Docker & Docker Compose configuration
- **Code Quality** - ESLint, Prettier, and modern tooling pre-configured
- **Hot Reload** - Development server with HMR for instant feedback

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ (npm 9+)
- Docker & Docker Compose (optional, for containerization)

### Installation

```bash
npm install -g @untrustnova/nova-cli
nova new my-nova-app
cd my-nova-app
npm install
npm run dev
```

Dev URLs:
- Backend API: `http://localhost:3000`
- Frontend (Vite): `http://localhost:5173`

### Create Your First Controller

```bash
nova create:controller home
```

### Run Your First Migration

```bash
nova db:push
```

### Build for Production

```bash
npm run build
```

---

## 🧰 Troubleshooting

- Jika `nova dev` gagal karena Tailwind, install: `npm install -D tailwindcss @tailwindcss/postcss autoprefixer postcss`
- Jika `nova` command tidak ditemukan, pastikan `npm install -g @untrustnova/nova-cli` dan PATH sudah benar

## 🏗️ Architecture

Nova.js follows a **layered architecture** separating concerns into clear boundaries:

```
┌─────────────────────────────────────────────┐
│         Application Layer (User Land)        │
│  Controllers • Middleware • Routes • Models  │
├─────────────────────────────────────────────┤
│         Framework Layer (Core)               │
│ Routing • Modules • Adapters • Kernel      │
├─────────────────────────────────────────────┤
│         Runtime Layer (Node.js/Bun/Deno)    │
│ HTTP • File System • Process Management     │
└─────────────────────────────────────────────┘
```

### Design Philosophy

Nova.js is built on three core principles:

1. **Clean Developer Experience (DX)** - Your application code should be free from framework noise
2. **Zero-Config Setup** - Sensible defaults work out of the box
3. **Production-Ready** - Scales from prototypes to enterprise applications

---

## 🧠 Kernel Blueprint

Kernel Nova.js adalah pusat orkestrasi yang menjaga routing, modul, dan adapter runtime tetap bersih:

```javascript
// node_modules/@untrustnova/nova-framework/core/kernel/index.js (ringkas)
import { createNodeAdapter } from './adapters/node.js';

const adapters = {
  node: createNodeAdapter,
};

export class NovaKernel {
  constructor(config) {
    this.config = config;
    this.adapter = adapters[config.kernel?.adapter || 'node']();
    this.modules = new Map();
  }

  registerModule(name, factory) {
    // defineModule akan mengikat lifecycle hook modul
  }

  async boot() {
    // onInit -> load routes -> onReady
  }

  async start() {
    await this.boot();
    this.adapter.listen(this.config.server.port, this.config.server.host);
  }
}
```

Adapter adalah layer yang bisa diganti (Node, Bun, Deno) tanpa mengubah user-land code.

---

## 📁 Project Structure

```
my-nova-app/
├── app/                          # 📦 User Land Application Code
│   ├── controllers/
│   │   ├── home.controller.js
│   │   └── api/
│   │       └── posts.controller.js
│   ├── middleware/
│   │   ├── auth.middleware.js
│   │   └── cors.middleware.js
│   ├── models/                   # Database Models (Drizzle Schemas)
│   │   ├── user.model.js
│   │   └── post.model.js
│   ├── routes/
│   │   ├── web.js                # Object-based routing
│   │   ├── api.js                # API routes
│   │   └── pages/                # File-based page routes
│   │       ├── index.js          # GET /
│   │       ├── about.js          # GET /about
│   │       └── blog/
│   │           ├── index.js      # GET /blog
│   │           └── [slug].js     # GET /blog/:slug
│   └── migrations/               # Database Migrations
│       ├── 2024_01_create_users_table.js
│       └── 2024_02_create_posts_table.js
│
├── web/                          # 🎨 Frontend (React + Vite)
│   ├── components/
│   │   ├── Hero.jsx
│   │   ├── Navigation.jsx
│   │   └── common/
│   │       ├── Button.jsx
│   │       └── Card.jsx
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   └── NotFound.jsx
│   ├── lib/
│   │   ├── api.js                # API client helper
│   │   ├── hooks.js              # Custom React hooks
│   │   └── utils.js              # Utility functions
│   ├── styles/
│   │   ├── globals.css           # Global Tailwind styles
│   │   └── variables.css         # CSS Variables
│   ├── App.jsx
│   ├── main.jsx
│   └── index.html
│
├── public/                       # 🖼️ Static Assets
│   ├── fonts/
│   │   ├── inter.woff2
│   │   └── jetbrains-mono.woff2
│   ├── images/
│   │   ├── logo.svg
│   │   ├── hero.webp
│   │   └── icons/
│   └── favicon.ico
│
├── storage/                      # 💾 File Storage
│   ├── app/
│   │   ├── uploads/
│   │   └── exports/
│   ├── cache/
│   └── logs/
│
├── .env.local                    # Environment Variables
├── .env.example                  # Environment Template
├── .eslintrc.js                  # ESLint Configuration
├── .prettierrc                   # Prettier Configuration
├── jsconfig.json                 # Path Aliases
├── nova.config.js                # Framework Configuration
├── vite.config.js                # Vite (sync dari nova.config.js)
├── server.js                     # Server Entry Point
├── package.json
├── docker-compose.yml
└── Dockerfile

node_modules/
└── @untrustnova/nova-framework/               # 🔧 Framework Core (dependency)
    ├── package.json
    └── core/
        ├── config/
        ├── kernel/
        │   └── adapters/
        ├── routing/
        ├── modules/
        ├── db/
        └── middleware/
```

---

## 🎯 Core Concepts

### 1. Controllers - Business Logic

Clean, class-based controllers:

```javascript
// app/controllers/home.controller.js
import { Controller } from '@untrustnova/nova-framework/controller';

export default class HomeController extends Controller {
  async index({ response }) {
    const posts = await this.db.query.posts.findMany();
    response.json({ posts });
  }

  async show({ request, response }) {
    const post = await this.db.query.posts.findFirst({
      where: { id: request.params.id }
    });
    response.json({ post });
  }
}
```

### 2. Routing - Hybrid System

#### Object-Based (Simple Routes)

```javascript
// app/routes/web.js
import { route } from '@untrustnova/nova-framework/routing';

const routes = route();

routes.get('/', 'HomeController@index');
routes.get('/about', (request, response) => response.json({ page: 'about' }));
routes.post('/api/posts', 'PostsController@store');

export default routes.toArray();
```

#### File-Based (Automatic)

```javascript
// app/routes/pages/index.js → GET /
export default async ({ response }) => {
  response.json({ page: 'home' });
};

// app/routes/pages/about.js → GET /about
// app/routes/pages/home.index.js → GET /home
// app/routes/pages/blog/index.js → GET /blog
// app/routes/pages/blog/[slug].js → GET /blog/:slug
```

### 3. Middleware - Request Interceptors

```javascript
// app/middleware/auth.middleware.js
export default class AuthMiddleware {
  async handle(req, res, next) {
    const token = req.headers.authorization?.split('Bearer ')[1];

    if (!token) {
      res.statusCode = 401;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'Unauthorized' }));
    }

    try {
      req.user = await verifyToken(token);
      next();
    } catch (err) {
      res.statusCode = 401;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'Invalid token' }));
    }
  }
}
```

### 4. Database Models - Drizzle Schemas

```javascript
// app/models/user.model.js
import { pgTable, serial, varchar, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export default users;
```

### 5. Built-In Modules

#### Storage Module

```javascript
import { storage } from '@untrustnova/nova-framework/modules';

// Upload to local, S3, or Minio
const file = await storage.disk('s3').put('avatars/user.jpg', buffer);
const url = await storage.disk('s3').url('avatars/user.jpg');
await storage.disk('local').delete('temp/file.tmp');
```

#### Cache Module

```javascript
import { cache } from '@untrustnova/nova-framework/modules';

await cache.set('user:123', userData, 3600); // 1 hour TTL
const data = await cache.get('user:123');
await cache.forget('user:123');
await cache.flush();
```

#### Logs Module

```javascript
import { log } from '@untrustnova/nova-framework/modules';

log.info('User logged in', { userId: 123 });
log.error('Database error', error);
log.warning('Cache miss', { key: 'users' });
log.debug('Request info', { body: req.body });
```

### 6. Lifecycle Hooks

```javascript
// app/bootstrap.js
import { app } from '@untrustnova/nova-framework';

app.onInit(async () => {
  console.log('Initializing...');
});

app.onReady(async () => {
  console.log('Ready to handle requests');
});

app.onShutdown(async () => {
  console.log('Shutting down...');
});
```

---

## ⚙️ Configuration

### Server Entry Point (server.js)

```javascript
import 'dotenv/config';
import config from './nova.config.js';
import { NovaKernel } from '@untrustnova/nova-framework/kernel';
import { storageModule, cacheModule, logsModule } from '@untrustnova/nova-framework/modules';

const kernel = new NovaKernel(config);

kernel.registerModule('storage', storageModule);
kernel.registerModule('cache', cacheModule);
kernel.registerModule('logs', logsModule);

kernel.start();
```

### Environment Variables (.env.local)

```env
# App Settings
NOVA_APP_NAME=Nova App
NOVA_APP_URL=http://localhost:3000
NOVA_ENV=development
NOVA_DEBUG=true

# Server
NOVA_HOST=0.0.0.0
NOVA_PORT=3000
NOVA_KERNEL_ADAPTER=node

# Database (choose one)
NOVA_DB_CONNECTION=postgres
NOVA_DATABASE_URL=postgresql://user:password@localhost:5432/nova_db
# mysql://user:password@localhost:3306/nova_db
# file:./storage/db.sqlite
# mongodb://user:password@localhost:27017/nova_db
# supabase://project-ref.supabase.co?key=service-role-key

# Storage
NOVA_STORAGE_DRIVER=local
# NOVA_AWS_BUCKET=my-bucket
# NOVA_AWS_REGION=us-east-1
# NOVA_AWS_KEY=xxxxx
# NOVA_AWS_SECRET=xxxxx
# NOVA_MINIO_ENDPOINT=minio.example.com
# NOVA_MINIO_ACCESS_KEY=xxxxx
# NOVA_MINIO_SECRET_KEY=xxxxx

# Cache
NOVA_CACHE_DRIVER=memory
# NOVA_REDIS_URL=redis://localhost:6379

# Logging
NOVA_LOG_LEVEL=info
NOVA_LOG_CHANNEL=stack

# Frontend
VITE_API_URL=http://localhost:3000/api
```

### Framework Config (nova.config.js)

```javascript
import { defineConfig, react, tailwindcss } from '@untrustnova/nova-framework/config';

export default defineConfig({
  app: {
    name: process.env.NOVA_APP_NAME || 'Nova',
    url: process.env.NOVA_APP_URL || 'http://localhost:3000',
    env: process.env.NOVA_ENV || 'development',
    debug: process.env.NOVA_DEBUG === 'true',
  },

  server: {
    host: process.env.NOVA_HOST || '0.0.0.0',
    port: Number(process.env.NOVA_PORT || 3000),
  },

  security: {
    bodyLimit: 1024 * 1024,
  },

  kernel: {
    adapter: 'node', // 'node' | 'bun' | 'deno'
  },

  database: {
    default: process.env.NOVA_DB_CONNECTION || 'postgres',
    connections: {
      postgres: {
        driver: 'pg',
        url: process.env.NOVA_DATABASE_URL,
      },
      mysql: {
        driver: 'mysql2',
        url: process.env.NOVA_MYSQL_URL,
      },
      sqlite: {
        driver: 'better-sqlite3',
        url: process.env.NOVA_SQLITE_URL,
      },
      mongodb: {
        driver: 'mongodb',
        url: process.env.NOVA_MONGODB_URL,
      },
    },
  },

  modules: {
    storage: {
      driver: process.env.NOVA_STORAGE_DRIVER || 'local',
      disks: {
        local: { root: './storage/app' },
        s3: {
          key: process.env.NOVA_AWS_KEY,
          secret: process.env.NOVA_AWS_SECRET,
          bucket: process.env.NOVA_AWS_BUCKET,
          region: process.env.NOVA_AWS_REGION,
        },
        minio: {
          endPoint: process.env.NOVA_MINIO_ENDPOINT,
          port: 9000,
          useSSL: false,
          accessKey: process.env.NOVA_MINIO_ACCESS_KEY,
          secretKey: process.env.NOVA_MINIO_SECRET_KEY,
        },
      },
    },

    cache: {
      driver: process.env.NOVA_CACHE_DRIVER || 'memory',
      redis: {
        url: process.env.NOVA_REDIS_URL,
      },
    },

    logs: {
      level: process.env.NOVA_LOG_LEVEL || 'info',
      channels: {
        stack: ['single', 'slack'],
        single: { driver: 'single', path: './storage/logs/nova.log' },
      },
    },
  },

  frontend: {
    ...react(),
    ...tailwindcss({
      content: ['./web/**/*.{jsx,js}'],
    }),
  },

  alias: {
    '@': './web',
    '@components': './web/components',
    '@lib': './web/lib',
  },
});
```

---

## 🔧 CLI Commands

### Project & Development

```bash
npm install -g nova-cli
nova new my-app               # Create new project
npm run dev                   # Start dev server with HMR
npm run build                 # Build for production
npm start                     # Run production server
```

### Code Generation

```bash
nova create:controller posts      # New controller
nova create:middleware auth       # New middleware
nova create:model user            # New model
nova create:migration create_users_table
```

### Database

```bash
nova db:init        # Initialize database
nova db:push        # Run pending migrations
nova db:rollback    # Undo last migration
nova db:reset       # Drop and recreate
nova db:seed        # Seed with test data
```

### Code Quality

```bash
npm run lint                # Check code quality
npm run format              # Auto-format code
npm test                    # Run tests
npm run type-check          # TypeScript check
```

---

## 📚 Complete Example: Blog with File Uploads

### 1. Post Model

```javascript
// app/models/post.model.js
import { pgTable, serial, varchar, text, timestamp } from 'drizzle-orm/pg-core';
import { users } from './user.model.js';

export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).unique().notNull(),
  content: text('content').notNull(),
  excerpt: varchar('excerpt', { length: 500 }),
  authorId: serial('author_id').references(() => users.id),
  featured: varchar('featured', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
```

### 2. Post Controller

```javascript
// app/controllers/posts.controller.js
import { Controller } from '@untrustnova/nova-framework/controller';
import { storage, cache } from '@untrustnova/nova-framework/modules';
import { posts } from '../models/post.model.js';

export default class PostsController extends Controller {
  async index({ response }) {
    const cached = await cache.get('posts:list');
    if (cached) return response.json({ posts: cached });

    const allPosts = await this.db.query.posts.findMany();
    await cache.set('posts:list', allPosts, 3600);

    response.json({ posts: allPosts });
  }

  async store({ request, response }) {
    const { title, content, excerpt } = request.body;
    const slug = title.toLowerCase().replace(/\s+/g, '-');

    let featuredPath = null;
    if (request.file) {
      featuredPath = await storage
        .disk('s3')
        .put(`posts/${slug}/${request.file.originalname}`, request.file.buffer);
    }

    const post = await this.db.insert(posts).values({
      title,
      slug,
      content,
      excerpt,
      featured: featuredPath,
    });

    await cache.forget('posts:list');
    response.status(201).json({ post });
  }

  async show({ request, response }) {
    const post = await this.db.query.posts.findFirst({
      where: { slug: request.params.slug },
    });

    if (!post) return response.status(404).json({ error: 'Not found' });
    response.json({ post });
  }

  async destroy({ request, response }) {
    const post = await this.db.query.posts.findFirst({
      where: { id: request.params.id },
    });

    if (post?.featured) {
      await storage.disk('s3').delete(post.featured);
    }

    await this.db.delete(posts).where({ id: req.params.id });
    await cache.forget('posts:list');

    response.json({ success: true });
  }
}
```

### 3. Routes

```javascript
// app/routes/api.js
import { route } from '@untrustnova/nova-framework/routing';
import multer from 'multer';

const upload = multer({ storage: multer.memoryStorage() });

const routes = route();

routes.get('/api/posts', 'PostsController@index');
routes.get('/api/posts/:slug', 'PostsController@show');
routes.post('/api/posts', upload.single('featured'), 'PostsController@store');
routes.delete('/api/posts/:id', 'PostsController@destroy');

export default routes.toArray();
```

### 4. React Component

```javascript
// web/components/BlogList.jsx
import { useEffect, useState } from 'react';
import { api } from '@lib/api';

export default function BlogList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/posts')
      .then(({ posts }) => {
        setPosts(posts);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="grid gap-4 p-6">
      {posts.map((post) => (
        <article
          key={post.id}
          className="border rounded-lg p-4 hover:shadow-lg transition"
        >
          <h2 className="text-xl font-bold">{post.title}</h2>
          <p className="text-gray-600 mt-2">{post.excerpt}</p>
          {post.featured && (
            <img
              src={post.featured}
              alt={post.title}
              className="mt-4 rounded max-w-full"
            />
          )}
          <a href={`/blog/${post.slug}`} className="text-blue-500 mt-4 block">
            Read More →
          </a>
        </article>
      ))}
    </div>
  );
}
```

---

## 🐳 Docker Deployment

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f app

# Stop services
docker-compose down
```

Includes: Node.js app, PostgreSQL, Redis, persistent volumes

---

## 📦 Supported Libraries & Integrations

### Database Drivers
- **PostgreSQL** - `pg`
- **MySQL** - `mysql2`
- **SQLite** - `better-sqlite3`
- **MongoDB** - `mongodb`
- **Supabase** - `supabase`

### ORM
- **Drizzle ORM** (Built-in)

### Frontend
- **React** 19+
- **Vite** 6+
- **Tailwind CSS** Latest

### Caching
- Memory (default)
- Redis

### Storage
- Local Filesystem
- AWS S3
- MinIO

### Development
- ESLint (Code quality)
- Prettier (Formatting)
- Nodemon (Auto-restart)
- Vite HMR (Hot reload)

### HTTP & Utilities
- Express.js / Hono
- Multer (File uploads)
- Dotenv (Environment vars)
- CORS, Compression

---

## 🛠️ Tech Stack

| Layer | Tech | Version |
|-------|------|---------|
| **Frontend** | React, Vite, Tailwind | 19+, 6+, Latest |
| **Backend** | Node.js | 18+, Latest |
| **Database** | PostgreSQL, MySQL, SQLite, MongoDB | Latest |
| **ORM** | Drizzle | 0.40+ |
| **Cache** | Redis, Memory | Latest |
| **Storage** | S3, MinIO, Local | Latest |
| **Build** | Vite | 6.0+ |
| **Container** | Docker, Docker Compose | Latest |

---

## 🤝 Contributing

```bash
git clone https://github.com/nova-js/nova.git
git checkout -b feature/amazing-feature
git commit -am 'Add feature'
git push origin feature/amazing-feature
```

Read [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

---

## 📄 License

MIT License - See [LICENSE](./LICENSE)

---

## 🙋 Support

- **Docs**: [docs.nova-js.dev](https://docs.nova-js.dev)
- **Discord**: [Join Community](#)
- **Issues**: [GitHub Issues](https://github.com/nova-js/nova/issues)
- **Discussions**: [Discussions](https://github.com/nova-js/nova/discussions)

---

<div align="center">

Made with ❤️ by the Nova.js Community

**[⬆ Back to top](#-novajs---modern-full-stack-javascript-framework)**

</div>
