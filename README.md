# 🐺 Nova.js

### *The Strict-Action Dispatcher Architecture Framework*

Nova.js adalah framework modern yang dibangun di atas **Bun** dan **(Seishiro API)[https://nakikoneko.gitbook.io/seishiroapi/]**. Nova.js menghilangkan kompleksitas *folder-routing* tradisional dan menggantinya dengan sistem **Single Command Dispatcher** yang presisi, aman, dan sangat cepat.

## ✨ Key Features

* **SADA Architecture**: Struktur kendali terpusat untuk efisiensi maksimal.
* **Protocol Agnostic**: Satu logika untuk REST API, Server Actions, dan System Actions.
* **Zero-Config Bundler**: Compiler internal otomatis untuk React/Vue tanpa perlu Vite.
* **Seishiro Inside**: Standarisasi response protocol dan sistem keamanan versi yang ketat.
* **Native Bun Support**: Performa kilat dengan pemanfaatan runtime modern.

## 🚀 Quick Start

Untuk memulai project baru, pastikan Nn sudah menginstall `nova-cli` secara global, lalu jalankan:

```bash
novajs create my-awesome-app

```

Masuk ke direktori dan nyalakan mode development:

```bash
cd my-awesome-app
novajs dev

```

## 🏗️ Folder Structure

Struktur folder Nova.js didesain untuk skalabilitas tinggi:

```text
/my-app
 ├── /public           # Static assets & Compiled Bundle
 ├── /src
 │    ├── /actions     # Dispatcher Registry & Policies
 │    ├── /controllers # Business Logic (SADA Controllers)
 │    ├── /core        # Compiler & Internal Plugins
 │    ├── /views       # Frontend Components (React/Vue)
 │    └── index.js     # Entry Point Server
 ├── nova.config.js    # Centralized Configuration
 └── .env              # Environment Secrets

```

## 🛡️ SADA Protocol Example

Dalam Nova.js, Nn tidak lagi membuat file route satu per satu. Cukup daftarkan "Action" di registry:

```javascript
// src/controllers/user.js
export const GetProfile = async ({ data, system }) => {
  return { data: { name: "Shiroko", role: "Developer" } };
};

// src/dispatcher.js
registry.set("user:get-profile", GetProfile);

```

Akses endpoint tunggal kamu melalui:
`POST http://localhost:3000/api/action` dengan payload `{ "type": "user:get-profile" }`.

---

### 🛠️ Commands

* `novajs install` - Menginstal dependensi berdasarkan lockfile yang terdeteksi.
* `novajs dev` - Menjalankan compiler dan server dalam mode watch.
* `novajs build` - Mengompilasi views dan logic untuk produksi.

---

**Build with 💙 by novahoshizora** and @AndraZero121
*Powered by Seishiro API Architecture*

---
