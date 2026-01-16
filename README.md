# Nova.js (Konsep Framework)

## Struktur Folder (Core vs User Land)

```
.
├── app
│   ├── controllers
│   ├── middleware
│   └── routes
│       ├── pages
│       │   └── index.js
│       └── web.js
├── packages
│   └── nova
│       └── core
├── public
│   ├── fonts
│   └── images
├── web
│   ├── components
│   ├── lib
│   ├── styles
│   ├── App.jsx
│   └── main.jsx
├── nova.config.js
├── server.js
└── .env.local
```

> Framework core akan terpasang sebagai dependency `nova` (node_modules) melalui `file:./packages/nova`.

## Instalasi (npm)

```bash
npm install
npm run start
```

## Contoh CLI yang Disediakan Nova

```bash
nova new my-app
nova dev
nova db:init
nova db:push
nova create:controller HomeController
nova build
```

## Contoh Routing Bersih (Object-based)

```js
export default () =>
  route()
    .get('/', controller.index.bind(controller))
    .toArray();
```

## Contoh File-based Routing

```
app/routes/pages/index.js -> GET /
```

## Fokus DX

Nova.js menjaga agar kode aplikasi (controller/middleware) tetap bersih, sementara modul, adapter kernel,
serta lifecycle module berada di layer framework.
