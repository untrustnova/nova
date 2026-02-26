# 🐺 Nova.js

### *The Strict-Action Dispatcher Architecture Framework*

Nova.js is a modern framework built on **Bun** and **[Seishiro API](https://nakikoneko.gitbook.io/seishiroapi)**. Nova.js eliminates the complexity of traditional *folder-routing* and replaces it with a precise, secure, and extremely fast **Single Command Dispatcher** system.

## ✨ Key Features

* **SADA Architecture**: Centralized control structure for maximum efficiency.
* **Protocol Agnostic**: One logic for REST API, Server Actions, and System Actions.
* **Zero-Config Bundler**: Automatic internal compiler for React/Vue without the need for Vite.
* **Seishiro Inside**: Standardization of response protocols and strict security systems.
* **Native Bun Support**: Lightning-fast performance with modern runtime utilization.

## 🚀 Quick Start

To start a new project, make sure you have installed `nova-cli` globally, then run:

```bash
novajs create my-awesome-app

```

Enter the directory and turn on development mode:

```bash
cd my-awesome-app
novajs dev

```

## 🏗️ Folder Structure

The Nova.js folder structure is designed for high scalability:

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

## 🛡️ SADA Protocol Example (Seishiro)

In Nova.js, you no longer need to create route files one by one. Simply register "Action" in the registry:

```javascript
// src/controllers/user.js
export const GetProfile = async ({ data, system }) => {
  return { data: { name: "Shiroko", role: "Developer" } };
};

// src/dispatcher.js
registry.set("user:get-profile", GetProfile);

```

Access your single endpoint via:
`POST http://localhost:3000/api/action` with payload `{ "type": "user:get-profile" }`.

---

### 🛠️ Commands

* `novajs install` - Installing dependencies based on the detected lockfile.
* `novajs dev` - Run the compiler and server in watch mode.
* `novajs build` - Compiling views and logic for production.

---

### 💁🏻‍♂️ Support

You can support us by helping us making this framework usable for all of us! If there was any issue, feel free to tell at the `issue` section.

---

**Build with 💙 by Nova Hoshizora and [@AndraZero121](https://github.com/AndraZero121)**,
*Powered by [Seishiro](https://nakikoneko.gitbook.io/seishiroapi)*

LICENSED by MIT License.
---
